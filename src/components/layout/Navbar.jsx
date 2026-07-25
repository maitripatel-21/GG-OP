import { Shield, LayoutDashboard, HelpCircle } from 'lucide-react';

/**
 * Reusable Sleek Minimal Landing & App Navbar Component with Help Tab
 */
export default function Navbar({ activeTab = 'landing', onNavigate }) {
  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 font-sans">
      <nav className="glass-panel p-3.5 rounded-2xl border border-white/10 flex items-center justify-between shadow-sm">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate?.('landing')}>
          <div className="p-2 rounded-xl bg-[#E2454A]/10 border border-[#E2454A]/20 text-[#E2454A]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-bold text-white tracking-tight">Gorillaz Guard</span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold text-emerald-400">
              v1.0.0
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Home, Dashboard, History, Whitelist, Settings, Help) */}
        <div className="flex items-center gap-1 sm:gap-2 text-xs font-semibold">
          <button
            onClick={() => onNavigate?.('landing')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'landing'
                ? 'bg-[#E2454A]/20 text-[#E2454A] border border-[#E2454A]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate?.('overview')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-[#E2454A]/20 text-[#E2454A] border border-[#E2454A]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate?.('history')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'history'
                ? 'bg-[#E2454A]/20 text-[#E2454A] border border-[#E2454A]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            History
          </button>
          <button
            onClick={() => onNavigate?.('whitelist')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'whitelist'
                ? 'bg-[#E2454A]/20 text-[#E2454A] border border-[#E2454A]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Whitelist
          </button>
          <button
            onClick={() => onNavigate?.('settings')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'settings'
                ? 'bg-[#E2454A]/20 text-[#E2454A] border border-[#E2454A]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Settings
          </button>
          {/* Help Button right beside Settings */}
          <button
            onClick={() => onNavigate?.('help')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              activeTab === 'help'
                ? 'bg-[#E2454A]/20 text-[#E2454A] border border-[#E2454A]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help</span>
          </button>
        </div>

        {/* Quick Launch Dashboard Action */}
        <button
          onClick={() => onNavigate?.('overview')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/10 transition-all"
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-[#E2454A]" />
          <span>Launch</span>
        </button>
      </nav>
    </header>
  );
}
