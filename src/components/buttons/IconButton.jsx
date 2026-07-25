/**
 * Reusable Icon Button Component with ARIA Accessibility
 */
export default function IconButton({
  icon: Icon,
  onClick,
  title,
  ariaLabel,
  className = '',
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={ariaLabel || title || 'Icon button'}
      className={`p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all duration-200 active:scale-90 focus:outline-none focus:ring-2 focus:ring-guard-cyan/50 ${className}`}
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}
