# Etapa Header — patch mínimo proposto (revisão, sem upload)

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Decisão operacional:** testes visuais no **site publicado** (`https://sitedoar.com.br`, **themeId 3**). URL isolada tema 11 **deixa de ser pré-requisito** para preparação; **não** deixa de ser desejável para reduzir risco.  
**Referência markup:** [`header-producao-theme3-20261028.liquid`](wdna/backups/header-producao-theme3-20261028.liquid) (SHA `6e16746d…`) — **não** assumir byte-idêntico ao editor.  
**Status:** **implementação e upload BLOQUEADOS** até aprovação explícita deste patch.

---

## 1. Arquivos afetados (escopo Opção A)

| # | Caminho WDNA | Ação proposta | Origem Git (referência) |
|---|--------------|---------------|-------------------------|
| A1 | `assets/sda-tokens.css` | **Criar/substituir** | `assets/sda-tokens.css` SHA `4887f1bc…` |
| A2 | `assets/header-v2.css` | **Substituir** | `assets/header-v2.css` SHA `7af19626…` |
| A3 | `sections/header.liquid` | **Patch mínimo** (remover `<style>` inline) | Baseline = backup produção, **não** `sections/header.liquid` Git |
| A4 | `layout/theme.liquid` | **Patch mínimo** (1 link CSS Fase 1; Fase 2 opcional inline) | Baseline = export tema 3 painel |

**Fora de escopo (proibido nesta etapa):** `mega-menu.css`, `mega-menu.js`, `theme.js`, `theme-all.css`, `theme-custom.css`, checkout, busca server-side, frete, cards, PDP, `sda-card.css`, substituição integral do layout Git v3.

---

## 2. Pré-requisitos (antes de qualquer upload)

| ID | Requisito | Status |
|----|-----------|--------|
| P-01 | Backup painel: `layout/theme.liquid` tema **3** → repo + SHA | **PENDENTE** |
| P-02 | Backup painel: `sections/header.liquid` tema **3** (confirmar vs SHA `6e16746d…`) | **PENDENTE** |
| P-03 | Backup painel: `assets/header-v2.css` tema **3** (CDN atual) | **PENDENTE** |
| P-04 | Criar `assets/sda-tokens.css` no painel **só após** P-01–P-03 | **PENDENTE** |
| P-05 | Aprovação **escrita** deste documento + ordem Fase 1→2 | **PENDENTE** |
| P-06 | Janela de teste acordada (tráfego real em `sitedoar.com.br`) | **PENDENTE** operador |
| P-07 | Inventário CSS/scripts Header (§4) revisado | **Atendido** (documental) |

---

## 3. Inventário CSS e scripts — Header (tema 3 publicado)

### 3.1 CSS com impacto no Header (ordem comprovada no HTML ao vivo)

| Ordem | Arquivo | Função Header | Patch |
|-------|---------|---------------|-------|
| 1–3 | theme-plugins, theme-all, theme-custom | Base WDNA | **Não alterar** |
| **NEW** | **sda-tokens.css** | Tokens marca | **Fase 1 — adicionar** |
| 4 | mega-menu.css | Nav, dock, mega | **Não alterar** |
| 5 | header-v2.css | Layout utility, pill, actions | **Fase 1 — substituir Git** |
| 6–10 | favorites, compare, hover, sda-conversion, showcase-product-card, product-page-v2 | Acoplamento parcial (badges, z-index) | **Não alterar** |
| Inline layout | `#header-orange-inline-v5` | Badges, SVG emergency, compare hide | **Fase 2 — remover condicional** |
| Inline header | `<style>` em `header.liquid` | Duplica header-v2 (~10 KB) | **Fase 1 — remover** (diff A3) |

### 3.2 JavaScript (contratos — não alterar)

| Script | Papel Header |
|--------|----------------|
| `theme.js` (sync) | `openSearch`, `openNavMobile`, `openSideNavOverlay` |
| `favorites.js` | `openFavoritesPanel` |
| Inline `header.liquid` | `alterForm`, `alterForm2`, `alterForm2Desktop`, `headerV2FocusMobileSearch` |
| Inline `layout/theme.liquid` | `initSdaMobileNavStrip`, `initSdaNavFixedTop`, `setupStore` |
| `mega-menu.js` | Mega menu (fora do escopo de edição) |

### 3.3 Painel (`scripts.*`)

Loops `scripts.header`, `scripts.content`, `scripts.footer` — **não alterar** neste patch. Ver [`INVENTARIO-SCRIPTS-PAINEL.md`](wdna/templates/INVENTARIO-SCRIPTS-PAINEL.md).

---

## 4. Diffs propostos (exatos)

### 4.1 `layout/theme.liquid` — Fase 1 (obrigatória para tokens)

Arquivo: [`PATCH-layout-theme3-sda-tokens.diff`](wdna/etapa-header-opcao-a/PATCH-layout-theme3-sda-tokens.diff)

```diff
     <link media="all" type="text/css" rel="stylesheet" href="{{ 'assets/theme-custom.css' | themeAssetUrl }}">
+    <link media="all" type="text/css" rel="stylesheet" href="{{ 'assets/sda-tokens.css' | themeAssetUrl }}">
```

**Ordem final Fase 1:** theme-custom → **sda-tokens** → mega-menu → header-v2 → … (inalterado).

### 4.2 `layout/theme.liquid` — Fase 2 (opcional, pós-Fase 1 validada)

Remover bloco completo `<style id="header-orange-inline-v5">…</style>` (~120 linhas no export tema 3).

**Pré-condição:** TH-09 visual OK + TH-17 compare JSON oculto + TH-10 badges carrinho.

**Rollback:** restaurar backup layout com inline v5.

### 4.3 `sections/header.liquid` — Fase 1

Substituir conteúdo do painel pelo backup produção **após** remover apenas o bloco `<style>…</style>` final (linhas ~538–655 do backup).

Diff unificado: [`PATCH-header-remove-inline-style.diff`](wdna/etapa-header-opcao-a/PATCH-header-remove-inline-style.diff)  
Artefato resultante (referência): [`header-producao-sem-inline-style.liquid`](wdna/etapa-header-opcao-a/header-producao-sem-inline-style.liquid)

**Não** aplicar diff Git `sections/header.liquid` (regressão utility/forms).

**Patch SEO opcional (Fase 3 — somente se aprovado separado):** lógica `logoUseH1` do Git — **fora** deste patch mínimo.

### 4.4 `assets/sda-tokens.css`

**Ação:** upload arquivo inteiro do repo (`4887f1bc…`). Sem diff parcial.

### 4.5 `assets/header-v2.css`

**Ação:** substituir arquivo inteiro do repo (`7af19626…`). Diff vs CDN produção **PENDENTE** (backup CDN não arquivado).

**Expectativa:** passar a usar `var(--sda-*)` onde mapeado; depende de A1 linkado antes de A2.

---

## 5. Riscos por alteração

| Alteração | Severidade | Risco | Mitigação |
|-----------|------------|-------|-----------|
| A1 tokens | Média | `var()` indefinido se ordem errada | Link **antes** de header-v2; rollback remove 1 linha layout |
| A2 header-v2.css | Alta | Regressão visual nav/mobile/utility | Testes TH-*; rollback CSS backup |
| A3 remover inline header | Alta | Visual quebra se header-v2.css incompleto | A2 antes ou junto; rollback header backup |
| Fase 2 remover inline layout | Alta | JSON compare visível / badges verdes | TH-17; rollback layout |
| Teste em produção | **Crítica** | Usuários veem mudança ao vivo | Janela baixa tráfego; rollback imediato preparado |

---

## 6. Ordem segura de aplicação (pós-aprovação)

1. **Backups** P-01–P-03 no painel + download para `docs/wdna/backups/`.  
2. Upload **A1** `sda-tokens.css`.  
3. **A4** mesclagem 1 linha layout (Fase 1).  
4. Upload **A2** `header-v2.css`.  
5. **A3** `header.liquid` sem bloco `<style>` (validar no editor: forms/IDs intactos).  
6. View-source: ordem CSS §3.1.  
7. Executar **TH-01–TH-20** (todos **PENDENTE** até execução).  
8. **Somente se TH OK:** Fase 2 remover `#header-orange-inline-v5` + re-test TH-10, TH-17.

**Nenhum passo acima autorizado nesta tarefa.**

---

## 7. Rollback (tema 3 publicado)

| Passo | Ação |
|-------|------|
| R1 | Re-upload backups P-01, P-02, P-03 (mesmos paths WDNA) |
| R2 | Se criou `sda-tokens.css`, deletar ou restaurar versão anterior vazia |
| R3 | Remover linha `sda-tokens.css` do layout se adicionada |
| R4 | Publicar/salvar tema; hard refresh CDN (cache bust natural por save WDNA) |
| R5 | TH-01 smoke busca + carrinho (**PENDENTE** execução) |

Tempo-alvo operacional: **minutos** (limitado por painel WDNA), desde que backups existam.

---

## 8. Testes pós-upload (site publicado — **PENDENTE**)

Usar matriz [`ETAPA_HEADER_ENTRADA_E_TESTES.md`](ETAPA_HEADER_ENTRADA_E_TESTES.md) §7 (TH-01–TH-20). Viewports **1280** e **390** obrigatórios.

| Grupo | IDs | Evidência |
|-------|-----|-----------|
| Busca | TH-01–TH-04 | HAR + URL |
| Nav / mega | TH-05–TH-08 | Screenshot + clique |
| Conta / fav / cart | TH-09–TH-12 | DOM + HAR |
| CTAs / console | TH-13–TH-16 | Console export |
| Fumaça fora header | TH-17–TH-18 | PDP + frete |
| Paridade pré/pós | TH-20 | Opcional gravação HAR antes do patch |

**Nenhum teste APROVADO** neste documento.

---

## 9. O que **não** fazer

- Substituir `header.liquid` pelo Git `sections/header.liquid`.  
- Colar `layout/theme.liquid` Git v3 (remove `showcase-product-card`, adiciona `sda-card`).  
- Tocar `mega-menu.*`, `theme.js`, checkout, busca, frete.  
- Tratar este patch como aprovado sem assinatura explícita.

---

## 10. Atualização do plano (preview URL)

- **Removido** bloqueio de preparação por URL tema 11.  
- **Mantido** registro em [`METADATA-PREVIEW.md`](wdna/backups/METADATA-PREVIEW.md) para uso futuro.  
- **Substituído** alvo de validação pós-upload: **themeId 3** / `sitedoar.com.br` com backups e rollback §7.

---

## 11. Veredito

| | |
|--|--|
| Patch documentado | **Sim** (§4) |
| Upload / implementação | **BLOQUEADO** |
| Próximo gate | P-01–P-05 + aprovação explícita |
