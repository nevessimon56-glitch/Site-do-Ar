# `assets/mega-menu.css` — não substituir no WDNA

No **Site do Ar em produção**, o `mega-menu.css` é um arquivo **grande e evoluído** (mega menu Modelos, vitrine mobile, CARD-MOBILE-REDESIGN, PIX-PILL, dock, conta, etc.).

## Regra de ouro

| Ação | Seguro? |
|------|--------|
| **Manter** o `mega-menu.css` que já está na loja | Sim |
| **Colar patches no final** do arquivo (comentário + bloco novo) | Sim, se testar no mobile/desktop |
| **Substituir o arquivo inteiro** pela versão curta do Git | **Não** — quebra cards, mobile e mega menu |

O repositório Git traz uma versão **enxuta** do `mega-menu.css` (só mega menu + fallback de hover). Ela **não** substitui o seu arquivo de produção.

## O que publicar para header v2 + favoritos (sem mexer no mega menu)

1. `assets/header-v2.css` — layout header desktop **e mobile** (logo, ícones, busca overlay, faixa no scroll)
2. `assets/favorites.css` + `assets/favorites.js`
3. `sections/header.liquid`, `layout/theme.liquid`, painel favoritos, etc.

**Não** é necessário republicar `mega-menu.css` por causa do header v2.

## Se precisar de um ajuste pontual na vitrine

1. Abra o `mega-menu.css` **no editor WDNA** (o seu, completo).
2. Role até o **final** do arquivo.
3. Cole só o bloco incremental (ex.: `/* PATCH xyz */` + regras).
4. Teste home + catálogo no celular.

Nunca apague blocos como `CARD-MOBILE-REDESIGN-v1`, `HOME MOBILE`, `PIX-PILL-PROMO-v2` sem backup.

## Conflito header v2 × nav azul

O header v2 usa `header-v2.css` + trechos no `theme.liquid` (`header-orange-inline-v5`). A barra de nav invertida (`NAV-BAR-INVERT-v5`) continua no **seu** `mega-menu.css` — isso é intencional no desktop. Mobile da nav fica no `header-v2.css` + JS `initSdaMobileNavStrip` no `theme.liquid`.
