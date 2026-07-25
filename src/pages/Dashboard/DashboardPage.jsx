import { useState, useEffect } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { analyticsService } from '../../services/security/analytics';
import GlassContainer from '../../components/common/GlassContainer';
import StatCard from '../../components/cards/StatCard';
import HistoryItemCard from '../../components/cards/HistoryItemCard';
import SecurityScoreCard from '../../components/cards/SecurityScoreCard';
import ToggleSwitch from '../../components/common/ToggleSwitch';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import FadeIn from '../../components/animations/FadeIn';
import LandingPage from '../Landing/LandingPage';
import {
  Shield,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Settings as SettingsIcon,
  ListFilter,
  Plus,
  Trash2,
  Lock,
  Globe,
} from 'lucide-react';

export default function DashboardPage() {
  const { settings, updateSettings } = useSecurity();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'history' | 'whitelist' | 'settings'
  const [metrics, setMetrics] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [whitelist, setWhitelist] = useState([]);
  const [newDomainInput, setNewDomainInput] = useState('');
  const [historyFilter, setHistoryFilter] = useState('all'); // 'all' | 'safe' | 'risky'

  // Load analytics data
  useEffect(() => {
    const loadData = async () => {
      const data = await analyticsService.getMetrics();
      setMetrics(data);
      setHistoryList(data.history || []);
      setWhitelist(data.whitelist || []);
    };
    loadData();
  }, []);

  // Add domain to whitelist
  const handleAddWhitelist = async (e) => {
    e?.preventDefault();
    if (!newDomainInput.trim()) return;
    const updated = await analyticsService.addToWhitelist(newDomainInput.trim().toLowerCase());
    setWhitelist(updated);
    setNewDomainInput('');
  };

  // Remove domain from whitelist
  const handleRemoveWhitelist = async (domain) => {
    const updated = await analyticsService.removeFromWhitelist(domain);
    setWhitelist(updated);
  };

  const filteredHistory = historyList.filter((item) => {
    if (historyFilter === 'safe') return item.safetyLevel === 'SAFE';
    if (historyFilter === 'risky') return item.safetyLevel !== 'SAFE';
    return true;
  });

  return (
    <div className="min-h-screen bg-guard-bg text-slate-100 p-6 md:p-10 space-y-8 max-w-7xl mx-auto selection:bg-guard-cyan/30">
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
              Real-time threat engine, history auditor, and safety preferences
            </p>
          </div>
        </div>

        {/* Tab Selector Navigation */}
        <nav className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/5">
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
            History Log
          </button>
          <button
            onClick={() => setActiveTab('whitelist')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'whitelist'
                ? 'bg-guard-cyan text-black shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Safe Whitelist
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Inspected Sites"
              value={metrics?.totalInspected || 5}
              subtitle="Visited domains evaluated"
              icon={Activity}
              variant="cyan"
            />
            <StatCard
              title="Safe Sites"
              value={metrics?.safeCount || 2}
              subtitle="Clean & encrypted connections"
              icon={ShieldCheck}
              variant="emerald"
            />
            <StatCard
              title="Threats Blocked"
              value={metrics?.riskyCount || 3}
              subtitle="Phishing & HTTP risks"
              icon={AlertTriangle}
              variant="rose"
            />
            <StatCard
              title="Trusted Domains"
              value={whitelist.length}
              subtitle="Active user whitelist"
              icon={Globe}
              variant="amber"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Average Safety Meter */}
            <div className="md:col-span-1">
              <SecurityScoreCard score={metrics?.avgScore || 85} level="SAFE" />
            </div>

            {/* Weekly Summary & Heuristic Threat Distribution */}
            <GlassContainer className="md:col-span-2 p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-guard-cyan" />
                Security Threat Engine Breakdown
              </h3>
              <p className="text-xs text-slate-400">
                Summary of heuristic checks performed during real-time browsing sessions.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-xs font-semibold text-slate-400">HTTPS Encryption</span>
                  <p className="text-lg font-bold text-emerald-400">92% Compliance</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-xs font-semibold text-slate-400">Phishing Keywords</span>
                  <p className="text-lg font-bold text-amber-400">1 Blocked Attempt</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-xs font-semibold text-slate-400">IP Hostname Checks</span>
                  <p className="text-lg font-bold text-rose-400">1 Flagged IP</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-xs font-semibold text-slate-400">URL Shorteners</span>
                  <p className="text-lg font-bold text-cyan-400">1 Identified</p>
                </div>
              </div>
            </GlassContainer>
          </div>
        </FadeIn>
      )}

      {/* History Log View */}
      {activeTab === 'history' && (
        <FadeIn className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ListFilter className="w-5 h-5 text-guard-cyan" />
              Browsing Security History Log
            </h3>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
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
                Safe
              </button>
              <button
                onClick={() => setHistoryFilter('risky')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  historyFilter === 'risky' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Risky / Warnings
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredHistory.map((item) => (
              <HistoryItemCard
                key={item.id}
                item={item}
                onWhitelist={(domain) => analyticsService.addToWhitelist(domain)}
              />
            ))}
          </div>
        </FadeIn>
      )}

      {/* Safe Whitelist View */}
      {activeTab === 'whitelist' && (
        <FadeIn className="space-y-6">
          <GlassContainer className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Safe Website Whitelist Manager
            </h3>
            <p className="text-xs text-slate-400">
              Domains listed here will bypass warning banners and automated security blocks.
            </p>

            <form onSubmit={handleAddWhitelist} className="flex gap-2">
              <input
                type="text"
                value={newDomainInput}
                onChange={(e) => setNewDomainInput(e.target.value)}
                placeholder="e.g. internal-dashboard.mycompany.com"
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-guard-cyan"
              />
              <PrimaryButton icon={Plus} variant="cyan" type="submit">
                Add Domain
              </PrimaryButton>
            </form>
          </GlassContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {whitelist.map((domain) => (
              <GlassContainer key={domain} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-bold text-white">{domain}</span>
                </div>
                <button
                  onClick={() => handleRemoveWhitelist(domain)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-all"
                  title="Remove from Whitelist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </GlassContainer>
            ))}
          </div>
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

              <ToggleSwitch
                label="Notification Alerts"
                description="Receive browser notifications on high-risk detections"
                enabled={settings.notificationsEnabled}
                onChange={(val) => updateSettings({ notificationsEnabled: val })}
              />
            </div>
          </GlassContainer>
        </FadeIn>
      )}
    </div>
  );
}
