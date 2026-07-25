import { Shield } from 'lucide-react';

/**
 * Reusable Modular Landing Footer Component
 */
export default function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/40 py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-guard-cyan/10 text-guard-cyan border border-guard-cyan/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-bold text-white">Gorillaz Guard</span>
            <p className="text-[11px] text-slate-400">
              Chromium Manifest V3 Security Extension
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-slate-400">
          <a href="#why-section" className="hover:text-white transition-colors">
            Why Gorillaz Guard
          </a>
          <a href="#about-section" className="hover:text-white transition-colors">
            Architecture
          </a>
          <span>v1.0.0 (Production)</span>
        </div>
      </div>
    </footer>
  );
}
