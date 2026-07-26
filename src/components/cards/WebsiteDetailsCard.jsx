import GlassContainer from '../common/GlassContainer';
import Badge from '../common/Badge';
import { Lock, Unlock, Globe, Cpu, ShieldCheck, AlertCircle } from 'lucide-react';
import { virusTotalService } from '../../services/url/virusTotalService';

/**
 * Reusable Website & Protocol Metrics Detail Card with Dual Engine Status Indicators
 */
export default function WebsiteDetailsCard({ analysis }) {
  if (!analysis) return null;

  const { url, domain, protocol, isHttps } = analysis;
  const isVtActive = virusTotalService.isConfigured();

  return (
    <GlassContainer className="p-3.5 space-y-3 font-sans">
      {/* Active Website Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <Globe className="w-3.5 h-3.5 text-[#E2454A] shrink-0" />
          <span className="text-xs font-bold text-white truncate max-w-[200px]" title={url}>
            {domain || url}
          </span>
        </div>

        <Badge variant={isHttps ? 'safe' : 'danger'} icon={isHttps ? Lock : Unlock} size="sm">
          {isHttps ? 'HTTPS' : 'HTTP'}
        </Badge>
      </div>

      {/* Protocol details row */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-0.5">
        <span className="text-[11px]">Protocol</span>
        <span className="font-mono text-slate-200 uppercase">{protocol || 'HTTPS:'}</span>
      </div>

      {/* Dual Engine Protection Status Indicator */}
      <div className="pt-1.5 border-t border-white/5 space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-semibold flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-cyan-400" />
            Local Risk Engine:
          </span>
          <span className="font-bold text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            ACTIVE (0ms)
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#E2454A]" />
            VirusTotal API v3:
          </span>
          {isVtActive ? (
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ACTIVE (Live Sync)
            </span>
          ) : (
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-400" />
              MISSING API KEY
            </span>
          )}
        </div>
      </div>
    </GlassContainer>
  );
}
