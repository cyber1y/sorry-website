import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config'
import { fireworkShow, rainbowBurst } from '../lib/effects'

export default function CelebrationScreen({ noCount = 0 }: { noCount?: number }) {
  const [celebrated, setCelebrated] = useState(false)
  const [progress, setProgress] = useState(0)
  const holdingRef = useRef<{ timer: number; raf: number } | null>(null)
  const celebratedRef = useRef(false)

  useEffect(() => {
    if (celebrated && !celebratedRef.current) {
      celebratedRef.current = true
      fireworkShow(6000)
      rainbowBurst(0.5, 0.5, 80)
      if (noCount > 0) {
        setTimeout(() => rainbowBurst(0.5, 0.3, 60), 700)
      }
    }
  }, [celebrated, noCount])

  const startHold = () => {
    if (celebrated) return
    const start = Date.now()
    const duration = 1500
    let raf = 0

    const update = () => {
      const elapsed = Date.now() - start
      const p = Math.min(1, elapsed / duration)
      setProgress(p)
      if (p >= 1) {
        setCelebrated(true)
        cancelAnimationFrame(raf)
        return
      }
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    holdingRef.current = {
      timer: window.setTimeout(() => setCelebrated(true), duration),
      raf,
    }
  }

  const cancelHold = () => {
    if (holdingRef.current) {
      clearTimeout(holdingRef.current.timer)
      cancelAnimationFrame(holdingRef.current.raf)
      holdingRef.current = null
    }
    setProgress(0)
  }

  const share = (network: 'wa' | 'ig' | 'copy') => {
    const text = encodeURIComponent(
      `${siteConfig.yourName} says sorry to ${siteConfig.friendName} — and they made up! 🤝`,
    )
    const url = window.location.href
    if (network === 'wa') {
      window.open(`https://wa.me/?text=${text}%20${encodeURIComponent(url)}`, '_blank')
    } else if (network === 'ig') {
      window.open(`https://www.instagram.com/`, '_blank')
    } else {
      navigator.clipboard?.writeText(url)
    }
  }

  const cycle = (n: number) => `${n}`.padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      className="safe-top safe-bottom relative z-20 flex min-h-dvh flex-col items-center justify-center px-6 text-center"
    >
      {!celebrated ? (
        <>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 font-hand text-3xl text-teal"
          >
            One last promise…
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12 font-serif text-lg text-sky/80"
          >
            {siteConfig.celebrationText}
          </motion.p>

          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, delay: 0.4 }}
            onPointerDown={startHold}
            onPointerUp={cancelHold}
            onPointerLeave={cancelHold}
            onTouchStart={() => startHold()}
            onTouchEnd={cancelHold}
            aria-label="Press and hold to forgive"
            className="relative"
            style={{ touchAction: 'none' }}
          >
            <span className="ring-rainbow absolute -inset-3 rounded-full opacity-60 blur-sm" />
            <span className="absolute -inset-3 rounded-full border-2 border-sky/40" />
            <span
              className={`relative flex h-44 w-44 items-center justify-center rounded-full ${
                progress > 0 ? 'animate-pulse-glow' : ''
              }`}
              style={{
                background: 'radial-gradient(circle at 35% 35%, #2ec4b6, #0f766e)',
                boxShadow: '0 0 60px rgba(46, 196, 182, 0.5)',
              }}
            >
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 160 160">
              <motion.circle
                cx="80"
                cy="80"
                r="72"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="6"
              />
              <circle
                cx="80"
                cy="80"
                r="72"
                fill="none"
                stroke="#ffd166"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 72}
                strokeDashoffset={2 * Math.PI * 72 * (1 - progress)}
              />
            </svg>
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-6xl"
            >
              🫂
            </motion.span>
            </span>
          </motion.button>

          <p className="mt-8 font-sans text-sm text-sky/50">
            {progress > 0
              ? `Almost there… ${cycle(Math.floor(progress * 100))}%`
              : 'Press & hold to forgive me'}
          </p>
        </>
      ) : (
        <>
          <motion.h1
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 10 }}
            className="text-rainbow mb-3 font-hand text-5xl font-bold"
            style={{ filter: 'drop-shadow(0 0 22px rgba(255, 215, 0, 0.45))' }}
          >
            You said yes!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 max-w-[300px] font-serif text-lg leading-relaxed text-sky/90"
          >
            I promise to be better. You mean the world to me — today, tomorrow,
            forever. 🥹
          </motion.p>

          <motion.div
            initial={{ rotate: -4, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, type: 'spring', damping: 14 }}
            className="glass-strong w-[300px] p-6 text-center"
            style={{ aspectRatio: '3 / 4' }}
          >
            <p className="font-hand text-2xl text-teal">Sorry &amp; Best Friends Again</p>
            <div className="my-4 text-4xl">🤝💛🌈</div>
            <p className="font-sans text-sm text-sky">from</p>
            <p className="font-hand text-2xl text-sun">{siteConfig.yourName}</p>
            <p className="font-sans text-sm text-sky">to</p>
            <p className="font-hand text-2xl text-sky">{siteConfig.friendName}</p>
            {noCount > 0 && (
              <p className="mt-2 font-sans text-[11px] text-coral/90">
                Tried to say no {noCount}{' '}
                {noCount === 1 ? 'time' : 'times'} before giving in 😏
              </p>
            )}
            <p className="mt-3 font-sans text-xs text-sky/50">{siteConfig.celebrationDate}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 flex items-center gap-3"
          >
            <button
              onClick={() => share('wa')}
              className="btn-tap glass rounded-full px-4 py-3 text-lg"
              title="Share on WhatsApp"
            >
              💬
            </button>
            <button
              onClick={() => share('ig')}
              className="btn-tap glass rounded-full px-4 py-3 text-lg"
              title="Share on Instagram"
            >
              📸
            </button>
            <button
              onClick={() => share('copy')}
              className="btn-tap glass rounded-full px-4 py-3 text-lg"
              title="Copy link"
            >
              🔗
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-6 font-sans text-xs text-sky/40"
          >
            {siteConfig.footerNote} · made with 💗
          </motion.p>
        </>
      )}
    </motion.div>
  )
}