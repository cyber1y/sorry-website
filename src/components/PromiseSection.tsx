import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config'
import { confettiRain, heartExplosion } from '../lib/effects'

function useElapsed(since: string) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const start = since ? new Date(since).getTime() : NaN
  if (!since || Number.isNaN(start)) return null
  const diff = Math.max(0, now - start)
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    mins: Math.floor(diff / 60_000) % 60,
    secs: Math.floor(diff / 1000) % 60,
  }
}

export default function PromiseSection({ onDone }: { onDone: () => void }) {
  const elapsed = useElapsed(siteConfig.friendSince)
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})
  const [meter, setMeter] = useState(0.08)
  const [infinite, setInfinite] = useState(false)
  const sealedRef = useRef(false)

  const tapMeter = () => {
    if (infinite) return
    setMeter((m) => {
      const next = Math.min(1, m + 0.18)
      if (next >= 1) {
        setInfinite(true)
        heartExplosion()
      }
      return next
    })
  }

  const seal = () => {
    if (sealedRef.current) return
    sealedRef.current = true
    confettiRain(1600)
    setTimeout(onDone, 900)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      className="safe-top safe-bottom relative z-20 flex min-h-dvh flex-col items-center px-5 pt-24 pb-28"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2 text-center font-hand text-3xl text-teal"
      >
        Us, in numbers &amp; promises
      </motion.p>
      <p className="mb-7 text-center font-sans text-sm text-sky/50">
        A little something I made just for us 💛
      </p>

      {elapsed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-strong mb-6 w-full max-w-[340px] p-5 text-center"
        >
          <p className="mb-3 font-sans text-xs uppercase tracking-widest text-sky/60">
            We've been friends for
          </p>
          <div className="flex items-end justify-center gap-2 font-hand text-3xl text-sun">
            <span>{elapsed.days}<span className="ml-1 text-sm text-sky/70">d</span></span>
            <span>{elapsed.hours}<span className="ml-1 text-sm text-sky/70">h</span></span>
            <span>{elapsed.mins}<span className="ml-1 text-sm text-sky/70">m</span></span>
            <span>{elapsed.secs}<span className="ml-1 text-sm text-sky/70">s</span></span>
          </div>
          <p className="mt-3 font-sans text-xs text-sky/50">…and counting 🫂</p>
        </motion.div>
      )}

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.97 }}
        onClick={tapMeter}
        className="glass mb-6 w-full max-w-[340px] p-5 text-left"
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="font-sans text-sm font-semibold text-sky">Friendship level</span>
          <span className="font-hand text-2xl text-sun">{infinite ? '∞' : `${Math.round(meter * 100)}%`}</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-sky/15">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-teal via-sky to-sun"
            animate={{ width: `${meter * 100}%` }}
            transition={{ type: 'spring', damping: 18 }}
          />
        </div>
        <p className="mt-3 text-center font-sans text-xs text-sky/50">
          {infinite ? 'Okay fine… it\'s off the charts 🥹' : 'Tap to fill it up!'}
        </p>
      </motion.button>

      <p className="mb-3 mt-2 text-center font-hand text-2xl text-sky">Secret notes</p>
      <p className="mb-5 text-center font-sans text-xs text-sky/50">Tap each one — they're all true</p>

      <div className="grid w-full max-w-[340px] grid-cols-2 gap-3">
        {siteConfig.secretNotes.map((note, i) => (
          <button
            key={i}
            onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
            className="btn-tap relative h-[150px] w-full"
            style={{ perspective: 800 }}
            aria-label={`Secret note ${i + 1}`}
          >
            <div
              className="preserve-3d h-full w-full"
              style={{
                transform: flipped[i] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1)',
              }}
            >
              <div className="glass backface-hidden absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center">
                <span className="text-3xl">💌</span>
                <span className="font-hand text-xl text-sky">{note.title}</span>
                <span className="font-sans text-[10px] text-sky/40">tap to open</span>
              </div>
              <div
                className="glass rotate-y-180 backface-hidden absolute inset-0 flex items-center justify-center p-3 text-center"
                style={{ background: 'rgba(16, 45, 74, 0.92)' }}
              >
                <p className="font-serif text-[13px] leading-snug text-cream/90">{note.message}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong mt-8 w-full max-w-[340px] p-6 text-center"
      >
        <p className="mb-4 font-hand text-2xl text-teal">{siteConfig.promiseTitle}</p>
        <ul className="mb-5 space-y-2 text-left">
          {siteConfig.promises.slice(0, 4).map((p, i) => (
            <li key={i} className="flex items-start gap-2 font-serif text-sm text-cream/85">
              <span className="text-base">{p.emoji}</span>
              <span>{p.text}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={seal}
          className="btn-tap animate-pulse-glow w-full rounded-xl bg-gradient-to-r from-teal to-sky px-4 py-4 font-sans text-lg font-bold text-white"
        >
          Seal our promise 🤙
        </button>
        <p className="mt-3 font-sans text-xs text-sky/50">{siteConfig.promiseHint}</p>
      </motion.div>
    </motion.div>
  )
}
