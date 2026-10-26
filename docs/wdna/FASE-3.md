# Fase 3 — Compre junto + vitrines na PDP

**Branch:** `cursor/fase3-compre-junto-b192`  
**Pré-requisito:** Fase cards/comparador/PDP sticky validada (26/10/2026).

## Entregas

### 1. Compre junto (mini-card)

| Arquivo | Mudança |
|---------|---------|
| `sections/showcase-model-product-buy-to-gether.liquid` | Classe `.sda-product-card--bundle`, hover `product-hover-swap`, linha BTU |
| `assets/sda-conversion-redesign.css` | Bloco `FASE 3 — Compre junto` (não usa `.sda-product-card` de vitrine) |

**Contrato:** sem Comparar, sem footer Pix — totais e CTA ficam em `product-buy-to-gether.liquid`.

### 2. Relacionados / últimos vistos

Continuam usando `showcase-model-product.liquid` (`.sda-product-card`). CSS de reforço em `sda-conversion-redesign.css` sob `.product-showcase`.

## Publicar na WDNA

1. `sections/showcase-model-product-buy-to-gether.liquid`
2. `assets/sda-conversion-redesign.css`

## Validar na loja

1. PDP com “Compre Junto” — dois mini-cards + preço combinado; mobile layout table (imagem | título).
2. Hover segunda foto nos mini-cards (se houver mídia 2).
3. Carrossel **Relacionados** e **Últimos vistos** — mesmo card da home (Comparar abaixo de Comprar).

## Próximo (fase 4 — opcional)

- Merge PR recovery + fase 3 → `main`
- Busca/categoria checklist completo
- Kits (`product-kit.liquid`) se usar markup de card
