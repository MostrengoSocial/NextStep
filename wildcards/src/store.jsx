import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Sections that carry a swappable infographic, in page order.
export const INFO_SECTIONS = ['hero', 'routes', 'about', 'rights', 'services', 'places', 'stories', 'contact'];
export const KEYS = ['topbar', 'footer', 'bg', 'enum', 'font'];
// Which of the 10 backgrounds are dark by nature (drives the default theme).
export const BG_DARK = [false, false, false, false, false, false, false, false, false, true];

// Defaults are the client's picks: spectrum + clocks bar, "One last question" footer,
// azulejo + paper grain background, chevron-step numbering, ghost numbers on,
// Big Shoulders + Public Sans. Infographic 01 in every section is the approved design.
const DEFAULT = {
  topbar: 0, footer: 0, bg: 0, enum: 0, font: 0, dark: null, clean: false, ghost: true,
  info: Object.fromEntries(INFO_SECTIONS.map((s) => [s, 0])),
};

const LS = 'nextstep-wildcards-v1';
function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS));
    if (raw && typeof raw === 'object') return { ...DEFAULT, ...raw, info: { ...DEFAULT.info, ...(raw.info || {}) } };
  } catch { /* storage unavailable */ }
  return DEFAULT;
}

const Ctx = createContext(null);
export const N = 10;
const wrap = (v) => ((v % N) + N) % N;

export function ConfigProvider({ children }) {
  const [cfg, setCfg] = useState(load);
  useEffect(() => { try { localStorage.setItem(LS, JSON.stringify(cfg)); } catch { /* ignore */ } }, [cfg]);

  const set = useCallback((k, v) => setCfg((c) => ({ ...c, [k]: wrap(v), ...(k === 'bg' ? { dark: null } : {}) })), []);
  const step = useCallback((k, d) => setCfg((c) => ({ ...c, [k]: wrap(c[k] + d), ...(k === 'bg' ? { dark: null } : {}) })), []);
  const setInfo = useCallback((s, v) => setCfg((c) => ({ ...c, info: { ...c.info, [s]: wrap(v) } })), []);
  const stepInfo = useCallback((s, d) => setCfg((c) => ({ ...c, info: { ...c.info, [s]: wrap(c.info[s] + d) } })), []);
  const setDark = useCallback((v) => setCfg((c) => ({ ...c, dark: v })), []);
  const toggle = useCallback((k) => setCfg((c) => ({ ...c, [k]: !c[k] })), []);
  const reset = useCallback(() => setCfg(DEFAULT), []);
  const shuffle = useCallback(() => {
    const r = () => Math.floor(Math.random() * N);
    setCfg((c) => ({ ...c, topbar: r(), footer: r(), bg: r(), enum: r(), font: r(), dark: null, ghost: Math.random() > 0.4, info: Object.fromEntries(INFO_SECTIONS.map((s) => [s, r()])) }));
  }, []);

  const isDark = cfg.dark ?? BG_DARK[cfg.bg];
  const value = useMemo(() => ({ cfg: { ...cfg, __dark: isDark }, set, step, setInfo, stepInfo, setDark, toggle, reset, shuffle }),
    [cfg, isDark, set, step, setInfo, stepInfo, setDark, toggle, reset, shuffle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useConfig = () => useContext(Ctx);
export const pad = (n, l = 2) => String(n).padStart(l, '0');
