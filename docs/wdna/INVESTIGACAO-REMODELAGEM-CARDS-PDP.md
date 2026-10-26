# Investigação — o que impede remodelar cards e conteúdo da PDP

**Objetivo:** você exporta/cola os arquivos certos da WDNA; nós alinhamos markup + CSS num fluxo único.  
**Tema WDNA:** Site do Ar (Novo), ID 3 — base v1.14.36.

---

## 1. Resumo executivo (bloqueios reais)

| Bloqueio | Efeito na remodelagem |
|----------|------------------------|
| **4–5 folhas CSS brigando pelo mesmo card** | Qualquer mudança em um arquivo é revertida por outro (`!important`, mesmos seletores). |
| **`theme-all.css` (~645 KB)** | Estilos base de `.showcase-product`, `.card-footer`, grid desktop duplicados dentro de `@media (min-width: 992px)` — difícil prever cascata. |
| **`mega-menu.css` (~5,8k linhas)** | Dono de **CARD-MOBILE-REDESIGN**, cards “cycle frio/QF”, hover, **posição absoluta do Comparar** em alguns breakpoints. |
| **`product-compare.css` + `product-hover-image.css`** | Repetem layout de `.showcase-card-actions`, botões, alturas de card, temas por ciclo. |
| **`sda-conversion-redesign.css`** | Redesign de conversão (coluna Comparar/Comprar, `.sda-product-card`) — **só funciona se o Liquid tiver as classes certas**. |
| **Liquid desalinhado** | No Git atual, `showcase-model-product.liquid` **não** usa `sda-product-card` / `sda-card-footer`; a loja ao vivo pode ter versão de conversão diferente do repo. |
| **PDP “v2” incompleta no repo** | Branch conversão usa `product-v2`, `#product-pdp-v2`, seções extras — **não estão todas** em `cursor/site-recovery-b192`. |
| **`product-page-v2.css`** | Referenciado na conversão; histórico git com arquivo **0 bytes**. |
| **WDNA + `<template>` no comparador** | JSON visível no card se `product-compare-data.liquid` antigo ainda estiver na loja. |
| **JS (favoritos / hover / compare)** | Injeta DOM ou classes (`has-hover-image`, botão coração) — CSS precisa considerar markup dinâmico. |

**Conclusão:** remodelar “só o card no Figma” exige **escolher um dono** (ideal: `showcase-model-product.liquid` + **uma** folha de card, ex. `sda-conversion-redesign.css`) e **afastar** regras duplicadas de `mega-menu.css` / `product-hover-image.css` / `product-compare.css` (ou sobrescrever só no final, com seletores estáveis).

---

## 2. Onde o card é montado (Liquid)

### 2.1 Núcleo (obrigatório para qualquer vitrine)

| Arquivo WDNA | Função |
|--------------|--------|
| `sections/showcase-model-product.liquid` | **Único template de item** para home, busca, categorias, carrosséis, relacionados, etc. |
| `sections/product-spec-icons.liquid` | Pills técnicas acima do título (`showcase-spec-wrap`). |
| `sections/product-compare-data.liquid` | JSON oculto do comparador (usar `<div hidden>`, não `<template>`). |

### 2.2 Vitrines que **chamam** o núcleo (raramente precisam mudar para redesign de card)

| Pasta/arquivo | Uso |
|---------------|-----|
| `sections/showcase-model-1.liquid` … `showcase-model-14.liquid` | Modelos de vitrine no painel WDNA. |
| `sections/showcases-model-*.liquid` | Variantes agregadas (ex. model 9 promo). |
| `sections/showcase-model-product-promotion.liquid` | Card promo (model 9). |
| `sections/showcase-model-product-buy-to-gether.liquid` | Compre junto. |
| `sections/product-related.liquid` | PDP — produtos relacionados. |
| `sections/product-last-viewed.liquid` | PDP — vistos recentemente. |
| `sections/page-solar-calculator-products.liquid` | Simulador solar. |

### 2.3 Templates de página (só definem **onde** entra o card)

| Arquivo WDNA | Classe `<main>` |
|--------------|-----------------|
| `templates/home.liquid` | `home-main` → loop `showcase-model-*` |
| `templates/search.liquid` | `search-main` → grid/lista de produtos |
| `templates/product.liquid` | `product-main` → `product-content` |

### 2.4 Home conversão (se existirem na loja)

Enviar se estiverem no editor (branch conversão; **podem faltar no Git**):

- `sections/sda-home-hero.liquid`
- `sections/sda-home-ambiente.liquid`
- `sections/sda-home-necessidade.liquid`
- `sections/sda-trust-bar.liquid`
- `sections/sda-diag-cta.liquid`

---

## 3. PDP — conteúdo dentro do produto

### 3.1 Núcleo atual (repo recovery)

| Arquivo WDNA | Função |
|--------------|--------|
| `sections/product-content.liquid` | **~1100+ linhas** — breadcrumb, galeria, preço, variações, compra, frete, descrições, vitrines embutidas. |
| `sections/product-spec-icons.liquid` | Specs também na PDP (se renderizado). |
| `sections/product-buy-to-gether.liquid` | Compre junto. |
| `sections/product-kit.liquid` | Kits. |
| `sections/product-group-purchase.liquid` | Compra em grupo. |
| `sections/product-schema.liquid` | SEO/schema. |
| `templates/product.liquid` | Layout da página. |

**Produção (colagem 2026-10-26):** `sections/product-related.liquid` = **idêntico** ao repo (`.showcase-related` → `showcase-model-product` com cards `.sda-product-card`). Carousel: `theme.js` (`.showcase-list-related`).

**Produção (colagem 2026-10-26):** `sections/product-last-viewed.liquid` = **idêntico** ao repo (`.showcase-last-viewed`, lista estática sem setas; `lastProducts` → `showcase-model-product`). Mesmo cuidado: sem `showcaseSection` — corrigido em `showcase-model-product.liquid` (commit `fix(showcase)`).

**Produção (colagem 2026-10-26):** `templates/product.liquid` da loja = **idêntico** ao repo (`main` / `cursor/site-recovery-b192` / `cursor/conversion-redesign-b192`): só `main.product-main` + `sections/product-content` + sidenavs + footer; `script_footer` vazio. **Não é gargalo** da remodelagem — o HTML/CSS da conversão PDP mora em **`sections/product-content.liquid`** (e seções SDA opcionais), não neste template.

### 3.2 PDP conversão (enviar da loja se a PDP já estiver “v2”)

| Arquivo | No repo recovery? |
|---------|-------------------|
| `sections/product-content.liquid` (versão com `product-v2` / `#product-pdp-v2`) | **Sincronizado** com produção (recovery `cursor/site-recovery-b192`, 2026-10-26) |
| `sections/product-descriptions-v2.liquid` | **Sim** (import conversion branch) |
| `sections/product-pdp-cycle-class.liquid` | **Sim** |
| `sections/product-pdp-spec-bar.liquid` | **Sim** |
| `sections/sda-pdp-trust.liquid` | **Sim** (auxiliar; trust inline no buy box) |
| `sections/sda-pdp-recommendation.liquid` | **Sim** (repo; lista + JS sync área m²) |
| `assets/product-page-v2.css` | **Sim** (~3700 linhas) — escopo `#product-pdp-v2` / `.product-v2`; linkado **após** `sda-conversion-redesign.css`. |

Sem esses arquivos, mudar só CSS em `sda-conversion-redesign.css` na PDP **não aplica** (faltam classes no HTML).

---

## 4. CSS — ordem de carregamento (`layout/theme.liquid`)

Ordem **atual** no recovery (quem ganha por último na vitrine/PDP):

1. `assets/theme-plugins.css` — Spectre, `.hide-lg` / `.show-lg` (≥992px).
2. `assets/theme-all.css` — base WDNA + card/showcase (crítico, enorme).
3. `assets/theme-custom.css` — Site do Ar (preços, `.showcase-product_buy`, hover PDP).
4. `assets/mega-menu.css` — **cards mobile + desktop espelho**, mega menu, tema GLOBAL-BLACK.
5. `assets/header-v2.css` — só header (não card).
6. `assets/product-compare.css` — **Comparar/Comprar**, painel comparador.
7. `assets/product-hover-image.css` — hover 2ª foto, **cards cycle frio/QF**, muitos overrides de card.
8. `assets/sda-conversion-redesign.css` — conversão (deveria vencer, se publicado).
9. `<style id="header-orange-inline-v5">` — hotfix comparador + emergência header.

**Impedimento:** editar card no passo 4–7 sem tocar 8 (ou sem publicar 8) → remodelagem “não pega” no desktop ou no catálogo.

---

## 5. CSS — quem mexe no quê (cards)

| Arquivo | Trechos / IDs relevantes |
|---------|----------------------------|
| `theme-custom.css` | `.showcase-prices*`, `.showcase-product .card-footer`, `.showcase-product_buy`, lista busca `.showcase-search_list`. |
| `theme-all.css` | `.showcase-product`, grid vitrine, regras desktop duplicadas (auditoria `ALL-CSS-001`). |
| `mega-menu.css` | `CARD-MOBILE-REDESIGN-v1` (≤991px), bloco desktop ≥992 espelho catálogo, `.showcase-card-actions`, compare absolute em alguns contextos. |
| `product-compare.css` | Layout flex/absolute dos botões, ícone “C” no Comparar, mobile 2 col. |
| `product-hover-image.css` | `.showcase-product.card`, `.sda-card--cycle-frio/qf`, dimensões imagem, footer card. |
| `sda-conversion-redesign.css` | `.sda-product-card`, `.sda-card-footer`, coluna de ações, preços, **MEGA-MENU-OVERRIDE-v5** (header, não card inteiro). |

**Regra prática:** hoje há **~355+** menções a `showcase-card-actions` / `showcase-product.card` só entre `mega-menu.css`, `product-hover-image.css` e `product-compare.css`.

---

## 6. JavaScript que altera cards / PDP

| Arquivo | Efeito |
|---------|--------|
| `assets/theme.js` / `assets/theme-defer.js` | `handleAddToCart`, Alpine `setupProduct`, vitrine promo. |
| `assets/mega-menu.js` | `__SDA_HOVER_V2__`, nav fixa, faixa mobile — interfere no hover de imagem. |
| `assets/product-hover-image.js` | Segunda foto no hover, classes no card. |
| `assets/product-compare.js` | Seleciona comparar, lê `.product-compare-json`. |
| `assets/sda-conversion-redesign.js` | **v3** — catálogo (chips, filtros, diag CTA), PDP sticky/tech grid, attrs line nos cards; **linkado** em `theme.liquid` após `product-compare.js`. |
| `assets/favorites.js` | Botão coração nos cards (branch conversão) — **não no repo recovery**. |

---

## 7. Comparador e specs (dados no card)

| Arquivo | Nota |
|---------|------|
| `sections/product-compare-data.liquid` | Mesma lógica pesada de parsing de ficha que `product-spec-icons.liquid` — duplicada de propósito. |
| `sections/product-compare-panel.liquid` | UI flutuante comparar. |
| `assets/product-compare.css` / `.js` | Estilo + comportamento. |

Remodelar texto/ordem no card **não** exige mudar o painel, mas **exige** manter `data-compare-id` e bloco JSON oculto compatível com `product-compare.js`.

---

## 8. Pacote mínimo para você enviar (colar/export WDNA)

Copie **conteúdo inteiro** de cada arquivo para o agente (zip ou mensagens por grupo).

### Grupo A — Cards (prioridade 1)

```
sections/showcase-model-product.liquid
sections/product-spec-icons.liquid
sections/product-compare-data.liquid
layout/theme.liquid
assets/theme-custom.css
assets/mega-menu.css
assets/product-compare.css
assets/product-compare.js
assets/product-hover-image.css
assets/product-hover-image.js
assets/sda-conversion-redesign.css
```

### Grupo B — PDP (prioridade 2)

```
templates/product.liquid
sections/product-content.liquid
sections/product-related.liquid
sections/product-last-viewed.liquid
(+ se existir na loja) assets/product-page-v2.css
(+ se existir) sections/product-descriptions-v2.liquid
(+ se existir) sections/product-pdp-cycle-class.liquid
(+ se existir) sections/product-pdp-spec-bar.liquid
```

### Grupo C — Base pesada (só se formos mudar estrutura global)

```
assets/theme-all.css
assets/theme-plugins.css
assets/theme.js
assets/theme-defer.js
```

### Grupo D — Conversão / favoritos (se já publicou)

```
assets/favorites.css
assets/favorites.js
assets/sda-conversion-redesign.js
sections/showcase-model-product.liquid   (versão com coração / “Comprar agora”)
```

---

## 9. Checklist antes de remodelar (evita retrabalho)

1. Confirmar na loja: `showcase-model-product.liquid` tem classes `sda-product-card`, `showcase-card-body`, `sda-card-footer`? (sim/não)
2. Confirmar: `sda-conversion-redesign.css` está publicado e linkado no `theme.liquid`?
3. Confirmar: `product-compare-data` é `<div hidden>` (não `<template>`)?
4. Decidir **dono do CSS de card** (recomendado: expandir `sda-conversion-redesign.css` + podar duplicatas em `mega-menu.css` aos poucos).
5. PDP: versão legado (`product-content` clássico) ou v2 (`#product-pdp-v2`) — **não misturar** CSS das duas.

---

## 10. Referências no repo

| Documento | Conteúdo |
|-----------|----------|
| `docs/wdna/AUDITORIA-ARQUIVOS-CONSOLIDACAO.md` | Auditoria por arquivo (IDs CMP-*, PHV-*, ALL-CSS-*). |
| `docs/wdna/RECUPERACAO-SITE/` | Snapshots compare + layout recovery. |
| Branch `cursor/conversion-redesign-b192` | Liquid PDP v2 + home SDA (referência). |

---

## 11. Correções aplicadas (branch `cursor/site-recovery-b192`)

| Patch | Arquivo | Efeito |
|-------|---------|--------|
| Skip cycle theme | `mega-menu.js` → `applyCardCycleTheme` | Não aplica `sda-card--cycle-*` em `.sda-product-card` (evita row do hover-image). |
| Label Comparar | `product-compare.js` → `syncButtons` | Atualiza `.showcase-compare-btn__label` em vez de `textContent` no botão. |
| JS v3 | `sda-conversion-redesign.js` + `theme.liquid` | Catálogo/PDP/chips; classe `sda-conversion-v2` no `<html>`. |
| CSS | `sda-conversion-redesign.css` | `min-height` genérico só fora de `.sda-product-card`; bloco **CARD-CATALOG-OVERRIDE-v6** no catálogo/home. |

**Publicar no WDNA:** `layout/theme.liquid`, os quatro JS acima na ordem do layout, e `sda-conversion-redesign.css`.

## 12. Próximo passo sugerido

1. Diff **loja vs Git** em `showcase-model-product.liquid` e `product-content.liquid`.
2. Congelar **um** HTML de card alvo (classes + ordem: imagem → specs → título → preço → ações).
3. Mover regras de card para **uma** folha; deixar `mega-menu.css` só com mega menu + nav (fase 2).
4. Testar: home grid 2 col mobile, busca grid 3 col desktop, PDP relacionados, comparador 4 itens.
