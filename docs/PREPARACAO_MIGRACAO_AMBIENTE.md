# Preparação do ambiente — migração segura (Site do Ar)

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Decisões registradas:** WDNA; prioridade busca/navegação; frete confirmado; preview sem ativar produção; identidade azul/laranja/lilás; preservar tudo não confirmado.

---

## A.1 Estado do repositório (inspeção 28/out/2026)

| Item | Valor | Confiança |
|------|--------|-----------|
| Branch atual (agente) | `cursor/auditoria-tecnica-b192` | Alta |
| Working tree | **Limpo** (sem alterações pendentes além desta entrega doc) | Alta |
| Último commit | `8a31553` — docs Fase 1 (`AUDITORIA_TECNICA`, etc.) | Alta |
| Branch código SDA v3 | `cursor/card-remodel-b192` (base do v3 REWRITE) | Alta |
| `main` | Não contém necessariamente v3 nem docs novos | Média |

**Branches paralelas relevantes (contexto):** `cursor/audit-consolidacao-b192`, `cursor/conversion-*`, várias `cursor/fix-*-ed4c` — risco de merge divergente; **fonte única recomendada para preview:** `card-remodel-b192` ou `main` após merge acordado.

---

## A.2 PRs #49 e #50 — relação e dependências

| PR | Branch | Base | Conteúdo | CI |
|----|--------|------|----------|-----|
| [#49](https://github.com/nevessimon56-glitch/Site-do-Ar/pull/49) | `cursor/card-remodel-b192` | `main` | **SDA-ZERO-v3-REWRITE** — assets, layout, sections, corte CSS legado | Sem checks reportados |
| [#50](https://github.com/nevessimon56-glitch/Site-do-Ar/pull/50) | `cursor/auditoria-tecnica-b192` | `main` | **Mesmo conjunto de arquivos de tema que #49** + 5 docs Fase 1 em `docs/` | Sem checks reportados |

**Dependência:** `#50` foi criado a partir da linha de trabalho que **já inclui** o tema v3 (histórico compartilhado com `card-remodel-b192`). Os **+858** lines do #50 são documentação; o diff de tema é essencialmente o **#49**.

**Recomendação de governança:**

1. **Merge strategy:** aprovar tema via **#49** (ou merge `card-remodel` → `main`); manter **#50** (ou commits doc) separado ou empilhar docs após merge do tema.
2. **Pacote WDNA:** gerar zip a partir da **mesma SHA** aprovada (`docs/wdna/pacote-sda/tema-sda-ultimo.zip` — validar regen pós-merge).
3. **Não misturar** branches `fix-*-ed4c` no preview sem diff review — podem reintroduzir CSS conflitante.

---

## A.3 Tema ativo × preview × Git (SDA-ZERO-v3-REWRITE)

| Camada | Identificação | Evidência 28/out/2026 |
|--------|---------------|------------------------|
| **Produção** (`sitedoar.com.br`) | Tema WDNA **themeId 3** (CDN `.../themes/3/assets/`) | curl home/PDP |
| **Git v3** | Comentário HTML `SDA-ZERO-v3-REWRITE`; ordem `sda-tokens` → … → `sda-card` | `layout/theme.liquid` |
| **Produção vs v3** | **Diverge** — produção usa `showcase-product-card.css`, inline `#header-orange-inline-v5`, cards `v4-card-remodel`; **sem** `sda-tokens`/`sda-card` no head | curl |
| **Preview WDNA** | **Não acessível** neste ambiente — usuário deve duplicar tema ativo | Limitação |

**Relação lógica:**

```
[Tema ativo produção]  ← loja faturando (estado v4 + inline)
        ↓ duplicar (painel)
[Tema preview clone]   ← alvo upload pacote v3 (não ativar)
        ↑
[Git PR #49 / card-remodel-b192] ← fonte desejada pós-aprovação busca/nav
```

---

## A.4 O que **não** foi feito (conforme instrução)

- Nenhum arquivo funcional sobrescrito ou descartado.
- Nenhuma publicação WDNA / ativação de tema.
- Nenhuma implementação de busca/nav ou avaliações.

---

## A.5 Pré-requisitos dependentes do painel WDNA

| # | Pré-requisito | Por quê | Responsável |
|---|---------------|---------|-------------|
| P1 | Duplicar tema ativo → **Preview SDA v3** | Isolamento | Usuário |
| P2 | URL de preview compartilhável (não indexar se possível) | Testes | Usuário |
| P3 | Confirmar **nome/ID** do tema ativo e do clone | Baseline vs alvo | Usuário |
| P4 | Manter tema ativo publicado até smoke OK | Rollback | Usuário |
| P5 | Sandbox checkout / pedido teste (fase posterior) | Regressão | Usuário + WDNA |
| P6 | Export opcional: `sections/product-reviews.liquid` do tema ativo | Arquivo **ausente no Git** | Usuário (editor WDNA) |
| P7 | Confirmar apps/marketing scripts (GTM, Meta) | Regressão analytics | Usuário |
| P8 | Autorização escrita para upload no **preview only** | Governança | Usuário |

---

## A.6 Registro de alterações desta etapa

Somente documentação:

- `docs/PREPARACAO_MIGRACAO_AMBIENTE.md` (este arquivo)
- `docs/PLANO_BUSCA_NAVEGACAO.md`
- `docs/CHECKLIST_VALIDACAO_PREVIEW.md`
- `docs/AUDITORIA_AVALIACOES_PRODUTO.md`
- Atualização `docs/PLANO_DE_MIGRACAO.md`
