import { motion } from 'framer-motion';
import GlassContainer from '../common/GlassContainer';
import { ShieldAlert, Lock, Network, Link, Code } from 'lucide-react';

/**
 * Reusable Threat & Risk Category Breakdown Card
 */
export default function RiskBreakdownCard() {
  const riskCategories = [
    {
      name: 'Unencrypted HTTP Connections',
      percentage: 88,
      status: 'High Compliance',
      color: 'bg-emerald-400',
      textColor: 'text-emerald-400',
      icon: Lock,
    },
    {
      name: 'Phishing Keyword Signature Scans',
      percentage: 95,
      status: 'Clean',
      color: 'bg-guard-cyan',
      textColor: 'text-cyan-400',
      icon: ShieldAlert,
    },
    {
      name: 'Raw IP Hostname Obfuscation',
      percentage: 75,
      status: '1 Flagged',
      color: 'bg-amber-400',
      textColor: 'text-amber-400',
      icon: Network,
    },
    {
      name: 'Shortened Link Redirections',
      percentage: 82,
      status: 'Intercepted',
      color: 'bg-purple-400',
      textColor: 'text-purple-400',
      icon: Link,
    },
    {
      name: 'Percent-Encoded Obfuscation',
      percentage: 90,
      status: 'Low Risk',
      color: 'bg-teal-400',
      textColor: 'text-teal-400',
      icon: Code,
    },
  ];

  return (
    <GlassContainer className="p-6 space-y-5 border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-guard-cyan" />
            Security Threat & Risk Breakdown
          </h3>
          <p className="text-xs text-slate-400">
            Heuristic engine evaluation across threat vectors
          </p>
        </div>
        <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
          Real-Time
        </span>
      </div>

      <div className="space-y-4">
        {riskCategories.map((cat, idx) => {
          const IconComp = cat.icon;
          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2 text-slate-200">
                  <IconComp className={`w-4 h-4 ${cat.textColor}`} />
                  <span>{cat.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold ${cat.textColor}`}>
                    {cat.status}
                  </span>
                  <span className="text-slate-400">{cat.percentage}%</span>
                </div>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden border border-white/5">
                <motion.div
                  className={`h-full rounded-full ${cat.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.percentage}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </GlassContainer>
  );
}
