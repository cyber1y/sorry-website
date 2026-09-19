import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { siteConfig } from '../config'
import { heartExplosion } from '../lib/effects'

export default function EnvelopeScreen({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false)
  const openedRef = useRef(false)

  const handleOpen = () => {
    if (openedRef.current) return
    openedRef.current = true
    setOpened(true)
    heartExplosion()
    setTimeout(onOpen, 1100)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      className="safe-top safe-bottom relative z-20 flex min-h-dvh flex-col items-center justify-center px-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center font-serif text-2xl text-sky/90"
      >
        This is for you,
        <br />
        <span className="font-hand text-3xl text-teal">{siteConfig.friendName}</span> 💌
      </motion.h2>

      <motion.button
        onClick={handleOpen}
        className="relative block w-[280px] outline-none"
        whileTap={{ scale: 0.96 }}
        style={{ perspective: 800 }}
        aria-label="Open the letter"
      >
        <div className="glass relative h-[180px] w-full overflow-hidden rounded-2xl px-6 text-left shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="rotate-[-6deg] font-hand text-3xl text-sky/50">
              To my best friend…
            </p>
          </div>
        </div>

        <AnimatePresence>
          {!opened ? (
            <motion.div
              key="seal"
              className="absolute left-1/2 top-1/2 z-10"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              exit={{ scale: 2, opacity: 0, rotate: 20 }}
            >
              <div className="animate-pulse-glow flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #2ec4b6, #0f766e)',
                  boxShadow: '0 0 30px rgba(46, 196, 182, 0.6)',
                }}
              >
                <span className="text-4xl">🤝</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              className="absolute inset-0 z-20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-6xl">🫂</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 text-center font-sans text-sm text-sky/50"
      >
        {opened ? 'Opening…' : 'Tap the seal to open it'}
      </motion.p>
    </motion.div>
  )
}