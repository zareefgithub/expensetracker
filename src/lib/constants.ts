export const CATEGORY_STYLES = {
  travel: {
    bg: 'rgb(219 234 254)',
    text: 'rgb(29 78 216)',
  },
  office: {
    bg: 'rgb(220 252 231)',
    text: 'rgb(21 128 61)',
  },
  meals: {
    bg: 'rgb(254 242 242)',
    text: 'rgb(185 28 28)',
  },
  other: {
    bg: 'rgb(243 244 246)',
    text: 'rgb(55 65 81)',
  },
} as const;

export const STATUS_STYLES = {
  processed: {
    bg: 'bg-green-100',
    text: 'text-green-800',
  },
  error: {
    bg: 'bg-red-100',
    text: 'text-red-800',
  },
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
  },
} as const;