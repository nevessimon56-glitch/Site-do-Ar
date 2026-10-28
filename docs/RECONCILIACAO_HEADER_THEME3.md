# Reconciliação Header — export theme3 validado (revisão)

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Backup:** [`docs/wdna/backups/header-producao-theme3-20261028.liquid`](wdna/backups/header-producao-theme3-20261028.liquid)  
**SHA-256:** `6e16746dfff7063158303953ab66c9f5bd636eaa06b97fac6e90e37f0fc6d65a`  
**Status:** Reconciliação **documental** em andamento — **implementação/upload continua BLOQUEADO** até aprovação explícita.  
**Testes interativos:** **PENDENTE/BLOQUEADO** (inalterado).

---

## 1. Validação do export v2 (desbloqueio parcial)

| Sinal | Export theme3 | HTML ao vivo (`sitedoar.com.br`) | Git `sections/header.liquid` |
|-------|---------------|----------------------------------|------------------------------|
| `<header class="header header-v2">` | Sim | Sim | `+ sda-header-v2` |
| `.header-utility` | Sim | Sim | **Não** |
| `#myForm2Desktop` / `alterForm2Desktop()` | Sim | Sim | **Não** |
| Pill `#myForm2` + Enter → `alterForm2()` | Sim | Sim | Parcial (layout antigo) |
| `openFavoritesPanel` | Sim | Sim | **Não** |
| `.header-v2-mobile-catalog` | Sim | Sim | **Não** |
| `.header-v2-mobile-strip` | Sim | Sim | **Não** |
| `<style>` inline no Liquid | **Sim** | **Não** (no fragmento header) | **Não** |
| `.top-content` | **Não** | **Não** no DOM | **Sim** |
| `sendWhatsPlugin` / WhatsApp bar | **Não** (utility URL) | Idem | **Sim** (header bar) |
| `.search_link` / `openSearch()` no markup | **Não** | **Não** no bar (função existe no JS) | **Sim** |

**Conclusão:** este export é **fonte válida** para paridade funcional com a loja ao vivo. O export operador anterior (header clássico) permanece arquivado apenas como contraste histórico.

**Ressalva:** confirmar no painel que o arquivo exportado pertence ao **themeId 3** (CDN) — operador ainda deve registrar ID/URL do **preview novo**.

---

## 2. Artefatos ainda ausentes (lista operacional)

| # | Item | Status |
|---|------|--------|
| 1 | URL + **themeId** do tema **preview** (recém-criado) | **Faltando** |
| 2 | Export `layout/theme.liquid` (tema 3 + preview) | **Faltando** |
| 3 | Inventário scripts painel preenchido | **Parcial** |
| 4 | Export `header.liquid` do **preview** (baseline clone) | **Faltando** |
| 5 | Confirmação byte-identical export painel vs SHA repo | **Opcional** (recomendado) |

---

## 3. Diferenças detalhadas (export theme3 × Git × HTML)

### 3.1 Markup e camadas

| Item | Export theme3 | Git | Impacto |
|------|---------------|-----|---------|
| Faixa utility + conta server-side (`customer` → `sdaUtilityFirst`) | Sim | Não | Git regrediria atendimento/conta |
| Ícones SVG via `{% assign icon* %}` | Sim | `themeConfig.icons` | Manter export (produção) |
| Renomear menu “Peças/Acessório” → “Modelo” | Sim | Não | Mega menu / expectativa loja |
| Nav desktop `limit: 7` + thumbs CDN | Sim | Loop completo sem v2 | Manter export |
| Mobile catalog 4 colunas | Sim | Não | Mobile UX |
| Mobile sidebar: atalhos Ambiente/Favoritos/Pedidos | Sim | Só menu WDNA | Manter export |
| Mobile submenu: export **2 níveis** abaixo do item | Sim | Git **3 níveis** | **Validar no preview** qual profundidade a loja usa |
| Banner `.top-content` | Não | Sim | **Não** reintroduzir sem config `bannerTop` |

### 3.2 Busca e scripts inline

| Função | Export theme3 | Git |
|--------|---------------|-----|
| `alterForm()` | Sim; vazio → redirect | Sim; padrão antigo |
| `alterForm2()` | **`form.submit()`** | Sem `.submit()` |
| `alterForm2Desktop()` | Sim | Ausente |
| `headerV2FocusMobileSearch()` | Sim | Ausente |

### 3.3 CSS e Opção A

| Fonte | Export theme3 | Produção renderizada | Git `header-v2.css` |
|-------|---------------|----------------------|---------------------|
| Estilos header | **Inline `<style>`** ~ escopo `.header-v2` | **CDN** `header-v2.css` + inline layout `#header-orange-inline-v5` | Arquivo externo extenso |
| Tokens `--sda-ink` etc. | Inline | Via CSS publicado | Parcial `--hdr-*` / tokens |

**Comportamento:** no ar, cascata externa prevalece; o inline no Liquid pode ser **redundante** ou **reserva** se CSS CDN falhar — **não remover** na reconciliação sem teste preview.

---

## 4. Proposta mínima de reconciliação (revisão — sem implementar)

**Base obrigatória:** `header-producao-theme3-20261028.liquid` (cópia de trabalho `header-reconciliado-DRAFT.liquid`).

| ID | Alteração proposta | Origem | Motivo |
|----|-------------------|--------|--------|
| M-01 | **Manter** markup utility, forms triplos, favoritos, catalog, scripts inline | Export theme3 | Paridade produção |
| M-02 | **Não** substituir por `sections/header.liquid` do Git | Git | Regressão crítica |
| M-03 | **Opcional:** lógica `logoUseH1` do Git (H1 só home) | Git | SEO; export já oculta H1 via CSS — baixo impacto visual |
| M-04 | **Não** adicionar `.top-content` | Git | Ausente no DOM e no export theme3 |
| M-05 | **Não** adicionar `sendWhatsPlugin` no bar | Git | Utility já cobre WhatsApp |
| M-06 | Opção A preview: linkar `sda-tokens.css` + `header-v2.css`; **avaliar remoção do `<style>` inline** só após diff visual 991/767/360 | Opção A | Evitar dupla cascata / drift |
| M-07 | Mesclagem mínima `theme.liquid` preview (não colar layout Git v3 inteiro) | Docs Opção A | Ordem CSS |
| M-08 | Preservar `openSideNavOverlayCartB2B` condicional | Export | B2B config |
| M-09 | Validar profundidade menu mobile (2 vs 3 níveis) | Git vs export | Evitar perda de links |
| M-10 | Manter export operador clássico **fora** do merge | Arquivo histórico | Evitar confusão |

**Implementação no preview:** somente após **aprovação explícita** desta proposta + critérios E-01…E-09 em [`PREPARACAO_RECONCILIACAO_HEADER.md`](PREPARACAO_RECONCILIACAO_HEADER.md).

---

## 5. Export inválido anterior (referência)

[`header-export-operador-20261028.liquid`](wdna/backups/header-export-operador-20261028.liquid) — header WDNA clássico; **não** usar para merge. Ver [`RECONCILIACAO_HEADER_DIFF_E_PROPOSTA.md`](RECONCILIACAO_HEADER_DIFF_E_PROPOSTA.md) §1.

---

## 6. Veredito

| Pergunta | Resposta |
|----------|----------|
| Export theme3 alinhado ao HTML ao vivo? | **Sim** (marcadores críticos) |
| Reconciliação documental pode avançar (diff + proposta)? | **Sim** — este documento |
| Reconciliação **concluída**? | **Não** — falta preview URL/ID, layout export, testes |
| Autorizado implementar/upload? | **Não** |
