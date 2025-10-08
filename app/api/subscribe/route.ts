import { writeClient } from '@/lib/sanity'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingSubscriber = await writeClient.fetch(
      `*[_type == "emailSubscriber" && email == $email][0]`,
      { email }
    )

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      )
    }

    // Create new subscriber
    const subscriber = await writeClient.create({
      _type: 'emailSubscriber',
      email,
      source: source || 'homepage',
      subscribedAt: new Date().toISOString(),
      status: 'active',
    })

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}