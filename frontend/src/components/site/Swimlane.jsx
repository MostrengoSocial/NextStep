import React from 'react';
import { serviceMeta } from '../../data/site';
import { useContent, useReveal } from './shared';

/* S2 · Swimlane plan. One lane per service across a six-month move.
   Positions are percentages of the 0–6 month axis. */
const MONTHS = 6;
const pct = (m) => `${(m / MONTHS) * 100}%`;

export const Swimlane = () => {
  const t = useContent().services.plan;
  const [ref, shown] = useReveal(0.25);
  return (
    <figure className={`plan${shown ? ' is-in' : ''}`} ref={ref}>
      <figcaption className="plan-head">
        <span className="plan-title">{t.title}</span>
        <span className="plan-note">{t.note}</span>
      </figcaption>
      <div className="plan-scroll">
        <div className="plan-chart">
          <div className="plan-axis">
            <span className="plan-label" />
            <div className="plan-track">
              {Array.from({ length: MONTHS + 1 }, (_, m) => (
                <span key={m} className="plan-tick mono" style={{ left: pct(m) }}>{t.month} {m}</span>
              ))}
            </div>
          </div>
          <div className="plan-lanes">
            <div className="plan-grid" aria-hidden="true">
              {Array.from({ length: MONTHS + 1 }, (_, m) => <span key={m} style={{ left: pct(m) }} />)}
              {t.milestones.map(([m, label]) => (
                <span key={label} className="plan-milestone" style={{ left: pct(m) }}><em className="mono">{label}</em></span>
              ))}
            </div>
            {t.lanes.map((lane, i) => (
              <div className="plan-lane" key={lane.short}>
                <span className="plan-label"><i style={{ background: serviceMeta[i].color }} />{lane.short}</span>
                <div className="plan-track">
                  <span
                    className={`plan-bar${lane.light ? ' light' : ''}${lane.open ? ' open' : ''}`}
                    style={{ left: pct(lane.start), width: pct(lane.end - lane.start), '--c': serviceMeta[i].color, transitionDelay: `${i * 90}ms` }}
                  >
                    <span>{lane.text}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
};
