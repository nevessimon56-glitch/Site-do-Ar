# Pacote WDNA — Produção + Conversão (Fases 1–3)

Base: arquivos que você colou do painel WDNA (header v2, vitrine v4+favoritos, PDP v2, search-order, theme.liquid).  
Camada extra: home/busca, sections `sda-*`, CSS/JS `sda-conversion-redesign`.

## Estrutura (16 arquivos para publicar)

```
layout/theme.liquid
assets/sda-conversion-redesign.css
assets/sda-conversion-redesign.js
assets/product-hover-image.css          ← opcional se já igual na loja
sections/header.liquid
sections/showcase-model-product.liquid
sections/product-content.liquid
sections/search-order.liquid
sections/sda-trust-bar.liquid
sections/sda-home-ambiente.liquid
sections/sda-home-necessidade.liquid
sections/sda-diag-cta.liquid
templates/home.liquid
templates/search.liquid
```

Referência (não substituir CSS separado se já inline no theme): `assets/header-orange-inline-v5.css`

## Ordem sugerida no WDNA

1. **Assets** — `sda-conversion-redesign.css`, `.js`, (opcional) `product-hover-image.css`
2. **Layout** — `theme.liquid` (ou só as 2 linhas sda se o seu layout já for idêntico)
3. **Sections** — header → showcase → product-content → search-order → `sda-*`
4. **Templates** — `home.liquid`, `search.liquid`

## O que NÃO vai neste pacote

- `sda-header-utility` / `sda-header-quick-icons` — header **v2** já inclui faixa utilitária e ícones
- `sda-pdp-trust` — PDP v2 de produção já tem trust inline no `product-content.liquid`

## Dependências já na loja (não estão nesta pasta)

`header-v2.css`, `favorites.css`, `product-page-v2.css`, `mega-menu.css`, `header-v2-mobile.js`, `favorites.js`, etc.

## Vitrine — diferença mínima vs colagem WDNA

`showcase-model-product.liquid`: mantém favoritos e Pix inline; botão **Comprar agora** e ordem **Comprar → Comparar** (conversão). Para voltar ao texto `Comprar` e Comparar primeiro, edite só `buyButtonText` e a ordem em `showcase-card-actions`.

## Zip

Arquivo gerado ao lado: `../Site-do-Ar-WDNA-pacote-final.zip` (mesmo conteúdo desta pasta).
