/**
 * Reusable Minimal Glassmorphism Container Component
 */
export default function GlassContainer({
  children,
  className = '',
  hover = false,
  onClick,
  variant = 'default',
}) {
  const baseStyles = 'rounded-2xl border transition-all duration-200 backdrop-blur-md';

  const variants = {
    default: 'bg-[#0D1320]/75 border-white/5 shadow-sm',
    card: 'bg-[#151D2D]/40 border-white/5',
    interactive: 'bg-white/[0.03] border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.06]',
    danger: 'bg-rose-500/[0.06] border-rose-500/20',
    success: 'bg-emerald-500/[0.06] border-emerald-500/20',
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
