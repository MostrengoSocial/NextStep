import React from 'react';
import { images, storyMeta } from '../../data/site';
import { SectionHead, useContent, useReveal } from './shared';

/* Stories · Six-month journey. Each client story is a row: the quote on the
   left and their own milestones on the right, from first call to home.
   Milestones come from the client's words; timing is shown only where they
   gave it (Marcus & David: "six months later"). */
const Journey = ({ steps, when, color }) => (
  <ol className="jr-line" style={{ '--c': color, '--n': steps.length }}>
    {steps.map((step, i) => {
      const last = i === steps.length - 1;
      return (
        <li key={step} className={last ? 'home' : ''} style={{ '--i': i }}>
          <span className="jr-dot" aria-hidden="true">{last ? '⌂' : i + 1}</span>
          <span className="jr-step">{step}</span>
          {last && when && <span className="jr-when mono">{when}</span>}
        </li>
      );
    })}
  </ol>
);

export const Stories = () => {
  const t = useContent().stories;
  const [ref, shown] = useReveal(0.15);
  return (
    <section id="stories" className="stories-sec">
      <div className="wrap">
        <SectionHead n="06" eyebrow={t.eyebrow} a={t.titleA} word={t.titleWord} sub={t.sub} />
        <div className="stories-photo"><img src={images.couple} alt={t.photoAlt} loading="lazy" /></div>

        <div className={`journeys${shown ? ' is-in' : ''}`} ref={ref}>
          <div className="jr-head">
            <span className="jr-title">{t.journey}</span>
            <span className="jr-note">{t.note}</span>
          </div>
          {storyMeta.map((meta, i) => {
            const s = t.items[i];
            return (
              <article className="jr-row" key={meta.name} style={{ '--c': meta.color }}>
                <div className="jr-quote">
                  <p className="jr-meta mono"><b>{meta.code}</b><span>{s.via}</span></p>
                  <blockquote>“{s.quote}”</blockquote>
                  <footer className="jr-who">
                    <span className="jr-ini" aria-hidden="true">{meta.initials}</span>
                    <span><strong>{meta.name}</strong><span>{s.route}</span></span>
                  </footer>
                </div>
                <Journey steps={s.steps} when={s.when} color={meta.color} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
