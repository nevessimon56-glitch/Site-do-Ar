# Correções da auditoria UX (26/10/2026)

Implementação no branch `cursor/card-remodel-b192` alinhada ao relatório de design/funcionamento (home + PDP, 375×812 e 1440×1000).

## P1 — Comparador mobile

| Achado | Arquivo | Correção |
|--------|---------|----------|
| Barra do comparador sobre o dock | `assets/product-compare.css` | Barra com `bottom: 58px + safe-area` quando `has-mobile-catalog-dock`; `padding-bottom` do body soma dock + barra |
| Overflow horizontal do painel | `assets/product-compare.css` | `compare-panel-open` bloqueia scroll X da página; diálogo `max-width: 100vw`; tabela só rola dentro de `.product-compare-panel__table-wrap` |

## P2 — Cards, popup, PDP sticky

| Achado | Arquivo | Correção |
|--------|---------|----------|
| Cards desktop altos | `assets/sda-card.css` | Tokens de imagem/título/footer reduzidos; imagem ocupa melhor o palco |
| Comparar pouco explícito (v5) | `assets/sda-card.css` | Botão secundário 44px, borda, rótulo “Comparar”, estado selecionado |
| Popup Diagnóstico 360 agressivo | `layout/theme.liquid` | Mobile: só após ~22s **e** scroll ≥420px; desktop: 15s; dispensa persiste em `localStorage` |
| Sticky PDP vs dock/compare | `assets/sda-conversion-redesign.css` | `bottom` e `padding-bottom` coordenados com dock e `has-compare-bar` |

## Publicação WDNA

Republicar pelo menos: `product-compare.css`, `sda-card.css`, `sda-conversion-redesign.css`, `layout/theme.liquid` (e liquid v5 + `sda-card.css` no head se ainda não estiver no ar).

Pacote: `docs/wdna/pacote-sda/tema-sda-ultimo/` e `.zip`.

## Fora de escopo neste commit

- Consolidação das faixas de navegação mobile (P1 nav redundante).
- Unificação completa de tokens home vs PDP (P2 visual system).
