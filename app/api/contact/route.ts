import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectDB } from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req: Request) {
  try {
    // ✅ 1️⃣ Request se data nikalna
    const { name, email, message } = await req.json();

    // ✅ 2️⃣ MongoDB connect karo
    await connectDB();

    // ✅ 3️⃣ MongoDB me save karo
    await Contact.create({ name, email, message });

    // ✅ 4️⃣ Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,  // ✅ Gmail email
        pass: process.env.EMAIL_PASS,  // ✅ Gmail App Password
      },
    });

    // ✅ 5️⃣ Email bhejna
    await transporter.sendMail({
      from: `"AlphaDigital Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // 📩 Yahan tumhara email jaha msg aayega
      subject: `📬 New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // ✅ 6️⃣ Response bhejna
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
