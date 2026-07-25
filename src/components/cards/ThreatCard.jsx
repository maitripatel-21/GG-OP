import { AlertTriangle, AlertOctagon, Info } from 'lucide-react';
import GlassContainer from '../common/GlassContainer';

/**
 * Individual Security Threat / Warning Item Card
 */
export default function ThreatCard({ threat }) {
  const { title, description, severity } = threat;

  const getSeverityStyles = () => {
    switch (severity?.toUpperCase()) {
      case 'HIGH':
      case 'CRITICAL':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30',
          icon: AlertOctagon,
          iconColor: 'text-rose-400',
          titleColor: 'text-rose-300',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30',
          icon: AlertTriangle,
          iconColor: 'text-amber-400',
          titleColor: 'text-amber-300',
        };
      default:
        return {
          bg: 'bg-cyan-500/10 border-cyan-500/30',
          icon: Info,
          iconColor: 'text-cyan-400',
          titleColor: 'text-cyan-300',
        };
    }
  };

  const style = getSeverityStyles();
  const IconComponent = style.icon;

  return (
    <GlassContainer className={`p-3 border ${style.bg} transition-all`}>
      <div className="flex items-start gap-2.5">
        <div
          className={`p-1.5 rounded-lg bg-black/20 ${style.iconColor} shrink-0 mt-0.5`}
        >
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="space-y-0.5 text-xs">
          <h4 className={`font-bold ${style.titleColor}`}>{title}</h4>
          <p className="text-slate-300 leading-relaxed">{description}</p>
        </div>
      </div>
    </GlassContainer>
  );
}
