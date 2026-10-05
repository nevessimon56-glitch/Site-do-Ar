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
| 6 | `layout/theme.liquid` | Incluir link do CSS (já no repo) |

Links após push:  
`https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/pdp-integrate-v2-2cf7/<caminho>`

---

## Destaques e Especificações (dados)

1. **Descrições do produto** no painel WDNA (recomendado):
   - Aba **Descrição** — texto principal
   - Aba cujo nome contém **Destaques** — HTML ou lista (vira painel / acordeão)
   - Aba cujo nome contém **Especificações** — ficha técnica (tabela HTML)

2. Se não houver aba **Destaques**, o tema usa as **pills automáticas** (`product-spec-icons`) como no catálogo.

3. Se não houver aba **Especificações**, usa `product.specification` ou mensagem de fallback.

---

## Comparar e frete

- **Comparar:** botão `.product-compare-btn` + `product-compare.js` / `product-compare.css` já usados no site.
- **CEP:** botão **Calcular** chama `openShippingCalculation()` (modal de frete da plataforma).

---

## Preview local (dev)

Abrir `.cursor/preview/product-page.html` com servidor estático na raiz do repo.
