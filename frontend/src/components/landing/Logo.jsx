import React from 'react';

/* Rainbow chevron logo inspired by the reference — pride colors */
export const RainbowLogo = ({ size = 'default' }) => {
  const sizes = { small: 32, default: 40, large: 52 };
  const s = sizes[size] || sizes.default;
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Overlapping chevrons in pride colors */}
      <path d="M8 8 L20 20 L8 32" stroke="#E44D60" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 8 L26 20 L14 32" stroke="#E8893C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 8 L32 20 L20 32" stroke="#E8C93C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 11 L35 20 L26 29" stroke="#3BAF6A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 14 L37 20 L30 26" stroke="#4A7FBF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
