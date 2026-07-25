import { Lock, Unlock, Globe, Calendar, ShieldCheck } from 'lucide-react';
import GlassContainer from '../common/GlassContainer';
import Badge from '../common/Badge';

/**
 * Detailed URL & Domain Security Analysis Card Component
 */
export default function UrlAnalysisCard({ analysis }) {
  const { domain, isHttps, domainAge, sslIssuer } = analysis || {};

  return (
    <GlassContainer className="p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-guard-cyan">
            <Globe className="w-4 h-4" />
          </div>
          <div className="truncate">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Inspected Domain
            </h3>
            <p className="text-sm font-bold text-white truncate max-w-[180px]">
              {domain || 'Unknown'}
            </p>
          </div>
        </div>

        <Badge variant={isHttps ? 'safe' : 'danger'} icon={isHttps ? Lock : Unlock}>
          {isHttps ? 'HTTPS' : 'HTTP'}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-guard-cyan" />
            <span>Domain Age</span>
          </div>
          <p className="font-semibold text-slate-200">{domainAge || 'Verified'}</p>
        </div>

        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>SSL Certificate</span>
          </div>
          <p className="font-semibold text-slate-200 truncate" title={sslIssuer}>
            {sslIssuer || 'Valid'}
          </p>
        </div>
      </div>
    </GlassContainer>
  );
}
