# Auditoria individual WDNA — registro consolidado

**Tema:** Site do ar (Novo), ID 3, base **v1.14.36**  
**Modo:** somente leitura (achados por arquivo; sem alteração de código na auditoria)  
**Atualizado:** 23 out 2026 (America/Sao_Paulo)  
**Escopo deste documento:** arquivos já auditados **neste thread** (colagem + respostas A–H)

---

## Como usar

- Cada arquivo tem **veredito**, **achados (ID + severidade + confiança)** e **verificar depois** na auditoria geral.
- IDs preservam o prefixo usado em cada resposta (`FAV-*`, `HDR-*`, `MEGA-*`, `CMP-*`, `PHV-*`, `PDP2-*`, `PV2-*`, `ALL-CSS-*`, `CUS-CSS-*`, `THDEF-JS-*`, `THM-JS-*`, `PLG-CSS-*`).
- **Git:** nem todos os arquivos abaixo existem no checkout local; ver coluna *No repo*.

---

## Índice rápido

| # | Arquivo | Veredito | No repo `/workspace` |
|---|---------|----------|----------------------|
| 1 | `assets/favorites.css` | Atenção | Não |
| 2 | `assets/favorites.js` | Atenção | Não |
| 3 | `assets/header-v2-mobile.js` | Atenção | Não |
| 4 | `assets/header-v2.css` | Atenção | Não |
| 5 | `assets/mega-menu.css` | Atenção | Sim |
| 6 | `assets/mega-menu.js` | Atenção | Sim |
| 7 | `assets/product-compare.css` | Atenção | Não |
| 8 | `assets/product-compare.js` | Atenção | Não |
| 9 | `assets/product-hover-image.css` | Atenção | Sim |
| 10 | `assets/product-hover-image.js` | Atenção | Sim |
| 11 | PDP estendido `#product-pdp-v2` (caminho não informado na colagem) | Atenção | Não |
| 12 | PDP base `.product-v2` (caminho não informado na colagem) | Atenção | Não |
| 13 | `assets/theme-all.css` | Crítico | Sim |
| 14 | `assets/theme-custom.css` | Atenção | Sim (Git > colagem Ly; ver #14) |
| 15 | `assets/theme-defer.js` | Atenção | Sim (= colagem “THEME SCRIPTS”) |
| — | `assets/theme.js` (bundle vendors + init) | Atenção | Sim — ver relação #15 |
| 16 | `assets/theme-plugins.css` | Informativo / Atenção | Sim (= colagem formatada; repo 1 linha ~80 KiB) |

**Progresso vs 107 itens WDNA:** 16 arquivos catalogados aqui (~15%).

---

## Relações cruzadas (auditoria geral)

| Tema | Arquivos / IDs |
|------|----------------|
| Comparador | `CMP-JS-001` ↔ `data-compare-id` no Liquid; `CMP-CSS-001` ↔ `.is-selected` / `aria-pressed` |
| Hover imagem | `PHV-JS-005` ↔ `mega-menu.js` / `__SDA_HOVER_V2__`; `PHV-CSS-001` ↔ ordem CSS em `theme.liquid` |
| Header laranja | `PHV-CSS-*` overrides vs `header-v2.css`, `theme-custom.css` |
| Bundle base | `ALL-CSS-001` duplica ~15,3k linhas dentro de `@media (min-width: 992px)` — cascata desktop imprevisível vs `theme-custom.css` / folhas PDP |
| Custom Ly + hover | `CUS-CSS-001` regras conflitantes em `.product-related` / vitrine; `CUS-CSS-010` mitiga `ALL-CSS-003` (`.product-main:hover`) |
| Header dual | `CUS-CSS-015` header legado `.header` vs `header-v2.css` (laranja) — ordem de CSS decide vitória |
| JS tema | `theme.js` (~292 KiB vendors) + `theme-defer.js` (window `load`); `THDEF-JS-*` PDP/busca; `setCookie`/`Notyf` em `theme.js` |
| CSS stack | `theme-plugins.css` (Spectre+plugins) → `theme-all.css` → `theme-custom.css`; `PLG-CSS-*` `.btn`/`.card` vs identidade azul |
| PDP duplicidade | Folha **#product-pdp-v2** (PDP2) vs folha **.product-v2** (PV2) — confirmar qual(is) entram no manifest |
| Sync WDNA ↔ Git | ~18+ itens possivelmente só no editor; export delta omite padrão/vazio |

---

## 1. `assets/favorites.css`

**Função:** Wishlist (coração), badge no header, página `/pagina/favoritos`, sidenav; mobile com `:has()`.

**Veredito:** Foram encontrados problemas que precisam de atenção.

**Achados (registro resumido — detalhe A–H nas mensagens anteriores do thread):**

| ID | Sev. | Conf. | Nota |
|----|------|-------|------|
| FAV-CSS-001 | Média | Média | Uso de `:has()` — compatibilidade / fallback |
| FAV-CSS-002+ | Variada | — | Posicionamento badge, sidenav, especificidade vs tema base |

**Verificar depois:** `layout/theme.liquid`, `header-v2.css`, markup do badge; browsers alvo.

---

## 2. `assets/favorites.js`

**Função:** Favoritos client-side; `localStorage` `sitedoar_favorites_v1`; StoreSDK `/ajax/wishlist`; injeção de botões nos cards.

**Veredito:** Foram encontrados problemas que precisam de atenção.

**Achados (resumido):**

| ID | Sev. | Conf. | Nota |
|----|------|-------|------|
| FAV-JS-001 | Média | Alta | Falhas silenciosas storage/API |
| FAV-JS-002+ | Variada | — | Sincronização servidor vs local; DOM injection |

**Verificar depois:** contrato StoreSDK WDNA; templates de card; auth/sessão.

---

## 3. `assets/header-v2-mobile.js`

**Função:** Barra utilitária, faixa mobile, link “semana ofertas”, sync catalog dock, scroll compacto.

**Veredito:** Foram encontrados problemas que precisam de atenção.

**Achados (resumido):** IDs `HDR-JS-*` — dependência de markup header v2, ordem de script, observers.

**Verificar depois:** `sections/header.liquid`, `mega-menu.js` (dock catálogo).

---

## 4. `assets/header-v2.css`

**Função:** Design system header v2 (Akhand, busca central, faixa catálogo mobile, dock).

**Veredito:** Foram encontrados problemas que precisam de atenção.

**Achados (resumido):** IDs `HDR-V2-CSS-*` — cascata vs `theme-all` / `product-hover-image.css` (laranja).

**Verificar depois:** ordem de CSS no layout; classes reais do header publicado.

---

## 5. `assets/mega-menu.css`

**Função:** Mega menu, cards, hover images, tags de spec, overrides vitrine.

**Veredito:** Foram encontrados problemas que precisam de atenção.

**Achados (resumido):** IDs `MEGA-CSS-*` (ex. compare mobile icon-only, hover v2).

**Verificar depois:** `sections/mega-menu-ar.liquid`, `mega-menu.js`.

---

## 6. `assets/mega-menu.js`

**Função:** Mount template mega menu, carrossel, `window.__SDA_HOVER_V2__`, dock mobile, rewrite URL Midea.

**Veredito:** Foram encontrados problemas que precisam de atenção.

**Achados (resumido):** IDs `MEGA-JS-*` — coexistência com `product-hover-image.js`, compare delegation.

**Verificar depois:** `theme.liquid` scripts; flag hover v2 vs script legado.

---

## 7. `assets/product-compare.css`

**Função:** Botão comparar nos cards, barra flutuante, painel modal, tabela specs, insights.

**Veredito:** Foram encontrados problemas que precisam de atenção.

**Achados (resumido):**

| ID | Sev. | Conf. | Nota |
|----|------|-------|------|
| CMP-CSS-001 | Média | Média | `.is-selected` vs `aria-pressed` (JS passa a setar ambos se `data-compare-id` ok) |

**Verificar depois:** shell `#product-compare-bar` / `#product-compare-panel` no layout.

---

## 8. `assets/product-compare.js`

**Versão:** `2026-09-16-compare-v9-unified`  
**Função:** Até 3 produtos; storage v3 (+ migração v2); enrich specs; barra + modal.

**Veredito:** Foram encontrados problemas que precisam de atenção.

**Achados:**

| ID | Sev. | Conf. |
|----|------|-------|
| CMP-JS-001 | Alta | Alta — sync `data-compare-id` vs `product.id` |
| CMP-JS-002 | Média | Alta — modal sem focus trap |
| CMP-JS-003 | Média | Média — `alt=""` no painel |
| CMP-JS-004 | Média | Alta — `saveState` silencioso |
| CMP-JS-005 | Média | Média — `textContent` no botão vs icon-only |
| CMP-JS-006 | Média | Alta — clique sem dados sem feedback |
| CMP-JS-007 | Média | Baixa — `innerHTML` + escapeHtml |
| CMP-JS-008 | Média | Média — `compare-panel-open` pode faltar no CSS |
| CMP-JS-009 | Informativa | Alta — heurísticas BTU/área |
| CMP-JS-010–016 | Baixa/Inf. | variada |

**Verificar depois:** `showcase-model-product.liquid`, `product-compare-data.liquid`, `theme.liquid`.

---

## 9. `assets/product-hover-image.css`

**Versão:** `2026-09-16-hover-shim-v1`  
**Função:** Shim opacity hover; overrides header laranja; fix opacity banners.

**Veredito:** Foram encontrados problemas que precisam de atenção.

**Achados:**

| ID | Sev. | Conf. |
|----|------|-------|
| PHV-CSS-001 | Média | Média — depende de ser “último CSS” no layout |
| PHV-CSS-002 | Média | Alta — 3 responsabilidades num asset “hover” |
| PHV-CSS-003 | Média | Média — hover card sem `@media (hover: hover)` |
| PHV-CSS-004 | Baixa | Média — seletores header underscore vs hífen |
| PHV-CSS-005 | Baixa | Alta — massa de `!important` |
| PHV-CSS-006–011 | Baixa/Inf. | variada |

**Verificar depois:** ordem CSS; `header-v2.css`; DOM header.

---

## 10. `assets/product-hover-image.js`

**Função:** Segunda imagem WebP `-0-` → `-1-`; wrap DOM; touch `is-img-hover`.

**Veredito:** Foram encontrados problemas que precisam de atenção.

**Achados:**

| ID | Sev. | Conf. |
|----|------|-------|
| PHV-JS-001 | Alta | Alta — toque não alterna (só adiciona `is-img-hover`) |
| PHV-JS-002 | Alta | Alta — `init` não idempotente (listeners duplicados) |
| PHV-JS-003 | Média | Média — race touchstart vs `urlExists` async |
| PHV-JS-004 | Média | Média — `preventDefault` no primeiro touchend |
| PHV-JS-005 | Média | Média — suspeita overlap `mega-menu.js` / `__SDA_HOVER_V2__` |
| PHV-JS-006 | Média | Média — exige `.showcase-product.card` |
| PHV-JS-007–014 | Baixa/Inf. | variada |

**Verificar depois:** ordem scripts; padrão URL CDN; quem chama `initProductHoverImage`.

---

## 11. Folha PDP estendida (`#product-pdp-v2` + bloco V3)

**Caminho no tema:** *não informado na colagem* (possível `assets/product-pdp-v2.css` ou similar — **confirmar nos 107 itens**).

**Função:** PDP completa monolítica: galeria painel, buy box denso, acordeão, nav mobile, `.product-showcase`, variantes `--cycle-frio` / `--cycle-qf`.

**Veredito:** Foram encontrados problemas que precisam de atenção.

**Achados:**

| ID | Sev. | Conf. |
|----|------|-------|
| PDP2-CSS-001 | Alta | Alta — v2 `details:not([open])` vs V3 `display:block` desktop (acordeão) |
| PDP2-CSS-002 | Alta | Alta — v2 mock + V3 no mesmo arquivo, métricas conflitantes |
| PDP2-CSS-003 | Média | Média — `nowrap` preço + `overflow-x: hidden` |
| PDP2-CSS-004 | Média | Alta — tipografia trust 8.5–9px |
| PDP2-CSS-005 | Média | Baixa — `aspect-ratio` / gradient vs comentário WDNA |
| PDP2-CSS-006 | Média | Média — ocultação galeria/tns legado |
| PDP2-CSS-007 | Média | Média — `.product-payments` oculto no box |
| PDP2-CSS-008 | Média | Média — z-index nav mobile vs compare/header |
| PDP2-CSS-009–016 | Baixa/Inf. | variada |

**Verificar depois:** `sections/product-content.liquid`, ordem CSS, JS galeria/thumbs.

---

## 12. Folha PDP base (escopo `.product-v2` only)

**Caminho no tema:** *não informado na colagem* (possível companion “base” vs item 11).

**Função:** PDP v2 enxuta — flex, galeria slider desktop, mobile acordeão, CEP, trust, specs/highlights.

**Veredito:** Foram encontrados problemas que precisam de atenção.

**Achados:**

| ID | Sev. | Conf. |
|----|------|-------|
| PV2-CSS-001 | Média | Média — `.product-gallery_mobile { display:none }` |
| PV2-CSS-002 | Média | Alta — `.product-payments { display:none }` |
| PV2-CSS-003 | Média | Média — acordeão depende de `<details>` |
| PV2-CSS-004 | Média | Média — pouco `!important` vs tema base |
| PV2-CSS-005–012 | Baixa/Inf. | variada |

**Verificar depois:** coexistência com folha 11; markup galeria mobile.

---

## 13. `assets/theme-all.css`

**Função:** Folha CSS monolítica do tema WDNA (reset, tipografia Akhand, botões, formulários, vitrine/showcase, PDP legado `.product-main`, checkout, sidenavs, busca/filtros). Carregada globalmente via `layout/theme.liquid` após `theme-plugins.css` e antes de `theme-custom.css`.

**Veredito:** Foram encontrados problemas **críticos** (duplicação massiva + cauda sintática quebrada); estabilização exige correção estrutural antes de confiar em refinamentos visuais em folhas satélite.

**Achados:**

| ID | Sev. | Conf. | Nota |
|----|------|-------|------|
| ALL-CSS-001 | **Crítica** | Alta | A partir de ~L15417, `@media (min-width: 992px)` não fecha após regras de `.form-group_potencia`; ~L15426–30759 repetem quase todo o bundle (incl. `@font-face`) **só em desktop** — ~632 KiB / ~30,9k linhas (~2× tamanho útil) |
| ALL-CSS-002 | Alta | Alta | Cauda ~L30872–30881: blocos `.form-group_potencia .form-input` indentados sem `@media` pai — provável colagem/merge corrompido |
| ALL-CSS-003 | Alta | Alta | `.product-main:hover { transform; box-shadow }` duplicado (~L30864–30890) — efeito de “card flutuante” no container PDP, não só em vitrine |
| ALL-CSS-004 | Média | Alta | `*:focus { outline: none }` (~L49) — foco global suprimido; conflita com correções a11y em folhas PDP/header |
| ALL-CSS-005 | Média | Alta | Tipografia 100% CDN `salescdn.net` (4× `@font-face`, duplicados no bloco desktop) — dependência rede + parse extra |
| ALL-CSS-006 | Média | Média | Transforms/hover sem `@media (prefers-reduced-motion: reduce)` |
| ALL-CSS-007 | Média | Média | 68× `!important`; parte efetiva em dobro no cascade ≥992px por ALL-CSS-001 |
| ALL-CSS-008 | Baixa | Média | `unicode-range: U+000-5FF` (possível typo vs `U+0000-05FF`) em `@font-face` |
| ALL-CSS-009 | Informativa | Alta | `.product-main` base (~L13357 e ~L28782 na cópia interna) coexistindo com customizações `#product-pdp-v2` / `.product-v2` auditadas à parte |

**Verificar depois:** diff editor WDNA vs Git pós-export; impacto desktop em vitrine, busca/filtro potência e PDP; ordem final `theme-plugins.css` → `theme-all.css` → `theme-custom.css` → assets v2 (header, mega-menu, hover).

**Registro G (compacto):** `theme-all.css` | Crítico | ALL-CSS-001..009 | desktop duplicate @992px; tail syntax; PDP hover; focus; fonts CDN

---

## 14. `assets/theme-custom.css`

**Função:** Folha de customização agregada (“Custom Ly 2024-10-21”): header legado WDNA, faixa topo CDN, vitrine/preços, neutralização de “pulo” na PDP, footer premium (CTA + grid), cards showcase, botões (checkout/filtro/comprar/login), filtros busca (BTU, marcas chip, sticky), mobile “todos produtos”. Carregada **por último** entre bundles base (`theme.liquid` → após `theme-all.css`).

**Veredito:** Atenção — arquivo funcional e rico, porém **camadas empilhadas**, **169× `!important`**, regras de hover **auto-conflitantes** e divergência **colagem vs Git** (repo ~3,3k linhas com tokens Fase 2A e blocos PDP 2B+; colagem do thread ≈ núcleo Ly sem trecho final pix verde `#15803d` presente só na colagem).

**Achados:**

| ID | Sev. | Conf. | Nota |
|----|------|-------|------|
| CUS-CSS-001 | Alta | Alta | `.product-related .showcase-product.card:hover` (−8px) vs bloco posterior “Remove pulo” (`transform: none`) — intenção ambígua; cards `.card` mantêm lift |
| CUS-CSS-002 | Alta | Média | `.showcase-products .showcase-product:hover { transform: none }` pode anular hovers em cards **sem** classe `.card` |
| CUS-CSS-003 | Média | Alta | Marcador `/*** START - Custom Ly 2024-10-21 ***/` duplicado (~L1 e ~L1000) — crescimento orgânico / difícil diff |
| CUS-CSS-004 | Média | Alta | Dois blocos `:root` no Git (tokens `--pdp-*` ~L9 + footer ~L1019); colagem só footer |
| CUS-CSS-005 | Média | Alta | Footer: variáveis CSS depois overrides sólidos/gradiente repetidos (~L1570+) |
| CUS-CSS-006 | Média | Alta | `.top-content img { content: url(salescdn…) }` — URL hardcoded; repo ≠ colagem (banner distinto) |
| CUS-CSS-007 | Alta | Média | `.search-filter_category { display: none !important }` — oculta filtro categorias inteiro |
| CUS-CSS-008 | Média | Alta | Ocultar inputs `[value="frio"]` / `quente-frio` — frágil se valores WDNA mudarem |
| CUS-CSS-009 | Média | Alta | 169× `!important`; competição com `ALL-CSS-001` desktop duplicado |
| CUS-CSS-010 | Informativa | Alta | Mitiga hover `.product-main` de `theme-all` (`transform/transition: none`) |
| CUS-CSS-011 | Média | Média | Múltiplos hovers/`will-change` sem `prefers-reduced-motion` |
| CUS-CSS-012 | Baixa | Alta | Borda card `#163d5c` (~L1627) vs `#b8cfe8` (~L2013) — mesma superfície, cores diferentes |
| CUS-CSS-013 | Baixa | Alta | `.search-filters` sticky declarado 2× em `@media (min-width: 992px)` |
| CUS-CSS-014 | Média | Alta | `.cart_quantity`: colagem `#f97316` vs Git `#61bb47` — drift identidade/header v2 |
| CUS-CSS-015 | Média | Alta | Sem referência a `header-v2`; estiliza `.header` legado (cinza `#f8f8f8`, ícones `#4b96d4`) |
| CUS-CSS-016 | Baixa | Média | Colagem final pix verde (`#15803d`) ausente no Git — sincronizar export |

**Verificar depois:** body classes `page-product` / `product-page`; markup footer novo; coexistência header v2; filtros busca após ocultar categorias; ALL-CSS-003 + CUS-CSS-010 na PDP real.

**Registro G (compacto):** `theme-custom.css` | Atenção | CUS-CSS-001..016 | hover conflicts; !important; filters hidden; dual header; paste≠Git

---

## 15. `assets/theme-defer.js`

**Função:** Scripts WDNA adiados (`loadFilesJSDefer` em `theme.liquid` após `window.load`): Notyf global, copiar URL, toggle senha, grid/lista busca + cookie `viewType`, auto-submit filtros (potência BTU), AJAX PDP (`handleProductVariation` / `handleProductPriceGroup` → eventos `update-ajax-product*`), utilitários URL. **A colagem do thread é este arquivo** (não o monólito `theme.js`).

**Veredito:** Atenção — lógica core PDP/busca; bugs clássicos (loop `var`, mutação de state, API copy obsoleta); depende de `Notyf`, `StoreSDK`, `setCookie`/`getCookie` definidos antes/no `theme.js`.

**Achados:**

| ID | Sev. | Conf. | Nota |
|----|------|-------|------|
| THDEF-JS-001 | Alta | Alta | `productJSONTransform`: `stateTemp = state` muta objeto Alpine in-place — efeitos colaterais |
| THDEF-JS-002 | Alta | Alta | Submit filtro potência: `preventDefault` + `this.submit()` nativo — frágil; loops aninhados reutilizam `var x` |
| THDEF-JS-003 | Média | Alta | Toggle senha altera **todos** `.form-icon_password__hide/show` da página, não só o grupo clicado |
| THDEF-JS-004 | Média | Alta | `copyLinkLocation`: `document.execCommand('copy')` depreciado; `el.style = {display:'none'}` não oculta textarea |
| THDEF-JS-005 | Média | Alta | `productJsonKitTransform`: `kitOptions.length < 0` sempre falso — guarda morta |
| THDEF-JS-006 | Média | Média | `productJsonGroupPurchaseTransform`: compara `groupPurchase < 0` (array) — condição incorreta |
| THDEF-JS-007 | Média | Alta | `search-view_link`: `document.querySelector(...)` sem null-check — erro se markup ausente |
| THDEF-JS-008 | Média | Alta | Carregamento só após `window.load` — funções PDP indisponíveis até load completo (race se script inline cedo) |
| THDEF-JS-009 | Baixa | Alta | Cabeçalho falso `VENDORS` / `THEME SCRIPTS` sem vendors no arquivo |
| THDEF-JS-010 | Baixa | Alta | `window.onload` vazio (~L9) — ruído |
| THDEF-JS-011 | Informativa | Alta | Busca: estado inicial em `theme.js` `renderViewTypeSearch()`; cliques em `theme-defer.js` — divisão intencional WDNA |

**Verificar depois:** ordem `theme.js` → defer; origem global `StoreSDK`; `sections/product-content.liquid` chamadas `handleProductVariation`; duplicar testes com filtros BTU + `theme-custom` ocultando categorias.

**Registro G (compacto):** `theme-defer.js` | Atenção | THDEF-JS-001..011 | PDP AJAX; filter submit; Notyf; paste=defer not theme.js

---

## 16. `assets/theme-plugins.css`

**Função:** Bundle CSS de **plugins + framework base WDNA** (normalização HTML5, **Spectre.css** ~0.5.x: tipografia rem, `.btn`, `.form-*`, grid `.col-*`, `.card`, `.navbar`, utilitários), mais estilos **tiny-slider** (`.tns-*`), **MetisMenu**, **Notyf**, **PhotoSwipe 4.1.3**, **noUiSlider 14.7.0**. Primeira folha no layout (`theme-plugins.css` → `theme-all.css` → `theme-custom.css`).

**Veredito:** **Informativo com pontos de atenção** — conteúdo **vendor/padrão WDNA** (não custom Site do Ar); risco principal é **cascata e colisão de classes** com `theme-all` / customizações, não “bug” interno do arquivo.

**Achados:**

| ID | Sev. | Conf. | Nota |
|----|------|-------|------|
| PLG-CSS-001 | Informativa | Alta | Monólito ~80 KiB (repo: **1 linha minificada**); colagem do thread = mesma base **pretty-printed** |
| PLG-CSS-002 | Média | Alta | Paleta Spectre primária `#080808` / focus `rgba(87,85,217,.2)` — **≠** identidade `#2c77bb` em `theme-all` / `theme-custom` |
| PLG-CSS-003 | Média | Alta | Links `a { outline: none }` + hover `outline-width: 0` — somado a ALL-CSS-004 / CUS — foco teclado frágil |
| PLG-CSS-004 | Média | Alta | Colisão de API: `.btn`, `.card`, `.navbar`, `.timeline`, `.form-checkbox` usados no markup WDNA e re-estilizados depois |
| PLG-CSS-005 | Média | Média | Empilhamento z-index: `.menu` 300, `.modal` 400, `.pswp` 1500, `.notyf` **9999** — compare/header custom deve respeitar ordem |
| PLG-CSS-006 | Média | Alta | PhotoSwipe: sprites `https://salescdn.net/static/plugins/photoswipe/4.1.3/` (png/svg/gif) — dependência CDN |
| PLG-CSS-007 | Baixa | Alta | Grid `.col-lg-*` etc. com breakpoints WDNA (991/767/575/480/1399) — **não** é Bootstrap; documentar para evitar confusão |
| PLG-CSS-008 | Baixa | Média | `.dropdown .menu:hover { display:block }` — menus só hover; teclado/touch dependem de `:focus` em `.dropdown-toggle` |
| PLG-CSS-009 | Baixa | Média | Legado IE (`filter: alpha`, `-ms-`, vendor prefixes) — peso morto em browsers modernos |
| PLG-CSS-010 | Informativa | Alta | Checkboxes `.form-checkbox input` com clip 1px — padrão Spectre OK; `theme-custom` chip de marca altera padrão |

**Verificar depois:** PDP zoom/galeria (PhotoSwipe + tns); filtros busca (noUiSlider se usado); Notyf vs modais; vitrine `.showcase-product.card` herdando `.card` Spectre antes de CUS-CSS.

**Registro G (compacto):** `theme-plugins.css` | Inf./Atenção | PLG-CSS-001..010 | Spectre+plugins bundle; cascade; CDN photoswipe; z-index notyf

---

## Dúvidas abertas (globais)

1. Nome exato e manifest (`theme.json`) de cada asset PDP e compare/favorites/header no pacote WDNA.
2. Ordem final de CSS/JS em `layout/theme.liquid` (publicado vs Git).
3. Hover v2: `mega-menu.js` desativa ou convive com `product-hover-image.js`?
4. Liquid: `data-compare-id` alinhado ao JSON do produto em todos os cards?
5. Estratégia de cópia dos **107 itens** editor → Git (e vice-versa) antes da auditoria geral.

---

## Próximo passo sugerido (processo)

1. Continuar auditorias individuais A–H; copiar bloco **G** de cada resposta para este arquivo (seção por arquivo).
2. Ao fechar lote, cruzar achados **Alta** com arquivos presentes no repo (`mega-menu.*`, `product-hover-image.*`, `product-content.liquid`, `theme.liquid`).
3. Só então executar **auditoria geral** do tema (dependências, ordem de carga, 107 vs export).

---

*Documento gerado pelo agente a pedido do usuário para persistir o trabalho do thread; não substitui os relatórios A–H completos de cada arquivo.*
