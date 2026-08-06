# Totem B2B Summit — Layer Up

Totem interativo da Layer Up para o B2B Summit. Tela touch de 1920x1080 em modo
kiosk, operando **sem rede**.

Design de referência:
[Figma — LAYER Totem B2B Summit](https://www.figma.com/design/AvCWwsXSu3qWmZIuFRVIvV/-LAYER--Totem-B2B-Summit?node-id=2084-325).

## Stack

| Camada    | Ferramenta                                     |
| --------- | ---------------------------------------------- |
| Framework | Next.js 16 (App Router) + React 19             |
| Linguagem | TypeScript 5.9                                 |
| Estilo    | Tailwind CSS 4 (config CSS-first via `@theme`) |
| Motion UI | GSAP 3.15 + `@gsap/react`                      |
| Fundo     | three.js + `@react-three/fiber`                |

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
```

Produção:

```bash
npm run build
npm start
```

Outros comandos: `npm run lint`, `npm run typecheck`, `npm run format`.

## Arquitetura

O projeto separa três camadas que nunca se atropelam:

- **Fundo WebGL** (`src/components/background`) — vive no `layout.tsx`, fora da
  árvore de rotas. Navegar entre telas nunca remonta o canvas, então a nebulosa
  continua correndo e o contexto WebGL não é recriado.
- **Palco** (`src/components/stage`) — mede a tela física e aplica um único
  `transform: scale`. É o que permite escrever todos os componentes em px nas
  coordenadas do Figma e ainda assim caber em qualquer resolução.
- **Telas** (`src/components/screens`) — composição de conteúdo. Cada tela
  declara qual cena de fundo quer, via `useScene`.

A ponte entre elas é `src/lib/motion/motionTargets.ts`: um objeto mutável que o
GSAP interpola e o loop de render lê a cada quadro. Um toque num card acende o
fundo com a cor de acento daquele card sem provocar um único re-render do React.

```
src/
  app/          rotas, tokens de design e fontes
  components/
    background/ canvas WebGL, shader e decorativos
    stage/      escala e orientação do totem
    screens/    telas
    ui/         GlassCard, CtaLink, BrandLogo
    kiosk/      proteções de operação e reset por inatividade
  config/       medidas do totem, cores de acento, cenas
  content/      textos das telas
  lib/          motion, navegação, store
```

## Fidelidade ao design

Todas as medidas dos componentes estão em px nas coordenadas do Figma
(1920x1080) e não devem ser arredondadas — o palco cuida da escala. Os ids dos
nodes do Figma estão citados nos comentários dos componentes correspondentes.

Um detalhe que parece erro e não é: os títulos usam `METODOLOGIaS` e `CaSeS` com
letras minúsculas. Na Logirent as minúsculas mapeiam para glifos alternativos e o
design usa isso de propósito. Não normalizar para caixa alta.

## Operação offline

Nada é carregado de CDN, nem em runtime nem em build: as fontes estão em
`public/fonts` com `@font-face` declarada à mão, e os assets do Figma em
`public/assets`. O campo de estrelas e o degradê do fundo são gerados no shader,
o que evita carregar a textura de 13 MB exportada pelo Figma.