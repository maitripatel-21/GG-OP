import { Shield, LayoutDashboard } from 'lucide-react';
import IconButton from '../buttons/IconButton';
import { browserService } from '../../services/browser/chrome';

/**
 * Common App Header Component
 */
export default function Header({
  title = 'Gorillaz Guard',
  subtitle = 'Real-Time Protection',
}) {
  return (
    <header className="glass-panel p-3.5 rounded-2xl border border-white/10 flex items-center justify-between shadow-glass">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 text-guard-cyan shadow-glow">
          <Shield className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
            {title}
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </h1>
          <p className="text-[11px] font-medium text-slate-400">{subtitle}</p>
        </div>
      </div>

      <IconButton
        icon={LayoutDashboard}
        title="Open Full Dashboard"
        onClick={() => browserService.openOptionsPage()}
      />
    </header>
  );
}
