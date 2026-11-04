import { useContent, ChevronLogo } from '../site/shared.jsx';
import { contact, algarveCoast, algarveWestCoast } from '../data/site.js';
import { Cta, NAV_IDS } from './Common.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export const FOOTERS = [
  { name: 'One Last Question', note: 'The client’s pick: “Ready for your next step?”, one Book button, then a single quiet line with everything else.' },
  { name: 'Postcard', note: 'The back of a postcard: “See you in Portugal”, the office address on the lines, a stamp and a Faro postmark.' },
  { name: 'Final Call', note: 'A dark departures board: “FINAL CALL” in flip tiles with one big Book button.' },
  { name: 'Map Footer', note: 'The Algarve coast runs across the footer with the office pinned in Faro; links sit in the sea.' },
  { name: 'Spectrum Stairs', note: 'Six coloured steps climb across the footer, one per pride colour, ending at Book.' },
  { name: 'Algarve Sunset', note: 'Raspberry fading through orange into night, a low sun, the wordmark in white.' },
  { name: 'Table of Contents', note: 'The footer reads like the contents page of a book, with dotted leaders. Tidy and very legal.' },
  { name: 'Signed Off', note: 'A handwritten “See you in Portugal” with a signature from the team. Warm and personal.' },
  { name: 'Tile Mosaic', note: 'A grid of azulejo-style tiles, each one a link. The Contact tile is raspberry.' },
  { name: 'Big Wordmark', note: 'The current site: a dark band, giant wordmark, link columns and the spectrum stripe.' },
];

const LEGAL = ['https://www.nextstep.com.pt/privacy-policy', 'https://www.nextstep.com.pt/terms-of-service', 'https://www.nextstep.com.pt/legal-disclaimer'];
const PRIDE = ['var(--red)', 'var(--orange)', 'var(--yellow)', 'var(--green)', 'var(--blue)', 'var(--magenta)'];

function useF() {
  const c = useContent();
  const { language } = useLanguage();
  return { c, pt: language === 'pt', t: c.footer, nav: c.nav };
}
function Fine({ className = 'wf-fine' }) {
  const { t } = useF();
  return (
    <p className={className}>
      <span>Faro · {contact.email} · {contact.phone}</span>
      {t.legalLinks.map((l, i) => <a key={l} href={LEGAL[i]} target="_blank" rel="noopener noreferrer">{l}</a>)}
      <span>© {new Date().getFullYear()} nextStep</span>
    </p>
  );
}
function Links({ className = 'wf-links' }) {
  const { nav } = useF();
  return <nav className={className} aria-label="Footer">{NAV_IDS.map((id) => <a key={id} href={`#${id}`}>{nav[id]}</a>)}<a href="#contact">{nav.contact}</a></nav>;
}
const Spectrum = () => <div className="wf-spectrum" aria-hidden="true" />;

function F0() {
  const { c } = useF();
  return (
    <footer className="wf wf0">
      <div className="wrap">
        <h2 className="wf0-q">{c.contact.titleA} <span className="serif">{c.contact.titleWord}</span></h2>
        <Cta className="wcta big" />
        <Fine />
      </div>
    </footer>
  );
}

function F1() {
  const { t, pt } = useF();
  return (
    <footer className="wf wf1">
      <div className="wrap">
        <div className="wf1-card">
          <div className="wf1-msg">
            <p className="wf-hand">{pt ? 'Até breve,' : 'See you in'}<br />{pt ? 'em Portugal.' : 'Portugal.'}</p>
            <Links />
          </div>
          <div className="wf1-addr">
            <div className="wf1-stamp" aria-hidden="true"><ChevronLogo /></div>
            <div className="wf1-post mono" aria-hidden="true">FARO</div>
            <p>nextStep<br />{contact.address}<br />{contact.email}<br />{contact.phone}</p>
          </div>
        </div>
        <Fine />
        <p className="wf-disc">{t.disclaimer}</p>
      </div>
    </footer>
  );
}

function F2() {
  const { pt } = useF();
  const word = pt ? 'ÚLTIMA CHAMADA' : 'FINAL CALL';
  return (
    <footer className="wf wf2">
      <div className="wrap">
        <div className="wf2-board" aria-label={word}>
          {word.split('').map((ch, i) => (ch === ' ' ? <i key={i} className="sp" /> : <i key={i}>{ch}</i>))}
        </div>
        <p className="mono wf2-gate">{pt ? 'PORTA FARO · EMBARQUE QUANDO QUISER' : 'GATE FARO · BOARDING WHEN READY'}</p>
        <Cta className="wcta big light" />
        <Links className="wf-links light" />
        <Fine className="wf-fine light" />
      </div>
    </footer>
  );
}

function F3() {
  // Algarve coast across the footer, in the same projection idea as the map.
  const shore = [...algarveWestCoast.slice(4), ...algarveCoast.slice(1)];
  const lon0 = -9.05, lon1 = -7.35, latT = 37.32, k = 1200 / ((lon1 - lon0) * 0.797);
  const pts = shore.map(([lon, lat]) => `${((lon - lon0) * 0.797 * k).toFixed(1)} ${((latT - lat) * k).toFixed(1)}`);
  const fx = (-7.93 - lon0) * 0.797 * k, fy = (latT - 37.02) * k;
  return (
    <footer className="wf wf3">
      <svg className="wf3-map" viewBox="0 0 1200 330" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        <path className="wf3-land" d={`M0 0 L${pts.join(' L')} L1200 ${(latT - 37.2) * k} L1200 0 Z`} />
        <path className="wf3-shore" d={`M${pts.join(' L')}`} />
        <circle cx={fx} cy={fy} r="16" className="wf3-halo" /><circle cx={fx} cy={fy} r="7" className="wf3-pin" />
      </svg>
      <div className="wrap wf3-sea">
        <Links />
        <p className="mono">nextStep · {contact.address}</p>
        <Fine />
      </div>
    </footer>
  );
}

function F4() {
  const { nav } = useF();
  const steps = [['#top', 'nextStep'], ['#routes', nav.routes], ['#about', nav.about], ['#rights', nav.rights], ['#stories', nav.stories], ['#contact', `${nav.cta} ↗`]];
  return (
    <footer className="wf wf4">
      <div className="wrap"><Fine /></div>
      <div className="wf4-stairs">
        {steps.map(([href, label], i) => <a key={href} href={href} style={{ background: PRIDE[i], height: `${70 + i * 34}px` }}><span>{label}</span></a>)}
      </div>
    </footer>
  );
}

function F5() {
  return (
    <footer className="wf wf5">
      <div className="wf5-sky" aria-hidden="true"><i className="wf5-sun" /></div>
      <div className="wf5-night">
        <div className="wrap">
          <p className="wf5-word">nextStep</p>
          <Links className="wf-links light" />
          <Fine className="wf-fine light" />
        </div>
      </div>
    </footer>
  );
}

function F6() {
  const { c, t } = useF();
  const rows = [['routes', c.routes.eyebrow], ['about', c.about.eyebrow], ['rights', c.rights.eyebrow], ['services', c.services.eyebrow], ['places', c.places.eyebrow], ['stories', c.stories.eyebrow], ['contact', c.contact.eyebrow]];
  return (
    <footer className="wf wf6">
      <div className="wrap">
        <p className="mono wf6-k">{t.company} · nextStep</p>
        <ol className="wf6-toc">
          {rows.map(([id, label], i) => <li key={id}><a href={`#${id}`}><span className="n">{String(i + 1).padStart(2, '0')}</span><span className="l">{label}</span><span className="dots" /><span className="p">§ {i + 1}</span></a></li>)}
        </ol>
        <Fine />
      </div>
    </footer>
  );
}

function F7() {
  const { pt, t } = useF();
  return (
    <footer className="wf wf7">
      <div className="wrap">
        <p className="wf-hand big">{pt ? 'Até breve, em Portugal,' : 'See you in Portugal,'}</p>
        <svg className="wf7-sig" viewBox="0 0 220 50" aria-hidden="true"><path d="M6 36 c14 -26 26 14 40 -6 s20 10 38 -8 s16 6 34 -4 s20 8 40 -2 s24 -6 52 4" /></svg>
        <p className="mono">— {pt ? 'A equipa nextStep, Faro' : 'The nextStep team, Faro'}</p>
        <Links />
        <Fine />
        <p className="wf-disc">{t.disclaimer}</p>
      </div>
    </footer>
  );
}

function F8() {
  const { nav, t } = useF();
  const tiles = [['#routes', nav.routes], ['#about', nav.about], ['#rights', nav.rights], ['#services', nav.services], ['#stories', nav.stories], ['#contact', nav.contact, true],
    ['https://wa.me/351934229144', 'WhatsApp'], [`mailto:${contact.email}`, 'Email'], [LEGAL[0], t.legalLinks[0]], [LEGAL[1], t.legalLinks[1]], [LEGAL[2], t.legalLinks[2]], ['#top', '↑ nextStep']];
  return (
    <footer className="wf wf8">
      <div className="wrap">
        <div className="wf8-grid">
          {tiles.map(([href, label, hot], i) => (
            <a key={href} href={href} className={hot ? 'hot' : ''} style={{ '--c': PRIDE[i % 6] }} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4 L36 20 L20 36 L4 20 Z" /><circle cx="20" cy="20" r="5" /></svg>
              <span>{label}</span>
            </a>
          ))}
        </div>
        <Fine />
      </div>
    </footer>
  );
}

function F9() {
  const { t } = useF();
  return (
    <footer className="wf wf9">
      <div className="wrap">
        <p className="wf9-word" aria-hidden="true"><ChevronLogo />nextStep</p>
        <div className="wf9-grid"><p>{t.desc}</p><Links /></div>
        <Fine className="wf-fine light" />
      </div>
      <Spectrum />
    </footer>
  );
}

const LIST = [F0, F1, F2, F3, F4, F5, F6, F7, F8, F9];
export function Footer({ v }) {
  const F = LIST[v] || F0;
  return <F />;
}
