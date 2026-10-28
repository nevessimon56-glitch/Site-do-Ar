# Riscos e dependências — Site do Ar

**Data:** 28 out 2026 (America/Sao_Paulo)

---

## 1. Dependência arquitetural central: WDNA

| Aspecto | Implicação | Confiança |
|---------|------------|-----------|
| Backend fechado | Sem acesso direto a DB, fila de pedidos, antifraude | Alta |
| Liquid + objetos globais | Toda página depende de contratos WDNA (`product`, `cart`, …) | Alta |
| StoreSDK `/ajax/*` | Login, carrinho, frete — **obrigatório** manter compatibilidade | Alta |
| CDN `salescdn.net` | Assets versionados por hash no ar | Alta |
| Painel scripts | Pixels/GTM injetados fora do Git | Alta |
| Checkout templates | Fluxo pagamento controlado pela plataforma | Alta |
| Atualizações base theme | `baseThemeVersion` v1.14.36 — merges futuros WDNA podem conflitar | Média |

---

## 2. Classificação A / B / C / D / E (missão Fase 2)

### A — Código personalizado que podemos alterar (com validação)

- `layout/theme.liquid` (ordem assets, renders SDA, popup D360)
- Assets SDA: `sda-*`, `mega-menu.*`, `header-v2.css`, `product-compare.*`, `favorites.*`, `product-page-v2.css`, …
- Sections SDA listadas no `MANIFEST.txt`
- `sections/showcase-model-product.liquid`, `product-content.liquid` (custom SDA)
- `assets/theme-custom.css` (identidade, PIX, ajustes escopados)
- `assets/theme-all.css` **no repo corrigido** — alto impacto, exige smoke amplo

### B — Código gerenciado pela plataforma (preservar salvo orientação WDNA)

- `assets/theme.js`, `assets/theme-defer.js`
- `assets/theme-plugins.css`
- Templates e sections `checkout-*`
- `config.json` (config painel — manter do tema ativo)
- Lógica de preço/estoque/frete dentro de `theme.js` e Liquid WDNA padrão
- `scripts.main` e endpoints não documentados no repo

### C — Integrações externas a manter

- CDN imagens/fontes (`salescdn.net`)
- Facebook Pixel / Google Analytics — **via painel** + hooks em `product-content` / `search`
- Gateway pagamento (checkout WDNA) — **não tocado**
- Diagnóstico 360 (página institucional + possível iframe externo — conteúdo em `diagnostico-360.liquid` **não reauditado linha a linha**)

### D — Funcionalidade não totalmente confirmada no checkout atual

| Item | Status | Ação |
|------|--------|------|
| `product-reviews.liquid` | No export base, presença no repo **não listada** em theme.json atualizado | Confirmar se loja usa reviews |
| Compra junto / kit / group purchase | Sections existem | Smoke PDP |
| Calculadora solar | Assets grandes | Smoke página dedicada |
| Wallet / customer-wallet | Template no export histórico | Confirmar no painel |
| Cupons | Provável backend WDNA | Teste checkout preview |
| Boleto/Pix parcelado | Regras gateway | Teste preview |

### E — Depende de acesso/permissão adicional

- Lista exata de scripts em **Marketing → Scripts** no painel WDNA
- Qual tema está **ativo** vs rascunho
- Logs de erro checkout / webhook ERP
- Documentação oficial WDNA API (versão theme engine)
- Credenciais ambiente **staging/preview** dedicado
- SLA e processo de rollback WDNA

---

## 3. Matriz de riscos (reescrever / migrar)

| ID | Risco | Criticidade | Probabilidade | Impacto comercial | Mitigação |
|----|-------|-------------|---------------|-------------------|-----------|
| R-01 | Publicação **parcial** (só CSS, layout antigo) | **Crítico** | Alta | Visual quebrado, compare JSON visível | Pacote MANIFEST completo; smoke Network |
| R-02 | Substituir `theme.js` desatualizado | **Crítico** | Média | Carrinho/vitrine quebrados | Manter JS do tema WDNA ativo |
| R-03 | Drift Git vs produção | **Alto** | Alta | Retrabalho, regressões “fantasma” | Baseline HTML marker; tema preview |
| R-04 | CSS inline + folhas duplicadas | **Alto** | Alta | Impossível auditar cascata | v3 REWRITE + banir inline header |
| R-05 | Checkout alterado sem preview | **Crítico** | Baixa se seguir plano | Perda de vendas | Não tocar checkout fase 1–N sem QA |
| R-06 | Comparador só `localStorage` | **Médio** | Média | UX multi-device | Documentar limitação; futuro sync opcional |
| R-07 | Sem testes automatizados | **Alto** | Certa | Regressões silenciosas | Checklist manual + E2E futuro |
| R-08 | `theme-all` corrompido republicado | **Crítico** | Baixa pós-fix | CSS global quebrado | SHA256 no checklist; nunca zip 645KB |
| R-09 | Múltiplas branches PR abertas | **Médio** | Alta | Merge errado | Consolidar linha `card-remodel` ou main |
| R-10 | Performance (JS sync head) | **Médio** | Alta | SEO/conversão | Negociar com WDNA; defer seletivo (risco) |
| R-11 | Acessibilidade mega menu/dock | **Médio** | Média | Reclamações, legal | Audit axe em preview |
| R-12 | Scripts painel desconhecidos | **Médio** | Média | Duplicidade pixel | Inventário painel |

---

## 4. Dependências ocultas identificadas

1. **`window.__SDA_HOVER_V2__`** — setado em `mega-menu.js`; desliga hover legado (`product-hover-image.js`).
2. **`window.initSdaMobileNavStrip` / `initSdaNavFixedTop`** — definidos inline se JS não publicado.
3. **Tiny Slider (tns)** — carrosséis vitrine via `theme.js` (confiança **média**, padrão WDNA).
4. **Alpine events** — `change-customer-login.window`, etc.
5. **Afiliado** — query params → `localStorage` (`seller`, `linkSeller`, `ref`).
6. **Popup D360** — `sessionStorage` + `localStorage` dismiss keys.

---

## 5. Viabilidade de reescrita (sem migrar de plataforma)

| Abordagem | Viável? | Risco | Evidência |
|-----------|---------|-------|-----------|
| Reorganizar só camada visual (CSS/sections SDA) | **Sim** | Médio | v3 REWRITE no Git |
| Substituir checkout/custom backend | **Não** sem WDNA | Crítico | Arquitetura SaaS |
| Headless storefront | **Não** avaliado com API pública | — | Fora escopo; exigiria doc WDNA |
| Tema paralelo + cutover | **Sim** | Médio | Prática documentada em `MIGRACAO-TEMA-NOVO.md` |
| Reescrita “do zero” ignorando `theme.js` | **Não** recomendado | Crítico | Dependências carrinho |

**Não recomendamos** migrar para outra plataforma nesta fase: custo, replatform de catálogo/pedidos e risco comercial superam benefício sem mapa de APIs WDNA.

---

## 6. Segurança e compliance (dependências)

- **PCI:** delegado ao checkout WDNA (assumido — **confirmar com WDNA**).
- **LGPD:** cookies `check-cookie.liquid`; conteúdo política — **não auditado**.
- **Secrets:** nenhum token encontrado em arquivos tema analisados (confiança **média** — painel não visto).

---

## 7. Itens pendentes do usuário / WDNA

1. Confirmar **tema ativo** (ID/nome) e última data de publish.
2. Exportar lista de **scripts** marketing do painel.
3. Ambiente **preview** dedicado + autorização formal de publish.
4. Contato suporte WDNA: política de atualização `theme.js` vs tema custom.
5. Prioridade comercial: checkout > PDP > busca > home (para ordenar smoke).
6. Confirmar se **reviews**, **wallet**, **cupons** estão em uso real.

---

## 8. Referências

- `docs/AUDITORIA_TECNICA.md`
- `docs/PLANO_DE_MIGRACAO.md`
- `docs/wdna/pacote-sda/TEMA-NOVO-INVENTARIO.md`
