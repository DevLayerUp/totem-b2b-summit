import type { AccentName } from '@/config/accents';

/** Titulo fixo do node 2132 — igual nas 2 etapas (trilha de eras e fundamentos). */
export const ERA_DA_PRESENCA_TITLE = 'eRa Da PReSeNÇa';

export const ERA_TIMELINE_SUBTITLE =
  'Analisando o marketing moderno, podemos dizer que ele se divide em eras:';

export const FUNDAMENTOS_SUBTITLE =
  'Por isso, essa era é marcada por três fundamentos essenciais:';

/** Card fixo do lado direito da 1a etapa (node 2132:847/851/849), igual nas 3 eras. */
export const ERA_TIMELINE_CARD = {
  intro:
    'A Era da Presença Inteligente é um conceito desenvolvido por Samira Cardoso, CEO e Cofundadora da Layer Up, após dois anos de estudos, para explicar a nova lógica da jornada de marketing: uma lógica que assume, sem medo, a complexidade do comportamento humano atual.',
  quote:
    'O objetivo não é mais controlar o caminho do consumidor, mas acompanhar, entender e influenciar suas escolhas ao longo da jornada',
  footnote: '— seja ela como for.',
};

export interface EraTimelineItem {
  readonly id: string;
  readonly label: string;
  /** Quebra de linha manual (node 2132:1173, "Era da Presença" + "Inteligente"). */
  readonly heading: string;
  readonly description: string;
  readonly photo: string;
}

/** As 3 eras do node 2132:804/1062/1133, navegaveis pela trilha horizontal. */
export const ERA_TIMELINE_ITEMS: readonly EraTimelineItem[] = [
  {
    id: 'interrupcao',
    label: '1955 a 1995',
    heading: 'Era da Interrupção',
    description:
      'Marcada pelo alto investimento em mídias de massa, como a TV. Aqui, a publicidade tinha cara de publicidade, bem direta e expressiva e marcada pelo storytelling emocional.',
    photo: '/assets/photos/era-interrupcao.png',
  },
  {
    id: 'performance',
    label: '1995 a 2020',
    heading: 'Era da Performance',
    description:
      'Quando o marketing virou engenharia. Foi aqui que surgiram o Google e as grandes redes sociais, assim como a publicidade mobile. Tudo girava em torno de dados, cliques e ROI imediato.',
    photo: '/assets/photos/era-performance.png',
  },
  {
    id: 'presenca-inteligente',
    label: '2020 até agora',
    heading: 'Era da Presença\nInteligente',
    description:
      'Aparecer já não é mais o suficiente. Na era atual, o consumidor se tornou protagonista do processo, e o foco passa a ser a conexão, a relevância e a eficiência em cada ponto de contato.',
    photo: '/assets/photos/era-presenca-inteligente.png',
  },
];

/** Card fixo do lado direito da 2a etapa (node 2132:927/929/931), igual nos 3 fundamentos. */
export const FUNDAMENTOS_CARD = {
  intro:
    'Com a aceleração da publicidade digital e a rápida saturação dos canais, a presença inteligente é a única resposta possível ao novo perfil de consumidor.',
  lead: 'Ao entender esse conceito, conseguimos fazer com que marcas B2B deixem de ser apenas um ruído na timeline, para ser',
  emphasis: 'solução, autoridade e fonte de valor contínuo para o usuário.',
};

export interface FundamentoItem {
  readonly id: string;
  readonly number: number;
  readonly accent: AccentName;
  readonly heading: string;
  readonly description: string;
}

/**
 * Os 3 fundamentos do node 2132:875/936/997.
 *
 * No Figma os 3 numeros ficam sempre visiveis ao mesmo tempo (como abas) e so
 * o toque direto no numero troca o conteudo — nenhuma das 3 variantes tem
 * botao "PRÓXIMO", so "ANTERIOR" (volta para a ultima era da 1a etapa).
 */
export const FUNDAMENTOS_ITEMS: readonly FundamentoItem[] = [
  {
    id: 'presenca-estrategica',
    number: 1,
    accent: 'yellow',
    heading: 'Presença estratégica, não onipresença:',
    description:
      'não se trata de estar em todos os canais, mas nos canais que importam, com a mensagem certa.',
  },
  {
    id: 'consistencia',
    number: 2,
    accent: 'pink',
    heading: 'Consistência como ativo competitivo:',
    description:
      'em um mundo fragmentado, a marca só existe se for reconhecida, e só é reconhecida se for coerente visualmente, verbalmente e estrategicamente.',
  },
  {
    id: 'inteligencia-tempo-real',
    number: 3,
    accent: 'purple',
    heading: 'Inteligência aplicada em tempo real:',
    description:
      'tecnologia, dados e IA deixam de ser apenas um suporte e passam a ser motor de decisão.',
  },
];
