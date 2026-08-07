import type { AccentName } from '@/config/accents';

export interface MethodologyItemContent {
  readonly id: string;
  /**
   * Titulo exatamente como no Figma.
   *
   * ATENCAO: as minusculas (ex: "BRaND NeW LaYeR") NAO sao erro de digitacao —
   * ver a mesma observacao em `content/start-screen.ts`.
   */
  readonly title: string;
  readonly accent: AccentName;
  readonly href: string;
}

/** Conteudo do node 2093:670 — TELA 2 - METODOLOGIAS. */
export const METODOLOGIAS_TITLE = 'MeTODOLOGIaS PROPRIeTaRIAS';

export const METODOLOGIAS_SUBTITLE =
  'Conheça as metodologias exclusivas que desenvolvemos e aplicamos aos nossos parceiros.';

/** Linhas do node 2093:724 — cada uma abre uma metodologia em outra tela. */
export const METODOLOGIA_ITEMS: readonly MethodologyItemContent[] = [
  {
    id: 'brand-new-layer',
    title: 'BRaND NeW LaYeR',
    accent: 'rose',
    href: '/metodologias/brand-new-layer',
  },
  {
    id: 'constelacao-de-marketing',
    title: 'CONSTeLaÇãO DE MaRKeTING',
    accent: 'yellow',
    href: '/metodologias/constelacao-de-marketing',
  },
  {
    id: 'era-da-presenca',
    title: 'eRa Da PReSeNÇa',
    accent: 'purple',
    href: '/metodologias/era-da-presenca',
  },
];
