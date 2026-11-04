import { Fig, Clock, useNow, timeIn } from './Fig.jsx';

// R5 · four live clocks: the client cities and Faro.
export function ZoneClocks() {
  const now = useNow();
  const zones = [['SF', 'America/Los_Angeles'], ['YYZ', 'America/Toronto'], ['GRU', 'America/Sao_Paulo'], ['FARO', 'Europe/Lisbon']];
  return (
    <Fig code="R5" tag="Live time · four cities">
      {zones.map(([n, tz], i) => {
        const t = timeIn(now, tz);
        return <Clock key={n} cx={45 + i * 70} cy={68} r={26} h={t.h} m={t.m} label={`${n} ${t.label}`} hot={n === 'FARO'} />;
      })}
      <text className="t" x="150" y="150" textAnchor="middle">WE ANSWER AT ODD HOURS</text>
    </Fig>
  );
}

// C3 · Faro time next to the visitor's own time, both live.
export function OverlapClock() {
  const now = useNow();
  const faro = timeIn(now, 'Europe/Lisbon');
  const you = timeIn(now);
  const diff = ((you.h - faro.h + 36) % 24) - 12;
  return (
    <Fig code="C3" tag="Live · Faro and you">
      <Clock cx={90} cy={74} r={44} h={faro.h} m={faro.m} label={`FARO ${faro.label}`} hot />
      <Clock cx={210} cy={74} r={44} h={you.h} m={you.m} label={`YOU ${you.label}`} />
      <text className="ta" x="150" y="16" textAnchor="middle">
        {diff === 0 ? 'SAME TIME AS FARO' : `FARO IS ${Math.abs(diff)}H ${diff > 0 ? 'BEHIND' : 'AHEAD OF'} YOU`}
      </text>
    </Fig>
  );
}
