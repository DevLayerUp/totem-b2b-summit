'use client';

import Image from 'next/image';
import { type WheelEvent, useRef } from 'react';

import { GlassCard } from '@/components/ui/GlassCard';
import { StepNavButton } from '@/components/ui/StepNavButton';
import { ERA_TIMELINE_CARD, type EraTimelineItem } from '@/content/era-da-presenca';
import { EASE, gsap } from '@/lib/motion/gsap';

/** Node 2132:842 — bloco de titulo + descricao da era ativa. */
const CONTENT_LEFT = 175;
const CONTENT_TOP = 525;
const CONTENT_WIDTH = 450;
const DESCRIPTION_WIDTH = 397;

/** Node 2132:860 — foto ilustrativa da era ativa. */
const IMAGE_LEFT = 658;
const IMAGE_TOP = 528;
const IMAGE_WIDTH = 291;
const IMAGE_HEIGHT = 271;

/** Node 2132:861/862/863 — rotulos das 3 eras acima da trilha. */
const LABEL_TOP = 375;
/** Node 2132:868/808/809 — trilha horizontal, eixo vertical de referencia
 * para centralizar os marcadores e o brilho (no Figma os 2 ficam alguns
 * pixels abaixo da linha — inconsistencia de autoria — entao aqui os 3
 * ficam concentricos de proposito). */
const LINE_TOP = 437;
/** Node 2132:865/866/867 — marcadores das 3 eras, sempre visiveis. */
const DOT_SIZE = 18;
const DOT_TOP = LINE_TOP - DOT_SIZE / 2;
/** Node 2132:864 — brilho atras do marcador ativo. */
const RING_SIZE = 42;
const RING_TOP = LINE_TOP - RING_SIZE / 2;
/** Centro (x) de cada marcador, medido no Figma — o espacamento nao e perfeitamente
 * uniforme entre as 3 eras (autoria manual), entao os 3 centros ficam fixos aqui. */
const DOT_CENTERS = [196, 504, 823.5] as const;

/** Node 2132:869/872 — setas de navegacao entre eras. */
const ARROW_PREV_LEFT = 900;
const ARROW_NEXT_LEFT = 923.234;
const ARROW_TOP = 425;
const ARROW_SIZE = 24;

/** Node 2132:807 — cartao fixo do lado direito, igual nas 3 eras. */
const CARD_LEFT = 1138;
const CARD_TOP = 555;
const CARD_WIDTH = 607;
const CARD_HEIGHT = 244;
const QUOTE_LEFT = 29;
const QUOTE_TOP = 39;
const QUOTE_WIDTH = 549;
const FOOTNOTE_LEFT = 26;
const FOOTNOTE_TOP = 182;
const FOOTNOTE_WIDTH = 536;

/** Node 2132:847 — paragrafo fixo acima do cartao. */
const PARAGRAPH_LEFT = 1138;
const PARAGRAPH_TOP = 375;
const PARAGRAPH_WIDTH = 607;

/** Node 2132:853 — botao "PRÓXIMO". */
const NEXT_LEFT = 1584.936;
const NEXT_TOP = 844;

/** Limiar de deslocamento para o scroll do mouse/trackpad contar como 1 passo. */
const WHEEL_THRESHOLD = 24;

interface EraTimelinePanelProps {
  items: readonly EraTimelineItem[];
  activeIndex: number;
  onStepChange: (index: number) => void;
  /** Avanca para alem da ultima era (abre a etapa dos fundamentos). */
  onAdvancePastEnd: () => void;
}

/**
 * Lado esquerdo navegavel (3 eras, node 2132:804/1062/1133) + cartao fixo do
 * lado direito com o botao "PRÓXIMO".
 *
 * Ao contrario da trilha vertical da Constelação de Marketing, aqui os 3
 * marcadores ficam sempre visiveis lado a lado (como abas), entao a
 * navegacao aceita toque direto em qualquer marcador/rotulo, as setas
 * dedicadas, scroll (roda do mouse ou arraste) e o botao "PRÓXIMO".
 */
export function EraTimelinePanel({
  items,
  activeIndex,
  onStepChange,
  onAdvancePastEnd,
}: EraTimelinePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isLocked = useRef(false);
  const item = items[activeIndex] ?? items[0];
  if (!item) return null;

  const goTo = (index: number) => {
    if (index === activeIndex || index < 0 || index > items.length - 1 || isLocked.current) return;
    isLocked.current = true;

    gsap.to(panelRef.current, {
      autoAlpha: 0,
      y: 12,
      duration: 0.22,
      ease: EASE.exit,
      onComplete: () => {
        onStepChange(index);
        gsap.fromTo(
          panelRef.current,
          { autoAlpha: 0, y: 12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: EASE.enter,
            onComplete: () => {
              isLocked.current = false;
            },
          },
        );
      },
    });
  };

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      goTo(activeIndex + 1);
    } else {
      onAdvancePastEnd();
    }
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < WHEEL_THRESHOLD) return;
    if (delta > 0) {
      handleNext();
    } else {
      goTo(activeIndex - 1);
    }
  };

  return (
    <>
      <div
        className="pointer-events-auto absolute top-0 left-0 h-full w-[960px]"
        onWheel={handleWheel}
      >
        {items.map((era, index) => {
          const isActive = index === activeIndex;
          const centerX = DOT_CENTERS[index] ?? DOT_CENTERS[0];

          return (
            <button
              key={era.id}
              type="button"
              aria-label={era.label}
              aria-current={isActive}
              onClick={() => goTo(index)}
              className="absolute -translate-x-1/2 cursor-pointer"
              style={{ left: centerX, top: LABEL_TOP }}
            >
              <span
                className={`font-body block text-[20px] leading-[1.4] whitespace-nowrap uppercase ${
                  isActive ? 'font-bold text-accent-yellow' : 'font-normal text-white'
                }`}
              >
                {era.label}
              </span>
            </button>
          );
        })}

        <span
          className="absolute h-px bg-white/30"
          style={{
            left: DOT_CENTERS[0],
            top: LINE_TOP,
            width: (DOT_CENTERS[DOT_CENTERS.length - 1] ?? 0) - (DOT_CENTERS[0] ?? 0),
          }}
        />

        {DOT_CENTERS.map((centerX, index) => (
          <div key={index}>
            {index === activeIndex ? (
              <span
                className="animate-pulse absolute rounded-full bg-accent-yellow/20"
                style={{
                  left: centerX - RING_SIZE / 2,
                  top: RING_TOP,
                  width: RING_SIZE,
                  height: RING_SIZE,
                }}
              />
            ) : null}
            <button
              type="button"
              aria-hidden
              tabIndex={-1}
              onClick={() => goTo(index)}
              className={`absolute cursor-pointer rounded-full ${
                index === activeIndex ? 'bg-accent-yellow' : 'bg-white'
              }`}
              style={{ left: centerX - DOT_SIZE / 2, top: DOT_TOP, width: DOT_SIZE, height: DOT_SIZE }}
            />
          </div>
        ))}

        <button
          type="button"
          aria-label="Era anterior"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="absolute flex cursor-pointer items-center justify-center disabled:cursor-default disabled:opacity-30"
          style={{ left: ARROW_PREV_LEFT, top: ARROW_TOP, width: ARROW_SIZE, height: ARROW_SIZE }}
        >
          <Image
            aria-hidden
            src="/assets/icons/arrow-right.svg"
            alt=""
            width={ARROW_SIZE}
            height={ARROW_SIZE}
            className="rotate-180"
          />
        </button>
        <button
          type="button"
          aria-label="Próxima era"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === items.length - 1}
          className="absolute flex cursor-pointer items-center justify-center disabled:cursor-default disabled:opacity-30"
          style={{ left: ARROW_NEXT_LEFT, top: ARROW_TOP, width: ARROW_SIZE, height: ARROW_SIZE }}
        >
          <Image aria-hidden src="/assets/icons/arrow-right.svg" alt="" width={ARROW_SIZE} height={ARROW_SIZE} />
        </button>

        <div
          ref={panelRef}
          className="absolute flex flex-col items-start gap-[32px]"
          style={{ left: CONTENT_LEFT, top: CONTENT_TOP, width: CONTENT_WIDTH }}
        >
          <h2
            className="font-body text-[32px] leading-[1.4] font-bold text-white uppercase"
            style={{ whiteSpace: 'pre-line' }}
          >
            {item.heading}
          </h2>
          <p className="font-body text-[20px] leading-[1.4] text-white" style={{ width: DESCRIPTION_WIDTH }}>
            {item.description}
          </p>
        </div>

        <div
          className="absolute overflow-hidden"
          style={{ left: IMAGE_LEFT, top: IMAGE_TOP, width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
        >
          <Image src={item.photo} alt={item.heading} fill className="object-cover" />
        </div>
      </div>

      <p
        className="font-body absolute text-[20px] leading-[1.4] text-white"
        style={{ left: PARAGRAPH_LEFT, top: PARAGRAPH_TOP, width: PARAGRAPH_WIDTH }}
      >
        {ERA_TIMELINE_CARD.intro}
      </p>

      <div className="absolute" style={{ left: CARD_LEFT, top: CARD_TOP, width: CARD_WIDTH, height: CARD_HEIGHT }}>
        <GlassCard className="h-full w-full">
          <p
            className="font-body absolute text-[24px] leading-[1.4] font-bold text-white uppercase"
            style={{ left: QUOTE_LEFT, top: QUOTE_TOP, width: QUOTE_WIDTH }}
          >
            {ERA_TIMELINE_CARD.quote}
          </p>
          <p
            className="font-body absolute text-[20px] leading-[1.4] text-white"
            style={{ left: FOOTNOTE_LEFT, top: FOOTNOTE_TOP, width: FOOTNOTE_WIDTH }}
          >
            {ERA_TIMELINE_CARD.footnote}
          </p>
        </GlassCard>
      </div>

      <StepNavButton
        label="Próximo"
        direction="next"
        onClick={handleNext}
        className="pointer-events-auto absolute"
        style={{ left: NEXT_LEFT, top: NEXT_TOP }}
      />
    </>
  );
}
