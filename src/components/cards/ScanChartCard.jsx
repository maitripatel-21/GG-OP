import GlassContainer from '../common/GlassContainer';
import { BarChart3, TrendingUp } from 'lucide-react';

/**
 * Reusable Visual Scan Analytics Chart Card
 */
export default function ScanChartCard() {
  const chartData = [
    { day: 'Mon', total: 42, safe: 38, risky: 4 },
    { day: 'Tue', total: 65, safe: 60, risky: 5 },
    { day: 'Wed', total: 58, safe: 52, risky: 6 },
    { day: 'Thu', total: 80, safe: 74, risky: 6 },
    { day: 'Fri', total: 95, safe: 90, risky: 5 },
    { day: 'Sat', total: 72, safe: 68, risky: 4 },
    { day: 'Sun', total: 50, safe: 48, risky: 2 },
  ];

  const maxScan = 100;

  return (
    <GlassContainer className="p-6 space-y-4 border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-guard-cyan border border-cyan-500/20">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Scans & Threat Analytics Trend
            </h3>
            <p className="text-xs text-slate-400">
              Weekly inspection volume vs detected risks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+14% Activity</span>
        </div>
      </div>

      {/* Visual Bar Chart Display */}
      <div className="pt-4 flex items-end justify-between gap-3 h-44 px-2">
        {chartData.map((d, i) => {
          const heightPercent = Math.round((d.total / maxScan) * 100);
          const safeHeight = Math.round((d.safe / d.total) * 100);

          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
            >
              {/* Tooltip Hover Value */}
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-guard-cyan transition-colors">
                {d.total}
              </span>

              {/* Bar Container */}
              <div
                className="w-full rounded-t-xl bg-slate-800/80 group-hover:bg-slate-700/80 relative overflow-hidden transition-all duration-300"
                style={{ height: `${heightPercent}%` }}
              >
                {/* Safe Portion Bar */}
                <div
                  className="w-full bg-gradient-to-t from-cyan-600 to-emerald-400 rounded-t-xl absolute bottom-0 transition-all duration-500 group-hover:brightness-110"
                  style={{ height: `${safeHeight}%` }}
                />
              </div>

              {/* Day Label */}
              <span className="text-xs font-semibold text-slate-400">{d.day}</span>
            </div>
          );
        })}
      </div>

      {/* Chart Legend */}
      <div className="pt-2 border-t border-white/5 flex items-center justify-center gap-6 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-400" />
          <span>Safe Websites</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-700" />
          <span>Total Scanned</span>
        </div>
      </div>
    </GlassContainer>
  );
}
