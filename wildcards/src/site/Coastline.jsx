import React from 'react';
import { algarveCoast, algarveNorthBorder, algarveWestCoast, coastTowns, guadiana } from '../data/site';
import { useContent, useReveal } from './shared';

/* P2 · The whole Algarve. True-proportion equirectangular projection:
   1° of longitude is scaled by cos(37.2°) relative to 1° of latitude.
   The region is drawn complete (west coast, south coast, Guadiana border,
   northern boundary) with the rest of Portugal and Spain shown around it. */
const W = 1200;
const LON0 = -9.12;
const LON1 = -7.26;
const LAT_TOP = 37.6;
const LAT_BOT = 36.86;
const K = Math.cos((37.2 * Math.PI) / 180);
const S = (W - 40) / ((LON1 - LON0) * K); // px per degree of latitude
const H = Math.round((LAT_TOP - LAT_BOT) * S) + 20;
const x = (lon) => 20 + (lon - LON0) * K * S;
const y = (lat) => 10 + (LAT_TOP - lat) * S;
const pts = (list) => list.map(([lon, lat]) => `${x(lon).toFixed(1)} ${y(lat).toFixed(1)}`);

// Coastline: west coast down to Sagres, then the south coast to the Guadiana.
const shore = [...algarveWestCoast, ...algarveCoast.slice(1)];
const shoreLine = `M${pts(shore).join(' L')}`;
// All land (Portugal and Spain) above the shore, closed against the frame.
const land = `M${x(algarveWestCoast[0][0])} 0 L${pts(shore).join(' L')} L${x(-7.33)} ${y(37.2)} L${W} ${y(37.22)} L${W} 0 Z`;
// The Algarve region itself.
const region = `M${pts([...shore.slice(1), ...guadiana.slice(1, 5), ...algarveNorthBorder.slice(1)]).join(' L')} Z`;
const river = `M${pts(guadiana).join(' L')}`;

const KM_PER_DEG = 111.32;
const tenKm = (10 / KM_PER_DEG) * S; // 10 km in px (scale is true along both axes)

const placeColors = { lagos: 'var(--orange)', qdl: 'var(--green)', tavira: 'var(--blue)' };
// Label offsets (dx, dy) relative to each town's dot.
const LABEL = { lagos: [-36, -46], qdl: [-30, -54], tavira: [-44, -46] };

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
        <svg className="coast-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t.label}>
          <path className="coast-land" d={land} />
          <path className="coast-region" d={region} />
          <path className="coast-river" d={river} />
          <path className="coast-line" d={shoreLine} pathLength="1" />

          <text className="coast-area" x={x(-8.25)} y={y(37.5)} textAnchor="middle">{t.north}</text>
          <text className="coast-area" x={x(-7.33)} y={y(37.42)} textAnchor="middle">{t.spain}</text>
          <text className="coast-area region" x={x(-8.2)} y={y(37.25)} textAnchor="middle">{t.region}</text>
          <text className="coast-river-name" x={x(-7.43) + 10} y={y(37.33)}>{t.river}</text>
          <text className="coast-ocean" x={x(-8.55)} y={y(36.93)} textAnchor="middle">{t.ocean}</text>

          {coastTowns.map((town) => {
            const cx = x(town.lon);
            const cy = y(town.lat);
            if (town.minor) {
              // Most minor labels sit above the dot; these two sit beside it
              // to stay clear of the Lagos and Tavira labels.
              const pos = {
                vrsa: [cx - 8, cy + 22, 'end'],
                portimao: [cx + 9, cy + 4, 'start'],
              }[town.key] || [cx, cy - 10, 'middle'];
              return (
                <g key={town.key} className="coast-minor">
                  <circle cx={cx} cy={cy} r="3.5" />
                  <text x={pos[0]} y={pos[1]} textAnchor={pos[2]}>{town.name}</text>
                </g>
              );
            }
            if (town.office) {
              // Office label sits in the sea, below the coast.
              return (
                <g key={town.key} className="coast-town office">
                  <line x1={cx} y1={cy + 12} x2={cx} y2={cy + 50} />
                  <circle cx={cx} cy={cy} r="15" className="halo" />
                  <circle cx={cx} cy={cy} r="8" />
                  <text className="name" x={cx} y={cy + 68} textAnchor="middle">{town.name}</text>
                  <text className="coord" x={cx} y={cy + 81} textAnchor="middle">{t.office}</text>
                </g>
              );
            }
            const [dx, dy] = LABEL[town.key];
            return (
              <a key={town.key} href={`#${town.anchor}`} className="coast-link">
                <g className="coast-town">
                  <line x1={cx} y1={cy - 9} x2={cx + dx} y2={cy + dy + 18} />
                  <circle cx={cx} cy={cy} r="6.5" style={{ fill: placeColors[town.key] }} />
                  <text className="name" x={cx + dx} y={cy + dy} textAnchor="middle">{town.name}</text>
                  <text className="coord" x={cx + dx} y={cy + dy + 12} textAnchor="middle">
                    {`${town.lat.toFixed(2)}° N · ${Math.abs(town.lon).toFixed(2)}° W`}
                  </text>
                </g>
              </a>
            );
          })}

          <g className="coast-scale" transform={`translate(${W - 60 - tenKm} ${H - 26})`}>
            <line x1="0" y1="0" x2={tenKm} y2="0" />
            <line x1="0" y1="-5" x2="0" y2="5" />
            <line x1={tenKm} y1="-5" x2={tenKm} y2="5" />
            <text x={tenKm / 2} y="-10" textAnchor="middle">{t.km}</text>
          </g>
          <g className="coast-north" transform={`translate(52 ${H - 46})`}>
            <path d="M0 -18 L7 6 L0 1 L-7 6 Z" />
            <text x="0" y="22" textAnchor="middle">N</text>
          </g>
        </svg>
      </div>
    </figure>
  );
};
