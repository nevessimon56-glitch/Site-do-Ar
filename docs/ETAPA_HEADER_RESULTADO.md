# Etapa Header (Opção A) — resultado da execução

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Autorização:** Opção A aprovada — preview only, sem ativar produção.

---

## 1. Bloqueio operacional (condição 1 e 10)

| Pré-requisito | Status |
|---------------|--------|
| **URL do tema preview WDNA** | **Não informada** — agente **sem acesso** ao painel WDNA |
| **ID/nome do tema duplicado** | **Não informado** |
| Upload no editor WDNA | **Não executado** (conforme instrução: aguardar URL) |
| Testes no preview | **Não executados** — dependem do upload |

**Conclusão:** implementação **pausada** até você enviar a **URL de visualização do tema preview** (link “Visualizar” do tema duplicado, não o domínio `sitedoar.com.br` ativo).

---

## 2. O que foi preparado (sem alterar produção)

| Entrega | Local |
|---------|--------|
| Pacote Opção A (3 arquivos + instruções) | `docs/wdna/etapa-header-opcao-a/` |
| Mesclagem `theme.liquid` (passo a passo) | `docs/wdna/etapa-header-opcao-a/MESCLAGEM-THEME-LIQUID.md` |
| Análise remoção inline | Mesmo doc § Passo 2 |
| Plano / critérios | `docs/PLANO_ETAPA_HEADER.md` |

**Arquivos prontos para colar no preview (SHA inalterado):**

- `docs/wdna/etapa-header-opcao-a/assets/sda-tokens.css`
- `docs/wdna/etapa-header-opcao-a/assets/header-v2.css`
- `docs/wdna/etapa-header-opcao-a/sections/header.liquid`

**Não alterados no repositório raiz do tema:** `layout/theme.liquid` de produção/preview (mesclagem manual no painel). O `layout/theme.liquid` na raiz do Git continua v3 completo — **não** usar para Opção A.

---

## 3. Mesclagem inline — revisão (condição 5)

O `#header-orange-inline-v5` na **produção** inclui:

1. Hotfix comparador + ocultar `.showcase-card-btu`
2. Estilos emergency header (SVG, fundo)
3. Carrinho/conta laranja/azul

Com Opção A:

- **`header-v2.css`** cobre header + badge laranja + SVG utility (~L1458+).
- **`product-compare.css`** (já no clone, **não substituído**) cobre compare JSON + `.showcase-card-btu`.

**Recomendação:** remover o inline **inteiro** após upload de `header-v2.css`, mantendo `product-compare.css` linkado. Validar **HC1** (cards) e comparador na vitrine; se regressão → rollback layout e escalar.

---

## 4. Backup (condição 2) — procedimento para você no preview

Antes do upload, no editor WDNA do **tema preview**:

1. Copiar texto completo → salvar localmente como `backup-preview-theme.liquid`, `backup-preview-header.liquid`, `backup-preview-header-v2.css`.
2. Anotar bytes ou SHA (opcional): `wc -c` / `sha256sum` nos arquivos locais.

O agente **não** pode executar backup remoto sem URL/acesso.

---

## 5. Resultado dos testes (condição 6–8)

Checklist: `docs/CHECKLIST_ETAPA_HEADER.md`

| Grupo | Resultado | Motivo |
|-------|-----------|--------|
| HB1–HB5 (busca header) | **NT** | Preview indisponível |
| HN1–HN7 (nav/mega/dock) | **NT** | Idem |
| HV1–HV5 (identidade) | **NT** | Idem |
| HR1–HR4 (rede) | **NT** | Idem |
| HA1 (a11y) | **NT** | Idem |
| HF1 (frete PDP) | **NT** | Idem |
| HC1 (cards inalterados) | **NT** | Idem |

| Gate etapa | Status |
|------------|--------|
| Header aprovado? | **Não** — nenhum teste com evidência |
| Product Card | **Aguardando** aprovação pós-Header |

**Baseline produção (somente leitura, 28/out):** home carrega `header-v2` + inline + mega-menu; **não** é validação do preview pós-mudança.

---

## 6. Arquivos que **seriam** alterados no preview (quando URL existir)

| Path | Ação |
|------|------|
| `assets/sda-tokens.css` | Criar/substituir |
| `assets/header-v2.css` | Substituir |
| `sections/header.liquid` | Substituir |
| `layout/theme.liquid` | Mesclar (tokens + remover inline § MESCLAGEM) |

**Intocados:** mega-menu.*, card, PDP, theme.js, checkout, compare/favorites/avaliações.

---

## 7. Rollback

Restaurar os 4 backups no tema **preview**. Tema **ativo** da loja não deve ser modificado nesta etapa.

---

## 8. Limitações

- Sem painel WDNA: upload, backup remoto e testes E2E no preview impossíveis neste ambiente.
- Testes automatizados de tema Liquid inexistentes no repo.
- Validação final depende de humano no link preview + checklist com screenshots/HAR.

---

## 9. Próximo passo solicitado

Envie **uma mensagem** com:

1. **URL completa** do tema preview (visualização WDNA).  
2. **Nome/ID** do tema duplicado (opcional mas útil).  
3. Confirmação de que fez **backup** dos 4 arquivos no preview (ou peça para repetirmos o roteiro).

Com a URL, o agente pode:

- Executar smoke **somente contra o preview** (curl/browser) **após** você confirmar que já fez o upload, **ou**
- Guiar passo a passo upload + mesclagem e então registrar evidências no checklist.

**Não iniciar Etapa Product Card** até Header Go com evidências.
