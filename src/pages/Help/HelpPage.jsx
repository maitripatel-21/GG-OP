import { useState } from 'react';
import GlassContainer from '../../components/common/GlassContainer';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import FadeIn from '../../components/animations/FadeIn';
import {
  HelpCircle,
  ShieldCheck,
  Search,
  ChevronDown,
  ChevronUp,
  Github,
  Key,
  Download,
  LifeBuoy,
} from 'lucide-react';

/**
 * Gorillaz Guard - Production Help & Support Center Page Component
 */
export default function HelpPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'How does the Gorillaz Guard Safety Score (0 - 100) work?',
      answer:
        'Gorillaz Guard evaluates websites using a deterministic heuristic threat model. Clean, encrypted HTTPS connections with established domains start at 100 points. Penalties are deducted for unencrypted HTTP (-30), raw numerical IP hostnames (-35), phishing keywords (-25), non-standard network ports (-25), excessive subdomains (-20), and URL shorteners (-15).',
    },
    {
      question: 'Is my browsing history private and secure?',
      answer:
        'Yes, 100%! Gorillaz Guard operates on a 100% on-device zero-knowledge privacy architecture. All URL checks and threat detections are performed locally inside your browser in milliseconds. Zero URLs or browsing history are ever transmitted to external cloud servers.',
    },
    {
      question: 'How does the Real-Time Password & Form Guard work?',
      answer:
        'When you focus or type into a password or credit card input field on an unencrypted HTTP website or a high-risk domain, Gorillaz Guard attaches a red floating warning tooltip directly above the field to prevent credential theft before you submit the form.',
    },
    {
      question: 'How do I whitelist a trusted internal or corporate website?',
      answer:
        'Navigate to the Whitelist Manager tab in the top navigation bar, enter the domain name (e.g. company-internal.com), and click "Add". Whitelisted domains bypass automated warning banners and score penalties.',
    },
    {
      question: 'How do I export security audit reports or back up my whitelist?',
      answer:
        'On the Dashboard, click "Export Audit Report (JSON)" to download a structured security audit of all inspected domains. On the Whitelist tab, click "Export Backup" to save your trusted domains or "Import JSON" to restore them.',
    },
  ];

  return (
    <FadeIn className="space-y-6 max-w-4xl mx-auto font-sans text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#E2454A]" />
            Help & Knowledge Center
          </h2>
          <p className="text-xs text-slate-400">
            Learn how Gorillaz Guard protects your browsing and explore feature guides
          </p>
        </div>

        <PrimaryButton
          variant="glass"
          icon={Github}
          onClick={() => window.open('https://github.com/maitripatel-21/GG-OP', '_blank')}
          className="text-xs"
        >
          View GitHub Repository
        </PrimaryButton>
      </div>

      {/* Quick Feature Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassContainer className="p-4 space-y-2">
          <div className="p-2.5 rounded-xl bg-[#E2454A]/10 text-[#E2454A] w-fit border border-[#E2454A]/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Real-Time Extension Popup</h3>
          <p className="text-xs text-slate-400">
            Click the extension icon in your browser toolbar to instantly inspect the current tab&apos;s HTTPS status, domain parameters, and threat breakdown.
          </p>
        </GlassContainer>

        <GlassContainer className="p-4 space-y-2">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit border border-emerald-500/20">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Password & Form Guard</h3>
          <p className="text-xs text-slate-400">
            Automatically attaches floating warning tooltips over password input fields if you attempt to enter credentials on unencrypted or risky sites.
          </p>
        </GlassContainer>

        <GlassContainer className="p-4 space-y-2">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit border border-amber-500/20">
            <Download className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Audit Report Exporter</h3>
          <p className="text-xs text-slate-400">
            Download full structured JSON security reports of inspected browsing history with 1 click for security compliance and record keeping.
          </p>
        </GlassContainer>
      </div>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <GlassContainer className="p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <LifeBuoy className="w-5 h-5 text-[#E2454A]" />
          <h3 className="text-base font-bold text-white">Frequently Asked Questions (FAQ)</h3>
        </div>

        <div className="space-y-2.5">
          {faqItems.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl bg-white/5 border border-white/5 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-white hover:text-[#E2454A] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-[#E2454A]" />
                  {faq.question}
                </span>
                {openFaqIndex === index ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {openFaqIndex === index && (
                <div className="px-4 pb-4 text-xs text-slate-300 border-t border-white/5 pt-3 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </GlassContainer>
    </FadeIn>
  );
}
