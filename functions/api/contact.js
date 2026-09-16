export async function onRequestPost(context) {
  // 'env' holds your Cloudflare Environment Variables
  // 'request' holds the incoming form data
  const { request, env } = context;

  try {
    // 1. Parse the incoming form data
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // 2. Setup Resend API configuration
    const RESEND_API_KEY = env.RESEND_API_KEY;
    const SENDER_EMAIL = env.SENDER_EMAIL || 'onboarding@resend.dev';
    const NOTIFICATION_EMAIL = env.NOTIFICATION_EMAIL || 'hello@nextstep.com.pt';

    // Helper function to send emails via Resend's REST API
    const sendEmail = async (to, subject, htmlContent) => {
      return fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: SENDER_EMAIL,
          to: to,
          subject: subject,
          html: htmlContent
        })
      });
    };

    // 3. Draft the Emails (Matching your Python templates)
    const notificationHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service || 'Not specified'}</p>
        <div style="background-color: #f5f5f5; padding: 15px; margin-top: 15px;">
          <h3>Message:</h3>
          <p>${message}</p>
        </div>
      </div>
    `;

    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Thank you for reaching out, ${name.split(' ')[0]}!</h2>
        <p>We've received your inquiry and will get back to you within 24 hours to schedule your consultation.</p>
        <p><strong>Your Message Summary:</strong><br/>"${message}"</p>
        <p>Reach us directly via WhatsApp for a faster response: <a href="https://wa.me/351934229144">Chat on WhatsApp</a></p>
      </div>
    `;

    // 4. Send both emails at the same time
    await Promise.all([
      sendEmail([NOTIFICATION_EMAIL], `nextStep - New Inquiry from ${name}`, notificationHtml),
      sendEmail([email], "Thank you for contacting nextStep - We'll be in touch soon!", confirmationHtml)
    ]);

    // 5. Return Success to React!
    return new Response(JSON.stringify({ success: true, message: "Emails sent successfully!" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
