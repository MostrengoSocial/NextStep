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

/* Leader from a dot to its label: a straight dashed line on the line between the
   dot's centre and the label's near edge, starting just outside the dot, so it always
   points exactly at the dot. */
function leaderPath(cx, cy, r, tx, ty) {
  const dx = tx - cx;
  const dy = ty - cy;
  const len = Math.hypot(dx, dy);
  if (len < r + 8) return null;
  const sx = cx + (dx / len) * (r + 3);
  const sy = cy + (dy / len) * (r + 3);
  return `M${sx.toFixed(1)} ${sy.toFixed(1)} L${tx.toFixed(1)} ${ty.toFixed(1)}`;
}

/* A town: coloured dot (larger for district and regional capitals), a dashed leader
   to a label block with the name and, 18 px below it, the coordinates. */
function Town({ t, x, y, label }) {
  const rx = x(t.lon);
  const ry = y(t.lat);
  if (t.kind === 'minor') {
    return (
      <g className="coast-minor">
        <circle cx={rx} cy={ry} r="3.5" />
        <text x={rx + t.dx} y={ry + t.dy} textAnchor={t.side}>{t.name}</text>
      </g>
    );
  }
  if (t.kind === 'airport') {
    // Nudged off a crowded spot: draw the icon offset, with a leader to the real position.
    const cx = rx + (t.ndx || 0);
    const cy = ry + (t.ndy || 0);
    const nudged = Boolean(t.ndx || t.ndy);
    return (
      <g className="coast-airport">
        {nudged && <line className="nudge" x1={rx} y1={ry} x2={cx} y2={cy} />}
        {nudged && <circle className="spot" cx={rx} cy={ry} r="2" />}
        <rect x={cx - 6} y={cy - 6} width="12" height="12" rx="2" />
        <path d={`M${cx - 3.5} ${cy + 1} L${cx + 3.5} ${cy - 2.5} M${cx - 1} ${cy - 1} L${cx + 1} ${cy + 3}`} />
        <text x={cx + t.dx} y={cy + t.dy} textAnchor={t.side}><tspan className="code">{t.name}</tspan> {label}</text>
      </g>
    );
  }
  const cx = rx;
  const cy = ry;
  const lx = cx + t.dx;
  const ly = cy + t.dy;
  const office = t.kind === 'office';
  const r = office ? 10 : t.capital ? 9 : 6.5;
  // The leader ends just short of the label block: under the coordinates for a label
  // above the dot, over the name for a label below, beside the name for a side label.
  const above = t.dy < 0;
  const tx = t.side === 'middle' ? lx : lx + (t.side === 'start' ? -6 : 6);
  const ty = t.side === 'middle' ? (above ? ly + 27 : ly - 19) : ly - 5;
  const leader = leaderPath(cx, cy, r, tx, ty);
  const body = (
    <g className={`coast-town${office ? ' office' : ''}${t.capital ? ' capital' : ''}`}>
      {leader && <path className="leader" d={leader} />}
      {office && <circle cx={cx} cy={cy} r="17" className="halo" />}
      <circle cx={cx} cy={cy} r={r} style={office ? undefined : { fill: t.color }} />
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
        {r.areas.filter((a) => a.big || a.island).map((a) => (
          <text key={a.key} className={`coast-area${a.big ? ' region' : ' island'}`} x={x((a.cat || a.at)[0])} y={y((a.cat || a.at)[1])} textAnchor="middle">{a.name || t[a.key]}</text>
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
              <circle cx={px} cy={py} r={tw.capital ? 10.5 : 8} style={tw.kind ? undefined : { fill: tw.color }} />
              <text x={px} y={py + 3.5} textAnchor="middle">{i + 1}</text>
            </g>
          );
        })}
        <g className="coast-scale" transform={`translate(${r.compactScaleLeft ? 16 : CW - 16 - km} ${ch - 34})`}>
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
        <text key={a.key} className={`coast-area${a.big ? ' region' : ''}${a.island ? ' island' : ''}`} x={x(a.at[0])} y={y(a.at[1])} textAnchor="middle">{a.name || t[a.key]}</text>
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
