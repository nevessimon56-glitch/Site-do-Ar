# Recuperação urgente — site quebrado (WDNA)

## Causa confirmada (loja ao vivo)

Os cards estão mostrando **JSON gigante** (`{"id":193,"title":...`) porque a WDNA **não oculta** o conteúdo dentro de `<template class="product-compare-data">`. Isso “quebra” visualmente home, catálogo e vitrines.

Não é cache do navegador sozinho — é markup + plataforma.

## Passo 1 — Corrigir o comparador (OBRIGATÓRIO)

Substitua **TODO** o conteúdo destes arquivos no editor WDNA:

| Arquivo na loja | Copiar do workspace |
|-----------------|---------------------|
| `sections/product-compare-data.liquid` | `docs/wdna/RECUPERACAO-SITE/product-compare-data.liquid` |
| `assets/product-compare.css` | `docs/wdna/RECUPERACAO-SITE/product-compare.css` |
| `assets/product-compare.js` | `docs/wdna/RECUPERACAO-SITE/product-compare.js` (recomendado) |

Salve, publique o tema e teste em aba anônima.

## Passo 2 — Layout (se header ainda estranho)

Substitua **TODO** `layout/theme.liquid` por:

`docs/wdna/RECUPERACAO-SITE/layout-theme.liquid`

(inclui CSS inline que esconde JSON mesmo antes do `product-compare.css` carregar)

## Passo 3 — Remover o que ainda quebra

No `theme.liquid` da loja, **apague** links para arquivos que **não existem** no tema:

- `header-v2.css`, `favorites.css`, `product-page-v2.css`
- `sda-conversion-redesign.css` / `.js`

A vitrine de conversão (`sda-card-footer`, `showcase-card-btu`) pode ficar; o CSS acima esconde o “BTUs” solto.

## Passo 4 — theme-all.css

Se `theme-all.css` na loja tiver poucas linhas (~centenas), **restaure** do GitHub — arquivo truncado derruba layout global.

## Ordem recomendada

1. `product-compare-data.liquid`  
2. `product-compare.css`  
3. `layout/theme.liquid` (passo 2)  
4. Hard refresh (Ctrl+Shift+R)
