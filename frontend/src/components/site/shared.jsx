import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/site';

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

export const SectionHead = ({ n, eyebrow, a, b, word, sub }) => (
  <div className="sec-head">
    <div>
      <p className="eyebrow"><b>{n}</b> / <span>{eyebrow}</span></p>
      <Headline a={a} b={b} word={word} />
    </div>
    {sub && <p className="lede">{sub}</p>}
  </div>
);
