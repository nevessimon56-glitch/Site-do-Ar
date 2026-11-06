# Reconciliação Header — diferenças e proposta mínima (revisão)

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Status:** **Reconciliação NÃO concluída** — export recebido **não** corresponde ao HTML da loja ao vivo.  
**Restrições respeitadas:** nenhum código alterado, nenhum upload WDNA, testes interativos **PENDENTE/BLOQUEADO**.

---

## 0. Artefatos ausentes (lista operacional)

| # | Ação | Responsável | Bloqueia |
|---|------|-------------|----------|
| 1 | Re-exportar `sections/header.liquid` do tema cujo CDN é `.../themes/3/assets/` (mesmo HTML que `sitedoar.com.br`) | Operador | Reconciliação fiel à produção |
| 2 | Confirmar **themeId** do export (deve ser **3** se for o tema ao vivo) | Operador | Evitar export do preview novo ou tema base |
| 3 | Registrar **URL + themeId** do tema preview recém-criado | Operador | Testes e upload futuro |
| 4 | Export `layout/theme.liquid` (tema 3 + preview) | Operador | Opção A / inline emergency |
| 5 | Preencher [`INVENTARIO-SCRIPTS-PAINEL.md`](wdna/templates/INVENTARIO-SCRIPTS-PAINEL.md) | Operador | WhatsApp / tags |
| 6 | Export `header.liquid` do **preview** (baseline clone) | Operador | Diff pós-upload |
| 7 | Commitar no repo backups com SHA-256 (após itens 1, 4, 6) | Engenharia | Rastreabilidade |

**Artefato receido nesta rodada:**

| Arquivo | SHA-256 |
|---------|---------|
| [`docs/wdna/backups/header-export-operador-20261028.liquid`](wdna/backups/header-export-operador-20261028.liquid) | `3f2095ce89117bf2f6950a98cbf5a3d8c3171d6a05e8ab3a7210093504defffc` |

---

## 1. Validação do export (bloqueio crítico)

Comparação tripla:

| Sinal | Export operador | Git `sections/header.liquid` | HTML produção (snapshot) |
|-------|-----------------|------------------------------|---------------------------|
| `<header class="…">` | `header` | `header header-v2 sda-header-v2` | `header header-v2` |
| `.header-utility` | **Não** | **Não** | **Sim** |
| `.header-v2-navbar` / actions / strip | **Não** | Parcial v2 | **Sim** |
| Nav principal no topo (`navbar-center`) | **Sim** | **Não** (nav em `.nav-content`) | **Não** (nav em `.nav-content`) |
| Forms busca | só `#myForm` | `#myForm` + `#myForm2` | `#myForm` + `#myForm2` + `#myForm2Desktop` |
| `alterForm2` / `alterForm2Desktop` | **Não** | `alterForm2` only | **Sim** + `submit()` |
| `openFavoritesPanel` | **Não** | **Não** | **Sim** |
| `.top-content` banner | **Não** | **Sim** | **Não** no DOM (config/CSS) |
| `sendWhatsPlugin` | **Não** | **Sim** | Utility link direto (não plugin no bar) |

**Conclusão:** o Liquid fornecido corresponde a um **header WDNA clássico** (nav horizontal embutido na navbar), **anterior** tanto ao Git SDA quanto ao **Site do Ar ao vivo**. Tratar como **artefato arquivado**, não como base da reconciliação até existir export alinhado ao themeId **3** / DOM `header-v2`.

---

## 2. Relatório de diferenças

### 2.1 Markup estrutural

| Aspecto | Export operador | Git | Produção (HTML) |
|---------|-----------------|-----|-----------------|
| Camadas | 1× `.container` > navbar + search + sidebar | `.top-content` + `.header-content` + `.nav-content` + sidebar | `.header-utility` + `.header-content` + `.nav-content` + sidebar |
| Logo | `<h1>` sempre | H1 condicional (`logoUseH1`) | `<h1>` no logo |
| Logo img | lazy 192px | eager 260px + dimensões | lazy 260px |
| Nav desktop | Dentro `navbar-center`, max 6 itens inline | Row separada, dropdown WDNA completo | Row `.header-v2-nav-row` + CTA Ambiente + thumbs |
| Busca desktop | Só overlay mobile pattern (`openSearch`) | `.search-desktop` + `#myForm2` | `.header-v2-search` + `#myForm2Desktop` |
| Busca mobile | Overlay `#myForm` | Overlay + `#myForm2` desktop bar | Pill `#myForm2` + overlay |
| Conta desktop | Ícone `hide-lg` na navbar | Bloco account + templates Alpine | Utility bar + sidebar |
| Carrinho | Ícone + `cartQtd` Liquid | Link + badge | Desktop actions + mobile tools |
| Favoritos | **Inexistente** | **Inexistente** | Header actions + mobile |

### 2.2 Formulários, IDs, CSRF

| ID | Export | Git | Produção |
|----|--------|-----|----------|
| `myForm` / `term` | Sim | Sim | Sim |
| `myForm2` / `term2` | **Não** | Sim | Sim (pill mobile) |
| `myForm2Desktop` / `term2Desktop` | **Não** | **Não** | **Sim** |
| `_csrf` | `{{ csrfToken }}` | Sim ambos forms | Presente (3 forms) |
| Placeholder busca | "Buscar produtos" | "O que deseja buscar?" | "Busque por produto, marca ou modelo" |

### 2.3 Eventos e funções inline

| Função / evento | Export | Git | Produção |
|-----------------|--------|-----|----------|
| `alterForm()` | Sim; **sem** `submit()` explícito | Sim; mesmo padrão | Sim |
| `alterForm2()` | **Não** | Sim; **sem** `.submit()` | Sim; **com** `.submit()` |
| `alterForm2Desktop()` | **Não** | **Não** | **Sim** |
| `headerV2FocusMobileSearch()` | **Não** | **Não** | **Sim** |
| `openSearch()` | Sim (`.search_link`) | Sim | Fallback only |
| `openNavMobile()` | Sim | Sim | Sim |
| `openSideNavOverlay(...)` | Conta + carrinho | + navbar account | Conta utility + carrinho |
| `openSideNavOverlayCartB2B()` | Condicional Alpine cart | Idem | (ver tema config) |
| `openFavoritesPanel()` | **Não** | **Não** | **Sim** |
| `sendWhatsPlugin()` | **Não** | Sim (header bar) | **Não** no header v2 (utility URL) |
| Enter → busca pill | **Não** | **Não** | `onkeydown` → `alterForm2()` |

### 2.4 Classes e seletores (CSS/JS)

| Classe / atributo | Export | Git | Produção |
|-------------------|--------|-----|----------|
| `header-v2`, `sda-header-v2` | **Não** | Sim | v2 sim, sda não |
| `header-utility*` | **Não** | **Não** | **Sim** |
| `header-v2-search-pill`, `mobile-strip`, `header-v2-actions` | **Não** | **Não** | **Sim** |
| `search-desktop`, `hide-lg`, `show-lg` | Parcial | Sim | Sim |
| `data-favorites-count` | **Não** | **Não** | **Sim** |
| `data-sda-utility-account` | **Não** | **Não** | **Sim** |
| `header-v2-nav-cat-img`, CTAs ambiente/diag | **Não** | Parcial | **Sim** |

### 2.5 Comportamento esperado (documental)

| Comportamento | Export (se publicado) | Git (se publicado) | Produção atual |
|---------------|----------------------|--------------------|----------------|
| Busca desktop barra | **Regressão** — só ícone overlay | POST `#myForm2` sem form desktop dedicado | POST `#myForm2Desktop` |
| Utility atendimento | **Regressão** | **Regressão** | Link WhatsApp + pedidos |
| Favoritos no header | **Regressão** | **Regressão** | Panel sidenav |
| Nav horizontal no topo | Layout antigo | Nav row moderna | Nav row v2 + mega |
| H1 em todas as páginas | **Sim** (sempre h1) | Só home (regra Git) | H1 no logo (home observada) |
| Compatível `header-v2.css` | **Baixa** — poucos hooks | **Alta** | **Alta** (CSS publicado) |

### 2.6 Dependências externas (inalteradas em qualquer cenário)

- `theme.js`: `openSearch`, `openNavMobile`, `openSideNavOverlay`
- `layout/theme.liquid`: `setupStore()`, sidenavs globais
- `favorites.js`: exige markup produção para `openFavoritesPanel`
- `mega-menu.js` + `#mega-menu-ar-template` no layout (não no export)
- `header-v2.css` / inline emergency na produção

---

## 3. Proposta mínima de reconciliação (para revisão — **não implementar**)

**Premissa corrigida:** a base de markup para paridade com a loja ao vivo **não** é o export operador nem o Git isolado; é o **`header.liquid` real do themeId 3** (ainda **não** recebido). Até lá, a proposta abaixo descreve o **merge alvo** entre **produção (HTML)** e **melhorias Git** após export válido.

### Fase A — Coleta (obrigatória antes de editar qualquer arquivo)

| # | Alteração proposta | Motivo |
|---|-------------------|--------|
| A-1 | Obter export themeId **3** validado (presença de `.header-utility`, `#myForm2Desktop` no fonte) | Export atual inválido |
| A-2 | Arquivar como `header-producao-theme3-YYYYMMDD.liquid` + SHA-256 | Imutabilidade |
| A-3 | Diff automático: produção vs Git vs export operador | Rastreabilidade |

### Fase B — Merge documental (após A-2 aprovado)

Trabalhar em **cópia** `header-reconciliado-DRAFT.liquid` (não substituir backups).

| # | Alteração | Origem | Motivo |
|---|-----------|--------|--------|
| B-1 | Manter integralmente blocos **produção-only**: `.header-utility`, `.header-v2-search` desktop, pill mobile, strip, actions, scripts `alterForm2Desktop` + `submit()` | HTML produção / export theme3 | Paridade funcional |
| B-2 | Incorporar lógica **`logoUseH1`** do Git | Git | SEO: H1 só na home |
| B-3 | Manter **`{{ csrfToken }}`** em **todos** os forms (3) | Git + contrato WDNA | POST busca |
| B-4 | Unificar placeholders para texto produção | Produção | UX consistente |
| B-5 | **Não** reintroduzir `navbar-center` nav do export operador | — | Regressão layout v2 |
| B-6 | **Não** publicar Git cru (sem utility / desktop form) | Auditoria | Regressão crítica |
| B-7 | **Não** remover `openFavoritesPanel` / badges | Produção | Favoritos |
| B-8 | Decidir `.top-content`: se ausente no export theme3, **omitir** ou manter oculto via CSS; se presente no export theme3, documentar vs `bannerTop` painel | §4 PREPARACAO | Evitar banner fantasma |
| B-9 | WhatsApp: **manter** utility link produção; **não** duplicar `sendWhatsPlugin` no bar se utility existir | HTML produção | Duplicidade |
| B-10 | Classe root: `header header-v2` (+ `sda-header-v2` opcional se CSS Git exigir) | Git CSS | Estilos tokens |
| B-11 | Menu mobile: preferir loop **completo** Git (sem `limit: 6` do export); preservar entradas hardcoded produção (Ambiente, Favoritos, Pedidos) se existirem no export theme3 | Diff theme3 | Paridade mobile |
| B-12 | Alpine carrinho B2B `@click="openSideNavOverlayCartB2B()"` | Export operador + Git | Config `buyAction.type == login"` |

### Fase C — CSS / layout (fora do Liquid, Opção A — só após aprovação)

| # | Alteração | Motivo |
|---|-----------|--------|
| C-1 | Mesclagem mínima `theme.liquid` preview (links `sda-tokens.css`, `header-v2.css`) | Opção A |
| C-2 | Não remover `#header-orange-inline-v5` até sign-off visual preview | Risco regressão |

### O que **não** fazer com o export operador atual

- **Não** usar como base de reconciliação com produção.  
- **Não** fazer upload no preview novo.  
- **Não** declarar paridade com `sitedoar.com.br`.

---

## 4. Matriz de reconciliação atualizada (coluna export operador)

Referência [`PREPARACAO_RECONCILIACAO_HEADER.md`](PREPARACAO_RECONCILIACAO_HEADER.md) §5 — status da coluna “Liquid publicado”:

| ID | Item | Export operador | Git | HTML prod | Proposta merge |
|----|------|-----------------|-----|-----------|----------------|
| R-01 | `.header-utility` | N | N | S | B-1 (theme3) |
| R-04 | `#myForm2Desktop` | N | N | S | B-1 |
| R-05 | Pill `#myForm2` | N | parcial | S | B-1 |
| R-07 | `alterForm2` + submit | N | parcial | S | B-1 |
| R-08 | `alterForm2Desktop` | N | N | S | B-1 |
| R-13 | Favoritos header | N | N | S | B-7 |
| R-20 | H1 condicional | N | S | parcial | B-2 |
| R-25 | Nav em navbar-center | **S (export)** | N | N | **B-5 descartar** |

---

## 5. Testes

Permanecem **PENDENTE** / **BLOQUEADO** ([`AUDITORIA_HEADER_ENGENHARIA_SENIOR.md`](AUDITORIA_HEADER_ENGENHARIA_SENIOR.md) T-01–T-16). Nenhum executado nesta rodada.

---

## 6. Veredito desta fase

| Pergunta | Resposta |
|----------|----------|
| Reconciliação documental **concluída**? | **Não** |
| Diff export vs Git vs HTML **documentado**? | **Sim** |
| Proposta mínima para revisão **pronta**? | **Sim** (§3), condicionada a export theme3 válido |
| Pronto para **implementação**? | **Não** — aguarda export correto + sua aprovação explícita |

**Próximo passo operador:** re-export `sections/header.liquid` do tema **3** (validar strings `header-utility` e `myForm2Desktop` no arquivo) + informar URL/themeId do preview.
