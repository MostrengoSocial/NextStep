import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { slides } from '../../data/site';
import { ChevronLogo, useContent } from './shared';

const SLIDE_MS = 6000;
const pad = (n) => String(n).padStart(2, '0');

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Deterministic barcode widths so the stub looks printed, not random per render.
const BARS = Array.from({ length: 34 }, (_, i) => 1 + ((i * 7 + 3) % 4));

const Barcode = () => {
  let x = 0;
  return (
    <svg className="pass-barcode" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
      {BARS.map((w, i) => {
        const rect = i % 2 === 0 ? <rect key={i} x={x} y="0" width={w} height="40" /> : null;
        x += w;
        return rect;
      })}
    </svg>
  );
};

/* H1 · Boarding pass. The photo slideshow sits in the pass; the route and
   destination change with each photo. */
const BoardingPass = () => {
  const { language } = useLanguage();
  const t = useContent().hero;
  const p = t.pass;
  const [current, setCurrent] = useState(0);
  const [still] = useState(reducedMotion);

  useEffect(() => {
    if (still) return undefined;
    const id = setTimeout(() => setCurrent((c) => (c + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [current, still]);

  const slide = slides[current];
  return (
    <figure className="pass rise d2">
      <div className="pass-photo frames">
        {slides.map((s, i) => (
          <img key={s.place} className={`${i === current ? 'on' : ''}${s.lift ? ' lift' : ''}`} src={s.src} alt={s.alt[language]} aria-hidden={i !== current} />
        ))}
        <span className="pass-count mono">{pad(current + 1)} / {pad(slides.length)}</span>
      </div>
      <div className="pass-body">
        <div className="pass-main">
          <div className="pass-head">
            <span className="pass-brand"><ChevronLogo />nextStep</span>
            <span className="mono">{p.title}</span>
          </div>
          <div className="pass-route" aria-live="polite">
            <div>
              <span className="mono pass-k">{p.from}</span>
              <span className="pass-code">{slide.from}</span>
              <span className="pass-city">{slide.fromCity}</span>
            </div>
            <svg className="pass-plane" viewBox="0 0 80 24" aria-hidden="true">
              <path d="M2 18 Q40 -6 70 12" className="pass-arc" />
              <path d="M64 6 L76 12 L64 16 Z" className="pass-tip" />
            </svg>
            <div>
              <span className="mono pass-k">{p.to}</span>
              <span className="pass-code">{slide.to}</span>
              <span className="pass-city">{slide.place}</span>
            </div>
          </div>
          <dl className="pass-grid mono">
            <div><dt>{p.passenger}</dt><dd>{p.you}</dd></div>
            <div><dt>{p.gate}</dt><dd>Faro</dd></div>
            <div><dt>{p.seat}</dt><dd className="pass-home">{p.home}</dd></div>
            <div><dt>{p.boarding}</dt><dd>{p.now}</dd></div>
          </dl>
        </div>
        <div className="pass-stub">
          <span className="mono pass-k">{p.seat}</span>
          <span className="pass-code pass-home">{p.home}</span>
          <Barcode />
          <span className="mono pass-k">{slide.coord}</span>
          <span className="mono pass-k">{p.stub}</span>
        </div>
      </div>
      <div className="ticks">
        {slides.map((s, i) => (
          <button
            key={`${s.place}-${i === current ? current : 'idle'}`}
            type="button"
            aria-label={`${t.show} ${s.place}`}
            aria-current={i === current}
            onClick={() => setCurrent(i)}
            className={i < current || (still && i === current) ? 'done' : i === current ? 'on' : ''}
          >
            <i />
          </button>
        ))}
      </div>
    </figure>
  );
};

export const Hero = () => {
  const c = useContent();
  const t = c.hero;
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow rise"><span className="live" aria-hidden="true" /><span>{t.eyebrow}</span></p>
            <h1 className="h1 rise d1">
              {t.titleA}<br />{t.titleB} <span className="serif mark">{t.titleWord}</span>
            </h1>
            <p className="lede rise d2">{t.sub}</p>
            <div className="hero-ctas rise d3">
              <a className="btn btn-primary" href="#contact"><span>{t.cta1}</span><span className="arr" aria-hidden="true">↗</span></a>
              <a className="btn btn-ghost" href="#services"><span>{t.cta2}</span><span className="arr" aria-hidden="true">↓</span></a>
            </div>
          </div>
          <BoardingPass />
        </div>
        <dl className="facts mono">
          {c.facts.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
};
