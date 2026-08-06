'use client';

import { TOTEM_DESIGN_SIZES, type TotemDesignSize, type TotemOrientation } from '@/config/kiosk';
import { createStore, useStore } from '@/lib/store/createStore';

export interface StageMetrics {
  orientation: TotemOrientation;
  /** Tamanho do layout de referencia, em coordenadas de design. */
  design: TotemDesignSize;
  /** Fator aplicado ao palco para caber na tela fisica. */
  scale: number;
  /** Deslocamento do palco dentro da viewport, em px de tela. */
  offsetX: number;
  offsetY: number;
  viewportWidth: number;
  viewportHeight: number;
  /** Falso ate a primeira medicao no cliente. */
  measured: boolean;
}

const INITIAL_METRICS: StageMetrics = {
  orientation: 'landscape',
  design: TOTEM_DESIGN_SIZES.landscape,
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  viewportWidth: TOTEM_DESIGN_SIZES.landscape.width,
  viewportHeight: TOTEM_DESIGN_SIZES.landscape.height,
  measured: false,
};

/**
 * Metricas do palco. Ficam num store em vez de contexto porque a cena WebGL
 * precisa le-las a cada quadro sem disparar re-render do React.
 */
export const stageStore = createStore<StageMetrics>(INITIAL_METRICS);

export function measureStage(viewportWidth: number, viewportHeight: number): StageMetrics {
  const orientation: TotemOrientation = viewportWidth >= viewportHeight ? 'landscape' : 'portrait';
  const design = TOTEM_DESIGN_SIZES[orientation];
  const scale = Math.min(viewportWidth / design.width, viewportHeight / design.height);

  return {
    orientation,
    design,
    scale,
    offsetX: (viewportWidth - design.width * scale) / 2,
    offsetY: (viewportHeight - design.height * scale) / 2,
    viewportWidth,
    viewportHeight,
    measured: true,
  };
}

export function useStageMetrics(): StageMetrics {
  return useStore(stageStore);
}
