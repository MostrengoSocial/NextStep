import { useState } from 'react';
import { useConfig, pad, INFO_SECTIONS } from '../store.jsx';
import { TopBar, TOPBARS } from '../parts/TopBars.jsx';
import { Footer, FOOTERS } from '../parts/Footers.jsx';
import { Background, BACKGROUNDS } from '../parts/Backgrounds.jsx';
import { Eyebrow, ItemNo, ENUMS } from '../parts/Enum.jsx';
import { FONTS, fontVars } from '../fonts.js';
import { INFO, INFO_LABELS } from '../info/index.js';
import { Logo } from '../parts/Common.jsx';

const TABS = [
  ['info', 'Infographics', '8 × 10'],
  ['topbar', 'Top bars', '10'],
  ['footer', 'Footers', '10'],
  ['bg', 'Backgrounds', '10'],
  ['enum', 'Numbering', '10'],
  ['font', 'Typefaces', '10'],
];

function Card({ i, name, note, active, onUse, children, wide, badge }) {
  return (
    <div className={`gx-card ${active ? 'active' : ''} ${wide ? 'wide' : ''}`}>
      <div className="gx-stage">{children}</div>
      <div className="gx-meta">
        <div>
          <span className="mono gx-n">Wildcard {pad(i + 1)}{badge ? ` · ${badge}` : ''}</span>
          <b>{name}</b>
          {note && <p>{note}</p>}
        </div>
        <button type="button" className={`gx-use ${active ? 'on' : ''}`} onClick={onUse}>{active ? 'In use ✓' : 'Use this'}</button>
      </div>
    </div>
  );
}

const Headline = () => <div className="pv-h">Your next step is <span className="serif">home.</span></div>;

export default function Gallery() {
  const { cfg, set, setInfo } = useConfig();
  const [tab, setTab] = useState('info');
  const [sec, setSec] = useState('hero');
  const back = () => { window.location.hash = '#top'; };

  return (
    <div className="gx">
      <header className="gx-top">
        <div className="wrap gx-row">
          <Logo />
          <span className="mono gx-hide">Redesign proposal · wildcard gallery</span>
          <a className="wcta" href="#top">← Back to site</a>
        </div>
      </header>
      <div className="wrap">
        <div className="gx-intro">
          <Eyebrow n={1} label="Wildcard gallery" total={6} />
          <h1 className="h1">Every option, <span className="serif">side by side.</span></h1>
          <p className="lede">Ten wildcards for every infographic, top bar, footer, background, numbering style and typeface. “Use this” applies it to the live site; your choices are saved in this browser. Wildcard 01 is always the design already approved or picked.</p>
        </div>
        <nav className="gx-tabs" aria-label="Categories">
          {TABS.map(([k, l, n]) => <button type="button" key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}<span className="mono">{n}</span></button>)}
        </nav>

        {tab === 'info' && (
          <>
            <nav className="gx-sub" aria-label="Sections">{INFO_SECTIONS.map((s) => <button type="button" key={s} className={sec === s ? 'on' : ''} onClick={() => setSec(s)}>{INFO_LABELS[s]}</button>)}</nav>
            <div className={`gx-grid ${sec}`}>
              {INFO[sec].map(({ C, name, note, approved }, i) => (
                <Card key={name} i={i} name={name} note={note} badge={approved ? 'approved' : ''} wide={approved} active={cfg.info[sec] === i} onUse={() => setInfo(sec, i)}>
                  <div className={`gx-info ${approved ? 'full' : ''} ${approved && sec === 'rights' ? 'band gx-band' : ''}`}><C /></div>
                </Card>
              ))}
            </div>
          </>
        )}

        {tab === 'topbar' && (
          <div className="gx-list">
            {TOPBARS.map((t, i) => (
              <Card key={t.name} i={i} name={t.name} note={t.note} wide active={cfg.topbar === i} onUse={() => { set('topbar', i); back(); }}>
                <div className={`pv pv-bar pv-bar-${i}`}>
                  <TopBar v={i} />
                  <div className="pv-fake"><div className="wrap"><span className="mono">LGBTQIA+ relocation law · Portugal</span><Headline /></div></div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === 'footer' && (
          <div className="gx-list">
            {FOOTERS.map((f, i) => (
              <Card key={f.name} i={i} name={f.name} note={f.note} wide active={cfg.footer === i} onUse={() => { set('footer', i); back(); }}>
                <div className="pv pv-foot"><Footer v={i} /></div>
              </Card>
            ))}
          </div>
        )}

        {tab === 'bg' && (
          <div className="gx-grid">
            {BACKGROUNDS.map((b, i) => (
              <Card key={b.name} i={i} name={b.name} note={b.note} active={cfg.bg === i} onUse={() => set('bg', i)}>
                <div className="pv pv-bg" data-theme={b.dark ? 'dark' : undefined}>
                  <Background v={i} />
                  <div className="pv-bg-in"><span className="mono">03 / Why Portugal</span><div className="pv-h">Rights written <span className="serif">into law.</span></div></div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === 'enum' && (
          <div className="gx-grid">
            {ENUMS.map((e, i) => (
              <Card key={e.name} i={i} name={e.name} note={e.note} active={cfg.enum === i} onUse={() => set('enum', i)}>
                <div className="pv-enum">
                  <Eyebrow n={2} label="Who we are" style={i} />
                  <div className="pv-h">Lawyers who <span className="serif">get it.</span></div>
                  <ul className="pv-list">{['Immigration & visas', 'Real estate', 'Relocation concierge'].map((s, k) => <li key={s}><ItemNo n={k + 1} style={i} />{s}</li>)}</ul>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === 'font' && (
          <div className="gx-grid">
            {FONTS.map((f, i) => (
              <Card key={f.name} i={i} name={f.name} note={f.note} active={cfg.font === i} onUse={() => set('font', i)}>
                <div className="pv-font" style={fontVars(f)}>
                  <span className="mono">{f.display} · {f.body} · {f.mono}</span>
                  <div className="pv-h big">Your next step is <span className="serif">home.</span></div>
                  <p>Legal guidance and personal support for LGBTQIA+ people and families moving to Portugal.</p>
                  <span className="mono">Golden Visa · D7 · NIF — 0123456789</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
