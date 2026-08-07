'use client';

import Image from 'next/image';

import { GlassCard } from '@/components/ui/GlassCard';
import { useScreenTransition } from '@/lib/navigation/useScreenTransition';

/** Diagonal do icone de 18x18 rotacionado -135deg (node 2026:100). */
const BACK_ICON_BOX = 25.456;

interface ScreenHeaderProps {
  /** Destino do botao "Voltar". A Home usa sempre "/". */
  backHref: string;
}

/**
 * Cabecalho de navegacao das telas internas: um botao "Voltar" em pilula e um
 * botao circular para a Home, ambos em vidro, no canto superior direito.
 *
 * Nao ha estado de hover: e touch, e o retorno visual e so o "press" do
 * proprio botao (herdado do :active nativo), sem depender do dedo continuar
 * em cima do elemento.
 */
export function ScreenHeader({ backHref }: ScreenHeaderProps) {
  const navigate = useScreenTransition();

  return (
    <>
      <button
        type="button"
        onClick={() => navigate(backHref)}
        className="absolute cursor-pointer"
        style={{ left: 1559, top: 47 }}
      >
        <GlassCard
          rounded={100}
          className="flex items-center gap-[14px] pt-[18px] pr-[43px] pb-[14px] pl-[40px]"
        >
          <span
            className="flex items-center justify-center"
            style={{ width: BACK_ICON_BOX, height: BACK_ICON_BOX }}
          >
            <Image
              aria-hidden
              src="/assets/icons/arrow-diagonal.svg"
              alt=""
              width={18}
              height={18}
              style={{ transform: 'rotate(-135deg)' }}
            />
          </span>
          <span className="font-display text-[25px] font-bold tracking-[3px] whitespace-nowrap text-white">
            VOLTAR
          </span>
        </GlassCard>
      </button>

      <button
        type="button"
        onClick={() => navigate('/')}
        className="absolute cursor-pointer"
        style={{ left: 1810, top: 40 }}
      >
        <GlassCard rounded={100} className="flex items-center justify-center p-[20px]">
          <Image aria-hidden src="/assets/icons/home.svg" alt="Início" width={32} height={32} />
        </GlassCard>
      </button>
    </>
  );
}
