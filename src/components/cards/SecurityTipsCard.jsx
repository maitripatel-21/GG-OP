import GlassContainer from '../common/GlassContainer';
import { Lightbulb, CheckCircle2 } from 'lucide-react';

/**
 * Reusable Cybersecurity Tips & Advice Card
 */
export default function SecurityTipsCard() {
  const tips = [
    'Always verify SSL certificates before submitting passwords or credit card credentials.',
    'Beware of unexpected links from URL shorteners (e.g. bit.ly); inspect them with Gorillaz Guard first.',
    'Never enter credentials on raw IP addresses (e.g., http://192.168.1.1/login).',
    'Enable Automatic Warning Banners in settings to block deceptive phishing domains automatically.',
  ];

  return (
    <GlassContainer className="p-6 space-y-4 border-white/10">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Cybersecurity Best Practices & Tips</h3>
          <p className="text-xs text-slate-400">Recommendations for safer web browsing</p>
        </div>
      </div>

      <div className="space-y-3">
        {tips.map((tip, idx) => (
          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200 leading-relaxed">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </GlassContainer>
  );
}
