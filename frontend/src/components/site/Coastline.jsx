import React, { useState } from 'react';
import { REGIONS, REGION_KEYS } from '../../data/maps';
import { useContent, useReveal } from './shared';

/* Destinations map with three tabs: the Algarve, Lisbon and Porto.
   Each region is drawn with a true-proportion equirectangular projection
   (1° of longitude scaled by cos(latitude)) and fitted into the same frame,
   so switching tabs never changes the size of the figure. */
const W = 1200;
const H = 600;
const PAD = 20;
const KM_PER_DEG = 111.32;

function projection({ lon0, lon1, top, bottom }) {
  const k = Math.cos((((top + bottom) / 2) * Math.PI) / 180);
  const s = Math.min((W - PAD * 2) / ((lon1 - lon0) * k), (H - PAD * 2) / (top - bottom));
  const ox = (W - (lon1 - lon0) * k * s) / 2;
  const oy = (H - (top - bottom) * s) / 2;
  const x = (lon) => ox + (lon - lon0) * k * s;
  const y = (lat) => oy + (top - lat) * s;
  return { x, y, s };
}

const fmtCoord = (t) => `${t.lat.toFixed(2)}° N · ${Math.abs(t.lon).toFixed(2)}° W`;

/* A major town: coloured dot, dashed leader to a label block with the name
   and, 18 px below it, the coordinates. */
function Town({ t, x, y, label }) {
  const cx = x(t.lon);
  const cy = y(t.lat);
  const lx = cx + t.dx;
  const ly = cy + t.dy;
  if (t.kind === 'minor') {
    return (
      <g className="coast-minor">
        <circle cx={cx} cy={cy} r="3.5" />
        <text x={lx} y={ly} textAnchor={t.side}>{t.name}</text>
      </g>
    );
  }
  if (t.kind === 'airport') {
    return (
      <g className="coast-airport">
        <rect x={cx - 6} y={cy - 6} width="12" height="12" rx="2" />
        <path d={`M${cx - 3.5} ${cy + 1} L${cx + 3.5} ${cy - 2.5} M${cx - 1} ${cy - 1} L${cx + 1} ${cy + 3}`} />
        <text x={lx} y={ly} textAnchor={t.side}><tspan className="code">{t.name}</tspan> {label}</text>
      </g>
    );
  }
  const above = t.dy < 0;
  // Leader runs from the dot's edge to just short of the label block.
  const endY = above ? ly + 28 : ly - 20;
  const startY = above ? cy - 9 : cy + 9;
  const leader = t.side === 'middle' ? `M${cx} ${startY} L${lx} ${endY}` : `M${cx + (t.side === 'start' ? 9 : -9)} ${cy} L${lx + (t.side === 'start' ? -6 : 6)} ${ly - 5}`;
  const office = t.kind === 'office';
  const body = (
    <g className={`coast-town${office ? ' office' : ''}`}>
      <path className="leader" d={leader} />
      {office && <circle cx={cx} cy={cy} r="15" className="halo" />}
      <circle cx={cx} cy={cy} r={office ? 8 : 6.5} style={office ? undefined : { fill: t.color }} />
      <text className="name" x={lx} y={ly} textAnchor={t.side}>{t.name}</text>
      <text className="coord" x={lx} y={ly + 18} textAnchor={t.side}>{office ? `${fmtCoord(t)} · ${label}` : fmtCoord(t)}</text>
    </g>
  );
  return t.link ? <a href={`#${t.link}`} className="coast-link">{body}</a> : body;
}

function RegionMap({ id, t }) {
  const r = REGIONS[id];
  const { x, y, s } = projection(r.bounds);
  const pts = (list) => list.map(([lon, lat]) => `${x(lon).toFixed(1)} ${y(lat).toFixed(1)}`);
  const km = (r.scaleKm / KM_PER_DEG) * s;
  const copy = t.regions[id];
  return (
    <svg className="coast-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={copy.label}>
      <rect className="coast-sea" width={W} height={H} />
      {r.land.map((poly, i) => <path key={i} className={`coast-land${r.shore ? '' : ' outlined'}`} d={`M${pts(poly).join(' L')} Z`} />)}
      {r.region && <path className="coast-region" d={`M${pts(r.region).join(' L')} Z`} />}
      {r.rivers.map((rv) => <path key={rv.name} className="coast-river" d={`M${pts(rv.points).join(' L')}`} />)}
      {r.shore && <path className="coast-line" d={`M${pts(r.shore).join(' L')}`} pathLength="1" />}

      {r.areas.map((a) => (
        <text key={a.key} className={`coast-area${a.big ? ' region' : ''}`} x={x(a.at[0])} y={y(a.at[1])} textAnchor="middle">{t[a.key]}</text>
      ))}
      {r.rivers.map((rv) => <text key={rv.name} className="coast-river-name" x={x(rv.at[0]) + (rv.dx || 0)} y={y(rv.at[1])}>{rv.name}</text>)}
      {(r.riverLabels || []).map((rl) => <text key={rl.name} className="coast-river-name" x={x(rl.at[0])} y={y(rl.at[1])} textAnchor="middle">{rl.name}</text>)}
      <text className="coast-ocean" x={x(r.ocean[0])} y={y(r.ocean[1])} textAnchor="middle">{t.ocean}</text>

      {r.towns.map((town) => <Town key={town.key} t={town} x={x} y={y} label={town.kind === 'office' ? t.office : t.airport} />)}

      <g className="coast-scale" transform={`translate(${W - 50 - km} ${H - 26})`}>
        <line x1="0" y1="0" x2={km} y2="0" />
        <line x1="0" y1="-5" x2="0" y2="5" />
        <line x1={km} y1="-5" x2={km} y2="5" />
        <text x={km / 2} y="-10" textAnchor="middle">{r.scaleKm} km</text>
      </g>
      <g className="coast-north" transform={`translate(44 ${H - 46})`}>
        <path d="M0 -18 L7 6 L0 1 L-7 6 Z" />
        <text x="0" y="22" textAnchor="middle">N</text>
      </g>
    </svg>
  );
}

export const Coastline = () => {
  const t = useContent().places.coast;
  const [region, setRegion] = useState('algarve');
  const [ref, shown] = useReveal(0.3);
  const copy = t.regions[region];
  return (
    <figure className={`coast${shown ? ' is-in' : ''}`} ref={ref}>
      <figcaption className="coast-head">
        <span className="coast-title">{copy.title}</span>
        <span className="coast-note">{t.note}</span>
      </figcaption>
      <div className="coast-tabs" role="tablist" aria-label={t.tabsLabel}>
        {REGION_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`coast-tab-${key}`}
            aria-selected={region === key}
            aria-controls="coast-panel"
            className={region === key ? 'on' : ''}
            onClick={() => setRegion(key)}
          >
            {t.regions[key].tab}
          </button>
        ))}
      </div>
      <div className="coast-scroll" id="coast-panel" role="tabpanel" aria-labelledby={`coast-tab-${region}`}>
        <RegionMap key={region} id={region} t={t} />
      </div>
    </figure>
  );
};
