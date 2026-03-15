import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface SendEmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const info = await transporter.sendMail({
      from: `"Agency K" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    })
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export function getClientConfirmationEmail(name: string, company: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Us</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #FAFAFA;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAFA; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background-color: #0F0F0F; padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 700;">Agency K</h1>
              <div style="width: 60px; height: 3px; background-color: #E10600; margin: 16px auto 0;"></div>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 48px 40px;">
              <h2 style="margin: 0 0 24px; color: #0F0F0F; font-size: 24px; font-weight: 600;">Thank You, ${name}!</h2>
              
              <p style="margin: 0 0 16px; color: #525252; font-size: 16px; line-height: 1.6;">
                We've received your inquiry from <strong>${company}</strong> and appreciate you reaching out to us.
              </p>
              
              <p style="margin: 0 0 24px; color: #525252; font-size: 16px; line-height: 1.6;">
                Our team will review your requirements and get back to you within <strong>24 hours</strong> with a detailed proposal.
              </p>
              
              <div style="background-color: #FAFAFA; border-left: 3px solid #E10600; padding: 20px; margin: 32px 0;">
                <p style="margin: 0 0 12px; color: #0F0F0F; font-size: 16px; font-weight: 600;">What happens next?</p>
                <ul style="margin: 0; padding-left: 20px; color: #525252; font-size: 15px; line-height: 1.8;">
                  <li>Our team reviews your requirements</li>
                  <li>We prepare a customized strategy</li>
                  <li>Schedule a discovery call</li>
                  <li>Receive a detailed proposal</li>
                </ul>
              </div>
              
              <p style="margin: 0 0 8px; color: #525252; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to explore our work and case studies.
              </p>
              
              <table cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td style="background-color: #E10600; border-radius: 6px; text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="display: inline-block; padding: 14px 32px; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 16px;">
                      Visit Our Website
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #F5F5F5; padding: 32px 40px; text-align: center; border-top: 1px solid #E5E5E5;">
              <p style="margin: 0 0 8px; color: #525252; font-size: 14px;">
                <strong>Agency K</strong> | Premium Digital Solutions
              </p>
              <p style="margin: 0; color: #525252; font-size: 13px;">
                📧 rpj9011@outlook.com | 📞 +91 9158853996
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

export function getAdminNotificationEmail(lead: any) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Lead Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #FAFAFA;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAFA; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="background-color: #E10600; padding: 24px; text-align: center;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 24px; font-weight: 700;">🎯 New Lead Alert</h1>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 24px; color: #0F0F0F; font-size: 20px; font-weight: 600;">Lead Details</h2>
              
              <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px; background-color: #FAFAFA; border: 1px solid #E5E5E5; font-weight: 600; color: #0F0F0F; width: 140px;">Name</td>
                  <td style="padding: 12px; background-color: #FFFFFF; border: 1px solid #E5E5E5; color: #525252;">${lead.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #FAFAFA; border: 1px solid #E5E5E5; font-weight: 600; color: #0F0F0F;">Company</td>
                  <td style="padding: 12px; background-color: #FFFFFF; border: 1px solid #E5E5E5; color: #525252;">${lead.company}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #FAFAFA; border: 1px solid #E5E5E5; font-weight: 600; color: #0F0F0F;">Email</td>
                  <td style="padding: 12px; background-color: #FFFFFF; border: 1px solid #E5E5E5; color: #525252;">
                    <a href="mailto:${lead.email}" style="color: #E10600; text-decoration: none;">${lead.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #FAFAFA; border: 1px solid #E5E5E5; font-weight: 600; color: #0F0F0F;">Phone</td>
                  <td style="padding: 12px; background-color: #FFFFFF; border: 1px solid #E5E5E5; color: #525252;">
                    <a href="tel:${lead.phone}" style="color: #E10600; text-decoration: none;">${lead.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #FAFAFA; border: 1px solid #E5E5E5; font-weight: 600; color: #0F0F0F;">Budget</td>
                  <td style="padding: 12px; background-color: #FFFFFF; border: 1px solid #E5E5E5; color: #525252; font-weight: 600;">₹${lead.budget}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #FAFAFA; border: 1px solid #E5E5E5; font-weight: 600; color: #0F0F0F;">Services</td>
                  <td style="padding: 12px; background-color: #FFFFFF; border: 1px solid #E5E5E5; color: #525252;">${lead.services.join(', ')}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #FAFAFA; border: 1px solid #E5E5E5; font-weight: 600; color: #0F0F0F; vertical-align: top;">Message</td>
                  <td style="padding: 12px; background-color: #FFFFFF; border: 1px solid #E5E5E5; color: #525252;">${lead.message}</td>
                </tr>
              </table>
              
              <p style="margin: 24px 0 0; color: #525252; font-size: 14px;">
                <strong>Received:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
