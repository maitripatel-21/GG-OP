import { Shield, LayoutDashboard } from 'lucide-react';

/**
 * Reusable Sleek Minimal Landing & App Navbar Component
 */
export default function Navbar({ activeTab = 'landing', onNavigate }) {
  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6">
      <nav className="glass-panel p-3.5 rounded-2xl border border-white/10 flex items-center justify-between shadow-sm">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate?.('landing')}>
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-bold text-white tracking-tight">Gorillaz Guard</span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold text-emerald-400">
              v1.0.0
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 text-xs font-semibold">
          <button
            onClick={() => onNavigate?.('landing')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'landing'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate?.('overview')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate?.('history')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'history'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            History
          </button>
          <button
            onClick={() => onNavigate?.('settings')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'settings'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Quick Launch Dashboard Action */}
        <button
          onClick={() => onNavigate?.('overview')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/10 transition-all"
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
          <span>Launch</span>
        </button>
      </nav>
    </header>
  );
}
