import GlassContainer from '../common/GlassContainer';
import { Layers, ShieldAlert, FileText, Database } from 'lucide-react';

/**
 * Reusable About & Architecture Section Component
 */
export default function AboutSection() {
  const modules = [
    {
      icon: Layers,
      name: 'Manifest V3 Service Worker',
      detail: 'Event-driven background thread reacting instantly to tab changes.',
    },
    {
      icon: ShieldAlert,
      name: 'Heuristic Threat Parser',
      detail:
        'Detects IP hostnames, URL shorteners, excessive subdomains, and phishing keywords.',
    },
    {
      icon: Database,
      name: 'Decoupled Storage Layer',
      detail: 'Promise-based local storage wrapper managing whitelist and history logs.',
    },
    {
      icon: FileText,
      name: 'Glassmorphic UI Engine',
      detail: 'Modular React design system built with Tailwind CSS and Framer Motion.',
    },
  ];

  return (
    <section
      id="about-section"
      className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 space-y-12"
    >
      <GlassContainer className="p-8 md:p-12 space-y-8 border-white/15">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            About Architecture
          </h2>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            Built from Day 1 for Scalability & Clean Code
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Gorillaz Guard follows strict software architecture principles:
            single-responsibility modules, zero monolithic files, and pure functional
            security calculators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((m, idx) => {
            const IconComp = m.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2"
              >
                <IconComp className="w-5 h-5 text-guard-cyan" />
                <h4 className="text-sm font-bold text-white">{m.name}</h4>
                <p className="text-xs text-slate-400">{m.detail}</p>
              </div>
            );
          })}
        </div>
      </GlassContainer>
    </section>
  );
}
