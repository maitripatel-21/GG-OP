/**
 * Reusable Glassmorphism Container Component
 */
export default function GlassContainer({
  children,
  className = '',
  hover = false,
  onClick,
  variant = 'default',
}) {
  const baseStyles = 'rounded-2xl border transition-all duration-300 backdrop-blur-md';

  const variants = {
    default: 'bg-guard-surface/60 border-white/10 shadow-glass',
    card: 'bg-guard-card/40 border-white/5 shadow-md',
    interactive: 'bg-white/5 border-white/10 hover:border-guard-cyan/40 hover:bg-white/10',
    danger: 'bg-guard-rose/10 border-guard-rose/30 shadow-glow-rose',
    success: 'bg-guard-emerald/10 border-guard-emerald/30 shadow-glow-emerald',
  };

  const hoverStyles = hover ? 'glass-card-hover cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.default} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
