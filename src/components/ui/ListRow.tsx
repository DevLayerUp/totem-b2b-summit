'use client';

import { useRef } from 'react';

import { CtaLink } from '@/components/ui/CtaLink';
import { GlassCard } from '@/components/ui/GlassCard';
import { ACCENTS, type AccentName } from '@/config/accents';
import { EASE, gsap } from '@/lib/motion/gsap';
import { focusAccent, releaseAccent } from '@/lib/motion/motionTargets';
import { useScreenTransition } from '@/lib/navigation/useScreenTransition';

/** Largura do traco da chamada para acao (node 2093:729). */
const CTA_LINE_WIDTH = 130;

interface ListRowProps {
  title: string;
  cta: string;
  accent: AccentName;
  href: string;
}

/**
 * Linha horizontal em vidro usada nas telas de listagem (node "card1-clique"
 * da TELA 2 - METODOLOGIAS): titulo a esquerda, chamada para acao a direita.
 *
 * Repete o toque do `StartCard` — acende o fundo com a cor de acento e
 * encolhe de leve enquanto o dedo esta em cima — para que qualquer lista do
 * totem se sinta parte do mesmo ambiente.
 */
export function ListRow({ title, cta, accent, href }: ListRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const navigate = useScreenTransition();

  const handlePress = () => {
    focusAccent(ACCENTS[accent].hex);
    gsap.to(rowRef.current, { scale: 0.99, duration: 0.3, ease: EASE.press });
  };

  const handleRelease = () => {
    releaseAccent();
    gsap.to(rowRef.current, { scale: 1, duration: 0.5, ease: EASE.press });
  };

  return (
    <button
      type="button"
      onPointerDown={handlePress}
      onPointerUp={handleRelease}
      onPointerCancel={handleRelease}
      onPointerLeave={handleRelease}
      onClick={() => navigate(href)}
      className="w-full cursor-pointer text-left"
    >
      <GlassCard
        ref={rowRef}
        data-animate="row"
        className="flex h-[120px] w-full items-center justify-between px-[60px] py-[32px]"
      >
        <h2 className="font-display text-[48px] leading-[1.2] font-bold text-white">{title}</h2>
        <CtaLink label={cta} accent={accent} lineWidth={CTA_LINE_WIDTH} reverse />
      </GlassCard>
    </button>
  );
}
