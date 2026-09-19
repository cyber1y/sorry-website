import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { siteConfig, type Photo } from '../config'
import { confettiRain } from '../lib/effects'

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #2ec4b6, #4cc9f0)',
  'linear-gradient(135deg, #4cc9f0, #9b5de5)',
  'linear-gradient(135deg, #ffd166, #ff7b54)',
  'linear-gradient(135deg, #9b5de5, #4cc9f0)',
  'linear-gradient(135deg, #2ec4b6, #ffd166)',
]

const PLACEHOLDER_EMOJIS = ['🫂', '✨', '🍀', '🎈', '☕']

interface GalleryItem {
  photo: Photo
  gradient: string
  emoji: string
  rotation: number
}

function buildItems(): GalleryItem[] {
  const photos = siteConfig.photos
  if (photos.length > 0) {
    return photos.map((photo, i) => ({
      photo,
      gradient: PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length],
      emoji: PLACEHOLDER_EMOJIS[i % PLACEHOLDER_EMOJIS.length],
      rotation: (i % 5) * 2 - 4,
    }))
  }
  return Array.from({ length: 5 }, (_, i) => ({
    photo: {
      src: '',
      caption: ['Where it started', 'That laugh', 'The good times', 'You & me', 'Friends forever'][i],
    },
    gradient: PLACEHOLDER_GRADIENTS[i],
    emoji: PLACEHOLDER_EMOJIS[i],
    rotation: (i % 5) * 2 - 4,
  }))
}

export default function PhotoGallery({ onDone }: { onDone: () => void }) {
  const [items] = useState<GalleryItem[]>(buildItems)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const openNext = () => {
    setLightbox((cur) => (cur === null ? null : (cur + 1) % items.length))
  }
  const openPrev = () => {
    setLightbox((cur) => (cur === null ? null : (cur - 1 + items.length) % items.length))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      className="safe-top safe-bottom relative z-20 flex min-h-dvh flex-col items-center justify-center px-6"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2 text-center font-hand text-3xl text-teal"
      >
        Our memories
      </motion.p>
      <p className="mb-9 text-center font-sans text-sm text-sky/50">
        Moments I never want to lose 💭
      </p>

      <div className="relative flex flex-col items-center gap-6">
        {items.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 40, rotate: item.rotation }}
            animate={{ opacity: 1, y: 0, rotate: item.rotation }}
            transition={{ delay: 0.15 * i, type: 'spring', damping: 16 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLightbox(i)}
            className="glass relative w-[230px] p-3 pb-5 text-left"
            style={{ background: '#fffaf0' }}
          >
            {item.photo.src ? (
              <img
                src={item.photo.src}
                alt={item.photo.caption}
                className="h-[220px] w-full rounded-lg object-cover"
                loading="lazy"
              />
            ) : (
              <div
                className="flex h-[220px] w-full items-center justify-center rounded-lg"
                style={{ background: item.gradient }}
              >
                <span className="text-6xl drop-shadow-lg">{item.emoji}</span>
              </div>
            )}
            <p className="mt-3 text-center font-hand text-lg text-[#5a3a4a]" style={{ fontFamily: 'Dancing Script, cursive' }}>
              {item.photo.caption}
            </p>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onClick={() => {
          confettiRain(1200)
          onDone()
        }}
        className="btn-tap animate-pulse-glow mt-10 rounded-full bg-gradient-to-r from-teal to-sky px-8 py-4 font-sans font-bold text-white"
      >
        They're not the best photos… wait 🌈
      </motion.button>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              key={lightbox}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="flex w-full max-w-[400px] flex-col items-center px-6"
            >
              <div className="glass mb-4 p-3 pb-5" style={{ background: '#fffaf0' }}>
                {items[lightbox].photo.src ? (
                  <img
                    src={items[lightbox].photo.src}
                    alt={items[lightbox].photo.caption}
                    className="max-h-[60vh] max-w-full rounded-lg object-contain"
                  />
                ) : (
                  <div
                    className="flex h-[280px] w-[230px] items-center justify-center rounded-lg"
                    style={{ background: items[lightbox].gradient }}
                  >
                    <span className="text-7xl">{items[lightbox].emoji}</span>
                  </div>
                )}
                <p className="mt-3 text-center font-hand text-xl text-[#5a3a4a]">
                  {items[lightbox].photo.caption}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <button onClick={openPrev} className="btn-tap text-3xl text-sky">
                  ←
                </button>
                <button
                  onClick={() => setLightbox(null)}
                  className="btn-tap glass rounded-full px-5 py-2 text-sm text-sky"
                >
                  Close
                </button>
                <button onClick={openNext} className="btn-tap text-3xl text-sky">
                  →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}