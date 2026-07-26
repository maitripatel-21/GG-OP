/**
 * Clean Flat Dark Background Container
 */
export default function BackgroundAnimation({ children }) {
  return (
    <div className="relative min-h-screen bg-[#0F1117] text-slate-100 overflow-x-hidden font-sans">
      <div className="relative z-10">{children}</div>
    </div>
  );
}
