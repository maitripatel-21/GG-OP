import { ShieldCheck } from 'lucide-react';

/**
 * Common App Footer Component
 */
export default function Footer() {
  return (
    <footer className="pt-2 flex items-center justify-between text-[11px] text-slate-400 px-1 border-t border-white/5">
      <div className="flex items-center gap-1.5 text-emerald-400">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span className="font-semibold">Shield Active</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-slate-400 font-medium">v1.0.0</span>
        <span className="text-slate-400">•</span>
        <span className="text-slate-400">Manifest V3</span>
      </div>
    </footer>
  );
}
