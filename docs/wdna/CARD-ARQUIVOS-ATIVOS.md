# Quem mexe no card na loja (vs pastas do repo)

## O que **entra** na loja WDNA

Só o que está em **`layout/theme.liquid`** (links) + **`sections/showcase-model-product.liquid`**.

| Ordem | Arquivo | Card conversão (`.sda-product-card`) |
|------:|---------|--------------------------------------|
| base | `theme-all.css` | Estilos WDNA genéricos (não editar no painel) |
| 1 | `theme-custom.css` | **Escopado** — regras legado `:not(.sda-product-card)` |
| 2 | `mega-menu.css` | **Escopado** — PRODUCT-CARD-v2 / mobile legado |
| 3 | `product-compare.css` | Botões row só legado; painel comparador global |
| 4 | `product-hover-image.css` | Cycle/compact legado |
| 5 | `sda-conversion-redesign.css` | Layout, compare coluna, overrides |
| 6 | `product-page-v2.css` | PDP (quase não mexe vitrine) |
| **7** | **`showcase-product-card.css`** | **Visual + altura uniforme (ÚLTIMO)** |

Pastas **`docs/wdna/`**, **`docs/wdna/backups/`**, **`docs/wdna/RECUPERACAO-SITE/`** são **documentação/cópia** — **não** são carregadas pelo tema.

## Se ainda “briga” no ar

1. Confirmar que **`showcase-product-card.css`** está linkado **depois** de `product-page-v2.css` no `theme.liquid` publicado.
2. Republicar **`theme-custom.css`** e **`mega-menu.css`** desta branch (escopo `:not(.sda-product-card)`).
3. No painel WDNA, **não** colar CSS extra de card em `theme-custom` sem escopo `.sda-product-card`.

## Dono único do card remodelado

- **HTML:** `sections/showcase-model-product.liquid`
- **CSS:** `assets/showcase-product-card.css` (+ variáveis `--sda-card-*`)
