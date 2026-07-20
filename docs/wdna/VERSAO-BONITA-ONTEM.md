# Versão bonita — como estava antes do problema

**Commit fixo:** `c7be17c` (20/07/2026 — mega menu + hover + vitrine Pix)

**Base dos links:** `https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/c7be17c/`

---

## Ordem (um arquivo → publicar → testar)

| # | Arquivo no WDNA | Link |
|---|-----------------|------|
| 1 | `assets/mega-menu.css` | https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/c7be17c/assets/mega-menu.css |
| 2 | `assets/mega-menu.js` | https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/c7be17c/assets/mega-menu.js |
| 3 | `assets/product-hover-image.css` | https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/c7be17c/assets/product-hover-image.css |
| 4 | `assets/product-hover-image.js` | https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/c7be17c/assets/product-hover-image.js |
| 5 | `sections/mega-menu-ar.liquid` | https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/c7be17c/sections/mega-menu-ar.liquid |
| 6 | `sections/showcase-model-product.liquid` | https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/c7be17c/sections/showcase-model-product.liquid |
| 7 | `layout/theme.liquid` | https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/c7be17c/layout/theme.liquid |

---

## Opcional (só se usar)

| Arquivo | Link |
|---------|------|
| `sections/search-filter.liquid` | https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/59ab4e0/sections/search-filter.liquid |

---

## O que NÃO usar

- Branch `cursor/fix-logged-price-table-ed4c` (mega-menu.js v8–v11)
- `docs/wdna/theme.liquid-ATUALIZADO-WDNA.liquid` (versão de hoje, diferente da bonita)
- Pasta `pages/` — não existe no WDNA

---

## Depois de colar o `theme.liquid` (passo 7)

Testar: home, mega menu, cards, catálogo, carrinho.

Se der erro 500: Histórico de versões do tema → restaurar anterior.

---

## Diferença da versão de hoje

Hoje foram adicionados ajustes de CSS nos cards (`347ab7b`). Se os cards empilharem fotos, use a `main` atual só para:

- https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/main/assets/product-hover-image.css
- https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/main/assets/mega-menu.css

O resto fica em `c7be17c` (visual de ontem).
