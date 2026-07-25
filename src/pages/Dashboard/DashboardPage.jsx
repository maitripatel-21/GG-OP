import { useState } from 'react';
import { useDashboardData } from '../../hooks/useDashboardData';
import GlassContainer from '../../components/common/GlassContainer';
import StatCard from '../../components/cards/StatCard';
import HistoryItemCard from '../../components/cards/HistoryItemCard';
import SecurityScoreCard from '../../components/cards/SecurityScoreCard';
import ScanChartCard from '../../components/cards/ScanChartCard';
import RiskBreakdownCard from '../../components/cards/RiskBreakdownCard';
import SecurityTipsCard from '../../components/cards/SecurityTipsCard';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import FadeIn from '../../components/animations/FadeIn';
import LandingPage from '../Landing/LandingPage';
import SettingsPage from '../Settings/SettingsPage';
import Navbar from '../../components/layout/Navbar';
import {
  Activity,
  ShieldCheck,
  ShieldAlert,
  ListFilter,
  Plus,
  Trash2,
  Globe,
} from 'lucide-react';

/**
 * Gorillaz Guard - Minimal Production App Page Container
 * Defaults to Landing Page view first, with clean navigation tabs to Dashboard, History, Whitelist, and Settings
 */
export default function DashboardPage() {
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
    <div className="min-h-screen bg-[#070A12] text-slate-100 pb-12 selection:bg-cyan-500/20">
      {/* Top Navbar Component */}
      <Navbar activeTab={activeTab} onNavigate={(tab) => setActiveTab(tab)} />

      <main role="main" className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Landing Page View (Default Primary View) */}
        {activeTab === 'landing' && (
          <LandingPage onLaunchDashboard={() => setActiveTab('overview')} />
        )}

        {/* Overview & Analytics View */}
        {activeTab === 'overview' && (
          <FadeIn className="space-y-6">
            {/* Metric Summary Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              <StatCard
                title="Inspected Sites"
                value={metrics?.totalInspected || 0}
                subtitle="Live browser history scans"
                icon={Activity}
                variant="cyan"
              />
              <StatCard
                title="Safe Websites"
                value={metrics?.safeCount || 0}
                subtitle="Clean connections"
                icon={ShieldCheck}
                variant="emerald"
              />
              <StatCard
                title="Unsafe Websites"
                value={metrics?.riskyCount || 0}
                subtitle="Flagged risks"
                icon={ShieldAlert}
                variant="rose"
              />
              <StatCard
                title="Whitelisted"
                value={whitelist.length}
                subtitle="User trusted domains"
                icon={Globe}
                variant="amber"
              />
            </div>

            {/* Safety Score + Weekly Scan Chart */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-1">
                <SecurityScoreCard score={metrics?.avgScore || 100} />
              </div>

              <div className="md:col-span-2">
                <ScanChartCard />
              </div>
            </div>

            {/* Threat Risk Breakdown & Security Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <RiskBreakdownCard />
              <SecurityTipsCard />
            </div>
          </FadeIn>
        )}

        {/* History Log View */}
        {activeTab === 'history' && (
          <FadeIn className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ListFilter className="w-4 h-4 text-cyan-400" />
                Real Browser History Inspection Log ({historyList.length})
              </h2>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
                <button
                  onClick={() => setHistoryFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    historyFilter === 'all' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({historyList.length})
                </button>
                <button
                  onClick={() => setHistoryFilter('safe')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    historyFilter === 'safe' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Safe ({safeWebsites.length})
                </button>
                <button
                  onClick={() => setHistoryFilter('risky')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    historyFilter === 'risky' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Unsafe ({unsafeWebsites.length})
                </button>
              </div>
            </div>

            {filteredHistory.length === 0 ? (
              <GlassContainer className="p-8 text-center text-slate-400 text-xs">
                No browsing history recorded yet. Open tabs to begin live security inspection.
              </GlassContainer>
            ) : (
              <div className="space-y-2.5">
                {filteredHistory.map((item) => (
                  <HistoryItemCard key={item.id} item={item} onWhitelist={handleAddWhitelist} />
                ))}
              </div>
            )}
          </FadeIn>
        )}

        {/* Whitelist Manager View */}
        {activeTab === 'whitelist' && (
          <FadeIn className="space-y-5 max-w-4xl mx-auto">
            <GlassContainer className="p-5 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Trusted Domain Whitelist Manager
              </h2>
              <p className="text-xs text-slate-400">
                Domains listed here bypass warning overlays and automated security flags.
              </p>

              <form onSubmit={onAddDomainSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={newDomainInput}
                  onChange={(e) => setNewDomainInput(e.target.value)}
                  placeholder="e.g. company-dashboard.internal.com"
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <PrimaryButton icon={Plus} variant="cyan" type="submit">
                  Add
                </PrimaryButton>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
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
        {activeTab === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}
