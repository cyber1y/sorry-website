import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const ARPEGGIO = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63]
const BASS = [130.81, 196.0, 174.61, 146.83]

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<number>(null)
  const stepRef = useRef(0)
  const masterRef = useRef<GainNode | null>(null)

  const playNote = (freq: number, time: number, dur: number, vol: number) => {
    const ctx = ctxRef.current
    if (!ctx || !masterRef.current) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0, time)
    gain.gain.linearRampToValueAtTime(vol, time + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur)
    osc.connect(gain)
    gain.connect(masterRef.current)
    osc.start(time)
    osc.stop(time + dur + 0.1)
  }

  const startMusic = () => {
    if (!ctxRef.current) {
      const AC: typeof AudioContext | undefined =
        window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AC) return
      const ctx = new AC()
      ctxRef.current = ctx
      const master = ctx.createGain()
      master.gain.value = 0.4
      master.connect(ctx.destination)
      masterRef.current = master
    }
    const ctx = ctxRef.current
    if (ctx.state === 'suspended') ctx.resume()

    stepRef.current = 0
    intervalRef.current = window.setInterval(() => {
      const ctxNow = ctx.currentTime
      const step = stepRef.current
      const note = ARPEGGIO[step % ARPEGGIO.length]
      const bass = BASS[Math.floor(step / 4) % BASS.length]
      playNote(note, ctxNow, 0.9, 0.16)
      if (step % 4 === 0) playNote(bass, ctxNow, 1.6, 0.12)
      if (step % 8 === 4) playNote(note * 2, ctxNow, 0.7, 0.08)
      stepRef.current += 1
    }, 420)
    setPlaying(true)
  }

  const stopMusic = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
    setPlaying(false)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      ctxRef.current?.close()
    }
  }, [])

  return (
    <button
      onClick={() => (playing ? stopMusic() : startMusic())}
      className="btn-tap glass fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
        touchAction: 'manipulation',
      }}
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      {playing ? <Volume2 className="text-sky" size={20} /> : <VolumeX className="text-sky/60" size={20} />}
    </button>
  )
}