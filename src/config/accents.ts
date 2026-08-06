/**
 * Cores de acento da marca.
 *
 * O hex alimenta a cena WebGL (que precisa do valor numerico) e a classe
 * alimenta o DOM, ambos a partir da mesma fonte para nao divergirem.
 */
export const ACCENTS = {
  pink: { hex: '#EF107E', textClassName: 'text-accent-pink' },
  yellow: { hex: '#F9C214', textClassName: 'text-accent-yellow' },
  purple: { hex: '#B869FF', textClassName: 'text-accent-purple' },
} as const;

export type AccentName = keyof typeof ACCENTS;
