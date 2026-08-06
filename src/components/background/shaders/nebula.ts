/**
 * Shader do campo de estrelas do totem.
 *
 * O degrade "DEGRADE-FUNDO" da TELA 1 — a nebulosa com a onda de luz
 * horizontal — agora e o video real exportado do Figma (ver
 * `NebulaVideo.tsx`), tocado atras deste canvas. Este shader fica responsavel
 * so pelo que o video nao traz:
 *  - o campo de estrelas, atenuado pelo preto de 50% que existe por cima dele
 *    no layout;
 *  - o realce sutil de cor de acento quando um card e tocado.
 *
 * O plano e transparente (alpha 0 onde nao ha estrela nem realce), entao o
 * video aparece por baixo sem qualquer composicao manual: e so alpha
 * blending padrao do WebGL sobre o elemento <video>.
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
  uniform vec3  uAccent;
  uniform float uAccentStrength;

  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
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
    float starAlpha = clamp(stars * 0.5, 0.0, 1.0);

    // --- Realce de toque ------------------------------------------------------
    // Um toque num card acende a tela inteira, de leve, com a cor de acento
    // daquele card — um verniz por cima do video, nao uma substituicao dele.
    vec3 accentTint = uAccent * uAccentStrength * 0.10;
    float accentAlpha = uAccentStrength * 0.10;

    vec3 color = (starColor + accentTint) * uIntensity;
    float alpha = clamp(max(starAlpha, accentAlpha) * uIntensity, 0.0, 1.0);

    // Dithering discreto: sem isso o realce de toque bandeia sobre o video.
    color += (hash21(gl_FragCoord.xy) - 0.5) / 255.0;

    gl_FragColor = vec4(srgbToLinear(max(color, 0.0)), alpha);
  }
`;
