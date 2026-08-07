/**
 * Layout dos elementos decorativos do fundo, em coordenadas de design
 * (origem no canto superior esquerdo do palco de 1920x1080).
 *
 * Estes valores vem direto dos nodes do Figma da TELA 1 - START. As esferas e
 * orbitas sao renderizadas na cena WebGL, e nao no DOM, para que compartilhem
 * o mesmo loop de animacao da aurora e reajam ao toque de forma coerente.
 */

export interface SceneDecor {
  readonly id: string;
  readonly texture: string;
  /** Canto superior esquerdo em coordenadas de design. */
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  /** Quanto o elemento se desloca com o parallax, relativo aos demais. */
  readonly parallaxDepth: number;
  /** Amplitude e periodo da flutuacao ociosa, em px de design e segundos. */
  readonly driftAmplitude: number;
  readonly driftPeriod: number;
  /**
   * Velocidade de rotacao continua, em voltas por segundo. Anima sozinha,
   * sem depender de toque — e o que faz os pontos do anel de orbitas
   * parecerem planetas girando em torno do centro.
   */
  readonly rotationSpeed?: number;
  /** Amplitude (fracao da escala) e periodo da pulsacao de "respiracao". */
  readonly pulseAmplitude?: number;
  readonly pulsePeriod?: number;
}

export interface Scene {
  readonly id: string;
  readonly decor: readonly SceneDecor[];
}

/** Node 2084:325 — TELA 1 - START. */
export const START_SCENE: Scene = {
  id: 'start',
  decor: [
    {
      // Node 2084:335 — anel de orbitas no canto superior esquerdo.
      id: 'orbita-rosa',
      texture: '/assets/orbits/orbita-rosa.png',
      x: -397,
      y: -472,
      width: 794,
      height: 794,
      parallaxDepth: 0.35,
      driftAmplitude: 10,
      driftPeriod: 26,
      // Uma volta a cada 3 minutos: rapido o bastante para o olho notar que
      // os pontos do anel orbitam, devagar o bastante para nao distrair de
      // quem esta lendo os cards ao lado.
      rotationSpeed: 1 / 180,
    },
    {
      // Node 2084:334 — esfera amarela no topo direito.
      id: 'projecao',
      texture: '/assets/spheres/projecao.png',
      x: 1277,
      y: -138,
      width: 303,
      height: 296,
      parallaxDepth: 0.6,
      driftAmplitude: 14,
      driftPeriod: 19,
      pulseAmplitude: 0.035,
      pulsePeriod: 8,
    },
    {
      // Node 2084:333 — esfera magenta que domina a base direita.
      id: 'conexao',
      texture: '/assets/spheres/conexao.png',
      x: 1245,
      y: 614,
      width: 867,
      height: 867,
      parallaxDepth: 0.9,
      driftAmplitude: 18,
      driftPeriod: 31,
      pulseAmplitude: 0.03,
      pulsePeriod: 11,
    },
  ],
};

/** Node 2093:670 — TELA 2 - METODOLOGIAS. */
export const METODOLOGIAS_SCENE: Scene = {
  id: 'metodologias',
  decor: [
    {
      // Node 2093:672 — a mesma esfera "conexao", agora recortada na borda esquerda.
      id: 'conexao-metodologias',
      texture: '/assets/spheres/conexao.png',
      x: -328,
      y: 20,
      width: 920,
      height: 920,
      parallaxDepth: 0.5,
      driftAmplitude: 14,
      driftPeriod: 28,
      pulseAmplitude: 0.03,
      pulsePeriod: 11,
    },
  ],
};

/**
 * Telas de detalhe de metodologia (ex.: node 2093:954 — BRAND NEW LAYER).
 *
 * O pedido foi explicito: o fundo aqui e "bem mais simples que o da home",
 * so o video da nebulosa e o starfield — sem esferas nem orbitas recortando
 * a cena.
 */
export const METODOLOGIA_DETALHE_SCENE: Scene = {
  id: 'metodologia-detalhe',
  decor: [],
};
