import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';

/* ============================================
   LOGO OPTION 1 — ASCENDING BARS
   Growth & progress represented by 3 ascending bars
   ============================================ */
const LogoIcon1 = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect x="0" y="22" width="9" height="10" rx="2" fill="#B8963E" />
    <rect x="11.5" y="12" width="9" height="20" rx="2" fill="#B8963E" opacity="0.7" />
    <rect x="23" y="0" width="9" height="32" rx="2" fill="#B8963E" opacity="0.4" />
  </svg>
);

/* ============================================
   LOGO OPTION 2 — STAIRCASE STEPS
   Literal step/stair pattern going up-right
   ============================================ */
const LogoIcon2 = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M2 28 L2 20 L12 20 L12 12 L22 12 L22 4 L30 4"
      stroke="#B8963E"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="30" cy="4" r="2.5" fill="#B8963E" />
  </svg>
);

/* ============================================
   LOGO OPTION 3 — DOUBLE CHEVRON
   Forward motion >> representing "next"
   ============================================ */
const LogoIcon3 = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M4 6 L14 16 L4 26"
      stroke="#B8963E"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
    <path
      d="M16 6 L26 16 L16 26"
      stroke="#B8963E"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ============================================
   LOGO OPTION 4 — NS MONOGRAM
   Elegant intertwined N + S letterform
   ============================================ */
const LogoIcon4 = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* N */}
    <path
      d="M4 28 L4 4 L18 28"
      stroke="#B8963E"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* S */}
    <path
      d="M28 8 C28 4, 20 4, 20 8 C20 12, 28 12, 28 16 C28 22, 18 24, 14 20"
      stroke="#B8963E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.6"
    />
  </svg>
);

/* ============================================
   LOGO OPTION 5 — RISING ARROW
   Upward trajectory arrow from a baseline
   ============================================ */
const LogoIcon5 = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Base line */}
    <line x1="2" y1="28" x2="18" y2="28" stroke="#B8963E" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
    {/* Rising arrow */}
    <path
      d="M8 28 L8 10 L24 10"
      stroke="#B8963E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Arrow head */}
    <path
      d="M20 5 L26 10 L20 15"
      stroke="#B8963E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Decorative dot */}
    <circle cx="8" cy="28" r="2" fill="#B8963E" />
  </svg>
);

const logoOptions = [
  { id: 1, name: 'Ascending Bars', description: 'Growth & progress through rising bars', Icon: LogoIcon1 },
  { id: 2, name: 'Staircase Path', description: 'Literal steps moving upward', Icon: LogoIcon2 },
  { id: 3, name: 'Double Chevron', description: 'Forward motion & "next" direction', Icon: LogoIcon3 },
  { id: 4, name: 'NS Monogram', description: 'Elegant letter combination', Icon: LogoIcon4 },
  { id: 5, name: 'Rising Arrow', description: 'Upward trajectory & new beginnings', Icon: LogoIcon5 },
];

export { LogoIcon1, LogoIcon2, LogoIcon3, LogoIcon4, LogoIcon5 };

export const LogoShowcase = ({ onSelect, onClose }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-5xl bg-[#111111] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-white mb-3">
            Choose Your Logo
          </h2>
          <p className="text-white/40 text-sm">Select the logo that best represents Next Step</p>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {logoOptions.map((logo) => (
            <button
              key={logo.id}
              onClick={() => setSelected(logo.id)}
              className={`relative flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all duration-300 ${
                selected === logo.id
                  ? 'border-[#B8963E] bg-[#B8963E]/10 shadow-lg shadow-[#B8963E]/10'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              {selected === logo.id && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#B8963E] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-[#0A0A0A]" />
                </div>
              )}

              {/* Icon on dark bg */}
              <div className="w-16 h-16 rounded-xl bg-[#0A0A0A] flex items-center justify-center">
                <logo.Icon size={36} />
              </div>

              {/* Icon on light bg */}
              <div className="w-16 h-16 rounded-xl bg-[#FAFAF7] flex items-center justify-center">
                <logo.Icon size={36} />
              </div>

              {/* Label */}
              <div className="text-center">
                <div className="text-xs font-semibold text-white/80 mb-1">Option {logo.id}</div>
                <div className="text-[10px] text-white/30 leading-tight">{logo.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Preview with wordmark */}
        {selected && (
          <div className="flex flex-col items-center gap-6 mb-8 p-6 rounded-2xl bg-black/30 border border-white/5">
            <p className="text-xs text-white/30 uppercase tracking-widest">Preview</p>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* Dark version */}
              <div className="flex items-center gap-3 bg-[#0A0A0A] px-6 py-4 rounded-xl border border-white/10">
                {React.createElement(logoOptions[selected - 1].Icon, { size: 28 })}
                <span className="font-heading text-xl font-semibold text-white">Next Step</span>
              </div>
              {/* Light version */}
              <div className="flex items-center gap-3 bg-[#FAFAF7] px-6 py-4 rounded-xl border border-[#E5E5E3]">
                {React.createElement(logoOptions[selected - 1].Icon, { size: 28 })}
                <span className="font-heading text-xl font-semibold text-[#1A1A1A]">Next Step</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-white/15 text-white/60 hover:bg-white/5 hover:text-white px-8 h-11 rounded-full text-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={() => selected && onSelect(selected)}
            disabled={!selected}
            className="bg-[#B8963E] hover:bg-[#C9A74F] text-[#0A0A0A] px-8 h-11 rounded-full text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-[#B8963E]/20"
          >
            Select Logo {selected ? `#${selected}` : ''}
          </Button>
        </div>
      </div>
    </div>
  );
};
