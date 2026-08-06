'use client';

import { gsap } from './gsap';

/**
 * Ponte entre a camada de UI (DOM + GSAP) e a cena WebGL.
 *
 * E um objeto mutavel simples, de proposito: o GSAP interpola suas
 * propriedades diretamente e o loop de render as le a cada quadro. Nenhum
 * dos dois passa pelo React, entao um toque num card nao provoca re-render
 * de nada — apenas move numeros que o shader consome.
 */
export interface MotionTargets {
  /** Entrada do fundo, 0..1. Sobe uma unica vez, quando a cena monta. */
  revealProgress: number;
  /** Brilho geral da aurora. 1 e o repouso. */
  auroraIntensity: number;
  /** Ponteiro normalizado em -1..1, alimenta o parallax. */
  pointerX: number;
  pointerY: number;
  /** Quanto a cor de acento do card tocado contamina o fundo, 0..1. */
  accentStrength: number;
  /** Cor de acento ativa, em componentes 0..1 lineares ao sRGB. */
  accent: { r: number; g: number; b: number };
}

export const motionTargets: MotionTargets = {
  revealProgress: 0,
  auroraIntensity: 1,
  pointerX: 0,
  pointerY: 0,
  accentStrength: 0,
  accent: { r: 0.937, g: 0.063, b: 0.494 },
};

function hexToRgbUnit(hex: string): { r: number; g: number; b: number } {
  const value = Number.parseInt(hex.replace('#', ''), 16);
  return {
    r: ((value >> 16) & 255) / 255,
    g: ((value >> 8) & 255) / 255,
    b: (value & 255) / 255,
  };
}

/** Aponta o parallax para uma posicao da tela, em coordenadas normalizadas. */
export function setPointer(x: number, y: number): void {
  gsap.to(motionTargets, {
    pointerX: x,
    pointerY: y,
    duration: 1.1,
    ease: 'power2.out',
    overwrite: 'auto',
  });
}

/** Acende o fundo com a cor do card sob o dedo. */
export function focusAccent(hex: string): void {
  gsap.to(motionTargets.accent, {
    ...hexToRgbUnit(hex),
    duration: 0.5,
    ease: 'power2.out',
    overwrite: 'auto',
  });
  gsap.to(motionTargets, {
    accentStrength: 1,
    auroraIntensity: 1.35,
    duration: 0.5,
    ease: 'power2.out',
    overwrite: 'auto',
  });
}

/** Acende o fundo na primeira montagem da cena. */
export function revealBackground(): gsap.core.Tween {
  return gsap.to(motionTargets, {
    revealProgress: 1,
    duration: 2.4,
    ease: 'power2.out',
  });
}

/** Devolve o fundo ao repouso. */
export function releaseAccent(): void {
  gsap.to(motionTargets, {
    accentStrength: 0,
    auroraIntensity: 1,
    duration: 0.9,
    ease: 'power2.inOut',
    overwrite: 'auto',
  });
}
