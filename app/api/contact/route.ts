import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, phone, package: pkg, message } = data

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
    const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: 'SMTP credentials not configured. Set SMTP_USER and SMTP_PASS as environment variables.' },
        { status: 500 },
      )
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const recipients = process.env.CONTACT_RECIPIENTS || 'osaidsiddiqui49@gmail.com,Tallyn.adams@gmail.com'

    const mailOptions = {
      from: process.env.MAIL_FROM || smtpUser,
      to: recipients,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nPackage: ${pkg}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Package:</strong> ${pkg}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Contact API error', err)
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 })
  }
}
