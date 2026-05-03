import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getR2Bucket, getR2Client } from "@/lib/r2";

export const runtime = "nodejs";

const intakeSchema = z
  .object({
    name: z.string().min(1).max(120),
    email: z.string().email().max(200),
    podcastName: z.string().min(1).max(200),
    podcastUrl: z.string().url().max(500),
    website: z.string().url().max(500).optional().or(z.literal("")),
    episodeCount: z.string().max(50).optional().or(z.literal("")),
    avgListenership: z.string().max(50).optional().or(z.literal("")),
    stemsMode: z.enum(["upload", "link"]),
    uploadedKeys: z
      .array(
        z.object({
          key: z.string().min(1).max(500),
          filename: z.string().min(1).max(255),
          size: z.number().int().nonnegative(),
        })
      )
      .max(50)
      .optional(),
    externalLink: z.string().url().max(500).optional().or(z.literal("")),
    notes: z.string().max(4000).optional().or(z.literal("")),
    company: z.string().max(0).optional(), // honeypot — must be empty
  })
  .refine(
    (data) =>
      data.stemsMode === "upload"
        ? (data.uploadedKeys?.length ?? 0) > 0
        : !!data.externalLink,
    { message: "Provide either uploaded files or an external link" }
  );

const ipHits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.resetAt < now) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i += 1;
  }
  return `${value.toFixed(1)} ${units[i]}`;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Try again later." },
        { status: 429 }
      );
    }

    const json = await request.json();
    const parsed = intakeSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    let downloadLinksHtml = "";
    let downloadLinksText = "";
    if (data.stemsMode === "upload" && data.uploadedKeys?.length) {
      const r2 = getR2Client();
      const bucket = getR2Bucket();
      const links = await Promise.all(
        data.uploadedKeys.map(async (file) => {
          const url = await getSignedUrl(
            r2,
            new GetObjectCommand({ Bucket: bucket, Key: file.key }),
            { expiresIn: 60 * 60 * 24 * 7 } // 7 days
          );
          return { ...file, url };
        })
      );
      downloadLinksHtml = `
        <h3>Uploaded files</h3>
        <ul>
          ${links
            .map(
              (f) =>
                `<li><a href="${escapeHtml(f.url)}">${escapeHtml(
                  f.filename
                )}</a> — ${formatBytes(f.size)}</li>`
            )
            .join("")}
        </ul>
        <p style="font-size:12px;color:#666">Download links expire in 7 days. Files in R2 auto-delete after 90 days.</p>
      `;
      downloadLinksText = `Uploaded files:\n${links
        .map((f) => `- ${f.filename} (${formatBytes(f.size)}): ${f.url}`)
        .join("\n")}\n(Links expire in 7 days.)`;
    } else if (data.stemsMode === "link" && data.externalLink) {
      downloadLinksHtml = `<h3>External link</h3><p><a href="${escapeHtml(
        data.externalLink
      )}">${escapeHtml(data.externalLink)}</a></p>`;
      downloadLinksText = `External link: ${data.externalLink}`;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.INTAKE_NOTIFICATION_EMAIL || "hellobcane@gmail.com";

    const subject = `New free-episode intake: ${data.podcastName} — ${data.name}`;

    const fields: Array<[string, string | undefined]> = [
      ["Name", data.name],
      ["Email", data.email],
      ["Podcast", data.podcastName],
      ["Podcast URL", data.podcastUrl],
      ["Website", data.website || undefined],
      ["Episode count", data.episodeCount || undefined],
      ["Avg listenership", data.avgListenership || undefined],
    ];

    const htmlFields = fields
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<p><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v as string)}</p>`
      )
      .join("");

    const textFields = fields
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    const notesHtml = data.notes
      ? `<h3>Notes</h3><p>${escapeHtml(data.notes).replace(/\n/g, "<br>")}</p>`
      : "";
    const notesText = data.notes ? `\nNotes:\n${data.notes}` : "";

    await resend.emails.send({
      from: "Free Episode Intake <onboarding@resend.dev>",
      to,
      replyTo: data.email,
      subject,
      text: `${textFields}\n\n${downloadLinksText}${notesText}`,
      html: `
        <h2>New free-episode intake</h2>
        ${htmlFields}
        ${downloadLinksHtml}
        ${notesHtml}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("intake error:", error);
    return NextResponse.json(
      { error: "Failed to submit intake" },
      { status: 500 }
    );
  }
}
