import React from 'react';
import { algarveCoast, coastTowns } from '../../data/site';
import { useContent, useReveal } from './shared';

/* P2 · Algarve coastline. True-proportion equirectangular projection:
   1° of longitude is scaled by cos(37°) relative to 1° of latitude. */
const W = 1200;
const H = 300;
const LON0 = -9.05;
const LON1 = -7.35;
const LAT_TOP = 37.24;
const K = Math.cos((37.1 * Math.PI) / 180);
const S = (W - 80) / ((LON1 - LON0) * K); // px per degree of latitude
const x = (lon) => 40 + (lon - LON0) * K * S;
const y = (lat) => 40 + (LAT_TOP - lat) * S;

const coast = algarveCoast.map(([lon, lat]) => `${x(lon).toFixed(1)} ${y(lat).toFixed(1)}`);
const coastLine = `M${coast.join(' L')}`;
const land = `M${x(LON0 - 0.1)} 0 L${x(LON0 - 0.1)} ${y(37.12)} L${coast.join(' L')} L${W} ${y(37.2)} L${W} 0 Z`;
const KM_PER_DEG = 111.32;
const tenKm = (10 / (KM_PER_DEG * K)) * K * S; // 10 km in px along the x axis

const placeColors = { lagos: 'var(--orange)', qdl: 'var(--green)', tavira: 'var(--blue)' };

export const Coastline = () => {
  const t = useContent().places.coast;
  const [ref, shown] = useReveal(0.3);
  return (
    <figure className={`coast${shown ? ' is-in' : ''}`} ref={ref}>
      <figcaption className="coast-head">
        <span className="coast-title">{t.title}</span>
        <span className="coast-note">{t.note}</span>
      </figcaption>
      <div className="coast-scroll">
        <svg className="coast-svg" viewBox={`0 0 ${W} ${H + 56}`} role="img" aria-label={t.label}>
          <path className="coast-land" d={land} />
          <path className="coast-line" d={coastLine} pathLength="1" />
          <text className="coast-ocean" x={W / 2 - 120} y={H + 34} textAnchor="middle">{t.ocean}</text>

          {coastTowns.map((town) => {
            const cx = x(town.lon);
            const cy = y(town.lat);
            if (town.minor) {
              return (
                <g key={town.key} className="coast-minor">
                  <circle cx={cx} cy={cy} r="3.5" />
                  <text x={cx} y={cy - 12} textAnchor="middle">{town.name}</text>
                </g>
              );
            }
            // The office label sits below the coast, in the sea, so it never
            // collides with Quinta do Lago just to the west.
            const top = town.office ? cy + 12 : cy - 10;
            const end = town.office ? cy + 52 : 64;
            const nameY = town.office ? cy + 70 : 48;
            const label = (
              <g className={`coast-town${town.office ? ' office' : ''}`}>
                <line x1={cx} y1={top} x2={cx} y2={end} />
                <circle cx={cx} cy={cy} r={town.office ? 8 : 6.5} style={town.office ? undefined : { fill: placeColors[town.key] }} />
                {town.office && <circle cx={cx} cy={cy} r="15" className="halo" />}
                <text className="name" x={cx} y={nameY} textAnchor="middle">{town.name}</text>
                <text className="coord" x={cx} y={nameY + 12} textAnchor="middle">
                  {town.office ? t.office : `${town.lat.toFixed(2)}° N · ${Math.abs(town.lon).toFixed(2)}° W`}
                </text>
              </g>
            );
            return town.anchor
              ? <a key={town.key} href={`#${town.anchor}`} className="coast-link">{label}</a>
              : <g key={town.key}>{label}</g>;
          })}

          <g className="coast-scale" transform={`translate(${W - 60 - tenKm} ${H + 30})`}>
            <line x1="0" y1="0" x2={tenKm} y2="0" />
            <line x1="0" y1="-5" x2="0" y2="5" />
            <line x1={tenKm} y1="-5" x2={tenKm} y2="5" />
            <text x={tenKm / 2} y="-10" textAnchor="middle">{t.km}</text>
          </g>
          <g className="coast-north" transform="translate(70 290)">
            <path d="M0 -18 L7 6 L0 1 L-7 6 Z" />
            <text x="0" y="22" textAnchor="middle">N</text>
          </g>
        </svg>
      </div>
    </figure>
  );
};
