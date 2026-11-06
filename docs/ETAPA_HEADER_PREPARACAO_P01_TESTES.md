# Etapa Header — P-01, risco A1 e plano de testes (preparação 3)

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Base:** [`ETAPA_HEADER_PATCH_PROPOSTO.md`](ETAPA_HEADER_PATCH_PROPOSTO.md) revisão 2  
**Restrições desta entrega:** somente documentação; sem upload, sem alterar arquivos de implementação/tema.

---

## 1. Tarefa A — P-01 `layout/theme.liquid` tema 3

### 1.1 Verificação no repositório

| Artefato esperado | Presente? |
|-------------------|-----------|
| `docs/wdna/backups/layout-theme-producao-theme3-20261028.liquid` | **Não** |
| Metadados | Sim — [`layout-theme-producao-theme3-20261028.meta.md`](wdna/backups/layout-theme-producao-theme3-20261028.meta.md) |

**Conclusão:** **P-01 permanece BLOQUEADO.**

### 1.2 Procedimento manual (operador)

1. Painel WDNA → **Personalizar** → tema **publicado (themeId 3)** — não usar tema 11 nem layout Git do repo.  
2. **Editar código** → abrir **`layout/theme.liquid`** (caminho exato no painel).  
3. Selecionar **todo** o conteúdo (inclui `<!DOCTYPE>`, loops `scripts.*`, bloco `#header-orange-inline-v5`, scripts defer).  
4. Colar em arquivo local:  
   `docs/wdna/backups/layout-theme-producao-theme3-20261028.liquid`  
5. Calcular integridade:  
   `sha256sum docs/wdna/backups/layout-theme-producao-theme3-20261028.liquid`  
6. Registrar SHA em [`layout-theme-producao-theme3-20261028.meta.md`](wdna/backups/layout-theme-producao-theme3-20261028.meta.md) e commit (ou enviar ao agente).

**Critérios de completude (checklist mínimo no conteúdo colado):**

- [ ] `{{ content_for_header }}` ou equivalente WDNA  
- [ ] Links `theme-custom.css`, `mega-menu.css`, `header-v2.css`  
- [ ] Bloco `<style id="header-orange-inline-v5">` (se ainda existir na produção)  
- [ ] Scripts defer (`mega-menu.js`, `favorites.js`, …)  
- [ ] Fechamento `</html>`

**O que não fazer:** usar [`layout-theme-preview-theme11-20261028.liquid`](wdna/backups/layout-theme-preview-theme11-20261028.liquid), `layout/theme.liquid` do Git, ou reconstruir a partir de HTML view-source (HTML ≠ Liquid).

**Identidade com produção:** o SHA comprova **integridade do arquivo arquivado**, não byte-idêntico ao CDN/painel no momento do save futuro. Revalidar SHA imediatamente antes de qualquer upload.

---

## 2. Tarefa B — A1 isolado (`sda-tokens.css` + link no layout)

A1 **não** deve ser tratado como etapa de “só header”. Deve ser **desacoplado** do redesign cirúrgico de `header-v2.css` (ver §4).

### 2.1 Conteúdo de `sda-tokens.css` (Git SHA `4887f1bc…`)

| Trecho | Linhas | Efeito no DOM |
|--------|--------|---------------|
| `:root { … }` | 6–95 | Define **~60** custom properties globais |
| `:focus-visible` em cards/PDP/comparador | 97–107 | **Fora do header** — outline teclado |

**Não há** regras de layout header em A1; impacto visual passa por **variáveis consumidas por outros CSS já publicados**.

### 2.2 CSS de produção que **já consome** `--sda-*` (sem `sda-tokens.css` hoje)

Evidência: home arquivada [`production-home-2026-10-28.html`](wdna/backups/production-home-2026-10-28.html) carrega:

- `sda-conversion-redesign-*.css` — dezenas de `var(--sda-surface)`, `--sda-text`, `--sda-blue-deep`, `--sda-radius`, gradientes, etc.  
- `product-page-v2-*.css` — `var(--sda-navy)`, `--sda-bg`, `--sda-primary-gradient`, `--sda-pdp-sticky-h`, `--sda-mobile-dock-h` (com fallbacks hex).

**Comportamento atual (inferência técnica):** propriedades com `var(--sda-*)` **sem** token definido em `:root` tendem a ser **ignoradas** ou a usar apenas fallbacks onde existem (`var(--sda-navy, #1c2b4a)`).  
**Após A1:** as mesmas regras passam a resolver valores do arquivo tokens → **mudança visual provável em vitrines, banners de conversão, PDP e barras sticky mobile**, não limitada ao header.

### 2.3 Regras A1 com efeito **fora do header** (lista objetiva)

| ID | Regra / variável | Onde pode aparecer | Risco visual |
|----|------------------|-------------------|--------------|
| A1-V | Todas em `:root` | Qualquer selector downstream com `var(--sda-*)` | **Alto** em cards/home/PDP |
| A1-F1 | `.sda-card .showcase-product_buy.btn:focus-visible` | Vitrines | Médio (só teclado) |
| A1-F2 | `.sda-card .showcase-compare-btn:focus-visible` | Vitrines | Médio |
| A1-F3 | `.product-v2 .product-btn_buy:focus-visible` | PDP | Médio |
| A1-F4 | `.product-v2 .product-compare-btn:focus-visible` | PDP | Médio |
| A1-F5 | `.product-compare-bar__btn:focus-visible` | Comparador | Médio |
| A1-F6 | `.product-compare-panel__close:focus-visible` | Painel compare | Baixo |
| A1-F7 | `.showcase-favorite-btn:focus-visible` | Cards | Médio |

**Header:** produção usa `--hdr-*` em [`header-v2-producao-theme3-20261028.css`](wdna/backups/header-v2-producao-theme3-20261028.css) e `--sda-ink` **escopado** no inline de `header.liquid`. **A1 sozinho** não altera esses escopos; header **pode** permanecer igual salvo interação futura com patch cirúrgico que introduza `var(--sda-*)`.

### 2.4 Classificação de risco A1 (justificada)

| Nível | Justificativa |
|-------|---------------|
| **Médio–alto (site inteiro)** | Ativa tokens para CSS de conversão e PDP **já linkados** na home produção. |
| **Não “baixo risco”** | Mesmo sem mudar `header-v2.css`, cards e PDP podem mudar cor, raio, sombra, gradientes. |
| **Baixo incremental** | Foco `:focus-visible` (A1-F*) — só navegação por teclado. |

### 2.5 Validar A1 **sem** comprometer produção — opções reais

| Opção | Viabilidade | Notas |
|-------|-------------|-------|
| URL pública isolada tema 11 | **Não confirmada** | [`METADATA-PREVIEW.md`](wdna/backups/METADATA-PREVIEW.md): tráfego anônimo = themeId **3**. |
| Botão **Visualizar** tema 11 no painel | **Desconhecida** | Operador deve copiar URL; só então curl/HAR com `themes/11/`. **Não inventar URL.** |
| Janela em **themeId 3** com rollback | **Possível, arriscado** | Única via documentada hoje; exige P-01 + backups + aprovação escrita. |
| Teste local offline | **Não aplicável** | WDNA não serve tema completo a partir do repo sem deploy. |

**Estratégia recomendada (documental):**

1. **Não** recomendar upload A1 até **P-01 desbloqueado**.  
2. Se operador obtiver URL Visualizar com `themes/11/`: aplicar **somente** A1 lá, executar matriz **TA-*** (§3.1) + TH parcial.  
3. Se permanecer só theme 3: baseline screenshots **antes** (home, PLP, PDP, footer mobile) → upload A1 → TA-* + TH fumaça → rollback se delta não aceito.

### 2.6 Upload A1 — gate

| Pré-requisito | Status |
|---------------|--------|
| P-01 layout backup | **BLOQUEADO** |
| P-03 header-v2 backup | Atendido |
| P-02 header.liquid backup | Atendido (documental) |
| Estratégia teste §2.5 aceita por escrito | **PENDENTE** |
| Rollback §5 ensaiado ou aceito como hipótese | **PENDENTE** |

**Recomendação:** **não fazer upload A1** neste gate.

---

## 3. Plano de testes manual

Dois trilhos: **TA-*** (só A1 / tokens) e **TH-*** (header + fumaça site). **Todos PENDENTE** — nenhum APROVADO sem evidência.

### 3.1 Trilho TA — pós A1 (tokens + link layout)

| ID | Área | Procedimento | Evidência esperada | Status |
|----|------|--------------|-------------------|--------|
| TA-01 | View-source | Confirmar link `sda-tokens.css` após `theme-custom.css` | HTML snippet | **PENDENTE** |
| TA-02 | Home vitrine | Screenshot card (preço, CTA, badge) 1280 + 390 | PNG antes/depois | **PENDENTE** |
| TA-03 | Home conversão | Seções `.sda-card` / banners SDA | Screenshot | **PENDENTE** |
| TA-04 | PDP | Abrir produto; sticky/footer mobile padding | Screenshot 390 | **PENDENTE** |
| TA-05 | Teclado | Tab até “Comprar” e “Comparar” em card | Gravação ou screenshot focus ring | **PENDENTE** |
| TA-06 | Header paridade | Utility + logo + busca **sem** redesign CSS | Screenshot comparativo | **PENDENTE** |
| TA-07 | Console | Home + PDP load | Sem erro CSS/JS novo | Export console | **PENDENTE** |

### 3.2 Trilho TH — header e fumaça (após redesign cirúrgico **futuro**, ou baseline)

Reutiliza [`ETAPA_HEADER_ENTRADA_E_TESTES.md`](ETAPA_HEADER_ENTRADA_E_TESTES.md) §7 (TH-01–TH-20) e **adiciona**:

| ID | Área | Procedimento | Status |
|----|------|--------------|--------|
| TH-21 | Footer mobile | Com `body.has-mobile-catalog-dock`, scroll até footer; padding inferior | **PENDENTE** |
| TH-22 | Mobile dock | Ícones dock catalog; não sobrepor CTA footer | **PENDENTE** |
| TH-23 | PDP pós-A1 | Botão comprar + compare + frete (regressão) | **PENDENTE** |
| TH-24 | PLP | Grid cards + hover imagem | **PENDENTE** |

**Viewports obrigatórios:** 1280, 390; amostra 991 se alterar nav/dock.

### 3.3 Evidência mínima por teste

- Screenshot nomeado (`TH-01-desktop.png`) ou HAR export.  
- Data/hora America/Sao_Paulo + URL exata.  
- Anotação **PENDENTE** / **FALHA** / **OK** — **OK** só com anexo; agente não marca OK sem execução.

---

## 4. Tarefa C — patch cirúrgico `header-v2.css` (especificação)

Documento detalhado: [`PATCH-CIRURGICO-HEADER-V2-ESPEC.md`](wdna/etapa-header-opcao-a/PATCH-CIRURGICO-HEADER-V2-ESPEC.md).

**Princípios:** baseline = [`header-v2-producao-theme3-20261028.css`](wdna/backups/header-v2-producao-theme3-20261028.css); **preservar** bloco `mobile-catalog-dock` / `body.has-mobile-catalog-dock` (L1429–1462 prod); **não** remover inline `header.liquid`; **não** substituir monolito Git.

---

## 5. Critérios de aprovação (gate humano)

Aprovação escrita **só** se:

1. **P-01** desbloqueado (`.liquid` + SHA).  
2. Baseline TA/TH **PENDENTE** planejado com capturas **antes** registradas.  
3. Escopo assinado separadamente: **(a)** A1 tokens, **(b)** redesign cirúrgico CSS — nunca um único “upload geral”.  
4. Rollback por arquivo (§6) aceito.  
5. TH-17–TH-18, TH-21–TH-24 incluídos no plano de fumaça.

---

## 6. Rollback (referência rápida — hipóteses não medidas)

Ver §8 em [`ETAPA_HEADER_PATCH_PROPOSTO.md`](ETAPA_HEADER_PATCH_PROPOSTO.md). Confirmação pós-rollback:

| Arquivo | Prova no site |
|---------|---------------|
| Layout | Ausência link `sda-tokens`; presença `#header-orange-inline-v5` se existia |
| `sda-tokens.css` | 404 ou asset removido no painel |
| `header-v2.css` | SHA CDN = backup `188a64cf…` (novo hash após save, conteúdo igual) |

Tempo: **hipótese** 2–10 min até CDN; **medir na 1ª janela — PENDENTE**.

---

## 7. Bloqueios restantes (objetivo)

| # | Bloqueio |
|---|----------|
| B1 | P-01 — falta `layout-theme-producao-theme3-20261028.liquid` |
| B2 | URL Visualizar tema 11 não comprovada — A1 sem sandbox público |
| B3 | Aprovação escrita escopo A1 vs redesign |
| B4 | Baseline screenshots pré-upload não arquivadas |
| B5 | Patch cirúrgico CSS — especificação sem implementação/arquivo upload |
| B6 | Matriz TA/TH/TH-21–24 não executada |

---

## 8. Próximo passo manual

**Operador:** executar §1.2 e commitar `layout-theme-producao-theme3-20261028.liquid` + SHA.  
**Opcional:** obter URL **Visualizar** tema 11 e registrar em `METADATA-PREVIEW.md`.  
**Engenharia (após P-01):** revisar [`PATCH-CIRURGICO-HEADER-V2-ESPEC.md`](wdna/etapa-header-opcao-a/PATCH-CIRURGICO-HEADER-V2-ESPEC.md) e aprovar lista de seletores antes de qualquer edit no painel.
