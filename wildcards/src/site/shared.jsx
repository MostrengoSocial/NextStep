import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/site';
import { Eyebrow } from '../parts/Enum';
import { useConfig, pad } from '../store';

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

/* Huge outlined section number behind the heading (the "ghost numbers" wildcard toggle). */
export const Ghost = ({ n }) => {
  const { cfg } = useConfig();
  return cfg.ghost ? <span className="ghost-num" aria-hidden="true">{pad(+n)}</span> : null;
};

export const SectionHead = ({ n, eyebrow, a, b, word, sub }) => (
  <div className="sec-head">
    <div className="sec-head-main">
      <Ghost n={n} />
      <Eyebrow n={+n} label={eyebrow} />
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
