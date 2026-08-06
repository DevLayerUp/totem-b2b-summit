/**
 * Shader do fundo do totem.
 *
 * Reproduz duas camadas que o Figma entrega como imagem estatica (node "bg",
 * 2084:331):
 *  - o campo de estrelas, atenuado pelo preto de 50% que existe por cima dele
 *    no layout;
 *  - o degrade "DEGRADE-FUNDO": duas auroras que nascem abaixo da borda da
 *    tela, uma menor e violeta perto do canto inferior esquerdo, outra maior
 *    e mais quente (chega a dourado no nucleo) perto do canto inferior
 *    direito, com um vale praticamente preto entre as duas;
 *  - uma onda de luz quente que percorre a faixa horizontal do degrade em
 *    loop linear, clareando o violeta para dourado/branco a medida que passa
 *    (visivel comparando dois frames do prototipo do Figma: o pico de luz
 *    muda de posicao horizontal entre eles).
 *
 * As posicoes e cores abaixo vieram de amostrar pixel a pixel o PNG de
 * referencia exportado do node 2084:331. Nada aqui e estatico feito imagem: o
 * degrade e recriado com ruido (para textura) e as duas auroras respiram e
 * derivam devagar no tempo, para o fundo nunca parecer uma foto congelada.
 *
 * As cores sao escritas em sRGB, iguais as do design, e convertidas para linear
 * no fim. Combinado com `NoToneMapping` no renderer, o que sai na tela e
 * exatamente o valor autorado.
 */

export const nebulaVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const nebulaFragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform float uIntensity;
  uniform vec2  uPointer;
  uniform vec3  uAccent;
  uniform float uAccentStrength;

  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
      value += amplitude * valueNoise(p);
      p *= 2.03;
      amplitude *= 0.5;
    }

    return value;
  }

  // Uma camada esparsa de estrelas com cintilacao dessincronizada.
  float starLayer(vec2 uv, float density, float radius, float seed) {
    vec2 grid = uv * density;
    vec2 cell = floor(grid);
    float presence = hash21(cell + seed);

    if (presence < 0.82) {
      return 0.0;
    }

    vec2 jitter = vec2(hash21(cell + seed + 1.7), hash21(cell + seed + 3.1)) - 0.5;
    float distance = length(fract(grid) - 0.5 - jitter * 0.7);
    float twinkle = 0.5 + 0.5 * sin(uTime * (0.5 + presence) + presence * 40.0);
    // Estrelas de brilhos diferentes: um ceu de pontos identicos parece textura.
    float magnitude = 0.35 + 0.65 * hash21(cell + seed + 7.7);

    return smoothstep(radius, 0.0, distance) * twinkle * magnitude;
  }

  // Rampa de cor comum as duas auroras: roxo profundo -> violeta -> magenta
  // da marca (so perto do nucleo) -> rosa quente -> nucleo dourado.
  //
  // No PNG de referencia o halo em volta de cada aurora e violeta por boa
  // parte do raio; so o nucleo compacto vira magenta e depois dourado. Por
  // isso o trecho violeta ocupa quase metade da rampa.
  vec3 auroraPalette(float t) {
    vec3 color = mix(vec3(0.020, 0.004, 0.061), vec3(0.290, 0.028, 0.440), smoothstep(0.00, 0.46, t));
    color = mix(color, vec3(0.937, 0.063, 0.494), smoothstep(0.44, 0.74, t));
    color = mix(color, vec3(1.000, 0.560, 0.560), smoothstep(0.72, 0.90, t));
    color = mix(color, vec3(1.000, 0.902, 0.741), smoothstep(0.88, 1.00, t));
    return color;
  }

  vec3 srgbToLinear(vec3 color) {
    return mix(
      color / 12.92,
      pow((color + 0.055) / 1.055, vec3(2.4)),
      step(vec3(0.04045), color)
    );
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 uv = vec2(vUv.x * aspect, vUv.y);

    // --- Estrelas -----------------------------------------------------------
    float stars =
        starLayer(uv, 105.0, 0.16, 0.0) * 0.85
      + starLayer(uv, 58.0, 0.20, 17.3) * 0.65
      + starLayer(uv, 31.0, 0.24, 41.9) * 0.45;

    // O layout aplica um preto a 50% sobre o campo de estrelas.
    vec3 starColor = vec3(1.0, 0.97, 0.94) * stars * 0.5;

    // --- Auroras --------------------------------------------------------------
    // As duas nunca ficam paradas: cada uma deriva devagar em torno do seu
    // centro de referencia e respira (o brilho sobe e desce) com um periodo
    // proprio, para que a combinacao nunca pareca um "piscar" sincronizado.
    float driftT = uTime * 0.05;
    vec2 leftDrift = 0.035 * vec2(cos(driftT * 1.00 + 1.3), sin(driftT * 0.82 + 0.4));
    vec2 rightDrift = 0.05 * vec2(cos(driftT * 0.74 + 2.6), sin(driftT * 0.91 + 3.1));

    vec2 leftCenter = vec2(-0.05, -0.09) + leftDrift;
    vec2 rightCenter = vec2(aspect * 0.86, -0.10) + rightDrift;

    float leftBreath = 0.92 + 0.08 * sin(uTime * 0.23 + 1.1);
    float rightBreath = 0.90 + 0.10 * sin(uTime * 0.17);

    // Textura interna: o mesmo warp de ruido usado antes, so que agora modula
    // cada aurora perto do seu proprio centro em vez de uma mascara global.
    vec2 warpUv = uv * 1.6 + uPointer * 0.02;
    float warpT = uTime * 0.026;
    vec2 warp = vec2(
      fbm(warpUv + vec2(warpT, -warpT * 0.8)),
      fbm(warpUv + vec2(4.3 - warpT * 0.6, 1.7 + warpT))
    );
    float n = fbm(warpUv * 1.3 + warp * 1.5);
    float turbulence = 0.76 + 0.44 * n;

    float leftDist = length(uv - leftCenter);
    float rightDist = length(uv - rightCenter);

    // O raio de cada aurora foi calibrado para que as duas se apaguem por
    // volta do meio da tela, reproduzindo o vale praticamente preto que
    // existe entre elas no Figma.
    float leftFalloff = smoothstep(0.82, 0.0, leftDist);
    float rightFalloff = smoothstep(0.70, 0.0, rightDist);

    // Expoente bem menor que 1: satura para o nucleo bem antes da borda do
    // raio, dando um platô largo de brilho em vez de um pico estreito. No PNG
    // de referencia o nucleo de cada aurora satura para branco bem antes de a
    // borda do halo comecar a escurecer de verdade.
    //
    // A aurora esquerda e menor no Figma; em vez de encolher o raio (o que so
    // afasta o platô do centro sem reduzir o brilho ali), aplicamos um peso
    // menor — assim ela fica visivelmente mais discreta sem sumir.
    float leftDensity = clamp(pow(leftFalloff, 0.32) * turbulence * leftBreath * 0.92, 0.0, 1.0);
    float rightDensity = clamp(pow(rightFalloff, 0.32) * turbulence * rightBreath, 0.0, 1.0);

    vec3 nebula = auroraPalette(leftDensity) * leftDensity + auroraPalette(rightDensity) * rightDensity;

    // --- Onda horizontal ------------------------------------------------------
    // No PNG de referencia o degrade nao e so as duas auroras: existe uma
    // faixa fina e continua unindo as duas, seguindo um arco que sobe perto
    // das bordas e desce no centro. Essa faixa carrega uma onda de luz quente
    // que a percorre de forma linear e em loop, clareando o violeta para
    // dourado/branco conforme passa — e o que muda a cor do fundo aos poucos
    // sem depender de toque.
    float archU = clamp(vUv.x, 0.0, 1.0);
    float archY = 0.09 + 0.24 * pow(abs(archU - 0.5) * 2.0, 1.4);
    float archBand = smoothstep(0.16, 0.0, abs(uv.y - archY));

    float wavePos = fract(uTime / 26.0);
    float waveOffset = abs(archU - wavePos);
    waveOffset = min(waveOffset, 1.0 - waveOffset);
    float waveProximity = smoothstep(0.42, 0.0, waveOffset);

    vec3 waveColor = mix(vec3(0.240, 0.045, 0.380), vec3(1.000, 0.780, 0.420), waveProximity);
    float waveDensity = archBand * mix(0.10, 0.85, waveProximity) * turbulence;

    nebula += waveColor * waveDensity;

    // O degrade foi calibrado no layout de paisagem. Numa tela em retrato ele
    // ocupa uma fatia muito maior da altura e apaga o contraste do conteudo,
    // entao perde intensidade ate existir um layout vertical aprovado.
    nebula *= mix(0.40, 1.0, smoothstep(0.75, 1.2, aspect));
    nebula *= uIntensity;

    // Toque num card contamina o fundo com a cor de acento daquele card.
    float touchDensity = max(leftDensity, rightDensity);
    nebula = mix(nebula, nebula * 0.45 + uAccent * touchDensity * 1.15, uAccentStrength * 0.65);

    // --- Composicao ---------------------------------------------------------
    vec3 color = starColor + nebula;

    // Dithering: o degrade cobre boa parte da tela e sem isso aparece banding.
    color += (hash21(gl_FragCoord.xy) - 0.5) / 255.0;

    gl_FragColor = vec4(srgbToLinear(max(color, 0.0)), 1.0);
  }
`;
