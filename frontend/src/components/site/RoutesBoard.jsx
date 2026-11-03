import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { routes } from '../../data/site';
import { SectionHead, useContent } from './shared';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const WIDTH = { from: 13, to: 7, via: 9, status: 8 };
const FRAME_MS = 55;
const LAST_FRAME = 15;

/* One split-flap word. Each tile shows scrambled glyphs until its own
   settle frame, then its real letter. `seed` staggers the tiles. */
const Flaps = ({ text, width, frame, seed }) => {
  const chars = text.padEnd(width, ' ').slice(0, width).split('');
  return (
    <span className="flaps" aria-hidden="true">
      {chars.map((ch, i) => {
        if (ch === ' ') return <span key={i} className="flap blank">&nbsp;</span>;
        const settle = 6 + ((seed + i) % 9);
        const shown = frame >= settle ? ch : GLYPHS[(seed * 7 + i * 13 + frame * 5) % GLYPHS.length];
        return <span key={i} className="flap">{shown}</span>;
      })}
    </span>
  );
};

export const RoutesBoard = () => {
  const { language } = useLanguage();
  const t = useContent().routes;
  const [frame, setFrame] = useState(LAST_FRAME);

  // Re-run the flip whenever the language changes (and on first load).
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    setFrame(0);
    const id = setInterval(() => {
      setFrame((f) => {
        if (f + 1 >= LAST_FRAME) clearInterval(id);
        return Math.min(f + 1, LAST_FRAME);
      });
    }, FRAME_MS);
    return () => clearInterval(id);
  }, [language]);

  return (
    <section id="routes">
      <div className="wrap">
        <SectionHead n="01" eyebrow={t.eyebrow} a={t.titleA} b={t.titleB} word={t.titleWord} sub={t.sub} />
        <div className="board-shell">
          <div className="board-scroll">
            <table className="board" aria-label={t.label}>
              <thead>
                <tr>{t.cols.map((c) => <th key={c}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {routes.map((r, row) => {
                  const status = t.status[r.status];
                  const cells = [[r.from, WIDTH.from], [r.to, WIDTH.to], [r.via, WIDTH.via], [status, WIDTH.status]];
                  return (
                    <tr key={r.from} className={`st-${r.status}`}>
                      {cells.map(([text, width], col) => (
                        <td key={col} aria-label={text}>
                          <Flaps text={text} width={width} frame={frame} seed={row * 4 + col} />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="board-legend">
            <span>{t.legend[0]}</span>
            <span>{t.legend[1]}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
