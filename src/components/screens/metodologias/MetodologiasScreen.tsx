'use client';

import { useRef } from 'react';

import { useScene } from '@/components/background/sceneStore';
import { ScreenRoot } from '@/components/screens/ScreenRoot';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { ListRow } from '@/components/ui/ListRow';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { METODOLOGIAS_SCENE } from '@/config/scene';
import {
  METODOLOGIA_ITEMS,
  METODOLOGIAS_SUBTITLE,
  METODOLOGIAS_TITLE,
} from '@/content/metodologias-screen';
import { EASE, gsap, useGSAP } from '@/lib/motion/gsap';

/** Medidas do node 2093:718 (bloco de titulo + linhas). */
const CONTENT_WIDTH = 1250;
const CONTENT_TOP = 160;
const ROWS_GAP = 40;

/** Node 2093:697 — logotipo no rodape, menor que o da TELA 1. */
const LOGO_WIDTH = 201;
const LOGO_HEIGHT = 48;
const LOGO_TOP = 958;

/** TELA 2 - METODOLOGIAS (node 2093:670). */
export function MetodologiasScreen() {
  const rootRef = useRef<HTMLDivElement>(null);

  useScene(METODOLOGIAS_SCENE);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: EASE.enter } })
        .from('[data-animate="header"]', { autoAlpha: 0, y: -32, duration: 1 })
        .from('[data-animate="title"]', { autoAlpha: 0, y: 32, duration: 1 }, '-=0.7')
        .from('[data-animate="row"]', { autoAlpha: 0, y: 48, duration: 1, stagger: 0.1 }, '-=0.6')
        .from('[data-animate="logo"]', { autoAlpha: 0, duration: 0.8 }, '-=0.4');
    },
    { scope: rootRef },
  );

  return (
    <ScreenRoot ref={rootRef}>
      <div data-animate="header">
        <ScreenHeader backHref="/" />
      </div>

      <div
        className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center portrait:w-[90%]"
        style={{ top: CONTENT_TOP, width: CONTENT_WIDTH, gap: 96 }}
      >
        <div
          data-animate="title"
          className="flex flex-col items-center gap-[24px] text-center text-white"
        >
          <h1 className="font-display text-[60px] leading-[normal] font-bold whitespace-nowrap">
            {METODOLOGIAS_TITLE}
          </h1>
          <p className="font-body text-[20px] leading-[24px] whitespace-nowrap">
            {METODOLOGIAS_SUBTITLE}
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch" style={{ gap: ROWS_GAP }}>
          {METODOLOGIA_ITEMS.map((item) => (
            <ListRow
              key={item.id}
              title={item.title}
              cta="Descubra"
              accent={item.accent}
              href={item.href}
            />
          ))}
        </div>
      </div>

      <BrandLogo
        data-animate="logo"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: LOGO_TOP }}
      />
    </ScreenRoot>
  );
}
