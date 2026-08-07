import type { ComponentPropsWithRef } from 'react';

import { ACCENTS, type AccentName } from '@/config/accents';

interface CtaLinkProps extends ComponentPropsWithRef<'div'> {
  label: string;
  accent: AccentName;
  /** Largura do traco. 250px nos cards da TELA 1, 130px nas linhas da TELA 2. */
  lineWidth?: number;
  /** Inverte a ordem visual para "traco, rotulo" (linhas da TELA 2). */
  reverse?: boolean;
}

/**
 * Chamada para acao do rodape dos cards: rotulo em caixa alta na cor de acento
 * e um traco, um ao lado do outro.
 *
 * No Figma o traco e um SVG de 2px com 30% de branco; aqui e um elemento vazio
 * com fundo, o que evita uma requisicao e escala junto com o palco.
 */
export function CtaLink({
  label,
  accent,
  lineWidth = 250,
  reverse = false,
  className,
  ...props
}: CtaLinkProps) {
  return (
    <div
      {...props}
      className={`flex items-center gap-[17px] ${reverse ? 'flex-row-reverse' : ''} ${className ?? ''}`}
    >
      <span
        className={`w-[125.309px] text-center text-[20px] font-bold uppercase ${ACCENTS[accent].textClassName}`}
      >
        {label}
      </span>
      <span aria-hidden className="h-[2px] bg-white/30" style={{ width: lineWidth }} />
    </div>
  );
}
