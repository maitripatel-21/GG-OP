/**
 * Reusable Status Badge Component
 */
export default function Badge({
  children,
  variant = 'info',
  icon: Icon,
  size = 'md',
  className = '',
}) {
  const variantStyles = {
    safe: 'bg-guard-emerald/15 text-emerald-400 border-emerald-500/30 shadow-glow-emerald',
    warning: 'bg-guard-amber/15 text-amber-400 border-amber-500/30',
    danger: 'bg-guard-rose/15 text-rose-400 border-rose-500/30 shadow-glow-rose',
    info: 'bg-guard-cyan/15 text-cyan-400 border-cyan-500/30',
    neutral: 'bg-slate-800/60 text-slate-300 border-white/10',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border backdrop-blur-sm ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
}
