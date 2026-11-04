import { useEffect, useState } from 'react';
import { Logo, NavLinks, LangToggle, ThemeToggle, Cta, Clocks, Progress, Burger, useScrollState, NAV_IDS } from './Common.jsx';
import { Chevrons } from './Enum.jsx';
import { useContent, ChevronLogo } from '../site/shared.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { routes, destinations } from '../data/site.js';

export const TOPBARS = [
  { name: 'Spectrum Clocks', note: 'The client’s pick: Faro time and yours in the middle, a pride-colour line under the bar that fills as you scroll.' },
  { name: 'Departures Ticker', note: 'A black strip above the bar with client routes scrolling past. Pauses on hover.' },
  { name: 'Floating Pill', note: 'A rounded glass pill that floats over the page and tightens as you scroll.' },
  { name: 'Boarding Pass', note: 'The bar is a ticket: perforated edge and a stub that reads “Seat · Home” as the Book button.' },
  { name: 'Black Gate', note: 'A black bar with the clocks as flip tiles, like an airport gate screen.' },
  { name: 'Side Rail', note: 'No top bar on desktop: a slim rail on the left with the chevron and section numbers that light up.' },
  { name: 'Shrinking Wordmark', note: 'A huge nextStep wordmark opens the page and shrinks into a normal bar as you scroll.' },
  { name: 'Azulejo Band', note: 'A narrow band of blue Portuguese tiles above a simple bar.' },
  { name: 'Language First', note: 'A big EN | PT switch in the centre, because language is the first thing many visitors need.' },
  { name: 'Bottom Dock', note: 'The menu is a dock at the bottom of the screen, within thumb reach, with the Book button in the middle.' },
];

function Right({ clocks, theme = true }) {
  return (
    <div className="wb-right">
      {clocks && <Clocks className="wclocks wb-hide" />}
      <LangToggle className="wpill wb-hide" />
      {theme && <ThemeToggle className="wpill wb-hide" />}
      <Cta className="wcta wb-hide" />
      <Burger />
    </div>
  );
}

function Bar0() {
  return (
    <header className="wb wb0">
      <div className="wrap wb-row">
        <Logo />
        <NavLinks />
        <Clocks className="wclocks wb-hide" />
        <div className="wb-right"><LangToggle className="wpill wb-hide" /><Cta className="wcta wb-hide" /><Burger /></div>
      </div>
      <Progress className="wprog spectrum" />
    </header>
  );
}

function Bar1() {
  const t = useContent().routes;
  const items = routes.map((r) => `${r.code} → ${destinations[r.to].name.toUpperCase()} · ${r.via.toUpperCase()} · ${t.status[r.status]}`);
  const line = items.join('   ·   ');
  return (
    <header className="wb wb1">
      <div className="wb1-tick" aria-hidden="true"><div className="wb1-run"><span>{line}</span><span>{line}</span></div></div>
      <div className="wrap wb-row"><Logo /><NavLinks /><Right /></div>
    </header>
  );
}

function Bar2() {
  const { p } = useScrollState();
  return (
    <header className={`wb wb2${p > 0.01 ? ' tight' : ''}`}>
      <div className="wb2-pill"><Logo /><NavLinks /><Right theme={false} /></div>
    </header>
  );
}

function Bar3() {
  const t = useContent().hero.pass;
  return (
    <header className="wb wb3">
      <div className="wrap wb-row">
        <Logo />
        <NavLinks />
        <div className="wb-right">
          <LangToggle className="wpill wb-hide" />
          <a className="wb3-stub wb-hide" href="#contact"><small>{t.seat}</small><b>{t.home} ↗</b></a>
          <Burger />
        </div>
      </div>
    </header>
  );
}

function Bar4() {
  return (
    <header className="wb wb4">
      <div className="wrap wb-row">
        <Logo light />
        <Clocks className="wclocks tiles wb-hide" tiles />
        <NavLinks className="wnav light" />
        <div className="wb-right"><LangToggle className="wpill light wb-hide" /><Cta className="wcta hot wb-hide" /><Burger /></div>
      </div>
    </header>
  );
}

function Bar5() {
  const { n } = useScrollState();
  const t = useContent().nav;
  return (
    <>
      <aside className="wb5-rail" aria-label="Sections">
        <a href="#top" className="wb5-logo" aria-label="nextStep home"><ChevronLogo /></a>
        <nav>
          {['routes', 'about', 'rights', 'services', 'places', 'stories', 'contact'].map((id, i) => (
            <a key={id} href={`#${id}`} className={n === i + 1 ? 'on' : ''} title={id}><span>{String(i + 1).padStart(2, '0')}</span></a>
          ))}
        </nav>
        <LangToggle className="wpill tiny" />
      </aside>
      <header className="wb wb5-mobile"><div className="wrap wb-row"><Logo /><Right /></div></header>
      <span className="sr-only">{t.cta}</span>
    </>
  );
}

function Bar6() {
  const { p } = useScrollState();
  const big = p < 0.02;
  return (
    <header className={`wb wb6${big ? ' big' : ''}`}>
      <div className="wrap wb-row">
        <a className="wb6-word" href="#top" aria-label="nextStep home"><ChevronLogo /><span>nextStep</span></a>
        <NavLinks />
        <Right />
      </div>
    </header>
  );
}

function Bar7() {
  return (
    <header className="wb wb7">
      <div className="wb7-tiles" aria-hidden="true" />
      <div className="wrap wb-row"><Logo /><NavLinks /><Right /></div>
    </header>
  );
}

function Bar8() {
  const { language, setLanguage } = useLanguage();
  return (
    <header className="wb wb8">
      <div className="wrap wb-row">
        <Logo />
        <div className="wb8-seg" role="group" aria-label="Language">
          <button type="button" className={language === 'en' ? 'on' : ''} onClick={() => setLanguage('en')}>English</button>
          <button type="button" className={language === 'pt' ? 'on' : ''} onClick={() => setLanguage('pt')}>Português</button>
        </div>
        <div className="wb-right"><NavLinks /><Cta className="wcta wb-hide" /><Burger /></div>
      </div>
    </header>
  );
}

function Bar9() {
  const t = useContent().nav;
  const { n } = useScrollState();
  const icons = { routes: 'M4 16 Q12 2 20 12', about: 'M12 4 a4 4 0 1 1 0 .1 M4 20 q8 -8 16 0', rights: 'M12 3 L19 6 V12 C19 16 16 19 12 21 C8 19 5 16 5 12 V6 Z', stories: 'M4 6 h16 v10 h-9 l-5 4 v-4 h-2 z' };
  const left = ['routes', 'about'], right = ['rights', 'stories'];
  const Item = ({ id }) => (
    <a href={`#${id}`} className={`wb9-it${n === NAV_IDS.indexOf(id) + 1 ? ' on' : ''}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icons[id]} /></svg><span>{t[id]}</span>
    </a>
  );
  return (
    <>
      <header className="wb wb9-top"><div className="wrap wb-row"><Logo /><div className="wb-right"><LangToggle className="wpill" /><ThemeToggle className="wpill wb-hide" /></div></div></header>
      <nav className="wb9-dock" aria-label="Main">
        {left.map((id) => <Item key={id} id={id} />)}
        <a href="#contact" className="wb9-book" aria-label={t.cta}>↗</a>
        {right.map((id) => <Item key={id} id={id} />)}
      </nav>
    </>
  );
}

const BARS = [Bar0, Bar1, Bar2, Bar3, Bar4, Bar5, Bar6, Bar7, Bar8, Bar9];
export function TopBar({ v }) {
  const B = BARS[v] || Bar0;
  return <B />;
}
