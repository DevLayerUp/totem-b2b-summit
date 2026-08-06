import type { ComponentPropsWithRef } from 'react';

import { ACCENTS, type AccentName } from '@/config/accents';

interface CtaLinkProps extends ComponentPropsWithRef<'div'> {
  label: string;
  accent: AccentName;
}

/**
 * Chamada para acao do rodape dos cards: rotulo em caixa alta na cor de acento
 * seguido de um traco de 250px.
 *
 * No Figma o traco e um SVG de 2px com 30% de branco; aqui e um elemento vazio
 * com fundo, o que evita uma requisicao e escala junto com o palco.
 */
export function CtaLink({ label, accent, className, ...props }: CtaLinkProps) {
  return (
    <div {...props} className={`flex items-center gap-[17px] ${className ?? ''}`}>
      <span
        className={`w-[125.309px] text-center text-[20px] font-bold uppercase ${ACCENTS[accent].textClassName}`}
      >
        {label}
      </span>
      <span aria-hidden className="h-[2px] w-[250px] bg-white/30" />
    </div>
  );
}
