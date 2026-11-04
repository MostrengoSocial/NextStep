// 10 wildcard backgrounds, as a fixed layer behind the page.
// Patterns are used as CSS masks over a theme colour, so each one works in light and dark.
export const BACKGROUNDS = [
  { name: 'Azulejo & Grain', note: 'The client’s pick: faint blue tile pattern with warm paper grain on top.' },
  { name: 'Dot Grid', note: 'A fine grid of dots, like engineering paper. Quiet and technical.' },
  { name: 'Azulejo', note: 'Just the Portuguese tile pattern, kept light enough to read over.' },
  { name: 'Paper Grain', note: 'Warm paper texture with fine grain, like good stationery.' },
  { name: 'Monchique Contours', note: 'Contour lines like a hiking map of the Algarve hills.' },
  { name: 'Chart Grid', note: 'Latitude and longitude lines with a finer grid, like a navigation chart.' },
  { name: 'Pride Glow', note: 'Soft blurred light in the six pride colours drifting behind the page.' },
  { name: 'Calçada Waves', note: 'The black-and-white wave pattern of Lisbon’s Rossio pavement, very faint.' },
  { name: 'Legal Pad', note: 'Pale ruled lines with a raspberry margin, like a lawyer’s notepad.' },
  { name: 'Night Tile', note: 'Dark theme: faint light tile lines with grain on top.', dark: true },
];

const svg = (s) => `url("data:image/svg+xml,${encodeURIComponent(s)}")`;
const TILE = svg('<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><g fill="none" stroke="#000" stroke-width="1.3"><rect x=".5" y=".5" width="55" height="55"/><circle cx="28" cy="28" r="11"/><path d="M28 0 Q36 20 56 28 Q36 36 28 56 Q20 36 0 28 Q20 20 28 0Z"/><circle cx="0" cy="0" r="8"/><circle cx="56" cy="0" r="8"/><circle cx="0" cy="56" r="8"/><circle cx="56" cy="56" r="8"/></g></svg>');
const GRAIN = svg('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.4 -.35"/></filter><rect width="200" height="200" filter="url(#n)"/></svg>');
const WAVE = svg('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="32"><path d="M0 16 Q20 0 40 16 T80 16 V32 Q60 16 40 32 T0 32Z"/></svg>');

function Contours() {
  // Deterministic closed contours around three "hills".
  const hills = [[18, 30, 9], [68, 62, 11], [40, 92, 7]];
  const paths = [];
  hills.forEach(([cx, cy, n], k) => {
    for (let i = 1; i <= n; i++) {
      const r = i * 3.2;
      let d = '';
      for (let a = 0; a <= 360; a += 15) {
        const t = (a * Math.PI) / 180;
        const wob = 1 + 0.12 * Math.sin(3 * t + k + i * 0.4) + 0.06 * Math.cos(5 * t + i);
        d += `${a ? 'L' : 'M'}${(cx + Math.cos(t) * r * 1.5 * wob).toFixed(2)} ${(cy + Math.sin(t) * r * wob).toFixed(2)}`;
      }
      paths.push(<path key={`${k}-${i}`} d={d + 'Z'} />);
    }
  });
  return <svg className="wbg-topo" viewBox="0 0 100 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">{paths}</svg>;
}

export function Background({ v }) {
  const layer = (cls, mask, size, extra) => <i className={`wbg-l ${cls}`} style={{ WebkitMaskImage: mask, maskImage: mask, WebkitMaskSize: size, maskSize: size, ...extra }} />;
  let inner = null;
  switch (v) {
    case 1: inner = <i className="wbg-l dots" />; break;
    case 2: inner = layer('tile', TILE, '56px 56px'); break;
    case 3: inner = layer('grain', GRAIN, '200px 200px'); break;
    case 4: inner = <Contours />; break;
    case 5: inner = <i className="wbg-l chart" />; break;
    case 6: inner = <><i className="blob b1" /><i className="blob b2" /><i className="blob b3" /><i className="blob b4" /></>; break;
    case 7: inner = layer('wave', WAVE, '80px 32px'); break;
    case 8: inner = <i className="wbg-l pad" />; break;
    case 9: inner = <>{layer('tile night', TILE, '56px 56px')}{layer('grain night', GRAIN, '200px 200px')}</>; break;
    default: inner = <>{layer('tile', TILE, '56px 56px')}{layer('grain', GRAIN, '200px 200px')}</>;
  }
  return <div className={`wbg wbg-${v}`} aria-hidden="true">{inner}</div>;
}
