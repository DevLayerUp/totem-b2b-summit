'use client';

import type { CSSProperties, ReactNode } from 'react';

import { useIsomorphicLayoutEffect } from '@/lib/react/useIsomorphicLayoutEffect';
import { measureStage, stageStore, useStageMetrics } from './stageStore';

interface TotemStageProps {
  children: ReactNode;
}

/**
 * Palco do totem.
 *
 * Os componentes de tela sao escritos em px nas coordenadas de design do Figma
 * (1920x1080 em paisagem). Este componente mede a tela fisica e aplica um
 * unico `transform: scale`, o que mantem a fidelidade pixel a pixel em
 * qualquer resolucao sem reinterpretar medida nenhuma.
 *
 * O palco so aplica escala e centralizacao. Nao usa `filter` nem `opacity`,
 * porque ambos criariam um novo backdrop root e quebrariam o `backdrop-filter`
 * dos cards sobre o fundo WebGL.
 */
export function TotemStage({ children }: TotemStageProps) {
  const { design, scale, orientation, measured } = useStageMetrics();

  useIsomorphicLayoutEffect(() => {
    const measure = () => {
      stageStore.set(measureStage(window.innerWidth, window.innerHeight));
    };

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);

    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
    };
  }, []);

  const stageStyle: CSSProperties = {
    width: design.width,
    height: design.height,
    transform: `translate(-50%, -50%) scale(${scale})`,
  };

  return (
    <div
      data-orientation={orientation}
      data-measured={measured}
      className="fixed inset-0 overflow-hidden data-[measured=false]:invisible"
      style={{ zIndex: 'var(--z-stage)' }}
    >
      <div className="absolute top-1/2 left-1/2 origin-center" style={stageStyle}>
        {children}
      </div>
    </div>
  );
}
