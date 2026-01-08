import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const resendKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_TO_EMAIL || 'hello@menclmax.com'
    // Always use verified domain email address
    const fromEmail = process.env.CONTACT_FROM_EMAIL?.endsWith('@menclmax.com') 
      ? process.env.CONTACT_FROM_EMAIL 
      : 'hello@menclmax.com'

    if (!resendKey) {
      console.error('Missing RESEND_API_KEY')
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 }
      )
    }

    const resend = new Resend(resendKey)

    const safeSubject = String(subject).slice(0, 140)
    const safeName = String(name).slice(0, 140)
    const safeEmail = String(email).slice(0, 254)
    const safeMessage = String(message).slice(0, 10000)

    console.log('Sending email:', { toEmail, fromEmail, subject: safeSubject })

    try {
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: safeEmail,
        subject: `Contact: ${safeSubject}`,
        text: [
          `Name: ${safeName}`,
          `Email: ${safeEmail}`,
          `Subject: ${safeSubject}`,
          '',
          safeMessage,
        ].join('\n'),
        html: `
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(safeMessage).replace(/\n/g, '<br>')}</p>
        `,
      })

      if (error) {
        console.error('Resend error details:', JSON.stringify(error, null, 2))
        const errorMsg = error.message || JSON.stringify(error)
        return NextResponse.json(
          { error: `Failed to send message: ${errorMsg}` },
          { status: 502 }
        )
      }

      if (!data) {
        console.error('Resend returned no data and no error')
        return NextResponse.json(
          { error: 'Failed to send message: No response from email service' },
          { status: 502 }
        )
      }

      console.log('Email sent successfully:', data.id)
    } catch (resendError) {
      console.error('Resend exception:', resendError)
      const errorMsg = resendError instanceof Error ? resendError.message : String(resendError)
      return NextResponse.json(
        { error: `Failed to send message: ${errorMsg}` },
        { status: 502 }
      )
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Failed to send message: ${errorMessage}` },
      { status: 500 }
    )
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
