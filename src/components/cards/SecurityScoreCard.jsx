import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';
import GlassContainer from '../common/GlassContainer';

/**
 * Animated Security Score Radial Gauge Component
 */
export default function SecurityScoreCard({ score = 100 }) {
  const getStatusConfig = () => {
    if (score >= 80) {
      return {
        color: '#10B981',
        label: 'Website Secure',
        subtext: 'No major threats or phishing indicators detected.',
        icon: ShieldCheck,
        badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        glow: 'shadow-glow-emerald',
      };
    }
    if (score >= 50) {
      return {
        color: '#F59E0B',
        label: 'Suspicious Site',
        subtext: 'Potential security warnings found. Exercise caution.',
        icon: ShieldAlert,
        badgeClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        glow: '',
      };
    }
    return {
      color: '#F43F5E',
      label: 'Dangerous Domain',
      subtext: 'Critical security risks detected. Avoid entering sensitive data.',
      icon: ShieldX,
      badgeClass: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      glow: 'shadow-glow-rose',
    };
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <GlassContainer className="p-5 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="relative flex items-center justify-center my-2">
        <svg className="w-32 h-32 -rotate-90 transform">
          {/* Gauge Background Track */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Gauge Score Progress Ring */}
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke={config.color}
            strokeWidth="8"
            strokeCap="round"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>

        {/* Center Gauge Score Number */}
        <div className="absolute flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-extrabold text-white tracking-tight"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {score}
          </motion.span>
          <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Safety Score
          </span>
        </div>
      </div>

      {/* Status Label & Icon Badge */}
      <div className="mt-2 space-y-1">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${config.badgeClass} ${config.glow}`}
        >
          <IconComponent className="w-4 h-4" />
          <span>{config.label}</span>
        </div>
        <p className="text-xs text-slate-400 max-w-[260px] pt-1">{config.subtext}</p>
      </div>
    </GlassContainer>
  );
}
