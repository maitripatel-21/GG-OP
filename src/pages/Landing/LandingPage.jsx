import BackgroundAnimation from '../../components/animations/BackgroundAnimation';
import Navbar from '../../components/layout/Navbar';
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
export default function LandingPage() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const featureList = [
    {
      title: 'HTTPS & SSL Security Check',
      description: 'Verifies SSL/TLS encryption certificates in real time to prevent unencrypted HTTP data exposure.',
      icon: Lock,
      badgeText: 'Phase 1 Active',
      variant: 'cyan',
      metrics: { label: 'Encryption Standard', value: 'TLS 1.3' },
    },
    {
      title: 'Phishing Keyword Engine',
      description: 'Detects deceptive login paths, credential harvesting words, and fake banking URLs instantly.',
      icon: ShieldAlert,
      badgeText: 'Phase 2 Active',
      variant: 'rose',
      metrics: { label: 'Keyword Heuristics', value: 'Active' },
    },
    {
      title: 'IP Hostname & Shortener Detector',
      description: 'Flags raw numerical IP addresses and hidden destination URL shortener services like bit.ly.',
      icon: Network,
      badgeText: 'Phase 2 Active',
      variant: 'amber',
      metrics: { label: 'Domain Masking', value: 'Intercepted' },
    },
    {
      title: 'Real-Time Safety Score Meter',
      description: 'Calculates dynamic safety ratings (0 - 100) using radial SVG gauge animations.',
      icon: Activity,
      badgeText: 'Phase 1 Active',
      variant: 'emerald',
      metrics: { label: 'Computation Speed', value: '< 2ms' },
    },
    {
      title: 'Security History & Analytics Hub',
      description: 'Log visited sites, audit past security risks, and analyze domain threat levels in a full dashboard.',
      icon: Eye,
      badgeText: 'Phase 3 Active',
      variant: 'cyan',
      metrics: { label: 'Storage Layer', value: 'On-Device' },
    },
    {
      title: 'Granular Safety Toggles',
      description: 'Customize heuristic rules, auto warning banners, notifications, and domain whitelists.',
      icon: Settings,
      badgeText: 'Phase 4 Active',
      variant: 'emerald',
      metrics: { label: 'Customization', value: 'Full Control' },
    },
  ];

  return (
    <div className="relative min-h-screen bg-guard-bg text-slate-100 font-sans selection:bg-guard-cyan/30 selection:text-guard-cyan">
      {/* Animated Glowing Cyber Background */}
      <BackgroundAnimation />

      {/* Main Page Layout */}
      <div className="relative z-10 space-y-16">
        {/* Navigation Bar */}
        <Navbar
          onNavigate={(target) => {
            if (target === 'features') scrollToSection('features-section');
            if (target === 'why') scrollToSection('why-section');
            if (target === 'about') scrollToSection('about-section');
          }}
        />

        {/* Hero Section */}
        <Hero onExplore={() => scrollToSection('features-section')} />

        {/* Features Grid Section */}
        <section id="features-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-guard-cyan">
              Complete Feature Suite
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise-Grade Protection for Everyday Browsing
            </h3>
            <p className="text-sm text-slate-400">
              Modular security engines built directly into your browser workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureList.map((f, index) => (
              <FadeIn key={index} delay={index * 0.1}>
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

        {/* Why Gorillaz Guard Section */}
        <WhySection />

        {/* About & Architecture Section */}
        <AboutSection />

        {/* Modular Landing Footer */}
        <LandingFooter />
      </div>
    </div>
  );
}
