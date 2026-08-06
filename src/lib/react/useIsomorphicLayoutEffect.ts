'use client';

import { useEffect, useLayoutEffect } from 'react';

/**
 * `useLayoutEffect` avisa no console durante a prerenderizacao no servidor.
 * Como as medicoes de palco precisam acontecer antes da pintura no cliente,
 * alternamos entre os dois conforme o ambiente.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
