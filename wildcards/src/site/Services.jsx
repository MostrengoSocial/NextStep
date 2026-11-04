import React, { useState } from 'react';
import { serviceMeta } from '../data/site';
import { SectionHead, useContent, useReveal } from './shared';
import { Slot } from '../parts/Slot';
import { ItemNo } from '../parts/Enum';
import { useConfig } from '../store';

/* Services explorer. The six-month swimlane is the menu: each lane is a
   button, and the panel underneath shows what the chosen service covers.
   Lane positions are percentages of the 0–6 month axis (illustrative). */
const MONTHS = 6;
const pct = (m) => `${(m / MONTHS) * 100}%`;
const fmt = (m) => (Number.isInteger(m) ? String(m) : m.toFixed(1));

export const Explorer = () => {
  const t = useContent().services;
  const plan = t.plan;
  const [active, setActive] = useState(0);
  const [ref, shown] = useReveal(0.2);
  const lane = plan.lanes[active];
  const item = t.items[active];
  const meta = serviceMeta[active];

  return (
        <div className={`explorer${shown ? ' is-in' : ''}`} ref={ref} style={{ '--c': meta.color }}>
          <div className="plan-head">
            <span className="plan-title">{plan.title}</span>
            <span className="plan-note">{plan.note} {plan.hint}</span>
          </div>

          <div className="plan-scroll">
            <div className="plan-chart">
              <div className="plan-axis">
                <span className="plan-label" />
                <div className="plan-track">
                  {Array.from({ length: MONTHS + 1 }, (_, m) => (
                    <span key={m} className="plan-tick mono" style={{ left: pct(m) }}>{plan.month} {m}</span>
                  ))}
                </div>
              </div>
              <div className="plan-lanes" role="tablist" aria-label={t.eyebrow}>
                <div className="plan-grid" aria-hidden="true">
                  {Array.from({ length: MONTHS + 1 }, (_, m) => <span key={m} style={{ left: pct(m) }} />)}
                  {plan.milestones.map(([m, label]) => (
                    <span key={label} className="plan-milestone" style={{ left: pct(m) }}><em className="mono">{label}</em></span>
                  ))}
                </div>
                {plan.lanes.map((l, i) => (
                  <button
                    type="button"
                    role="tab"
                    id={`svc-tab-${i}`}
                    aria-selected={i === active}
                    aria-controls="svc-panel"
                    className={`plan-lane${i === active ? ' active' : ''}`}
                    key={l.short}
                    onClick={() => setActive(i)}
                    style={{ '--c': serviceMeta[i].color }}
                  >
                    <span className="plan-label"><i />{t.items[i].title}</span>
                    <span className="plan-track">
                      <span
                        className={`plan-bar${l.light ? ' light' : ''}${l.open ? ' open' : ''}`}
                        style={{ left: pct(l.start), width: pct(l.end - l.start), transitionDelay: `${i * 90}ms` }}
                      >
                        <span>{l.text}</span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="svc-panel" id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${active}`} key={active}>
            <div className="svc-panel-main">
              <p className="svc-panel-meta mono"><b>{meta.code}</b><span>{item.route}</span></p>
              <h3 className="svc-panel-title">{item.title}</h3>
              <p className="svc-panel-tag">{item.tag}</p>
              <p className="svc-panel-text">{item.text}</p>
              <p className="svc-panel-when mono">
                {plan.timing}: {plan.months} {fmt(lane.start)}–{fmt(lane.end)}{lane.open ? ` ${plan.ongoing}` : ''}
              </p>
              <a className="btn btn-primary" href="#contact"><span>{t.link.replace(' →', '')}</span><span className="arr" aria-hidden="true">→</span></a>
            </div>
            <div className="svc-panel-list">
              <p className="mono svc-panel-k">{plan.included}</p>
              <ul>
                {item.includes.map((inc) => <li key={inc}><span className="tick" aria-hidden="true">✓</span>{inc}</li>)}
              </ul>
            </div>
          </div>
        </div>
  );
};

// When another infographic is chosen, the services are still listed in full.
const ServiceList = () => {
  const t = useContent().services;
  return (
    <ol className="svc-list">
      {t.items.map((item, i) => (
        <li key={item.title} style={{ '--c': serviceMeta[i].color }}>
          <ItemNo n={i + 1} />
          <div>
            <h3>{item.title}</h3>
            <p className="svc-list-tag">{item.tag}</p>
            <p>{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
};

export const Services = () => {
  const t = useContent().services;
  const { cfg } = useConfig();
  return (
    <section id="services">
      <div className="wrap">
        <SectionHead n="04" eyebrow={t.eyebrow} a={t.titleA} b={t.titleB} word={t.titleWord} sub={t.sub} />
        <Slot section="services" />
        {cfg.info.services !== 0 && <ServiceList />}
      </div>
    </section>
  );
};
