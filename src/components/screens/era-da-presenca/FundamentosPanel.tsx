'use client';

import { type CSSProperties, useRef, useState } from 'react';

import { GlassCard } from '@/components/ui/GlassCard';
import { StepNavButton } from '@/components/ui/StepNavButton';
import { ACCENTS } from '@/config/accents';
import { FUNDAMENTOS_CARD, type FundamentoItem } from '@/content/era-da-presenca';
import { EASE, gsap } from '@/lib/motion/gsap';
import { focusAccent, releaseAccent } from '@/lib/motion/motionTargets';

/** Node 2132:917/920/923 — blocos numerados, sempre visiveis lado a lado. */
const TILE_TOP = 375;
const TILE_SIZE = 60;
const TILE_LEFTS = [175, 290, 405] as const;

/** Node 2132:912/910 — titulo + descricao do fundamento ativo. */
const CONTENT_LEFT = 175;
const CONTENT_TOP = 505;
const HEADING_WIDTH = 759;
const BODY_WIDTH = 613;

/** Node 2132:927 — paragrafo fixo acima do cartao. */
const PARAGRAPH_LEFT = 1138;
const PARAGRAPH_TOP = 426;
const PARAGRAPH_WIDTH = 580;

/** Node 2132:926 — cartao fixo, mesma posicao da 1a etapa. */
const CARD_LEFT = 1138;
const CARD_TOP = 555;
const CARD_WIDTH = 607;
const CARD_HEIGHT = 244;
const LEAD_LEFT = 31;
const LEAD_TOP = 36;
const LEAD_WIDTH = 536;
const EMPHASIS_LEFT = 31;
const EMPHASIS_TOP = 136;
const EMPHASIS_WIDTH = 549;

/** Node 2132:933 — botao "ANTERIOR", mesma posicao das demais telas de detalhe. */
const PREV_LEFT = 1570;
const PREV_TOP = 844;

function hexToRgba(hex: string, alpha: number): string {
  const value = Number.parseInt(hex.replace('#', ''), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface NumberTileProps {
  fundamento: FundamentoItem;
  active: boolean;
  onSelect: () => void;
  style: CSSProperties;
}

/**
 * Bloco numerado (1/2/3) do node 2132:917 e variantes.
 *
 * Ao contrario das letras do Brand New Layer, aqui TODOS os blocos carregam
 * vidro o tempo todo — so o tom muda: neutro quando inativo, tingido com o
 * acento do fundamento quando ativo.
 */
function NumberTile({ fundamento, active, onSelect, style }: NumberTileProps) {
  const tileRef = useRef<HTMLButtonElement>(null);
  const accentHex = ACCENTS[fundamento.accent].hex;

  const handlePress = () => {
    focusAccent(accentHex);
    gsap.to(tileRef.current, { scale: 0.92, duration: 0.3, ease: EASE.press });
  };

  const handleRelease = () => {
    releaseAccent();
    gsap.to(tileRef.current, { scale: 1, duration: 0.5, ease: EASE.press });
  };

  return (
    <button
      ref={tileRef}
      type="button"
      aria-current={active}
      onPointerDown={handlePress}
      onPointerUp={handleRelease}
      onPointerCancel={handleRelease}
      onPointerLeave={handleRelease}
      onClick={onSelect}
      className="pointer-events-auto absolute cursor-pointer"
      style={style}
    >
      <GlassCard
        rounded={8}
        className="flex h-full w-full items-center justify-center"
        style={
          active
            ? { backgroundColor: hexToRgba(accentHex, 0.1), borderColor: hexToRgba(accentHex, 0.4) }
            : undefined
        }
      >
        <span
          className="font-body text-[30px] font-bold"
          style={{ color: active ? hexToRgba(accentHex, 0.9) : 'rgba(255, 255, 255, 0.9)' }}
        >
          {fundamento.number}
        </span>
      </GlassCard>
    </button>
  );
}

interface FundamentosPanelProps {
  items: readonly FundamentoItem[];
  onPrevious: () => void;
}

/**
 * Etapa final do node 2132 (fundamentos da era): 3 blocos numerados
 * navegaveis por toque direto, sem "PRÓXIMO" — so "ANTERIOR" volta para a
 * ultima era da trilha.
 */
export function FundamentosPanel({ items, onPrevious }: FundamentosPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const isLocked = useRef(false);
  const item = items[activeIndex] ?? items[0];
  if (!item) return null;

  const selectIndex = (index: number) => {
    if (index === activeIndex || isLocked.current) return;
    isLocked.current = true;

    gsap.to(panelRef.current, {
      autoAlpha: 0,
      y: 12,
      duration: 0.22,
      ease: EASE.exit,
      onComplete: () => {
        setActiveIndex(index);
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

  return (
    <>
      {items.map((fundamento, index) => (
        <NumberTile
          key={fundamento.id}
          fundamento={fundamento}
          active={index === activeIndex}
          onSelect={() => selectIndex(index)}
          style={{
            left: TILE_LEFTS[index] ?? 0,
            top: TILE_TOP,
            width: TILE_SIZE,
            height: TILE_SIZE,
          }}
        />
      ))}

      <div
        ref={panelRef}
        className="absolute flex flex-col items-start gap-[38px]"
        style={{ left: CONTENT_LEFT, top: CONTENT_TOP, width: HEADING_WIDTH }}
      >
        <h2
          className={`font-body text-[48px] leading-[1.4] font-bold uppercase ${ACCENTS[item.accent].textClassName}`}
        >
          {item.heading}
        </h2>
        <p className="font-body text-[24px] leading-[1.4] text-white" style={{ width: BODY_WIDTH }}>
          {item.description}
        </p>
      </div>

      <p
        className="font-body absolute text-[20px] leading-[1.4] text-white"
        style={{ left: PARAGRAPH_LEFT, top: PARAGRAPH_TOP, width: PARAGRAPH_WIDTH }}
      >
        {FUNDAMENTOS_CARD.intro}
      </p>

      <div className="absolute" style={{ left: CARD_LEFT, top: CARD_TOP, width: CARD_WIDTH, height: CARD_HEIGHT }}>
        <GlassCard className="h-full w-full">
          <p
            className="font-body absolute text-[20px] leading-[1.4] text-white"
            style={{ left: LEAD_LEFT, top: LEAD_TOP, width: LEAD_WIDTH }}
          >
            {FUNDAMENTOS_CARD.lead}
          </p>
          <p
            className="font-body absolute text-[24px] leading-[1.4] font-bold text-white uppercase"
            style={{ left: EMPHASIS_LEFT, top: EMPHASIS_TOP, width: EMPHASIS_WIDTH }}
          >
            {FUNDAMENTOS_CARD.emphasis}
          </p>
        </GlassCard>
      </div>

      <StepNavButton
        label="Anterior"
        direction="prev"
        onClick={onPrevious}
        className="pointer-events-auto absolute"
        style={{ left: PREV_LEFT, top: PREV_TOP }}
      />
    </>
  );
}
