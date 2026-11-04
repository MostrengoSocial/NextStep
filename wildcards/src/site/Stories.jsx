import React from 'react';
import { images, storyMeta } from '../data/site';
import { ChevronLogo, SectionHead, useContent } from './shared';
import { Slot } from '../parts/Slot';
import { useConfig } from '../store';

/* T4 · Handwritten letter. Each story is a letter on ruled paper with a
   stamp, a route postmark and a handwritten signature. */
const TILTS = [-1.2, 0.8, -0.6];

export const Letters = () => {
  const t = useContent().stories;
  return (
<div className="letters">
          {storyMeta.map((meta, i) => {
            const s = t.items[i];
            return (
              <article className="letter" key={meta.name} style={{ '--c': meta.color, '--tilt': `${TILTS[i]}deg` }}>
                <div className="letter-top">
                  <span className="postmark mono" aria-hidden="true">
                    <span>{t.postmark}</span>
                    <b>{meta.code}</b>
                    <span>{s.via}</span>
                  </span>
                  <span className="stamp" aria-hidden="true"><ChevronLogo /></span>
                </div>
                <p className="letter-dear">{t.dear}</p>
                <blockquote className="letter-body">{s.quote}</blockquote>
                <footer className="letter-sign">
                  <span className="signature">{meta.name}</span>
                  <span className="mono">{s.route}</span>
                </footer>
              </article>
            );
          })}
        </div>
  );
};

const QuoteList = () => {
  const t = useContent().stories;
  return (
    <div className="quote-list">
      {storyMeta.map((meta, i) => (
        <blockquote key={meta.name} style={{ '--c': meta.color }}>
          <p>“{t.items[i].quote}”</p>
          <footer><b>{meta.name}</b> · {t.items[i].route}</footer>
        </blockquote>
      ))}
    </div>
  );
};

export const Stories = () => {
  const t = useContent().stories;
  const { cfg } = useConfig();
  return (
    <section id="stories" className="stories-sec">
      <div className="wrap">
        <SectionHead n="06" eyebrow={t.eyebrow} a={t.titleA} word={t.titleWord} sub={t.sub} />
        <div className="stories-photo"><img src={images.couple} alt={t.photoAlt} loading="lazy" /></div>
        <Slot section="stories" />
        {cfg.info.stories !== 0 && <QuoteList />}
      </div>
    </section>
  );
};
