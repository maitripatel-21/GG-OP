import GlassContainer from '../common/GlassContainer';

/**
 * Reusable Settings Section Container Component
 */
export default function SettingsSection({ title, description, icon: Icon, children }) {
  return (
    <GlassContainer className="p-6 space-y-4 border-white/10">
      <div className="flex items-center gap-3 border-b border-white/10 pb-3">
        {Icon && (
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-guard-cyan border border-cyan-500/20">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h3 className="text-base font-bold text-white">{title}</h3>
          {description && <p className="text-xs text-slate-400">{description}</p>}
        </div>
      </div>

      <div className="space-y-3 pt-1">{children}</div>
    </GlassContainer>
  );
}
