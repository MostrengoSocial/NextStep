import React from 'react';
import { images } from '../../data/site';
import { SectionHead, useContent } from './shared';

const Place = ({ className = '', src, alt, region, coord, name, text }) => (
  <figure className={`place ${className}`}>
    <img src={src} alt={alt} loading="lazy" />
    <figcaption>
      <span className="t"><span>{region}</span><span>{coord}</span></span>
      <span>
        <span className="n">{name}</span>
        <span className="d">{text}</span>
      </span>
    </figcaption>
  </figure>
);

export const Places = () => {
  const t = useContent().places;
  return (
    <section id="places" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead n="05" eyebrow={t.eyebrow} a={t.titleA} b={t.titleB} word={t.titleWord} sub={t.sub} />
        <div className="places">
          <Place className="tall" src={images.quintaDoLago} alt="Quinta do Lago" region="Algarve" coord="37.0287° N · 8.0170° W" name="Quinta do Lago" text={t.qdl} />
          <Place src={images.tavira} alt="Tavira" region="Algarve" coord="37.1264° N" name="Tavira" text={t.tavira} />
          <Place src={images.lagos} alt="Lagos" region="Algarve" coord="37.0814° N" name="Lagos" text={t.lagos} />
          <Place
            className="wide pending"
            src={images.villa}
            alt={t.villaAlt}
            region={t.pendingTag}
            coord={t.pendingState}
            name={<>{t.pendingTitle} <span className="serif">{t.pendingWord}</span></>}
            text={t.pendingText}
          />
        </div>
      </div>
    </section>
  );
};
