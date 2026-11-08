import React from 'react';
import { images, pride } from '../../data/site';
import { Headline, useContent, useReveal, Eyebrow, Ghost } from './shared';

/* A6 · Bridge. A three-tower suspension bridge from "where you are" to
   "your new life". Cable curves are quadratic Béziers with the control point
   at the span's midpoint, so x moves linearly with t and hanger heights can be
   computed directly. */
const quadY = (y0, yc, y1, t) => (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * yc + t * t * y1;

// Geometry for a bridge `w` units wide: deck, three towers, cable and hangers.
function bridgeGeometry(w) {
  const DECK = 196;
  const TOWER_TOP = 64;
  const LEFT = w < 800 ? 24 : 40;
  const RIGHT = w - LEFT;
  const TOWERS = [w * 0.275, w * 0.5, w * 0.725];
  const spans = [
    { x0: LEFT, y0: DECK - 8, x1: TOWERS[0], y1: TOWER_TOP, yc: 178 },
    { x0: TOWERS[0], y0: TOWER_TOP, x1: TOWERS[1], y1: TOWER_TOP, yc: 286 },
    { x0: TOWERS[1], y0: TOWER_TOP, x1: TOWERS[2], y1: TOWER_TOP, yc: 286 },
    { x0: TOWERS[2], y0: TOWER_TOP, x1: RIGHT, y1: DECK - 8, yc: 178 },
  ];
  const cable = spans.map((s, i) => `${i === 0 ? `M${s.x0} ${s.y0}` : ''} Q${(s.x0 + s.x1) / 2} ${s.yc} ${s.x1} ${s.y1}`).join(' ');
  const step = w < 800 ? 22 : 30;
  const hangers = spans.flatMap((s) => {
    const out = [];
    for (let x = s.x0 + step; x < s.x1 - 8; x += step) out.push([x, quadY(s.y0, s.yc, s.y1, (x - s.x0) / (s.x1 - s.x0))]);
    return out;
  });
  return { DECK, TOWER_TOP, LEFT, RIGHT, TOWERS, cable, hangers };
}
const WIDE = bridgeGeometry(1200);
const NARROW = bridgeGeometry(600);
const water = (w, y) => `M0 ${y}` + Array.from({ length: Math.ceil(w / 150) * 2 }, (_, i) => (i === 0 ? ` Q75 ${y - 10} 150 ${y}` : ` T${150 + i * 150} ${y}`)).join('');

const towerColors = [pride.red, pride.yellow, pride.blue];
const CHEVRONS = [
  ['M8 8 L20 20 L8 32', '#E44D60', 4], ['M14 8 L26 20 L14 32', '#E8893C', 4], ['M20 8 L32 20 L20 32', '#E8C93C', 4],
  ['M26 11 L35 20 L26 29', '#3BAF6A', 3.5], ['M30 14 L37 20 L30 26', '#4A7FBF', 3],
];

// One drawing of the bridge; the phone version is narrower with larger labels, which
// sit below the water (endY) so they clear the towers.
const BridgeSvg = ({ g, w, t, className, h = 270, endY = g.DECK + 28 }) => (
  <svg className={className} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={t.label}>
    <path className="bridge-water" d={water(w, 236)} />
    <path className="bridge-water faint" d={water(w, 252)} />
    {g.hangers.map(([x, y]) => <line key={x} className="bridge-hanger" x1={x} y1={y} x2={x} y2={g.DECK} />)}
    <path className="bridge-cable" d={g.cable} />
    <line className="bridge-deck" x1={g.LEFT - 20} y1={g.DECK} x2={g.RIGHT + 20} y2={g.DECK} />
    {g.TOWERS.map((x, i) => (
      <g key={x}>
        <rect className="bridge-tower" x={x - 7} y={g.TOWER_TOP - 6} width="14" height={250 - g.TOWER_TOP} style={{ fill: towerColors[i] }} />
        <text className="bridge-tower-name" x={x} y={g.TOWER_TOP - 18} textAnchor="middle">{t.towers[i][0]}</text>
      </g>
    ))}
    <g className="bridge-traveller">
      <g transform="translate(0 166) scale(0.75)">
        {CHEVRONS.map(([d, c, sw]) => <path key={d} d={d} style={{ fill: 'none', stroke: c, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' }} />)}
      </g>
    </g>
    <text className="bridge-end" x={g.LEFT - 14} y={endY}>{t.there}</text>
    <text className="bridge-end here" x={g.RIGHT + 14} y={endY} textAnchor="end">{t.here}</text>
  </svg>
);

export const Bridge = () => {
  const t = useContent().about.bridge;
  const [ref, shown] = useReveal(0.3);
  return (
    <figure className={`bridge${shown ? ' is-in' : ''}`} ref={ref}>
      <figcaption className="bridge-title">{t.title}</figcaption>
      <div className="bridge-scroll">
        <BridgeSvg g={NARROW} w={600} t={t} className="bridge-svg compact" h={300} endY={290} />
        <BridgeSvg g={WIDE} w={1200} t={t} className="bridge-svg wide" />
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
const COLS = 25; // 300 houses = 12 rows of 25, two rows per stripe of the pride flag
const FLAG = ['#E40303', '#FF8C00', '#FFED00', '#008026', '#24408E', '#732982'];
const houseColor = (i) => FLAG[Math.floor(Math.floor(i / COLS) / 2)];

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
            style={i < FILLED ? { color: houseColor(i), animationDelay: `${i * 3}ms` } : { animationDelay: `${i * 3}ms` }}
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
              <Ghost n="02" />
              <Eyebrow n="02" label={t.eyebrow} />
              <Headline a={t.titleA} word={t.titleWord} />
            </div>
            <p className="big">{t.p1}</p>
            <p>{t.p2}</p>
            <a className="svc-link svc-link--accent" href="#contact">{t.link}</a>
          </div>
        </div>

        <Bridge />

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
