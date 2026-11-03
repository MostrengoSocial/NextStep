import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { slides } from '../../data/site';
import { useContent } from './shared';

const SLIDE_MS = 6000;
const pad = (n) => String(n).padStart(2, '0');

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Postcard = () => {
  const { language } = useLanguage();
  const t = useContent().hero;
  const [current, setCurrent] = useState(0);
  const [still] = useState(reducedMotion);

  useEffect(() => {
    if (still) return undefined;
    const id = setTimeout(() => setCurrent((c) => (c + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [current, still]);

  const slide = slides[current];
  return (
    <figure className="postcard rise d2" style={{ margin: 0 }}>
      <div className="postcard-bar mono">
        <span>{pad(current + 1)} / {pad(slides.length)}</span>
        <span>{t.card}</span>
      </div>
      <div className="frames">
        {slides.map((s, i) => (
          <img key={s.place} className={i === current ? 'on' : ''} src={s.src} alt={s.alt[language]} aria-hidden={i !== current} />
        ))}
      </div>
      <div className="postcard-foot">
        <span className="pc-place">{slide.place}</span>
        <span className="coord mono">{slide.coord}</span>
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
          <Postcard />
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
