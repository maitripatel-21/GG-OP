import GlassContainer from '../common/GlassContainer';
import Badge from '../common/Badge';
import { Globe, ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';

/**
 * Visited Website Security History Log Item Card
 */
export default function HistoryItemCard({ item, onWhitelist }) {
  const { domain, timestamp, safetyScore, safetyLevel, threatCount, threats } = item;

  const getBadgeVariant = () => {
    if (safetyLevel === 'SAFE') return 'safe';
    if (safetyLevel === 'WARNING') return 'warning';
    return 'danger';
  };

  const getIcon = () => {
    if (safetyLevel === 'SAFE') return ShieldCheck;
    if (safetyLevel === 'WARNING') return ShieldAlert;
    return ShieldX;
  };

  return (
    <GlassContainer className="p-4 hover:border-white/20 transition-all space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              {domain}
              <span className="text-xs text-slate-400 font-normal">({timestamp})</span>
            </h4>
            <p className="text-xs text-slate-400">
              {threatCount > 0
                ? `${threatCount} Threat Indicator(s) Detected`
                : 'Verified Secure Connection'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={getBadgeVariant()} icon={getIcon()}>
            Score: {safetyScore}
          </Badge>

          {onWhitelist && safetyLevel !== 'SAFE' && (
            <button
              onClick={() => onWhitelist(domain)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 border border-cyan-500/30 transition-all"
            >
              Trust Domain
            </button>
          )}
        </div>
      </div>

      {threats && threats.length > 0 && (
        <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
          {threats.map((t, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20"
            >
              ⚠️ {t}
            </span>
          ))}
        </div>
      )}
    </GlassContainer>
  );
}
