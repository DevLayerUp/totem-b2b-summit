import Image from 'next/image';

/**
 * Node 35:28 — anel de orbitas que atravessa a borda direita do primeiro card.
 *
 * As coordenadas sao o centro do node do Figma resolvido para o canto superior
 * esquerdo da imagem; o card recorta o excedente.
 */
const ORBIT_SIZE = 530;
const ORBIT_LEFT = 525;
const ORBIT_TOP = -34;
const ORBIT_ROTATION = '55.79deg';

export function CardOrbitDecoration() {
  return (
    <Image
      aria-hidden
      priority
      src="/assets/orbits/orbita-rosa.png"
      alt=""
      width={ORBIT_SIZE}
      height={ORBIT_SIZE}
      className="pointer-events-none absolute max-w-none"
      style={{
        left: ORBIT_LEFT,
        top: ORBIT_TOP,
        width: ORBIT_SIZE,
        height: ORBIT_SIZE,
        rotate: ORBIT_ROTATION,
      }}
    />
  );
}
