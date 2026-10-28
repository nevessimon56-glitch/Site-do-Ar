# Modelo — Inventário de scripts do painel WDNA (Header)

**Uso:** preencher manualmente após inspeção no painel WDNA e/ou no HTML renderizado.  
**Não** registrar senhas, tokens de API, chaves privadas ou conteúdo completo de scripts com dados sensíveis — apenas metadados e trechos necessários para rastreabilidade.

**Loja (evidência CDN produção):** store `13805`, tema publicado assets em `.../themes/3/assets/` (28/out/2026).

---

## Legenda de status

| Status | Significado |
|--------|-------------|
| **Identificado** | Nome/slug/local inferido (HTML, doc Git ou painel) sem leitura completa |
| **Inspecionado** | Conteúdo ou configuração lido no painel ou no código-fonte exportado |
| **Desconhecido** | Impacto no header não confirmado |
| **N/A** | Não aplicável ao header |

---

## 1. Injeção Liquid (`layout/theme.liquid`)

| ID | Loop / variável | Posição no layout | Status | Referências no header | Notas |
|----|-----------------|-------------------|--------|----------------------|-------|
| S-L01 | `scripts.header` | `<head>` | Desconhecido | Pixels, tags | Preencher após export `theme.liquid` |
| S-L02 | `scripts.content` | Início `<body>` | Desconhecido | Pode alterar DOM global | Git: `layout/theme.liquid` L122 |
| S-L03 | `scripts.footer` | Fim `<body>` | Parcial identificado | WhatsApp (`sendWhatsPlugin`), plugins | Git `header.liquid` itera `scripts.footer` slug `whatsapp` |
| S-L04 | `scripts.main` | WDNA core | Desconhecido | StoreSDK, checkout | Ver `ARQUITETURA_ATUAL.md` |

---

## 2. Scripts externos no HTML (produção — inspeção estática 28/out/2026)

| ID | URL / origem | defer/async | Status | Funções globais usadas pelo header | Evidência |
|----|--------------|-------------|--------|-----------------------------------|-----------|
| S-H01 | `.../themes/3/assets/theme-*.js` | sync head | Identificado | `openSearch`, `openNavMobile`, `openSideNavOverlay` | Snapshot produção |
| S-H02 | `.../themes/3/assets/mega-menu-*.js` | defer | Identificado | `initMegaMenuAr`, dock mobile | Snapshot |
| S-H03 | `.../themes/3/assets/favorites-*.js` | defer | Identificado | `openFavoritesPanel` | Snapshot |
| S-H04 | `https://salescdn.net/prod/assets/js/main-*.js` | (ver HTML) | Identificado | Possível integração WDNA global | curl home |
| S-H05 | Inline `#header-orange-inline-v5` | inline | Inspecionado (HTML) | CSS emergência header | Snapshot |
| S-H06 | Inline NAV-MOBILE-STRIP / fallbacks | inline body | Parcial | `initSdaMobileNavStrip` | Git `theme.liquid` + prod HTML |
| S-H07 | Google Analytics 4 `G-24XPH3WR9S` | `scripts.header` (HTML prod 28/out) | **Identificado** | Eventos e-commerce | Evidência: view-source / HAR |

---

## 3. Plugins configuráveis (painel — preencher)

| ID | Nome amigável (painel) | Slug / tipo (se visível) | Ativo? | Config relevante ao header | Status | Impacto se removido |
|----|------------------------|--------------------------|--------|----------------------------|--------|---------------------|
| S-P01 | WhatsApp | `whatsapp` (Git referencia slug) | ? | Número, mensagem | Identificado no Git | Git header: `sendWhatsPlugin()`; **produção utility usa link direto API** |
| S-P02 | | | | | Desconhecido | |
| S-P03 | | | | | Desconhecido | |

---

## 4. Dependências ainda desconhecidas (backlog)

| ID | Hipótese | Por que importa o header | Como fechar |
|----|----------|--------------------------|-------------|
| D-01 | Conteúdo exato de `scripts.content` | Scripts no body podem sobrescrever globals | Export `theme.liquid` + listagem painel |
| D-02 | Banner `.top-content` vazio vs oculto CSS | Altura do header / scroll | Painel `themeConfig.store.bannerTop` + HTML multi-página |
| D-03 | Menu WDNA vs strip mobile hardcoded | Links divergentes | Export menu + diff `header.liquid` |
| D-04 | Tema preview vs tema 3 | Assets CDN path | URL preview + themeId |

---

## 5. Checklist de coleta (operador)

- [ ] Listar todos os scripts/apps na área de marketing/integrações do painel (sem copiar segredos).
- [ ] Exportar `layout/theme.liquid` do tema **publicado** e do **preview** (quando existir).
- [ ] Anotar **themeId** de cada tema (publicado vs preview) comparando URL de um asset no DevTools.
- [ ] Salvar capturas ou export JSON de config WhatsApp (apenas número público já visível na loja).
- [ ] Registrar data/hora (America/Sao_Paulo) e nome do operador.

---

*Template — não substitui export oficial do painel.*
