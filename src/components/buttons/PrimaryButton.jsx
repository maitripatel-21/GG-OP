/**
 * Reusable Primary Action Button Component with Glass/Gradient Accents & ARIA Accessibility
 */
export default function PrimaryButton({
  children,
  onClick,
  icon: Icon,
  variant = 'cyan',
  className = '',
  disabled = false,
  type = 'button',
  ariaLabel,
}) {
  const variants = {
    cyan: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow hover:from-cyan-400 hover:to-blue-500',
    emerald:
      'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-glow-emerald hover:from-emerald-400 hover:to-teal-500',
    rose: 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-glow-rose hover:from-rose-400 hover:to-red-500',
    glass: 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={
        ariaLabel || (typeof children === 'string' ? children : 'Action button')
      }
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-guard-cyan/50 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
      {children}
    </button>
  );
}
