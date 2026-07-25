import GlassContainer from '../common/GlassContainer';
import Badge from '../common/Badge';

/**
 * Reusable Feature Card Component
 */
export default function FeatureCard({
  title,
  description,
  icon: Icon,
  badgeText = 'Phase Ready',
  variant = 'cyan',
  metrics,
}) {
  const variantGlows = {
    cyan: 'group-hover:border-cyan-500/40 group-hover:shadow-glow',
    emerald: 'group-hover:border-emerald-500/40 group-hover:shadow-glow-emerald',
    rose: 'group-hover:border-rose-500/40 group-hover:shadow-glow-rose',
    amber: 'group-hover:border-amber-500/40',
  };

  const iconColors = {
    cyan: 'text-guard-cyan bg-cyan-500/10 border-cyan-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  };

  return (
    <GlassContainer
      className={`p-6 space-y-4 group transition-all duration-300 ${variantGlows[variant] || variantGlows.cyan}`}
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-2xl border ${iconColors[variant]} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
        {badgeText && <Badge variant={variant}>{badgeText}</Badge>}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-white group-hover:text-guard-cyan transition-colors">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>

      {metrics && (
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>{metrics.label}</span>
          <span className="font-bold text-white">{metrics.value}</span>
        </div>
      )}
    </GlassContainer>
  );
}
