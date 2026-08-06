'use client';

import { useEffect } from 'react';

const IS_KIOSK = process.env.NEXT_PUBLIC_KIOSK === 'true';

/**
 * Comportamentos que so fazem sentido num totem em operacao.
 *
 * O navegador roda em modo kiosk, sem teclado e sem mouse: menu de contexto,
 * zoom por gesto e arrastar de imagem sao acidentes de toque, nunca intencao
 * do visitante.
 */
export function KioskGuards() {
  useEffect(() => {
    const preventDefault = (event: Event) => event.preventDefault();

    document.addEventListener('contextmenu', preventDefault);
    // Gesto de pinca no WebKit, que escapa do `touch-action: manipulation`.
    document.addEventListener('gesturestart', preventDefault);
    document.addEventListener('dragstart', preventDefault);

    return () => {
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('dragstart', preventDefault);
    };
  }, []);

  useEffect(() => {
    if (!IS_KIOSK) return;

    document.body.dataset.kiosk = 'true';
    return () => {
      delete document.body.dataset.kiosk;
    };
  }, []);

  return null;
}
