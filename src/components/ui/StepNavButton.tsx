'use client';

import Image from 'next/image';
import { type CSSProperties, useRef } from 'react';

import { EASE, gsap } from '@/lib/motion/gsap';

/** Mesmo icone diagonal do "VOLTAR" (node 2026:100), sem o cartao de vidro. */
const ICON_BOX = 25.456;

interface StepNavButtonProps {
  label: string;
  /** "next" reaproveita a rotacao do icone de "PRÓXIMO"; "prev" a de "VOLTAR"/"ANTERIOR". */
  direction: 'next' | 'prev';
  onClick: () => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * Controle "PRÓXIMO"/"ANTERIOR" dos sliders internos (node 2100:1491 e
 * 2100:1656): rotulo e seta, sem cartao de vidro por baixo — flutua direto
 * sobre o fundo, diferente dos botoes do `ScreenHeader`.
 */
export function StepNavButton({
  label,
  direction,
  onClick,
  className,
  style,
}: StepNavButtonProps) {
  const isNext = direction === 'next';
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handlePress = () => {
    gsap.to(buttonRef.current, { scale: 0.95, duration: 0.3, ease: EASE.press });
  };

  const handleRelease = () => {
    gsap.to(buttonRef.current, { scale: 1, duration: 0.5, ease: EASE.press });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onPointerDown={handlePress}
      onPointerUp={handleRelease}
      onPointerCancel={handleRelease}
      onPointerLeave={handleRelease}
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-[24px] ${isNext ? '' : 'flex-row-reverse'} ${className ?? ''}`}
      style={style}
    >
      <span className="font-body w-[125.309px] text-center text-[20px] font-bold uppercase text-white">
        {label}
      </span>
      <span
        className="flex items-center justify-center"
        style={{ width: ICON_BOX, height: ICON_BOX }}
      >
        <Image
          aria-hidden
          src="/assets/icons/arrow-diagonal.svg"
          alt=""
          width={18}
          height={18}
          style={{ transform: `rotate(${isNext ? 45 : -135}deg)` }}
        />
      </span>
    </button>
  );
}
