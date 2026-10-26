# Card de vitrine — dono único

**Atualizado:** 2026-10-26 (branch `cursor/site-recovery-b192`)

## Contrato

| Camada | Dono | Escopo |
|--------|------|--------|
| **HTML** | `sections/showcase-model-product.liquid` | Raiz: `.showcase-product.card.sda-product-card` |
| **CSS layout/ações** | `assets/sda-conversion-redesign.css` | Tudo sob `.sda-product-card` |
| **Compare (painel)** | `assets/product-compare.css` + `product-compare.js` | Barra/modal global; botões em **row** só em cards **sem** `.sda-product-card` |
| **Hover imagem** | `assets/mega-menu.js` (`__SDA_HOVER_V2__`) | `data-hover-src` no Liquid; backup `product-hover-image.js` desligado se v2 ativo |
| **PDP** | `#product-pdp-v2` + `product-page-v2.css`; sticky mobile = `.sda-pdp-sticky-buy` (JS) | Wrapper PDP rola; barra de compra fixa no rodapé |

## Arquivos que **não** estilizam card conversão

Depois do escopo v10 (2026-10-26), estes arquivos usam `:not(.sda-product-card)` nas regras de card:

- `mega-menu.css` — bloco `PRODUCT-CARD-v2` (final do arquivo)
- `product-compare.css` — layout `.showcase-card-actions` em row
- `product-hover-image.css` — temas `sda-card--cycle-*` e grid compacto
- Revisar `theme-custom.css` se novos overrides de `.showcase-card-actions` forem adicionados

## Exceções

- **`showcase-model-product-promotion.liquid`** — model 9: `.sda-product-card.sda-product-card--promo` (horizontal; CSS em `sda-conversion-redesign.css`).
- **`showcase-model-product-buy-to-gether.liquid`** — mini-card compre junto; markup próprio (fase 3).

## Checklist pós-publicação WDNA

1. Home (modelos 1, 3, 7), busca, categoria — Comparar abaixo de Comprar, coluna
2. Relacionados / últimos vistos na PDP — mesmo markup que vitrine
3. Comparador — até 4 itens, JSON oculto (`product-compare-data.liquid` = `div.product-compare-json`)
4. Mobile 2 colunas — botões full width, sem checkbox Comparar no canto
5. Model 9 promo — validar separadamente (layout legado)

## Ordem CSS (`layout/theme.liquid`)

`theme-all` → `theme-custom` → `mega-menu` → `product-compare` → `product-hover-image` → **`sda-conversion-redesign`** → `product-page-v2`

O dono do card conversão carrega **depois** dos shims legado e vence por especificidade + escopo nos outros arquivos.
