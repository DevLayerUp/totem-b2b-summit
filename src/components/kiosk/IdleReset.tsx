'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { KIOSK_CONFIG } from '@/config/kiosk';
import { useScreenTransition } from '@/lib/navigation/useScreenTransition';

const HOME_PATH = '/';

/**
 * Devolve o totem a tela inicial depois de um tempo sem toque.
 *
 * Sem isso, o proximo visitante encontra a tela onde o anterior parou.
 */
export function IdleReset() {
  const pathname = usePathname();
  const navigate = useScreenTransition();

  useEffect(() => {
    if (pathname === HOME_PATH) return;

    let timer = 0;

    const restart = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => navigate(HOME_PATH), KIOSK_CONFIG.idleTimeoutMs);
    };

    restart();
    window.addEventListener('pointerdown', restart, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', restart);
    };
  }, [pathname, navigate]);

  return null;
}
