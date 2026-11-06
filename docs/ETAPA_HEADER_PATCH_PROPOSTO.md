# Etapa Header — patch mínimo proposto (revisão 2, sem upload)

**Preparação 3 (P-01, A1, testes, patch cirúrgico):** [`ETAPA_HEADER_PREPARACAO_P01_TESTES.md`](ETAPA_HEADER_PREPARACAO_P01_TESTES.md)  
**Especificação CSS cirúrgico:** [`PATCH-CIRURGICO-HEADER-V2-ESPEC.md`](wdna/etapa-header-opcao-a/PATCH-CIRURGICO-HEADER-V2-ESPEC.md)

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Decisão operacional:** testes visuais no **site publicado** (`https://sitedoar.com.br`, **themeId 3**). URL isolada tema 11 **não** bloqueia preparação documental.  
**Referência markup:** [`header-producao-theme3-20261028.liquid`](wdna/backups/header-producao-theme3-20261028.liquid) (SHA `6e16746d…`) — **não** assumir byte-idêntico ao editor.  
**Status:** **implementação, upload e pedido de aprovação BLOQUEADOS** até P-01 e revisão do patch A2/A3 abaixo.

---

## 0. Veredito desta revisão (gate de aprovação)

| Item | Estado |
|------|--------|
| Diff real `header-v2.css` prod vs Git | **Atendido** (§5, artefatos CDN) |
| Análise inline `header.liquid` vs CSS externo | **Atendido** (§6) — **não** há duplicação byte-a-byte |
| P-02 backup `header.liquid` | **Atendido (documental)** — ver [`header-producao-theme3-20261028.meta.md`](wdna/backups/header-producao-theme3-20261028.meta.md) |
| P-01 backup `layout/theme.liquid` | **BLOQUEADO** — arquivo `.liquid` ausente no repo (§2) |
| P-03 backup `header-v2.css` | **Atendido** — CDN 28/out (§5) |
| Remoção inline header (A3) | **Suspensa** — sem equivalentes mapeados (§6) |
| Substituição integral Git `header-v2.css` (A2) | **Risco alto** — 8 seletores removidos fora header (§5.4) |
| TH-01–TH-20 | **PENDENTE** (§10) |
| **Recomendação:** solicitar aprovação | **Não** — resolver P-01 e renegociar escopo A2/A3 |

---

## 1. Arquivos no escopo Opção A (revisado)

| # | Caminho WDNA | Ação **anterior** | Ação **revisada** |
|---|--------------|-------------------|-------------------|
| A1 | `assets/sda-tokens.css` | Criar + link layout | **Isolado do redesign** — risco **médio–alto** fora do header ([prep §2](ETAPA_HEADER_PREPARACAO_P01_TESTES.md)) |
| A2 | `assets/header-v2.css` | Substituir pelo Git | **Condicional** — só após diff §5 aceito; default **não substituir integral** |
| A3 | `sections/header.liquid` | Remover `<style>` inline | **Suspenso** — inline é **camada visual adicional**, não duplicata (§6) |
| A4 | `layout/theme.liquid` | +1 link tokens; Fase 2 inline layout | Fase 1 **bloqueada** sem P-01; Fase 2 inline layout **inalterada** |

**Fora de escopo (proibido):** `mega-menu.css`, `mega-menu.js`, `theme.js`, `theme-custom.css`, checkout, busca server-side, frete, cards/PDP (salvo fumaça TH-17–TH-18).

---

## 2. Pré-requisitos

| ID | Requisito | Status | Evidência / ação manual |
|----|-----------|--------|-------------------------|
| P-01 | Backup painel `layout/theme.liquid` tema **3** → `docs/wdna/backups/layout-theme-producao-theme3-20261028.liquid` + SHA | **BLOQUEADO** | Arquivo `.liquid` **ausente** (verificado 28/out). Procedimento: [`ETAPA_HEADER_PREPARACAO_P01_TESTES.md`](ETAPA_HEADER_PREPARACAO_P01_TESTES.md) §1.2. |
| P-02 | Backup `sections/header.liquid` tema **3** | **Atendido (documental)** | [`header-producao-theme3-20261028.liquid`](wdna/backups/header-producao-theme3-20261028.liquid) SHA `6e16746d…`. Revalidar SHA no painel antes do upload. |
| P-03 | Backup `assets/header-v2.css` tema **3** | **Atendido** | [`header-v2-producao-theme3-20261028.css`](wdna/backups/header-v2-producao-theme3-20261028.css) SHA `188a64cf…` via CDN (meta §5). |
| P-04 | `sda-tokens.css` no painel | **PENDENTE** | Após P-01 desbloqueado |
| P-05 | Aprovação escrita + escopo A2/A3 explícito | **PENDENTE** | |
| P-06 | Janela de teste em produção | **PENDENTE** operador | |
| P-07 | Inventário CSS/scripts Header | **Atendido** | §4 |

---

## 3. Inventário CSS e scripts — Header (tema 3)

### 3.1 Cascata comprovada (home anônima, 28/out/2026)

| Ordem | Arquivo | Patch |
|-------|---------|-------|
| theme-plugins, theme-all, theme-custom | Base + `--brand-*` | Não alterar |
| mega-menu.css | Nav/dock | Não alterar |
| **header-v2-{hash}.css** | Header estrutural (`--hdr-*`) | Ver §5 |
| favorites, compare, hover, sda-conversion, showcase-product-card, product-page-v2 | Acoplamentos | Não alterar |
| **`#header-orange-inline-v5`** (layout) | Badges, SVG emergency, hide compare JSON | Fase 2 opcional (inalterado nesta revisão) |
| **`<style>` final em `header.liquid`** | Overlay `--sda-ink` / grid / mobile catalog | **Não remover** até §6.3 |

### 3.2 JavaScript

Sem alteração proposta. Contratos: `alterForm2`, `alterForm2Desktop`, `openFavoritesPanel`, `theme.js`, `mega-menu.js` (não editar).

---

## 4. `sda-tokens.css` — variáveis, dependências, conflitos

**Arquivo Git:** SHA `4887f1bc…` — 95 linhas `:root` + bloco `:focus-visible` em cards/PDP (fora header).

### 4.1 Variáveis definidas em `:root` (lista)

| Grupo | Variáveis |
|-------|-----------|
| Marca/superfície | `--sda-navy`, `--sda-bg`, `--sda-surface`, `--sda-surface-muted`, `--sda-border`, `--sda-border-strong` |
| Texto | `--sda-text`, `--sda-text-muted`, `--sda-text-soft` |
| Ação primária | `--sda-primary`, `--sda-primary-deep`, `--sda-primary-gradient`, `--sda-primary-shadow` |
| Secundária | `--sda-secondary-border`, `--sda-secondary-bg`, `--sda-secondary-text` |
| Comercial | `--sda-discount`, `--sda-discount-gradient`, `--sda-pix-benefit`, `--sda-success`, `--sda-success-soft` |
| Utilitários | `--sda-purple`, `--sda-purple-dark`, `--sda-purple-soft`, `--sda-orange`, `--sda-orange-deep` |
| Aliases | `--sda-blue` → `--sda-primary`, `--sda-blue-deep` → `--sda-primary-deep`, `--sda-blue-light`, `--sda-green`, `--sda-green-soft` |
| Tipografia | `--sda-font`, `--sda-fs-xs` … `--sda-fs-price`, `--sda-fw-bold`, `--sda-fw-semibold` |
| Layout | `--sda-space-*`, `--sda-radius*`, `--sda-shadow*`, `--sda-bp-tablet`, `--sda-bp-mobile` |
| Mobile layers | `--sda-nav-gradient`, `--sda-nav-solid`, `--sda-mobile-dock-h`, `--sda-compare-bar-reserve-h`, `--sda-pdp-sticky-h`, `--sda-touch-min` |
| Cards (não header) | `--sda-card-img-h-*`, `--sda-card-title-min-*`, `--sda-card-footer-min-*`, `--sda-card-total-min-mobile` |

### 4.2 Dependências

- **Ordem:** carregar **depois** de `theme-custom.css` e **antes** de `header-v2.css` / `mega-menu.css` (Git layout).
- **Git `header-v2.css`:** usa `var(--sda-bg)`, `--sda-border`, `--sda-orange`, `--sda-purple*`, `--sda-navy`, etc., com fallbacks hex — **funciona sem A1**, mas valores divergem do `--hdr-*` da produção.

### 4.3 Conflitos com globais existentes

| Namespace | Onde | Conflito com `sda-tokens` |
|-----------|------|---------------------------|
| `--brand-primary`, `--brand-navy`, … | `theme-custom.css` `:root` | **Nenhum nome colidente** — coexistem |
| `--footer-*` | `theme-custom.css` segundo `:root` | Independente |
| `--hdr-*` | `.header-v2` em **prod** `header-v2.css` | **Paralelo** — produção não usa `--sda-*` no arquivo CDN |
| `--sda-ink`, `--sda-blue` (#075da8), … | **Inline** `.header.header-v2` em `header.liquid` | **Escopo local** — sobrescreve percepção de cor **dentro do header** se inline mantido; `:root --sda-blue` (#1976d2 alias) **não substitui** inline enquanto bloco existir |
| Foco cards (L97–107 tokens) | Global `.sda-card`, `.product-v2` | **Efeito fora header** se A1 linkado — apenas `:focus-visible`; risco baixo |

**Conclusão (rev. prep 3):** A1 (link + upload) **pode alterar vitrines/PDP** porque `sda-conversion-redesign.css` e `product-page-v2.css` já estão na home produção e consomem `--sda-*`. Header prod (`--hdr-*` + inline) **pode** ficar estável, mas **não** classificar A1 como baixo risco global. Upload A1 **não recomendado** sem P-01 e matriz **TA-*** ([`ETAPA_HEADER_PREPARACAO_P01_TESTES.md`](ETAPA_HEADER_PREPARACAO_P01_TESTES.md) §2–3).

---

## 5. `header-v2.css` — prod (CDN) vs Git

### 5.1 Evidência

| | Produção CDN | Git (patch) |
|--|--------------|-------------|
| Arquivo | [`header-v2-producao-theme3-20261028.css`](wdna/backups/header-v2-producao-theme3-20261028.css) | `assets/header-v2.css` |
| SHA-256 | `188a64cf2f38681e867fbe8960925dd437d43a84585658203738106464659eb7` | `7af196269fcccbb82b8df8ba20690feecc0f3aa8b025dce32410d75c66a5bf31` |
| Regras (parse heurístico) | 196 | 230 |
| Diff | [`PATCH-header-v2-prod-vs-git.diff`](wdna/etapa-header-opcao-a/PATCH-header-v2-prod-vs-git.diff) (~3225 linhas) | |
| Listas seletores | [removidos](wdna/etapa-header-opcao-a/header-v2-prod-vs-git-removed-selectors.txt), [adicionados](wdna/etapa-header-opcao-a/header-v2-prod-vs-git-added-selectors.txt) | |

**Limitação:** parse por `}` não equivale a AST CSS; contagens são indicativas. Validar visualmente TH-* após qualquer A2.

### 5.2 Seletores **removidos** no Git (presentes na prod, ausentes no Git) — 8

| Seletor | Área | Efeito se substituir A2 |
|---------|------|-------------------------|
| `.mobile-catalog-dock__btn`, `__icon svg`, `__inner`, `__inner--logged`, `__inner--logged .sda-dock-account-hidden` | Mobile dock | **Fora do header** — padding footer / dock quebrado |
| `@media (max-width: 991px) { .mobile-catalog-dock__inner--quad` | Mobile | Idem |
| `body.has-mobile-catalog-dock`, `body.has-mobile-catalog-dock .footer` | Layout página | **Fora do escopo** — regressão footer mobile |

### 5.3 Seletores **adicionados** no Git (ausentes na prod) — 36 (amostra crítica)

| Bucket | Exemplos | Intenção |
|--------|----------|----------|
| Header / SVG emergency | `body .header.header-v2:not(.header-checkout)`, regra agregada SVG 22px | Paridade layout inline v5 / ícones |
| Nav / legacy | `.sda-header-v2 .navbar-center`, hide diag nav link | Comportamento WDNA legado |
| Mobile strip | `.header-v2-mobile-strip`, `__link--ambiente`, `__link--diag` | Faixa mobile **não** na prod CDN |
| Search | `body .header… .search-desktop .form-input` | Unificar campos busca |
| **Fora header** | `main.home-main, main.search-main, main.product-main` | Fundo página — **efeito colateral** |

Lista completa: [`header-v2-prod-vs-git-added-selectors.txt`](wdna/etapa-header-opcao-a/header-v2-prod-vs-git-added-selectors.txt).

### 5.4 Seletores **modificados** (mesmo seletor, declaração diferente) — 6

| Seletor | Prod (resumo) | Git (resumo) |
|---------|---------------|--------------|
| `.header-v2 .header-v2-cta-diag360` | Botão claro `#f5faff` / border | Gradiente roxo `--sda-purple*` |
| `.header-v2 .header-v2-cta-ambiente` | Estilo prod (inline nav variant) | Gradiente laranja `--sda-orange*` |
| `.header-v2 .header-v2-action__icon svg` | 28×28 | 22×22 `!important` |
| `.header-v2 .header-v2-search-pill` | padding `0 0 8px` | padding vertical 6px |
| `.header-v2 .header-utility__inner` | `--hdr-m-*` / flex prod | min-height 32px fixo |

### 5.5 Recomendação técnica A2

**Não** substituir arquivo inteiro pelo Git sem:

1. Reincorporar os **8** seletores `mobile-catalog-dock` / `body.has-mobile-catalog-dock` da prod, **ou** aceitar regressão documentada fora do escopo.  
2. Diff **cirúrgico** (CTAs, utility, search) em branch de patch — **não** upload do `header-v2.css` Git monolítico.

---

## 6. Inline `<style>` em `header.liquid` vs CSS externo

### 6.1 Modelo ao vivo (comprovado)

Produção = **`header-v2-{hash}.css`** (tokens `--hdr-*`, Akhand utility, nav completa) **+** bloco inline (~95 regras, tokens `--sda-ink` / `--sda-blue` #075da8 em `.header.header-v2`).

Não é “só duplicata”: é **segunda camada** que redefine grid, cores e mobile catalog display.

### 6.2 Comparação quantitativa (28/out/2026)

| Métrica | Inline vs prod CDN | Inline vs Git |
|---------|-------------------|---------------|
| Regras parseadas | 95 | 95 |
| Mesmo seletor **e** mesma declaração | **0** | **0** |
| Mesmo seletor, declaração diferente | 46 | 37 |
| Seletor ausente no arquivo externo | 49 | 44 |

Heurística “equivalente funcional” (overlap ≥3 tokens de classe): **3** regras; **71** sem equivalente claro na prod.

### 6.3 Regras **exclusivas** do inline (remover = perda unless covered)

| Categoria | Exemplos (inline only) | Equivalente prod CDN? | Equivalente Git? |
|-----------|------------------------|----------------------|------------------|
| Root header tokens | `.header.header-v2 { --sda-ink, --sda-blue, box-shadow }` | **Não** (`--hdr-*` diferente) | **Não** (Git usa `:root` sda-tokens + outros seletores) |
| Box-sizing filhos | `.header-v2 *, *::before, *::after` | **Não** explícito | Parcial |
| Logo / grid navbar | `.logo`, `.header-v2-navbar` grid 3 colunas | **Parcial** (prod tem grid distinto) | Parcial |
| Nav row simplificada | `.header-v2-nav-row`, `.nav-main` flex | **Parcial** | Parcial |
| Mobile catalog display | `@media 767` `.header-v2-mobile-catalog { display:block }` | Prod CDN tem regras mobile **diferentes** | Git tem strip + catalog |
| CTAs nav | `.header-v2-cta-ambiente--in-nav` fundo `#fff4e8` | **Conflito** com prod/Git CTAs | Gradiente no Git |

### 6.4 Regras **exclusivas** prod CDN (inline **não** cobre) — 134 seletores

Inclui: `@font-face Akhand`, utility Akhand uppercase, `.header-utility__guest-short`, nav dropdown, `.mobile-catalog-dock*`, sidebar z-index prod, etc.

**Conclusão:** remover inline **sem** substituir por CSS que reproduza **ambas** camadas faz o header regredir para aparência “só CDN” ou quebrar mobile catalog.

### 6.5 A3 revisado

| Diff anterior | Status |
|---------------|--------|
| [`PATCH-header-remove-inline-style.diff`](wdna/etapa-header-opcao-a/PATCH-header-remove-inline-style.diff) | **Arquivado — não recomendado** para Fase 1 |

**Pré-condição para qualquer remoção:** matriz seletor-a-seletor com equivalente **comprovado** (declaração ou par visual TH-*) — **não atendida**.

---

## 7. Diffs ainda válidos (condicionais)

### 7.1 Layout Fase 1 — link tokens (requer P-01)

[`PATCH-layout-theme3-sda-tokens.diff`](wdna/etapa-header-opcao-a/PATCH-layout-theme3-sda-tokens.diff) — inalterado; **não aplicar** sem backup layout arquivado.

### 7.2 Layout Fase 2 — `#header-orange-inline-v5`

Permanece **opcional e posterior**; depende de `product-compare.css` + TH-17. Não revisado nesta rodada.

---

## 8. Rollback **por arquivo** (hipóteses de tempo não medidas)

| Arquivo | Restauração no painel | Confirmação CDN / site | Tempo (hipótese) |
|---------|----------------------|------------------------|------------------|
| `layout/theme.liquid` | Colar backup P-01; Salvar tema 3 | View-source: ausência/presença `sda-tokens.css`; hash `theme-*.js` pode mudar | **Hipótese:** 2–5 min + propagação CDN |
| `sections/header.liquid` | Colar backup P-02 (`6e16746d…`) | View-source HTML: bloco `<style>` após scripts header; buscar `alterForm2Desktop` | **Hipótese:** 2–5 min |
| `assets/header-v2.css` | Colar backup P-03 (`188a64cf…`) | Network: URL `header-v2-*.css` **novo hash**; comparar SHA download vs backup | **Hipótese:** 1–3 min após save |
| `assets/sda-tokens.css` | Remover arquivo ou conteúdo vazio; remover link layout | View-source: link `sda-tokens` ausente | **Hipótese:** 2–5 min |

**Procedimento comum:** Salvar → aba anônima hard refresh → `curl -sL https://www.sitedoar.com.br/ | rg 'header-v2|sda-tokens|header-orange'` → opcional baixar CSS e `sha256sum`.

**Medição real:** **PENDENTE** (registrar na primeira janela de upload).

---

## 9. Ordem segura (se aprovação futura — escopo mínimo conservador)

1. Desbloquear **P-01** (layout backup).  
2. Backups painel confirmados P-01–P-03.  
3. **Somente A1 + A4 linha tokens** (sem A2, sem A3) — executar **TA-01–TA-07** antes de TH header.  
4. TH-01–TH-16 + **TH-21–TH-24** (footer/dock/PLP/PDP) — ver prep §3.  
5. **Se** aprovação explícita para redesign: patch **cirúrgico** ([`PATCH-CIRURGICO-HEADER-V2-ESPEC.md`](wdna/etapa-header-opcao-a/PATCH-CIRURGICO-HEADER-V2-ESPEC.md)) — não monolito Git.  
6. **Nunca** A3 inline na mesma janela que A2 monolito.  
7. Fase 2 layout inline v5 — última.

---

## 10. Testes TH-01–TH-20

Matriz em [`ETAPA_HEADER_ENTRADA_E_TESTES.md`](ETAPA_HEADER_ENTRADA_E_TESTES.md) §7.

**Todos PENDENTE.** Nenhum marcado APROVADO.

---

## 11. Bloqueios restantes

| Bloqueio | Responsável |
|----------|-------------|
| P-01 — export `layout/theme.liquid` tema 3 (**`.liquid` ainda não no repo**) | Operador |
| A1 — estratégia teste sem sandbox + TA-* | Operador + engenharia |
| Escopo A2 — monolito Git inaceitável sem merge `mobile-catalog-dock` | Engenharia |
| A3 — matriz equivalência inline | Engenharia |
| P-05 aprovação escrita | Operador |
| Medição tempo rollback | Operador (primeiro drill) |

---

## 12. Recomendação técnica (resumo)

1. **Não pedir aprovação** do patch anterior (A2 integral + A3 remover inline) — evidência §5–§6 invalida a premissa de “duplicata”.  
2. **Próximo passo operador:** colar `layout/theme.liquid` tema 3 (P-01).  
3. **Próximo passo engenharia:** gerar **patch cirúrgico** `header-v2.css` (CTAs + utility + ícones) preservando seletores dock/footer da prod; **ou** manter prod CDN e limitar etapa a A1 tokens + testes.  
4. Manter inline `header.liquid` até paridade visual demonstrada (TH-* **PENDENTE**).  
5. Upload continua **proibido** nesta tarefa.
