/**
 * Parametros de operacao do totem em campo.
 */

export type TotemOrientation = 'landscape' | 'portrait';

export interface TotemDesignSize {
  readonly width: number;
  readonly height: number;
}

/**
 * Tamanhos de referencia do layout. Todas as medidas dos componentes sao
 * escritas em px nestas coordenadas, exatamente como no Figma; o TotemStage
 * escala o conjunto para caber na tela fisica.
 *
 * O layout entregue pelo design e o de paisagem. O de retrato existe para o
 * caso do totem ser instalado na vertical e ainda aguarda o layout oficial.
 */
export const TOTEM_DESIGN_SIZES: Record<TotemOrientation, TotemDesignSize> = {
  landscape: { width: 1920, height: 1080 },
  portrait: { width: 1080, height: 1920 },
};

export const KIOSK_CONFIG = {
  /** Tempo sem interacao antes de o totem voltar para a tela inicial. */
  idleTimeoutMs: 90_000,
} as const;
