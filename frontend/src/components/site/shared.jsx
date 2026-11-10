import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { contact, content } from '../../data/site';

export const useContent = () => {
  const { language } = useLanguage();
  return content[language];
};

export const ChevronLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <path d="M8 8 L20 20 L8 32" stroke="#E44D60" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 8 L26 20 L14 32" stroke="#E8893C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 8 L32 20 L20 32" stroke="#E8C93C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M26 11 L35 20 L26 29" stroke="#3BAF6A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 14 L37 20 L30 26" stroke="#4A7FBF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Two-line headline: first line in ink, second line in the accent colour
   ending on one serif italic word. */
export const Headline = ({ a, b, word }) => (
  <h2 className="h2">
    {a}
    <span className="l2">
      {b ? `${b} ` : ''}
      <span className="serif">{word}</span>
    </span>
  </h2>
);

const STEP_COLORS = ['var(--red)', 'var(--orange)', 'var(--yellow)', 'var(--green)', 'var(--blue)', 'var(--magenta)', 'var(--accent)'];
export const TOTAL_STEPS = 7;

/* The logo's chevron as a small mark; `on` colours it. */
export const Chev = ({ color, size = 14 }) => (
  <svg width={size} height={Math.round(size * 1.3)} viewBox="0 0 14 18" aria-hidden="true" className="chev">
    <path d="M3 2 L11 9 L3 16" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const stepColor = (i) => STEP_COLORS[i % STEP_COLORS.length];

/* Section numbering: seven chevrons, the passed ones lit in pride colours,
   then "Step n of 7 · Label". */
export const Eyebrow = ({ n, label, dark }) => {
  const f = useContent().footer;
  const num = +n;
  return (
    <p className={`eyebrow steps${dark ? ' on-dark' : ''}`}>
      <span className="steps-chev" aria-hidden="true">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => <Chev key={i} color={i < num ? stepColor(i) : 'var(--step-off)'} />)}
      </span>
      <span>{f.step} {num} {f.of} {TOTAL_STEPS}</span>
      <span className="steps-sep" aria-hidden="true">·</span>
      <span className="steps-label">{label}</span>
    </p>
  );
};

/* Large outlined section number behind the heading. */
export const Ghost = ({ n }) => <span className="ghost-num" aria-hidden="true">{String(+n).padStart(2, '0')}</span>;

export const SectionHead = ({ n, eyebrow, a, b, word, sub }) => (
  <div className="sec-head">
    <div className="sec-head-main">
      <Ghost n={n} />
      <Eyebrow n={n} label={eyebrow} />
      <Headline a={a} b={b} word={word} />
    </div>
    {sub && <p className="lede">{sub}</p>}
  </div>
);

/* Adds the "is-in" class once an element scrolls into view, so draw-in
   animations start when seen. Without IntersectionObserver it shows at once. */
export const useReveal = (threshold = 0.25) => {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(() => typeof window === 'undefined' || !('IntersectionObserver' in window));
  React.useEffect(() => {
    if (shown || !ref.current) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown, threshold]);
  return [ref, shown];
};

export const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3z" />
  </svg>
);

// WhatsApp chat link with a greeting already typed in the visitor's language.
export const waLink = (greeting) => `${contact.whatsapp}?text=${encodeURIComponent(greeting)}`;

/* Floating WhatsApp button, bottom-right on every page. */
export const WhatsAppFloat = () => {
  const t = useContent().contact;
  return (
    <a className="wa-float" href={waLink(t.waGreeting)} target="_blank" rel="noopener noreferrer" aria-label={t.waFloat} title={t.waFloat}>
      <WhatsAppIcon />
    </a>
  );
};
