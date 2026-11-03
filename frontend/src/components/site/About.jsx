import React from 'react';
import { images, pride } from '../../data/site';
import { Headline, useContent } from './shared';

const statColors = [pride.red, pride.orange, pride.green, pride.blue];

export const About = () => {
  const t = useContent().about;
  return (
    <section id="about" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="about-grid">
          <figure className="about-photo" style={{ margin: 0 }}>
            <img src={images.lisbon} alt={t.photoAlt} loading="lazy" />
            <figcaption className="postcard-bar mono">
              <span>Lisboa · Prazeres 28</span>
              <span>38.7223° N · 9.1393° W</span>
            </figcaption>
          </figure>
          <div className="about-copy">
            <div>
              <p className="eyebrow"><b>02</b> / <span>{t.eyebrow}</span></p>
              <Headline a={t.titleA} word={t.titleWord} />
            </div>
            <p className="big">{t.p1}</p>
            <p>{t.p2}</p>
            <a className="svc-link svc-link--accent" href="#contact">{t.link}</a>
          </div>
        </div>
        <div className="stats">
          {t.stats.map(([num, label], i) => (
            <div className="stat" key={num}>
              <span className="num">{num}</span>
              <span className="bar" style={{ background: statColors[i] }} />
              <span className="lbl">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
