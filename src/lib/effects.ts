import confetti from 'canvas-confetti'

const FRIENDSHIP_COLORS = ['#2ec4b6', '#4cc9f0', '#ffd166', '#ff7b54', '#9b5de5', '#eef7ff', '#a7f3d0']

export const RAINBOW_COLORS = [
  '#ff5d8f',
  '#ff8a5c',
  '#ffd166',
  '#2ec4b6',
  '#4cc9f0',
  '#9b5de5',
  '#ff9ecb',
]

export const PETAL_COLORS = ['#ff9ecb', '#ffb3c6', '#ffc9de', '#e8a5d9', '#f9d5e5', '#ff8fb3']

export function burstHearts(x?: number, y?: number) {
  const origin = x !== undefined && y !== undefined ? { x, y } : undefined
  confetti({
    particleCount: 60,
    spread: 90,
    startVelocity: 35,
    scalar: 1.6,
    origin: origin ?? { x: 0.5, y: 0.6 },
    colors: ['#2ec4b6', '#4cc9f0', '#ffd166'],
    shapes: ['circle'],
  })
}

export function heartExplosion() {
  const defaults = {
    spread: 360,
    ticks: 120,
    gravity: 0.4,
    decay: 0.94,
    startVelocity: 32,
    colors: ['#2ec4b6', '#4cc9f0', '#ffd166', '#ff7b54'],
  }
  confetti({
    ...defaults,
    particleCount: 80,
    scalar: 2,
    shapes: ['circle'],
  })
  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ['star'],
    origin: { x: 0.3, y: 0.4 },
  })
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star'],
      origin: { x: 0.7, y: 0.4 },
    })
  }, 200)
}

export function launchFirework() {
  const duration = 1400
  const animationEnd = Date.now() + duration

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()
    if (timeLeft <= 0) {
      clearInterval(interval)
      return
    }
    confetti({
      particleCount: 24,
      startVelocity: 34,
      spread: 320,
      ticks: 70,
      origin: {
        x: 0.2 + Math.random() * 0.6,
        y: Math.random() * 0.4,
      },
      colors: FRIENDSHIP_COLORS,
      shapes: ['circle', 'star'],
    })
  }, 460)
}

export function fireworkShow(durationMs = 4000) {
  launchFirework()
  setTimeout(launchFirework, 2000)
  setTimeout(launchFirework, 4200)
  setTimeout(() => {
    confetti({
      particleCount: 110,
      spread: 110,
      startVelocity: 36,
      origin: { x: 0.5, y: 0.7 },
      colors: FRIENDSHIP_COLORS,
      scalar: 1.3,
    })
  }, Math.min(durationMs - 800, 6000))
}

export function confettiRain(durationMs = 2000) {
  const end = Date.now() + durationMs
  const colors = FRIENDSHIP_COLORS
  ;(function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 60,
      startVelocity: 55,
      origin: { x: 0, y: 0.8 },
      colors,
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 60,
      startVelocity: 55,
      origin: { x: 1, y: 0.8 },
      colors,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

export function tapSparkle(x: number, y: number) {
  confetti({
    particleCount: 20,
    spread: 60,
    startVelocity: 20,
    scalar: 0.8,
    origin: { x, y },
    colors: ['#ffd166', '#4cc9f0', '#2ec4b6'],
    shapes: ['circle'],
  })
}

export function rainbowBurst(x?: number, y?: number, count = 42) {
  confetti({
    particleCount: count,
    spread: 360,
    startVelocity: 26,
    scalar: 0.9,
    origin: { x: x ?? 0.5, y: y ?? 0.6 },
    colors: RAINBOW_COLORS,
    shapes: ['circle', 'square'],
    ticks: 150,
    gravity: 0.5,
    decay: 0.93,
  })
}

export function flowerBurst(x?: number, y?: number, count = 26) {
  confetti({
    particleCount: count,
    spread: 130,
    startVelocity: 17,
    scalar: 1.25,
    origin: { x: x ?? 0.5, y: y ?? 0.5 },
    colors: PETAL_COLORS,
    shapes: ['circle'],
    ticks: 110,
    gravity: 0.35,
    decay: 0.94,
  })
}

export { FRIENDSHIP_COLORS }