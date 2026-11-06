# SDA ZERO — publicar na WDNA (melhor versão, do zero)

## Contrato (3 donos)

| Camada | Arquivo |
|--------|---------|
| Nav / mega menu | `mega-menu.css` (~3k linhas, **sem** card) |
| Comportamento | `sda-conversion-redesign.css` (busca, PDP, coluna botões) |
| **Visual card** | **`sda-card.css`** (único) |

Markup: `sections/showcase-model-product.liquid` v5 → classes `sda-product-card sda-card`, `data-showcase-tpl="v5-zero"`.

## Ordem no `layout/theme.liquid`

`theme-all` → `theme-custom` → `mega-menu` → `header-v2` → `favorites` → `product-compare` → `product-hover-image` → `sda-conversion-redesign` → `product-page-v2` → **`sda-card.css`**

Validar código-fonte: comentário **`SDA-ZERO-v1`** e URL `sda-card.css`.

## Pacote

`docs/wdna/pacote-sda/tema-sda-ultimo/` (atualizar com script `copiar-para-tema.sh`).

ZIP: `docs/wdna/pacote-sda/tema-sda-ultimo.zip`

## Não substituir

`theme.js`, `theme-defer.js`, `theme-plugins.css`, templates, `config.json`.

## Fallback

Cards antigos sem classe `.sda-card` ainda recebem estilo via seletor `.sda-product-card` em `sda-card.css` até republicar o liquid v5.
