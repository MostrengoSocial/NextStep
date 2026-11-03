import React from 'react';
import { images, storyMeta } from '../../data/site';
import { ChevronLogo, SectionHead, useContent } from './shared';

/* T4 · Handwritten letter. Each story is a letter on ruled paper with a
   stamp, a route postmark and a handwritten signature. */
const TILTS = [-1.2, 0.8, -0.6];

export const Stories = () => {
  const t = useContent().stories;
  return (
    <section id="stories" className="stories-sec">
      <div className="wrap">
        <SectionHead n="06" eyebrow={t.eyebrow} a={t.titleA} word={t.titleWord} sub={t.sub} />
        <div className="stories-photo"><img src={images.couple} alt={t.photoAlt} loading="lazy" /></div>
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
      </div>
    </section>
  );
};
