import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useContent, ChevronLogo } from '../site/shared.jsx';
import { useConfig } from '../store.jsx';

export const NAV_IDS = ['routes', 'about', 'rights', 'services', 'stories'];

export function Logo({ size = 24, light }) {
  return (
    <a className={`wlogo${light ? ' light' : ''}`} href="#top" aria-label="nextStep home" style={{ '--ls': `${size}px` }}>
      <ChevronLogo />
      <span>nextStep</span>
    </a>
  );
}

export function NavLinks({ className = 'wnav' }) {
  const t = useContent().nav;
  return (
    <nav className={className} aria-label="Main">
      {NAV_IDS.map((id) => <a key={id} href={`#${id}`}>{t[id]}</a>)}
    </nav>
  );
}

export function LangToggle({ className = 'wpill' }) {
  const { language, toggleLanguage } = useLanguage();
  const t = useContent().nav;
  return <button type="button" className={className} onClick={toggleLanguage} aria-label={t.switchLang}>{language === 'en' ? 'PT' : 'EN'}</button>;
}

export function ThemeToggle({ className = 'wpill' }) {
  const { cfg, setDark } = useConfig();
  const t = useContent().nav;
  return (
    <button type="button" className={className} onClick={() => setDark(!cfg.__dark)} aria-label={t.theme}>
      <span className="wdot" aria-hidden="true" />{cfg.__dark ? t.dark : t.light}
    </button>
  );
}

export function Cta({ className = 'wcta', short }) {
  const t = useContent().nav;
  return <a className={className} href="#contact"><span>{short ? (t.cta.split(' ')[0]) : t.cta}</span><span aria-hidden="true">↗</span></a>;
}

/* Live clocks: Faro and the visitor's own time zone. */
function fmt(tz) {
  try { return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(new Date()); }
  catch { return '--:--'; }
}
export function useClock() {
  const [t, setT] = useState(() => ({ faro: fmt('Europe/Lisbon'), you: fmt(undefined) }));
  useEffect(() => {
    const id = setInterval(() => setT({ faro: fmt('Europe/Lisbon'), you: fmt(undefined) }), 20000);
    return () => clearInterval(id);
  }, []);
  return t;
}
export function Clocks({ className = 'wclocks', tiles }) {
  const { faro, you } = useClock();
  const { language } = useLanguage();
  const Val = ({ v }) => (tiles ? <span className="wtiles">{v.split('').map((c, i) => <i key={i}>{c}</i>)}</span> : <b>{v}</b>);
  return (
    <span className={className}>
      <span>Faro <Val v={faro} /></span>
      <i className="wsep" aria-hidden="true" />
      <span className="wyou">{language === 'pt' ? 'Você' : 'You'} <Val v={you} /></span>
    </span>
  );
}

/* Scroll progress 0–1 and the current section number (1–7). */
const SECTION_IDS = ['routes', 'about', 'rights', 'services', 'places', 'stories', 'contact'];
export function useScrollState() {
  const [s, setS] = useState({ p: 0, n: 0 });
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      let n = 0;
      SECTION_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) n = i + 1;
      });
      setS((o) => (o.p === p && o.n === n ? o : { p, n }));
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  return s;
}

export function Progress({ className = 'wprog' }) {
  const { p } = useScrollState();
  return <div className={className} aria-hidden="true"><i style={{ width: `${(p * 100).toFixed(1)}%` }} /></div>;
}

/* Burger + full-screen menu used by every bar below 980 px. */
export function Burger() {
  const [open, setOpen] = useState(false);
  const t = useContent().nav;
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, []);
  return (
    <>
      <button type="button" className={`wburger${open ? ' open' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu"><i /><i /></button>
      <div className={`wmenu${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
        <nav onClick={(e) => e.stopPropagation()}>
          {NAV_IDS.map((id, i) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span className="mono">0{i + 1}</span>{t[id]}</a>)}
          <div className="wmenu-tools"><LangToggle /><ThemeToggle /></div>
          <Cta className="wcta wide" />
        </nav>
      </div>
    </>
  );
}
