export default function Navbar({ title }: { title: string }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-4"
      style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)' }}
    >
      <div className="glass mx-auto flex w-full max-w-[380px] items-center justify-between px-5 py-3">
        <span className="text-lg">🤝</span>
        <span className="font-hand text-lg text-sky">{title}</span>
        <span className="text-lg">✨</span>
      </div>
    </header>
  )
}