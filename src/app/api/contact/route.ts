import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getData, setData } from "@/lib/storage";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

async function readMessages(): Promise<ContactMessage[]> {
  try {
    return await getData<ContactMessage[]>("contact-messages.json");
  } catch {
    return [];
  }
}

async function writeMessages(messages: ContactMessage[]): Promise<void> {
  await setData("contact-messages.json", messages);
}

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const newMessage: ContactMessage = {
    id: Date.now().toString(),
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
    read: false,
  };

  const messages = await readMessages();
  messages.unshift(newMessage);
  await writeMessages(messages);

  // Send email notification (fail gracefully)
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: "farhanr0123@gmail.com",
        replyTo: email,
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00d4aa;">New Contact Message</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px;">${name}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px;">${email}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #555;">Subject:</td><td style="padding: 8px;">${subject}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
              <p style="font-weight: bold; color: #555;">Message:</p>
              <p style="color: #333;">${message}</p>
            </div>
            <p style="color: #999; font-size: 12px; margin-top: 24px;">
              Sent from your portfolio contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Email send failed (message saved locally):", emailError);
    }
  }

  return NextResponse.json({ success: true, id: newMessage.id });
}

export async function GET() {
  const messages = await readMessages();
  return NextResponse.json(messages);
}

export async function PUT(request: Request) {
  try {
    const { id } = await request.json();
    const messages = await readMessages();
    const index = messages.findIndex(m => m.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    messages[index].read = true;
    await writeMessages(messages);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
