import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, phone, package: pkg, message } = data

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const formsubmitUrl = 'https://formsubmit.co/ajax/Tallyn.adams@gmail.com'

    const payload = {
      name,
      phone,
      package: pkg || '',
      message,
      _subject: `New contact from ${name}`,
      _template: 'table',
    }

    const res = await fetch(formsubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    if (!res.ok) {
      let errorMsg = 'Form submission failed'
      try {
        const errJson = await res.json()
        errorMsg = errJson?.message || errorMsg
      } catch {}
      return NextResponse.json({ error: errorMsg }, { status: 502 })
    }

    const result = await res.json()
    return NextResponse.json({ ok: true, result })
  } catch (err: any) {
    console.error('Contact API error', err)
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 })
  }
}
