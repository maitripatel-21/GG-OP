import GlassContainer from '../common/GlassContainer';
import Badge from '../common/Badge';
import { Lock, Unlock, Globe } from 'lucide-react';

/**
 * Reusable Website & Protocol Metrics Detail Card - Sleek & Minimal
 */
export default function WebsiteDetailsCard({ analysis }) {
  if (!analysis) return null;

  const { url, domain, protocol, isHttps } = analysis;

  return (
    <GlassContainer className="p-3.5 space-y-2.5">
      {/* Active Website Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
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
    </GlassContainer>
  );
}
