import { useSecurity } from '../../context/SecurityContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SecurityScoreCard from '../../components/cards/SecurityScoreCard';
import UrlAnalysisCard from '../../components/cards/UrlAnalysisCard';
import ThreatCard from '../../components/cards/ThreatCard';
import ToggleSwitch from '../../components/common/ToggleSwitch';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import FadeIn from '../../components/animations/FadeIn';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { browserService } from '../../services/browser/chrome';

export default function PopupPage() {
  const { analysis, settings, updateSettings, refreshAnalysis, loading } = useSecurity();

  const threats = analysis?.threats || [];

  return (
    <div className="p-3.5 space-y-3.5 max-w-[380px] mx-auto select-none">
      {/* Extension Header */}
      <Header />

      {/* Main Score Gauge */}
      <FadeIn delay={0.1}>
        <SecurityScoreCard
          score={analysis?.safetyScore ?? 100}
          level={analysis?.safetyLevel ?? 'SAFE'}
        />
      </FadeIn>

      {/* URL & Domain Metrics */}
      <FadeIn delay={0.2}>
        <UrlAnalysisCard analysis={analysis} />
      </FadeIn>

      {/* Security Threat Alerts List */}
      {threats.length > 0 && (
        <FadeIn delay={0.3} className="space-y-2">
          <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider px-1">
            Detected Security Alerts ({threats.length})
          </h3>
          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
            {threats.map((threat, index) => (
              <ThreatCard key={threat.id || index} threat={threat} />
            ))}
          </div>
        </FadeIn>
      )}

      {/* Real-time Protection Toggle */}
      <FadeIn delay={0.4}>
        <ToggleSwitch
          label="Real-Time Shield"
          description="Intercept suspicious URLs & active threats"
          enabled={settings.protectionEnabled}
          onChange={(val) => updateSettings({ protectionEnabled: val })}
        />
      </FadeIn>

      {/* Quick Action Buttons */}
      <FadeIn delay={0.5} className="grid grid-cols-2 gap-2 pt-1">
        <PrimaryButton
          variant="glass"
          icon={RefreshCw}
          onClick={refreshAnalysis}
          disabled={loading}
        >
          {loading ? 'Scanning...' : 'Rescan Tab'}
        </PrimaryButton>

        <PrimaryButton
          variant="cyan"
          icon={ExternalLink}
          onClick={() => browserService.openOptionsPage()}
        >
          Dashboard
        </PrimaryButton>
      </FadeIn>

      {/* Footer */}
      <Footer />
    </div>
  );
}
