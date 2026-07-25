/**
 * Reusable Icon Button Component
 */
export default function IconButton({ icon: Icon, onClick, title, className = '' }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all duration-200 active:scale-90 ${className}`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
