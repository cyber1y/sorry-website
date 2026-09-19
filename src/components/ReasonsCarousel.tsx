import { motion } from 'framer-motion'
import { useState } from 'react'
import { siteConfig } from '../config'

export default function ReasonsCarousel({ onDone }: { onDone: () => void }) {
  const [active, setActive] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const reasons = siteConfig.reasons

  const goNext = () => {
    const next = active + 1
    if (next >= reasons.length) {
      onDone()
      return
    }
    setFlipped(false)
    setActive(next)
  }

  const goPrev = () => {
    if (active === 0) return
    setFlipped(false)
    setActive(active - 1)
  }

  const current = reasons[active]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      className="safe-top safe-bottom relative z-20 flex min-h-dvh flex-col items-center justify-center px-6"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2 text-center font-hand text-3xl text-teal"
      >
        Reasons I'm sorry
      </motion.p>
      <p className="mb-8 text-center font-sans text-sm text-sky/50">
        Tap a card to reveal it
      </p>

      <div className="perspective flat w-full max-w-[300px]">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative h-[280px] w-full"
          style={{ perspective: 1000 }}
          onClick={() => setFlipped((f) => !f)}
        >
          <div
            className="preserve-3d h-full w-full"
            style={{
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)',
            }}
          >
            <div className="glass-strong backface-hidden absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <span className="animate-float-slow mb-4 text-6xl">{current.emoji}</span>
              <h3 className="font-hand text-2xl text-sky">{current.title}</h3>
              <p className="mt-3 font-sans text-xs text-sky/40">Tap to reveal</p>
            </div>

            <div
              className="glass-strong rotate-y-180 backface-hidden absolute inset-0 flex items-center justify-center p-6 text-center"
              style={{ background: 'rgba(16, 45, 74, 0.85)' }}
            >
              <p className="font-serif text-lg leading-relaxed text-cream/90">
                {current.message}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 flex w-full max-w-[300px] items-center justify-between">
        <button
          onClick={goPrev}
          disabled={active === 0}
          className="btn-tap glass rounded-full px-5 py-3 text-sky disabled:opacity-30"
        >
          ←
        </button>

        <div className="flex gap-1.5">
          {reasons.map((_r, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-6 bg-teal' : 'w-1.5 bg-sky/30'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          className={`btn-tap ${
            active === reasons.length - 1
              ? 'animate-pulse-glow rounded-full bg-gradient-to-r from-teal to-sky px-5 py-3 font-sans font-bold text-white'
              : 'glass rounded-full px-5 py-3 text-sky'
          }`}
        >
          {active === reasons.length - 1 ? 'Keep going 💖' : '→'}
        </button>
      </div>
    </motion.div>
  )
}