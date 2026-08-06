'use client';

import { useRef } from 'react';

import { useScene } from '@/components/background/sceneStore';
import { ScreenRoot } from '@/components/screens/ScreenRoot';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { START_SCENE } from '@/config/scene';
import { START_CARDS } from '@/content/start-screen';
import { EASE, gsap, useGSAP } from '@/lib/motion/gsap';
import { CardOrbitDecoration } from './CardOrbitDecoration';
import { StartCard } from './StartCard';

/** Posicoes dos nodes 2084:336 (logo) e 2084:357 (linha de cards). */
const LOGO_TOP = 150;
const CARDS_TOP = 379;
const CARDS_GAP = 36;

/** TELA 1 - START (node 2084:325). */
export function StartScreen() {
  const rootRef = useRef<HTMLDivElement>(null);

  useScene(START_SCENE);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: EASE.enter } })
        .from('[data-animate="logo"]', { autoAlpha: 0, y: -32, duration: 1.1 })
        .from(
          '[data-animate="card"]',
          { autoAlpha: 0, y: 64, duration: 1.2, stagger: 0.12 },
          '-=0.65',
        );
    },
    { scope: rootRef },
  );

  return (
    <ScreenRoot ref={rootRef}>
      <BrandLogo
        data-animate="logo"
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: LOGO_TOP }}
      />

      <div
        className="absolute left-1/2 flex -translate-x-1/2 items-stretch portrait:flex-col portrait:items-center"
        style={{ top: CARDS_TOP, gap: CARDS_GAP }}
      >
        {START_CARDS.map((content) => (
          <StartCard
            key={content.id}
            content={content}
            decoration={content.id === 'metodologias' ? <CardOrbitDecoration /> : undefined}
          />
        ))}
      </div>
    </ScreenRoot>
  );
}
