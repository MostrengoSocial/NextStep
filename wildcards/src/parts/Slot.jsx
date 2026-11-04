import { INFO } from '../info/index.js';
import { useConfig, pad } from '../store.jsx';

// Renders the chosen infographic for a section, with an in-place wildcard switcher.
export function Slot({ section }) {
  const { cfg, stepInfo } = useConfig();
  const list = INFO[section];
  const i = cfg.info[section] ?? 0;
  const { C, name } = list[i];
  return (
    <div className={`slot slot-${section}`}>
      <C />
      <div className="wc-chip">
        <button type="button" onClick={() => stepInfo(section, -1)} aria-label="Previous infographic">←</button>
        <span className="nm">Wildcard {pad(i + 1)}/{pad(list.length)} · {name}</span>
        <button type="button" onClick={() => stepInfo(section, 1)} aria-label="Next infographic">→</button>
      </div>
    </div>
  );
}
