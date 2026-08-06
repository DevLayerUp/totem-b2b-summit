'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';

import { useGSAP } from '@/lib/motion/gsap';
import { revealBackground, setPointer } from '@/lib/motion/motionTargets';
import { DecorQuad } from './DecorQuad';
import { NebulaField } from './NebulaField';
import { useActiveScene } from './sceneStore';

/**
 * Fundo persistente do totem.
 *
 * Montado no layout, fora da arvore de rotas: navegar entre telas nunca
 * remonta o canvas, entao a nebulosa continua correndo sem reinicializar o
 * contexto WebGL nem recarregar texturas.
 *
 * A camera e ortografica com 1 unidade = 1 pixel de tela e origem no centro,
 * o que permite posicionar os decorativos direto em coordenadas de design.
 */
export function SpaceBackground() {
  const scene = useActiveScene();

  useGSAP(() => {
    revealBackground();
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setPointer(
        (event.clientX / window.innerWidth) * 2 - 1,
        (event.clientY / window.innerHeight) * 2 - 1,
      );
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div aria-hidden className="fixed inset-0" style={{ zIndex: 'var(--z-background)' }}>
      <Canvas
        flat
        orthographic
        camera={{ position: [0, 0, 100], zoom: 1, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      >
        <NebulaField />
        <Suspense fallback={null}>
          {scene.decor.map((decor, index) => (
            <DecorQuad key={decor.id} decor={decor} renderOrder={index + 1} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
