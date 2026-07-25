import GlassContainer from '../common/GlassContainer';
import Badge from '../common/Badge';
import { Lock, Unlock, Globe, Terminal, Calendar, ShieldCheck } from 'lucide-react';

/**
 * Reusable Website & Protocol Metrics Detail Card
 */
export default function WebsiteDetailsCard({ analysis }) {
  if (!analysis) return null;

  const { url, domain, protocol, isHttps, domainAge, sslIssuer } = analysis;

  return (
    <GlassContainer className="p-4 space-y-3 shadow-glass border-white/10">
      {/* Active URL Header with Protocol Badge */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-guard-cyan shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Website
            </span>
            <span className="text-xs font-semibold text-slate-200 truncate block max-w-[200px]" title={url}>
              {url}
            </span>
          </div>
        </div>

        <Badge variant={isHttps ? 'safe' : 'danger'} icon={isHttps ? Lock : Unlock} size="sm">
          {isHttps ? 'HTTPS Secure' : 'HTTP Warning'}
        </Badge>
      </div>

      {/* Grid: Domain, Protocol, Domain Age, SSL Issuer */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {/* Domain Name */}
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Globe className="w-3.5 h-3.5 text-guard-cyan" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Domain</span>
          </div>
          <p className="font-bold text-white truncate" title={domain}>
            {domain}
          </p>
        </div>

        {/* Protocol */}
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Protocol</span>
          </div>
          <p className="font-mono font-bold text-cyan-300 uppercase">{protocol || 'HTTPS:'}</p>
        </div>

        {/* Domain Age */}
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Domain Age</span>
          </div>
          <p className="font-semibold text-slate-200">{domainAge || 'Verified'}</p>
        </div>

        {/* SSL Certificate */}
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">SSL Certificate</span>
          </div>
          <p className="font-semibold text-slate-200 truncate" title={sslIssuer}>
            {sslIssuer || 'TLS 1.3'}
          </p>
        </div>
      </div>
    </GlassContainer>
  );
}
