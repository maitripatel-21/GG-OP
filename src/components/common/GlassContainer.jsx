/**
 * Flat, Minimal Container Component (Clean Flat Dark Surface)
 */
export default function GlassContainer({ children, className = '', onClick = null }) {
  return (
    <div
      onClick={onClick}
      className={`bg-[#161922] border border-slate-800 rounded-xl transition-colors duration-150 ${
        onClick ? 'cursor-pointer hover:border-slate-700' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
