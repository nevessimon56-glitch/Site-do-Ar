# SDA v3 — reescrita para tema novo (sem conflito de card)

**Commit:** branch `cursor/card-remodel-b192` após rewrite v3.

## O que mudou

| Antes | Depois |
|-------|--------|
| `mega-menu.css` ~5800 linhas (menu + 10 blocos de card) | ~3230 linhas **só nav/site** |
| `product-hover-image.css` ~1740 linhas | ~90 linhas (header + hover legado) |
| `sda-conversion-redesign.css` estilizava `.showcase-product.card` genérico | Regras de vitrine só `.sda-product-card` |
| 3+ arquivos “donos” do card | **2 donos:** `sda-conversion-redesign` (ações) + `showcase-product-card` (visual/grid/tns) |

Backup do mega-menu antigo: `docs/wdna/backups/mega-menu-pre-sda-v3-20261026.css`

## Ordem no `theme.liquid`

1. `theme-all` → `theme-custom`
2. `mega-menu.css` (nav)
3. `header-v2.css` → `favorites.css` → `product-compare.css`
4. `product-hover-image.css` → `sda-conversion-redesign.css` → `product-page-v2.css`
5. **`showcase-product-card.css` (último no card)**

## Pacote para WDNA

Pasta única: `docs/wdna/pacote-sda/tema-sda-ultimo/`

Atualizar: `./docs/wdna/pacote-sda/copiar-para-tema.sh ./docs/wdna/pacote-sda/tema-sda-ultimo`

## O que você ainda mantém do tema base WDNA

`theme.js`, `theme-defer.js`, templates, checkout, vitrines model 1–16 — sem substituir pelo repo.
