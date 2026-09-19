import { motion } from 'framer-motion'

export type MascotId =
  | 'bear'
  | 'fox'
  | 'bunny'
  | 'cat'
  | 'koala'
  | 'hug'

interface MascotProps {
  id?: MascotId
  message?: string
  variant?: 'bob' | 'hop' | 'wiggle'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  delay?: number
}

const FACES: Record<MascotId, string> = {
  bear: '🐻',
  fox: '🦊',
  bunny: '🐰',
  cat: '🐱',
  koala: '🐨',
  hug: '🫶',
}

const SIZE_CLASSES = { sm: 'text-5xl', md: 'text-7xl', lg: 'text-9xl' }

export default function Mascot({
  id = 'bear',
  message,
  variant = 'bob',
  size = 'md',
  className = '',
  delay = 0,
}: MascotProps) {
  const animClass =
    variant === 'hop' ? 'animate-hop' : variant === 'wiggle' ? 'animate-wiggle' : 'animate-bob'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 12, stiffness: 120, delay }}
      className={`pointer-events-none flex flex-col items-center ${className}`}
      aria-hidden
    >
      {message && (
        <div className="glass mb-2 max-w-[180px] rounded-2xl border-b-[6px] border-teal/40 px-3 py-2 text-center">
          <p className="font-sans text-[13px] leading-snug text-cream">{message}</p>
        </div>
      )}
      <div className={`${animClass} relative`}>
        <span className={`block ${SIZE_CLASSES[size]} drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]`}>
          {FACES[id]}
        </span>
        {variant === 'hop' && (
          <span className="animate-shadow block h-2.5 w-14 rounded-full bg-black/40 blur-[2px]" />
        )}
      </div>
    </motion.div>
  )
}