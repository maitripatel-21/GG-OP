import { Shield, ExternalLink } from 'lucide-react';
import PrimaryButton from '../buttons/PrimaryButton';
import { browserService } from '../../services/browser/chrome';

/**
 * Reusable Glassmorphic Landing Navbar Component
 */
export default function Navbar({ onNavigate }) {
  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6">
      <nav className="glass-panel p-4 rounded-3xl border border-white/10 flex items-center justify-between shadow-glass">
        {/* Brand Logo & Live Badge */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate?.('hero')}>
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 text-guard-cyan shadow-glow">
            <Shield className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-white tracking-tight">Gorillaz Guard</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Manifest V3
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Real-Time Cyber Security</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
          <button
            onClick={() => onNavigate?.('features')}
            className="hover:text-guard-cyan transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => onNavigate?.('why')}
            className="hover:text-guard-cyan transition-colors"
          >
            Why Gorillaz Guard
          </button>
          <button
            onClick={() => onNavigate?.('about')}
            className="hover:text-guard-cyan transition-colors"
          >
            Architecture
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center gap-2">
          <PrimaryButton
            variant="cyan"
            icon={ExternalLink}
            onClick={() => browserService.openOptionsPage()}
          >
            Dashboard
          </PrimaryButton>
        </div>
      </nav>
    </header>
  );
}
