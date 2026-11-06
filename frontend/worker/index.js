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

// One canonical address: https://nextstep.com.pt (no www).
const CANONICAL_HOST = 'nextstep.com.pt';
const REDIRECT_HOSTS = new Set(['www.nextstep.com.pt']);

// Security headers for every response. The CSP allows only this site, Google Fonts
// and the Unsplash photos; inline scripts are not allowed (structured data is not executed).
const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://images.unsplash.com",
    "connect-src 'self'",
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
