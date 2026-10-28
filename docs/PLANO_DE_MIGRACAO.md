# Plano de migração e reescrita segura — Site do Ar

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Status:** Proposta — **aguardando aprovação** antes de implementação (Fases 3+ da missão).  
**Princípio:** incremental, verificável, reversível; **sem publish automático em produção**.

**Decisões atualizadas (28/out):** plataforma WDNA; modernizar camada SDA; **prioridade inicial busca/categorias/navegação**; **frete confirmado** (regressão obrigatória); validação só em **tema preview**; identidade azul/laranja + lilás acento; **preservar** funcionalidades não confirmadas.

**Documentos desta etapa (preparação, sem código funcional):**

| Documento | Conteúdo |
|-----------|----------|
| [PREPARACAO_MIGRACAO_AMBIENTE.md](./PREPARACAO_MIGRACAO_AMBIENTE.md) | Repo, PRs #49/#50, tema ativo vs preview |
| [PLANO_BUSCA_NAVEGACAO.md](./PLANO_BUSCA_NAVEGACAO.md) | Diagnóstico busca/nav, etapas E0–E7, arquivos |
| [CHECKLIST_VALIDACAO_PREVIEW.md](./CHECKLIST_VALIDACAO_PREVIEW.md) | Matriz AP/RE/BL/NT com evidências |
| [AUDITORIA_AVALIACOES_PRODUTO.md](./AUDITORIA_AVALIACOES_PRODUTO.md) | Reviews WDNA nativos — auditoria |

---

## 0. Linha de base (registrar antes de qualquer publish)

| Item | Ação | Responsável |
|------|------|-------------|
| Tema ativo WDNA | Anotar ID, nome, URL preview | Usuário |
| Snapshot HTML home/PDP/busca | Salvar ou hash CSS links | Eng |
| Carrinho teste | Conta sandbox | Usuário |
| `theme-all` bytes/SHA | `wc -c`; `sha256sum` | Eng |
| Marcador layout | Presença `SDA-ZERO-v3-REWRITE`, ordem CSS | Eng |
| Scripts painel | Export lista marketing | Usuário |

**Rollback WDNA:** duplicar tema antes do publish; manter tema atual **ativo** até smoke OK no clone.

---

## 1. Objetivo técnico alinhado ao negócio

1. Unificar preview (depois produção) com **SDA v3 REWRITE** (Git `cursor/card-remodel-b192` / PR #49).
2. **Primeiro módulo de validação:** busca, categorias, mega menu, header search, dock mobile (ver [PLANO_BUSCA_NAVEGACAO.md](./PLANO_BUSCA_NAVEGACAO.md)).
3. Eliminar CSS inline de header e dependência de `showcase-product-card.css` como dono visual.
4. Manter **100%** fluxos WDNA (carrinho, checkout, preços, **frete** `/ajax/shippings/calculator`).
5. Tokens de marca (`sda-tokens.css`): azul/laranja predominantes, lilás acento.
6. **Preservar** avaliações WDNA (`product-reviews` + API review) — ver auditoria dedicada.

---

## 2. Fases priorizadas (risco × impacto)

### Fase 0 — Governança (sem código)

- Aprovar este plano.
- Escolher branch fonte única (`main` após merge PR #49 ou `card-remodel-b192`).
- Congelar publishes manuais paralelos no painel.

**Critério de aceitação:** plano assinado; tema duplicado no WDNA.

### Fase 1 — Tema preview “SDA v3” (somente editor WDNA)

**Objetivo:** Ambiente idêntico ao pacote Git, **não ativar**.

| Ordem | Ação | Arquivos (MANIFEST v3) | Risco |
|-------|------|------------------------|-------|
| 1 | Criar/substituir assets SDA + tokens + `sda-card.css` | 15 assets listados em `pacote-sda/MANIFEST.txt` | Médio |
| 2 | Substituir `theme-all.css`, `theme-custom.css` do **repo corrigido** | 2 | Alto |
| 3 | Substituir `layout/theme.liquid` v3 | 1 | Alto |
| 4 | Criar sections faltantes §5 inventário | 12 | Médio |
| 5 | Substituir vitrine/PDP liquids mínimos | `showcase-model-product`, `product-content`, promo | Alto |

**Não fazer:** substituir `theme.js`, `theme-defer.js`, `theme-plugins.css`, checkout.

**Validação:** Ver §4 checklist; HTML deve conter `SDA-ZERO-v3-REWRITE` e **não** depender de `showcase-product-card.css` (stub opcional).

### Fase 2 — Smoke funcional (preview)

Usar **[CHECKLIST_VALIDACAO_PREVIEW.md](./CHECKLIST_VALIDACAO_PREVIEW.md)** — **prioridade seção 2–3 (nav/busca)** e **§6 frete**.

Executar checklist (marcar pass/fail com evidência):

1. **Busca/categorias/nav** (obrigatório primeiro): filtros, mega menu, dock, header search.
2. Home: vitrines, carrossel (secundário na mesma sessão).
3. PDP: preço, variação, **frete sidenav (confirmado)**, sticky mobile, compare.
4. Comparador: 3 produtos, limpar, z-index acima dock.
5. Favoritos: add/remove, sidenav.
6. Login/logout header.
7. Carrinho: add from vitrine + PDP.
8. Diagnóstico: página + popup (sessão limpa).
9. Checkout **sandbox:** 1 pedido — **obrigatório antes de ativar**.

**Critério de aceitação:** zero falhas críticas/altos; médios documentados.

### Fase 3 — Performance e qualidade (medir, não afirmar)

- Lighthouse mobile/desktop em preview (3 URLs).
- Registrar LCP, INP, CLS baseline vs produção.
- axe DevTools amostra (home, PDP, busca).

**Só então** considerar otimizações (ex.: reduzir inline D360).

### Fase 4 — Cutover produção

- Janela acordada; backup tema ativo.
- Ativar tema preview **ou** publish incremental se política WDNA exigir.
- Monitor 24–48h: taxa erro checkout, contato suporte.

**Rollback:** reativar tema anterior (1 clique WDNA).

### Fase 5 — Hardening pós-estabilização (repo)

- Extrair popup D360 para `assets/sda-diag360.css/js`.
- Remover fallback nav duplicado quando `mega-menu.js` confirmado 100%.
- Atualizar `MIGRACAO-TEMA-NOVO.md` para `sda-card` + tokens.
- Opcional: Playwright smoke em CI (repo only).

---

## 3. Pacote de entrega recomendado

| Artefato | Local |
|----------|--------|
| Zip WDNA | `docs/wdna/pacote-sda/tema-sda-ultimo.zip` |
| Lista paths | `docs/wdna/pacote-sda/MANIFEST.txt` |
| Script cópia | `docs/wdna/pacote-sda/copiar-para-tema.sh` |

**Antes do zip:** regenerar a partir da branch aprovada se houver commits novos.

---

## 4. Checklist Network (pós-upload preview)

```
[ ] theme-all.css ~322KB (não ~645KB)
[ ] sda-tokens.css carregado
[ ] sda-card.css após product-page-v2.css
[ ] showcase-product-card.css ausente OU stub vazio
[ ] Sem <style id="header-orange-inline-v5"> no HTML
[ ] data-showcase-tpl="v5-zero" nos cards principais
[ ] product-compare.js + textarea JSON hidden
[ ] theme.js URL CDN responde 200
```

---

## 5. Critérios de aceitação globais (missão Fase 8)

1. Todas funcionalidades F01–F25 com status testado ou explicitamente pendente.
2. Fluxos críticos (carrinho, checkout sandbox) OK.
3. Sem regressões conhecidas bloqueantes.
4. Identidade azul/laranja/lilás via tokens — validação visual usuário.
5. Documentação `docs/AUDITORIA_*` atualizada pós-cutover.
6. Publish produção **somente** com autorização explícita.

---

## 6. O que **não** fazer na reescrita

- Migrar loja para outro stack sem estudo WDNA API.
- Reimplementar checkout/pagamento no tema.
- Remover vitrines/modelos sem desativar no painel.
- Publicar só CSS sem `theme.liquid` v3.
- Substituir `theme.js` do repo sem diff com CDN ativa.

---

## 7. Cronograma técnico (sem datas — ordem lógica)

```
Aprovação plano → Duplicar tema → Upload pacote v3 → Smoke preview
→ Lighthouse/axe → Checkout sandbox → Aprovação negócio → Ativar
→ Monitor → Fase 5 refino repo
```

---

## 8. Referências

- `docs/AUDITORIA_TECNICA.md`
- `docs/RISCOS_E_DEPENDENCIAS.md`
- `docs/wdna/MIGRACAO-TEMA-NOVO.md`
- `docs/wdna/pacote-sda/TEMA-NOVO-INVENTARIO.md`
