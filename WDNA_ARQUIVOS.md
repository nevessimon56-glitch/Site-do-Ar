# Arquivos WDNA — o que colar e onde

Este repositório GitHub é **parcial**. O WDNA também usa arquivos que **não estão no Git** (`theme.js`, `theme-defer.js`, etc.).

## Mapa de pastas no painel WDNA

| Caminho no WDNA | Arquivo no GitHub | Obrigatório? | Função |
|-----------------|-------------------|--------------|--------|
| `sections/showcase-model-product.liquid` | `sections/showcase-model-product.liquid` | **SIM** | Cards da vitrine (home, categorias) |
| `sections/product-content.liquid` | `sections/product-content.liquid` | **SIM** | **Página do produto** + preço principal |
| `sections/product-spec-icons.liquid` | `sections/product-spec-icons.liquid` | Sim | Pills de specs nos cards |
| `sections/search-filters.liquid` | `sections/search-filters.liquid` | **SIM** | Filtros + atalhos mobile no painel Filtrar |
| `assets/mega-menu.js` | `assets/mega-menu.js` | Sim | Hover, carrossel, barra mobile, teclado |
| `assets/mega-menu.css` | `assets/mega-menu.css` | Sim | Estilos cards + barra mobile + filtros |
| `sections/sidenav-overlay-account.liquid` | `sections/sidenav-overlay-account.liquid` | **SIM** | Login lateral — **remover autofocus** |
| `sections/sidenav-user-password.liquid` | `sections/sidenav-user-password.liquid` | **SIM** | Alterar senha — **remover autofocus** |
| `sections/sidenav-forgot-password.liquid` | `sections/sidenav-forgot-password.liquid` | **SIM** | Esqueci senha — **remover autofocus** |
| `layout/theme.liquid` | `layout/theme.liquid` | Recomendado | Login + script anti-teclado no `<head>` |
| `sections/mega-menu-ar.liquid` | `sections/mega-menu-ar.liquid` | Se usar mega menu | Menu Modelos |
| `pages/showcase-model-product.liquid` | `pages/showcase-model-product.liquid` | **NÃO** | Só cópia para referência — **o WDNA usa `sections/`** |

## Como validar se colou certo

### showcase-model-product.liquid
- Deve ter: `VERSAO: 2026-07-15-v5` + `SITE-PRICE-RESOLVE-v1`
- Deve ter: `data-showcase-tpl="v3-site-price"` e `data-site-price-lock="1"` nos `<li>`
- **NÃO** deve ter: `product.primaryPrice`

### product-content.liquid  ← ESTE ERA O ARQUIVO QUE FALTAVA
- Deve ter: `VERSAO: 2026-07-15-product-v2` + `SITE-PRICE-RESOLVE-v1`
- **NÃO** deve ter: `{% assign productPricePrimary = product.primaryPrice %}`

### mega-menu.js
- Deve ter: `VERSAO: 2026-07-15-js-showcase-guest-restore-v1` no topo
- `lockSitePriceCards()` — trava preco Pix nos cards
- `restoreShowcasesFromGuest()` — logado com 1 produto: restaura vitrine de visitante

### theme.liquid
- Deve ter: `window.__isStoreLoggedIn` e `window.__storeCustomer` (detecta login no JS)
- Chips discretos em páginas internas (não home, não catálogo)
- Catálogo mobile em grade 2 colunas (`showcase-search_grid--mobile-2col`)
- **Dock inferior fixo** (`mobile-catalog-dock`) — Início | Catálogo | Categorias/Filtros

### Navegação mobile (MOBILE-NAV-v3)

**O que aparece no celular:**
1. **Dock fixo embaixo** (estilo Mercado Livre/Shopee): Início, **Catálogo**, Categorias ou Filtros
2. **Home e catálogo:** sem barra extra no topo
3. **Outras páginas internas:** chips discretos abaixo do header (opcional)
4. **Catálogo:** produtos em **grade 2 colunas**
5. **Categorias:** abre painel compacto com Split, Piso Teto, Janela, etc.

**Arquivos:**
- `assets/mega-menu.js` + `assets/mega-menu.css`
- `sections/search-filters.liquid` — versão `2026-07-15-filters-mobile-v4`

**Validar:** `<nav class="mobile-catalog-dock">` fixo no rodapé + `body.has-mobile-catalog-dock`

### search-filters.liquid
- Versão: `2026-07-15-filters-mobile-v4`
- Link discreto **Ver todos os produtos** (oculto em Todos os Produtos)

### Teclado no mobile (spam ao abrir páginas)

**Causa:** `autofocus` nos campos de login/senha dos painéis laterais (`sidenav-overlay-account`, etc.).

**Correção na origem** — colar estes 3 arquivos (versão `2026-07-15-no-autofocus`):
- `sections/sidenav-overlay-account.liquid`
- `sections/sidenav-user-password.liquid`
- `sections/sidenav-forgot-password.liquid`

**Rede de segurança** — `layout/theme.liquid` deve ter script no `<head>` com `__stripHiddenAutofocus` + `assets/mega-menu.js` perf-v3.

### theme.liquid
- Deve ter script `__stripHiddenAutofocus` logo após `<body>` (remove autofocus dos painéis laterais)

### product-spec-icons.liquid
- Deve ter: `VERSAO: 2026-07-15-spec-v4`
- Deve ter: `data-spec-icons="v4"` no `<ul class="showcase-spec-bar">`
- Pills coloridas: Q/F laranja, Frio azul, Inverter roxo, Cobre dourado, Voltagem azul, Wi-Fi verde-água, Procel verde
- Janela/mecânico **não** devem mostrar pill Wi-Fi

### mega-menu.css
- Deve ter comentário `SPEC-TAGS-COLORS-v1` na seção das pills

### No site (F12 → Inspecionar card)
- `<li class="showcase-item" data-showcase-tpl="v3-site-price">` = vitrine atualizada
- Sem esse atributo = arquivo antigo ainda no WDNA

### showcase-model-product.liquid
- Versão: `2026-07-15-v5` + `SITE-PRICE-RESOLVE-v1`
- `data-site-price-lock="1"` nos cards (trava preco no JS apos login)
- Logado usa mesma tabela do site (nao troca para ML do painel)

### product-content.liquid
- Versão: `2026-07-15-product-v2` + `SITE-PRICE-RESOLVE-v1`
- Pagina do produto: mesmo preco Pix logado/deslogado

### mega-menu.js
- Versão: `2026-07-15-js-showcase-guest-restore-v2`
- Restaura vitrine **e catálogo** (Todos os Produtos) quando logado ve menos itens

### Painel WDNA (recomendado)
Em **Configurações > Produto > Preço**, alinhar:
- Lista para **usuario logado** = mesma do **visitante** (ou tabela do site, nao ML)

## Por que puxava Mercado Livre?

1. **`product-content.liquid`** (página do produto) usava `product.primaryPrice` → tabela ML no login
2. **Painel WDNA** pode ter "Lista de preço para usuário logado" = Mercado Livre
3. **`pages/`** no GitHub não é outra pasta do site — é só cópia

## Links raw (branch atual)

Substitua `COMMIT` pelo hash do último commit:

- `sections/showcase-model-product.liquid`
- `sections/product-content.liquid`
- `assets/mega-menu.js`
