import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { siteConfig } from '../config'

export default function TypewriterLetter({ onDone }: { onDone: () => void }) {
  const [displayed, setDisplayed] = useState('')
  const [showDone, setShowDone] = useState(false)
  const fullText = siteConfig.apologyLetter

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i += 2
      setDisplayed(fullText.slice(0, i))
      if (i >= fullText.length) {
        clearInterval(interval)
        setShowDone(true)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [fullText])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      className="safe-top safe-bottom relative z-20 flex min-h-dvh flex-col items-center justify-center px-5"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 font-hand text-3xl text-teal"
      >
        My apology, handwritten 💌
      </motion.p>

      <div className="glass-strong w-full max-w-[340px] p-6">
        <div className="mb-3 flex items-center gap-2 border-b border-sky/20 pb-3">
          <span className="text-sm">💙</span>
          <span className="font-sans text-xs text-sky/60">From the bottom of my heart</span>
        </div>
        <p className="min-h-[260px] font-serif text-[17px] leading-relaxed text-cream/90">
          {displayed}
          <span className="animate-cursor ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-sky" />
        </p>
      </div>

      {showDone && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onDone}
          className="btn-tap animate-pulse-glow mt-8 rounded-full bg-gradient-to-r from-teal to-sky px-8 py-4 font-sans font-bold text-white"
        >
          There's more… 👉
        </motion.button>
      )}
    </motion.div>
  )
}