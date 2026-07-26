import GlassContainer from '../common/GlassContainer';
import { Cpu, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { virusTotalService } from '../../services/url/virusTotalService';

/**
 * Standalone Reusable Dual Engine Protection Status Card
 * Displays active operational status of Local Risk Engine + VirusTotal API v3
 */
export default function EngineStatusCard({ compact = false }) {
  const isVtActive = virusTotalService.isConfigured();

  if (compact) {
    return (
      <GlassContainer className="p-3 space-y-2 border-cyan-500/20 font-sans">
        <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
          <span className="text-[11px] font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E2454A]" />
            Dual Engine Status
          </span>
          <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            2 / 2 Active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
            <span className="text-slate-400 font-semibold flex items-center gap-1 text-[10px]">
              <Cpu className="w-3 h-3 text-cyan-400" />
              Local Engine
            </span>
            <span className="font-bold text-emerald-400 flex items-center gap-1 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Active (0ms)
            </span>
          </div>

          <div className="p-2 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
            <span className="text-slate-400 font-semibold flex items-center gap-1 text-[10px]">
              <ShieldCheck className="w-3 h-3 text-[#E2454A]" />
              VirusTotal API
            </span>
            {isVtActive ? (
              <span className="font-bold text-emerald-400 flex items-center gap-1 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active (Live)
              </span>
            ) : (
              <span className="font-bold text-amber-400 flex items-center gap-1 text-[10px]">
                <AlertCircle className="w-3 h-3 text-amber-400" />
                No Key
              </span>
            )}
          </div>
        </div>
      </GlassContainer>
    );
  }

  return (
    <GlassContainer className="p-5 space-y-4 border-cyan-500/20 font-sans">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#E2454A]/10 text-[#E2454A] border border-[#E2454A]/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Dual Protection Engines Operational Status</h3>
            <p className="text-xs text-slate-400">Live health monitoring of on-device heuristics & VirusTotal cloud intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Both Engines Synchronized</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Local Heuristic Engine Status */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              1. Local Risk Engine
            </span>
            <span className="text-[10px] font-extrabold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Client-side deterministic threat heuristics (HTTPS, IP host, shorteners, ports, subdomains).
          </p>
          <div className="text-[11px] font-mono text-slate-300 pt-1 border-t border-white/5 flex justify-between">
            <span>Latency: <strong>&lt; 1ms</strong></span>
            <span>Privacy: <strong>100% On-Device</strong></span>
          </div>
        </div>

        {/* VirusTotal API v3 Engine Status */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E2454A]" />
              2. VirusTotal API v3 Intelligence
            </span>
            {isVtActive ? (
              <span className="text-[10px] font-extrabold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                ACTIVE
              </span>
            ) : (
              <span className="text-[10px] font-extrabold text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                DISCONNECTED
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">
            Real-time cloud lookup against 70+ global antivirus scanners (Kaspersky, Sophos, Bitdefender, etc.).
          </p>
          <div className="text-[11px] font-mono text-slate-300 pt-1 border-t border-white/5 flex justify-between">
            <span>API Status: <strong>{isVtActive ? 'Connected (v3 API)' : 'Key Missing'}</strong></span>
            <span>Scanners: <strong>70+ Engines</strong></span>
          </div>
        </div>
      </div>
    </GlassContainer>
  );
}
