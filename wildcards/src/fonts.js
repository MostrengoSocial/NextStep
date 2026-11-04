// 10 wildcard type systems: display / body / mono, plus the face used for the
// accent word ("home.", "into law.") and per-family tuning, because these
// families render at very different sizes.
export const FONTS = [
  { name: 'Departure Signal', note: 'Big Shoulders in capitals, like airport gate signs, over Public Sans. The client’s pick.',
    display: 'Big Shoulders Display', body: 'Public Sans', mono: 'DM Mono', accent: 'Big Shoulders Display', italic: false,
    dw: 800, track: '0.005em', scale: 1.18, upper: true,
    q: ['Big+Shoulders+Display:wght@600..900', 'Public+Sans:ital,wght@0,400..700;1,400', 'DM+Mono:wght@400;500'] },
  { name: 'House Blend', note: 'The current site: Bricolage Grotesque, Instrument Sans and a DM Serif italic accent word.',
    display: 'Bricolage Grotesque', body: 'Instrument Sans', mono: 'DM Mono', accent: 'DM Serif Display', italic: true,
    dw: 700, track: '-0.045em', scale: 1,
    q: ['Bricolage+Grotesque:opsz,wght@12..96,400..800', 'Instrument+Sans:wght@400..700', 'DM+Serif+Display:ital@0;1'] },
  { name: 'Instrument Pair', note: 'Slim editorial serif with its sister sans. Calm, like a good magazine.',
    display: 'Instrument Serif', body: 'Instrument Sans', mono: 'DM Mono', accent: 'Instrument Serif', italic: true,
    dw: 400, track: '-0.015em', scale: 1.12,
    q: ['Instrument+Serif:ital@0;1'] },
  { name: 'Soft Counsel', note: 'Fraunces, a warm, slightly wonky serif, over Work Sans. Friendly and human.',
    display: 'Fraunces', body: 'Work Sans', mono: 'IBM Plex Mono', accent: 'Fraunces', italic: true,
    dw: 650, track: '-0.03em', scale: 1,
    q: ['Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..800', 'Work+Sans:wght@400..700', 'IBM+Plex+Mono:wght@400;500'] },
  { name: 'Studio Syne', note: 'Syne’s wide extra-bold over Manrope. Feels like a design studio, not a law firm.',
    display: 'Syne', body: 'Manrope', mono: 'Martian Mono', accent: 'Syne', italic: false,
    dw: 800, track: '-0.035em', scale: 0.86,
    q: ['Syne:wght@500..800', 'Manrope:wght@400..700', 'Martian+Mono:wght@400;500'] },
  { name: 'Wide Joy', note: 'Unbounded: very wide, rounded headings that shout with joy, over DM Sans.',
    display: 'Unbounded', body: 'DM Sans', mono: 'IBM Plex Mono', accent: 'Unbounded', italic: false,
    dw: 750, track: '-0.03em', scale: 0.78,
    q: ['Unbounded:wght@400..800', 'DM+Sans:opsz,wght@9..40,400..700'] },
  { name: 'Gravitas', note: 'Gloock’s high-contrast serif with Schibsted Grotesk. The most “law firm” of the set.',
    display: 'Gloock', body: 'Schibsted Grotesk', mono: 'DM Mono', accent: 'Gloock', italic: false,
    dw: 400, track: '-0.01em', scale: 1.02,
    q: ['Gloock', 'Schibsted+Grotesk:wght@400..700'] },
  { name: 'Old Town', note: 'Young Serif, sturdy and vintage, over Figtree. Welcoming, like Faro’s old town.',
    display: 'Young Serif', body: 'Figtree', mono: 'DM Mono', accent: 'Young Serif', italic: false,
    dw: 400, track: '-0.02em', scale: 0.96,
    q: ['Young+Serif', 'Figtree:wght@400..700'] },
  { name: 'Stretch', note: 'Anybody, a variable font set extra-wide, over Onest. Playful and very wild.',
    display: 'Anybody', body: 'Onest', mono: 'Martian Mono', accent: 'Anybody', italic: false,
    dw: 800, track: '-0.02em', scale: 0.84, stretch: 130,
    q: ['Anybody:wdth,wght@50..150,400..900', 'Onest:wght@400..700'] },
  { name: 'Riviera', note: 'Fashion-magazine Bodoni Moda with crisp Hanken Grotesk. Glamorous and celebratory.',
    display: 'Bodoni Moda', body: 'Hanken Grotesk', mono: 'DM Mono', accent: 'Bodoni Moda', italic: true,
    dw: 700, track: '-0.02em', scale: 1,
    q: ['Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900', 'Hanken+Grotesk:wght@400..700'] },
];

export function fontHref(list = FONTS) {
  const fams = [...new Set(list.flatMap((f) => f.q).concat(['Caveat:wght@500;600']))];
  return 'https://fonts.googleapis.com/css2?' + fams.map((f) => 'family=' + f).join('&') + '&display=swap';
}

export function fontVars(f) {
  return {
    '--f-display': `"${f.display}", "Helvetica Neue", Arial, sans-serif`,
    '--f-body': `"${f.body}", "Helvetica Neue", Arial, sans-serif`,
    '--f-mono': `"${f.mono}", ui-monospace, Menlo, monospace`,
    '--f-accent': `"${f.accent}", Georgia, serif`,
    '--accent-style': f.italic ? 'italic' : 'normal',
    '--accent-weight': f.italic ? 400 : f.dw,
    '--dw': f.dw,
    '--track': f.track,
    '--dscale': f.scale || 1,
    '--dcase': f.upper ? 'uppercase' : 'none',
    '--dstretch': `${f.stretch || 100}%`,
  };
}

export function applyFont(f) {
  const r = document.documentElement.style;
  Object.entries(fontVars(f)).forEach(([k, v]) => r.setProperty(k, v));
}
