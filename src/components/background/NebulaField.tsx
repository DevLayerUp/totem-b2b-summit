'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Color, type IUniform, type ShaderMaterial, Vector2 } from 'three';

import { motionTargets } from '@/lib/motion/motionTargets';
import { nebulaFragmentShader, nebulaVertexShader } from './shaders/nebula';

interface NebulaUniforms {
  // O three tipa `material.uniforms` como um mapa aberto; a assinatura de
  // indice mantem este formato compativel com ele sem perder os nomes.
  [uniform: string]: IUniform;
  uTime: IUniform<number>;
  uResolution: IUniform<Vector2>;
  uIntensity: IUniform<number>;
  uPointer: IUniform<Vector2>;
  uAccent: IUniform<Color>;
  uAccentStrength: IUniform<number>;
}

function createNebulaUniforms(): NebulaUniforms {
  return {
    uTime: { value: 0 },
    uResolution: { value: new Vector2(1, 1) },
    uIntensity: { value: 1 },
    uPointer: { value: new Vector2(0, 0) },
    uAccent: { value: new Color(0.937, 0.063, 0.494) },
    uAccentStrength: { value: 0 },
  };
}

/**
 * Plano que cobre toda a tela fisica com o campo de estrelas e a nebulosa.
 *
 * Fica atras do palco e ocupa a viewport inteira, e nao a area do palco: em
 * telas fora de 16:9 o conteudo e encaixotado, mas o fundo continua sangrando
 * ate a borda.
 */
export function NebulaField() {
  const materialRef = useRef<ShaderMaterial>(null);
  const { width, height } = useThree((state) => state.size);

  const initialUniforms = useMemo(() => createNebulaUniforms(), []);

  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) return;

    // Os uniforms sao escritos a cada quadro pelo ref do material, e nao por
    // estado do React: sao 60 atualizacoes por segundo que nao devem provocar
    // render nenhum.
    const uniforms = material.uniforms as NebulaUniforms;

    uniforms.uTime.value += delta;
    uniforms.uResolution.value.set(width, height);
    uniforms.uPointer.value.set(motionTargets.pointerX, motionTargets.pointerY);
    uniforms.uIntensity.value = motionTargets.auroraIntensity * motionTargets.revealProgress;
    uniforms.uAccentStrength.value = motionTargets.accentStrength;
    uniforms.uAccent.value.setRGB(
      motionTargets.accent.r,
      motionTargets.accent.g,
      motionTargets.accent.b,
    );
  });

  return (
    <mesh renderOrder={0} frustumCulled={false}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={initialUniforms}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
