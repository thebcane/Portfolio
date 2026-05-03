"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertCircle,
  CheckCircle2,
  Link2,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ALLOWED_EXT = [
  "wav",
  "aif",
  "aiff",
  "flac",
  "mp3",
  "m4a",
  "ogg",
  "zip",
  "rar",
  "7z",
];
const MAX_BYTES = 5 * 1024 * 1024 * 1024; // 5 GB

const formSchema = z
  .object({
    name: z.string().min(1, "Required").max(120),
    email: z.string().email("Enter a valid email").max(200),
    podcastName: z.string().min(1, "Required").max(200),
    podcastUrl: z
      .string()
      .url("Paste a full URL (https://…)")
      .max(500),
    website: z
      .string()
      .url("Paste a full URL (https://…)")
      .max(500)
      .optional()
      .or(z.literal("")),
    episodeCount: z.string().max(50).optional().or(z.literal("")),
    avgListenership: z.string().max(50).optional().or(z.literal("")),
    stemsMode: z.enum(["upload", "link"]),
    externalLink: z
      .string()
      .url("Paste a full URL (https://…)")
      .max(500)
      .optional()
      .or(z.literal("")),
    notes: z.string().max(4000).optional().or(z.literal("")),
    company: z.string().max(0).optional(),
  })
  .refine(
    (data) =>
      data.stemsMode === "link" ? !!data.externalLink : true,
    { message: "Paste your link", path: ["externalLink"] }
  );

type FormValues = z.infer<typeof formSchema>;

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: "queued" | "uploading" | "done" | "error";
  key?: string;
  error?: string;
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

function validateFile(file: File): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXT.includes(ext)) {
    return `.${ext || "?"} files aren't supported. Use ${ALLOWED_EXT.join(", ")}.`;
  }
  if (file.size > MAX_BYTES) {
    return `File too large (${formatBytes(file.size)}). Max 5 GB per file.`;
  }
  return null;
}

export function IntakeForm() {
  const router = useRouter();
  const intakeId = useMemo(
    () =>
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2),
    []
  );

  const [files, setFiles] = useState<UploadingFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stemsMode: "upload",
      name: "",
      email: "",
      podcastName: "",
      podcastUrl: "",
      website: "",
      episodeCount: "",
      avgListenership: "",
      externalLink: "",
      notes: "",
      company: "",
    },
  });

  const stemsMode = watch("stemsMode");
  const anyUploading = files.some((f) => f.status === "uploading" || f.status === "queued");

  function uploadOne(uf: UploadingFile) {
    setFiles((prev) =>
      prev.map((f) => (f.id === uf.id ? { ...f, status: "uploading" } : f))
    );

    fetch("/api/get-upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: uf.file.name,
        contentType: uf.file.type || "application/octet-stream",
        size: uf.file.size,
        intakeId,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Could not get upload URL");
        }
        return res.json() as Promise<{ uploadUrl: string; key: string }>;
      })
      .then(({ uploadUrl, key }) => {
        return new Promise<string>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("PUT", uploadUrl);
          xhr.setRequestHeader(
            "Content-Type",
            uf.file.type || "application/octet-stream"
          );
          xhr.upload.addEventListener("progress", (e) => {
            if (!e.lengthComputable) return;
            const pct = Math.round((e.loaded / e.total) * 100);
            setFiles((prev) =>
              prev.map((f) => (f.id === uf.id ? { ...f, progress: pct } : f))
            );
          });
          xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) resolve(key);
            else reject(new Error(`Upload failed (${xhr.status})`));
          });
          xhr.addEventListener("error", () => reject(new Error("Network error")));
          xhr.addEventListener("abort", () => reject(new Error("Upload cancelled")));
          xhr.send(uf.file);
        });
      })
      .then((key) => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uf.id ? { ...f, status: "done", progress: 100, key } : f
          )
        );
      })
      .catch((err: Error) => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uf.id ? { ...f, status: "error", error: err.message } : f
          )
        );
      });
  }

  function handleFiles(list: FileList | null) {
    if (!list) return;
    const next: UploadingFile[] = [];
    for (const file of Array.from(list)) {
      const err = validateFile(file);
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`;
      const uf: UploadingFile = {
        id,
        file,
        progress: 0,
        status: err ? "error" : "queued",
        error: err ?? undefined,
      };
      next.push(uf);
    }
    setFiles((prev) => [...prev, ...next]);
    next
      .filter((f) => f.status === "queued")
      .forEach((f) => uploadOne(f));
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  async function onSubmit(values: FormValues) {
    setSubmitError(null);

    if (values.stemsMode === "upload") {
      const done = files.filter((f) => f.status === "done");
      if (done.length === 0) {
        setSubmitError("Upload at least one file or switch to a shared link.");
        return;
      }
      if (anyUploading) {
        setSubmitError("Wait for uploads to finish first.");
        return;
      }
    }

    setSubmitting(true);
    try {
      const uploadedKeys =
        values.stemsMode === "upload"
          ? files
              .filter((f) => f.status === "done" && f.key)
              .map((f) => ({
                key: f.key!,
                filename: f.file.name,
                size: f.file.size,
              }))
          : undefined;

      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, uploadedKeys }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Submission failed");
      }

      router.push("/get-a-free-episode/thank-you");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Submission failed");
      setSubmitting(false);
    }
  }

  const fieldError = (key: keyof FormValues) =>
    errors[key]?.message ? (
      <p className="text-xs text-red-400 mt-1.5">{String(errors[key]?.message)}</p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("company")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">Your name *</Label>
          <Input id="name" autoComplete="name" className="mt-2" {...register("name")} />
          {fieldError("name")}
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className="mt-2"
            {...register("email")}
          />
          {fieldError("email")}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="podcastName">Podcast name *</Label>
          <Input id="podcastName" className="mt-2" {...register("podcastName")} />
          {fieldError("podcastName")}
        </div>
        <div>
          <Label htmlFor="podcastUrl">Podcast URL (Apple, Spotify, YouTube) *</Label>
          <Input
            id="podcastUrl"
            type="url"
            placeholder="https://"
            className="mt-2"
            {...register("podcastUrl")}
          />
          {fieldError("podcastUrl")}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            placeholder="https://"
            className="mt-2"
            {...register("website")}
          />
          {fieldError("website")}
        </div>
        <div>
          <Label htmlFor="episodeCount">Episode count</Label>
          <Input
            id="episodeCount"
            placeholder="e.g. 42"
            className="mt-2"
            {...register("episodeCount")}
          />
        </div>
        <div>
          <Label htmlFor="avgListenership">Avg. listeners / episode</Label>
          <Input
            id="avgListenership"
            placeholder="e.g. 25,000"
            className="mt-2"
            {...register("avgListenership")}
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Send your stems *</Label>
        <p className="text-xs text-muted-foreground mt-1 mb-3 font-light">
          Multitrack stems (one file per speaker) and the latest published cut work best.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 rounded-xl border border-white/10 bg-black/30 mb-5">
          {(
            [
              { value: "upload", label: "Upload files", icon: Upload },
              { value: "link", label: "Paste a shared link", icon: Link2 },
            ] as const
          ).map(({ value, label, icon: Icon }) => {
            const active = stemsMode === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setValue("stemsMode", value, { shouldValidate: true })}
                className={cn(
                  "flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  active
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            );
          })}
        </div>

        {stemsMode === "upload" ? (
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center gap-2 px-6 py-10 rounded-lg border-2 border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/25 transition-colors text-center"
            >
              <Upload className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm font-medium">Click to choose files</span>
              <span className="text-xs text-muted-foreground font-light">
                {ALLOWED_EXT.join(", ")} — up to 5 GB each
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              accept={ALLOWED_EXT.map((e) => `.${e}`).join(",")}
              onChange={(e) => {
                handleFiles(e.target.files);
                e.target.value = "";
              }}
            />

            {files.length > 0 && (
              <ul className="mt-4 space-y-2">
                {files.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.02]"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium truncate">
                          {f.file.name}
                        </span>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {formatBytes(f.file.size)}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={cn(
                            "h-full transition-all",
                            f.status === "error"
                              ? "bg-red-500"
                              : f.status === "done"
                                ? "bg-emerald-500"
                                : "bg-primary"
                          )}
                          style={{ width: `${f.progress}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1 font-light">
                        {f.status === "queued" && "Waiting…"}
                        {f.status === "uploading" && `Uploading ${f.progress}%`}
                        {f.status === "done" && "Uploaded"}
                        {f.status === "error" && (f.error || "Upload failed")}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1">
                      {f.status === "done" && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      )}
                      {f.status === "error" && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      {f.status === "uploading" && (
                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(f.id)}
                        className="p-1 rounded hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div>
            <Label htmlFor="externalLink">Shared link</Label>
            <Input
              id="externalLink"
              type="url"
              placeholder="WeTransfer, Dropbox, Google Drive, etc."
              className="mt-2"
              {...register("externalLink")}
            />
            {fieldError("externalLink")}
            <p className="text-xs text-muted-foreground mt-2 font-light">
              Make sure the link is publicly accessible (or shared with hellobcane@gmail.com).
            </p>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="notes">Anything else I should know?</Label>
        <Textarea
          id="notes"
          rows={5}
          className="mt-2"
          placeholder="Tone you're going for, references you love, things you want fixed, recording quirks…"
          {...register("notes")}
        />
      </div>

      {submitError && (
        <div className="flex items-start gap-2 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-sm text-red-300">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || anyUploading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-primary-foreground text-base font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Send my free first episode
          </>
        )}
      </button>

      <p className="text-xs text-muted-foreground font-light">
        I'll be in touch within 48 hours. Files auto-delete after 90 days.
      </p>
    </form>
  );
}
