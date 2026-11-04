import React from 'react';
import { contact } from '../data/site';
import { useContent } from './shared';

/* C6 · Office map pin. A schematic street plan (not to scale) with the
   office pinned on Largo de São Luís and a link out to directions. */
const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address + ', Portugal')}`;

export const OfficeMap = () => {
  const t = useContent().contact.map;
  return (
    <figure className="office-map">
      <div className="office-map-art">
        <svg viewBox="0 0 600 300" role="img" aria-label={t.label}>
          <g className="om-blocks">
            <rect x="20" y="20" width="150" height="90" rx="6" />
            <rect x="200" y="20" width="120" height="60" rx="6" />
            <rect x="350" y="20" width="230" height="70" rx="6" />
            <rect x="20" y="140" width="110" height="140" rx="6" />
            <rect x="420" y="120" width="160" height="80" rx="6" />
            <rect x="420" y="230" width="160" height="50" rx="6" />
            <rect x="160" y="226" width="230" height="54" rx="6" />
          </g>
          <g className="om-streets">
            <path d="M0 125 H600" />
            <path d="M185 0 V300" />
            <path d="M405 0 V300" />
            <path d="M0 212 L600 104" className="thin" />
          </g>
          <rect className="om-square" x="214" y="104" width="168" height="104" rx="10" />
          <text className="om-square-name" x="298" y="196" textAnchor="middle">Largo de São Luís</text>
          <g className="om-pin" transform="translate(298 152)">
            <circle r="26" className="halo" />
            <path d="M0 6 C-14 -8 -14 -30 0 -30 C14 -30 14 -8 0 6 Z" />
            <circle cy="-17" r="5.5" className="dot" />
          </g>
          <g className="om-north" transform="translate(560 262)">
            <path d="M0 -16 L6 6 L0 1 L-6 6 Z" />
            <text y="20" textAnchor="middle">N</text>
          </g>
          <text className="om-centre" x="30" y="132">{t.centre}</text>
        </svg>
      </div>
      <figcaption className="office-map-foot">
        <span>
          <strong>nextStep · {t.floor}</strong>
          <span>{contact.address}</span>
        </span>
        <a className="btn btn-ghost om-dir" href={DIRECTIONS} target="_blank" rel="noopener noreferrer">
          <span>{t.directions}</span><span className="arr" aria-hidden="true">↗</span>
        </a>
      </figcaption>
      <p className="office-map-note mono">{t.note}</p>
    </figure>
  );
};
