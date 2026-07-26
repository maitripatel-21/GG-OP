import { useUrlAnalyzer } from '../../hooks/useUrlAnalyzer';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SecurityScoreCard from '../../components/cards/SecurityScoreCard';
import WebsiteDetailsCard from '../../components/cards/WebsiteDetailsCard';
import ThreatCard from '../../components/cards/ThreatCard';
import EngineStatusCard from '../../components/cards/EngineStatusCard';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import FadeIn from '../../components/animations/FadeIn';
import { RefreshCw, ExternalLink, Search } from 'lucide-react';
import { browserService } from '../../services/browser/chrome';

/**
 * Gorillaz Guard - Production Extension Popup Page Component
 */
export default function PopupPage() {
  const { analysisResult, isScanning, scanActiveTab } = useUrlAnalyzer();

  const threats = analysisResult?.threats || [];

  return (
    <div className="p-3.5 space-y-3 max-w-[380px] mx-auto select-none font-sans bg-[#0C0E14] text-[#F5F5F5] min-h-[580px]">
      {/* Header */}
      <Header title="Gorillaz Guard" subtitle="Real-Time Protection" />

      {/* Loading Skeleton vs Main Content */}
      {isScanning ? (
        <div className="space-y-3">
          <LoadingSkeleton type="score" />
          <LoadingSkeleton type="card" />
        </div>
      ) : (
        <>
          {/* Risk Score Radial Gauge */}
          <FadeIn delay={0.1}>
            <SecurityScoreCard
              score={analysisResult?.safetyScore ?? 100}
            />
          </FadeIn>

          {/* Website & Protocol Details Card */}
          <FadeIn delay={0.2}>
            <WebsiteDetailsCard analysis={analysisResult} />
          </FadeIn>

          {/* Dual Engine Protection Status Card */}
          <FadeIn delay={0.25}>
            <EngineStatusCard compact={true} />
          </FadeIn>

          {/* Threat Warnings List */}
          {threats.length > 0 && (
            <FadeIn delay={0.3} className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[11px] font-extrabold text-[#E2454A] uppercase tracking-wider">
                  Security Alerts Detected ({threats.length})
                </h3>
              </div>
              <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                {threats.map((threat, index) => (
                  <ThreatCard key={threat.id || index} threat={threat} />
                ))}
              </div>
            </FadeIn>
          )}
        </>
      )}

      {/* Action Buttons Grid */}
      <FadeIn delay={0.4} className="space-y-2 pt-1">
        <div className="grid grid-cols-2 gap-2">
          {/* Analyze Button */}
          <PrimaryButton
            variant="cyan"
            icon={Search}
            onClick={scanActiveTab}
            disabled={isScanning}
            ariaLabel="Analyze active tab security"
          >
            {isScanning ? 'Scanning...' : 'Analyze Tab'}
          </PrimaryButton>

          {/* Refresh Button */}
          <PrimaryButton
            variant="glass"
            icon={RefreshCw}
            onClick={scanActiveTab}
            disabled={isScanning}
            ariaLabel="Refresh tab security scan"
          >
            Refresh
          </PrimaryButton>
        </div>

        {/* Open Dashboard Button */}
        <PrimaryButton
          variant="glass"
          icon={ExternalLink}
          onClick={() => browserService.openOptionsPage()}
          className="w-full justify-center"
          ariaLabel="Open full security dashboard"
        >
          Open Dashboard
        </PrimaryButton>
      </FadeIn>

      {/* Footer */}
      <Footer />
    </div>
  );
}
