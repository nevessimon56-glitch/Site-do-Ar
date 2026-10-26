# Recuperação urgente — site quebrado (WDNA)

## Causa mais provável

Foi publicado o **`theme.liquid` longo (~646 linhas)** da fase de conversão, que pede arquivos que **não existem** na loja:

- `assets/header-v2.css`
- `assets/favorites.css`
- `assets/product-page-v2.css`

Ou foi ligado o **`sda-conversion-redesign.css`** (muitos `!important`) **sem** o restante do pacote (header v2, vitrine nova).

Isso não apaga produtos — quebra **layout**, **header** e **cards**.

## Passo 1 — Voltar o layout (prioridade)

No editor WDNA, substitua **TODO** o conteúdo de `layout/theme.liquid` pelo arquivo desta pasta:

**`docs/wdna/RECUPERACAO-SITE/layout-theme.liquid`**

(É a referência estável: mega-menu + compare + hover + CSS inline do header laranja/claro. **Não** chama `header-v2.css` nem `sda-conversion-redesign.css`.)

Salve e abra a home em aba anônima (Ctrl+Shift+N).

## Passo 2 — Se a vitrine ainda der erro

Substitua **TODO** `sections/showcase-model-product.liquid` por:

**`docs/wdna/RECUPERACAO-SITE/showcase-model-product.liquid`**

## Passo 3 — Não apague na loja

- `assets/theme-all.css` — se estiver muito pequeno (< 100 KB), restaure do GitHub (`main` ou backup `docs/wdna/backups/`).
- `assets/mega-menu.css` — pode manter o seu arquivo grande de produção.

## Passo 4 — Remover o que quebra (se ainda estiver no tema)

No `theme.liquid` da loja, **apague** qualquer linha que aponte para:

- `sda-conversion-redesign.css`
- `sda-conversion-redesign.js`
- `header-v2.css` / `favorites.css` / `product-page-v2.css`

(só volte a usar conversão quando subirmos **todos** os arquivos juntos.)

## Depois que o site voltar

Avise no chat — montamos um pacote **único** (theme + CSS + sections) testado, sem referência a arquivo faltando.
