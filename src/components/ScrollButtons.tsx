import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function ScrollButtons() {
  const [canUp, setCanUp] = useState(false)
  const [canDown, setCanDown] = useState(false)

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY
      const viewport = window.innerHeight
      const total = document.documentElement.scrollHeight
      setCanUp(scrollY > 8)
      setCanDown(scrollY + viewport < total - 8)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const id = setInterval(update, 600)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      clearInterval(id)
    }
  }, [])

  const scrollBy = (dir: 1 | -1) => {
    const start = window.scrollY
    const target = start + dir * window.innerHeight * 0.7
    const duration = 380
    const t0 = performance.now()
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      window.scrollTo(0, start + (target - start) * eased)
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  if (!canUp && !canDown) return null

  return (
    <div
      className="fixed right-3 z-40 flex flex-col gap-2"
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    >
      <button
        onClick={() => scrollBy(-1)}
        disabled={!canUp}
        aria-label="Scroll up"
        className="glass flex h-11 w-11 items-center justify-center rounded-full transition-opacity disabled:opacity-25"
      >
        <ChevronUp className="text-sky" size={20} />
      </button>
      <button
        onClick={() => scrollBy(1)}
        disabled={!canDown}
        aria-label="Scroll down"
        className="glass flex h-11 w-11 items-center justify-center rounded-full transition-opacity disabled:opacity-25"
      >
        <ChevronDown className="text-sky" size={20} />
      </button>
    </div>
  )
}
