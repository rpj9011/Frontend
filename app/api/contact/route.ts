import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Lead from '@/models/Lead'
import { sendEmail, getClientConfirmationEmail, getAdminNotificationEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rateLimit'
import { sanitizeLead, validateEmail, validatePhone } from '@/lib/sanitize'

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    // Rate limiting
    if (!rateLimit(ip, 5, 900000)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.company || !body.email || !body.phone || !body.budget || !body.services || !body.message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email
    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Validate phone
    if (!validatePhone(body.phone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number' },
        { status: 400 }
      )
    }

    // Validate services array
    if (!Array.isArray(body.services) || body.services.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Please select at least one service' },
        { status: 400 }
      )
    }

    // Sanitize input
    const sanitizedData = sanitizeLead(body)

    // Check if MongoDB is configured
    if (!process.env.MONGODB_URI) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Contact form submission received:', sanitizedData)
        return NextResponse.json(
          {
            success: true,
            message: 'Thank you! We will contact you within 24 hours. (Development mode - no database)',
            leadId: 'dev-' + Date.now(),
          },
          { status: 201 }
        )
      }
      throw new Error('MONGODB_URI not configured')
    }

    // Connect to database
    await connectDB()

    // Create lead
    const lead = await Lead.create(sanitizedData)

    // Send emails in parallel (only if email is configured)
    if (process.env.SMTP_USER && !process.env.SMTP_USER.includes('your-email')) {
      const [clientEmail, adminEmail] = await Promise.allSettled([
        sendEmail({
          to: lead.email,
          subject: 'Thank You for Contacting Agency K',
          html: getClientConfirmationEmail(lead.name, lead.company),
        }),
        sendEmail({
          to: process.env.ADMIN_EMAIL!,
          subject: `New Lead: ${lead.company} - ${lead.budget}`,
          html: getAdminNotificationEmail(lead),
        }),
      ])

      // Log email failures but don't fail the request
      if (clientEmail.status === 'rejected') {
        console.error('Failed to send client email:', clientEmail.reason)
      }
      if (adminEmail.status === 'rejected') {
        console.error('Failed to send admin email:', adminEmail.reason)
      }
    } else {
      console.log('Email not configured - skipping email notifications')
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! We will contact you within 24 hours.',
        leadId: lead._id,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Contact form error:', error)

    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { success: false, message: messages.join(', ') },
        { status: 400 }
      )
    }

    // Handle MongoDB connection errors in development
    if (process.env.NODE_ENV === 'development' && (error.message?.includes('ECONNREFUSED') || error.message?.includes('MongooseError'))) {
      console.log('Development mode: MongoDB not available, simulating success')
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you! We will contact you within 24 hours. (Development mode - no database)',
          leadId: 'dev-' + Date.now(),
        },
        { status: 201 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
