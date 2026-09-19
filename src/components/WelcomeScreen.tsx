import { motion } from 'framer-motion'
import { siteConfig } from '../config'

export default function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  const handleTap = () => {
    onContinue()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      className="safe-top safe-bottom relative z-20 flex min-h-dvh flex-col items-center justify-center px-6"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 0.2 }}
        className="animate-heartbeat mb-8"
      >
        <span className="text-7xl">🥺</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-glow mb-4 text-center font-hand text-5xl font-bold text-teal"
        style={{ textShadow: '0 0 30px rgba(46, 196, 182, 0.7)' }}
      >
        {siteConfig.welcomeTitle}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7 }}
        className="mb-14 max-w-[300px] text-center font-serif text-lg text-sky/80"
      >
        {siteConfig.welcomeSubtitle}
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={handleTap}
        className="btn-tap glass animate-pulse-glow rounded-full px-8 py-4 font-sans text-base font-semibold text-sky hover:bg-white/10"
      >
        {siteConfig.scrollHint}
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="ml-2 inline-block"
        >
          ↓
        </motion.span>
      </motion.button>
    </motion.div>
  )
}