import ToggleSwitch from '../common/ToggleSwitch';

/**
 * Reusable Settings Toggle Control Row Component
 */
export default function SettingsToggleRow({
  title,
  description,
  enabled,
  onChange,
  icon: Icon,
}) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group">
      <div className="flex items-center gap-3 space-y-0.5">
        {Icon && (
          <div className="p-2 rounded-lg bg-black/30 text-slate-300 group-hover:text-guard-cyan shrink-0 transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
            {title}
          </p>
          {description && <p className="text-xs text-slate-400">{description}</p>}
        </div>
      </div>

      <ToggleSwitch enabled={enabled} onChange={onChange} />
    </div>
  );
}
