# Site do Ar — funcionalidades e como estavam separadas

Documento de referência do tema WDNA + camada SDA (repositório `Site-do-Ar`). Descreve **o que o site faz**, **onde vive no código** e **como a separação evoluiu** (base WDNA → SDA custom → empilhamento legado → **v3 REWRITE**).

---

## 1. Camada base WDNA (plataforma — não substituir no upload parcial)

Estes arquivos vêm do ecossistema WDNA e carregam **antes** da customização SDA. Eles sustentam loja, carrinho, login, checkout e vitrines genéricas.

| Função | Onde |
|--------|------|
| Carrinho, login Alpine (`setupStore`, `setupProduct`), `handleAddToCart`, sidenavs | `assets/theme.js`, `assets/theme-defer.js` |
| Layout global, SEO, scripts do painel | `layout/theme.liquid` (estrutura + Alpine) |
| Estilos e componentes padrão WDNA | `assets/theme-all.css`, `assets/theme-plugins.css`, `assets/theme-custom.css` |
| Header markup clássico (logo, busca, conta, carrinho, menu mobile WDNA) | `sections/header.liquid` (+ `header-checkout.liquid` no checkout) |
| Footer, checkout, conta, endereços | `sections/footer.liquid`, `sections/checkout-*.liquid`, `sections/customer-*.liquid`, `sections/sidenav-overlay-*.liquid` |
| Vitrines por “modelo” (1–14, 9 promo, carrossel, etc.) | `sections/showcase-model-*.liquid`, `sections/showcases-model-*.liquid` |
| Busca, filtros, paginação | `sections/search-filter.liquid`, templates de busca |
| PDP genérica WDNA (preço, variação, frete, compra) | Lógica em `product-content.liquid` + JS do tema |
| Calculadora solar (página) | `sections/page-solar-calculator*.liquid`, `assets/theme-solar-calculator.js` |

**Contrato:** preços, estoque, parcelas, frete e checkout vêm dos **dados WDNA** + `theme.js`; a camada SDA não recalcula regras comerciais.

---

## 2. Camada SDA — funcionalidades custom e separação **atual (v3 REWRITE)**

Ordem no `<head>` (`layout/theme.liquid`, marcador `SDA-ZERO-v3-REWRITE`):

```
sda-tokens → mega-menu → header-v2 → favorites → product-compare → product-hover-image
→ sda-conversion-redesign → product-page-v2 → sda-card
```

Scripts no fim do body: `mega-menu.js`, `product-compare.js`, `sda-conversion-redesign.js`, `product-hover-image.js`, `favorites.js`.

### 2.1 Design tokens (cores, alturas, nav, touch)

| Função | CSS |
|--------|-----|
| Paleta, CTA primária, alturas de card, dock/compare/sticky | `assets/sda-tokens.css` |

---

### 2.2 Cabeçalho (barra superior)

| Função | Markup | CSS | JS |
|--------|--------|-----|-----|
| Logo, busca desktop/mobile, conta, carrinho, faixa topo (banner WDNA) | `sections/header.liquid` (`header header-v2 sda-header-v2`) | `assets/header-v2.css` (+ base `theme-all`) | `theme.js` (Alpine, busca `alterForm2`) |
| Utility bar, busca pill, ações v2, strip mobile de chips (Ambiente, Diagnóstico, etc.) | Idem + classes `header-v2-*` | `header-v2.css` | — |
| Badge carrinho laranja, hover conta/telefone | — | `header-v2.css` | — |
| Checkout sem header completo | `sections/header-checkout.liquid` | `header-v2.css` / tema base | — |

**Antes (problema):** mesmas regras repetidas em `theme.liquid` (inline), `mega-menu.css` (HEADER-ORANGE, HEADER-INVERT preto), `sda-conversion-redesign.css` (MEGA-MENU-OVERRIDE).

**Agora:** barra = **`header-v2.css`** apenas.

---

### 2.3 Navegação principal + mega menu “Ar Condicionado”

| Função | Markup | CSS | JS |
|--------|--------|-----|-----|
| Template HTML do mega menu (colunas BTU, marcas, banners) | `sections/mega-menu-ar.liquid` (`#mega-menu-ar-template`) | `assets/mega-menu.css` | `assets/mega-menu.js` (`initMegaMenuAr`, monta painel no item “Modelos”) |
| Barra nav azul desktop (ícones + texto branco) | Menu WDNA em `.nav-content` dentro do header | `mega-menu.css` (bloco NAV-BLUE) | WDNA + mega-menu |
| Nav fixa ao rolar, spacer | — | `mega-menu.css` (NAV-FIXED) | Script em `theme.liquid` + `mega-menu.js` (strip mobile) |
| Mobile: nav oculta no topo, **3 categorias** ao rolar (`sda-mobile-nav-revealed`, `sda-mobile-nav-strip--3`) | `.nav-content` | `mega-menu.css` | `mega-menu.js` |
| Carrossel de banners dentro do mega menu | HTML em `mega-menu-ar.liquid` | `mega-menu.css` | `initMegaMenuCarousel` |

**Antes:** `mega-menu.css` também tinha **GLOBAL-BLACK** (nav/header/filtros pretos), estilos de **comparador preto** e **cards PRODUCT-CARD-v2** (~2500 linhas históricas).

**Agora:** **`mega-menu.css`** = só nav + mega + dock + mobile strip (sem card, sem compare, sem tema preto global).

Espelho legado (não usar): `assets/sda-nav.css` (stub).

---

### 2.4 Dock mobile (catálogo em 1 toque)

| Função | CSS | JS |
|--------|-----|-----|
| Barra fixa inferior: Início, Catálogo, Conta, etc. | `mega-menu.css` (`mobile-catalog-dock`, `has-mobile-catalog-dock`) | `mega-menu.js` (injeta dock, sheets de links) |
| Padding no body/footer para não tapar conteúdo | `mega-menu.css` | classes no `body` |

**Antes:** altura/padding duplicados em `header-v2.css` (50px vs 58px).

**Agora:** dono único **`mega-menu.css`**.

---

### 2.5 Cards de produto (vitrine)

| Função | Markup | CSS | JS |
|--------|--------|-----|-----|
| Card v5: imagem → specs → título → preço Pix/parcelas → Comprar → Comparar | `sections/showcase-model-product.liquid` (`sda-card`, `v5-zero`) | **`assets/sda-card.css`** (único dono visual) | `handleAddToCart` (`theme.js`) |
| Ícones BTU/ciclo/tensão (dados reais do produto) | `sections/product-spec-icons.liquid` | `sda-card.css` | — |
| Linha BTU no título quando aplicável | `sections/sda-card-btu-line.liquid` | `sda-card.css` | — |
| Payload JSON do comparador (oculto) | `sections/product-compare-data.liquid` | `product-compare.css` | `product-compare.js` |
| Promo / bundle / modelos antigos (9, etc.) | `showcase-model-product-promotion.liquid`, outros `showcase-model-*` | `sda-card.css` (promo model-9) ou legado WDNA | — |
| Cards **sem** `.sda-product-card` (tema antigo na loja) | Vitrines WDNA antigas | `product-compare.css` + `theme-all` | compare + tema |

**Antes:** visual espalhado em `mega-menu.css` (PRODUCT-CARD-v2), `showcase-product-card.css`, `sda-conversion-redesign.css` (CARD-FIX-v4), `product-hover-image.css`, inline no `theme.liquid`.

**Agora:** vitrine SDA = **`sda-card.css`**. `showcase-product-card.css` = stub (não é dono).

---

### 2.6 Comparador de produtos (até 3 itens)

| Função | Markup | CSS | JS |
|--------|--------|-----|-----|
| JSON por produto | `product-compare-data.liquid` | oculto em `product-compare.css` | — |
| Barra inferior “N selecionados”, Limpar, Comparar | `sections/product-compare-panel.liquid` | `product-compare.css` (`has-compare-bar`, acima do dock no mobile) | `product-compare.js` (`localStorage` v3) |
| Painel modal: cards, tabela specs, insights, CTAs compra | Idem | `product-compare.css` (`compare-panel-open`) | idem |
| Botão Comparar na PDP | Markup WDNA + classes | `product-page-v2` / conversion (PDP) | idem |

**Antes:** UI do comparador também estilizada em **preto** dentro de `mega-menu.css`.

**Agora:** **`product-compare.css` + `product-compare.js`** only.

---

### 2.7 Favoritos

| Função | Markup | CSS | JS |
|--------|--------|-----|-----|
| Botão coração no card | `showcase-model-product.liquid` (`data-favorite-toggle`) | `assets/favorites.css` | `assets/favorites.js` (`localStorage`, evento `sitedoar-favorites-change`) |
| Painel lateral lista favoritos | `sections/sidenav-overlay-favorites.liquid` | `favorites.css` | `favorites.js` + `theme.js` |

---

### 2.8 Hover segunda imagem no card

| Função | CSS | JS |
|--------|-----|-----|
| Troca imagem ao passar mouse (se não desligado) | `product-hover-image.css` (enxuto) | `product-hover-image.js` |
| Desliga se mega-menu ativa hover v2 | — | `mega-menu.js` seta `window.__SDA_HOVER_V2__` |

---

### 2.9 Comportamento conversão (sem “visual de card/header”)

| Função | CSS | JS |
|--------|-----|-----|
| Barra confiança + CTA Diagnóstico 360 na home/catálogo | `sda-conversion-redesign.css` | `injectCatalogDiagIfMissing`, blocos HTML |
| Contagem “N produtos encontrados” na busca | idem | `enhanceSearchCount` |
| Toggle ocultar filtros desktop | idem | `setupDesktopFilterToggle` |
| Chips de filtros ativos, labels mobile | idem | `renderActiveFilterChips`, `enhanceMobileFilterLabel` |
| Linha de atributos nos cards (texto derivado das tags) | idem | `buildCardAttrLines` |
| Limite de chips de spec no card | idem | `limitCardSpecChips` |
| Sticky compra PDP mobile (`.sda-pdp-sticky-buy`) | idem + coordenação tokens | `pdpStickyBuy` |
| Classe `sda-pdp-mobile`, grid técnico mobile PDP | idem | `pdpMobileChrome`, `pdpTechGrid` |
| Dica de m² / recomendação PDP | idem | `productAreaHint`, `syncRecommendationArea` |
| Carrosséis home (autoplay off, limite slides) | idem | `limitHomeCarousels` |
| Estilo leve caixa compra PDP (header-box) | idem | — |

**Antes:** este arquivo também continha **dezenas de regras de card** e **override de header/nav**.

**Agora:** **`sda-conversion-redesign.css`** = comportamento + blocos transversais; **não** mexe em `.sda-card` / header / nav.

---

### 2.10 Página de produto (PDP v2)

| Função | Markup | CSS | JS |
|--------|--------|-----|-----|
| Shell `#product-pdp-v2.product-v2`, breadcrumb, galeria, compra, frete | `sections/product-content.liquid` | **`assets/product-page-v2.css`** | `theme.js` (`setupProduct`), Alpine |
| Descrição / Destaques / Especificações (accordions v2) | `sections/product-descriptions-v2.liquid` | `product-page-v2.css` | — |
| Barra de specs (ícones) | `product-pdp-spec-bar.liquid`, `product-spec-icons.liquid` | `product-page-v2.css` + conversion | — |
| Classe ciclo frio/QF no root PDP | `product-pdp-cycle-class.liquid` | `product-page-v2.css` (--cycle-qf) | — |
| Bloco confiança + recomendação Diagnóstico | `sda-pdp-trust.liquid`, `sda-pdp-recommendation.liquid` | `product-page-v2.css` / conversion | — |
| Nav mobile enxuta na PDP | — | `product-page-v2.css` (`body.sda-pdp-mobile`) | `sda-conversion-redesign.js` |
| Cálculo frete (CEP) | Markup WDNA + sidenav | WDNA + sidenav CSS | `theme.js` / sidenav shipping |

---

### 2.11 Diagnóstico 360

| Função | Onde |
|--------|------|
| Página completa com iframe/quiz | `templates/page.diagnostico.liquid`, `sections/diagnostico-360.liquid` |
| Popup na home (scroll + tempo, sessão/localStorage) | HTML/CSS/JS em `layout/theme.liquid` (`#diag360pop`) |
| CTAs no catálogo / header / mega links | Links para `/pagina/diagnostico-360`, estilos em `header-v2`, `sda-conversion` |

---

### 2.12 Carrinho, conta, frete (sidenav)

| Função | Markup |
|--------|--------|
| Carrinho lateral | `sections/sidenav-overlay-cart.liquid` (+ script) |
| Conta / login | `sections/sidenav-overlay-account.liquid` |
| Cálculo frete | `sections/sidenav-shipping-calculation.liquid` |
| Pagamento parcelas | `sections/sidenav-payment-calculation.liquid` |

**JS principal:** `theme.js` (`openSideNavOverlay`, etc.).

---

### 2.13 Outras vitrines / relacionados (WDNA + SDA)

| Função | Onde |
|--------|------|
| Relacionados, “últimos vistos”, compre junto, kit | `product-related.liquid`, `product-buy-to-gether.liquid`, `showcase-model-product-buy-to-gether.liquid`, etc. |
| Modelo 9 (promo horizontal) | `showcase-model-9.liquid` / `showcases-model-9.liquid` — layout em `sda-card.css` |

Quando a vitrine usa **`showcase-model-product.liquid` v5**, entra no sistema **`sda-card`**.

---

## 3. Como estava separado **na prática** (antes do v3) — o que cansava

Além da separação “ideal” acima, o site **acumulou camadas** que faziam a mesma coisa:

| Sintoma | Onde se empilhava |
|---------|-------------------|
| Nav ora azul ora preta | `mega-menu.css` (NAV-BLUE + GLOBAL-BLACK + HEADER-INVERT) + `sda-conversion` (MEGA-MENU-OVERRIDE) |
| Header claro vs preto | `header-v2.css` + inline `theme.liquid` + `mega-menu.css` |
| Visual de card | `mega-menu`, `showcase-product-card.css`, `sda-card.css`, `sda-conversion` (CARD-FIX), `product-compare`, `product-hover-image` |
| Comparador | `product-compare.css` + trecho preto em `mega-menu.css` |
| Dock 58px vs 50px | `mega-menu.css` vs `header-v2.css` |
| JSON comparador oculto | `product-compare.css` + `<style>` no `theme.liquid` |

Isso exigia publicar **vários arquivos** e ainda “quem carrega por último vence” — frágil e difícil de auditar.

---

## 4. Separação **alvo** hoje (v3 REWRITE) — resumo em uma frase por domínio

- **Tokens** → `sda-tokens.css`
- **Barra do topo** → `header-v2.css` + `sections/header.liquid`
- **Menu + dock mobile** → `mega-menu.css` + `mega-menu.js` + `mega-menu-ar.liquid`
- **Card vitrine** → `showcase-model-product.liquid` + `sda-card.css`
- **Comparador** → `product-compare-*` + `product-compare.js`
- **Favoritos** → `favorites.*` + sidenav favorites
- **Hover imagem** → `product-hover-image.*` (subordinado a `__SDA_HOVER_V2__`)
- **PDP visual** → `product-content.liquid` + `product-page-v2.css` + sections PDP
- **PDP/comportamento home-busca** → `sda-conversion-redesign.*`
- **Loja/carrinho/checkout/preço** → WDNA `theme.js` + templates base

---

## 5. Pacote WDNA recomendado

Lista oficial de arquivos SDA para tema novo: `docs/wdna/pacote-sda/MANIFEST.txt` (34 paths) → zip `docs/wdna/pacote-sda/tema-sda-ultimo.zip`.

**Não substituir** no painel (salvo orientação): `theme.js`, `theme-defer.js`, `theme-plugins.css`, templates de checkout, `config.json`.

---

*Gerado a partir do repositório Site-do-Ar (branch `cursor/card-remodel-b192`, SDA ZERO v3 REWRITE).*
