import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';
import GlassContainer from '../common/GlassContainer';

/**
 * Animated Security Score Radial Gauge Component - Minimal & Sleek
 */
export default function SecurityScoreCard({ score = 100 }) {
  const getStatusConfig = () => {
    if (score >= 80) {
      return {
        color: '#10B981',
        label: 'Secure Domain',
        subtext: 'No critical threats detected.',
        icon: ShieldCheck,
        badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      };
    }
    if (score >= 50) {
      return {
        color: '#F59E0B',
        label: 'Suspicious Site',
        subtext: 'Security warnings found.',
        icon: ShieldAlert,
        badgeClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      };
    }
    return {
      color: '#F43F5E',
      label: 'Dangerous Domain',
      subtext: 'Critical risks detected.',
      icon: ShieldX,
      badgeClass: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    };
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <GlassContainer className="p-5 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="relative flex items-center justify-center my-1">
        <svg className="w-28 h-28 -rotate-90 transform">
          {/* Gauge Background Track */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="6"
            fill="transparent"
          />
          {/* Gauge Score Progress Ring */}
          <motion.circle
            cx="56"
            cy="56"
            r={radius}
            stroke={config.color}
            strokeWidth="6"
            strokeCap="round"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>

        {/* Center Score Number */}
        <div className="absolute flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-black text-white tracking-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {score}
          </motion.span>
          <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
            Score
          </span>
        </div>
      </div>

      {/* Minimal Status Label */}
      <div className="mt-1 space-y-0.5">
        <div
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${config.badgeClass}`}
        >
          <IconComponent className="w-3.5 h-3.5" />
          <span>{config.label}</span>
        </div>
        <p className="text-[11px] text-slate-400 pt-0.5">{config.subtext}</p>
      </div>
    </GlassContainer>
  );
}
