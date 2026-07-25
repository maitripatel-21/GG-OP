import { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { useDashboardData } from '../../hooks/useDashboardData';
import GlassContainer from '../../components/common/GlassContainer';
import StatCard from '../../components/cards/StatCard';
import HistoryItemCard from '../../components/cards/HistoryItemCard';
import SecurityScoreCard from '../../components/cards/SecurityScoreCard';
import ScanChartCard from '../../components/cards/ScanChartCard';
import RiskBreakdownCard from '../../components/cards/RiskBreakdownCard';
import SecurityTipsCard from '../../components/cards/SecurityTipsCard';
import ToggleSwitch from '../../components/common/ToggleSwitch';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import FadeIn from '../../components/animations/FadeIn';
import LandingPage from '../Landing/LandingPage';
import {
  Shield,
  Activity,
  ShieldCheck,
  ShieldAlert,
  Settings as SettingsIcon,
  ListFilter,
  Plus,
  Trash2,
  Globe,
  Lightbulb,
} from 'lucide-react';

/**
 * Gorillaz Guard - Production Security Dashboard Component
 */
export default function DashboardPage() {
  const { settings, updateSettings } = useSecurity();
  const {
    metrics,
    historyList,
    filteredHistory,
    safeWebsites,
    unsafeWebsites,
    whitelist,
    activeTab,
    historyFilter,
    setActiveTab,
    setHistoryFilter,
    handleAddWhitelist,
    handleRemoveWhitelist,
  } = useDashboardData();

  const [newDomainInput, setNewDomainInput] = useState('');

  const onAddDomainSubmit = (e) => {
    e?.preventDefault();
    if (!newDomainInput.trim()) return;
    handleAddWhitelist(newDomainInput.trim().toLowerCase());
    setNewDomainInput('');
  };

  return (
    <div className="min-h-screen bg-guard-bg text-slate-100 p-4 sm:p-6 md:p-10 space-y-8 max-w-7xl mx-auto selection:bg-guard-cyan/30">
      {/* Top Header Bar */}
      <header className="glass-panel p-5 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-glass">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 text-guard-cyan shadow-glow">
            <Shield className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white tracking-tight">Gorillaz Guard</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-guard-cyan/15 text-cyan-400 border border-cyan-500/30">
                Security Dashboard
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time threat engine, browsing statistics, risk analytics & preferences
            </p>
          </div>
        </div>

        {/* Tab Selector Navigation */}
        <nav className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-guard-cyan text-black shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-guard-cyan text-black shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            History Log ({historyList.length})
          </button>
          <button
            onClick={() => setActiveTab('websites')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'websites'
                ? 'bg-guard-cyan text-black shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Safe vs Risky
          </button>
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'landing'
                ? 'bg-guard-cyan text-black shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Landing Page
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-guard-cyan text-black shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Settings
          </button>
        </nav>
      </header>

      {/* Landing Page View */}
      {activeTab === 'landing' && <LandingPage />}

      {/* Overview & Analytics View */}
      {activeTab === 'overview' && (
        <FadeIn className="space-y-6">
          {/* Key Metric Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="Today's Scans"
              value={metrics?.totalInspected || 5}
              subtitle="Evaluated websites today"
              icon={Activity}
              variant="cyan"
            />
            <StatCard
              title="Safe Websites"
              value={metrics?.safeCount || 2}
              subtitle="Encrypted & verified sites"
              icon={ShieldCheck}
              variant="emerald"
            />
            <StatCard
              title="Unsafe Websites"
              value={metrics?.riskyCount || 3}
              subtitle="Flagged phishing & HTTP risks"
              icon={ShieldAlert}
              variant="rose"
            />
            <StatCard
              title="Trusted Whitelist"
              value={whitelist.length}
              subtitle="User-approved domains"
              icon={Globe}
              variant="amber"
            />
          </div>

          {/* Safety Gauge + Scan Analytics Trend Chart Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <SecurityScoreCard score={metrics?.avgScore || 85} level="SAFE" />
            </div>

            <div className="md:col-span-2">
              <ScanChartCard />
            </div>
          </div>

          {/* Threat Risk Breakdown + Security Best Practices Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RiskBreakdownCard />
            <SecurityTipsCard />
          </div>
        </FadeIn>
      )}

      {/* History Log View */}
      {activeTab === 'history' && (
        <FadeIn className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ListFilter className="w-5 h-5 text-guard-cyan" />
              Browsing Security History Log
            </h3>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
              <button
                onClick={() => setHistoryFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  historyFilter === 'all' ? 'bg-guard-cyan text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({historyList.length})
              </button>
              <button
                onClick={() => setHistoryFilter('safe')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  historyFilter === 'safe' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Safe ({safeWebsites.length})
              </button>
              <button
                onClick={() => setHistoryFilter('risky')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  historyFilter === 'risky' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Unsafe ({unsafeWebsites.length})
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredHistory.map((item) => (
              <HistoryItemCard key={item.id} item={item} onWhitelist={handleAddWhitelist} />
            ))}
          </div>
        </FadeIn>
      )}

      {/* Safe vs Unsafe Websites Breakdown View */}
      {activeTab === 'websites' && (
        <FadeIn className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Safe Websites Column */}
            <GlassContainer className="p-6 space-y-4">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2 border-b border-white/10 pb-3">
                <ShieldCheck className="w-5 h-5" />
                Verified Safe Websites ({safeWebsites.length})
              </h3>
              <div className="space-y-3">
                {safeWebsites.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">{item.domain}</p>
                      <p className="text-xs text-slate-400">Score: {item.safetyScore} • {item.timestamp}</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Clean
                    </span>
                  </div>
                ))}
              </div>
            </GlassContainer>

            {/* Unsafe Websites Column */}
            <GlassContainer className="p-6 space-y-4">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2 border-b border-white/10 pb-3">
                <ShieldAlert className="w-5 h-5" />
                Flagged Unsafe Websites ({unsafeWebsites.length})
              </h3>
              <div className="space-y-3">
                {unsafeWebsites.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-rose-300">{item.domain}</p>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Score: {item.safetyScore}
                      </span>
                    </div>
                    {item.threats && (
                      <p className="text-xs text-rose-300/80">⚠️ Threats: {item.threats.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            </GlassContainer>
          </div>

          {/* Whitelist Manager */}
          <GlassContainer className="p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-guard-cyan" />
              Trusted Domain Whitelist Manager
            </h3>
            <form onSubmit={onAddDomainSubmit} className="flex gap-2">
              <input
                type="text"
                value={newDomainInput}
                onChange={(e) => setNewDomainInput(e.target.value)}
                placeholder="e.g. company-portal.internal.com"
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-guard-cyan"
              />
              <PrimaryButton icon={Plus} variant="cyan" type="submit">
                Add Domain
              </PrimaryButton>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {whitelist.map((domain) => (
                <div key={domain} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <span className="font-bold text-white truncate">{domain}</span>
                  <button
                    onClick={() => handleRemoveWhitelist(domain)}
                    className="p-1 text-slate-400 hover:text-rose-400 rounded-md hover:bg-rose-500/10 transition-all"
                    title="Remove domain"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </GlassContainer>
        </FadeIn>
      )}

      {/* Settings View */}
      {activeTab === 'settings' && (
        <FadeIn className="space-y-6 max-w-3xl">
          <GlassContainer className="p-6 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-guard-cyan" />
              Security Engine Preferences
            </h3>

            <div className="space-y-3">
              <ToggleSwitch
                label="Real-Time Protection Shield"
                description="Enable continuous background inspecting of open browser tabs"
                enabled={settings.protectionEnabled}
                onChange={(val) => updateSettings({ protectionEnabled: val })}
              />

              <ToggleSwitch
                label="Automatic Threat Banners"
                description="Inject warning banner on dangerous domains"
                enabled={settings.autoWarnBanners}
                onChange={(val) => updateSettings({ autoWarnBanners: val })}
              />

              <ToggleSwitch
                label="Check Unencrypted HTTP Connections"
                description="Warn when visiting sites lacking SSL/TLS encryption"
                enabled={settings.checkHttps}
                onChange={(val) => updateSettings({ checkHttps: val })}
              />

              <ToggleSwitch
                label="Detect IP-Address Hostnames"
                description="Flag websites using raw numerical IP addresses"
                enabled={settings.checkIpUrls}
                onChange={(val) => updateSettings({ checkIpUrls: val })}
              />

              <ToggleSwitch
                label="Detect URL Shortener Links"
                description="Flag links hiding destination URLs (e.g. bit.ly)"
                enabled={settings.checkShorteners}
                onChange={(val) => updateSettings({ checkShorteners: val })}
              />
            </div>
          </GlassContainer>
        </FadeIn>
      )}
    </div>
  );
}
