# 🫂 Sorry Website — For a Best Friend

A mobile-first, interactive **apology website** built with React + Vite + Tailwind CSS.
Designed exclusively for phones (iPhone & Android) — it feels like a premium native app.

Theme: **friendship** — sunny teal, sky blue, warm yellow & coral on a deep night-blue background.

## ✨ Features

- 🤝 Floating friendship emojis (hugs, stars, balloons) + twinkling particle background
- 💌 Tap-to-open envelope with a friendship seal
- 🏃 The "**Can you forgive me?**" question with a **No button that runs away**
- ✍️ Typewriter apology letter (character-by-character)
- 🎴 "Reasons I'm sorry" flip-card carousel
- 💖 "Our friendship" section: live days/hours counter, **tap-to-fill ∞ Friendship meter**, **secret note flip cards**, and a **pinky-promise seal**
- 📸 Polaroid photo gallery with full-screen lightbox
- 🎆 **Fireworks + confetti** finale with hold-to-reveal
- 🎵 Soft synthesized background music (no audio file needed)
- 📱 Safe-area support for iPhone notch / Dynamic Island
- ⬆️⬇️ Floating **scroll up/down buttons** on scrollable screens
- 🔗 Deep-link any screen: `?stage=welcome|envelope|question|letter|reasons|promise|gallery|celebration`

## 🚀 Run it

```bash
npm install
npm run dev
```

Then open the dev URL on your phone (use `--host` and your LAN IP), or resize your
browser to a phone size.

Build for production:

```bash
npm run build
npm run preview
```

## ✏️ Personalize everything

Open **`src/config.ts`** — that's the only file you need to edit.

| Field | What it does |
|-------|--------------|
| `friendName` | Your friend's name (shown on the envelope, result card) |
| `yourName` | Your name |
| `welcomeTitle` / `welcomeSubtitle` | Opening screen text |
| `question` | The big question |
| `yesText` | The Yes button label |
| `noTexts` | Messages the No button cycles through |
| `apologyLetter` | The typewriter letter |
| `reasons[]` | Flip-card reasons (`emoji`, `title`, `message`) |
| `friendSince` | Date `"YYYY-MM-DDTHH:mm:ss"` when your friendship started (drives the live counter) |
| `secretNotes[]` | Tap-to-reveal notes (`title`, `message`) |
| `promises[]` | Pinky-promise list (`emoji`, `text`) |
| `photos[]` | Add `{ src, caption }` — drop images in `public/images/` |
| `celebrationText` | Final message |

Example photo config:

```ts
photos: [
  { src: '/images/us1.jpg', caption: 'Where it started' },
  { src: '/images/us2.jpg', caption: 'That trip' },
],
```

> If `photos` is empty, the gallery shows pretty gradient placeholders automatically.

## 🎨 Friendship color palette

Defined in `src/index.css` under `@theme`:

| Token | Hex | Role |
|-------|-----|------|
| `teal` | `#2ec4b6` | Primary accent / headings |
| `sky` | `#4cc9f0` | Secondary text & cool accent |
| `sun` | `#ffd166` | Warm highlight / finale |
| `coral` | `#ff7b54` | Energetic warm accent |
| `grape` | `#9b5de5` | Playful purple |
| `bg-deep` / `bg-blue` | `#0b1b2b` / `#12314f` | Night-sky background |

## 📱 Mobile design notes

- Locked max width, portrait-oriented story flow (one action per screen)
- 48px+ tap targets, touch-action tuned, no tap highlight
- `viewport-fit=cover` + `env(safe-area-inset-*)` for notched phones
- The No button dodges your **finger**, not just the cursor, and only ever moves above or below the Yes button — it can never cover it

## 🛠 Tech

React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · canvas-confetti · lucide-react
