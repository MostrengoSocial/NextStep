// nextStep · Cloudflare Worker
//
// Serves the built React site (frontend/build) as static assets and handles
// the contact form at POST /api/contact, sending two emails through Resend:
// a notification to the nextStep team and a confirmation to the visitor.
//
// Secrets and variables (set in the Cloudflare dashboard or with wrangler):
//   RESEND_API_KEY      secret, required   (wrangler secret put RESEND_API_KEY)
//   SENDER_EMAIL        optional, default 'onboarding@resend.dev'
//   NOTIFICATION_EMAIL  optional, default 'hello@nextstep.com.pt'

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 200, email: 254, phone: 50, service: 200, message: 5000 };

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

// Visitors' text goes into HTML emails, so escape it.
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

async function sendEmail(env, to, subject, html, replyTo) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.SENDER_EMAIL || 'onboarding@resend.dev',
      to,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

async function handleContact(request, env) {
  if (!env.RESEND_API_KEY) return json({ error: 'Email service is not configured.' }, 500);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const phone = clean(body.phone, LIMITS.phone);
  const service = clean(body.service, LIMITS.service);
  const message = clean(body.message, LIMITS.message);
  if (!name || !EMAIL_RE.test(email) || !message) {
    return json({ error: 'Please add your name, a valid email and a short message.' }, 400);
  }

  const msgHtml = esc(message).replace(/\n/g, '<br/>');
  const notificationHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Phone:</strong> ${esc(phone) || 'Not provided'}</p>
      <p><strong>Service:</strong> ${esc(service) || 'Not specified'}</p>
      <div style="background-color: #f5f5f5; padding: 15px; margin-top: 15px;">
        <h3>Message:</h3>
        <p>${msgHtml}</p>
      </div>
    </div>`;
  const confirmationHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Thank you for reaching out, ${esc(name.split(' ')[0])}!</h2>
      <p>We've received your inquiry and will get back to you within 24 hours to schedule your consultation.</p>
      <p><strong>Your message:</strong><br/>${msgHtml}</p>
      <p>Reach us directly via WhatsApp for a faster response: <a href="https://wa.me/351934229144">Chat on WhatsApp</a></p>
    </div>`;

  try {
    await Promise.all([
      sendEmail(env, [env.NOTIFICATION_EMAIL || 'hello@nextstep.com.pt'], `nextStep - New Inquiry from ${name}`, notificationHtml, email),
      sendEmail(env, [email], "Thank you for contacting nextStep - We'll be in touch soon!", confirmationHtml),
    ]);
  } catch (err) {
    console.error('Contact form email failed:', err);
    return json({ error: 'Your request could not be sent. Please try again.' }, 502);
  }
  return json({ success: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
      return handleContact(request, env);
    }
    // Everything else is the static site; unknown paths fall back to index.html
    // (see "not_found_handling" in wrangler.jsonc) so React routes still work.
    return env.ASSETS.fetch(request);
  },
};
