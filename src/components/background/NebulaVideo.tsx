'use client';

import { useEffect, useRef } from 'react';

const VIDEO_SRC = '/assets/videos/nebula.mp4';

/**
 * Janela de crossfade antes do fim do clipe, em segundos.
 *
 * O clipe fonte nao fecha sozinho: o ultimo quadro nao bate com o primeiro,
 * entao um corte direto (currentTime volta a 0) apareceria como um salto.
 */
const CROSSFADE_SECONDS = 0.9;

/**
 * Video da nebulosa exportado do Figma, em loop perfeitamente suave.
 *
 * Dois elementos <video> tocam o mesmo clipe alternadamente: enquanto um
 * termina, o outro ja comeca do zero por baixo, e a opacidade faz um dissolve
 * entre os dois durante a janela de crossfade. O resultado e um loop continuo
 * sem corte perceptivel, mesmo o clipe fonte nao sendo perfeitamente ciclico.
 *
 * Fica atras do canvas WebGL (que agora so desenha estrelas e o realce de
 * toque, com fundo transparente) e da UI do palco.
 */
export function NebulaVideo() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    let activeVideo = videoA;
    let idleVideo = videoB;
    let crossfading = false;
    let frameId = 0;

    videoA.currentTime = 0;
    videoB.currentTime = 0;
    videoA.style.opacity = '1';
    videoB.style.opacity = '0';
    void videoA.play().catch(() => {});

    const tick = () => {
      const duration = activeVideo.duration;

      if (
        !crossfading &&
        Number.isFinite(duration) &&
        activeVideo.currentTime >= duration - CROSSFADE_SECONDS
      ) {
        crossfading = true;
        idleVideo.currentTime = 0;
        void idleVideo.play().catch(() => {});
      }

      if (crossfading && Number.isFinite(duration)) {
        const remaining = duration - activeVideo.currentTime;
        const progress = 1 - Math.max(0, Math.min(1, remaining / CROSSFADE_SECONDS));
        idleVideo.style.opacity = String(progress);
        activeVideo.style.opacity = String(1 - progress);

        if (remaining <= 0) {
          activeVideo.pause();
          activeVideo.style.opacity = '0';
          idleVideo.style.opacity = '1';
          [activeVideo, idleVideo] = [idleVideo, activeVideo];
          crossfading = false;
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      videoA.pause();
      videoB.pause();
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <video
        ref={videoARef}
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        muted
        autoPlay
        loop={false}
        playsInline
        preload="auto"
      />
      <video
        ref={videoBRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        muted
        loop={false}
        playsInline
        preload="auto"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
