# SDA ZERO v3 — reescrita (sem camadas de override)

## Pilha única (`layout/theme.liquid`)

1. `theme-plugins.css` / `theme-all.css` / `theme-custom.css` (WDNA base — não editar guerras aqui)
2. **`sda-tokens.css`** — design tokens
3. **`mega-menu.css`** — mega menu + nav azul + dock + mobile strip (**~840 linhas removidas**: GLOBAL-BLACK, comparador preto, header invertido, cart duplicado)
4. **`header-v2.css`** — barra header v2 + carrinho/conta
5. **`favorites.css`** / **`product-compare.css`** / **`product-hover-image.css`**
6. **`sda-conversion-redesign.css`** — só comportamento (filtros, sticky PDP, blocos home) (**~320 linhas CARD-FIX removidas**)
7. **`product-page-v2.css`** — PDP
8. **`sda-card.css`** — **único** dono visual de vitrine

## Removido de propósito

- `<style>` inline no `theme.liquid` (header/carrinho/compare)
- `MEGA-MENU-OVERRIDE`, `CARD-FIX-v4`, `CARD-LOCK` espalhados em conversion
- Tema **preto** na nav/header dentro de `mega-menu.css`
- Comparador estilizado em preto no `mega-menu.css`
- `showcase-product-card.css` / `sda-nav.css` como donos (arquivos stub)

## Markup

- `sections/header.liquid`: `header header-v2 sda-header-v2`
- `sections/showcase-model-product.liquid`: v5-zero + `.sda-card`

Publicar **preview** com o pacote `tema-sda-ultimo.zip` completo — não misturar CSS antigo da loja.
