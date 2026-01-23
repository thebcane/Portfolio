import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { fullname, email, message, services } = await request.json();

    const servicesText = services && services.length > 0
      ? `\n\nServices requested:\n${services.map((s: string) => `- ${s}`).join("\n")}`
      : "";

    const emailData = {
      from: "Contact Form <onboarding@resend.dev>", // Change this to noreply@brendancane.com once DNS is verified
      to: "hellobcane@gmail.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${fullname}`,
      text: `Name: ${fullname}\nEmail: ${email}\n\nMessage:\n${message}${servicesText}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
        ${
          services && services.length > 0
            ? `
          <h3>Services Requested:</h3>
          <ul>
            ${services.map((s: string) => `<li>${s}</li>`).join("")}
          </ul>
        `
            : ""
        }
      `,
    };

    const data = await resend.emails.send(emailData);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
