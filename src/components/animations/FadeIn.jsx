import { motion } from 'framer-motion';

/**
 * Professional Minimal FadeIn Component (150ms subtle opacity transition)
 */
export default function FadeIn({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
