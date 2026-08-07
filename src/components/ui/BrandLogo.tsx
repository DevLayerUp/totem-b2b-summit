import Image, { type ImageProps } from 'next/image';

/** Dimensoes do node 2084:336 (logotipo layer), usadas no topo da TELA 1. */
const LOGO_WIDTH = 384;
const LOGO_HEIGHT = 93;

type BrandLogoProps = Omit<ImageProps, 'src' | 'alt'>;

/**
 * O mesmo logotipo aparece em mais de um tamanho no Figma (384x93 no topo da
 * TELA 1, 201x48 no rodape da TELA 2): `width`/`height` tem o padrao da TELA 1
 * mas podem ser sobrescritos por quem usa.
 *
 * O tamanho tambem vai no `style`: a razao de aspecto real do SVG nao bate
 * exatamente com a de todo uso (o rodape da TELA 2 arredonda para 201x48), e
 * sem isso o reset global de `img` do Tailwind forca `height: auto` e recalcula
 * uma altura ligeiramente diferente da pedida.
 */
export function BrandLogo({
  width = LOGO_WIDTH,
  height = LOGO_HEIGHT,
  style,
  ...props
}: BrandLogoProps) {
  return (
    <Image
      {...props}
      src="/assets/brand/logotipo-layer.svg"
      alt="Layer Up"
      width={width}
      height={height}
      style={{ width, height, ...style }}
      priority
    />
  );
}
