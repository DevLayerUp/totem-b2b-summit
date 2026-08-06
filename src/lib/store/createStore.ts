'use client';

import { useSyncExternalStore } from 'react';

export interface Store<T> {
  /** Leitura imperativa, segura para usar dentro de loops de render. */
  get: () => T;
  set: (next: T | ((previous: T) => T)) => void;
  subscribe: (listener: () => void) => () => void;
}

/**
 * Store minimo e sem dependencias, usado onde o estado precisa ser lido tanto
 * pelo React quanto por loops imperativos (GSAP e o render loop do WebGL).
 *
 * Existe para que o loop de render leia o estado com `get()` sem provocar
 * re-render, enquanto a UI observa o mesmo dado por `useStore`.
 */
export function createStore<T>(initialState: T): Store<T> {
  let state = initialState;
  const listeners = new Set<() => void>();

  return {
    get: () => state,
    set: (next) => {
      const resolved = typeof next === 'function' ? (next as (previous: T) => T)(state) : next;
      if (Object.is(resolved, state)) return;

      state = resolved;
      for (const listener of listeners) listener();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

export function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}
