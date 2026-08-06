import type { NextConfig } from 'next';

/**
 * O totem opera sem rede. Qualquer recurso remoto (imagem, fonte, telemetria)
 * quebraria a aplicacao em campo, entao a otimizacao de imagens remotas fica
 * desligada e todo asset e servido de `public/`.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
