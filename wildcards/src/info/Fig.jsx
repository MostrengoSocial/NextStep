import { useEffect, useState } from 'react';

// Infographic frame: mono code + tag, grid-paper SVG. Sketches are 300×170.
export function Fig({ code, tag, children, html, vb = '0 0 300 170', label }) {
  const [, , w, h] = vb.split(' ').map(Number);
  return (
    <figure className="wfig">
      <figcaption className="wfig-top"><span className="code">{code}</span><span>{tag}</span></figcaption>
      <svg viewBox={vb} className="wfig-svg" role="img" aria-label={label || tag}>
        <Grid w={w} h={h} />
        {html ? <g className="sk" dangerouslySetInnerHTML={{ __html: html }} /> : <g className="sk">{children}</g>}
      </svg>
    </figure>
  );
}

export function Grid({ w = 300, h = 170, s = 20 }) {
  const v = [], hz = [];
  for (let x = s; x < w; x += s) v.push(<line key={'v' + x} x1={x} x2={x} y1="0" y2={h} />);
  for (let y = s; y < h; y += s) hz.push(<line key={'h' + y} y1={y} y2={y} x1="0" x2={w} />);
  return <g className="wgl">{v}{hz}</g>;
}

// Live time in a given IANA time zone (undefined = the viewer's own), refreshed every 20 s.
export function useNow(ms = 20000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), ms); return () => clearInterval(id); }, [ms]);
  return now;
}
export function timeIn(date, tz) {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).formatToParts(date);
    const h = +parts.find((p) => p.type === 'hour').value % 24;
    const m = +parts.find((p) => p.type === 'minute').value;
    return { h, m, label: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` };
  } catch { return { h: 0, m: 0, label: '--:--' }; }
}

export function Clock({ cx, cy, r, h, m, label, hot }) {
  const ha = ((h % 12) + m / 60) / 12 * Math.PI * 2 - Math.PI / 2;
  const ma = m / 60 * Math.PI * 2 - Math.PI / 2;
  return (
    <g>
      <circle className="fs" cx={cx} cy={cy} r={r} style={hot ? { stroke: 'var(--accent)', strokeWidth: 2 } : undefined} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = i / 12 * Math.PI * 2;
        return <line key={i} className="sm" x1={cx + Math.cos(a) * r * .82} y1={cy + Math.sin(a) * r * .82} x2={cx + Math.cos(a) * r * .92} y2={cy + Math.sin(a) * r * .92} />;
      })}
      <line className="s2" x1={cx} y1={cy} x2={cx + Math.cos(ha) * r * .5} y2={cy + Math.sin(ha) * r * .5} />
      <line className="s" x1={cx} y1={cy} x2={cx + Math.cos(ma) * r * .78} y2={cy + Math.sin(ma) * r * .78} />
      <circle cx={cx} cy={cy} r="2" className="fk" />
      <text className={hot ? 'ta' : 'ti'} x={cx} y={cy + r + 14} textAnchor="middle">{label}</text>
    </g>
  );
}
