# Inventário de funcionalidades — Site do Ar

**Data:** 28 out 2026 (America/Sao_Paulo)  
Legenda **situação migração:** `Confirmado repo` | `Confirmado produção` | `Parcial` | `Não verificado` | `WDNA only`

Legenda **impacto falha:** `Crítico` (venda/conta) | `Alto` | `Médio` | `Baixo`

---

## Matriz de rastreabilidade (resumo)

| # | Funcionalidade | Arquivos principais | Teste smoke | Situação | Confiança |
|---|----------------|---------------------|-------------|----------|-----------|
| F01 | Home vitrines | `home.liquid`, `showcase-model-*` | Home scroll carrosséis | Confirmado repo + produção | Alta |
| F02 | Card produto SDA | `showcase-model-product.liquid`, `sda-card.css` / `showcase-product-card.css` | Card comprar/compare | **Parcial** (v4 ar vs v5 Git) | Alta |
| F03 | Mega menu AR | `mega-menu-ar.liquid`, `mega-menu.*` | Abrir “Modelos” | Confirmado produção | Alta |
| F04 | Header v2 | `header.liquid`, `header-v2.css` | Logo, busca, cart | Confirmado produção | Alta |
| F05 | Comparador (3) | `product-compare-*`, JS/CSS | Selecionar 3, modal | Confirmado produção | Alta |
| F06 | Favoritos | `favorites.*`, sidenav | Coração + lista | Confirmado repo | Média |
| F07 | PDP compra | `product-content.liquid`, `theme.js` | Variação + add cart | Confirmado repo | Média |
| F08 | PDP v2 visual | `product-page-v2.css`, sections PDP | Layout mobile sticky | Confirmado repo | Média |
| F09 | Busca/filtros | `search.liquid`, `search-filter.liquid` | Filtro BTU/marca | Confirmado repo | Média |
| F10 | Carrinho sidenav | `sidenav-overlay-cart*` | Abrir, alterar qtd | WDNA only | Média |
| F11 | Login/conta | `sidenav-overlay-account`, `theme.js` | Login/logout | WDNA only | Média |
| F12 | Frete CEP | `sidenav-shipping-calculation` | Calcular frete PDP | WDNA only | Média |
| F13 | Parcelamento | `sidenav-payment-calculation` | Simular parcelas | WDNA only | Baixa |
| F14 | Checkout | `checkout*.liquid` | Pedido teste preview | Não verificado | Baixa |
| F15 | Diagnóstico 360 | `diagnostico-360.liquid`, popup `theme.liquid` | Página + popup | Parcial | Média |
| F16 | Dock mobile | `mega-menu.css/js` | Barra inferior | Confirmado repo | Média |
| F17 | Hover 2ª imagem | `product-hover-image.*` | Hover desktop | Parcial | Média |
| F18 | Compre junto / kit | `product-buy-to-gether`, `product-kit*` | PDP bundle | Não verificado | Baixa |
| F19 | Calculadora solar | `page-solar-calculator*` | Página solar | Não verificado | Baixa |
| F20 | SEO / schema | `theme.liquid`, `theme-schema`, `product-schema` | Rich results validator | Parcial | Média |
| F21 | Analytics | `scripts.header`, gtag/fbq hooks | Tag assistant | Não verificado | Baixa |
| F22 | Afiliado URL | `theme.liquid` captureUrlParameter | ?seller= | Confirmado repo | Alta |
| F23 | Cookies LGPD | `check-cookie.liquid` | Banner | Confirmado repo | Baixa |
| F24 | 404 / institucional | `404`, `page.liquid` | URLs estáticas | Confirmado repo | Média |
| F25 | Promo model 9 | `showcase-model-9`, promotion liquid | Seção promo home | Não verificado | Baixa |

---

## Detalhamento por fluxo

### F01 — Página inicial e vitrines

- **Objetivo:** Merchandising por seções configuradas no painel WDNA.
- **Entrada:** `showcase.sections[]` com `typeId`, produtos embutidos.
- **Saída:** HTML vitrine + carrosséis (tns).
- **Regras:** `display != inactive'`; model 10 dispara `showcase-video-init`.
- **Erro/vazio:** Seção omitida se inactive.
- **Impacto falha:** Alto (conversão).
- **Teste:** Home — cada modelo visível, links produto OK.

### F02 — Card de produto (conversão)

- **Objetivo:** Exibir specs, preço Pix/parcelas, CTA Comprar e Comparar.
- **Markup Git:** `data-showcase-tpl="v5-zero"`, `.sda-card`.
- **Markup produção (28/out):** `v4-card-remodel`, `.sda-product-card--v2`.
- **Dependências:** `handleAddToCart`, JSON em `product-compare-data.liquid`.
- **Impacto falha:** Crítico na listagem.
- **Teste:** Comprar 1 item vitrine; comparar; favoritar.

### F03 — Mega menu

- **Objetivo:** Navegação categorias BTU/marcas + banners.
- **JS:** Monta DOM a partir de `#mega-menu-ar-template`.
- **Impacto falha:** Alto (descoberta catálogo).
- **Teste:** Desktop hover/click; links internos.

### F05 — Comparador

- **Objetivo:** Até 3 produtos, tabela specs, CTA compra.
- **Estado:** `localStorage` (v3).
- **Impacto falha:** Médio (diferencial, não bloqueia compra).
- **Teste:** 3 cards → Comparar → limpar.

### F07 — PDP — compra

- **Objetivo:** Selecionar SKU, quantidade, adicionar ao carrinho.
- **Dependências:** Alpine `setupProduct`, estoque WDNA.
- **Impacto falha:** Crítico.
- **Teste:** Produto com variação; estoque zerado (mensagem).

### F10–F14 — Carrinho, conta, checkout

- **Implementação:** Predominantemente **B — WDNA** (`theme.js`, checkout sections).
- **Impacto falha:** Crítico.
- **Teste:** Apenas em **tema preview** com pagamento sandbox — **pendente ambiente**.

### F15 — Diagnóstico 360

- **Objetivo:** Quiz recomendação + popup conversão.
- **Regras popup:** 15s desktop / scroll+22s mobile; dismiss persiste localStorage.
- **Impacto falha:** Baixo/Médio (lead gen).
- **Teste:** Incognito — popup; link `/pagina/diagnostico-360`.

### F21 — Analytics

- **Entrada:** Scripts painel + eventos condicionais (`typeof gtag`, `fbq`).
- **Saída:** Eventos e-commerce.
- **Impacto falha:** Médio (mídia paga).
- **Teste:** Requer painel + preview — **não executado**.

---

## Funcionalidades WDNA base (não custom SDA, mas presentes)

| Área | Sections / assets |
|------|-------------------|
| Footer institucional | `footer.liquid` |
| Conta / endereços | `customer-*`, templates account |
| Registro | `register.liquid` |
| Manutenção / 404 | templates |
| Header checkout | `header-checkout.liquid` |

---

## O que **não** pode ser descartado silenciosamente

Todas as linhas F01–F25 permanecem **em escopo** até teste explícito ou confirmação do negócio de desativação no painel WDNA (ex.: desligar vitrine model X).

---

## Referência estendida

Detalhamento histórico SDA v3: `docs/wdna/FUNCIONALIDADES-E-SEPARACAO.md`
