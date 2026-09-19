export interface Reason {
  emoji: string
  title: string
  message: string
}

export interface Photo {
  src: string
  caption: string
}

export const siteConfig = {
  friendName: 'Mehak',
  yourName: 'Kumar_n',

  welcomeTitle: 'I\'m Sorry',
  welcomeSubtitle: 'To the best friend I ever had…',

  question: 'Can you forgive me?',
  yesText: 'Yes, I forgive you! 🤝',
  noTexts: [
    'Are you sure? 🥺',
    'Please? 🥺',
    'We\'re best friends! 💔',
    'Remember the good times? 🎈',
    'Don\'t do this to us! 🫂',
    'I\'ll make it up to you!',
  ],

  apologyLetter:
    'Dear Mehak,\n\nI\'m really, truly sorry — from the bottom of my heart. 💛\n\nI hurt you with things I said and did, and that\'s the last thing in the world I ever wanted. You\'ve been my best friend through everything: the laughs, the late-night talks, the silly fights, the good days and the hard ones. You always showed up for me, and I forgot to show up for you. I\'m so, so sorry for that.\n\nYou make the whole world feel softer just by being in it. You deserve every bit of love and kindness — never doubt that, ever. And you deserve a friend who loves you out loud, every single day.\n\nI love you, my best friend. Always have, always will. Please forgive me — I\'ll spend forever making it right. 🫂\n',

  reasons: [
    {
      emoji: '😔',
      title: 'I Was Wrong',
      message: 'I said things I shouldn\'t have, and I take full responsibility. I was wrong, completely.',
    },
    {
      emoji: '🫂',
      title: 'I Hurt My Best Friend',
      message: 'The last thing I ever wanted was to make you upset. Seeing you hurt because of me breaks me.',
    },
    {
      emoji: '💭',
      title: 'I Took You for Granted',
      message: 'You show up for me again and again, and I forgot to appreciate it. Not anymore.',
    },
    {
      emoji: '🥺',
      title: 'I Broke the Trust',
      message: 'Trust between friends is everything, and I damaged it. I will spend every day earning it back.',
    },
    {
      emoji: '🤝',
      title: 'You\'re My Best Friend',
      message: 'Through every fight and every dumb argument, you\'re still the person I want in my corner.',
    },
    {
      emoji: '🌱',
      title: 'I\'ll Do Better',
      message: 'Not just say better — DO better. I promise you a better friend, starting today.',
    },
    {
      emoji: '💛',
      title: 'You Deserve the World',
      message: 'You deserve a friend who never makes you feel small. Let me make it right.',
    },
    {
      emoji: '⭐',
      title: 'Don\'t Go',
      message: 'I can\'t imagine my life without you in it. Please stay. Please forgive me.',
    },
  ] as Reason[],

  photos: [] as Photo[],

  // When your friendship started (used for the live "friends for…" counter)
  // Format: YYYY-MM-DDTHH:mm:ss  — leave empty to hide the counter
  friendSince: '2024-10-18T00:00:00',

  // Tap-to-reveal secret notes (personal little truths)
  secretNotes: [
    { title: 'You Matter', message: 'You matter to me more than you realize. Even on the days you feel invisible.' },
    { title: 'Always Here', message: 'No matter how far life takes us, I\'m one message away. Always.' },
    { title: 'My Favourite', message: 'You\'re my favourite person to do absolutely nothing with.' },
    { title: 'Thank You', message: 'Thank you for putting up with me. I know I\'m a lot sometimes.' },
  ],

  // Promises you seal with a pinky promise at the end of the friendship section
  promises: [
    { emoji: '👂', text: 'I will always listen, even when it\'s hard.' },
    { emoji: '📞', text: 'I\'ll pick up, no matter the hour.' },
    { emoji: '🤐', text: 'Your secrets stay safe with me. Always.' },
    { emoji: '🫶', text: 'I\'ll show up for you, every single time.' },
    { emoji: '🌧️', text: 'I\'ll be your umbrella on your worst days.' },
    { emoji: '🎉', text: 'And celebrate you on your best ones.' },
  ],

  promiseTitle: 'I pinky promise',
  promiseHint: 'Tap the promise to seal it 🤙',

  celebrationText:
    'Thank you for forgiving me. You\'re the best friend anyone could ever ask for. 🫂',
  celebrationDate: new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),

  scrollHint: 'Tap to continue',
  footerNote: 'Made with all my heart, for my best friend.',
}

export const FORGIVEN = 'forgiven'
export const STAGE_KEY = 'sorry-stage'