# Auditoria individual WDNA — registro consolidado

**Tema:** Site do ar (Novo), ID 3, base **v1.14.36**  
**Modo:** somente leitura (achados por arquivo; sem alteração de código na auditoria)  
**Atualizado:** 23 out 2026 (America/Sao_Paulo)  
**Escopo deste documento:** arquivos já auditados **neste thread** (colagem + respostas A–H)

---

## Como usar

- Cada arquivo tem **veredito**, **achados (ID + severidade + confiança)** e **verificar depois** na auditoria geral.
- IDs preservam o prefixo usado em cada resposta (`FAV-*`, `HDR-*`, `MEGA-*`, `CMP-*`, `PHV-*`, `PDP2-*`, `PV2-*`).
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

**Progresso vs 107 itens WDNA:** 12 arquivos catalogados aqui (~11%).

---

## Relações cruzadas (auditoria geral)

| Tema | Arquivos / IDs |
|------|----------------|
| Comparador | `CMP-JS-001` ↔ `data-compare-id` no Liquid; `CMP-CSS-001` ↔ `.is-selected` / `aria-pressed` |
| Hover imagem | `PHV-JS-005` ↔ `mega-menu.js` / `__SDA_HOVER_V2__`; `PHV-CSS-001` ↔ ordem CSS em `theme.liquid` |
| Header laranja | `PHV-CSS-*` overrides vs `header-v2.css`, `theme-custom.css` |
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
