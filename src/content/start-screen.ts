import type { AccentName } from '@/config/accents';

export interface StartCardContent {
  readonly id: string;
  /**
   * Linhas do titulo exatamente como no Figma.
   *
   * ATENCAO: as minusculas em "METODOLOGIaS" e "CaSeS" NAO sao erro de
   * digitacao. Na Logirent as letras minusculas mapeiam para glifos
   * alternativos, e o design usa isso de proposito. Nao "corrigir" para
   * maiusculas — o titulo deixaria de bater com o layout aprovado.
   */
  readonly title: readonly string[];
  readonly description: string;
  /** Largura do paragrafo no Figma, que determina onde o texto quebra. */
  readonly descriptionWidth: number;
  readonly cta: string;
  readonly accent: AccentName;
  readonly href: string;
}

/** Conteudo do node 2084:357 — a linha de cards da TELA 1 - START. */
export const START_CARDS: readonly StartCardContent[] = [
  {
    id: 'metodologias',
    title: ['METODOLOGIaS PROPRIETÁRIAS'],
    description:
      'Conheça as metodologias exclusivas que desenvolvemos e aplicamos aos nossos parceiros.',
    descriptionWidth: 395,
    cta: 'Saiba mais',
    accent: 'pink',
    href: '/metodologias',
  },
  {
    id: 'servicos',
    title: ['NOSSOS', 'SERVIÇOS'],
    description:
      'Há mais de 12 anos, ajudamos empresas B2B a superar desafios complexos com estratégias que integram marketing e vendas. Conheça nossas principais soluções.',
    descriptionWidth: 427,
    cta: 'Saiba mais',
    accent: 'yellow',
    href: '/servicos',
  },
  {
    id: 'cases',
    title: ['NOSSOS', 'CaSeS'],
    description:
      'Saiba como ajudamos empresas B2B de diferentes segmentos a transformar desafios complexos em resultados de negócio.',
    descriptionWidth: 415,
    cta: 'Saiba mais',
    accent: 'purple',
    href: '/cases',
  },
];
