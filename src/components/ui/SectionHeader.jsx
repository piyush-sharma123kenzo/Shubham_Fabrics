import React from 'react';

export default function SectionHeader({
  subtitle,
  title,
  description,
  alignment = 'center', // 'left', 'center', 'right'
  theme = 'light', // 'light', 'dark'
  action,
  className = ''
}) {
  const isDark = theme === 'dark';
  const alignClass = {
    center: 'text-center mx-auto',
    left: 'text-left',
    right: 'text-right ml-auto'
  }[alignment];

  return (
    <div className={`mb-12 md:mb-16 ${alignClass} ${className}`}>
      {subtitle && (
        <div className="flex items-center gap-3 justify-center mb-3">
          {alignment === 'center' && (
            <span className={`w-8 h-[1px] ${isDark ? 'bg-brand-gold/60' : 'bg-brand-gold'}`} />
          )}
          <p className={`text-xs tracking-[0.25em] uppercase font-semibold ${isDark ? 'text-brand-gold-light' : 'text-brand-gold-dark'}`}>
            {subtitle}
          </p>
          {alignment === 'center' && (
            <span className={`w-8 h-[1px] ${isDark ? 'bg-brand-gold/60' : 'bg-brand-gold'}`} />
          )}
        </div>
      )}

      {title && (
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight font-normal leading-tight ${isDark ? 'text-brand-ivory' : 'text-brand-charcoal'}`}>
          {title}
        </h2>
      )}

      {description && (
        <p className={`mt-4 max-w-2xl text-sm md:text-base leading-relaxed ${alignment === 'center' ? 'mx-auto' : ''} ${isDark ? 'text-brand-ivory/70' : 'text-brand-charcoal/70'}`}>
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}
