import GlassContainer from '../common/GlassContainer';
import { ShieldCheck, Cpu, EyeOff, FastForward } from 'lucide-react';

/**
 * Reusable "Why Gorillaz Guard" Advantages Section Component
 */
export default function WhySection() {
  const pillars = [
    {
      icon: Cpu,
      title: 'Zero Latency Heuristic Engine',
      description:
        'All URL inspection algorithms execute locally inside your browser within milliseconds without waiting for server roundtrips.',
    },
    {
      icon: EyeOff,
      title: '100% Privacy & Zero Telemetry',
      description:
        'Your browsing activity never leaves your device. No user tracking, no external telemetry logging, and zero data monetization.',
    },
    {
      icon: FastForward,
      title: 'Manifest V3 Non-Blocking Architecture',
      description:
        'Designed specifically for standard Chromium V3 service workers, ensuring zero impact on your browser memory footprint.',
    },
    {
      icon: ShieldCheck,
      title: 'Real-Time Content Warning Overlays',
      description:
        'Automatically intercepts malicious phishing links and renders non-intrusive warning banners before you input sensitive data.',
    },
  ];

  return (
    <section id="why-section" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h2 className="text-xs font-extrabold uppercase tracking-widest text-guard-cyan">
          Why Gorillaz Guard
        </h2>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Designed for Speed, Engineered for Complete Privacy
        </h3>
        <p className="text-sm text-slate-400">
          Traditional security tools log your browsing data. Gorillaz Guard runs entirely on-device.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar, idx) => {
          const IconComp = pillar.icon;
          return (
            <GlassContainer key={idx} className="p-6 space-y-3 glass-card-hover">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-guard-cyan w-fit">
                <IconComp className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">{pillar.title}</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{pillar.description}</p>
            </GlassContainer>
          );
        })}
      </div>
    </section>
  );
}
