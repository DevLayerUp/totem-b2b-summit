'use client';

import Image from 'next/image';

import { StepNavButton } from '@/components/ui/StepNavButton';
import { CONSTELACAO_MARKETING_BIO } from '@/content/constelacao-marketing';

/** Node 2100:1662 — foto da Samira Cardoso. */
const PHOTO_LEFT = 174.936;
const PHOTO_TOP = 387;
const PHOTO_WIDTH = 290;
const PHOTO_HEIGHT = 397;

/** Node 2100:1649 — texto biografico ao lado da foto. */
const TEXT_LEFT = 498;
const TEXT_TOP = 386;
const TEXT_WIDTH = 447;

/** Node 2100:1663 — placeholder do video do metodo (ainda sem arquivo final). */
const VIDEO_LEFT = 983;
const VIDEO_TOP = 387;
const VIDEO_WIDTH = 762;
const VIDEO_HEIGHT = 397;

/** Node 2100:1656 — botao "ANTERIOR", volta para o ultimo slide de estatistica. */
const PREV_LEFT = 1570;
const PREV_TOP = 844;

interface BioPanelProps {
  onPrevious: () => void;
}

/** Ultima etapa do stepper (node 2100:1602) — bio da criadora do metodo + video. */
export function BioPanel({ onPrevious }: BioPanelProps) {
  return (
    <>
      <div
        className="absolute overflow-hidden"
        style={{ left: PHOTO_LEFT, top: PHOTO_TOP, width: PHOTO_WIDTH, height: PHOTO_HEIGHT }}
      >
        <Image
          src={CONSTELACAO_MARKETING_BIO.photo}
          alt="Samira Cardoso, CEO e Cofundadora da Layer Up"
          fill
          className="object-cover"
        />
      </div>

      <div
        className="font-body absolute flex flex-col gap-[18px] text-[18px] leading-[1.4] text-white"
        style={{ left: TEXT_LEFT, top: TEXT_TOP, width: TEXT_WIDTH }}
      >
        {CONSTELACAO_MARKETING_BIO.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div
        className="absolute flex items-center justify-center bg-[#d9d9d9]"
        style={{ left: VIDEO_LEFT, top: VIDEO_TOP, width: VIDEO_WIDTH, height: VIDEO_HEIGHT }}
      >
        <p className="font-body px-[40px] text-center text-[18px] text-[#1e1e1e]">
          {CONSTELACAO_MARKETING_BIO.videoPlaceholder}
        </p>
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
