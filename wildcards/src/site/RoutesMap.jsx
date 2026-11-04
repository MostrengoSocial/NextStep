import React from 'react';
import { destinations, portugalOutline, routes } from '../data/site';
import { SectionHead, useContent, useReveal } from './shared';
import { Slot } from '../parts/Slot';

/* R1 · Atlantic arc map. Origins are plotted by real latitude/longitude on a
   simple equirectangular grid. Portugal is drawn as an enlarged inset on the
   right so each destination city can carry its own arc. */

const W = 1000;
const H = 520;
// Main chart: longitude -130..-30, latitude 60..-30.
const MAP = { x0: 40, x1: 690, y0: 34, y1: 486, lon0: -130, lon1: -30, lat0: 60, lat1: -30 };
const mx = (lon) => MAP.x0 + ((lon - MAP.lon0) / (MAP.lon1 - MAP.lon0)) * (MAP.x1 - MAP.x0);
const my = (lat) => MAP.y0 + ((MAP.lat0 - lat) / (MAP.lat0 - MAP.lat1)) * (MAP.y1 - MAP.y0);

// Inset: mainland Portugal, scaled with cos(latitude) so the shape isn't stretched.
const INSET = { x: 730, y: 34, w: 240, h: 452 };
const PT = { lon0: -9.7, lat0: 42.3, lat1: 36.8, k: Math.cos((39.5 * Math.PI) / 180) };
const ptScale = (INSET.h - 40) / (PT.lat0 - PT.lat1);
const px = (lon) => INSET.x + 24 + (lon - PT.lon0) * PT.k * ptScale;
const py = (lat) => INSET.y + 20 + (PT.lat0 - lat) * ptScale;

const outline = `M${portugalOutline.map(([lon, lat]) => `${px(lon).toFixed(1)} ${py(lat).toFixed(1)}`).join(' L')} Z`;

const arcPath = (x1, y1, x2, y2) => {
  const lift = Math.max(60, Math.abs(x2 - x1) * 0.28);
  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - lift;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};

const LABEL_SIDE = { YYZ: 'left', JFK: 'right', GRU: 'left', GIG: 'right' };

const LON_LINES = [-120, -105, -90, -75, -60, -45, -30];
const LAT_LINES = [60, 45, 30, 15, 0, -15, -30];
const fmtLon = (v) => `${Math.abs(v)}°W`;
const fmtLat = (v) => (v === 0 ? '0°' : `${Math.abs(v)}°${v > 0 ? 'N' : 'S'}`);

export const RoutesAtlas = () => {
  const t = useContent().routes;
  const [ref, shown] = useReveal(0.2);
  return (
    <div className="atlas-block">
        <div className={`atlas${shown ? ' is-in' : ''}`} ref={ref}>
          <svg className="atlas-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t.label}>
            {/* graticule */}
            <g className="atlas-grid">
              {LON_LINES.map((lon) => (
                <g key={lon}>
                  <line x1={mx(lon)} y1={MAP.y0} x2={mx(lon)} y2={MAP.y1} />
                  <text x={mx(lon) + 4} y={MAP.y1 - 6}>{fmtLon(lon)}</text>
                </g>
              ))}
              {LAT_LINES.map((lat) => (
                <g key={lat}>
                  <line x1={MAP.x0} y1={my(lat)} x2={MAP.x1} y2={my(lat)} className={lat === 0 ? 'eq' : ''} />
                  <text x={MAP.x0 + 4} y={my(lat) - 5}>{fmtLat(lat)}</text>
                </g>
              ))}
            </g>

            {/* inset frame with Portugal */}
            <rect className="atlas-inset" x={INSET.x} y={INSET.y} width={INSET.w} height={INSET.h} rx="10" />
            <path className="atlas-pt" d={outline} />
            <text className="atlas-inset-label" x={INSET.x + INSET.w - 16} y={INSET.y + 26} textAnchor="end">{t.inset}</text>

            {/* arcs */}
            {routes.map((r, i) => {
              const d = destinations[r.to];
              const path = arcPath(mx(r.lon), my(r.lat), px(d.lon), py(d.lat));
              return (
                <path
                  key={r.code}
                  d={path}
                  pathLength="1"
                  className={`atlas-arc ${r.status}`}
                  style={{ stroke: r.color, transitionDelay: `${i * 0.18}s` }}
                />
              );
            })}

            {/* origins: labels go beside the dot where two cities sit close together */}
            {routes.map((r) => {
              const x = mx(r.lon);
              const y = my(r.lat);
              const side = LABEL_SIDE[r.code];
              const lx = side === 'left' ? x - 16 : side === 'right' ? x + 16 : x;
              const anchor = side === 'left' ? 'end' : side === 'right' ? 'start' : 'middle';
              const ly = side ? y + 2 : y + 26;
              return (
                <g key={`o-${r.code}`} className="atlas-origin">
                  <circle cx={x} cy={y} r="6" style={{ fill: r.color }} />
                  <circle cx={x} cy={y} r="11" style={{ stroke: r.color }} className="halo" />
                  <text x={lx} y={ly} textAnchor={anchor} className="code">{r.code}</text>
                  <text x={lx} y={ly + 16} textAnchor={anchor} className="city">{r.from}</text>
                </g>
              );
            })}

            {/* destinations */}
            {Object.entries(destinations).map(([key, d]) => {
              const x = px(d.lon);
              const y = py(d.lat);
              const below = key === 'faro';
              const right = key !== 'cascais' && key !== 'lagos';
              return (
                <g key={key} className="atlas-dest">
                  <circle cx={x} cy={y} r="5.5" />
                  {below
                    ? <text x={x} y={y + 24} textAnchor="middle">{d.name}</text>
                    : <text x={right ? x + 12 : x - 12} y={y + 5} textAnchor={right ? 'start' : 'end'}>{d.name}</text>}
                </g>
              );
            })}
          </svg>
        </div>

        <ul className="route-list">
          {routes.map((r) => (
            <li key={r.code} className={r.status}>
              <span className="route-swatch" style={{ background: r.color }} aria-hidden="true" />
              <span className="route-name"><b>{r.from}</b> <span className="route-to">{t.arrow} {destinations[r.to].name}</span></span>
              <span className="mono route-via">{r.via}</span>
              <span className={`mono route-status ${r.status}`}>{t.status[r.status]}</span>
            </li>
          ))}
        </ul>
        <div className="board-legend">
          <span>{t.legend[0]}</span>
          <span>{t.legend[1]}</span>
        </div>
        <p className="atlas-note">{t.note}</p>
    </div>
  );
};

export const RoutesMap = () => {
  const t = useContent().routes;
  return (
    <section id="routes">
      <div className="wrap">
        <SectionHead n="01" eyebrow={t.eyebrow} a={t.titleA} b={t.titleB} word={t.titleWord} sub={t.sub} />
        <Slot section="routes" />
      </div>
    </section>
  );
};
