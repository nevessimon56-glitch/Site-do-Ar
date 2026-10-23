# Registro central de continuidade — Site do ar (Novo)

**Projeto:** Site do ar (Novo) · **Tema WDNA ID:** 3 · **Base de referência:** v1.14.36  
**Export original (baseline código):** `/workspace/site-do-ar-(novo)-20260701185346601.zip` (jul/2026 — **não** equivale automaticamente ao publicado hoje na WDNA)  
**Documento criado:** 23 out 2026 (America/Sao_Paulo) — primeira versão  
**Auditorias relacionadas:** `docs/wdna/AUDITORIA-ARQUIVOS-CONSOLIDACAO.md` (mantido intacto; este registro **não** substitui relatórios A–H completos da sessão)

---

## A. Estado atual

| Campo | Valor |
|--------|--------|
| **Situação** | Evolução segura: correções pontuais + modernização visual planejada; modelo 9 corrigido **localmente** (branch PR #44); validação WDNA **não confirmada** pelo usuário |
| **Branch Git (modelo 9)** | `cursor/model-9-timer-consumer-b192` (PR #44 no GitHub) |
| **Branch local ativa (workspace)** | `cursor/model-9-timer-consumer-b192` |
| **Arquivos centrais** | `sections/showcase-model-9.liquid`, `sections/showcase-model-product.liquid`, `sections/showcase-model-product-promotion.liquid`, `assets/theme-custom.css`, `layout/theme.liquid`, `docs/wdna/*` |
| **Última alteração confirmada (código)** | Commits `570e79e`, `c209d8b`, `b7496bb` em `sections/showcase-model-9.liquid` — **23 out 2026**, ~14:42–14:46 (America/Sao_Paulo), via histórico Git |
| **Alterações locais não commitadas** | `assets/theme-custom.css` (+1182 linhas vs HEAD), `sections/product-content.liquid`; untracked: `sections/product-reviews.liquid`, zips de import na raiz — **preservar** |
| **Publicação WDNA** | **Não confirmada** para modelo 9 (PR #44). Demais arquivos: **desconhecido** sem evidência do usuário |
| **Última investigação** | `assets/theme-all.css` — achados ALL-CSS-001..009 **confirmados no arquivo** (23 out 2026); **correção não aplicada** |
| **Último teste confirmado** | **Análise estática** ZIP×workspace; **TST-STATIC-003** `theme-all.css`; **Teste WDNA modelo 9:** **0/7 — bloqueado**: cenário de promoção de teste **não criado** (informado 23 out 2026) |
| **Próxima ação autorizada (processo)** | **Código:** correção `theme-all.css` **somente após** autorização explícita pós-diagnóstico ALL-CSS. **Modelo 9:** smoke WDNA **pendente** até publicação confirmada **e** cenário promo de teste. |

---

## B. Histórico cronológico

| Data | Componente | Problema / decisão | Alteração ou decisão | Motivo | Validação | WDNA publicado? | Fonte |
|------|------------|-------------------|----------------------|--------|-----------|-----------------|-------|
| data não confirmada (thread anterior) | Vários arquivos | Auditorias A–H coladas no chat | Achados registrados em conversa; parcialmente em `AUDITORIA-ARQUIVOS-CONSOLIDACAO.md` (~18 itens) | Referência técnica read-only | Análise estática | N/C | Sessão + MD |
| 23 out 2026 | `sections/showcase-model-9.liquid` | SHMOD9-VER-001..006: N+1 timers, expiração por `days`, rebuild em loop, título JS, gate `products` | PR #44: timer único, `distance <= 0`, lote + rebuild condicional, Alpine 2 bindings, lifecycle | Bug comprovado no código vs export | Análise estática + simulação Node (lógica tick); **WDNA pendente** | **Não confirmado** | Git `570e79e`–`b7496bb`, sessão |
| 23 out 2026 | `assets/theme.js` | — | **Decisão:** não alterar global `countdownTimer()` na 1ª implementação | Evitar regressão cross-theme | N/A | N/C | Decisão usuário + sessão |
| 23 out 2026 | `docs/wdna/AUDITORIA-ARQUIVOS-CONSOLIDACAO.md` | — | **Decisão:** não consolidar `SHMOD9-VER-*` no MD até 7/7 WDNA ou aceite de risco | Separar código de validação | N/A | N/A | Decisão usuário |
| 23 out 2026 | Baseline | Divergência export vs `main` vs workspace | **Decisão:** baseline de comparação = export ZIP jul/2026; `main` (card 130 lin) ≠ export (107 lin) | Preservar original auditado | Diff 70/84 iguais, 14 mod, 11 add | N/C | Análise agente |
| 23 out 2026 | Item 7 datas inválidas | Risco negócio | **Decisão:** não adotar opção B (ocultar por NaN) automaticamente; preferir impedir publicação na origem WDNA | Evitar esconder promo legítima | Pendente observação loja | N/C | Decisão usuário |
| 23 out 2026 | Prompt mestre evolução segura | Regras de preservação | Registro de restrições (seção E abaixo) | Continuidade do projeto | N/A | N/A | Instrução usuário |
| 23 out 2026 | `assets/theme-all.css` | ALL-CSS-001..009 | **Investigação read-only** concluída; duplicação + `{` não fechado **confirmados**; arquivo **idêntico ao export ZIP** | Prioridade auditoria | TST-STATIC-003 | N/C (presume-se igual export na loja) | Seção I + `AUDITORIA-ARQUIVOS-CONSOLIDACAO.md` §13 |
| 23 out 2026 | Modelo 9 WDNA | Validação 7 cenários | **Não concluída** — usuário: **sem cenário de promoção de teste** montado | Impossível smoke real | **Não executado** | N/C | Instrução usuário 23 out 2026 |

---

## C. Lista de pendências

### Modelo 9 (prioridade imediata — validação)

| ID | Descrição | Arquivo | Gravidade | Dependências | Situação | Próxima ação |
|----|-----------|---------|-----------|--------------|----------|--------------|
| PEN-M9-001 | Validar duas vitrines independentes | `sections/showcase-model-9.liquid` | Alta | Publicação WDNA do arquivo | **Aguardando teste WDNA** | Usuário: publicar (se ainda não) + observar loja (etapa 5 do roteiro) |
| PEN-M9-002 | 1º tick com todas promos vencidas — sem timer órfão | idem | Alta | Dados promo passado | **Aguardando teste WDNA** | Usuário: página só com vencidos |
| PEN-M9-003 | Expiração simultânea — lote, ≤1 rebuild | idem | Média | 2 produtos mesma data | **Aguardando teste WDNA** | Usuário: observar remoção no mesmo momento |
| PEN-M9-004 | Último produto — section oculta, sem erro slider | idem | Alta | — | **Aguardando teste WDNA** | Usuário: etapas 3–4 roteiro simples |
| PEN-M9-005 | Reinicialização (F5); remontagem parcial WDNA | idem | Média | Comportamento plataforma | **Parcial:** F5 sim; remontagem **não confirmável** sem DevTools | Usuário: hard refresh; anotar se contador congela |
| PEN-M9-006 | Autoplay + lazy após remoção slides | idem + tns | Média | Tiny Slider | **Aguardando teste WDNA** | Usuário: observar carrossel após expirar 1 slide |
| PEN-M9-007 | Data inválida — comportamento + regra negócio | idem | Média | Produto teste | **Aguardando teste WDNA** + decisão origem WDNA | Observar; documentar A/B/C (sessão) |
| PEN-M9-008 | Encerramento formal modelo 9 | idem | Processo | PEN-M9-001..007 | **Bloqueado** até 7/7 ou aceite escrito de risco 2,4,7 | Registrar resultados neste MD |
| PEN-M9-000 | Cenário de promoção de teste no admin WDNA | Backoffice / produtos | Alta | Datas `datePromotionEnd`, preço promo | **Pendente** (pré-requisito) | Criar 1–3 produtos promo ou vitrine dedicada **antes** do smoke |

### Código corrigido localmente — não equivale a “concluído”

| ID | Descrição | Situação |
|----|-----------|----------|
| PEN-M9-CODE | SHMOD9 timers, `distance <= 0`, lifecycle, clamp UI | **Corrigido localmente** (PR #44) — **Aguardando publicação + teste WDNA** |

### Auditoria consolidada (18 itens MD) — amostra prioritária

| ID | Descrição | Arquivo | Gravidade | Situação | Próxima ação |
|----|-----------|---------|-----------|----------|--------------|
| PEN-ALL-001 | ALL-CSS-001 — `@media` L15417 não fechado; ~L15426–30841 ≈ **2ª cópia** do bundle (~645 KiB → ~30890 lin) | `assets/theme-all.css` | **Crítica** | **Investigado; correção proposta, não aplicada** | Autorizar patch **estrutural mínimo** (seção I); validar desktop busca/PDP/vitrine |
| PEN-ALL-002 | ALL-CSS-002 — cauda L30872–30881 + `}` EOF depth +1 | idem | Alta | **Confirmado** | Remover bloco órfão + fechar `@media` L15417 com regras L30843–30861 |
| PEN-ALL-003 | ALL-CSS-003 — `.product-main:hover` L30864–30871 e duplicata L30884–30891 | idem | Alta | **Confirmado** (efeito pode ser neutralizado por `theme-custom.css` L679–681) | Decidir se remove duplicatas em `theme-all` ou mantém override custom |
| PEN-ALL-004 | ALL-CSS-004 — `*:focus { outline: none }` L49–51 | idem | Média | **Confirmado** | Correção a11y **separada** (focus-visible); risco teclado |
| PEN-ALL-005 | ALL-CSS-005 — 8× `@font-face` Akhand CDN (4+4 duplicados) | idem | Média | **Confirmado** | Remove duplicata com PEN-ALL-001; preload já em `theme.liquid` L116–117 |
| PEN-ALL-006 | ALL-CSS-006 — sem `prefers-reduced-motion` | idem | Média | **Confirmado** | Opcional; não acoplar à remoção da duplicação |
| PEN-ALL-007 | ALL-CSS-007 — 68× `!important` | idem | Média | **Confirmado** (contagem grep) | Reavaliar após remover bloco duplicado (cascade ≥992px) |
| PEN-ALL-008 | ALL-CSS-008 — `unicode-range: U+000-5FF` L4+ | idem | Baixa | **Confirmado** (possível typo `U+0000-05FF`) | Patch mínimo 4 linhas se autorizado |
| PEN-ALL-009 | ALL-CSS-009 — `.product-main` base L13357 e L28782 (dentro da duplicação) | idem | Informativa | **Confirmado** | Resolve com remoção da 2ª cópia |
| PEN-CUS-007 | CUS-CSS-007 oculta filtro categorias busca | `assets/theme-custom.css` | Alta | **Pendente** (+ diff local grande) | Decisão negócio antes de remover regra |
| PEN-THM-001 | THM-JS-001 race Notyf vs defer | `assets/theme.js` + `theme-defer.js` | Alta | **Pendente** (= ZIP) | Reproduzir na loja antes de patch |
| PEN-THM-004 | THM-JS-004 selectsCustom2 sidenav | `assets/theme.js` | Alta | **Pendente** | Reproduzir com `<select>` conta |
| PEN-PHV-001 | PHV-JS-001/002 touch + init idempotente | `assets/product-hover-image.js` | Alta | **Pendente** | Arquivo existe no WS; **layout não carrega** mega/hover no `theme.liquid` atual |
| PEN-MEGA-001 | Mega menu não integrado no layout ativo | `layout/theme.liquid`, `mega-menu-*` | Média | **Em análise** | Comparar com `docs/wdna/theme.liquid-ATUALIZADO-WDNA.liquid`; **não integrar** sem autorização |
| PEN-CMP-FAV | Compare/favorites/header-v2 auditados | vários | Alta | **Bloqueado no repo** (ausentes no workspace) | Confirmar manifest WDNA ao vivo |
| PEN-CARD-001 | Card vitrine: export 107 lin = WS; `main` 130 lin; auditoria “v4” pode ser WDNA | `sections/showcase-model-product.liquid` | Média | **Em análise** | Usuário confirmar o que está **publicado**; **não** substituir por ZIP/`main` sem autorização |

### Sessão A–H (não fully no MD)

| ID | Descrição | Situação |
|----|-----------|----------|
| PEN-AUD-001 | Relatórios A–H vitrines 1–8, busca (`SRFIL`, `SRCHORD`) | **Pendente** no código (= ZIP para arquivos não modificados); detalhe nos **transcripts** |
| PEN-AUD-002 | Consolidar SHMOD9-VER-* no MD auditoria | **Aguardando** critério encerramento M9 |

---

## D. Registro de testes

| ID | Tipo | Escopo | Resultado | Observação |
|----|------|--------|-----------|------------|
| TST-STATIC-001 | Análise estática | `showcase-model-9.liquid` pós-PR #44 | **Executado** | Contador visível + expiração + remoção documentados |
| TST-STATIC-002 | Análise estática | ZIP × workspace (84 arquivos) | **Executado** | 70 iguais, 14 mod, 11 add |
| TST-SIM-001 | Simulação Node | Lógica tick promo (sem DOM/tns) | **Executado** | Não substitui WDNA |
| TST-WDNA-001..007 | Teste loja | Modelo 9 checklist 7 cenários | **Não confirmado** | **0/7** informados pelo usuário |
| TST-WDNA-PUB | Publicação | Arquivos PR #44 na WDNA | **Não confirmado** | Não propor teste loja até publicação confirmada |
| TST-STATIC-003 | Análise estática | `assets/theme-all.css` ALL-CSS-001..009 | **Executado** 23 out 2026 | Arquivo = export ZIP; chaves `{`/`}` desbalanceadas (+1 EOF) |

**Regra:** hipótese ou código local **≠** teste WDNA aprovado.

---

## E. Decisões e restrições (vigentes)

1. **Preservar** funcionalidades, dados, regras comerciais e alterações locais (`theme-custom.css`, `product-content.liquid`).
2. **Baseline código original exportado:** `site-do-ar-(novo)-20260701185346601.zip` — WDNA ao vivo pode diferir.
3. **Modelo 9:** `theme.js` intacto na 1ª correção; encerramento só com 7/7 WDNA ou aceite de risco documentado.
4. **Não** importar/recriar pastas; **não** PowerShell; **não** restore/revert em massa; **não** substituir arquivos inteiros por ZIP/`main` sem comparação + autorização.
5. **Não** marcar correção concluída só porque existe no Git local.
6. **Não** testar na loja funcionalidades **não publicadas**.
7. **Cards:** não trocar `showcase-model-product.liquid` pela versão simplificada local sem comparar com **WDNA publicado** (usuário informou possível card personalizado).
8. **Mega-menu / hover:** não integrar automaticamente; verificar entrada no layout.
9. **theme-all.css:** não correção global sem plano de regressão.
10. **CUS-CSS-007:** não remover sem aprovação de negócio.
11. **Item 7 datas inválidas:** preferir validação na origem WDNA; não B automático.
12. **Documentação:** `AUDITORIA-ARQUIVOS-CONSOLIDACAO.md` permanece; este registro é **continuidade operacional**.

---

## F. Registro de publicação WDNA

*Incluir somente quando revisado localmente. Publicação e pós-validação dependem do usuário.*

| Arquivo | Motivo | Pronto localmente | Publicado WDNA | Validado pós-publicação |
|---------|--------|-------------------|----------------|-------------------------|
| `sections/showcase-model-9.liquid` | PR #44 — timers, expiração, lifecycle | **Sim** (branch `cursor/model-9-timer-consumer-b192`, commits até `b7496bb`) | **Não confirmado** | **Não** |
| `assets/theme-custom.css` | Evolução visual (diff local grande) | **Parcial** (não commitado) | **Não confirmado** | **Não** |
| `sections/product-content.liquid` | Ajustes PDP locais | **Parcial** (não commitado) | **Não confirmado** | **Não** |

**Demais arquivos:** sem evidência de alteração pendente de publicação além dos 14 modificados vs export (ver análise comparativa na sessão 23 out 2026).

---

## G. Priorização de correções (diagnóstico 23 out 2026)

**Ordem sugerida (sem executar código nesta etapa):**

1. **PEN-M9-*** — validação WDNA após publicação confirmada do modelo 9.
2. **PEN-CARD-001** — alinhar baseline do card com WDNA publicado (não com suposição).
3. **PEN-ALL-001..002** — correção estrutural `theme-all.css` (**diagnóstico pronto**, aguarda autorização); validar desktop após publicação WDNA.
4. **PEN-CUS-007** — decisão de negócio + busca.
5. **PEN-MEGA-001 / PEN-PHV-001** — integração layout, somente autorizada.
6. **PEN-THM-*** — bugs JS após reprodução na loja.

**Próxima correção mínima de código (proposta — aguardando autorização):**  
**Opção A (prioridade técnica):** patch estrutural em `assets/theme-all.css` conforme seção **I** (remover 2ª cópia L15426–30841, completar `@media` L15417, limpar cauda L30872–30891). **Opção B:** modelo 9 após **PEN-M9-000** (cenário promo teste) + publicação. **Não executar** sem autorização explícita.

---

## I. Investigação `assets/theme-all.css` (23 out 2026)

**Arquivo:** 30890 linhas, 645011 bytes. **Idêntico** ao export `site-do-ar-(novo)-20260701185346601.zip`.  
**Carga:** `layout/theme.liquid` → `theme-plugins.css` → **`theme-all.css`** → `theme-custom.css`.

**Resumo ALL-CSS (detalhe na resposta da sessão 23 out 2026):**

| ID | Linhas (evidência) | Tipo | Correção mínima sugerida |
|----|-------------------|------|---------------------------|
| 001 | L15417 `@media` aberto; L15426 reinício `@font-face` | **Erro estrutural / duplicação ~50% arquivo** | Remover L15426–30841; completar media com L30843–30861 |
| 002 | L30872–30881 indent órfão; brace balance +1 | **Erro estrutural** | Excluir com cauda duplicada; garantir `}` balanceado |
| 003 | L30864–30871, L30888–30891 | **Regra duplicada + UX** | Remover duplicatas; notar override `theme-custom.css` L679–681 |
| 004 | L49–51 | **Decisão de design / risco a11y** | `focus-visible` posterior, escopo separado |
| 005 | L1–35 + L15426+ | **Duplicação + dependência CDN** | Corrigida ao remover 2ª cópia |
| 006 | 0 matches `prefers-reduced-motion` | **Risco UX** | Opcional |
| 007 | 68× `!important` | **Risco cascata** | Recontar pós-fix 001 |
| 008 | L4 etc. `U+000-5FF` | **Possível typo** | `U+0000-05FF` se autorizado |
| 009 | L13357, L28782 `.product-main` | **Informativo (duplicação)** | Resolvido com 001 |

**Dependências:** `sections/search-filter.liquid` (`.form-group_potencia`, `.search-filter-body_potencia`); PDP `.product-main` + `sections/product-content.liquid`; vitrine/showcase na 1ª metade do arquivo; `theme-custom.css` mitiga hover PDP.

**Validação pós-correção (quando autorizada):** desktop ≥992px — busca/filtro potência, PDP, vitrine, checkout; comparar visual antes/depois captura WDNA.

---

## H. Referências cruzadas

- Auditoria consolidada (18 itens): `docs/wdna/AUDITORIA-ARQUIVOS-CONSOLIDACAO.md`
- Versões de referência Git: `docs/wdna/VERSAO-BONITA-ONTEM.md`, `VERSAO-SPEC-ICONES.md`
- Layout alternativo (não ativo no WS): `docs/wdna/theme.liquid-ATUALIZADO-WDNA.liquid`
- PR modelo 9: #44 — branch `cursor/model-9-timer-consumer-b192`

---

*Atualizar este registro a cada decisão, publicação WDNA ou resultado de teste informado pelo usuário. Não apagar entradas do histórico; acrescentar linhas com data quando conhecida.*
