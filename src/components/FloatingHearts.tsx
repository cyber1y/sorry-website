import { useEffect, useRef } from 'react'

interface FloatingItem {
  x: number
  y: number
  size: number
  speed: number
  wobble: number
  phase: number
  type: 'friendship' | 'star' | 'fun'
  emoji: string
}

const EMOJIS = {
  friendship: ['🤝', '🫂', '💛', '💙', '💚', '🫶'],
  star: ['✨', '⭐', '🌟', '💫', '🌈'],
  fun: ['🎈', '🎉', '🍀', '☀️', '🧩'],
}

export default function FloatingHearts({ intensity = 1 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let items: FloatingItem[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const width = window.innerWidth
      const height = window.innerHeight
      const count = Math.min(28, Math.floor((width * height) / 32000 * intensity))
      items = Array.from({ length: count }, () => createItem(width, height))
    }

    function createItem(w: number, h: number): FloatingItem {
      const type = (['friendship', 'star', 'fun'] as const)[Math.floor(Math.random() * 3)]
      const emojis = EMOJIS[type]
      return {
        x: Math.random() * w,
        y: Math.random() * (h + 120),
        size: Math.random() * 14 + 10,
        speed: Math.random() * 0.14 + 0.05,
        wobble: Math.random() * 0.5 + 0.15,
        phase: Math.random() * Math.PI * 2,
        type,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }
    }

    let t = 0
    // Pacing: aimless, calm drift most of the time, with an occasional gust
    // that makes things briefly livelier, then settles back down.
    let gust = 0
    let nextGust = 6000 + Math.random() * 14000

    const draw = () => {
      t += 0.0035
      const width = window.innerWidth
      const height = window.innerHeight
      ctx.clearRect(0, 0, width, height)

      // decay the gust; every so often a gust of wind picks up
      gust = Math.max(0, gust - 0.012)
      nextGust -= 16.7
      if (nextGust <= 0) {
        gust = 1
        nextGust = 7000 + Math.random() * 16000
      }
      const pace = 0.4 + gust * 2

      for (const item of items) {
        item.y -= item.speed * pace
        item.x += Math.sin(t + item.phase) * item.wobble * pace * 0.4

        if (item.y < -60) {
          item.y = height + 30
          item.x = Math.random() * width
        }

        ctx.save()
        ctx.globalAlpha = 0.65
        ctx.font = `${Math.round(item.size)}px serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(item.emoji, item.x, item.y)
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [intensity])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      style={{ width: '100vw', height: '100dvh' }}
      aria-hidden
    />
  )
}