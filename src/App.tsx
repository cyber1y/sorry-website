import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import ApologyQuestion from './components/ApologyQuestion'
import CelebrationScreen from './components/CelebrationScreen'
import EnvelopeScreen from './components/EnvelopeScreen'
import FloatingHearts from './components/FloatingHearts'
import FlowerRain from './components/FlowerRain'
import FlowerTree from './components/FlowerTree'
import Mascot, { type MascotId } from './components/Mascot'
import MusicPlayer from './components/MusicPlayer'
import Navbar from './components/Navbar'
import ParticleBackground from './components/ParticleBackground'
import PhotoGallery from './components/PhotoGallery'
import PromiseSection from './components/PromiseSection'
import ReasonsCarousel from './components/ReasonsCarousel'
import ScrollButtons from './components/ScrollButtons'
import TypewriterLetter from './components/TypewriterLetter'
import WelcomeScreen from './components/WelcomeScreen'
import { rainbowBurst } from './lib/effects'

type Stage = 'welcome' | 'envelope' | 'question' | 'letter' | 'reasons' | 'promise' | 'gallery' | 'celebration'

const STAGE_ORDER: Stage[] = [
  'welcome',
  'envelope',
  'question',
  'letter',
  'reasons',
  'promise',
  'gallery',
  'celebration',
]

const STAGE_TITLES: Record<Stage, string> = {
  welcome: 'For you',
  envelope: 'For you',
  question: 'One question…',
  letter: 'My apology',
  reasons: 'From my heart',
  promise: 'Our friendship',
  gallery: 'Our memories',
  celebration: 'Friends forever',
}

const COMPANION: Partial<Record<Stage, { id: MascotId; message: string; variant: 'bob' | 'hop' | 'wiggle' }>> = {
  welcome: { id: 'bunny', message: 'psst… this is for you 💌', variant: 'hop' },
  question: { id: 'bear', message: 'be gentle with their heart 🙈', variant: 'bob' },
  promise: { id: 'fox', message: 'I pinky promise! 🤙', variant: 'bob' },
  celebration: { id: 'koala', message: 'BEST FRIENDS FOREVER!!! 🎉', variant: 'hop' },
}

function stageFromUrl(): Stage {
  const param = new URLSearchParams(window.location.search).get('stage')
  if (param && (STAGE_ORDER as string[]).includes(param)) return param as Stage
  return 'welcome'
}

export default function App() {
  const [stage, setStage] = useState<Stage>(stageFromUrl)
  const [intensity, setIntensity] = useState(stage === 'celebration' ? 1.8 : 1)
  const [noCount, setNoCount] = useState(0)
  const downRef = useRef<{ x: number; y: number; t: number } | null>(null)

  const goNext = () => {
    const idx = STAGE_ORDER.indexOf(stage)
    const next = STAGE_ORDER[Math.min(idx + 1, STAGE_ORDER.length - 1)]
    setStage(next)
    window.scrollTo({ top: 0, behavior: 'auto' })
    if (next === 'celebration') setIntensity(1.8)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    downRef.current = { x: e.clientX, y: e.clientY, t: Date.now() }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    const down = downRef.current
    downRef.current = null
    if (!down) return
    const dx = e.clientX - down.x
    const dy = e.clientY - down.y
    const dt = Date.now() - down.t
    if (Math.hypot(dx, dy) < 14 && dt < 650) {
      rainbowBurst(e.clientX / window.innerWidth, e.clientY / window.innerHeight, 16)
    }
  }

  const companion = COMPANION[stage]

  return (
    <div
      className="relative min-h-dvh bg-bg-deep"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div
        className="gradient-animated fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, #12314f 0%, transparent 55%), radial-gradient(ellipse at 80% 40%, #0f3b47 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, #1e3a5f 0%, transparent 55%), #0b1b2b',
        }}
      />
      <div
        className="hue-cycle fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 15% 85%, rgba(255,158,203,0.10) 0%, transparent 45%), radial-gradient(ellipse at 85% 15%, rgba(199,155,255,0.10) 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, rgba(46,196,182,0.06) 0%, transparent 55%)',
        }}
      />
      <ParticleBackground />
      <FlowerTree />
      <FlowerRain intensity={intensity} />
      <FloatingHearts intensity={intensity} />

      {stage !== 'welcome' && <Navbar title={STAGE_TITLES[stage]} />}

      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          {stage === 'welcome' && <WelcomeScreen onContinue={goNext} />}
          {stage === 'envelope' && <EnvelopeScreen onOpen={goNext} />}
          {stage === 'question' && (
            <ApologyQuestion onForgiven={goNext} onDodge={(n) => setNoCount(n)} />
          )}
          {stage === 'letter' && <TypewriterLetter onDone={goNext} />}
          {stage === 'reasons' && <ReasonsCarousel onDone={goNext} />}
          {stage === 'promise' && <PromiseSection onDone={goNext} />}
          {stage === 'gallery' && <PhotoGallery onDone={goNext} />}
          {stage === 'celebration' && <CelebrationScreen noCount={noCount} />}
        </motion.div>
      </AnimatePresence>

      {companion && (
        <div className="pointer-events-none fixed right-4 bottom-16 z-30">
          <Mascot
            id={companion.id}
            message={companion.message}
            variant={companion.variant}
            size="sm"
          />
        </div>
      )}

      <ScrollButtons />
      <MusicPlayer />
    </div>
  )
}