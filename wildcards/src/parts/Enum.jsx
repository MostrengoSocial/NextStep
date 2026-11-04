import { useConfig, pad } from '../store.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export const TOTAL_SECTIONS = 7;
const PRIDE = ['var(--red)', 'var(--orange)', 'var(--yellow)', 'var(--green)', 'var(--blue)', 'var(--magenta)', 'var(--accent)'];

export const ENUMS = [
  { name: 'Chevron Steps', note: 'The logo’s chevrons light up one by one: “Step 2 of 7”. Numbering that is literally the next step.' },
  { name: 'Mono Label', note: '“02 / WHO WE ARE”: the mdm.legal × Kohu Labs signature. Calm and familiar.' },
  { name: 'Section Stamp', note: 'A round ink stamp, “SECÇÃO 02”, slightly rotated, like a passport entry.' },
  { name: 'Gate Number', note: 'Black flip tiles, “GATE 02”, like the departures board.' },
  { name: 'Outline Numeral', note: 'A big outlined number beside the label. Graphic and bold.' },
  { name: 'Legal Article', note: 'Numbered like Portuguese law: “Art. 2.º — §”. A wink to the profession and the country.' },
  { name: 'Progress Dots', note: 'Seven dots, the current one filled and larger. Always shows how far you are.' },
  { name: 'Fraction', note: 'A stacked 2 over 7. Clear about where you are and how much is left.' },
  { name: 'Tram Stops', note: 'Stops on a yellow tram line, like Lisbon’s 28: “Paragem 02”.' },
  { name: 'Dossier Tab', note: 'A coloured binder tab with the number, like a legal file.' },
];

export function Chevrons({ n, total = TOTAL_SECTIONS, size = 14 }) {
  return (
    <span className="en-chev" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <svg key={i} width={size} height={size * 1.3} viewBox="0 0 14 18">
          <path d="M3 2 L11 9 L3 16" fill="none" stroke={i < n ? PRIDE[i % PRIDE.length] : 'var(--line)'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}

export function Eyebrow({ n, label, total = TOTAL_SECTIONS, style }) {
  const { cfg } = useConfig();
  const { language } = useLanguage();
  const v = style ?? cfg.enum;
  const pt = language === 'pt';
  const L = <span className="en-l">{label}</span>;
  let body;
  switch (v) {
    case 1: body = <><b className="en-code">{pad(n)}</b><span className="en-sep">/</span>{L}</>; break;
    case 2: body = <><span className="en-stamp"><small>{pt ? 'Secção' : 'Section'}</small><b>{pad(n)}</b></span>{L}</>; break;
    case 3: body = <><span className="en-flaps">{`${pt ? 'PORTA' : 'GATE'} ${pad(n)}`.split('').map((c, i) => (c === ' ' ? <i key={i} className="sp" /> : <i key={i}>{c}</i>))}</span>{L}</>; break;
    case 4: body = <><span className="en-outline">{pad(n)}</span>{L}</>; break;
    case 5: body = <><span className="en-art">Art. {n}.º</span><span className="en-sep">— §</span>{L}</>; break;
    case 6: body = <><span className="en-dots">{Array.from({ length: total }, (_, i) => <i key={i} className={i + 1 === n ? 'on' : i + 1 < n ? 'past' : ''} />)}</span>{L}</>; break;
    case 7: body = <><span className="en-frac"><b>{n}</b><i /><span>{total}</span></span>{L}</>; break;
    case 8: body = <><span className="en-tram">{Array.from({ length: total }, (_, i) => <i key={i} className={i + 1 === n ? 'on' : ''}>{i + 1 === n ? pad(n) : ''}</i>)}</span><span className="en-l">{pt ? 'Paragem' : 'Stop'} {pad(n)} · {label}</span></>; break;
    case 9: body = <><span className="en-tab" style={{ background: PRIDE[(n - 1) % PRIDE.length] }}>{pad(n)}</span>{L}</>; break;
    default: body = <><Chevrons n={n} total={total} /><span className="en-l">{pt ? 'Passo' : 'Step'} {n} {pt ? 'de' : 'of'} {total} · {label}</span></>;
  }
  return <div className={`eyebrow en-${v}`}>{body}</div>;
}

// Numbers for items inside lists (services, reasons).
export function ItemNo({ n, total = 6, style }) {
  const { cfg } = useConfig();
  const v = style ?? cfg.enum;
  const c = PRIDE[(n - 1) % PRIDE.length];
  switch (v) {
    case 1: return <span className="inum in-1">{pad(n)}</span>;
    case 2: return <span className="inum in-2">{pad(n)}</span>;
    case 3: return <span className="inum in-3">{pad(n)}</span>;
    case 4: return <span className="inum in-4">{pad(n)}</span>;
    case 5: return <span className="inum in-5">{n}.º</span>;
    case 6: return <span className="inum in-6" style={{ background: c }} />;
    case 7: return <span className="inum in-7">{n}/{total}</span>;
    case 8: return <span className="inum in-8">{n}</span>;
    case 9: return <span className="inum in-9" style={{ background: c }}>{pad(n)}</span>;
    default: return (
      <span className="inum in-0" aria-hidden="true">
        <svg width="12" height="16" viewBox="0 0 14 18"><path d="M3 2 L11 9 L3 16" fill="none" stroke={c} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    );
  }
}
