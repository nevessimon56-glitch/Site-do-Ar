# Especificação — Redesign Header (desktop, tablet, mobile)

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Fase:** A + B + C + D (auditoria, spec, arquivos, testes) — **sem implementação, upload ou publicação.**  
**Escopo aprovado:** Opção A — `sda-tokens.css`, `header-v2.css`, `header.liquid`, mesclagem mínima `theme.liquid`; **não** substituir `mega-menu.css` / `mega-menu.js` / `mega-menu-ar.liquid`.  
**Referência visual:** Site do Ar — azul e laranja predominantes; lilás apenas acento (utility/diag).

---

## A. Auditoria do estado atual

### A.1 Camadas do Header (DOM)

| Camada | Seletor / região | Dono CSS | Dono markup |
|--------|------------------|----------|-------------|
| L0 Banner topo WDNA | `.top-content` | `theme-all` / inline | `header.liquid` — **oculto** em `header-v2.css` (`display: none`) |
| L1 Faixa utilitária | `.header-utility` | **`header-v2.css`** | Liquid — **presente na produção**, **ausente no Git** |
| L2 Barra principal | `.header-content` → logo, busca, ações | **`header-v2.css`** + `theme-all` | Liquid |
| L3 Nav horizontal | `.nav-content` / `.header-v2-nav-row` | **`mega-menu.css`** (nav azul) + `header-v2.css` (nav clara interna) | `header.liquid` + menu WDNA |
| L4 Menu mobile off-canvas | `.sidebar-nav.show-lg` | `theme-all` + `header-v2.css` | `header.liquid` |
| L5 Mega menu painel | `.mega-menu-ar` (injetado) | **`mega-menu.css`** + JS | `mega-menu-ar.liquid` |
| L6 Dock mobile | `.mobile-catalog-dock` | **`mega-menu.css`** | `mega-menu.js` |

**Fora do `<header>` mas acoplado:** compare bar, favoritos sidenav (global layout).

### A.2 Divergência crítica Git × produção (evidência 28/out/2026)

| Item | Produção (`sitedoar.com.br`) | Repositório Git (`sections/header.liquid`) |
|------|------------------------------|---------------------------------------------|
| Faixa `.header-utility` | **Sim** (Atendimento, Meus pedidos, conta) | **Não** — markup clássico `.navbar` |
| Busca desktop | `.header-v2-search` + legado `.search-desktop` | Só `.search-desktop.hide-lg` |
| Navbar | `.header-v2-navbar` | `.navbar` |
| Classe root | `header header-v2` | `header header-v2 sda-header-v2` |
| Inline layout | `#header-orange-inline-v5` | Git v3 layout sem inline |

**Conclusão:** `assets/header-v2.css` no Git (**122** referências a utility/v2-navbar) foi escrito para markup **mais novo** que o `header.liquid` versionado. **Substituir o Liquid do Git no preview sem export da produção quebra a faixa utilitária e parte do layout v2.**

**Pré-requisito de implementação (fase E):** exportar `sections/header.liquid` do **tema ativo/preview** e reconciliar com Git (base = produção, estilos = Git + tokens), **antes** de qualquer upload.

### A.3 Breakpoints WDNA (implementação real)

O tema usa convenção Spectre/WDNA:

| Classe | Comportamento típico | Uso no header |
|--------|----------------------|---------------|
| `.hide-lg` | Visível **≥992px** (desktop) | Busca desktop, nav horizontal, conta desktop |
| `.show-lg` | Visível **≤991px** (mobile/tablet) | Ícone busca, menu hamburger, sidebar nav |

**Especificação alinhada:** desktop **≥1024px** (testes); breakpoint técnico de corte **991/992px** (não alterar sem migrar `theme-all`).

Faixas de teste obrigatórias: **360, 390, 768, 991, 1024, 1280, 1440** px (+ zoom 100%/125% amostra).

### A.4 Tipografia e cores auditadas

| Origem | Valores |
|--------|---------|
| **`sda-tokens.css`** | Navy `#10294a`, nav `#1a6eb5`, primário `#1976d2`, laranja `#f28c28` / `#ea580c`, lilás `#6d28d9`, fundo `#f7f9fc`, texto `#0f172a` |
| **`header-v2.css` (locais `--hdr-*`)** | Navy utility `#0c1f3d`, azul ícone `#4b96d4`, laranja CTA `#f58220`, nav clara `#eef3f8` |
| **Fontes** | Utility: **Akhand** 600 (woff2 CDN); corpo/header: Arial + fallbacks WDNA; preload Akhand no `theme.liquid` |
| **Produção inline** | Badge carrinho `#f97316` — alinhado a laranja marca |

**Diretriz de redesign:** unificar `--hdr-*` → aliases de `--sda-*` **dentro de `header-v2.css` apenas** (sem migração global não aprovada).

### A.5 Contratos funcionais (preservar)

| Função | Mecanismo | IDs / classes |
|--------|-----------|---------------|
| Busca desktop | POST → action `/busca/{termo}` | `#myForm2`, `#term2`, `alterForm2()` |
| Busca mobile overlay | `openSearch()`, form `#myForm`, `#term` | `.search.close` |
| CSRF | Hidden `_csrf` | Ambos forms |
| Conta | Alpine `setupStore()`, sidenav | `.sidenav-overlay_account`, `headerLogout()` |
| Carrinho | `openSideNavOverlay('.sidenav-overlay_cart'…)` ou B2B | `.cart_quantity`, `[data-cart-quantity]` |
| Menu mobile WDNA | `openNavMobile()` | `.sidebar-nav`, `#nav-mobile` |
| Mega menu | `initMegaMenuAr()` | `#mega-menu-ar-template` |
| WhatsApp | `sendWhatsPlugin()` | Script footer slug `whatsapp` |

**Proibido:** mudar URLs de busca, endpoints StoreSDK, nomes de funções globais, ordem de carregamento de `theme.js`.

---

## B. Especificação visual e funcional (alvo aprovável)

### B.1 Tokens Header (extensão proposta em `:root` / `.header-v2`)

Usar **somente** após aprovação; podem viver em `sda-tokens.css` ou bloco inicial `header-v2.css`:

```css
/* Aliases — não substituir tokens globais de card/PDP */
--sda-header-utility-bg: var(--sda-navy, #10294a);
--sda-header-utility-text: #ffffff;
--sda-header-surface: var(--sda-surface, #ffffff);
--sda-header-border: var(--sda-border, #e2e8f0);
--sda-header-action-orange: var(--sda-orange-deep, #ea580c);
--sda-header-icon-blue: var(--sda-blue-light, #4b96d4);
--sda-header-nav-cta-orange: var(--sda-orange, #f28c28);
--sda-header-accent-purple: var(--sda-purple, #6d28d9); /* só chips/diag */
--sda-header-touch-min: var(--sda-touch-min, 44px);
--sda-header-content-max: 1200px; /* alinhar .container WDNA */
--sda-header-logo-max-h: 50px;
--sda-header-search-max-w: 580px;
--sda-header-utility-h-desktop: 36px;
--sda-header-utility-h-mobile: 32px;
--sda-header-main-py: 12px;
--sda-header-nav-link-py: 8px;
--sda-header-nav-link-px: 12px;
--sda-header-fs-utility: 13px;
--sda-header-fs-nav: 14px;
--sda-header-fs-mobile-utility: 10px;
--sda-header-radius-search: var(--sda-radius, 14px);
--sda-header-radius-cta: 8px;
--sda-header-focus-ring: 2px solid var(--sda-primary, #1976d2);
```

### B.2 Anatomia desktop (≥992px)

```
┌────────────────────────────────────────────────────────────── utility navy ──┐
│  ATENDIMENTO   MEUS PEDIDOS (oculto se duplicado)     CONTA / VISITANTE      │  ~36px
├────────────────────────────────────────────────────────────── surface branca ─┤
│ [Logo ≤50px]  [────── busca pill max 580px ──────]  [Tel?] [Cart badge]      │  ~72–88px
├────────────────────────────────────────────────────────────── nav clara ──────┤
│ [CTA Ambiente laranja] [ nav itens WDNA + Mega Modelos ] [CTA Diag lilás/azul]│  ~44–52px
└────────────────────────────────────────────────────────────── nav azul (mega-menu.css) ──
```

| Elemento | Dimensão / regra |
|----------|------------------|
| **Logo** | `max-height: 50px`; largura auto; área reservada min **148px** desktop / **min(148px, 42vw)** mobile; `fetchpriority="high"`; alt text do `theme.logo` |
| **Nome loja (a11y)** | `.logo-store-name` visually hidden na home (`h1`); demais páginas `span` |
| **Busca pill** | Altura input **44–48px**; largura flex `1 1 auto`, **max-width 580px**; placeholder desktop: *"O que deseja buscar?"*; ícone busca **24px** na ação; borda `1px solid var(--sda-header-border)`; foco: ring primário |
| **Botão busca** | **min-width 48px**; mesma altura do input; não remover `onclick="alterForm2()"` |
| **Carrinho** | Badge **min 18×18px**, fundo laranja `#ea580c`/`#f97316`, texto branco; ícone azul `#4b96d4`, hover laranja |
| **Conta desktop** | Oculta em mobile utility; desktop pode usar utility **ou** caixas legado conforme markup exportado |
| **CTA Ambiente** | Laranja sólido, uppercase, **padding 9×16px**, radius **8px** |
| **CTA Diagnóstico 360** | Desktop: pill borda azul, fundo azul translúcido; **lilás não dominar** — acento opcional só ícone |
| **Nav itens** | `font-size 14px`, weight **800**, uppercase, letter-spacing **0.05em**, padding **8×12px** |

### B.3 Tablet (768–991px)

- Mesmo breakpoint WDNA **`max-width: 991px`**: entra layout **mobile compacto** definido em `header-v2.css` (`--hdr-m-touch: 40px`; spec eleva meta para **44px** onde possível sem quebrar grid).
- Utility: altura **32px**, fonte **10px**, links em linha sem wrap (overflow hidden).
- Logo + busca pill / ícone busca + carrinho + hamburger na mesma faixa.
- **Nav horizontal azul** (`mega-menu.css`): comportamento mobile strip / oculto no topo — **não redesenhar nesta etapa** (arquivo congelado).
- **CTA Ambiente / Diagnóstico:** conforme CSS atual mobile (utility ou menu catalog).

### B.4 Mobile (360–767px)

| Elemento | Regra |
|----------|--------|
| Touch targets | **Mín. 44×44px** alvo (meta spec); aceitar **40px** atual só se ajuste couber só em `header-v2.css` |
| Busca | Ícone abre overlay `.search` (não remover `openSearch`) |
| Menu | Hamburger → `openNavMobile()` + `.sidebar-nav` |
| Textos longos | Utility labels: truncar com ellipsis; **guest-long / guest-short** toggle conforme CSS |
| Dock | Altura reservada **`--sda-mobile-dock-h: 58px`** (token) — padding body via **mega-menu.css** (não alterar) |

### B.5 Mega menu e dock (referência — CSS congelado)

| Peça | Comportamento esperado | Redesign nesta etapa |
|------|----------------------|----------------------|
| Mega “Modelos” | Painel colunas BTU/marcas/banners | **Manter** visual atual (`mega-menu.css`) |
| Nav azul + fixa scroll | `.is-fixed-top`, spacer | Idem |
| Strip 3 categorias mobile | JS `initSdaMobileNavStrip` | Idem |
| Dock inferior | Links catálogo/conta | Idem |

**Critério:** após mudanças no header, mega menu **continua abrindo** e links **200** — regressão funcional, não visual.

### B.6 Estados interativos

| Estado | Aplicação | Especificação |
|--------|-----------|---------------|
| **Normal** | Todos clicáveis | Contraste texto ≥ WCAG AA onde mensurável |
| **Hover** | Links utility, nav, cart | Utility: opacity **0.85**; cart/conta: laranja ícone/texto conforme CSS atual |
| **Focus-visible** | Busca, botões, links nav | `outline: var(--sda-header-focus-ring); outline-offset: 2px` — estender a `.header-v2 a:focus-visible, .header-v2 button:focus-visible` |
| **Active / open** | Mega menu, mobile sidebar, search overlay | Sem alterar classes WDNA; garantir z-index **não** inferior ao estado atual |
| **Loading** | Alpine `x-cloak`, carrinho qty | `[x-cloak] { display: none }` preservado; qty **0** oculta badge ou mostra "0" conforme markup atual |

### B.7 Texto longo, zoom, overflow

- Proibir **scroll horizontal** em `body` causado por header (`overflow-x: hidden` **não** global — corrigir só filhos header se necessário).
- Utility: `flex-wrap: nowrap` + ellipsis em labels > 120px.
- Nav: `white-space: nowrap` nos itens desktop; wrap controlado em telas médias.

### B.8 Acessibilidade e semântica

| Requisito | Implementação |
|-----------|---------------|
| Landmarks | `<header class="header header-v2 sda-header-v2">`, `<nav class="nav-main">` |
| Busca | `input type="search"`, `title`/`placeholder` descritivos |
| Botões | `title` em ícones (Busca, Menu, Carrinho); utility SVG `aria-hidden="true"` |
| Teclado | Tab order: utility → logo → busca → ações → nav; mega menu focável conforme WDNA |
| Contraste | Utility branco/navy; nav azul/branco via mega-menu (validar separadamente) |

### B.9 Performance

- Manter **um** arquivo `header-v2.css` (sem duplicar inline emergency).
- Ícones SVG inline WDNA — **não** inflar DOM.
- Logo: `decoding="async"`, dimensões width/height quando disponíveis.

---

## C. Arquivos previstos na implementação (após aprovação desta spec)

| Arquivo | Alteração | Justificativa |
|---------|-----------|---------------|
| `assets/sda-tokens.css` | Adicionar aliases `--sda-header-*` (§B.1) | Tokens marca sem migração global |
| `assets/header-v2.css` | Mapear `--hdr-*` → `--sda-*`; focus-visible header; ajustes touch 44px; **escopo `.header-v2` / `.sda-header-v2` apenas** | Redesign visual coeso |
| `sections/header.liquid` | **Base = export produção/preview**; alinhar classes `sda-header-v2`; não remover utility; preservar scripts `alterForm*` | Corrigir drift Git |
| `layout/theme.liquid` | Mesclagem Opção A: link tokens; remover inline header **se** compare.css ativo | Eliminar duplicidade |
| `assets/mega-menu.css` | **Nenhuma** nesta etapa | Contém regras de card |
| `assets/mega-menu.js` | **Nenhuma** | Escopo congelado |
| `theme.js`, `theme-all.css`, card, PDP | **Nenhuma** | Contrato WDNA |

**Entregável intermediário obrigatório:** `header.liquid` exportado do painel WDNA (backup) anexado ao repo em `docs/wdna/backups/header-producao-YYYYMMDD.liquid` antes da fase E.

---

## D. Plano de testes (fase F — preview)

### D.1 Viewports

360, 390, 768, 991, 1024, 1280, 1440 px — Chrome ou Firefox, DevTools device + janela redimensionada.

### D.2 Funcional

| ID | Teste |
|----|--------|
| T-H01 | Busca desktop termo válido → `/busca/...` |
| T-H02 | Busca desktop vazia → `/busca/` |
| T-H03 | Busca mobile overlay + submit |
| T-H04 | Carrinho abre sidenav |
| T-H05 | Conta login/logout (Alpine) |
| T-H06 | Mega menu Modelos + 3 links |
| T-H07 | Mobile hamburger + link 1º nível |
| T-H08 | `openNavMobile` sem erro console |
| T-H09 | Frete PDP (HF1 checklist) — **sem alterar integração** |

### D.3 Visual / regressão

| ID | Teste |
|----|--------|
| T-V01 | Utility navy + tipografia Akhand |
| T-V02 | Logo ≤50px, não pixelado |
| T-V03 | Busca pill alinhada centro desktop |
| T-V04 | Badge laranja carrinho |
| T-V05 | Lilás só Diag/acento — não nav principal |
| T-V06 | **HC1** cards home/busca **sem delta** vs screenshot backup |
| T-V07 | Sem `#header-orange-inline-v5` após mesclagem |
| T-V08 | Dock + nav azul iguais ao pré-header (mega-menu inalterado) |

### D.4 A11y / técnico

| ID | Teste |
|----|--------|
| T-A01 | Tab atravessa busca + enviar |
| T-A02 | Focus-visible visível |
| T-N01 | Network: `sda-tokens.css`, `header-v2.css` 200 |
| T-N02 | Console sem erro novo em Alpine/alterForm |

---

## E. Critérios objetivos de aprovação (Go Header)

1. **Todos T-H01–T-H09** = AP com evidência.  
2. **Todos T-V01–T-V08** = AP (T-V06 obrigatório Opção A).  
3. **T-A01–T-A02**, **T-N01–T-N02** = AP ou exceção documentada.  
4. Markup **`header-utility` + busca v2** presente e consistente com CSS.  
5. **mega-menu.css** byte-identical ao backup pré-etapa (Opção A).  
6. Nenhum teste **NT** marcado como AP.  
7. Preview **não** ativado em produção.

---

## F. Riscos e limitações declaradas

| Risco | Mitigação |
|-------|-----------|
| Upload `header.liquid` Git destrói utility bar | Export produção primeiro (§A.2) |
| Remover inline quebra compare/BTU | Manter `product-compare.css`; validar T-V06 |
| `header-v2.css` usa `!important` vs `theme-all` | Manter escopo `.header.header-v2`; documentar cada bloco |
| Dock/nav em mega-menu.css | Testes T-H06/T-V08 only functional |
| Preview URL indisponível | Testes BL até link WDNA |

---

## G. Sequência após aprovação desta especificação

1. Você aprova **esta spec** (comentários welcome on tokens/dimensões).  
2. Fornece **URL preview** + export **`header.liquid` produção**.  
3. Reconciliação Liquid + implementação CSS/tokens **só no preview**.  
4. Checklists `CHECKLIST_ETAPA_HEADER.md` + evidências.  
5. Go/No-go → só então **Especificação Product Card**.

---

## H. Referências

- `docs/PLANO_ETAPA_HEADER.md`  
- `docs/wdna/etapa-header-opcao-a/`  
- `assets/header-v2.css`, `assets/sda-tokens.css`  
- Produção: `https://www.sitedoar.com.br/` (somente leitura)
