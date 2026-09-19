export default function FlowerTree() {
  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 z-[1] hidden w-[240px] sm:block"
      style={{ height: 260, opacity: 0.9 }}
      aria-hidden
    >
      <div className="animate-tree-sway h-full w-full">
        <svg viewBox="0 0 240 260" className="h-full w-full">
          <defs>
            <radialGradient id="ft-blossom" cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#ffd3e3" />
              <stop offset="55%" stopColor="#ff9ecb" />
              <stop offset="100%" stopColor="#e877a8" />
            </radialGradient>
            <radialGradient id="ft-blossom-2" cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#ffe3f2" />
              <stop offset="60%" stopColor="#ffb6d5" />
              <stop offset="100%" stopColor="#e08fc0" />
            </radialGradient>
            <linearGradient id="ft-trunk" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5b3f2b" />
              <stop offset="50%" stopColor="#7a5438" />
              <stop offset="100%" stopColor="#4a3220" />
            </linearGradient>
          </defs>

          <path
            d="M118 252 C118 210 116 180 122 138 C124 120 130 106 142 96"
            stroke="url(#ft-trunk)"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M122 138 C96 118 78 96 70 70"
            stroke="url(#ft-trunk)"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M122 140 C146 122 168 106 184 88"
            stroke="url(#ft-trunk)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M120 158 C100 146 86 128 82 110"
            stroke="url(#ft-trunk)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          <ellipse cx="96" cy="112" rx="30" ry="16" fill="#4e8f6e" opacity="0.85" transform="rotate(-24 96 112)" />
          <ellipse cx="158" cy="112" rx="28" ry="14" fill="#5ba37d" opacity="0.85" transform="rotate(18 158 112)" />
          <ellipse cx="124" cy="128" rx="26" ry="13" fill="#4e8f6e" opacity="0.8" transform="rotate(-8 124 128)" />

          <g opacity="0.96">
            <circle cx="70" cy="66" r="38" fill="url(#ft-blossom)" />
            <circle cx="118" cy="48" r="44" fill="url(#ft-blossom-2)" />
            <circle cx="158" cy="62" r="36" fill="url(#ft-blossom)" />
            <circle cx="184" cy="92" r="30" fill="url(#ft-blossom-2)" />
            <circle cx="46" cy="94" r="26" fill="url(#ft-blossom-2)" />
            <circle cx="104" cy="100" r="30" fill="url(#ft-blossom)" opacity="0.95" />
            <circle cx="148" cy="104" r="26" fill="url(#ft-blossom-2)" opacity="0.95" />
          </g>

          {[
            [52, 52, 4], [80, 40, 3], [104, 36, 4], [128, 58, 3], [146, 40, 4],
            [170, 50, 3], [188, 74, 3], [60, 84, 3], [120, 76, 3], [168, 96, 3],
          ].map(([cx, cy, r], i) => (
            <circle key={`b${i}`} cx={cx} cy={cy} r={r} fill="#fff2f8" opacity="0.9" />
          ))}

          {[88, 110, 140, 178].map((cx, i) => (
            <circle key={`c${i}`} cx={cx} cy={66 + (i % 2) * -8} r={6} fill="#ffd166" opacity="0.9" />
          ))}
        </svg>
      </div>

      <span
        className="absolute top-10 left-14 h-3 w-3 rounded-full"
        style={{
          background: '#ff9ecb',
          animation: 'petalFallTree 5.5s ease-in 0.4s infinite',
        }}
      />
      <span
        className="absolute top-14 left-40 h-2.5 w-2.5 rounded-full"
        style={{
          background: '#ffc9de',
          animation: 'petalFallTree 6.2s ease-in 1.6s infinite',
        }}
      />
      <span
        className="absolute top-8 left-36 h-3 w-3 rounded-full"
        style={{
          background: '#e8a5d9',
          animation: 'petalFallTree 4.8s ease-in 2.8s infinite',
        }}
      />
      <style>{`@keyframes petalFallTree{0%{transform:translate(0,0) rotate(0deg);opacity:0}8%{opacity:1}100%{transform:translate(90px,220px) rotate(300deg);opacity:0}}`}</style>
    </div>
  )
}