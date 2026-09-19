import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config'
import { heartExplosion } from '../lib/effects'

type Spot = { top: number; left: number }

const PAD = 12

export default function ApologyQuestion({
  onForgiven,
  onDodge,
}: {
  onForgiven: () => void
  onDodge?: (count: number) => void
}) {
  const [noCount, setNoCount] = useState(0)
  const [noPos, setNoPos] = useState<Spot>({ top: 275, left: PAD })
  const [yesScale, setYesScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const noBtnRef = useRef<HTMLButtonElement>(null)
  const dodgingRef = useRef(false)
  const answeredRef = useRef(false)
  const noRef = useRef(0)

  const noText = siteConfig.noTexts[Math.min(noCount, siteConfig.noTexts.length - 1)]

  const clamp = useCallback((c: HTMLDivElement, b: HTMLButtonElement) => {
    const pad = PAD
    const maxTop = Math.max(pad, c.clientHeight - b.offsetHeight - pad)
    const maxLeft = Math.max(pad, c.clientWidth - b.offsetWidth - pad)
    setNoPos((p) => {
      const top = Math.min(p.top, maxTop)
      const left = Math.min(Math.max(p.left, pad), maxLeft)
      return top === p.top && left === p.left ? p : { top, left }
    })
  }, [])

  // Keep the button inside the container even when the label grows taller,
  // so it can never drift outside the stage.
  useEffect(() => {
    const c = containerRef.current
    const b = noBtnRef.current
    if (c && b) clamp(c, b)
  }, [noText, clamp])

  const dodge = useCallback(
    (e: React.PointerEvent | React.TouchEvent) => {
      if (dodgingRef.current) return
      dodgingRef.current = true

      const pointerX =
        'touches' in e ? e.touches[0]?.clientX ?? 0 : 'clientX' in e ? e.clientX : 0
      const pointerY =
        'touches' in e ? e.touches[0]?.clientY ?? 0 : 'clientY' in e ? e.clientY : 0

      const c = containerRef.current
      const b = noBtnRef.current
      if (!c || !b) return

      const cr = c.getBoundingClientRect()
      const ch = c.clientHeight
      const cw = c.clientWidth
      const bh = b.offsetHeight
      const bw = b.offsetWidth
      const pad = PAD
      const maxLeft = Math.max(pad, cw - bw - pad)
      const maxTop = Math.max(pad, ch - bh - pad)

      // The Yes button grows as the user dodges, so reserve a generous centred
      // zone. The No button ONLY ever spawns fully above or below it, which
      // makes overlap physically impossible at any scale.
      const zoneH = 150
      const zoneTop = ch / 2 - zoneH / 2
      const zoneBottom = ch / 2 + zoneH / 2
      const gap = 10
      const topMax = Math.max(pad, zoneTop - bh - gap)
      const bottomMin = zoneBottom + gap
      const topOK = topMax >= pad
      const bottomOK = bottomMin <= maxTop

      let bandMin = pad
      let bandMax = maxTop
      if (pointerY < cr.top + ch / 2) {
        if (bottomOK) {
          bandMin = bottomMin
          bandMax = maxTop
        } else if (topOK) {
          bandMin = pad
          bandMax = topMax
        }
      } else {
        if (topOK) {
          bandMin = pad
          bandMax = topMax
        } else if (bottomOK) {
          bandMin = bottomMin
          bandMax = maxTop
        }
      }
      if (bandMin > bandMax) return

      const candidates: Spot[] = []
      for (let i = 0; i < 18; i++) {
        candidates.push({
          left: pad + Math.random() * Math.max(1, maxLeft - pad),
          top: bandMin + Math.random() * Math.max(1, bandMax - bandMin),
        })
      }
      const valid = candidates.filter(({ left, top }) => {
        const vx = cr.left + left + bw / 2
        const vy = cr.top + top + bh / 2
        return Math.hypot(vx - pointerX, vy - pointerY) >= 95
      })
      const spot = (valid.length ? valid : candidates)[Math.floor(Math.random() * (valid.length || 1))]

      setNoPos({ top: Math.min(Math.max(spot.top, pad), maxTop), left: spot.left })
      noRef.current += 1
      const next = noRef.current
      setNoCount(next)
      onDodge?.(next)
      setYesScale((s) => Math.min(1.45, s + 0.05))
      setTimeout(() => {
        dodgingRef.current = false
      }, 150)
    },
    [onDodge],
  )

  const handleYes = (e: React.PointerEvent | React.TouchEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (answeredRef.current) return
    answeredRef.current = true
    heartExplosion()
    onForgiven()
  }

  const yesFont = Math.min(1.3, 1.15 + (yesScale - 1))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      className="safe-top safe-bottom relative z-20 flex min-h-dvh flex-col items-center justify-center px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 10, delay: 0.2 }}
        className="animate-heartbeat mb-6"
      >
        <span className="text-6xl">🥺</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-glow mb-2 text-center font-hand text-4xl font-bold text-sky"
      >
        {siteConfig.question}
      </motion.h2>

      <p className="mb-10 text-center font-sans text-sm text-sky/50">
        I'll understand… but I hope you say yes 🙈
      </p>

      <div
        ref={containerRef}
        className="relative w-full max-w-[340px]"
        style={{ height: 340 }}
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: yesScale, opacity: 1 }}
          transition={{ type: 'spring', damping: 14 }}
          className="glass absolute top-1/2 left-1/2 z-20 w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-4 text-center"
        >
          <button
            onPointerDown={handleYes}
            onTouchStart={(e) => {
              handleYes(e)
            }}
            className="btn-tap animate-pulse-glow w-full rounded-xl bg-gradient-to-r from-teal to-sky px-4 py-5 font-sans text-lg font-bold text-white"
            style={{ fontSize: `${yesFont * 16}px` }}
          >
            {siteConfig.yesText}
          </button>
        </motion.div>

        <motion.button
          ref={noBtnRef}
          onPointerDown={dodge}
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') dodge(e)
          }}
          onTouchStart={(e) => {
            dodge(e)
          }}
          animate={{ rotate: noCount % 2 === 0 ? 6 : -6 }}
          transition={{ type: 'spring', stiffness: 400, damping: 14 }}
          className="absolute z-30 rounded-xl border border-sky/40 bg-sky/15 px-4 py-3 font-sans text-sm font-medium whitespace-nowrap text-sky backdrop-blur-sm"
          style={{ top: noPos.top, left: noPos.left, maxWidth: 230, touchAction: 'none' }}
        >
          {noText}
        </motion.button>
      </div>

      {noCount > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center font-serif text-sm italic text-sky/40"
        >
          {noCount === 1
            ? 'The No button has nowhere to run… 😏'
            : `Tried to say no ${noCount} times. Cute, but no. 🙈`}
        </motion.p>
      )}
    </motion.div>
  )
}