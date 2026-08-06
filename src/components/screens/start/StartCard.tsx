'use client';

import { type ReactNode, useRef } from 'react';

import { CtaLink } from '@/components/ui/CtaLink';
import { GlassCard } from '@/components/ui/GlassCard';
import { ACCENTS } from '@/config/accents';
import type { StartCardContent } from '@/content/start-screen';
import { EASE, gsap } from '@/lib/motion/gsap';
import { focusAccent, releaseAccent } from '@/lib/motion/motionTargets';
import { useScreenTransition } from '@/lib/navigation/useScreenTransition';

/** Medidas do node 13:1719 (card1-clique). */
const CARD_WIDTH = 546;
const TITLE_WIDTH = 394.851;

/**
 * Espacamento minimo entre o texto e a chamada para acao.
 *
 * No Figma cada card usa um gap diferente (70px, 46px, 70px) para que os tres
 * terminem na mesma altura. Aqui os cards se esticam e a chamada e empurrada
 * para a base, o que produz o mesmo resultado e continua valendo se o texto
 * mudar.
 */
const CTA_MIN_GAP = 46;

interface StartCardProps {
  content: StartCardContent;
  /** Arte decorativa recortada pelo card, quando houver. */
  decoration?: ReactNode;
}

export function StartCard({ content, decoration }: StartCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useScreenTransition();

  const handlePress = () => {
    focusAccent(ACCENTS[content.accent].hex);
    gsap.to(cardRef.current, { scale: 0.985, duration: 0.3, ease: EASE.press });
  };

  const handleRelease = () => {
    releaseAccent();
    gsap.to(cardRef.current, { scale: 1, duration: 0.5, ease: EASE.press });
  };

  return (
    <button
      type="button"
      onPointerDown={handlePress}
      onPointerUp={handleRelease}
      onPointerCancel={handleRelease}
      onPointerLeave={handleRelease}
      onClick={() => navigate(content.href)}
      className="cursor-pointer text-left"
    >
      <GlassCard
        ref={cardRef}
        data-animate="card"
        className="flex h-full flex-col px-[60px] py-[80px]"
        style={{ width: CARD_WIDTH }}
      >
        {decoration}

        <div className="relative flex flex-col gap-[30px] text-white">
          <h2
            className="font-display text-[48px] leading-[normal] break-words"
            style={{ width: TITLE_WIDTH }}
          >
            {content.title.map((line, index) => (
              <span key={`${content.id}-${index}`} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p
            className="font-body text-[18px] leading-[24px] font-normal"
            style={{ width: content.descriptionWidth }}
          >
            {content.description}
          </p>
        </div>

        <CtaLink
          label={content.cta}
          accent={content.accent}
          className="relative mt-auto"
          style={{ paddingTop: CTA_MIN_GAP }}
        />
      </GlassCard>
    </button>
  );
}
