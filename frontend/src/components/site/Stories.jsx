import React from 'react';
import { storyMeta } from '../../data/site';
import { SectionHead, useContent } from './shared';

export const Stories = () => {
  const t = useContent().stories;
  return (
    <section id="stories" className="stories-sec">
      <div className="wrap">
        <SectionHead n="06" eyebrow={t.eyebrow} a={t.titleA} word={t.titleWord} sub={t.sub} />
        <div className="stories">
          {storyMeta.map((meta, i) => {
            const s = t.items[i];
            return (
              <article className="story" key={meta.name} style={{ '--c': meta.color }}>
                <div className="story-top mono"><b>{meta.code}</b><span>{s.via}</span></div>
                <blockquote>{s.quote}</blockquote>
                <div className="who">
                  <span className="ini" aria-hidden="true">{meta.initials}</span>
                  <span><strong>{meta.name}</strong><span>{s.route}</span></span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
