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
| **Último teste confirmado** | **Análise estática** e comparação ZIP×workspace (23 out 2026). **Teste WDNA modelo 9:** 0/7 — **não informado pelo usuário** |
| **Próxima ação autorizada (processo)** | Smoke WDNA do modelo 9 **somente se** o usuário publicar `showcase-model-9.liquid` da branch PR #44; **sem** testes na loja para código não publicado. **Código:** aguardar diagnóstico + autorização explícita por etapa |

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

### Código corrigido localmente — não equivale a “concluído”

| ID | Descrição | Situação |
|----|-----------|----------|
| PEN-M9-CODE | SHMOD9 timers, `distance <= 0`, lifecycle, clamp UI | **Corrigido localmente** (PR #44) — **Aguardando publicação + teste WDNA** |

### Auditoria consolidada (18 itens MD) — amostra prioritária

| ID | Descrição | Arquivo | Gravidade | Situação | Próxima ação |
|----|-----------|---------|-----------|----------|--------------|
| PEN-ALL-001 | ALL-CSS-001 duplicação @992px + cauda sintática | `assets/theme-all.css` | **Crítica** | **Pendente** (= export ZIP) | Análise de escopo mínimo **autorizada**; correção **não** autorizada em lote |
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
3. **PEN-ALL-001** — crítico CSS; exige plano mínimo antes de editar.
4. **PEN-CUS-007** — decisão de negócio + busca.
5. **PEN-MEGA-001 / PEN-PHV-001** — integração layout, somente autorizada.
6. **PEN-THM-*** — bugs JS após reprodução na loja.

**Próxima correção mínima de código (proposta — aguardando autorização):**  
**Nenhuma**, até: (a) resultados WDNA modelo 9 **ou** (b) autorização explícita em outro PEN com escopo fechado.

---

## H. Referências cruzadas

- Auditoria consolidada (18 itens): `docs/wdna/AUDITORIA-ARQUIVOS-CONSOLIDACAO.md`
- Versões de referência Git: `docs/wdna/VERSAO-BONITA-ONTEM.md`, `VERSAO-SPEC-ICONES.md`
- Layout alternativo (não ativo no WS): `docs/wdna/theme.liquid-ATUALIZADO-WDNA.liquid`
- PR modelo 9: #44 — branch `cursor/model-9-timer-consumer-b192`

---

*Atualizar este registro a cada decisão, publicação WDNA ou resultado de teste informado pelo usuário. Não apagar entradas do histórico; acrescentar linhas com data quando conhecida.*
