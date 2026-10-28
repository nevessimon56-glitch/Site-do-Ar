# Header — dono por arquivo (pós-consolidação)

| Responsabilidade | Arquivo |
|------------------|---------|
| Markup (`header-v2`, logo, busca, menu) | `sections/header.liquid` |
| Checkout header | `sections/header-checkout.liquid` |
| Ordem CSS + hotfix JSON comparador | `layout/theme.liquid` |
| Tokens (--sda-nav-*, --sda-bg) | `assets/sda-tokens.css` |
| Barra header v2, mobile strip, carrinho/conta | `assets/header-v2.css` |
| Nav azul, mega menu, dock mobile, nav fixa mobile | `assets/mega-menu.css` + `assets/mega-menu.js` |
| Template mega menu | `sections/mega-menu-ar.liquid` |
| PDP: enxugar nav no mobile | `assets/product-page-v2.css` (`body.sda-pdp-mobile`) |
| Base WDNA | `assets/theme-all.css`, `assets/theme-custom.css` |

**Não colocar mais:** overrides de header/nav em `sda-conversion-redesign.css` (comportamento PDP/busca/filtros apenas).

**Ordem no `<head>`:** `sda-tokens.css` → `mega-menu.css` → `header-v2.css` → … → `sda-card.css`.
