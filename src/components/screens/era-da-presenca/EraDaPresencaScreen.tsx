'use client';

import { useRef, useState } from 'react';

import { useScene } from '@/components/background/sceneStore';
import { ScreenRoot } from '@/components/screens/ScreenRoot';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ERA_DA_PRESENCA_SCENE } from '@/config/scene';
import {
  ERA_DA_PRESENCA_TITLE,
  ERA_TIMELINE_ITEMS,
  ERA_TIMELINE_SUBTITLE,
  FUNDAMENTOS_ITEMS,
  FUNDAMENTOS_SUBTITLE,
} from '@/content/era-da-presenca';
import { EASE, gsap, useGSAP } from '@/lib/motion/gsap';
import { EraTimelinePanel } from './EraTimelinePanel';
import { FundamentosPanel } from './FundamentosPanel';

/** Node 2132:838/1096/1167/906/967/1028 — titulo, igual nas 6 telas. */
const TITLE_TOP = 160;
/** Node 2132:840 e variantes — largura do bloco de titulo + subtitulo centralizado. */
const SUBTITLE_WIDTH = 930;

/** Node 2132:818 e variantes — logotipo no rodape. */
const LOGO_WIDTH = 201;
const LOGO_HEIGHT = 48;
const LOGO_TOP = 958;

const LAST_ERA_INDEX = ERA_TIMELINE_ITEMS.length - 1;

/**
 * TELA 2.3 - ERA DA PRESENÇA (node 2132).
 *
 * Stepper de 2 etapas: a trilha horizontal com as 3 eras do marketing (node
 * 2132:804/1062/1133 — navegavel por toque, setas, scroll ou "PRÓXIMO") e a
 * etapa final com os 3 fundamentos da era atual (node 2132:875/936/997 —
 * navegavel por toque direto nos numeros, so com "ANTERIOR"). Titulo,
 * subtitulo, cabecalho e logotipo sao fixos; so o conteudo central troca.
 */
export function EraDaPresencaScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);

  const [activeStep, setActiveStep] = useState(0);
  const isFundamentos = activeStep > LAST_ERA_INDEX;

  useScene(ERA_DA_PRESENCA_SCENE);

  const transitionTo = (nextStep: number) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    gsap.to(contentRef.current, {
      autoAlpha: 0,
      y: 16,
      duration: 0.25,
      ease: EASE.exit,
      onComplete: () => {
        setActiveStep(nextStep);
        gsap.fromTo(
          contentRef.current,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: EASE.enter,
            onComplete: () => {
              isTransitioning.current = false;
            },
          },
        );
      },
    });
  };

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: EASE.enter } })
        .from('[data-animate="header"]', { autoAlpha: 0, y: -32, duration: 1 })
        .from('[data-animate="title"]', { autoAlpha: 0, y: 32, duration: 1 }, '-=0.7')
        .from('[data-animate="content"]', { autoAlpha: 0, y: 32, duration: 1 }, '-=0.6')
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
        data-animate="title"
        className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-[24px] text-center text-white"
        style={{ top: TITLE_TOP, width: SUBTITLE_WIDTH }}
      >
        <h1 className="font-display text-[60px] leading-[normal] font-bold whitespace-nowrap">
          {ERA_DA_PRESENCA_TITLE}
        </h1>
        <p className="font-body text-[24px] leading-[1.4]">
          {isFundamentos ? FUNDAMENTOS_SUBTITLE : ERA_TIMELINE_SUBTITLE}
        </p>
      </div>

      {/* `pointer-events-none` evita que esse wrapper — que precisa cobrir a
       * tela toda para as transicoes internas funcionarem — capture toques
       * em areas vazias e bloqueie o cabecalho; cada elemento interativo
       * dentro dele reabilita com `pointer-events-auto`. */}
      <div ref={contentRef} data-animate="content" className="pointer-events-none absolute inset-0">
        {isFundamentos ? (
          <FundamentosPanel items={FUNDAMENTOS_ITEMS} onPrevious={() => transitionTo(LAST_ERA_INDEX)} />
        ) : (
          <EraTimelinePanel
            items={ERA_TIMELINE_ITEMS}
            activeIndex={activeStep}
            onStepChange={setActiveStep}
            onAdvancePastEnd={() => transitionTo(LAST_ERA_INDEX + 1)}
          />
        )}
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
