# Auditoria de engenharia sênior — Header Site do Ar

**Data da auditoria:** 28 out 2026 (America/Sao_Paulo)  
**Escopo:** Fases 1–7 da diretriz de engenharia sênior — **somente documentação** (REGRA ZERO).  
**Fontes utilizadas:** HTML público de produção (`https://www.sitedoar.com.br/`, snapshot em `docs/wdna/backups/production-home-2026-10-28.html`), repositório Git (`sections/header.liquid`, `layout/theme.liquid`, `assets/*`), inspeção estática de `theme.js`, `mega-menu.js`, `favorites.js`.  
**Não executado nesta tarefa:** testes interativos em browser, acesso ao painel WDNA, tema preview dedicado.

---

## Resumo executivo

| Item | Resultado |
|------|-----------|
| **Veredito final** | **BLOQUEADO** para implementação no preview |
| **Motivo principal** | `sections/header.liquid` no Git **não representa** o Header publicado; upload do Liquid versionado **regrediria** faixa utilitária, busca dual, favoritos no header, faixa mobile e contratos `alterForm2Desktop` / `form.submit()`. |
| **Segundo bloqueio** | Ambiente **preview** (URL/ID) não informado — matriz de testes permanece **PENDENTE/BLOQUEADO** sem evidência de clique/rede. |
| **Terceiro bloqueio** | Painel WDNA (scripts footer, menu, banner topo) **não auditado** — comportamentos dependentes de configuração ficam **parcialmente confirmados**. |

**Critério de aprovação aplicado:** nenhuma funcionalidade crítica desconhecida foi tratada como preservada; divergências relevantes foram registradas; nenhum teste funcional foi marcado como APROVADO.

---

## 1. Inventário funcional completo do Header

### 1.1 Subsistemas (produção — verdade operacional)

| ID | Subsistema | Container / seletor | Status |
|----|------------|---------------------|--------|
| H-01 | Faixa utilitária | `.header-utility` | Confirmado (produção) |
| H-02 | Logo + home | `.logo`, `h1` condicional | Confirmado |
| H-03 | Busca desktop (barra) | `#myForm2Desktop`, `#term2Desktop`, `.header-v2-search.search-desktop.hide-lg` | Confirmado (produção) |
| H-04 | Busca mobile (pill) | `#myForm2`, `#term2`, `.header-v2-search-pill.show-lg` | Confirmado (produção) |
| H-05 | Busca overlay legado | `#myForm`, `#term`, `.search.close` | Confirmado (markup presente) |
| H-06 | Ações desktop | `.header-v2-actions.hide-lg` (pedidos, favoritos, carrinho) | Confirmado |
| H-07 | Toolbar mobile | `.header-v2-mobile-tools.show-lg` (fav, carrinho, menu) | Confirmado |
| H-08 | Faixa categorias mobile | `.header-v2-mobile-strip.show-lg` | Confirmado |
| H-09 | Nav categorias desktop | `.nav-content.header-v2-nav-row`, `.nav-main`, `.nav-main_item` | Confirmado |
| H-10 | CTAs Ambiente / Diagnóstico | `.header-v2-cta-ambiente`, links `/pagina/calculadora-btus`, `/pagina/diagnostico-360` | Confirmado |
| H-11 | Mega menu Modelos | `#mega-menu-ar-template` + injeção JS `.mega-menu-ar` | Confirmado (layout global + `mega-menu.js`) |
| H-12 | Menu mobile off-canvas | `.sidebar-nav.show-lg`, `#nav-mobile`, Metismenu | Confirmado |
| H-13 | Dock catálogo mobile | `.mobile-catalog-dock` (JS `mega-menu.js`) | Parcial — depende de JS publicado e viewport |
| H-14 | Conta / login | `.header-utility__account`, Alpine `setupStore()`, `.sidenav-overlay_account` | Confirmado |
| H-15 | Carrinho sidenav | `openSideNavOverlay('.sidenav-overlay_cart', …)`, `[data-cart-quantity]` | Confirmado |
| H-16 | Favoritos | `openFavoritesPanel()`, `[data-favorites-count]`, `#sidenav-overlay-favorites` | Confirmado |
| H-17 | Atendimento WhatsApp (utility) | Link direto API WhatsApp na utility | Confirmado (produção) |
| H-18 | Banner topo WDNA | `.top-content` | **Inexistente na home produção capturada** — pode existir em outras páginas/config |

### 1.2 Arquivos que influenciam o Header

| Camada | Arquivo | Papel |
|--------|---------|--------|
| Markup | `sections/header.liquid` (WDNA) | Estrutura DOM, forms, menu Liquid, script inline busca |
| Layout | `layout/theme.liquid` | `setupStore()`, sidenavs globais, ordem CSS/JS, `initSdaMobileNavStrip`, `initSdaNavFixedTop` |
| JS core | `assets/theme.js` | `openSearch`, `openNavMobile`, `openSideNavOverlay`, overlays busca/mobile |
| JS mega | `assets/mega-menu.js` | `initMegaMenuAr`, dock mobile, faixa nav fallback inline no layout |
| JS favoritos | `assets/favorites.js` | `window.openFavoritesPanel` |
| CSS tokens | `assets/sda-tokens.css` | Cores marca (Git; **não** listado isoladamente na produção capturada) |
| CSS header | `assets/header-v2.css` | Layout v2, utility, pill, strip (produção: CDN com hash) |
| CSS nav/mega | `assets/mega-menu.css` | Nav azul, mega menu, dock |
| CSS legado | `assets/theme-all.css`, `theme-custom.css` | Spectre/WDNA, `.hide-lg`/`.show-lg` |
| Emergência prod. | `<style id="header-orange-inline-v5">` | Fallback visual **coexiste** com `header-v2.css` na produção |
| Painel | `scripts.content` / `scripts.footer` | WhatsApp plugin, GTM, scripts custom **fora do Git** |

### 1.3 Inicialização e ordem de carregamento (confirmado no Git + produção)

1. `theme.js` (síncrono no `<head>` produção) — funções globais de overlay disponíveis cedo.
2. CSS em cascata: `theme-plugins` → `theme-all` → `theme-custom` → `mega-menu` → **`header-v2`** → favoritos → compare → …
3. `body` com `x-data="setupStore()"` — estado login no header/sidebar.
4. Scripts defer: `mega-menu.js`, `favorites.js`, … + inline fallbacks NAV-MOBILE-STRIP no `theme.liquid`.
5. `DOMContentLoaded` / `load`: `initMegaMenuAr`, `initSdaMobileNavStrip`, `initSdaNavFixedTop`.

**Risco:** alterar ordem de CSS ou remover inline de emergência sem validação visual pode reintroduzir regressões já mitigadas em produção.

---

## 2. Matriz de rastreabilidade

Legenda de status: **C** confirmado (markup + handler no código/snapshot), **P** parcial, **D** desconhecido (falta teste ou painel), **N** inexistente no alvo indicado.

| Elemento | Evento | Handler / destino | Resultado esperado | Desktop (≥992) | Mobile (≤991) | Teste / evidência | Risco | Status |
|----------|--------|-------------------|--------------------|----------------|---------------|-------------------|-------|--------|
| Logo | click | `href="/"` | Home | Visível | Visível | Navegação + H1 só home | Baixo | C / teste **PENDENTE** |
| Utility Atendimento | click | URL WhatsApp externa | Abre WhatsApp | Sim | Sim | Clique + nova aba | Baixo | C / **PENDENTE** |
| Utility Meus pedidos | click | `/pedidos` | Lista pedidos | Sim | Oculto na utility; repetido em ações | HTTP 200 / login | Médio | C / **PENDENTE** |
| Utility Conta | click | `openSideNavOverlay('.sidenav-overlay_account', true)` | Sidenav login | Sim | Sim (label curto “Entrar”) | Sidenav abre, foco input | Alto | C / **PENDENTE** |
| Busca desktop btn | click | `alterForm2Desktop()` | POST `/busca/{termo}` ou GET `/busca/` | Sim | N/A | Network POST + redirect | **Crítico** | C / **PENDENTE** |
| Busca desktop Enter | keydown | (não wired explicitamente no snapshot) | Idem botão | Sim | N/A | Teclado | Médio | **D** / **PENDENTE** |
| Busca pill Enter | keydown Enter | `alterForm2()` inline | POST `/busca/…` | N/A | Sim | Network | **Crítico** | C / **PENDENTE** |
| Busca overlay | toggle | `openSearch()` → `.search.open` | Overlay + foco `#term` | Legado se `.search_link` existir | Fallback em `headerV2FocusMobileSearch` | Overlay visível | Médio | P / **PENDENTE** |
| Overlay busca btn | click | `alterForm()` | `/busca/…` | Se overlay aberto | Se overlay aberto | Network | Alto | C (Git+prod script) / **PENDENTE** |
| Favoritos desktop | click | `openFavoritesPanel()` | `#sidenav-overlay-favorites.open` | Sim | — | Panel + localStorage | Alto | C / **PENDENTE** |
| Favoritos mobile | click | idem | idem | — | Sim | idem | Alto | C / **PENDENTE** |
| Carrinho | click | `openSideNavOverlay('.sidenav-overlay_cart', false, {isViewCart:true})` | Sidenav carrinho + evento `cart-open` | Sim | Sim | Sidenav + `/ajax/cart` | **Crítico** | C / **PENDENTE** |
| Menu hamburger | click | `openNavMobile()` | `.sidebar-nav.open` | N/A | Sim | Off-canvas + Metismenu | **Crítico** | C / **PENDENTE** |
| Logout sidebar | click | `@click="headerLogout()"` | POST `/ajax/logout` | N/A | Sim | Network + reload | Alto | C (theme.liquid) / **PENDENTE** |
| Nav categoria | click | href WDNA | PLP categoria | Sim | Strip + menu mobile | 200 + filtros | Médio | C / **PENDENTE** |
| CTA Ambiente | click | `/pagina/calculadora-btus` | Calculadora | Sim nav + mobile strip | Sim | Página carrega | Baixo | C / **PENDENTE** |
| CTA Diagnóstico | click | `/pagina/diagnostico-360` | Landing diag | Sim | Sim strip | Página carrega | Baixo | C / **PENDENTE** |
| Mega menu Modelos | hover/click | `initMegaMenuAr()` | Painel `.mega-menu-ar` | Sim (desktop) | Dock/sheet mobile | Clique em link produto | **Crítico** | P / **PENDENTE** |
| Badge carrinho | render | StoreSDK / tema | Contagem itens | Sim | Sim | Valor após add-to-cart | Alto | P / **PENDENTE** |
| CSRF busca | submit | `_csrf` hidden | Token válido POST | Ambos forms | Ambos | 403 se ausente | **Crítico** | P (Liquid Git) / **PENDENTE** |
| Autocomplete busca | input | — | `autocomplete="off"` no DOM | — | — | Sem typeahead nativo visível | Baixo | C (sem autocomplete WDNA no snapshot) | N/A |

---

## 3. Contratos e dependências imutáveis

### 3.1 Funções globais — assinaturas confirmadas

| Contrato | Assinatura / comportamento | Onde definido | Notas |
|----------|---------------------------|---------------|--------|
| `alterForm()` | Sem args; usa `#term`, `#myForm`; action `/busca/` + encode URI | Inline `header.liquid` (Git e prod) | Prod/Git: lógica similar; validar submit explícito |
| `alterForm2()` | Sem args; usa `#term2`, `#myForm2`; **`formEl.submit()`** na **produção** | Inline header **produção** | Git **não** chama `.submit()` — divergência |
| `alterForm2Desktop()` | Sem args; `#term2Desktop`, `#myForm2Desktop`; **`formEl.submit()`** | **Somente produção** | **Ausente no Git** |
| `headerV2FocusMobileSearch()` | Foca `#term2` ou chama `openSearch()` | **Somente produção** | **Ausente no Git** |
| `openSearch()` | Toggle; chama `openOverlaySearch` / `closeOverlaySearch` | `theme.js` L117–125 | Estado `isOpenSearch` boolean invertido |
| `openNavMobile()` | Toggle overlay mobile nav | `theme.js` L130–137 | Estado `isOpenNavMobile` |
| `openSideNavOverlay(element, focus, data)` | `element` seletor CSS; `focus` bool; `data` obj (carrinho) | `theme.js` L144–176 | Dispara `cart-open` se carrinho |
| `closeSideNavOverlay()` | Sem args | `theme.js` L178+ | Fecha todos `.sidenav-overlay` |
| `openFavoritesPanel()` | Sem args | `favorites.js` → `window.openFavoritesPanel` | Depende sidenav markup global |
| `setupStore()` | Retorna objeto Alpine | `layout/theme.liquid` inline | `headerLogout`, `changeCustomerLogin`, … |
| `headerLogout()` | Método Alpine; POST `/ajax/logout` | `theme.liquid` | |
| `initMegaMenuAr()` | Sem args | `mega-menu.js` | Template `#mega-menu-ar-template` |
| `initSdaMobileNavStrip()` | Sem args | `theme.liquid` inline | Scroll faixa mobile |
| `initSdaNavFixedTop()` | Sem args | `theme.liquid` inline | Nav fixa |
| `sendWhatsPlugin()` | (plugin footer) | Script painel slug `whatsapp` | Presente no Git header; **utility prod usa link direto** |

### 3.2 IDs e formulários (não renomear)

| ID | Form | Uso |
|----|------|-----|
| `myForm` | POST | Busca overlay mobile |
| `myForm2` | POST | Busca pill mobile |
| `myForm2Desktop` | POST | Busca barra desktop (**prod**) |
| `term` / `term2` / `term2Desktop` | inputs | Pares com forms acima |

**URL de busca:** `/busca/{termo}` com `encodeURI` e `/` → `%2f`. Vazio: redirect para `/busca/` (protocolo + host).

### 3.3 StoreSDK / rede (header-adjacent)

| Endpoint | Uso |
|----------|-----|
| `POST /ajax/logout` | Logout header |
| Carrinho / sessão | Via sidenav cart (evento `cart-open`) — detalhes no `theme.js` cart section |

### 3.4 Seletores consumidos por CSS/JS externos

- `.cart_quantity`, `[data-cart-quantity]`
- `[data-favorites-count]`
- `.sidenav-overlay_account`, `.sidenav-overlay_cart`
- `.sidebar-nav`, `#nav-mobile`
- `.mega-menu-ar`, `#mega-menu-ar-template`
- `.hide-lg` / `.show-lg` (breakpoint **991/992px**)

---

## 4. Comparação produção × Git × preview

| Aspecto | Produção (28/out/2026) | Git `sections/header.liquid` | Preview |
|---------|------------------------|------------------------------|---------|
| `.header-utility` | **Sim** | **Não** | **BLOQUEADO** — URL não fornecida |
| `.header-v2-navbar` / actions | **Sim** | Markup clássico `.navbar` | — |
| `#myForm2Desktop` + `alterForm2Desktop` | **Sim** | **Não** | — |
| `.header-v2-search-pill` mobile | **Sim** | **Não** | — |
| `.header-v2-mobile-strip` | **Sim** | **Não** | — |
| `openFavoritesPanel` no header | **Sim** | Parcial / layout antigo | — |
| Banner `.top-content` | Não na home capturada | **Sim** (Liquid) | — |
| Classe root | `header header-v2` | `header header-v2 sda-header-v2` | — |
| `header-orange-inline-v5` | **Presente** | Ausente no layout Git atual | — |
| `header-v2.css` CDN | **Publicado** | Arquivo Git (pode diferir hash) | — |
| `sda-tokens.css` | **Não** no link list produção | Existe no Git | — |
| Script inline busca | `alterForm2` + `submit()` + Desktop + focus helper | Só `alterForm`/`alterForm2` sem Desktop | — |

**Conclusão:** Git é **branch de redesign**, não espelho do tema publicado. **Preview deve ser exportado do painel WDNA** após criar tema filho; reconciliação base = **HTML produção** + diff Git para tokens/CSS.

**Evidência estática:** snapshot `docs/wdna/backups/production-home-2026-10-28.html` (474 KB).

---

## 5. Matriz de riscos e regressões

| ID | Risco | Severidade | Impacto | Mitigação antes do preview |
|----|-------|------------|---------|----------------------------|
| R-01 | Upload `header.liquid` Git sobrescreve produção | **Crítica** | Perda utility, busca dual, favoritos, strip | Export prod → merge → diff review |
| R-02 | Remover `#header-orange-inline-v5` sem validar CSS | **Alta** | Ícones gigantes / faixa preta (comentário no inline) | Teste visual 991/992; manter até `header-v2` 100% |
| R-03 | Quebrar `alterForm2Desktop` / IDs duplicados | **Crítica** | Busca desktop morta | Preservar IDs; não colapsar forms |
| R-04 | `z-index` header / mega / overlay | **Alta** | Cliques bloqueados em cards/PDP | Teste fumaça PDP + home após CSS |
| R-05 | Duplicar `[data-cart-quantity]` sem sync | Média | Badge errado | Manter seletores; não remover spans |
| R-06 | Alpine `setupStore` quebrado | **Alta** | Conta/logout | Não mover `x-data` do body |
| R-07 | `mega-menu.js` vs markup nav | **Alta** | Mega menu vazio | Não alterar item “Modelos” sem JS |
| R-08 | Trocar `mega-menu.css` na Opção A | **Alta** | Cards/showcase drift | Manter Opção A (não tocar mega-menu.css) |
| R-09 | CSRF vazio no HTML estático | Média | POST busca 403 | Liquid deve emitir `{{ csrfToken }}` |
| R-10 | Scripts painel (WhatsApp) | Média | CTA WhatsApp header antigo vs utility | Documentar config painel |
| R-11 | Nav fixed + padding body | Média | Conteúdo sob header | Testar `initSdaNavFixedTop` viewports |
| R-12 | Favoritos sem `favorites.js` | **Alta** | JS error no clique | Manter script defer |

**Fumaça obrigatória pós-implementação (fora do header):** card → PDP, comparador, frete PDP, barra compare, add cart, busca → PLP → produto.

---

## 6. Especificação visual revisada (sem implementação)

Referência detalhada: `docs/ESPECIFICACAO_HEADER_REDESIGN.md`. Síntese alinhada à diretriz azul/laranja + lilás acento:

### 6.1 Tokens (proposta Git — validar no preview)

| Token | Valor | Uso header |
|-------|-------|------------|
| `--sda-navy` | `#10294a` | Utility / texto forte |
| `--sda-primary` | `#1976d2` | Links, foco |
| `--sda-orange` / `--sda-orange-deep` | `#f28c28` / `#ea580c` | CTA Ambiente, badges |
| `--sda-purple` | `#6d28d9` | Diagnóstico (acento) |
| `--hdr-*` em `header-v2.css` | Vários | Migrar para aliases `--sda-*` **somente** em implementação aprovada |

### 6.2 Breakpoints

| Medida | Confirmado | Proposta redesign |
|--------|------------|-------------------|
| Corte mobile/desktop | **991px / 992px** (`.show-lg`/`.hide-lg`) | Manter — **não** mudar sem migração global |
| Viewports de teste | — | 360, 390, 768, 991, 1024, 1280, 1440 px |

### 6.3 Hierarquia visual (produção atual)

1. Utility escura (Akhand uppercase ~13px) — contato, pedidos, conta.  
2. Barra branca — logo | busca | ações.  
3. Nav clara scroll horizontal — CTA laranja Ambiente + categorias + lilás Diagnóstico.  
4. Mobile — pill busca full width + strip categorias + dock (JS).

**Separado:** medidas exatas de padding/fonte por breakpoint devem ser lidas de `header-v2.css` computado no preview (**PENDENTE**).

---

## 7. Matriz de testes (evidências)

**Ambiente:** produção/preview — **nenhum teste interativo executado nesta auditoria.**

Status permitidos: APROVADO | REPROVADO | PENDENTE | BLOQUEADO | N/A

| ID | Caso | Viewports | Evidência exigida | Status | Observação |
|----|------|-----------|-------------------|--------|------------|
| T-01 | Busca desktop termo “elgin” → PLP | 1280, 1440 | Network POST + URL `/busca/elgin` | **BLOQUEADO** | Requer browser + sessão |
| T-02 | Busca pill mobile Enter | 360, 390 | Network POST | **BLOQUEADO** | |
| T-03 | Busca vazia → `/busca/` | 1024, 390 | Location header | **BLOQUEADO** | |
| T-04 | Carrinho abre sidenav | 390, 1280 | DOM `.open` + cart-open | **BLOQUEADO** | |
| T-05 | Favoritos panel | 390, 1280 | Panel visível | **BLOQUEADO** | |
| T-06 | Login sidenav + foco | 1280 | Primeiro input focused | **BLOQUEADO** | |
| T-07 | Logout | 390 | POST `/ajax/logout` | **BLOQUEADO** | |
| T-08 | Menu mobile expand | 390 | `.sidebar-nav.open` | **BLOQUEADO** | |
| T-09 | Mega menu link produto | 1280 | Navega PDP 200 | **BLOQUEADO** | |
| T-10 | CTA Ambiente / Diagnóstico | 768, 390 | Página destino | **BLOQUEADO** | |
| T-11 | Logo home H1 único | 1280 | Um H1 na home | **PENDENTE** | Snapshot sugere H1 no logo |
| T-12 | Tab order busca → nav | 1280 | Ordem foco | **BLOQUEADO** | |
| T-13 | Escape fecha overlay busca | 390 | **D** — handler não encontrado em `theme.js` | **PENDENTE** | Confirmar manualmente |
| T-14 | Clique card home não bloqueado | 1280 | Hit test | **BLOQUEADO** | |
| T-15 | PDP frete após header fixo | 390 | Widget frete OK | **BLOQUEADO** | |
| T-16 | Console sem erros header | Todos | Console limpo | **BLOQUEADO** | |

---

## 8. Backup e rollback (preview apenas — não executar agora)

### 8.1 Arquivos candidatos à alteração (Opção A aprovada conceitualmente)

- `sections/header.liquid`
- `assets/header-v2.css`
- `assets/sda-tokens.css` (se passar a ser linkado)
- `layout/theme.liquid` (links CSS, preload font, remoção opcional inline v5)

### 8.2 Procedimento

1. No painel WDNA, **duplicar** tema ativo → tema preview (registrar **themeId** e URL).  
2. **Download/export** dos arquivos acima do preview **antes** de upload.  
3. Salvar cópia com sufixo data em `docs/wdna/backups/` (ex.: `header.liquid.pre-YYYYMMDD`).  
4. Aplicar upload apenas no preview.  
5. **Rollback:** re-upload dos arquivos exportados no passo 2, na mesma ordem; reativar inline `#header-orange-inline-v5` se removido e regressão visual.  
6. **Produção:** nenhuma ação nesta etapa.

### 8.3 Snapshot já capturado

- `docs/wdna/backups/production-home-2026-10-28.html` — referência HTML produção (não substitui export Liquid do painel).

---

## 9. Pré-requisitos para implementação

| # | Pré-requisito | Responsável | Status |
|---|---------------|-------------|--------|
| P-01 | Tema **preview** WDNA criado (ID + URL) | Operador loja | **Faltando** |
| P-02 | Export `header.liquid` **produção/preview** reconciliado com Git | Engenharia | **Faltando** |
| P-03 | Diff aprovado: utility, forms Desktop/Pill, strip, favoritos, scripts inline | Revisor | **Faltando** |
| P-04 | Decisão sobre `#header-orange-inline-v5` (manter até sign-off visual) | Design/Eng | **Pendente** |
| P-05 | Linkar `sda-tokens.css` antes de `header-v2.css` se tokens unificados | Engenharia | **Pendente** |
| P-06 | Matriz T-01–T-16 executada no preview com capturas + HAR | QA | **Bloqueado** por P-01 |
| P-07 | Autorização explícita pós-revisão deste documento | Product owner | **Faltando** |
| P-08 | Confirmar CSRF renderizado nos três forms após upload | QA | **Pendente** |

---

## 10. Veredito final

### **BLOQUEADO — não apto para implementar no preview ainda**

**Fundamentação:**

1. **Divergência estrutural Git × produção** é bloqueante: o Liquid versionado regrediria funcionalidades **confirmadas** em produção (utility, busca desktop separada, pill mobile, strip, `alterForm2Desktop`, `form.submit()`).  
2. **Preview não disponível** para esta auditoria — impossível cumprir critério de evidência para testes.  
3. **Contratos parcialmente confirmados:** autocomplete/sugestões WDNA, Enter na busca desktop, Escape no overlay, scripts exclusivos do painel.  
4. **Coexistência** `header-orange-inline-v5` + `header-v2.css` exige plano de transição visual explícito.

**Condição para passar a “APTO PARA IMPLEMENTAR NO PREVIEW”:**

- Concluir P-01 a P-03 e P-07;  
- Liquid reconciliado com produção como **fonte de markup**;  
- Opção A (CSS/header/tokens + mesclagem mínima `theme.liquid`) validada em diff;  
- Pelo menos testes **críticos** T-01, T-02, T-04, T-08, T-09 **APROVADOS** com evidência no preview.

---

## Lacunas — dados solicitados ao operador

1. **URL e themeId** do tema preview WDNA.  
2. Export oficial **`sections/header.liquid`** do tema publicado (não só HTML).  
3. Lista de **scripts custom** no painel (footer/content) que afetam header.  
4. Confirmação se banner `.top-content` está desativado globalmente ou só na home.

---

## Documentos relacionados

- `docs/ESPECIFICACAO_HEADER_REDESIGN.md` — spec visual/responsiva  
- `docs/PLANO_ETAPA_HEADER.md` / `docs/CHECKLIST_ETAPA_HEADER.md` — Opção A  
- `docs/wdna/etapa-header-opcao-a/README-UPLOAD.md` — upload isolado  
- `docs/AUDITORIA_TECNICA.md` — contexto plataforma WDNA  

---

*Auditoria estática conforme REGRA ZERO — nenhum arquivo de tema foi modificado nesta entrega documental.*
