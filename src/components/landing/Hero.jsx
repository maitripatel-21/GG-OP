import { motion } from 'framer-motion';
import { ShieldCheck, Lock, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import PrimaryButton from '../buttons/PrimaryButton';
import SecurityScoreCard from '../cards/SecurityScoreCard';
import GlassContainer from '../common/GlassContainer';
import { browserService } from '../../services/browser/chrome';

/**
 * Reusable Cyber Hero Section Component
 */
export default function Hero({ onExplore }) {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading, Value Proposition & CTA */}
        <motion.div
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-guard-cyan text-xs font-bold shadow-glow">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Next-Gen Client-Side Web Protection</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Browse Safely with <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Gorillaz Guard
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Instant real-time threat detection for Chrome, Edge, and Brave. Detect phishing URL signatures, unencrypted HTTP links, raw IP hostnames, and deceptive domains with 0% data tracking.
          </p>

          {/* Value Bullet Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-lg mx-auto lg:mx-0 text-xs sm:text-sm font-semibold text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Manifest V3 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero-Telemetry Privacy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Real-Time Safety Gauge</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant Content Warnings</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-4">
            <PrimaryButton
              variant="cyan"
              icon={ShieldCheck}
              onClick={() => browserService.openOptionsPage()}
              className="w-full sm:w-auto px-6 py-3.5 text-base"
            >
              Launch Dashboard
            </PrimaryButton>

            <PrimaryButton
              variant="glass"
              icon={ArrowRight}
              onClick={onExplore}
              className="w-full sm:w-auto px-6 py-3.5 text-base"
            >
              Explore Features
            </PrimaryButton>
          </div>
        </motion.div>

        {/* Right Column: Live Interactive Extension Window Preview */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative mx-auto max-w-sm sm:max-w-md">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-purple-600 opacity-30 blur-2xl animate-pulse" />

            <GlassContainer className="relative p-5 space-y-4 shadow-glass border-white/15">
              {/* Extension Window Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-bold text-slate-300 ml-2">Gorillaz Guard Active</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  <Lock className="w-3 h-3" />
                  <span>Encrypted</span>
                </div>
              </div>

              {/* Score Meter Widget */}
              <SecurityScoreCard score={96} level="SAFE" />

              {/* Sample Active Domain Inspector */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Inspected Tab</span>
                  <span className="text-emerald-400 font-bold">100% Safe</span>
                </div>
                <p className="text-sm font-bold text-white truncate">https://github.com/facebook/react</p>
              </div>
            </GlassContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
