import { useState } from 'react';
import GlassContainer from '../common/GlassContainer';
import PrimaryButton from '../buttons/PrimaryButton';
import { urlAnalysisEngine } from '../../services/url/urlAnalysisEngine';
import { ShieldCheck, ShieldAlert, ArrowRightLeft, Search } from 'lucide-react';

/**
 * Feature 2: Side-by-Side Domain Risk Comparison Tool Component
 */
export default function DomainCompareCard() {
  const [domainAInput, setDomainAInput] = useState('https://github.com');
  const [domainBInput, setDomainBInput] = useState('https://github-verify-login.xyz');
  const [analysisA, setAnalysisA] = useState(() => urlAnalysisEngine.analyze('https://github.com'));
  const [analysisB, setAnalysisB] = useState(() => urlAnalysisEngine.analyze('https://github-verify-login.xyz'));

  const handleCompare = (e) => {
    e?.preventDefault();
    if (!domainAInput || !domainBInput) return;

    const resA = urlAnalysisEngine.analyze(domainAInput);
    const resB = urlAnalysisEngine.analyze(domainBInput);

    setAnalysisA(resA);
    setAnalysisB(resB);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 50) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  return (
    <GlassContainer className="p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <ArrowRightLeft className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Domain Risk Comparison Tool</h3>
            <p className="text-xs text-slate-400">Compare two domains side-by-side to detect phishing lookalikes</p>
          </div>
        </div>
      </div>

      {/* Comparison Inputs Form */}
      <form onSubmit={handleCompare} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
        <div className="sm:col-span-5">
          <input
            type="text"
            value={domainAInput}
            onChange={(e) => setDomainAInput(e.target.value)}
            placeholder="Domain A (e.g. github.com)"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="sm:col-span-2 text-center text-xs font-bold text-slate-400 uppercase">VS</div>

        <div className="sm:col-span-5">
          <input
            type="text"
            value={domainBInput}
            onChange={(e) => setDomainBInput(e.target.value)}
            placeholder="Domain B (e.g. github-verify.com)"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="sm:col-span-12 pt-1">
          <PrimaryButton variant="cyan" icon={Search} type="submit" className="w-full justify-center">
            Compare Security Risk
          </PrimaryButton>
        </div>
      </form>

      {/* Side-by-Side Comparison Results */}
      {analysisA && analysisB && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {/* Domain A Card */}
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold text-white truncate max-w-[180px]">{analysisA.domain}</span>
              <div className={`px-2 py-0.5 rounded-full border text-xs font-black ${getScoreColor(analysisA.safetyScore)}`}>
                Score: {analysisA.safetyScore}
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between"><span className="text-slate-400">HTTPS Encryption:</span><span className="font-semibold">{analysisA.isHttps ? 'Yes (TLS 1.3)' : 'No (Unencrypted)'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">IP Hostname:</span><span className="font-semibold">{analysisA.isIpHost ? 'Yes (Risky)' : 'No (Domain)'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Threat Count:</span><span className="font-semibold">{analysisA.threatCount}</span></div>
            </div>

            {analysisA.threats.length > 0 && (
              <div className="pt-1 space-y-1">
                <p className="text-[11px] font-extrabold text-rose-400 uppercase">Threat Flags:</p>
                {analysisA.threats.map((t, i) => (
                  <p key={i} className="text-[11px] text-slate-300 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-rose-400 shrink-0" />
                    <span>{t.title}</span>
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Domain B Card */}
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold text-white truncate max-w-[180px]">{analysisB.domain}</span>
              <div className={`px-2 py-0.5 rounded-full border text-xs font-black ${getScoreColor(analysisB.safetyScore)}`}>
                Score: {analysisB.safetyScore}
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between"><span className="text-slate-400">HTTPS Encryption:</span><span className="font-semibold">{analysisB.isHttps ? 'Yes (TLS 1.3)' : 'No (Unencrypted)'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">IP Hostname:</span><span className="font-semibold">{analysisB.isIpHost ? 'Yes (Risky)' : 'No (Domain)'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Threat Count:</span><span className="font-semibold">{analysisB.threatCount}</span></div>
            </div>

            {analysisB.threats.length > 0 ? (
              <div className="pt-1 space-y-1">
                <p className="text-[11px] font-extrabold text-rose-400 uppercase">Threat Flags:</p>
                {analysisB.threats.map((t, i) => (
                  <p key={i} className="text-[11px] text-slate-300 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-rose-400 shrink-0" />
                    <span>{t.title}</span>
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 pt-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>No threat flags detected.</span>
              </p>
            )}
          </div>
        </div>
      )}
    </GlassContainer>
  );
}
