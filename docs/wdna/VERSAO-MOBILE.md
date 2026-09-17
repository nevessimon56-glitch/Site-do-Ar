# Mobile — catálogo, dock inferior e deslize nas fotos

**O que falta no celular:** dock fixo embaixo (Início | Catálogo | Categorias), catálogo em grade 2 colunas, deslize entre fotos nos cards, filtros com atalhos, teclado que não abre sozinho.

**Commit fixo:** `7fef7b3` (branch `cursor/mobile-nav-discover-ed4c`)

**Pré-requisito:** pills coloridas já aplicadas (`70254aa` — ver `VERSAO-SPEC-ICONES.md`).

---

## O que você ganha no celular

| Recurso | Onde ver |
|---------|----------|
| **Dock inferior** | Barra fixa: Início · **Catálogo** · Categorias (ou Filtros no catálogo) |
| **Catálogo 2 colunas** | `/Todos-os-Produtos` e páginas de busca |
| **Deslize nas fotos** | Cards da vitrine e catálogo — arraste para ver 2ª imagem |
| **Atalhos de categoria** | Painel “Categorias” no dock (Split, Piso Teto, Janela…) |
| **Link “Ver todos os produtos”** | Painel Filtrar (fora da página Todos os Produtos) |
| **Teclado não abre sozinho** | Correção nos painéis laterais de login/senha |

---

## Arquivos para colar no WDNA (nesta ordem)

> **Regra:** um arquivo → publicar → testar no celular antes do próximo.

### 1 — `assets/mega-menu.css`

Substitua **todo** o conteúdo (pills + preço Pix + **estilos mobile**).

> **IMPORTANTE:** o arquivo completo tem **~1500 linhas**. Versão com ~500 linhas quebra os cards (pills, preço, botão Comprar).

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/mobile-restore-ed4c/assets/mega-menu.css

**Validar no código:** comentários `MOBILE-NAV-v2`, `MOBILE-CATALOG-GRID-v1`, `MOBILE-CATALOG-DOCK-v1`.

### 2 — `assets/mega-menu.js`

Substitua **todo** o conteúdo (~1300 linhas).

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/7fef7b3/assets/mega-menu.js

**Validar no topo:** `VERSAO: 2026-07-15-js-mobile-nav-v3`

> **Não use** a branch `cursor/fix-logged-price-table-ed4c` (mega-menu v8–v11).

### 3 — Filtros do catálogo

No painel WDNA o arquivo pode se chamar **`search-filters.liquid`** ou **`search-filter.liquid`** — use o nome que já existe aí.

Substitua **todo** o conteúdo.

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/7fef7b3/sections/search-filters.liquid

**Validar no código:** `VERSAO: 2026-07-15-filters-mobile-v4`

### 4 — Painéis laterais (teclado mobile)

Substitua **todo** o conteúdo de cada um:

| Arquivo | Link |
|---------|------|
| `sections/sidenav-overlay-account.liquid` | https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/7fef7b3/sections/sidenav-overlay-account.liquid |
| `sections/sidenav-user-password.liquid` | https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/7fef7b3/sections/sidenav-user-password.liquid |
| `sections/sidenav-forgot-password.liquid` | https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/7fef7b3/sections/sidenav-forgot-password.liquid |

**Validar:** comentário `VERSAO: 2026-07-15-no-autofocus` no topo.

### 5 — `layout/theme.liquid` (patch, não trocar às cegas)

Se você já usa o `theme.liquid` da versão bonita (`c7be17c`), **não substitua o arquivo inteiro**. Adicione só o script anti-teclado no `<head>`, logo antes de `</head>`:

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/7fef7b3/layout/theme.liquid

Abra o link, copie **apenas** o bloco `<script>…__stripHiddenAutofocus…</script>` (linhas ~106–141) e cole no seu `theme.liquid`.

**Opcional no mesmo arquivo:** o `mega-menu.js` desta versão já cuida do hover nos cards — pode remover as linhas de `product-hover-image.css` e `product-hover-image.js` se quiser (como no commit `7fef7b3`).

**Versão completa** (só se ainda não personalizou o theme):

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/7fef7b3/layout/theme.liquid

### 6 — Opcional: quantidade na página do produto

Evita o teclado numérico abrindo ao tocar em “+ / −” no mobile.

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/7fef7b3/sections/product-content.liquid

---

## Testar no celular (checklist)

- [ ] Dock fixo no rodapé: `<nav class="mobile-catalog-dock">`
- [ ] Aba ativa muda de cor conforme a página (Início / Catálogo / Categorias)
- [ ] Botão **Catálogo** abre `/Todos-os-Produtos`
- [ ] **Categorias** abre painel com Split, Piso Teto, etc.
- [ ] No catálogo, produtos em **2 colunas**
- [ ] Nos cards, **deslize horizontal** troca a foto (2ª imagem)
- [ ] Pills coloridas e preço Pix **continuam** ok
- [ ] Navegar entre páginas **não** abre teclado sozinho
- [ ] Checkout **sem** dock (barra some)

---

## Se algo quebrar

| Problema | Solução |
|----------|---------|
| Site lento | Volte só o JS para `70254aa` (perde dock/deslize, mantém pills) |
| Erro 500 | Histórico de versões do tema → restaurar anterior |
| Dock não aparece | Confirme `mega-menu.js` com `js-mobile-nav-v3` e teste em largura &lt; 768px |
| Filtros de marca não aplicam | Veja `pages/search-filters-css-patch.css` no repo (ajuste no `theme-custom.css`) |

---

## Manter como está (não mexer)

- `sections/product-spec-icons.liquid` — pills (`70254aa`)
- `sections/showcase-model-product.liquid` — cards (`70254aa`)
- `sections/mega-menu-ar.liquid` — menu Modelos (`c7be17c`)

---

## Referência rápida de commits

| Commit | Conteúdo |
|--------|----------|
| `70254aa` | Pills coloridas + hover + Pix |
| `7fef7b3` | **Mobile completo** (este guia) |
| `c7be17c` | Base estável sem pills |
