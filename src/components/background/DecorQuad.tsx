'use client';

import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { type Mesh, type MeshBasicMaterial, SRGBColorSpace, TextureLoader } from 'three';

import { useStageMetrics } from '@/components/stage/stageStore';
import type { SceneDecor } from '@/config/scene';
import { motionTargets } from '@/lib/motion/motionTargets';

/** Deslocamento maximo do parallax, em px de design. */
const PARALLAX_RANGE = 46;

interface DecorQuadProps {
  decor: SceneDecor;
  renderOrder: number;
}

/**
 * Uma esfera ou anel do Figma renderizado como quad texturizado.
 *
 * Fica na cena WebGL, e nao no DOM, para dividir o mesmo loop de animacao da
 * nebulosa. A posicao vem em coordenadas de design e passa pela mesma escala do
 * TotemStage, entao o elemento permanece alinhado ao layout em qualquer tela.
 */
export function DecorQuad({ decor, renderOrder }: DecorQuadProps) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshBasicMaterial>(null);

  const loadedTexture = useLoader(TextureLoader, decor.texture);
  const { scale, offsetX, offsetY } = useStageMetrics();
  const { width: viewportWidth, height: viewportHeight } = useThree((state) => state.size);

  // As texturas sao arte colorida: sem marcar o espaco de cor elas seriam
  // tratadas como dados lineares e chegariam lavadas na tela. O clone evita
  // alterar a instancia compartilhada no cache do carregador, e como ele
  // reaproveita o mesmo `source`, a imagem nao e decodificada duas vezes.
  const texture = useMemo(() => {
    const configured = loadedTexture.clone();
    configured.colorSpace = SRGBColorSpace;
    configured.needsUpdate = true;
    return configured;
  }, [loadedTexture]);

  const anchor = useMemo(() => {
    const centerX = offsetX + (decor.x + decor.width / 2) * scale;
    const centerY = offsetY + (decor.y + decor.height / 2) * scale;

    return {
      x: centerX - viewportWidth / 2,
      y: viewportHeight / 2 - centerY,
    };
  }, [decor, offsetX, offsetY, scale, viewportWidth, viewportHeight]);

  useFrame((state) => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    if (!mesh || !material) return;

    const elapsed = state.clock.elapsedTime;
    const phase = (elapsed / decor.driftPeriod) * Math.PI * 2;
    const drift = decor.driftAmplitude * scale;
    const parallax = motionTargets.pointerX * decor.parallaxDepth * PARALLAX_RANGE * scale;
    const parallaxY = motionTargets.pointerY * decor.parallaxDepth * PARALLAX_RANGE * scale;

    mesh.position.x = anchor.x + Math.cos(phase) * drift * 0.6 + parallax;
    mesh.position.y = anchor.y + Math.sin(phase) * drift - parallaxY;

    // Rotacao continua (anel de orbitas) e pulsacao de "respiracao" (esferas).
    // Nenhuma das duas depende de toque: o fundo precisa parecer vivo mesmo
    // com o totem parado, sem ninguem por perto.
    if (decor.rotationSpeed) {
      mesh.rotation.z = elapsed * decor.rotationSpeed * Math.PI * 2;
    }

    const pulse = decor.pulseAmplitude
      ? 1 + decor.pulseAmplitude * Math.sin((elapsed / (decor.pulsePeriod ?? 6)) * Math.PI * 2)
      : 1;

    mesh.scale.set(decor.width * scale * pulse, decor.height * scale * pulse, 1);

    material.opacity = motionTargets.revealProgress;
  });

  return (
    <mesh ref={meshRef} renderOrder={renderOrder} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={0}
        toneMapped={false}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
