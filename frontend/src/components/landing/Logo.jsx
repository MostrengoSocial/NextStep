import React from 'react';

export const Logo = ({ className = '', size = 'default', variant = 'full' }) => {
  const sizes = {
    small: { icon: 20, text: 'text-lg' },
    default: { icon: 26, text: 'text-xl' },
    large: { icon: 34, text: 'text-2xl' },
  };
  const s = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon mark — ascending steps */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect x="0" y="22" width="9" height="10" rx="2" fill="#B8963E" />
        <rect x="11.5" y="12" width="9" height="20" rx="2" fill="#B8963E" opacity="0.7" />
        <rect x="23" y="0" width="9" height="32" rx="2" fill="#B8963E" opacity="0.4" />
      </svg>
      {/* Wordmark */}
      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-heading font-semibold tracking-tight ${s.text}`}
            style={{ lineHeight: 1.1 }}
          >
            Next Step
          </span>
        </div>
      )}
    </div>
  );
};
