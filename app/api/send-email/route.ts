import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectDB } from '@/lib/mongodb';
import Application from '@/models/Application';

export async function POST(req: Request) {
  try {
    // ✅ 1️⃣ Request se data nikalna
    const { name, email, skill, message, resume } = await req.json();

    // ✅ 2️⃣ MongoDB connect karo
    await connectDB();

    // ✅ 3️⃣ Application ko database me save karo
    const newApplication = await Application.create({
      name,
      email,
      skill,
      message,
      resume,
    });

    console.log("✅ New application saved:", newApplication);

    // ✅ 4️⃣ Nodemailer transporter setup karo
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,          // ✅ Secure ke liye 587 use karo (465 mat lo)
      secure: false,      // ✅ STARTTLS enable rahega
      auth: {
        user: process.env.EMAIL_USER,  // 📩 Gmail ID
        pass: process.env.EMAIL_PASS,  // 🔑 App Password (Gmail ka)
      },
      tls: {
        rejectUnauthorized: false, // ✅ TLS ke liye errors avoid
      }
    });

    // ✅ 5️⃣ Email bhejna
    await transporter.sendMail({
      from: `"AlphaDigital Careers" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🚀 New Application from ${name}`,
      html: `
        <h2>New Team Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Skillset:</strong> ${skill}</p>
        <p><strong>Resume:</strong> <a href="${resume}">${resume}</a></p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // ✅ 6️⃣ Success Response
    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    // ✅ TypeScript-friendly error handling
    console.error("❌ API error:", error);

    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
