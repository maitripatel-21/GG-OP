import { useSettings } from '../../hooks/useSettings';
import SettingsSection from '../../components/settings/SettingsSection';
import SettingsToggleRow from '../../components/settings/SettingsToggleRow';
import GlassContainer from '../../components/common/GlassContainer';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import FadeIn from '../../components/animations/FadeIn';
import {
  Moon,
  Lock,
  ShieldAlert,
  Search,
  Bell,
  RotateCcw,
  CheckCircle2,
  HardDrive,
  Network,
  Link,
  Sliders,
} from 'lucide-react';

/**
 * Gorillaz Guard - Production Settings Page Component
 */
export default function SettingsPage() {
  const { settings, resetSuccess, updateSetting, resetSettings } = useSettings();

  return (
    <FadeIn className="space-y-6 max-w-4xl mx-auto font-sans">
      {/* Page Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Sliders className="w-6 h-6 text-guard-cyan" />
            Security Settings & Preferences
          </h2>
          <p className="text-xs text-slate-400">
            Configure real-time threat engines, alert notifications, and storage options
          </p>
        </div>
      </div>

      {/* 1. General & UI Appearance Section */}
      <SettingsSection
        title="General & UI Appearance"
        description="Customize the visual theme and interface mode"
        icon={Moon}
      >
        <SettingsToggleRow
          title="Dark Mode Theme"
          description="Enable dark glassmorphic cybersecurity color palette"
          enabled={settings.darkMode ?? true}
          onChange={(val) => updateSetting('darkMode', val)}
          icon={Moon}
        />
      </SettingsSection>

      {/* 2. Security Threat Inspection Engine Section */}
      <SettingsSection
        title="Security & Threat Inspection Engine"
        description="Enable or disable specific heuristic security detection rules"
        icon={ShieldAlert}
      >
        <SettingsToggleRow
          title="Real-Time Protection Shield"
          description="Continuous background monitoring of active web pages"
          enabled={settings.protectionEnabled}
          onChange={(val) => updateSetting('protectionEnabled', val)}
          icon={ShieldAlert}
        />

        <SettingsToggleRow
          title="Enable HTTPS Connection Check"
          description="Warn when visiting unencrypted HTTP websites lacking TLS certificates"
          enabled={settings.checkHttps}
          onChange={(val) => updateSetting('checkHttps', val)}
          icon={Lock}
        />

        <SettingsToggleRow
          title="Enable Phishing Keyword Detection"
          description="Scan URLs for credential harvesting keywords (e.g. login, verify, banking)"
          enabled={settings.checkKeywords}
          onChange={(val) => updateSetting('checkKeywords', val)}
          icon={Search}
        />

        <SettingsToggleRow
          title="Enable IP-Address Hostname Check"
          description="Flag websites using raw numerical IP hostnames (e.g. 192.168.1.1)"
          enabled={settings.checkIpUrls}
          onChange={(val) => updateSetting('checkIpUrls', val)}
          icon={Network}
        />

        <SettingsToggleRow
          title="Enable URL Shortener Link Check"
          description="Identify link shortening redirection services hiding destination domains"
          enabled={settings.checkShorteners}
          onChange={(val) => updateSetting('checkShorteners', val)}
          icon={Link}
        />
      </SettingsSection>

      {/* 3. Notifications & Alert Banners Section */}
      <SettingsSection
        title="Notifications & Alert Overlays"
        description="Configure browser notifications and top warning banners"
        icon={Bell}
      >
        <SettingsToggleRow
          title="Enable Browser Notifications"
          description="Receive desktop toast alerts when high-risk threats are detected"
          enabled={settings.notificationsEnabled}
          onChange={(val) => updateSetting('notificationsEnabled', val)}
          icon={Bell}
        />

        <SettingsToggleRow
          title="Enable Automatic Threat Warning Banners"
          description="Inject top warning banners directly into unsafe websites"
          enabled={settings.autoWarnBanners}
          onChange={(val) => updateSetting('autoWarnBanners', val)}
          icon={ShieldAlert}
        />
      </SettingsSection>

      {/* 4. Persistent Storage & Reset Settings Section */}
      <GlassContainer className="p-6 space-y-4 border-white/10">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Reset & Persistent Storage</h3>
              <p className="text-xs text-slate-400">Manage saved preferences in chrome.storage.local</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
            <HardDrive className="w-3.5 h-3.5 text-guard-cyan" />
            <span>On-Device Storage</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-slate-200">Reset All Settings</p>
            <p className="text-xs text-slate-400">Restores all security preferences back to initial system defaults</p>
          </div>

          <PrimaryButton
            variant="rose"
            icon={RotateCcw}
            onClick={resetSettings}
          >
            Reset Settings
          </PrimaryButton>
        </div>

        {resetSuccess && (
          <FadeIn className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings successfully reset to factory defaults!</span>
          </FadeIn>
        )}
      </GlassContainer>
    </FadeIn>
  );
}
