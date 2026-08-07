'use client';

import { useRef } from 'react';

import { useScene } from '@/components/background/sceneStore';
import { ScreenRoot } from '@/components/screens/ScreenRoot';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { METODOLOGIA_DETALHE_SCENE } from '@/config/scene';
import {
  BRAND_NEW_LAYER_INTRO,
  BRAND_NEW_LAYER_STEPS,
  BRAND_NEW_LAYER_SUBTITLE,
  BRAND_NEW_LAYER_TITLE,
} from '@/content/brand-new-layer';
import { EASE, gsap, useGSAP } from '@/lib/motion/gsap';
import { BrandNewLayerLetters } from './BrandNewLayerLetters';

/** Medidas do node 2093:989 (bloco de titulo + conteudo). */
const CONTENT_WIDTH = 1410;
const CONTENT_TOP = 160;
const HEADING_WIDTH = 1010;
const ROW_GAP = 190;
const INTRO_WIDTH = 450;

/** Node 2093:965 — logotipo no rodape, mesmo tamanho da TELA 2. */
const LOGO_WIDTH = 201;
const LOGO_HEIGHT = 48;
const LOGO_TOP = 958;

/** TELA 2.1 - BRAND NEW LAYER (nodes 2093:954, 2112:1814/1934/2032/2130). */
export function BrandNewLayerScreen() {
  const rootRef = useRef<HTMLDivElement>(null);

  useScene(METODOLOGIA_DETALHE_SCENE);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: EASE.enter } })
        .from('[data-animate="header"]', { autoAlpha: 0, y: -32, duration: 1 })
        .from('[data-animate="title"]', { autoAlpha: 0, y: 32, duration: 1 }, '-=0.7')
        .from('[data-animate="intro"]', { autoAlpha: 0, y: 48, duration: 1 }, '-=0.6')
        .from('[data-animate="letters"]', { autoAlpha: 0, y: 48, duration: 1 }, '-=0.85')
        .from('[data-animate="logo"]', { autoAlpha: 0, duration: 0.8 }, '-=0.4');
    },
    { scope: rootRef },
  );

  return (
    <ScreenRoot ref={rootRef}>
      <div data-animate="header">
        <ScreenHeader backHref="/metodologias" />
      </div>

      <div
        className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center portrait:w-[90%]"
        style={{ top: CONTENT_TOP, width: CONTENT_WIDTH, gap: 120 }}
      >
        <div
          data-animate="title"
          className="flex flex-col items-center gap-[24px] text-center text-white"
          style={{ width: HEADING_WIDTH }}
        >
          <h1 className="font-display text-[60px] leading-[normal] font-bold whitespace-nowrap">
            {BRAND_NEW_LAYER_TITLE}
          </h1>
          <p className="font-body w-full text-[24px] leading-[1.4] whitespace-nowrap">
            {BRAND_NEW_LAYER_SUBTITLE}
          </p>
        </div>

        <div className="flex w-full items-start portrait:flex-col" style={{ gap: ROW_GAP }}>
          <div
            data-animate="intro"
            className="font-body flex flex-col items-start gap-[25px] text-[18px] leading-[1.4] text-white"
            style={{ width: INTRO_WIDTH }}
          >
            {BRAND_NEW_LAYER_INTRO.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div data-animate="letters">
            <BrandNewLayerLetters steps={BRAND_NEW_LAYER_STEPS} />
          </div>
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
