import type { ComponentPropsWithRef } from 'react';

/**
 * Superficie de vidro do design system do totem.
 *
 * Reproduz o efeito do Figma: preenchimento branco a 10%, borda branca a 40%,
 * desfoque do que esta atras em 20px e um brilho interno que descola o card do
 * fundo. E puramente visual — quem monta o conteudo decide o layout.
 *
 * Aceita `ref` porque as animacoes precisam mirar exatamente este elemento:
 * `backdrop-filter` para de enxergar o fundo se um ancestral ganhar `opacity`
 * ou `filter`, entao opacidade e escala sao aplicadas aqui, nunca num wrapper.
 */
export function GlassCard({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div
      {...props}
      className={`border-glass-border bg-glass-surface shadow-glass-inset relative overflow-hidden rounded-[10px] border backdrop-blur-[20px] ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
