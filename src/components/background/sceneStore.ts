'use client';

import { useEffect } from 'react';

import { type Scene, START_SCENE } from '@/config/scene';
import { createStore, useStore } from '@/lib/store/createStore';

/**
 * Cena decorativa ativa.
 *
 * O fundo WebGL vive no layout e sobrevive a navegacao entre telas; e cada
 * tela que declara qual conjunto de esferas e orbitas deve estar em cena.
 */
const sceneStore = createStore<Scene>(START_SCENE);

export function useActiveScene(): Scene {
  return useStore(sceneStore);
}

/** Declara a cena de fundo enquanto a tela estiver montada. */
export function useScene(scene: Scene): void {
  useEffect(() => {
    sceneStore.set(scene);
  }, [scene]);
}
