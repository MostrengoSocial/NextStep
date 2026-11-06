// nextStep · Cloudflare Worker
//
// Serves the built React site (frontend/build) as static assets and handles
// the contact form at POST /api/contact, sending two emails through Cloudflare
// Email Service (the `EMAIL` send_email binding in wrangler.jsonc): a
// notification to the nextStep team and a confirmation to the visitor.
//
// Requires nextstep.com.pt to be onboarded in Email Service > Email Sending
// (Workers Paid plan). Variables (wrangler.jsonc):
//   SENDER_EMAIL        optional, default 'website@nextstep.com.pt'
//   NOTIFICATION_EMAIL  optional, default 'hello@nextstep.com.pt'

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 200, email: 254, phone: 50, service: 200, message: 5000 };

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

// Visitors' text goes into HTML emails, so escape it.
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const sendEmail = (env, { to, subject, html, text, replyTo }) => env.EMAIL.send({
  from: { email: env.SENDER_EMAIL || 'website@nextstep.com.pt', name: 'nextStep' },
  to,
  subject,
  html,
  text,
  ...(replyTo ? { replyTo } : {}),
});

async function handleContact(request, env) {
  if (!env.EMAIL) return json({ error: 'Email service is not configured.' }, 500);

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

  const team = env.NOTIFICATION_EMAIL || 'hello@nextstep.com.pt';
  const notificationText = `New contact form submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nService: ${service || 'Not specified'}\n\n${message}`;
  const confirmationText = `Thank you for reaching out, ${name.split(' ')[0]}!\n\nWe've received your inquiry and will get back to you within 24 hours to schedule your consultation.\n\nYour message:\n${message}\n\nWhatsApp: https://wa.me/351934229144`;

  // The team must get the enquiry; the visitor's confirmation is a courtesy, so a
  // failure there is logged but does not fail the request.
  try {
    await sendEmail(env, { to: team, subject: `nextStep - New Inquiry from ${name}`, html: notificationHtml, text: notificationText, replyTo: email });
  } catch (err) {
    console.error('Contact notification failed:', err.code, err.message);
    return json({ error: 'Your request could not be sent. Please try again.' }, 502);
  }
  try {
    await sendEmail(env, { to: email, subject: "Thank you for contacting nextStep - We'll be in touch soon!", html: confirmationHtml, text: confirmationText, replyTo: team });
  } catch (err) {
    console.error('Contact confirmation failed:', err.code, err.message);
  }
  return json({ success: true });
}

// One canonical address: https://nextstep.com.pt (no www).
const CANONICAL_HOST = 'nextstep.com.pt';
const REDIRECT_HOSTS = new Set(['www.nextstep.com.pt']);

// Security headers for every response. The CSP allows only this site, Google Fonts,
// the Unsplash photos and Cloudflare Web Analytics; inline scripts are not allowed
// (structured data is not executed).
const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': [
    "default-src 'self'",
    // Cloudflare Web Analytics (cookieless) is injected by Cloudflare and reports to cloudflareinsights.com.
    "script-src 'self' https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://images.unsplash.com",
    "connect-src 'self' https://cloudflareinsights.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; '),
};

function withHeaders(response, extra = {}) {
  const res = new Response(response.body, response);
  for (const [k, v] of Object.entries({ ...SECURITY_HEADERS, ...extra })) res.headers.set(k, v);
  return res;
}

// Long cache for fingerprinted build files; short cache for HTML and the crawler files.
function cacheHeaders(pathname, contentType) {
  if (pathname.startsWith('/static/')) return { 'Cache-Control': 'public, max-age=31536000, immutable' };
  if (/text\/html/.test(contentType || '')) return { 'Cache-Control': 'public, max-age=0, must-revalidate' };
  return { 'Cache-Control': 'public, max-age=3600' };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // http -> https and www -> apex, keeping the path and query.
    if (url.protocol === 'http:' || REDIRECT_HOSTS.has(url.hostname)) {
      if (url.hostname === CANONICAL_HOST || REDIRECT_HOSTS.has(url.hostname)) {
        url.protocol = 'https:';
        url.hostname = CANONICAL_HOST;
        url.port = '';
        return Response.redirect(url.toString(), 301);
      }
    }

    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') return withHeaders(json({ error: 'Method not allowed.' }, 405), { Allow: 'POST' });
      return withHeaders(await handleContact(request, env), { 'Cache-Control': 'no-store' });
    }

    // Static site. Pages are prerendered files (/privacy-policy -> privacy-policy.html);
    // unknown addresses get build/404.html with status 404 (see wrangler.jsonc).
    const res = await env.ASSETS.fetch(request);
    return withHeaders(res, cacheHeaders(url.pathname, res.headers.get('content-type')));
  },
};
