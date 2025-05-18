import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { SendGrid } from "https://deno.land/x/sendgrid@0.0.3/mod.ts"

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
if (!SENDGRID_API_KEY) {
  throw new Error('Missing SENDGRID_API_KEY environment variable')
}

const sendgrid = new SendGrid(SENDGRID_API_KEY)
const verifiedEmail = 'abutalha7778@gmail.com' // Your verified SendGrid sender

// Basic email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email) && 
         email.length <= 254 && // RFC 5321
         !email.includes('..') && // No consecutive dots
         !/@.*@/.test(email) // No multiple @ symbols
}

// Basic phone number validation
function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s-]{10,}$/.test(phone)
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    })
  }

  try {
    const { record } = await req.json()

    // Validate required fields
    if (!record?.name || !record?.email || !record?.phone_number || !record?.province || !record?.message) {
      throw new Error('Missing required fields')
    }

    // Validate email
    if (!isValidEmail(record.email)) {
      throw new Error('Invalid email format')
    }

    // Validate phone number
    if (!isValidPhone(record.phone_number)) {
      throw new Error('Invalid phone number format')
    }

    // Validate message length
    if (record.message.length < 10 || record.message.length > 1000) {
      throw new Error('Message must be between 10 and 1000 characters')
    }
    
    // Format the message with a nice HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header {
              background: #ef4444;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 30px;
              background: #f9fafb;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: white;
              border-radius: 6px;
              box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            }
            .label {
              font-weight: 600;
              color: #374151;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .value {
              margin-top: 5px;
              color: #1f2937;
              word-break: break-word;
            }
            .footer {
              text-align: center;
              padding: 20px;
              background: #f3f4f6;
              font-size: 12px;
              color: #6b7280;
            }
            .timestamp {
              font-size: 12px;
              color: #6b7280;
              text-align: right;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${record.name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${record.email}</div>
              </div>
              <div class="field">
                <div class="label">Phone</div>
                <div class="value">${record.phone_number}</div>
              </div>
              <div class="field">
                <div class="label">Province</div>
                <div class="value">${record.province}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="value">${record.message}</div>
              </div>
              <div class="timestamp">
                Submitted at: ${new Date(record.created_at).toLocaleString()}
              </div>
            </div>
            <div class="footer">
              This is an automated notification from your MyCIP contact form.
              <br>Please do not reply to this email.
            </div>
          </div>
        </body>
      </html>
    `

    // Plain text version for email clients that don't support HTML
    const textContent = `
New Contact Form Submission

Name: ${record.name}
Email: ${record.email}
Phone: ${record.phone_number}
Province: ${record.province}

Message:
${record.message}

Submitted at: ${new Date(record.created_at).toLocaleString()}

---
This is an automated notification from your MyCIP contact form.
    `.trim()

    // Send email using SendGrid
    const email = {
      to: verifiedEmail,
      from: {
        email: verifiedEmail,
        name: 'MyCIP Contact Form'
      },
      subject: '🔔 New Contact Form Submission - MyCIP',
      text: textContent,
      html: emailHtml,
      replyTo: record.email // Add reply-to header
    }

    console.log('Sending email notification...')
    await sendgrid.send(email)
    console.log('Email notification sent successfully')

    return new Response(
      JSON.stringify({ message: 'Notification sent successfully' }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    )
  } catch (error) {
    console.error('Error sending notification:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Please check your form inputs and try again.'
      }),
      { 
        status: 400, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    )
  }
})