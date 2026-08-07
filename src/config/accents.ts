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
  /** "Rosa Claro" no Figma — mais claro que `pink`, usado na TELA 2. */
  rose: { hex: '#FF77BA', textClassName: 'text-accent-rose' },
} as const;

export type AccentName = keyof typeof ACCENTS;
