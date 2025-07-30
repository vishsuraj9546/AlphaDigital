import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectDB } from '@/lib/mongodb';
import Application from '@/models/Application';

export async function POST(req: Request) {
  try {
    const { name, email, skill, message, resume } = await req.json();

    // ✅ MongoDB Connect
    await connectDB();

    // ✅ Database में Save करो
    const newApplication = await Application.create({
      name,
      email,
      skill,
      message,
      resume,
    });

    console.log("✅ New application saved:", newApplication);

    // ✅ Nodemailer Setup
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });
    const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,          // ✅ 465 → 587 me change karo
  secure: false,      // ✅ false rakho
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  }
});


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

    return NextResponse.json({ success: true });
  } catch (error) {
  console.error("❌ API error:", error);
  let errorMessage = "Unknown error";

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
}

}
