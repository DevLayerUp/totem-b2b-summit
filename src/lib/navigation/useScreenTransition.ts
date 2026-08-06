'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';

import { EASE, gsap } from '@/lib/motion/gsap';

/** Marca a raiz da tela atual, alvo das animacoes de saida. */
export const SCREEN_ROOT_SELECTOR = '[data-screen-root]';

/**
 * Navega entre telas animando a saida da tela atual antes de trocar a rota.
 *
 * O fundo WebGL nao participa: ele vive no layout e continua correndo. Quem
 * entra e sai e apenas a camada de conteudo, o que mantem a sensacao de um
 * unico ambiente continuo.
 */
export function useScreenTransition(): (href: string) => void {
  const router = useRouter();
  const isNavigating = useRef(false);

  return useCallback(
    (href: string) => {
      if (isNavigating.current) return;
      isNavigating.current = true;

      const root = document.querySelector(SCREEN_ROOT_SELECTOR);

      if (!root) {
        router.push(href);
        return;
      }

      gsap.to(root, {
        autoAlpha: 0,
        y: -48,
        duration: 0.5,
        ease: EASE.exit,
        onComplete: () => router.push(href),
      });
    },
    [router],
  );
}
