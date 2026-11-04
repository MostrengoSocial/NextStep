import { useState } from 'react';
import { useConfig, pad, INFO_SECTIONS } from '../store.jsx';
import { TOPBARS } from './TopBars.jsx';
import { FOOTERS } from './Footers.jsx';
import { BACKGROUNDS } from './Backgrounds.jsx';
import { ENUMS } from './Enum.jsx';
import { FONTS } from '../fonts.js';
import { INFO, INFO_LABELS } from '../info/index.js';

export const CATS = [
  { key: 'topbar', label: 'Top bar', list: TOPBARS },
  { key: 'footer', label: 'Footer', list: FOOTERS },
  { key: 'bg', label: 'Background', list: BACKGROUNDS },
  { key: 'enum', label: 'Numbering', list: ENUMS },
  { key: 'font', label: 'Typeface', list: FONTS },
];

function Row({ label, i, list, onStep }) {
  return (
    <div className="dk-row">
      <span className="dk-l">{label}</span>
      <div className="dk-ctl">
        <button type="button" onClick={() => onStep(-1)} aria-label={`Previous ${label}`}>‹</button>
        <span className="dk-v"><b>{pad(i + 1)}</b> {list[i].name}</span>
        <button type="button" onClick={() => onStep(1)} aria-label={`Next ${label}`}>›</button>
      </div>
    </div>
  );
}

function Seg({ label, a, b, on, onA, onB }) {
  return (
    <div className="dk-row">
      <span className="dk-l">{label}</span>
      <div className="dk-seg">
        <button type="button" className={on ? 'on' : ''} onClick={onA}>{a}</button>
        <button type="button" className={!on ? 'on' : ''} onClick={onB}>{b}</button>
      </div>
    </div>
  );
}

export function Deck() {
  const { cfg, step, stepInfo, shuffle, reset, toggle, setDark } = useConfig();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('system');
  return (
    <div className={`deck ${open ? 'open' : ''}`}>
      {open && (
        <div className="dk-panel" role="dialog" aria-label="Wildcard deck">
          <div className="dk-head">
            <div><span className="mono dk-k">nextStep · redesign proposal</span><b>Wildcard deck</b></div>
            <button type="button" className="dk-x" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>
          <div className="dk-tabs">
            <button type="button" className={tab === 'system' ? 'on' : ''} onClick={() => setTab('system')}>System</button>
            <button type="button" className={tab === 'info' ? 'on' : ''} onClick={() => setTab('info')}>Infographics</button>
          </div>
          <div className="dk-body">
            {tab === 'system'
              ? <>
                {CATS.map((c) => <Row key={c.key} label={c.label} i={cfg[c.key]} list={c.list} onStep={(d) => step(c.key, d)} />)}
                <Seg label="Theme" a="Light" b="Dark" on={!cfg.__dark} onA={() => setDark(false)} onB={() => setDark(true)} />
                <Seg label="Ghost numbers" a="On" b="Off" on={cfg.ghost} onA={() => !cfg.ghost && toggle('ghost')} onB={() => cfg.ghost && toggle('ghost')} />
              </>
              : INFO_SECTIONS.map((s) => <Row key={s} label={INFO_LABELS[s]} i={cfg.info[s]} list={INFO[s]} onStep={(d) => stepInfo(s, d)} />)}
          </div>
          <div className="dk-foot">
            <button type="button" onClick={shuffle}>⤮ Shuffle all</button>
            <button type="button" onClick={reset}>Reset to picks</button>
            <button type="button" onClick={() => toggle('clean')}>{cfg.clean ? 'Show arrows' : 'Hide arrows'}</button>
            <a href="#/wildcards" onClick={() => setOpen(false)}>Gallery →</a>
          </div>
        </div>
      )}
      <button type="button" className="dk-fab" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="dk-cards" aria-hidden="true"><i /><i /><i /></span>
        Wildcards
      </button>
    </div>
  );
}
