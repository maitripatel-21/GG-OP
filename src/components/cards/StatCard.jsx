import GlassContainer from '../common/GlassContainer';

/**
 * Reusable Minimal Metric Stat Card Component (Flat Design)
 */
export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'cyan',
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'emerald':
        return {
          iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
          valueColor: 'text-emerald-400',
        };
      case 'rose':
        return {
          iconBg: 'bg-[#E2454A]/10 text-[#E2454A] border border-[#E2454A]/20',
          valueColor: 'text-[#E2454A]',
        };
      case 'amber':
        return {
          iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
          valueColor: 'text-amber-400',
        };
      default:
        return {
          iconBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
          valueColor: 'text-cyan-400',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <GlassContainer className="p-4 flex items-center justify-between font-sans">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          {title}
        </span>
        <div className={`text-2xl font-black ${styles.valueColor} tracking-tight`}>
          {value}
        </div>
        {subtitle && <p className="text-[11px] text-slate-400">{subtitle}</p>}
      </div>

      {Icon && (
        <div className={`p-3 rounded-xl ${styles.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
    </GlassContainer>
  );
}
