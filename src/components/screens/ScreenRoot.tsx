import type { ReactNode, Ref } from 'react';

interface ScreenRootProps {
  children: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

/**
 * Raiz de uma tela dentro do palco.
 *
 * Ocupa toda a area de design, o que permite posicionar os elementos com as
 * coordenadas absolutas do Figma, e carrega o marcador que a transicao entre
 * telas usa para animar a saida.
 */
export function ScreenRoot({ children, className, ref }: ScreenRootProps) {
  return (
    <div data-screen-root ref={ref} className={`absolute inset-0 ${className ?? ''}`}>
      {children}
    </div>
  );
}
