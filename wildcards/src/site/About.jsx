import React from 'react';
import { images, pride } from '../data/site';
import { Ghost, Headline, useContent, useReveal } from './shared';
import { Slot } from '../parts/Slot';
import { Eyebrow } from '../parts/Enum';

/* A6 · Bridge. A three-tower suspension bridge from "where you are" to
   "your new life". Cable curves are quadratic Béziers with the control point
   at the span's midpoint, so x moves linearly with t and hanger heights can be
   computed directly. */
const DECK = 196;
const TOWER_TOP = 64;
const TOWERS = [330, 600, 870];
const LEFT = 40;
const RIGHT = 1160;

const quadY = (y0, yc, y1, t) => (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * yc + t * t * y1;
const spans = [
  { x0: LEFT, y0: DECK - 8, x1: TOWERS[0], y1: TOWER_TOP, yc: 178 },
  { x0: TOWERS[0], y0: TOWER_TOP, x1: TOWERS[1], y1: TOWER_TOP, yc: 286 },
  { x0: TOWERS[1], y0: TOWER_TOP, x1: TOWERS[2], y1: TOWER_TOP, yc: 286 },
  { x0: TOWERS[2], y0: TOWER_TOP, x1: RIGHT, y1: DECK - 8, yc: 178 },
];
const cablePath = spans
  .map((s, i) => `${i === 0 ? `M${s.x0} ${s.y0}` : ''} Q${(s.x0 + s.x1) / 2} ${s.yc} ${s.x1} ${s.y1}`)
  .join(' ');
const hangers = spans.flatMap((s) => {
  const out = [];
  for (let x = s.x0 + 30; x < s.x1 - 10; x += 30) {
    const t = (x - s.x0) / (s.x1 - s.x0);
    out.push([x, quadY(s.y0, s.yc, s.y1, t)]);
  }
  return out;
});
const towerColors = [pride.red, pride.yellow, pride.blue];
const CHEVRONS = [
  ['M8 8 L20 20 L8 32', '#E44D60', 4], ['M14 8 L26 20 L14 32', '#E8893C', 4], ['M20 8 L32 20 L20 32', '#E8C93C', 4],
  ['M26 11 L35 20 L26 29', '#3BAF6A', 3.5], ['M30 14 L37 20 L30 26', '#4A7FBF', 3],
];

export const Bridge = () => {
  const t = useContent().about.bridge;
  const [ref, shown] = useReveal(0.3);
  return (
    <figure className={`bridge${shown ? ' is-in' : ''}`} ref={ref}>
      <figcaption className="bridge-title">{t.title}</figcaption>
      <div className="bridge-scroll">
        <svg className="bridge-svg" viewBox="0 0 1200 270" role="img" aria-label={t.label}>
          <path className="bridge-water" d="M0 236 Q75 226 150 236 T300 236 T450 236 T600 236 T750 236 T900 236 T1050 236 T1200 236" />
          <path className="bridge-water faint" d="M0 252 Q75 242 150 252 T300 252 T450 252 T600 252 T750 252 T900 252 T1050 252 T1200 252" />
          {hangers.map(([x, y]) => <line key={x} className="bridge-hanger" x1={x} y1={y} x2={x} y2={DECK} />)}
          <path className="bridge-cable" d={cablePath} />
          <line className="bridge-deck" x1={LEFT - 30} y1={DECK} x2={RIGHT + 30} y2={DECK} />
          {TOWERS.map((x, i) => (
            <g key={x}>
              <rect className="bridge-tower" x={x - 7} y={TOWER_TOP - 6} width="14" height={250 - TOWER_TOP} style={{ fill: towerColors[i] }} />
              <text className="bridge-tower-name" x={x} y={TOWER_TOP - 18} textAnchor="middle">{t.towers[i][0]}</text>
            </g>
          ))}
          <g className="bridge-traveller">
            <g transform="translate(0 166) scale(0.75)">
              {CHEVRONS.map(([d, c, w]) => <path key={d} d={d} style={{ fill: 'none', stroke: c, strokeWidth: w, strokeLinecap: 'round', strokeLinejoin: 'round' }} />)}
            </g>
          </g>
          <text className="bridge-end" x={LEFT - 24} y={DECK + 26}>{t.there}</text>
          <text className="bridge-end here" x={RIGHT + 24} y={DECK + 26} textAnchor="end">{t.here}</text>
        </svg>
      </div>
      <ul className="bridge-towers">
        {t.towers.map(([name, text], i) => (
          <li key={name}><span className="bar" style={{ background: towerColors[i] }} /><b>{name}</b><span>{text}</span></li>
        ))}
      </ul>
    </figure>
  );
};

/* A1 · 300 houses. One house per family supported, plus 20 outlined houses
   for families still to come. Houses pop in when the grid scrolls into view. */
const FILLED = 300;
const OPEN = 20;
const houseColors = [pride.red, pride.orange, pride.yellow, pride.green, pride.blue, pride.magenta];

const Houses = () => {
  const t = useContent().about.houses;
  const [ref, shown] = useReveal(0.2);
  return (
    <div className={`houses${shown ? ' is-in' : ''}`} ref={ref}>
      <div className="houses-head">
        <span className="num">300+</span>
        <span className="lbl">{t.title}</span>
      </div>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <symbol id="ns-house" viewBox="0 0 12 12"><path d="M1 11 V5.5 L6 1 L11 5.5 V11 Z" /></symbol>
      </svg>
      <div className="houses-grid" role="img" aria-label={t.label}>
        {Array.from({ length: FILLED + OPEN }, (_, i) => (
          <svg
            key={i}
            className={i < FILLED ? 'h' : 'h open'}
            style={i < FILLED ? { color: houseColors[Math.floor(i / 2) % 6], animationDelay: `${i * 3}ms` } : { animationDelay: `${i * 3}ms` }}
            viewBox="0 0 12 12"
            aria-hidden="true"
          >
            <use href="#ns-house" />
          </svg>
        ))}
      </div>
      <p className="houses-cap">{t.caption} <b>{t.next}.</b></p>
    </div>
  );
};

export const About = () => {
  const t = useContent().about;
  const rest = t.stats.slice(1);
  const restColors = [pride.orange, pride.green, pride.blue];
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
              <Ghost n="2" />
              <Eyebrow n={2} label={t.eyebrow} />
              <Headline a={t.titleA} word={t.titleWord} />
            </div>
            <p className="big">{t.p1}</p>
            <p>{t.p2}</p>
            <a className="svc-link svc-link--accent" href="#contact">{t.link}</a>
          </div>
        </div>

        <div className="about-slot"><Slot section="about" /></div>

        <div className="stats-split">
          <Houses />
          <div className="stats-col">
            {rest.map(([num, label], i) => (
              <div className="stat" key={num}>
                <span className="num">{num}</span>
                <span className="bar" style={{ background: restColors[i] }} />
                <span className="lbl">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
