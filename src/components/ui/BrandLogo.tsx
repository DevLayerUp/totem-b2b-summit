import Image, { type ImageProps } from 'next/image';

/** Dimensoes do node 2084:336 (logotipo layer). */
const LOGO_WIDTH = 384;
const LOGO_HEIGHT = 93;

type BrandLogoProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>;

export function BrandLogo(props: BrandLogoProps) {
  return (
    <Image
      {...props}
      src="/assets/brand/logotipo-layer.svg"
      alt="Layer Up"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority
    />
  );
}
