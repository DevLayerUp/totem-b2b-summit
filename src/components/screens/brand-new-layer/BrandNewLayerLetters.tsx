'use client';

import { useRef, useState } from 'react';

import { GlassCard } from '@/components/ui/GlassCard';
import { ACCENTS } from '@/config/accents';
import type { BrandNewLayerStep } from '@/content/brand-new-layer';
import { EASE, gsap } from '@/lib/motion/gsap';
import { focusAccent, releaseAccent } from '@/lib/motion/motionTargets';

/** Medidas do node 2093:788 (bloco de cada letra). */
const TILE_WIDTH = 130;
const TILE_HEIGHT = 146;
const TILE_RADIUS = 16;
const TILE_GAP = 30;

/** Medidas do node 2093:803 (bloco de titulo + paragrafo da etapa ativa). */
const PANEL_WIDTH = 450;

interface LetterTileProps {
  step: BrandNewLayerStep;
  active: boolean;
  onSelect: () => void;
}

/**
 * Um bloco de letra da palavra "LAYER".
 *
 * So a letra ativa carrega o vidro (borda, preenchimento e brilho interno);
 * as demais ficam so com o glifo sobre o fundo, como no Figma — e porque
 * cada `backdrop-blur` custa caro sobre o canvas WebGL, evitamos ter 5 ao
 * mesmo tempo quando so um precisa estar visivel.
 */
function LetterTile({ step, active, onSelect }: LetterTileProps) {
  const tileRef = useRef<HTMLButtonElement>(null);

  const handlePress = () => {
    focusAccent(ACCENTS[step.accent].hex);
    gsap.to(tileRef.current, { scale: 0.94, duration: 0.3, ease: EASE.press });
  };

  const handleRelease = () => {
    releaseAccent();
    gsap.to(tileRef.current, { scale: 1, duration: 0.5, ease: EASE.press });
  };

  const glyph = (
    // A Logirent reserva ~30px de descida abaixo da linha de base num corpo de
    // 119.956px, mas nenhum desses glifos (L, a, Y, e, R) desce da linha de
    // base — sem essa correcao a tinta fica visivelmente acima do centro da
    // caixa (medido via canvas: ascent~84-85, descent~0 de um fontAscent 90 /
    // fontDescent 30).
    <p className="translate-y-[12px] font-display text-[119.956px] leading-[119.956px] font-bold text-white/90">
      {step.letter}
    </p>
  );

  return (
    <button
      ref={tileRef}
      type="button"
      onPointerDown={handlePress}
      onPointerUp={handleRelease}
      onPointerCancel={handleRelease}
      onPointerLeave={handleRelease}
      onClick={onSelect}
      className="flex shrink-0 cursor-pointer flex-col items-start pt-[23px] pb-[3px]"
      style={{ width: TILE_WIDTH, height: TILE_HEIGHT }}
    >
      {active ? (
        <GlassCard
          rounded={TILE_RADIUS}
          className="flex flex-1 w-full flex-col items-center justify-center"
        >
          {glyph}
        </GlassCard>
      ) : (
        <div className="flex flex-1 w-full flex-col items-center justify-center">{glyph}</div>
      )}
    </button>
  );
}

interface BrandNewLayerLettersProps {
  steps: readonly BrandNewLayerStep[];
}

/**
 * Bloco interativo do node 2093:808: as 5 letras de "LAYER" e, abaixo, o
 * titulo + paragrafo da etapa selecionada.
 *
 * Cada tela do Figma e uma variante estatica com uma letra acesa; aqui e uma
 * unica composicao com estado local, ja que o usuario alterna entre as 5 por
 * toque na mesma tela.
 */
export function BrandNewLayerLetters({ steps }: BrandNewLayerLettersProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const activeStep = steps[activeIndex] ?? steps[0];

  if (!activeStep) return null;

  const selectStep = (index: number) => {
    if (index === activeIndex) return;

    gsap.to(panelRef.current, {
      autoAlpha: 0,
      y: 12,
      duration: 0.25,
      ease: EASE.exit,
      onComplete: () => {
        setActiveIndex(index);
        gsap.fromTo(
          panelRef.current,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: EASE.enter },
        );
      },
    });
  };

  return (
    <div className="flex flex-col items-start gap-[80px]" style={{ width: 5 * TILE_WIDTH + 4 * TILE_GAP }}>
      <div className="flex w-full items-center" style={{ gap: TILE_GAP }}>
        {steps.map((step, index) => (
          <LetterTile
            key={step.id}
            step={step}
            active={index === activeIndex}
            onSelect={() => selectStep(index)}
          />
        ))}
      </div>

      <div ref={panelRef} className="flex flex-col items-start gap-[24px]" style={{ width: PANEL_WIDTH }}>
        <h2
          className={`font-display text-[40px] leading-[1.2] font-bold uppercase tracking-[2.4435px] ${ACCENTS[activeStep.accent].textClassName}`}
        >
          {activeStep.heading}
        </h2>
        <div className="flex w-full items-center justify-center pl-[60px]">
          <p className="font-body flex-1 text-[15.735px] leading-[24.065px] font-normal text-white">
            {activeStep.description}
          </p>
        </div>
      </div>
    </div>
  );
}
