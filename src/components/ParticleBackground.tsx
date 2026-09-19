import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  r: number
  speed: number
  drift: number
  alpha: number
  phase: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let particles: Particle[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const width = window.innerWidth
      const height = window.innerHeight
      const count = Math.min(50, Math.floor((width * height) / 24000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.6,
        speed: Math.random() * 0.1 + 0.03,
        drift: Math.random() * 0.3 - 0.15,
        alpha: Math.random() * 0.4 + 0.15,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    let t = 0
    let gust = 0
    let nextGust = 8000 + Math.random() * 18000

    const draw = () => {
      t += 0.004
      const width = window.innerWidth
      const height = window.innerHeight
      ctx.clearRect(0, 0, width, height)

      // slow "breathing" pulse — stars barely move most of the time,
      // occasionally drifting a little faster before settling again
      gust = Math.max(0, gust - 0.01)
      nextGust -= 16.7
      if (nextGust <= 0) {
        gust = 1
        nextGust = 9000 + Math.random() * 20000
      }
      const pace = 0.4 + gust * 1.8
      const glow = 0.35 + 0.3 * Math.sin(t * 0.35) + gust * 0.25

      for (const p of particles) {
        p.y -= p.speed * pace
        p.x += p.drift * pace + Math.sin(t + p.phase) * 0.1
        if (p.y < -5) {
          p.y = height + 5
          p.x = Math.random() * width
        }
        if (p.x < -5) p.x = width + 5
        if (p.x > width + 5) p.x = -5
        const twinkle = 0.5 + 0.5 * Math.sin(t + p.phase)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(76, 201, 240, ${p.alpha * twinkle * Math.min(1, glow)})`
        ctx.shadowColor = 'rgba(46, 196, 182, 0.7)'
        ctx.shadowBlur = 7
        ctx.fill()
        ctx.shadowBlur = 0
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
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ width: '100vw', height: '100dvh' }}
      aria-hidden
    />
  )
}