'use client';

import { useRef, useState } from 'react';

import { useScene } from '@/components/background/sceneStore';
import { ScreenRoot } from '@/components/screens/ScreenRoot';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { CONSTELACAO_MARKETING_SCENE } from '@/config/scene';
import {
  CONSTELACAO_MARKETING_STATS,
  CONSTELACAO_MARKETING_SUBTITLE,
  CONSTELACAO_MARKETING_TITLE,
} from '@/content/constelacao-marketing';
import { EASE, gsap, useGSAP } from '@/lib/motion/gsap';
import { BioPanel } from './BioPanel';
import { StatSliderPanel } from './StatSliderPanel';

/** Node 2100:1480/1481 — titulo, igual nas 4 etapas. */
const TITLE_TOP = 160;
/** Node 2100:1482 — largura do bloco de titulo + subtitulo centralizado. */
const SUBTITLE_WIDTH = 1250;

/** Node 2100:1456 — logotipo no rodape, mesma posicao das demais telas de detalhe. */
const LOGO_WIDTH = 201;
const LOGO_HEIGHT = 48;
const LOGO_TOP = 958;

const LAST_STAT_INDEX = CONSTELACAO_MARKETING_STATS.length - 1;

/**
 * TELA 2.2 - CONSTELAÇÃO DE MARKETING (node 2100).
 *
 * Um unico stepper de 4 etapas: os 3 slides de estatistica (node
 * 2100:1443/1494/1543 — navegaveis por toque no marcador, scroll ou pelo
 * botao "PRÓXIMO") e a etapa final de bio/video (node 2100:1602, com
 * "ANTERIOR"). O titulo, subtitulo, cabecalho e logotipo sao fixos; só o
 * conteudo central troca.
 */
export function ConstelacaoMarketingScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);

  const [activeStep, setActiveStep] = useState(0);
  const isBio = activeStep > LAST_STAT_INDEX;

  useScene(CONSTELACAO_MARKETING_SCENE);

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
          {CONSTELACAO_MARKETING_TITLE}
        </h1>
        <p className="font-body text-[20px] leading-[1.4]">{CONSTELACAO_MARKETING_SUBTITLE}</p>
      </div>

      {/* `pointer-events-none` evita que esse wrapper — que precisa cobrir a
       * tela toda para as transicoes internas funcionarem — capture toques
       * em areas vazias e bloqueie o cabecalho; cada elemento interativo
       * dentro dele reabilita com `pointer-events-auto`. */}
      <div
        ref={contentRef}
        data-animate="content"
        className="pointer-events-none absolute inset-0"
      >
        {isBio ? (
          <BioPanel onPrevious={() => transitionTo(LAST_STAT_INDEX)} />
        ) : (
          <StatSliderPanel
            stats={CONSTELACAO_MARKETING_STATS}
            activeIndex={activeStep}
            onStepChange={setActiveStep}
            onAdvancePastEnd={() => transitionTo(LAST_STAT_INDEX + 1)}
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
