import React from 'react';
import { serviceMeta } from '../../data/site';
import { SectionHead, useContent } from './shared';
import { Swimlane } from './Swimlane';

/* Small line diagrams, one per practice area. Stroke and text colours come
   from the theme tokens; `--c` (the card's pride colour) marks the goal. */
const figures = {
  visa: (
    <>
      <path className="sd" d="M40 82 Q150 -6 258 74" />
      <circle className="fs" cx="40" cy="82" r="9" />
      <circle cx="40" cy="82" r="3" style={{ fill: 'var(--ink)' }} />
      <circle className="f" cx="258" cy="74" r="7" />
      <text x="22" y="110">FROM</text>
      <text className="c" x="246" y="102">PT</text>
      <text x="122" y="122">D7 · GOLDEN · NOMAD</text>
    </>
  ),
  property: (
    <>
      <path className="s" d="M42 104 V60 L84 30 L126 60 V104 Z" />
      <rect className="fs" x="72" y="74" width="24" height="30" />
      <path className="s" d="M160 44 h96 M160 66 h96 M160 88 h70" />
      <circle className="f" cx="150" cy="44" r="4" />
      <circle className="f" cx="150" cy="66" r="4" />
      <circle className="fs" cx="150" cy="88" r="4" />
      <text x="160" y="116">DUE DILIGENCE</text>
    </>
  ),
  concierge: (
    <>
      {[['✓ NIF', 18, 26, 38], ['✓ NISS', 108, 26, 124], ['✓ BANK', 198, 26, 216], ['✓ SNS', 18, 72, 38], ['✓ SCHOOL', 108, 72, 122]].map(([label, x, y, tx]) => (
        <g key={label}>
          <rect className="fs" x={x} y={y} width={x === 198 ? 84 : 80} height="30" rx="15" />
          <text x={tx} y={y + 19}>{label}</text>
        </g>
      ))}
      <rect x="198" y="72" width="84" height="30" rx="15" style={{ fill: 'none', stroke: 'var(--c)', strokeWidth: 1.5 }} />
      <text className="c" x="214" y="91">○ KEYS</text>
    </>
  ),
  family: (
    <>
      <circle className="s" cx="122" cy="62" r="34" />
      <circle className="s" cx="168" cy="62" r="34" />
      <circle className="f" cx="145" cy="104" r="8" />
      <path className="sd" d="M145 96 V70" />
      <text x="20" y="30">RECOGNISED</text>
      <text className="c" x="218" y="122">PROTECTED</text>
    </>
  ),
  business: (
    <>
      <rect className="fs" x="120" y="16" width="60" height="28" rx="4" />
      <text x="132" y="34">LDA</text>
      <path className="s" d="M150 44 V62 M70 62 H230 M70 62 V78 M150 62 V78 M230 62 V78" />
      <rect className="fs" x="40" y="78" width="60" height="26" rx="4" />
      <rect className="fs" x="120" y="78" width="60" height="26" rx="4" />
      <rect x="200" y="78" width="60" height="26" rx="4" style={{ fill: 'var(--c)', opacity: 0.9 }} />
      <text x="44" y="122">PERMIT</text>
      <text x="124" y="122">CONTRACT</text>
      <text className="c" x="214" y="122">TAX</text>
    </>
  ),
  community: (
    <>
      <path className="sd" d="M150 66 L70 36 M150 66 L60 96 M150 66 L232 30 M150 66 L240 96 M150 66 L150 16 M70 36 L60 96 M232 30 L240 96" />
      {[[70, 36, 7], [60, 96, 7], [232, 30, 7], [240, 96, 7], [150, 16, 6]].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} className="fs" cx={cx} cy={cy} r={r} />
      ))}
      <circle className="f" cx="150" cy="66" r="12" />
      <text x="132" y="118">DAY ONE</text>
    </>
  ),
};

export const Services = () => {
  const t = useContent().services;
  return (
    <section id="services">
      <div className="wrap">
        <SectionHead n="04" eyebrow={t.eyebrow} a={t.titleA} b={t.titleB} word={t.titleWord} sub={t.sub} />
        <Swimlane />
        <div className="svc-grid">
          {serviceMeta.map((meta, i) => {
            const s = t.items[i];
            return (
              <article className="svc" key={meta.key} style={{ '--c': meta.color }}>
                <div className="svc-top"><b>{meta.code}</b><span>{s.route}</span></div>
                <div className="svc-fig">
                  <svg viewBox="0 0 300 132" aria-hidden="true">{figures[meta.key]}</svg>
                </div>
                <div className="svc-body">
                  <h3 className="h3">{s.title}</h3>
                  <span className="tag">{s.tag}</span>
                  <p>{s.text}</p>
                </div>
                <a className="svc-link" href="#contact">{t.link}</a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
