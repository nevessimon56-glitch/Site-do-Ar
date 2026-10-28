# Auditoria técnica — Site do Ar (WDNA + camada SDA)

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Escopo desta entrega:** Fase 1 (auditoria completa do material disponível) + início da Fase 2 (fronteiras WDNA). **Nenhum código funcional foi alterado.**  
**Repositório analisado:** `nevessimon56-glitch/Site-do-Ar`, branch de referência `cursor/card-remodel-b192` (SDA v3 REWRITE no Git).  
**Produção verificada (amostra):** `https://www.sitedoar.com.br/` — HTML/CSS via CDN em 28 out 2026 ~02:12 (UTC-3).  
**Confiança global:** alta para estrutura de tema e arquivos no Git; média para paridade Git ↔ produção; baixa para painel WDNA, backend e integrações configuradas só no admin.

---

## 1. Resumo executivo

O Site do Ar é um **e-commerce hospedado na WDNA**, renderizado server-side com **Liquid**, com camada de interatividade em **JavaScript monolítico** (`theme.js` ~296 KB, inclui **Alpine.js** embutido) e **StoreSDK** para chamadas `/ajax/*`. A customização “Site do Ar” (SDA) adiciona mega menu, header v2, comparador, favoritos, cards remodelados, PDP v2 e scripts de conversão — organizados no Git na linha **SDA-ZERO-v3-REWRITE** (tokens + um “dono” CSS por domínio).

**Produção e Git não estão alinhados:** a loja publicada ainda carrega `showcase-product-card.css`, CSS inline `#header-orange-inline-v5`, markup `data-showcase-tpl="v4-card-remodel"` e **não** expõe `sda-tokens.css` / `sda-card.css` nem o comentário `SDA-ZERO-v3-REWRITE`. Isso explica divergências visuais e de manutenção entre “o que está no ar” e “o que está no PR”.

**Principais riscos:** (1) substituir `theme.js` / checkout sem validação; (2) publicação parcial de assets; (3) CSS empilhado (inline + múltiplas folhas); (4) ausência de testes automatizados no repo; (5) dependência opaca de scripts injetados via `scripts.header` / `scripts.content` no painel WDNA.

---

## 2. Metodologia e limitações

| Fonte | O que foi feito |
|--------|------------------|
| Árvore do repo | Contagem de assets, sections, templates; leitura de `layout/theme.liquid`, `theme.json`, `config.json` (amostra) |
| Documentação existente | `docs/wdna/*`, especialmente `FUNCIONALIDADES-E-SEPARACAO.md`, `TEMA-NOVO-INVENTARIO.md`, `MIGRACAO-TEMA-NOVO.md` |
| Produção | `curl` na home: ordem de CSS, marcadores, markup de cards |
| Não disponível neste ambiente | Painel WDNA autenticado, pedidos reais, gateway de pagamento, credenciais, GA/GTM IDs ativos, Core Web Vitals medidos, checkout E2E |

**Regra:** achados sem evidência direta são marcados com confiança **baixa** ou **média**.

---

## 3. Stack e versões (evidência)

| Item | Valor | Evidência | Confiança |
|------|--------|-----------|-----------|
| Motor de tema | Liquid (`theme.json`: `"engine": "liquid"`) | `theme.json` | Alta |
| Tema base WDNA | `baseThemeVersion`: **v1.14.36**, `themeId`: 3 | `theme.json`, export jul/2026 | Alta |
| Frontend interativo | Alpine (bundle em `theme.js`), sidenavs, carrinho | `theme.js`, `body x-data="setupStore()"` | Alta |
| API loja | `StoreSDK.request` → `/ajax/login`, `/ajax/logout`, `/ajax/customer`, etc. | `theme.js`, `theme.liquid` | Alta |
| CDN | `salescdn.net` (assets, fontes Akhand, imagens) | HTML produção + `theme.liquid` | Alta |
| Build local | **Inexistente** (sem `package.json`, sem CI de testes de tema) | busca no repo | Alta |
| TypeScript | Não usado no tema | — | Alta |

---

## 4. Estrutura de diretórios (tema vs repositório)

### 4.1 O que a WDNA espera (tema publicável)

```
assets/
layout/
sections/
templates/
config.json
```

Export de referência na raiz: `site-do-ar-(novo)-20260701185346601.zip` — **sem** pasta `snippets/`.

### 4.2 Repositório Git (adicional, não sobe para WDNA)

- `docs/` — auditorias, pacote `docs/wdna/pacote-sda/tema-sda-ultimo.zip`, backups
- `README.md`, `theme.json` (metadados de export)
- `snippets/` — vazia no checkout atual

### 4.3 Inventário quantitativo (branch `cursor/card-remodel-b192`)

| Pasta | Arquivos (aprox.) | Papel |
|-------|-------------------|--------|
| `assets/` | 23 | 8 core WDNA + 15 SDA/custom |
| `sections/` | 74 | Core + 14+ sections SDA |
| `templates/` | 12 | Rotas de página |
| `layout/` | 1 | `theme.liquid` (~581 linhas com popup Diagnóstico 360) |

---

## 5. Ponto de entrada e renderização

1. WDNA resolve template (`home.liquid`, `product.liquid`, …) → `{% layout 'layout/theme' %}`.
2. `layout/theme.liquid` monta `<head>` (SEO, CSRF, CSS em ordem fixa), injeta `scripts.header` / `scripts.content` do **painel**.
3. Body: sidenavs globais, mega menu template, painel comparador, `{% block content %}`, schema JSON-LD, `theme-defer.js`, scripts SDA defer, fallbacks inline de nav, popup D360.
4. Dados comerciais (preço, estoque, parcelas, frete) vêm de objetos Liquid (`product`, `cart`, `store`, …) e funções em `theme.js` — **não** recalculados nos JS SDA.

**Evidência ordem CSS (Git, v3):** comentário `SDA-ZERO-v3-REWRITE` em `layout/theme.liquid` L63–95.

---

## 6. Camada CSS — achados

### 6.1 Tamanho aproximado (bytes, Git)

| Arquivo | Bytes | Classificação |
|---------|-------|----------------|
| `theme-all.css` | ~322 KB | Core WDNA — **alto** impacto se corrompido |
| `theme.js` | ~296 KB | Core — bloqueante no `<head>` |
| `theme-solar-calculator.js` | ~482 KB | Página calculadora solar |
| `product-page-v2.css` | ~95 KB | SDA PDP |
| `mega-menu.css` | ~59 KB | SDA nav/dock |
| `sda-card.css` | ~25 KB | SDA cards (dono no Git) |
| `sda-tokens.css` | pequeno | Tokens de marca |

### 6.2 Identidade visual extraída (tokens Git — `sda-tokens.css`)

| Token / uso | Valor | Notas |
|-------------|-------|--------|
| Navy / marca | `#10294a`, nav `#1a6eb5` | Azul predominante |
| CTA compra | `#1976d2` → `#1565c0` | Primário |
| Desconto / laranja | `#f28c28`, `#ea580c` | Secundário comercial |
| Lilás (acento) | `#6d28d9` | Uso declarado como utilitário/diag |
| Pix / sucesso | `#16a05d` | Benefício Pix |
| Fonte SDA | Arial (tokens); Akhand preload WDNA | Dupla tipografia |

**Confiança:** alta para tokens no Git; média para produção (custom + inline podem sobrescrever).

### 6.3 Problemas CSS (classificados)

| ID | Criticidade | Problema | Evidência | Confiança |
|----|-------------|----------|-----------|-----------|
| CSS-001 | **Alto** | **Drift Git/produção:** produção usa `showcase-product-card.css`; Git v3 usa `sda-card.css` e depreca stub | curl produção 28/out; `showcase-product-card.css` L1–4 | Alta |
| CSS-002 | **Alto** | **Inline crítico em produção:** `<style id="header-orange-inline-v5">` no layout publicado | curl produção | Alta |
| CSS-003 | **Médio** | Popup D360: CSS+JS **inline** grande em `theme.liquid` (manutenção difícil) | `theme.liquid` L400+ | Alta |
| CSS-004 | **Médio** | Fallback nav ~120 linhas inline duplicando `mega-menu.js` | `theme.liquid` L179–299 | Alta |
| CSS-005 | **Crítico** (histórico) | Export zip antigo `theme-all.css` ~645 KB com braces desbalanceados | `MIGRACAO-TEMA-NOVO.md`, `REGISTRO-CENTRAL` | Alta (repo corrigido ~322 KB) |
| CSS-006 | **Médio** | Muitas folhas CSS sequenciais (12+ no ar) — custo de parse/render | HTML produção | Alta |
| CSS-007 | **Baixo** | `theme-custom.css` ~48 KB — risco de regras globais não escopadas | tamanho arquivo | Média |

---

## 7. JavaScript — achados

| ID | Criticidade | Problema | Evidência |
|----|-------------|----------|-----------|
| JS-001 | **Crítico** | `theme.js` síncrono no `<head>` — bloqueia parsing | `theme.liquid` L77–78 |
| JS-002 | **Alto** | Comparador/favoritos dependem de `localStorage` (v3) — sem sync server | `product-compare.js`, docs |
| JS-003 | **Médio** | SDA scripts em `defer` — ordem correta vs `theme.js` Alpine | `theme.liquid` L174–178 |
| JS-004 | **Médio** | Analytics PDP: `gtag`, `fbq` se globais existirem | `product-content.liquid` ~787+ |
| JS-005 | **Baixo** | Parâmetros UTM seller/ref em `localStorage` | `theme.liquid` L145–168 |

**Não verificado:** versão exata de `theme.js` na CDN vs repo (hashes diferentes por cache bust).

---

## 8. SEO e dados estruturados

| Item | Status | Evidência | Confiança |
|------|--------|-----------|-----------|
| Title/description/keywords dinâmicos | Presente | `theme.liquid` L1–31 | Alta |
| Open Graph / Twitter | Presente | `theme.liquid` L100–114 | Alta |
| CSRF meta | Presente | L115 | Alta |
| JSON-LD WebSite + Store | Presente | `sections/theme-schema.liquid` | Alta |
| Product schema | Section dedicada | `sections/product-schema.liquid` | Alta (não revalidado JSON) |
| `robots.txt` | `Allow: /` | curl 28/out | Alta |
| Sitemap / canonical | **Não auditado** nesta sessão | — | Baixa |
| Core Web Vitals | **Não medido** | — | — |

---

## 9. Segurança (superfície tema)

| ID | Criticidade | Achado | Notas |
|----|-------------|--------|-------|
| SEC-001 | **Médio** | Liquid imprime `{{ script.code }}` do painel em head/body | XSS se admin comprometido — padrão WDNA |
| SEC-002 | **Médio** | Compare JSON em `<textarea hidden>` — mitiga exibição acidental | Boa prática SDA |
| SEC-003 | **Baixo** | Sem scanner de dependências (JS vendor minificado no repo) | Auditar via painel WDNA / processo manual |
| SEC-004 | **Info** | CSRF em forms header | `sections/header.liquid` |

**Não auditado:** headers HTTP, CSP, cookies de sessão, PCI checkout.

---

## 10. Performance (linha de base — não medida)

| Hipótese | Impacto | Confiança |
|----------|---------|-----------|
| 12 CSS + JS grande no critical path | LCP/INP negativos | Média (tamanhos conhecidos, sem Lighthouse) |
| Fontes Akhand preload (4) | Melhora FOUT; custo rede | Média |
| Imagens via CDN adaptativo | Positivo | Alta |
| Inline CSS/JS layout | Aumenta HTML TTFB weight | Alta |

**Ação futura:** Lighthouse em tema **preview** WDNA após pacote completo; comparar com produção.

---

## 11. Acessibilidade (amostra estática)

| Achado | Criticidade | Evidência |
|--------|-------------|-----------|
| Cards com `aria-label` em spec bar | Positivo | HTML produção |
| Botões favoritar/compare com estados | Parcial | markup produção |
| Popup D360 com `aria-label` fechar | Positivo | `theme.liquid` |
| Contraste nav azul/branco | Provável OK | CSS — **não medido** |
| Foco teclado mega menu / dock | **Não testado** | — |

---

## 12. Código duplicado e dívida técnica

| Área | Descrição | Criticidade |
|------|-----------|-------------|
| Histórico pre-v3 | Regras de card/header/compare repetidas em `mega-menu.css`, `sda-conversion`, inline | **Alto** (mitigado no Git v3, pode persistir no ar) |
| `theme.liquid` | Nav fallback + popup D360 + Alpine helpers | **Médio** |
| Docs vs realidade | `MIGRACAO-TEMA-NOVO.md` ainda cita `showcase-product-card` como dono | **Baixo** (doc drift) |
| Múltiplas branches/PRs ativos | Risco de merge conflitante | **Médio** |

---

## 13. Paridade produção × Git (28 out 2026)

| Indicador | Produção | Git (`card-remodel-b192`) |
|-----------|----------|---------------------------|
| Marcador layout | Sem `SDA-ZERO-v3-REWRITE` (amostra head) | Comentário presente |
| CSS card | `showcase-product-card-*.css` | `sda-card.css` |
| Tokens | Ausente | `sda-tokens.css` |
| Card template | `v4-card-remodel` | `v5-zero` |
| Inline header | `header-orange-inline-v5` | Removido na filosofia v3 (verificar diff publicado) |

**Confiança:** alta para itens observados via curl.

---

## 14. Matriz de criticidade (consolidada)

| Crítico | Alto | Médio | Baixo |
|---------|------|-------|-------|
| Substituir `theme.js`/checkout sem plano (negócio) | Drift Git/produção | CSS/JS inline em layout | Doc desatualizada |
| `theme-all` corrompido (histórico) | 12+ assets CSS | Popup D360 inline | UTM localStorage |
| | JS blocking head | Sem testes auto | |

---

## 15. Referências cruzadas

- Inventário funcional detalhado: `docs/INVENTARIO_FUNCIONALIDADES.md`
- Arquitetura: `docs/ARQUITETURA_ATUAL.md`
- WDNA / riscos: `docs/RISCOS_E_DEPENDENCIAS.md`
- Plano: `docs/PLANO_DE_MIGRACAO.md`
- Legado SDA: `docs/wdna/FUNCIONALIDADES-E-SEPARACAO.md`

---

**Próxima revisão recomendada:** após confirmação do tema ativo no painel WDNA (nome, ID, último publish) e smoke checklist assinado.
