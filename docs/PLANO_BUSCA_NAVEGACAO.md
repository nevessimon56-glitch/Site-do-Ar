# Plano específico — busca, categorias e navegação

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Status:** Aguardando aprovação — **sem implementação** nesta etapa.  
**Prioridade de negócio:** busca → categorias → navegação (desktop + mobile).  
**Identidade:** azul/laranja predominantes; lilás só acentos (`sda-tokens.css` no Git v3).

---

## 1. Diagnóstico executivo (busca e navegação)

A busca e a navegação são **híbridas WDNA + SDA**:

- **WDNA** fornece rotas (`/busca`, slugs de categoria), objeto `search`, facets, paginação server-side, menu `menu`, Alpine `setupSearch()`, `StoreSDK.utils.initSearchPagination`, header `alterForm2()`.
- **SDA** adiciona mega menu (`mega-menu-ar` + `mega-menu.js/css`), header v2, dock mobile, strip nav ao rolar, e **camada de conversão** em busca (`sda-conversion-redesign.js/css`: contagem produtos, chips de filtros, toggle filtros desktop, CTA Diagnóstico).

**Produção (28/out):** busca responde com `main.search-main`, `sda-search-count`, `#sda-active-filters`, formulário filtros com classes SDA — **JS de conversão ativo**. Layout de card na busca: `showcase-model-product` via `search.liquid` (v4 no ar).

**Git v3 (PR #49):** mesmo fluxo Liquid/JS de busca; mudanças relevantes são **CSS nav** (mega-menu enxuto, sem GLOBAL-BLACK), **tokens**, **card** (`sda-card.css` + `v5-zero`), remoção de inline header no layout v3.

**Risco principal da migração nav/busca:** publicar só parte dos arquivos ou manter **inline CSS** de produção junto com v3 → cascata imprevisível.

---

## 2. Mapa de recursos (implementação, deps, validação)

### 2.1 Busca por termo (`/busca?termo=…`)

| Aspecto | Detalhe |
|---------|---------|
| **Template** | `templates/search.liquid` |
| **Shell** | `<main class="search-main" x-data="setupSearch()" x-init="initSearch()">` |
| **Resultados** | `{%- render showcase-model-product, products: search.results -%}` |
| **Contagem** | Liquid: `search.pagination.total`; SDA: `enhanceSearchCount()` → `.sda-search-count` |
| **Alpine/JS** | `setupSearch()` inline no template; `StoreSDK.utils.initSearchPagination`; pixels `searchFacebookPixel`, GA list |
| **Estados vazios** | **Não auditado visualmente** — verificar HTML quando `search.results` vazio (confiança baixa) |
| **SEO** | `<h1>{{ search.term }}</h1>` ou breadcrumb categoria; URLs querystring WDNA |
| **Validação preview** | Buscar termo conhecido; contagem bate paginação; links PDP 200; console sem erro Alpine |

**Arquivos envolvidos:** `search.liquid`, `showcase-model-product.liquid`, `sda-card.css` ou `showcase-product-card.css` (ar), `sda-conversion-redesign.js`, `theme-all.css` (grid busca).

---

### 2.2 Categorias / listagens (`currentPage.path`, facets)

| Aspecto | Detalhe |
|---------|---------|
| **Template** | Mesmo `search.liquid` quando rota é categoria |
| **Breadcrumb** | `search.termCategory.treeName` → links `linkCategory` |
| **H1** | Nome da categoria no último nível |
| **Descrição** | Bloco `category-description` (vários campos SEO fallback) |
| **Filtros** | `sections/search-filter.liquid` — categorias facet, marcas, BTU, ciclo, preço, etc. |
| **URLs** | `linkSearch` helper preserva query (`ordem`, `qtdPag`, `pag`, filtros) |
| **Validação** | Abrir categoria conhecida (ex. split inverter); breadcrumb clicável; H1 único; descrição se configurada no painel |

**Dependência WDNA:** árvore de categorias e slugs vêm do **catálogo admin**, não do Git.

---

### 2.3 Filtros, ordenação, paginação

| Recurso | Arquivo | Mecanismo |
|---------|---------|-----------|
| Filtros desktop | `search-filter.liquid` | `<form method="GET">` — submit recarrega página |
| Filtros mobile | `search.liquid` + filter | Painéis `isOpenFilter` Alpine |
| Ordenação | `search-order.liquid` | Links `linkSearch` (`relevancia`, `maior-preco`, …) |
| Itens/página | `search.liquid` | `qtdPag` 12–60 |
| Paginação | `search.liquid` + `setupSearch` | `StoreSDK.utils.initSearchPagination` |
| Potência min/max | `search-filter.liquid` | Inputs + página calculadora solar condicional |
| BTU chips | `search-filter.liquid` | `.search-filter_btu`, `.btu-filter-btn` |
| Chips ativos (SDA) | `sda-conversion-redesign.js` | `#sda-active-filters`, remove via URL |
| Toggle ocultar filtros (SDA) | `sda-conversion-redesign.js` | `.sda-filter-toggle`, `.sda-filters-collapsed` |

**Validação:** aplicar filtro BTU + marca; chip aparece; remover chip; ordenar menor preço; página 2; mobile abrir/fechar filtros.

**Performance:** cada filtro = **full page load** (esperado WDNA) — não declarar SPA.

---

### 2.4 Header — busca desktop e mobile

| Recurso | Arquivo | Detalhe |
|---------|---------|---------|
| Form desktop | `header.liquid` | `#myForm2`, `#term2`, `alterForm2()` |
| CSRF | `header.liquid` | `_csrf` hidden |
| Busca mobile | `header.liquid` | `openSearch()` — overlay WDNA |
| Estilo | `header-v2.css` | Pill search, navbar |

**Dependências:** `theme.js` (funções globais busca); **não alterar** contrato POST/action sem doc WDNA.

**Validação:** buscar do header desktop e mobile; chegar em `/busca` com termo correto.

---

### 2.5 Mega menu desktop

| Recurso | Arquivo | Detalhe |
|---------|---------|---------|
| Template | `mega-menu-ar.liquid` | `#mega-menu-ar-template` |
| JS | `mega-menu.js` | `initMegaMenuAr()` — injeta no item “Modelos” |
| CSS | `mega-menu.css` | Colunas, banners, carrossel interno |
| Detecção catálogo | `mega-menu.js` | Paths `/busca`, `/todos-os-produtos`, `main.search-main` |

**Validação:** hover/click “Modelos”; links BTU/marcas; imagens; fechar; teclado **não testado** (marcar pendente).

---

### 2.6 Nav principal (menu WDNA) + fixação

| Recurso | Onde | Detalhe |
|---------|------|---------|
| Markup menu | `header.liquid` / `.nav-content` | Itens `menu` WDNA |
| Nav azul | `mega-menu.css` | NAV-BLUE |
| Fixed desktop | `mega-menu.js` + fallback inline `theme.liquid` | `.is-fixed-top`, spacer |
| Mobile strip 3 cats | `initSdaMobileNavStrip` | split inverter, piso teto, janela |
| Reveal on scroll | `sda-mobile-nav-revealed` | Após altura header |

**Validação:** scroll home e categoria; nav fixa desktop; mobile strip após scroll; links das 3 categorias.

---

### 2.7 Dock mobile (catálogo)

| Recurso | Arquivo |
|---------|---------|
| CSS | `mega-menu.css` — `mobile-catalog-dock`, `has-mobile-catalog-dock` |
| JS | `mega-menu.js` — injeta barra inferior |

**Validação:** viewport ≤991px; dock não cobre comparador (`product-compare.css` z-index); padding body.

---

### 2.8 Links produtos e categorias

| Origem | Padrão |
|--------|--------|
| Cards | `linkProduct` / href slug WDNA |
| Categorias filtro | `categorySlug` |
| Todos produtos | `/Todos-os-Produtos` (link mobile + mega) |

**SEO:** preservar slugs existentes — **sem redirect** no tema sem plano 301 painel.

**Validação:** amostra 5 links busca → PDP 200; 3 links categoria.

---

### 2.9 Compatibilidade Alpine / StoreSDK

| API | Uso busca/nav |
|-----|----------------|
| `setupSearch()` | Paginação state |
| `StoreSDK.utils.initSearchPagination` | Links páginas |
| `setupStore()` | Header login |
| `/ajax/*` | Não usado diretamente na busca listing (só pixels) |

**Regressão:** erros Alpine no console ao paginar/filtrar.

---

### 2.10 Responsividade, a11y, desempenho (busca/nav)

| Tema | Status auditoria |
|------|------------------|
| Responsivo | Classes `hide-lg` / `show-lg`; grid busca — **validar visual preview** |
| A11y | Filtros `<details>`; chips com remoção — foco teclado **não testado** |
| Desempenho | Múltiplos CSS; JS conversion on DOMContentLoaded — **sem Lighthouse** |

---

## 3. Arquivos candidatos a alteração (pós-aprovação, só preview)

| Arquivo | Alteração prevista | Justificativa |
|---------|-------------------|---------------|
| `assets/mega-menu.css` | Manter dono nav; ajustes a11y/contraste se necessário | Prioridade navegação |
| `assets/mega-menu.js` | Correções bugs dock/strip; sem mudar rotas | Mobile nav |
| `assets/sda-conversion-redesign.js/css` | Refinar busca (chips, toggle) escopado `.search-main` | Conversão busca |
| `assets/sda-tokens.css` | Tokens azul/laranja/lilás | Identidade |
| `assets/header-v2.css` | Busca pill / mobile search alinhada tokens | Header |
| `sections/search-filter.liquid` | **Só se** bug confirmado — form já custom (Midea link) | Filtros |
| `templates/search.liquid` | **Evitar** — alto risco Alpine; só fixes pontuais | Core WDNA |
| `layout/theme.liquid` | Remover fallback nav **após** provar mega-menu.js 100% no preview | Reduz duplicação |
| `sections/mega-menu-ar.liquid` | Conteúdo links — negócio/marketing | Catálogo |
| `assets/sda-card.css` | Layout card na grade busca | Consistência v5 |

**Não tocar na fase busca/nav:** `theme.js`, `search-order.liquid` (salvo bug), checkout, `sidenav-shipping-calculation.liquid`.

---

## 4. Dependências que permanecem intactas

- `assets/theme.js` / `theme-defer.js` — paginação, busca header, sidenavs.
- Objetos Liquid `search.*`, `menu`, `currentPage.path`.
- Helpers WDNA `linkSearch`, `linkCategory`, `filterString`.
- Endpoint de frete (fora escopo busca, mas regressão paralela): `POST /ajax/shippings/calculator`.
- Section **`product-reviews.liquid` no servidor** — ver `AUDITORIA_AVALIACOES_PRODUTO.md` (não remover do tema ativo).

---

## 5. Plano de implementação em etapas pequenas (após aprovação)

| Etapa | Escopo | Ambiente |
|-------|--------|----------|
| **E0** | Upload pacote v3 **completo** no preview (baseline) | WDNA preview |
| **E1** | Smoke busca/nav checklist §6 — registrar reprovados | Preview |
| **E2** | Fix só CSS nav/busca (tokens, contraste, z-index dock/compare) | Preview + commit |
| **E3** | Fix JS busca (chips, toggle) se E1 falhar | Preview + commit |
| **E4** | Alinhar card busca v5 (`showcase-model-product` + `sda-card`) | Preview |
| **E5** | Remover inline/header legado **se** ainda existir no layout preview | Preview |
| **E6** | Re-smoke + evidências (screenshots, Network, console) | Preview |
| **E7** | Proposta ativação — **não executar** sem OK explícito | — |

Frete: incluir **E-Frete** em paralelo a E1 (sidenav PDP) — ver checklist.

---

## 6. Testes e critérios de aceitação por etapa

### E0 — Baseline preview

- [ ] HTML contém `SDA-ZERO-v3-REWRITE`
- [ ] Ordem CSS conforme v3
- [ ] `sda-card.css` presente; stub `showcase-product-card` OK

### E1 — Busca e navegação (critérios mínimos)

- [ ] Busca termo → resultados >0, contagem correta
- [ ] Filtro + ordenação + paginação sem erro console
- [ ] Mega menu abre e links funcionam
- [ ] Mobile dock + strip nav scroll
- [ ] Comparador não quebra na busca
- [ ] Sem overflow horizontal 375px

### E-Frete (regressão confirmada pelo responsável)

- [ ] PDP → Calcular CEP → `POST /ajax/shippings/calculator` 200
- [ ] Opções prazo/valor renderizam
- [ ] CEP inválido mostra erro
- [ ] `localStorage.customer_zipcode` coerente

**Aceitação geral etapa busca/nav:** todos itens E1 **aprovados com evidência** ou ticket explícito para médio/baixo.

---

## 7. Riscos, rollback

| Risco | Mitigação |
|-------|-----------|
| Quebrar `setupSearch` | Não editar `search.liquid` sem teste paginação |
| Nav mobile vazia | Manter fallback inline até E5 |
| Perda URLs categoria | Não mudar slugs; só CSS |
| **Rollback** | Reativar tema produção anterior no painel WDNA |

---

## 8. Evidências já coletadas (produção, 28/out)

- Busca: `sda-search-count` presente; `setupSearch` no HTML.
- Filtros: form GET `/busca` com hidden ordem/paginação.
- Cards busca: mesma estrutura vitrine (`showcase-model-product`).

**Não marcado como aprovado** — baseline produção, não preview v3.

---

## 9. Aprovação solicitada

Confirmar:

1. Ordem das etapas E0–E7.
2. Escopo arquivo §3.
3. Uso do PR **#49** como fonte do pacote preview.
4. Inclusão de **E-Frete** no smoke obrigatório.

Após OK → implementar **somente no preview** e anexar resultados do `CHECKLIST_VALIDACAO_PREVIEW.md`.
