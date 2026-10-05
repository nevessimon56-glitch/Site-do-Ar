# Página de produto (PDP) — visual v2

**Branch:** `cursor/pdp-integrate-v2-2cf7`

> O CSS v2 usa **flexbox** (sem `grid` / `1fr`) e **cores em hex** (sem `--variáveis` CSS) para o validador do editor WDNA.

Layout alinhado aos mockups desktop/mobile: galeria + painel de compra, CEP, confiança, Descrição / Destaques / Especificações.

---

## Arquivos para colar no WDNA

| Ordem | Arquivo | Ação |
|------|---------|------|
| 1 | `assets/product-page-v2.css` | Substituir / criar |
| 2 | `sections/product-descriptions-v2.liquid` | **Novo** |
| 3 | `sections/product-spec-icons.liquid` | **Novo** (fallback Destaques) |
| 4 | `sections/product-compare-data.liquid` | **Novo** (se usar Comparar) |
| 5 | `sections/product-content.liquid` | Substituir todo |
| 6 | `layout/theme.liquid` | **Só 1 linha** — link do `product-page-v2.css` (ver `PDP-V2-THEME-PATCH.md`). **Não** use o theme curto (~414 linhas). |

Guia do theme: [`docs/wdna/PDP-V2-THEME-PATCH.md`](PDP-V2-THEME-PATCH.md)

Links após push:  
`https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/pdp-integrate-v2-2cf7/<caminho>`

---

## De onde vêm os textos (painel WDNA)

Em **Configurações → Grupos → Descrições** existem dois grupos ativos:

| Grupo no painel | Aba ao editar produto | No tema (Liquid) |
|-----------------|----------------------|------------------|
| **Descrição** (id 1) | Descrição (editor rich text) | `product.descriptions` onde o nome contém “Descrição” → bloco **Descrição** |
| **Especificações** (id 2) | Especificações (tabela HTML) | `product.descriptions` onde o nome contém “Especificações” → bloco **Especificações** |

**Destaques** não é um grupo no WDNA. O tema monta esse painel com **pills automáticas** (`product-spec-icons`), usando título do produto + conteúdo da tabela de **Especificações** (Wi-Fi, Inverter, 220V, etc.).

Se a aba Especificações estiver vazia, as pills e a ficha usam fallbacks (`product.specification` ou aviso no layout).

---

## Comparar e frete

- **Comparar:** botão `.product-compare-btn` + `product-compare.js` / `product-compare.css` já usados no site.
- **CEP:** botão **Calcular** chama `openShippingCalculation()` (modal de frete da plataforma).

---

## Preview local (dev)

Abrir `.cursor/preview/product-page.html` com servidor estático na raiz do repo.
