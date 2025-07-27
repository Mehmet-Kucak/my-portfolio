// app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create transporter with Gmail SMTP settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

transporter.verify(function (error: Error | null) {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("SMTP server is ready to take our messages");
  }
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message || !subject) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email
    await transporter.sendMail({
      from: `"${name}" <${email}>`, // sender address
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New contact from ${name}: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 20px; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                Contact Form Message
              </h1>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
              
              <!-- Message Card (Priority) -->
              <div style="background: white; border-radius: 12px; border: 2px solid #e5e7eb; overflow: hidden; margin-bottom: 30px;">
                <div style="background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%); padding: 16px 24px;">
                  <h2 style="margin: 0; color: white; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                    ${subject}
                  </h2>
                </div>
                <div style="padding: 24px;">
                  <div style="background: #f8fafc; padding: 24px; border-radius: 8px; border-left: 5px solid #6366f1; line-height: 1.7;">
                    <p style="margin: 0; color: #374151; font-size: 17px; white-space: pre-wrap;">${message.replace(
                      /\n/g,
                      "<br/>"
                    )}</p>
                  </div>
                </div>
              </div>

              <!-- Sender Info Card -->
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; padding: 24px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
                <h3 style="margin: 0 0 20px 0; color: #1e293b; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                  From: ${name}
                </h3>
                <div style="display: grid; gap: 16px;">
                  <div style="display: flex; align-items: center; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #10b981;">
                    <strong style="color: #475569; min-width: 100px; font-size: 14px;">EMAIL:</strong>
                    <a href="mailto:${email}" style="color: #059669; font-size: 16px; margin-left: 12px; text-decoration: none; font-weight: 500;">${email}</a>
                  </div>
                  <div style="display: flex; align-items: center; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    <strong style="color: #475569; min-width: 100px; font-size: 14px;">SENT:</strong>
                    <span style="color: #1e293b; font-size: 16px; margin-left: 12px;">${new Date().toLocaleString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}</span>
                  </div>
                </div>
              </div>
            </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      {
        message: "Error sending email",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
