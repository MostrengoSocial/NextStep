import React from 'react';
import { timelineColors, whyColors } from '../data/site';
import { SectionHead, useContent } from './shared';
import { Slot } from '../parts/Slot';
import { ItemNo } from '../parts/Enum';

export const Timeline = () => {
  const t = useContent().rights;
  return (
    <div className="timeline">
      {t.timeline.map(([year, title, text], i) => (
        <div className="tl" key={year} style={{ '--c': timelineColors[i] }}>
          <span className="yr">{year}</span>
          <p><strong>{title}</strong>{text}</p>
        </div>
      ))}
    </div>
  );
};

export const Rights = () => {
  const t = useContent().rights;
  return (
    <section id="rights" className="band">
      <div className="wrap">
        <SectionHead n="03" eyebrow={t.eyebrow} a={t.titleA} b={t.titleB} word={t.titleWord} sub={t.sub} />
        <Slot section="rights" />
        <div className="why">
          <ul>
            {t.why.map((point, i) => (
              <li key={i} style={{ '--c': whyColors[i] }}>
                <ItemNo n={i + 1} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
