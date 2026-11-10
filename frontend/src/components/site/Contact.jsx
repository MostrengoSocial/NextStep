import React, { useState } from 'react';
import { contact } from '../../data/site';
import { Headline, useContent, Eyebrow, Ghost, WhatsAppIcon, waLink } from './shared';
import { OfficeMap } from './OfficeMap';

const EMPTY = { name: '', email: '', phone: '', from: '', service: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CopyButton = ({ value, label, done }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }, () => {});
  };
  return <button className="copy" type="button" onClick={copy}>{copied ? done : label}</button>;
};

export const Contact = () => {
  const t = useContent().contact;
  const f = t.form;
  const [data, setData] = useState(EMPTY);
  const [state, setState] = useState('idle'); // idle | sending | sent | missing | error

  const set = (field) => (e) => setData((d) => ({ ...d, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!data.name.trim() || !EMAIL_RE.test(data.email.trim()) || !data.message.trim()) {
      setState('missing');
      return;
    }
    setState('sending');
    try {
      const message = data.from.trim() ? `Moving from: ${data.from.trim()}\n\n${data.message}` : data.message;
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim() || null,
          service: data.service || null,
          message,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState('sent');
      setData(EMPTY);
    } catch (err) {
      console.error('Contact form error:', err);
      setState('error');
    }
  };

  return (
    <section id="contact">
      <div className="wrap contact-grid">
        <div className="contact-copy">
          <div>
            <Ghost n="07" />
              <Eyebrow n="07" label={t.eyebrow} />
            <Headline a={t.titleA} word={t.titleWord} />
          </div>
          <p className="lede">{t.sub}</p>
          <OfficeMap />
          <dl className="info">
            <div><dt className="mono">{t.office}</dt><dd>{contact.address}</dd><span /></div>
            <div><dt className="mono">{t.email}</dt><dd>{contact.email}</dd><CopyButton value={contact.email} label={t.copy} done={t.copied} /></div>
            <div><dt className="mono">{t.phone}</dt><dd><a href={contact.tel}>{contact.phone}</a></dd><CopyButton value={contact.phone.replace(/\s/g, '')} label={t.copy} done={t.copied} /></div>
            <div><dt className="mono">{t.hours}</dt><dd>{t.hoursValue}</dd><span /></div>
          </dl>
          <a className="wa" href={waLink(t.waGreeting)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <span><strong>{t.whatsapp}</strong><span>{t.whatsappDesc}</span></span>
            <span className="arr" aria-hidden="true">↗</span>
          </a>
        </div>

        <form className="form" onSubmit={submit} noValidate>
          <div className="form-top mono"><b>{f.tag}</b><span>{f.ref}</span></div>
          <div className="row2">
            <div className="field"><label htmlFor="f-name">{f.name}</label><input id="f-name" name="name" autoComplete="name" required value={data.name} onChange={set('name')} /></div>
            <div className="field"><label htmlFor="f-email">{f.email}</label><input id="f-email" name="email" type="email" autoComplete="email" required value={data.email} onChange={set('email')} /></div>
          </div>
          <div className="row2">
            <div className="field"><label htmlFor="f-phone">{f.phone}</label><input id="f-phone" name="phone" type="tel" autoComplete="tel" value={data.phone} onChange={set('phone')} /></div>
            <div className="field"><label htmlFor="f-from">{f.from}</label><input id="f-from" name="from" autoComplete="country-name" value={data.from} onChange={set('from')} /></div>
          </div>
          <div className="field">
            <label htmlFor="f-service">{f.service}</label>
            <select id="f-service" name="service" value={data.service} onChange={set('service')}>
              <option value="">—</option>
              {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="field grow">
            <label htmlFor="f-msg">{f.message}</label>
            <textarea id="f-msg" name="message" required placeholder={f.placeholder} value={data.message} onChange={set('message')} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={state === 'sending'}>
            <span>{state === 'sending' ? f.sending : f.submit}</span><span className="arr" aria-hidden="true">→</span>
          </button>
          <div aria-live="polite">
            {state === 'sent' && <p className="sent">{f.success}</p>}
            {state === 'missing' && <p className="form-error">{f.missing}</p>}
            {state === 'error' && <p className="form-error">{f.error}</p>}
            {(state === 'idle' || state === 'sending') && <p className="form-note">{f.note}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};
