import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectDB } from '@/lib/mongodb';
import Contact from '@/models/contact';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // ✅ 1️⃣ Database connect karo
    await connectDB();

    // ✅ 2️⃣ MongoDB me save karo
    await Contact.create({ name, email, message });

    // ✅ 3️⃣ Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ 4️⃣ Email bhejo
    await transporter.sendMail({
      from: `"AlphaDigital Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // 📩 tumhara email jaha message aayega
      subject: `📬 New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
