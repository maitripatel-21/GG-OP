import GlassContainer from './GlassContainer';

/**
 * Reusable Professional Loading Skeleton Component
 */
export default function LoadingSkeleton({ type = 'card' }) {
  if (type === 'score') {
    return (
      <GlassContainer className="p-6 flex flex-col items-center justify-center space-y-3 animate-pulse">
        <div className="w-28 h-28 rounded-full border-4 border-white/10 bg-white/5 flex items-center justify-center">
          <div className="w-16 h-8 bg-white/10 rounded-lg" />
        </div>
        <div className="w-32 h-4 bg-white/10 rounded-full" />
        <div className="w-48 h-3 bg-white/5 rounded-full" />
      </GlassContainer>
    );
  }

  return (
    <GlassContainer className="p-4 space-y-3 animate-pulse">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/10" />
          <div className="space-y-1">
            <div className="w-24 h-3 bg-white/10 rounded-full" />
            <div className="w-32 h-4 bg-white/15 rounded-full" />
          </div>
        </div>
        <div className="w-16 h-6 rounded-full bg-white/10" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="h-12 rounded-xl bg-white/5" />
        <div className="h-12 rounded-xl bg-white/5" />
      </div>
    </GlassContainer>
  );
}
