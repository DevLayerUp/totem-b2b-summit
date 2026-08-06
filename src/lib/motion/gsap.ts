'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

/**
 * Ponto unico de registro do GSAP.
 *
 * Todo modulo que anima deve importar `gsap` daqui, nunca de 'gsap'
 * diretamente: registrar plugins mais de uma vez, ou esquecer de registrar
 * `useGSAP`, e a origem classica de timelines duplicadas sob StrictMode.
 */
gsap.registerPlugin(useGSAP, CustomEase);

/** Curvas de aceleracao compartilhadas por todas as telas. */
export const EASE = {
  /** Entrada de elementos: sobe rapido e assenta com suavidade. */
  enter: CustomEase.create('totemEnter', '0.16, 1, 0.3, 1'),
  /** Saida de elementos: acelera para fora sem quicar. */
  exit: CustomEase.create('totemExit', '0.7, 0, 0.84, 0'),
  /** Resposta ao toque: precisa parecer instantanea. */
  press: CustomEase.create('totemPress', '0.34, 1.2, 0.64, 1'),
} as const;

export { gsap, useGSAP };
