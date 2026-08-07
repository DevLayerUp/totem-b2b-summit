import type { AccentName } from '@/config/accents';

/** Conteudo do node 2100 — TELA 2.2 - CONSTELAÇÃO DE MARKETING. */
export const CONSTELACAO_MARKETING_TITLE = 'CONSTeLaÇãO De MaRKeTING';

export const CONSTELACAO_MARKETING_SUBTITLE =
  'Durante anos, o funil de marketing foi tratado como o GPS oficial para qualquer estratégia. Um modelo simples, feito para um mercado com poucos canais de informação, pouca dispersão e um comportamento bastante previsível.';

export const CONSTELACAO_MARKETING_INTRO_LINE =
  'Mas tudo isso mudou. Hoje enfrentamos um cenário em que:';

/** Card fixo do lado direito (node 2100:1666), igual nos 3 slides de estatistica. */
export const CONSTELACAO_MARKETING_CARD = {
  lead: 'Isso significa que o consumidor não avança por um funil de forma sequencial e calculável; ',
  emphasis: 'ele orbita entre os diversos pontos de contato com a marca.',
};

export interface ConstelacaoMarketingStat {
  readonly id: string;
  /**
   * Estatistica em destaque (node 2100:1488 e variantes).
   *
   * Quebras de linha manuais do Figma (quando existirem) sao representadas
   * por `\n` e renderizadas com `whitespace-pre-line`.
   */
  readonly heading: string;
  readonly accent: AccentName;
  /** Linhas menores abaixo da estatistica — fonte da informacao, contexto etc. */
  readonly footnotes: readonly string[];
}

/** Os 3 slides do node 2100:1443/1494/1543 — navegaveis pelo scroll a esquerda. */
export const CONSTELACAO_MARKETING_STATS: readonly ConstelacaoMarketingStat[] = [
  {
    id: 'funil-3-porcento',
    heading: 'O funil de marketing só funciona em 3% das vezes.',
    accent: 'rose',
    footnotes: ['Nas outras 97%, ele falha', '(Leadster)'],
  },
  {
    id: '500-pontos-contato',
    heading: 'Os consumidores\ninteragem com mais de\n500 pontos de contato digitais',
    accent: 'yellow',
    footnotes: ['(Think with Google)'],
  },
  {
    id: 'multiplos-canais',
    heading: '73% desses consumidores utilizam múltiplos canais simultaneamente',
    accent: 'purple',
    footnotes: ['durante a jornada de compra (MarTech).'],
  },
];

/** Ultima etapa (node 2100:1602) — bio da Samira Cardoso e o video do metodo. */
export const CONSTELACAO_MARKETING_BIO = {
  photo: '/assets/photos/samira-cardoso.png',
  paragraphs: [
    'Foi diante dessa constatação que Samira Cardoso, CEO e Cofundadora da Layer Up, criou a Constelação de Marketing, um modelo que reconhece a não linearidade da jornada atual e, em vez de etapas fixas, propõe pontos gravitacionais que atraem e influenciam os consumidores de maneiras diferentes.',
    'Com esse novo guia visual, podemos mapear e potencializar os pontos de contato que realmente moldam a decisão. Aplicando a Constelação de Marketing, conseguimos reorganizar o pensamento estratégico das empresas e preparar líderes de marketing para operar em um cenário que exige presença, coerência e inteligência em tempo real.',
  ],
  /** Node 2100:1664 — placeholder do Figma; ainda nao existe um video final. */
  videoPlaceholder: 'MP4 CONSTELAÇÃO AQUI',
};
