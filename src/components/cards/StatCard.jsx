import GlassContainer from '../common/GlassContainer';

/**
 * Reusable Metric Stat Card for Dashboard Overview
 */
export default function StatCard({ title, value, subtitle, icon: Icon, variant = 'cyan' }) {
  const colorMap = {
    cyan: 'text-guard-cyan bg-cyan-500/10 border-cyan-500/20 shadow-glow',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-glow-emerald',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-glow-rose',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  };

  const selectedColor = colorMap[variant] || colorMap.cyan;

  return (
    <GlassContainer className="p-5 space-y-3 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={`p-2.5 rounded-xl border ${selectedColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-black text-white tracking-tight">{value}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>}
      </div>
    </GlassContainer>
  );
}
