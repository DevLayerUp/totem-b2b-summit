'use client';

import { useRef } from 'react';

import { useScene } from '@/components/background/sceneStore';
import { ScreenRoot } from '@/components/screens/ScreenRoot';
import { CtaLink } from '@/components/ui/CtaLink';
import { GlassCard } from '@/components/ui/GlassCard';
import type { AccentName } from '@/config/accents';
import { START_SCENE } from '@/config/scene';
import { EASE, gsap, useGSAP } from '@/lib/motion/gsap';
import { useScreenTransition } from '@/lib/navigation/useScreenTransition';

interface PlaceholderScreenProps {
  title: readonly string[];
  accent: AccentName;
}

/**
 * Tela de destino ainda nao desenhada.
 *
 * Existe para que a transicao entre telas seja exercitada de verdade desde
 * agora — o fundo permanece vivo, so o conteudo troca. Quando o layout de cada
 * secao chegar, basta substituir o corpo pelo desenho definitivo.
 */
export function PlaceholderScreen({ title, accent }: PlaceholderScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useScreenTransition();

  useScene(START_SCENE);

  useGSAP(
    () => {
      gsap.from('[data-animate="panel"]', {
        autoAlpha: 0,
        y: 56,
        duration: 1.1,
        ease: EASE.enter,
      });
    },
    { scope: rootRef },
  );

  return (
    <ScreenRoot ref={rootRef} className="flex items-center justify-center">
      <button type="button" onClick={() => navigate('/')} className="cursor-pointer text-left">
        <GlassCard data-animate="panel" className="flex flex-col gap-[46px] px-[80px] py-[80px]">
          <h1 className="font-display text-[72px] leading-[normal] text-white">
            {title.map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="font-body max-w-[520px] text-[18px] leading-[24px] text-white/70">
            Esta tela ainda não foi desenhada. Toque em qualquer lugar para voltar ao início.
          </p>

          <CtaLink label="Voltar" accent={accent} />
        </GlassCard>
      </button>
    </ScreenRoot>
  );
}
