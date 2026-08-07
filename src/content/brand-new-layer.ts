import type { AccentName } from '@/config/accents';

/** Conteudo do node 2093:954 e variantes (2112:1814/1934/2032/2130). */
export const BRAND_NEW_LAYER_TITLE = 'BRaND NeW LaYeR';

export const BRAND_NEW_LAYER_SUBTITLE =
  'Esse método é a base de todos os planejamentos que desenvolvemos na Layer Up.';

/** Paragrafo fixo a esquerda (node 2093:996), igual nas 5 variantes. */
export const BRAND_NEW_LAYER_INTRO: readonly string[] = [
  'O Brand New Layer é um processo autoral que parte da leitura profunda do contexto de cada negócio para organizar decisões, construir diferenciação e integrar estratégia e execução.',
  'O resultado é uma marca em movimento, capaz de impactar o mercado agora e continuar relevante ao longo do tempo.',
];

export interface BrandNewLayerStep {
  readonly id: string;
  /**
   * Glifo exibido no bloco da letra.
   *
   * ATENCAO: o caixa mista (L, a, Y, e, R) NAO e erro de digitacao — a
   * Logirent mapeia minusculas para glifos alternativos e o Figma usa isso
   * de proposito para soletrar "LaYeR". Ver mesma observacao em
   * `content/start-screen.ts`.
   */
  readonly letter: string;
  readonly heading: string;
  readonly accent: AccentName;
  readonly description: string;
}

/**
 * As 5 variantes do node 2093:808 ("BRAND NEW LAYER"), uma por letra.
 *
 * A ordem e fixa nas 5 telas do Figma — apenas o destaque (qual letra esta
 * "acesa") muda de uma variante para a outra — entao aqui e uma unica lista
 * navegavel por toque, em vez de 5 rotas separadas.
 */
export const BRAND_NEW_LAYER_STEPS: readonly BrandNewLayerStep[] = [
  {
    id: 'listen',
    letter: 'L',
    heading: 'LISTEN',
    accent: 'pink',
    description:
      'Todo processo começa por escuta e análise. Mergulhamos no contexto da marca para entender seu mercado, desafios, forças e oportunidades.',
  },
  {
    id: 'attention',
    letter: 'a',
    heading: 'ATTENTION',
    accent: 'yellow',
    description:
      'A partir do diagnóstico, criamos uma estratégia que orienta decisões, organiza prioridades e define como a marca pode se expressar com autenticidade.',
  },
  {
    id: 'younique',
    letter: 'Y',
    heading: 'YOUNIQUE',
    accent: 'purple',
    description:
      'Nessa etapa, construímos o conceito, a linguagem e o posicionamento que permitem diferenciar e reconhecer a marca em seu contexto competitivo.',
  },
  {
    id: 'emotion',
    letter: 'e',
    heading: 'EMOTION',
    accent: 'pink',
    description:
      'Em seguida, transformamos estratégia em conexão. Desenvolvemos a narrativa e a identidade integradas que conversam com o público e fortalecem vínculos.',
  },
  {
    id: 'reputation',
    letter: 'R',
    heading: 'REPUTATION',
    accent: 'yellow',
    description:
      'Com a marca em movimento, acompanhamos sua evolução. A gestão da reputação garante consistência, coerência e adaptação a cada novo momento do negócio.',
  },
];
