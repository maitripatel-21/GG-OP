import { motion } from 'framer-motion';

/**
 * Reusable animation container for smooth fade and slide transitions
 */
export default function FadeIn({ children, delay = 0, duration = 0.3, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
