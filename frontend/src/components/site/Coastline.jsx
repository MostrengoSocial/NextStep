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

function projection({ lon0, lon1, top, bottom }, w = W, h = H) {
  const k = Math.cos((((top + bottom) / 2) * Math.PI) / 180);
  const s = Math.min((w - PAD * 2) / ((lon1 - lon0) * k), (h - PAD * 2) / (top - bottom));
  const ox = (w - (lon1 - lon0) * k * s) / 2;
  const oy = (h - (top - bottom) * s) / 2;
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
  return t.link ? <a href={`#${t.link}`} className="coast-link" aria-label={`${t.name}: ${label}`}>{body}</a> : body;
}

/* Phone version: the region fitted to a 400-wide frame (height follows the region's
   shape), towns as numbered markers, and the names and coordinates in a list below,
   so nothing overlaps and nothing needs sideways scrolling. */
const CW = 400;
const compactHeight = ({ lon0, lon1, top, bottom }) => {
  const k = Math.cos((((top + bottom) / 2) * Math.PI) / 180);
  return Math.round(((CW - PAD * 2) / ((lon1 - lon0) * k)) * (top - bottom) + PAD * 2);
};
export const numberedTowns = (towns) => towns.filter((tw) => tw.kind !== 'minor');

function RegionMapCompact({ id, t }) {
  const r = REGIONS[id];
  const ch = compactHeight(r.bounds);
  const { x, y, s } = projection(r.bounds, CW, ch);
  const pts = (list) => list.map(([lon, lat]) => `${x(lon).toFixed(1)} ${y(lat).toFixed(1)}`);
  const km = (r.scaleKm / KM_PER_DEG) * s;
  const copy = t.regions[id];
  const numbered = numberedTowns(r.towns);
  return (
    <div className="coast-compact">
      <svg className="coast-svg compact" viewBox={`0 0 ${CW} ${ch}`} role="img" aria-label={copy.label}>
        <rect className="coast-sea" width={CW} height={ch} />
        {r.land.map((poly, i) => <path key={i} className={`coast-land${r.shore ? '' : ' outlined'}`} d={`M${pts(poly).join(' L')} Z`} />)}
        {r.region && <path className="coast-region" d={`M${pts(r.region).join(' L')} Z`} />}
        {r.rivers.map((rv) => <path key={rv.name} className="coast-river" d={`M${pts(rv.points).join(' L')}`} />)}
        {r.shore && <path className="coast-line" d={`M${pts(r.shore).join(' L')}`} pathLength="1" />}
        {r.areas.filter((a) => a.big).map((a) => (
          <text key={a.key} className="coast-area region" x={x(a.at[0])} y={y(a.at[1])} textAnchor="middle">{t[a.key]}</text>
        ))}
        <text className="coast-ocean" x={CW / 2} y={ch - 12} textAnchor="middle">{t.ocean}</text>
        {r.towns.filter((tw) => tw.kind === 'minor').map((tw) => <circle key={tw.key} className="coast-minor-dot" cx={x(tw.lon)} cy={y(tw.lat)} r="2.5" />)}
        {numbered.map((tw, i) => {
          // A marker can be nudged off a crowded spot; a leader then points to the real position.
          const px = x(tw.lon) + (tw.cdx || 0);
          const py = y(tw.lat) + (tw.cdy || 0);
          return (
            <g key={tw.key} className={`coast-pin${tw.kind ? ` ${tw.kind}` : ''}`}>
              {(tw.cdx || tw.cdy) && <line className="coast-pin-leader" x1={x(tw.lon)} y1={y(tw.lat)} x2={px} y2={py} />}
              {(tw.cdx || tw.cdy) && <circle className="coast-pin-spot" cx={x(tw.lon)} cy={y(tw.lat)} r="2" />}
              <circle cx={px} cy={py} r="8" style={tw.kind ? undefined : { fill: tw.color }} />
              <text x={px} y={py + 3.5} textAnchor="middle">{i + 1}</text>
            </g>
          );
        })}
        <g className="coast-scale" transform={`translate(${CW - 16 - km} ${ch - 34})`}>
          <line x1="0" y1="0" x2={km} y2="0" />
          <line x1="0" y1="-4" x2="0" y2="4" />
          <line x1={km} y1="-4" x2={km} y2="4" />
          <text x={km / 2} y="-8" textAnchor="middle">{r.scaleKm} km</text>
        </g>
      </svg>
      <ol className="coast-legend">
        {numbered.map((tw, i) => {
          const note = tw.kind === 'office' ? t.office : tw.kind === 'airport' ? t.airport : null;
          const body = (
            <>
              <span className={`coast-legend-n${tw.kind ? ` ${tw.kind}` : ''}`} style={tw.kind ? undefined : { background: tw.color }}>{i + 1}</span>
              <span className="coast-legend-name">{tw.kind === 'airport' ? `${tw.name} · ${t.airport}` : tw.name}{note && tw.kind === 'office' && <em> · {note}</em>}</span>
              <span className="coast-legend-coord mono">{fmtCoord(tw)}</span>
            </>
          );
          return <li key={tw.key}>{tw.link ? <a href={`#${tw.link}`}>{body}</a> : body}</li>;
        })}
      </ol>
    </div>
  );
}

function RegionMap({ id, t }) {
  const r = REGIONS[id];
  const { x, y, s } = projection(r.bounds);
  const pts = (list) => list.map(([lon, lat]) => `${x(lon).toFixed(1)} ${y(lat).toFixed(1)}`);
  const km = (r.scaleKm / KM_PER_DEG) * s;
  const copy = t.regions[id];
  return (
    <svg className="coast-svg wide" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={copy.label}>
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

      {r.towns.map((town) => <Town key={town.key} t={town} x={x} y={y} label={town.kind === 'office' ? t.office : town.kind === 'airport' ? t.airport : t.seePhoto} />)}

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
        <RegionMapCompact key={`c-${region}`} id={region} t={t} />
        <RegionMap key={region} id={region} t={t} />
      </div>
    </figure>
  );
};
