import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { SpaceBackground } from '@/components/background/SpaceBackground';
import { IdleReset } from '@/components/kiosk/IdleReset';
import { KioskGuards } from '@/components/kiosk/KioskGuards';
import { TotemStage } from '@/components/stage/TotemStage';
import './globals.css';

export const metadata: Metadata = {
  title: 'Layer Up — Totem B2B Summit',
  description: 'Experiência interativa da Layer Up no B2B Summit.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
};

/**
 * O fundo WebGL fica fora da arvore de rotas de proposito: navegar entre telas
 * troca apenas o conteudo do palco, sem nunca remontar o canvas nem perder o
 * contexto WebGL.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="preload"
          href="/fonts/Montserrat-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Logirent-Bold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SpaceBackground />
        <TotemStage>{children}</TotemStage>
        <KioskGuards />
        <IdleReset />
      </body>
    </html>
  );
}
