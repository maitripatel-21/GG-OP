import { motion } from 'framer-motion';

/**
 * Reusable Custom Toggle Switch Component
 */
export default function ToggleSwitch({ enabled, onChange, label, description }) {
  return (
    <div
      onClick={() => onChange(!enabled)}
      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer group"
    >
      <div className="space-y-0.5">
        {label && <p className="text-sm font-semibold text-slate-200 group-hover:text-white">{label}</p>}
        {description && <p className="text-xs text-slate-400">{description}</p>}
      </div>

      <div
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
          enabled ? 'bg-guard-cyan shadow-glow' : 'bg-slate-700'
        }`}
      >
        <motion.div
          className="bg-white w-4 h-4 rounded-full shadow-md"
          animate={{ x: enabled ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
    </div>
  );
}
