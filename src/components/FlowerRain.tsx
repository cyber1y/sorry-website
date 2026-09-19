import { useEffect, useRef } from 'react'

interface Petal {
  x: number
  y: number
  rx: number
  ry: number
  rot: number
  rotSpeed: number
  fallSpeed: number
  sway: number
  phase: number
  flip: number
  color: string
  emoji: string | null
}

const PETAL_COLORS = ['#ff9ecb', '#ffb3c6', '#ffc9de', '#e8a5d9', '#f9d5e5', '#ff8fb3']
const FLOWERS = ['🌸', '🌷', '🌼', '💮']

export default function FlowerRain({ intensity = 1 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let items: Petal[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const createItem = (w: number, h: number, fromTop = false): Petal => {
      const flowerChance = 0.18
      const isFlower = Math.random() < flowerChance
      return {
        x: Math.random() * w,
        y: fromTop ? -30 - Math.random() * 60 : Math.random() * h,
        rx: Math.random() * 4 + 4,
        ry: Math.random() * 3 + 2.4,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        fallSpeed: Math.random() * 0.55 + 0.35,
        sway: Math.random() * 0.9 + 0.5,
        phase: Math.random() * Math.PI * 2,
        flip: Math.random() < 0.5 ? 1 : -1,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        emoji: isFlower ? FLOWERS[Math.floor(Math.random() * FLOWERS.length)] : null,
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const width = window.innerWidth
      const height = window.innerHeight
      const count = Math.min(30, Math.floor((width * height) / 52000 * intensity))
      items = Array.from({ length: count }, () => createItem(width, height))
    }

    let t = 0
    const draw = () => {
      t += 0.016
      const width = window.innerWidth
      const height = window.innerHeight
      ctx.clearRect(0, 0, width, height)

      for (const p of items) {
        p.y += p.fallSpeed * 1.1
        p.x += Math.sin(t + p.phase) * p.sway * 0.65
        p.rot += p.rotSpeed
        p.flip *= 1 + (Math.random() - 0.5) * 0.04
        if (p.y > height + 40) {
          Object.assign(p, createItem(width, height, true))
        }
        if (p.x < -40) p.x = width + 30
        if (p.x > width + 40) p.x = -30

        ctx.save()
        ctx.globalAlpha = 0.82
        if (p.emoji) {
          ctx.font = `${Math.round(p.ry * 2.4)}px serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.translate(p.x, p.y)
          ctx.rotate(Math.sin(t * 0.8 + p.phase) * 0.35)
          ctx.fillText(p.emoji, 0, 0)
        } else {
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          ctx.scale(1, p.flip)
          ctx.beginPath()
          ctx.ellipse(0, 0, p.rx, p.ry, 0, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
          ctx.beginPath()
          ctx.ellipse(0, 0, p.rx * 0.45, p.ry * 0.5, 0, 0, Math.PI * 2)
          ctx.globalAlpha = 0.3
          ctx.fillStyle = '#ffffff'
          ctx.fill()
        }
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
      className="pointer-events-none fixed inset-0 z-[3]"
      style={{ width: '100vw', height: '100dvh' }}
      aria-hidden
    />
  )
}