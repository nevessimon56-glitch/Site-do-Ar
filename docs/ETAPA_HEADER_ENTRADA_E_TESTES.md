# Etapa Header — checklist de entrada, comparações e plano de testes

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Referências:** [`RECONCILIACAO_HEADER_THEME3.md`](RECONCILIACAO_HEADER_THEME3.md), [`header-producao-theme3-20261028.liquid`](wdna/backups/header-producao-theme3-20261028.liquid)  
**Escopo Opção A (não expandido):** `sda-tokens.css`, `header-v2.css`, `sections/header.liquid`, **mesclagem mínima** de `layout/theme.liquid` no **tema 3 publicado** (pós-aprovação).  
**Fora de escopo:** `mega-menu.css`, `mega-menu.js`, `theme.js`, checkout, busca server-side, frete, cards/PDP (salvo fumaça).  
**Status:** preparação concluída; **nenhum teste executado**; **nenhum upload/publicação**.  
**Decisão operacional (atualizada):** validação visual no **tema 3 publicado** (`sitedoar.com.br`); patch proposto em [`ETAPA_HEADER_PATCH_PROPOSTO.md`](ETAPA_HEADER_PATCH_PROPOSTO.md). URL isolada tema 11 **não** bloqueia preparação.

---

## 1. Evidências de origem — backup `header-producao-theme3-20261028.liquid`

| Evidência | Tipo | Conclusão |
|-----------|------|-----------|
| SHA-256 registrado: `6e16746dfff7063158303953ab66c9f5bd636eaa06b97fac6e90e37f0fc6d65a` | **Comprovado** (arquivo no repo) | Integridade local rastreável |
| Marcadores no Liquid: `header-utility`, `#myForm2Desktop`, `alterForm2Desktop`, `openFavoritesPanel`, `header-v2-mobile-catalog` | **Comprovado** (conteúdo do backup) | Header v2 Site do Ar |
| HTML `https://www.sitedoar.com.br/` contém os **mesmos** marcadores funcionais | **Comprovado** (curl 28/out/2026) | Backup **compatível** com loja ao vivo |
| CDN da home: **19** referências a `prod/store/13805/themes/3/assets` | **Comprovado** (curl) | Loja pública usa **themeId 3** |
| Backup exportado **do painel** tema 3 com byte-identical ao painel | **Suposição** até operador confirmar SHA no editor | Lacuna menor |
| Backup Liquid **é** o arquivo exato servido pelo tema 3 sem cache CDN | **Suposição** | Liquid renderizado pode omitir `<style>` inline se editado só no painel |

**Conclusão documental:** tratar o backup como **referência de produção** para reconciliação; themeId **3** para assets públicos está **comprovado**; ligação painel→arquivo está **parcialmente comprovada** (conteúdo + HTML).

---

## 2. Temas: produção (3) × preview (11)

| Campo | Produção | Preview |
|-------|----------|---------|
| **themeId** | **3** (CDN curl) | **11** (URL painel informada pelo operador) |
| Painel | Tema ativo (inferido) | `https://sitedoar.com.br/admin/personalize/themes/edit/11` |
| URL vitrine preview (operador) | `https://sitedoar.com.br` / `https://www.sitedoar.com.br` | **Registrado** — ver [`METADATA-PREVIEW.md`](wdna/backups/METADATA-PREVIEW.md) |
| CDN na URL acima (visitante anônimo) | **themeId 3** (curl 28/out/2026) | **Comprovado** — **não** exibe `themes/11/` |
| `layout/theme.liquid` backup | Colar operador (§3) — **arquivo repo pendente** | [`layout-theme-preview-theme11-20261028.liquid`](wdna/backups/layout-theme-preview-theme11-20261028.liquid) SHA `b8ab04ff…` |
| `sections/header.liquid` backup | [`header-producao-theme3-20261028.liquid`](wdna/backups/header-producao-theme3-20261028.liquid) | **PENDENTE** export tema 11 |

**Verificação preview ≠ produção:** no painel, tema **11** não deve estar marcado como publicado; na vitrine pública, assets devem continuar `themes/3/` (**comprovado** enquanto loja principal não mudar). Repetir curl CDN na URL do preview quando existir (**PENDENTE**).

---

## 3. Comparação `layout/theme.liquid` — produção (theme 3) × preview (theme 11)

Fonte produção: export colado pelo operador (themeId 3). Fonte preview: backup theme 11. Git `layout/theme.liquid` **não** é igual ao theme 3 publicado (ex.: Git traz `sda-tokens.css` / `sda-card.css`; produção ao vivo traz `showcase-product-card.css` + `#header-orange-inline-v5`).

### 3.1 CSS no `<head>` (ordem)

| Ordem | Produção theme 3 | Preview theme 11 | Relevância Header |
|-------|------------------|------------------|-------------------|
| 1–3 | theme-plugins, theme-all, theme-custom | Idem | Base WDNA |
| 4+ | mega-menu → header-v2 → favorites → compare → hover → sda-conversion → **showcase-product-card** → product-page-v2 | **Ausente** (só base 3 folhas) | Preview **sem** `header-v2.css` → header v2 quebra visual |
| Inline | `#header-orange-inline-v5` (badges, SVG, compare hide) | **Não** | Produção depende do inline + CDN |
| Git Opção A alvo | + `sda-tokens.css` (proposta) | — | **Não** aplicar pacote Git v3 inteiro no preview |

### 3.2 Scripts e ordem de carregamento

| Etapa | Produção theme 3 | Preview theme 11 |
|-------|-------------------|------------------|
| Head sync | `theme.js` | Idem |
| Head loops | `scripts.header` | Idem |
| Body top | `scripts.content` | Idem |
| Renders globais | cart sidenav + **favorites** + **mega-menu-ar** + **product-compare-panel** | **Só** cart sidenav |
| Body | `theme-defer.js` (inject), `scripts.main` | Idem |
| Defer tema | mega-menu, compare, sda-conversion, hover, **favorites.js** | **Nenhum** SDA defer |
| Inline | `initSdaMobileNavStrip`, `initSdaNavFixedTop`, `initMegaMenuAr` on load | **Ausente** |
| setupStore | Logout simples | Logout + **limpa localStorage** checkout |
| Footer | `scripts.footer` + popup Diagnóstico 360 | Só `scripts.footer` |

**Risco Header no preview atual (11):** sem `header-v2.css`, sem `favorites.js`, sem sidenav favoritos/mega/compare no layout — **header v2 do backup theme3 falha funcionalmente** mesmo com Liquid correto.

**Mesclagem mínima Opção A (proposta documental, não executada):** no preview 11, adicionar links `sda-tokens.css` + `header-v2.css` **após** theme-custom; **não** remover `scripts.main`; **não** colar layout Git v3 inteiro; avaliar manter ou adaptar trechos de `#header-orange-inline-v5` até sign-off visual.

### 3.3 Integrações acopladas ao layout (não Header, fumaça)

| Integração | Produção 3 | Preview 11 |
|------------|------------|------------|
| Popup diag360 | Sim (final body) | Não |
| Mailbiz `mb_track` | Sim | Sim (preview com `console.log`) |
| GA4 `G-24XPH3WR9S` | **Comprovado** HTML ao vivo (`scripts.header`) | **PENDENTE** no preview |

---

## 4. Inventário scripts painel WDNA

Preenchimento parcial — HTML produção + Liquid. Template completo: [`INVENTARIO-SCRIPTS-PAINEL.md`](wdna/templates/INVENTARIO-SCRIPTS-PAINEL.md).

| ID | Nome / origem | Injeção | Finalidade | Header / sobreposição | Status |
|----|---------------|---------|------------|------------------------|--------|
| P-01 | Google tag `G-24XPH3WR9S` | `scripts.header` (HTML prod) | Analytics | Indireto; eventos cart | **Identificado** (HTML) |
| P-02 | `sendWhatsPlugin` | `scripts.footer` (HTML prod ~L363) | WhatsApp plugin | Header prod usa link utility; plugin usado em outros pontos | **Identificado** (HTML) |
| P-03 | Mailbiz `mb_track` | Inline layout + possível painel | Recuperação / accountSync | Não altera DOM header | **Inspecionado** (layout export) |
| P-04 | `scripts.header` (outros) | Loop | Tags | Desconhecido sem painel | **PENDENTE** |
| P-05 | `scripts.content` | Loop body | Pixels/body | Desconhecido | **PENDENTE** |
| P-06 | `scripts.footer` (WhatsApp slug) | Loop | Plugin | Ver P-02 | **PENDENTE** painel |
| P-07 | `scripts.main` | WDNA core | StoreSDK | Obrigatório global | **Comprovado** |

**Sobreposição com tema:** `#header-orange-inline-v5` e `<style>` dentro de `header.liquid` theme3 **duplicam/partially override** `header-v2.css` — risco cascata (documentado RECONCILIACAO M-06).

---

## 5. `header.liquid` — produção (backup) × preview (baseline) × proposta M-01…M-10

| Item | Produção backup theme3 | Preview theme 11 (esperado) | M-01…M-10 | Risco se ignorado |
|------|------------------------|----------------------------|-----------|-------------------|
| Markup v2 completo | Sim | **PENDENTE** export — se clone inicial =3, igual; se WDNA padrão, **diverge** | M-01 base export theme3 | Regressão total |
| Layout preview sem CSS/JS | N/A | **Comprovado** layout mínimo | M-06, M-07 | Favoritos/mega quebrados |
| Inline `<style>` no header | Sim | ? | M-06 remover só após teste | Visual quebrado |
| Git `sections/header.liquid` | Diferente | N/A | M-02 não usar Git | Utility perdida |
| `.top-content` | Não | Provável não | M-04 | Banner fantasma |
| Menu mobile 2 vs 3 níveis | 2 níveis filhos | ? | M-09 | Links perdidos |
| `logoUseH1` Git | H1 oculto CSS | — | M-03 opcional | SEO baixo |

**Proposta M-01…M-10:** permanece **documentação para revisão** — **não** constitui aprovação para editar arquivos.

---

## 6. Checklist de entrada (atualizado)

| ID | Critério | Status | Evidência |
|----|----------|--------|-----------|
| E-01 | themeId preview **11** registrado | **Atendido** | URL painel operador |
| E-02 | themeId produção **3** comprovado | **Atendido** | curl CDN |
| E-03 | Backup `header-producao-theme3-*.liquid` + SHA | **Atendido** | repo |
| E-04 | Backup `layout` preview theme 11 + SHA | **Atendido** | repo |
| E-05 | Backup `layout` produção theme 3 + SHA | **PENDENTE** | commit arquivo (export colado) |
| E-06 | Export `header.liquid` preview 11 | **PENDENTE** | painel |
| E-07 | URL vitrine preview | **Parcial** | operador: `sitedoar.com.br`; falta URL “Visualizar” tema 11 se diferente |
| E-08 | CDN preview = `themes/11/` na URL de teste | **NÃO comprovado** | curl anônimo em sitedoar → **themes/3/** |
| E-09 | Inventário scripts painel | **Parcial** | §4 |
| E-10 | Diff layout mesclagem Opção A **aprovado** | **PENDENTE** | revisão humana |
| E-11 | Autorização explícita implementação | **PENDENTE** | — |
| E-12 | Matriz testes §7 executada | **PENDENTE** | — |

**Entrada para upload no preview:** **NÃO ATENDIDA** (E-05–E-08, E-10–E-12).

---

## 7. Plano de testes verificáveis (preview — todos **PENDENTE**)

Viewports: **1280** (desktop), **390** (mobile), amostra **991** (breakpoint). Evidência: screenshot + HAR/console quando aplicável.

| ID | Área | Procedimento | Resultado esperado | Evidência | Status |
|----|------|--------------|-------------------|-----------|--------|
| TH-01 | Busca desktop | Digitar “elgin”, clicar buscar | POST `/busca/elgin` ou redirect equivalente | HAR + URL | **PENDENTE** |
| TH-02 | Busca desktop vazia | Clicar buscar sem texto | Navega `/busca/` | URL | **PENDENTE** |
| TH-03 | Busca mobile pill | Enter no `#term2` | POST `/busca/…` | HAR | **PENDENTE** |
| TH-04 | Busca overlay | Abrir overlay se existir, buscar | `/busca/…` | HAR | **PENDENTE** / **N/A** se sem `.search_link` |
| TH-05 | Menu desktop | Hover/click “Modelos” / mega | Painel `.mega-menu-ar` ou navegação | Screenshot + clique link | **PENDENTE** |
| TH-06 | Nav categoria | Clicar Split Inverter | PLP 200 | URL | **PENDENTE** |
| TH-07 | Mobile strip/catalog | Tap Split / Ambiente | Navegação correta | Screenshot 390 | **PENDENTE** |
| TH-08 | Menu mobile | Hamburger → expandir item | `.sidebar-nav.open`, submenus | Screenshot | **PENDENTE** |
| TH-09 | Favoritos | Clicar ícone header | `#sidenav-overlay-favorites.open` | DOM + console sem erro | **PENDENTE** |
| TH-10 | Carrinho | Clicar carrinho | `.sidenav-overlay_cart.open`, evento cart | DOM + HAR `/ajax/cart` se disparar | **PENDENTE** |
| TH-11 | Login | Utility “Entrar” | Sidenav conta, foco input | Screenshot | **PENDENTE** |
| TH-12 | Logout | Logout sidebar (sessão logada) | POST `/ajax/logout`, reload | HAR | **PENDENTE** |
| TH-13 | Utility WhatsApp | Clicar Atendimento (desktop) | Nova aba WhatsApp | URL aba | **PENDENTE** |
| TH-14 | CTA Ambiente/Diag | Links nav e strip | Páginas calculadora / diag 360 | URL 200 | **PENDENTE** |
| TH-15 | Console | Carregar home | Sem erros JS header | Console export | **PENDENTE** |
| TH-16 | Rede | Interações TH-01–10 | Sem 403 CSRF em POST busca | HAR | **PENDENTE** |
| TH-17 | Fumaça cards | Clicar card vitrine (fora header) | PDP abre | URL | **PENDENTE** |
| TH-18 | Fumaça frete | Abrir PDP, CEP frete | Widget responde (não regressão) | Screenshot | **PENDENTE** |
| TH-19 | z-index | Header sobre conteúdo | Cliques passam na vitrine abaixo header | Hit test | **PENDENTE** |
| TH-20 | Produção parity | Mesmo TH-01 no theme 3 (opcional baseline) | Comportamento igual preview pós-mesclagem | HAR compare | **PENDENTE** |

---

## 8. Dependências restantes (objetivo)

1. Export **`layout/theme.liquid` tema 3** para `docs/wdna/backups/` + SHA.  
2. Export **`sections/header.liquid` tema 11** (baseline preview).  
3. URL **Visualizar** do tema 11 no painel (se diferente de `sitedoar.com.br` anônimo).  
4. **curl** na URL onde o tema 11 é realmente servido → confirmar `themes/11/` (**hoje** domínio principal = **3**).  
5. **Não publicar** tema 11 no domínio principal até checklist + testes TH-* (risco trocar tráfego real).  
6. Preencher **scripts.footer/header** no painel (sem segredos).  
7. **Aprovação escrita** da mesclagem Opção A + M-01…M-10.  
8. Executar matriz §7 no preview **após** mesclagem (futuro).

---

## 9. Veredito desta entrega

| | |
|--|--|
| Checklist entrada | **Atualizado** — parcialmente atendido |
| Comparação arquivos | **Documentada** (layout 3×11; header aguarda export 11) |
| Inventário scripts | **Parcial** |
| Plano de testes | **Pronto** — execução **PENDENTE** |
| Implementação / upload | **Proibido** nesta etapa |
