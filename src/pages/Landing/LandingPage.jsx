import BackgroundAnimation from '../../components/animations/BackgroundAnimation';
import Hero from '../../components/landing/Hero';
import FeatureCard from '../../components/cards/FeatureCard';
import WhySection from '../../components/landing/WhySection';
import AboutSection from '../../components/landing/AboutSection';
import LandingFooter from '../../components/layout/LandingFooter';
import FadeIn from '../../components/animations/FadeIn';
import { Lock, ShieldAlert, Activity, Settings, Network, Eye } from 'lucide-react';

/**
 * Gorillaz Guard - Production Landing Page Component
 */
export default function LandingPage({ onLaunchDashboard }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const featureList = [
    {
      title: 'HTTPS & SSL Security Check',
      description:
        'Verifies SSL/TLS encryption certificates in real time to prevent unencrypted HTTP data exposure.',
      icon: Lock,
      badgeText: 'Phase 1 Active',
      variant: 'cyan',
      metrics: { label: 'Encryption Standard', value: 'TLS 1.3' },
    },
    {
      title: 'Phishing Keyword Engine',
      description:
        'Detects deceptive login paths, credential harvesting words, and fake banking URLs instantly.',
      icon: ShieldAlert,
      badgeText: 'Phase 2 Active',
      variant: 'rose',
      metrics: { label: 'Keyword Heuristics', value: 'Active' },
    },
    {
      title: 'IP Hostname & Shortener Detector',
      description:
        'Flags raw numerical IP addresses and hidden destination URL shortener services like bit.ly.',
      icon: Network,
      badgeText: 'Phase 2 Active',
      variant: 'amber',
      metrics: { label: 'Domain Masking', value: 'Intercepted' },
    },
    {
      title: 'Real-Time Safety Score Meter',
      description:
        'Calculates dynamic safety ratings (0 - 100) using radial SVG gauge animations.',
      icon: Activity,
      badgeText: 'Phase 1 Active',
      variant: 'emerald',
      metrics: { label: 'Computation Speed', value: '< 2ms' },
    },
    {
      title: 'Security History & Analytics Hub',
      description:
        'Log visited sites, audit past security risks, and analyze domain threat levels in a full dashboard.',
      icon: Eye,
      badgeText: 'Phase 3 Active',
      variant: 'cyan',
      metrics: { label: 'Storage Layer', value: 'On-Device' },
    },
    {
      title: 'Granular Safety Toggles',
      description:
        'Customize heuristic rules, auto warning banners, notifications, and domain whitelists.',
      icon: Settings,
      badgeText: 'Phase 4 Active',
      variant: 'emerald',
      metrics: { label: 'Customization', value: 'Full Control' },
    },
  ];

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-cyan-500/20">
      {/* Background Glow Animation */}
      <BackgroundAnimation />

      {/* Main Content Layout */}
      <div className="relative z-10 space-y-12">
        {/* Hero Section */}
        <Hero
          onExplore={() => scrollToSection('features-section')}
          onLaunchDashboard={onLaunchDashboard}
        />

        {/* Features Grid Section */}
        <section
          id="features-section"
          className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-10"
        >
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400">
              Complete Security Suite
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enterprise Protection for Everyday Browsing
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Modular security engines running entirely on-device inside your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featureList.map((f, index) => (
              <FadeIn key={index} delay={index * 0.08}>
                <FeatureCard
                  title={f.title}
                  description={f.description}
                  icon={f.icon}
                  badgeText={f.badgeText}
                  variant={f.variant}
                  metrics={f.metrics}
                />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Why Section */}
        <WhySection />

        {/* About Section */}
        <AboutSection />

        {/* Footer */}
        <LandingFooter />
      </div>
    </div>
  );
}
