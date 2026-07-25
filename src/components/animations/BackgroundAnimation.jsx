import { motion } from 'framer-motion';

/**
 * Reusable Cyber Background Animation Component
 * Renders floating glowing particles, dark radial gradients, and animated cyber grid lines
 */
export default function BackgroundAnimation() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 8) + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-guard-bg">
      {/* Radial Gradient Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px]" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/15 rounded-full blur-[128px]" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />

      {/* Subtle Cyber Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Floating Glowing Cyber Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-guard-cyan/40 shadow-glow"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: ['0%', '-20%', '0%'],
            x: ['0%', '10%', '0%'],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
