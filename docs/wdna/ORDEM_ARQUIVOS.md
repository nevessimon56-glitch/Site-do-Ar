# Ordem de aplicação — um arquivo por vez

**Regra:** colar → publicar → testar → só então próximo arquivo.

**Restaurar visual completo:** ver [`RESTAURAR_VISUAL.md`](RESTAURAR_VISUAL.md) e [`THEME_LIQUID_TRECHOS.md`](THEME_LIQUID_TRECHOS.md).

---

## Status atual (2026-07-20)

| Item | Status |
|------|--------|
| `layout/theme.liquid` restaurado | Feito por você |
| Home deslogado | Vitrine Promoção com produtos |
| Home logado (conta Cliente) | Ok |
| Compra / Mercado Pago | Ok |
| Visual custom (mega menu, hover) | Pendente — seguir RESTAURAR_VISUAL.md |

---

## Passo 1 — Painel WDNA (sem arquivo)

### 1A — Tema (você já fez)

**Onde:** Configurações → Produto → Preço

| Campo | Colocar |
|-------|---------|
| Lista de preço — usuário **logado** | **Site do Ar** |
| Lista de preço — usuário **não logado** | **Site do Ar** |

### 1B — Cadastro do cliente (prioridade maior que o tema)

No WDNA, **se o cliente logado tiver tabela vinculada no cadastro, ela vence** a configuração do tema.

**Onde:** Clientes (ou Usuários) → abra **o seu cadastro** (e-mail com que você testa login)

| Campo / aba | O que fazer |
|-------------|-------------|
| **Tabela de preço** (no cadastro do cliente) | Remover **Mercado Livre** ou trocar para **Site do Ar** |
| Se houver várias tabelas | Deixar só **Site do Ar**, ou **Site do Ar** como primeira |

Salve o cadastro, **saia da conta no site** (logout), entre de novo e teste.

### 1C — Canal de venda (se ainda puxar ML)

**Onde:** Canais de venda → **Site Do Ar** (sua loja) → **Padrões do canal** → **Tabela de preço**

| Situação | O que fazer |
|----------|-------------|
| Várias tabelas marcadas (multi tabela) | Deixar só **Site do Ar**, ou **Site do Ar** como **primeira** da lista |
| Mercado Livre ainda na lista | Tirar do canal da loja (ML é marketplace, não vitrine do site) |

**Testar depois:**
- [ ] Home logado mostra vários produtos na Promoção
- [ ] Home logado mostra "Os mais vendidos"
- [ ] Catálogo abre
- [ ] Carrinho adiciona produto logado

**Só avance para Passo 2 quando estes testes passarem ou você confirmar que quer continuar mesmo assim.**

---

## Passo 2 — `assets/mega-menu.css`

**Por quê:** estilos do menu mobile e cards (sem JavaScript pesado).

**Link:** branch `main`  
https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/main/assets/mega-menu.css

**Testar:**
- [ ] Home deslogado OK
- [ ] Menu mobile abre
- [ ] Catálogo OK

---

## Passo 3 — `assets/mega-menu.js` (versão SIMPLES)

**Por quê:** menu Modelos, barra mobile, hover — versão `main` (~180 linhas).

**NÃO usar** a versão v8–v11 (guest-restore agressivo).

**Link:** branch `main`  
https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/main/assets/mega-menu.js

**Testar:**
- [ ] Home logado e deslogado
- [ ] Catálogo
- [ ] Comprar no carrinho logado

---

## Passo 4 — `sections/showcase-model-product.liquid`

**Por quê:** cards da vitrine (Promoção, Mais Vendidos).

**Link:** branch `main`  
https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/main/sections/showcase-model-product.liquid

**Testar:**
- [ ] Preços nos cards (deslogado e logado)
- [ ] Imagens e botão Comprar

---

## Passo 5 — `sections/product-content.liquid`

**Só se** a página do produto precisar de ajuste.

**Link:** branch `cursor/rollback-recuperar-site-ed4c`  
https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/c5da2b0/sections/product-content.liquid

---

## Passo 6 — `sections/search-filter.liquid`

**Só se** filtros mobile do catálogo precisarem.

**Link:** branch `cursor/fix-search-filters-v2-ed4c`  
https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/59ab4e0/sections/search-filters.liquid

> No WDNA o nome é **`search-filter.liquid`** (singular).

---

## Nunca fazer

- Substituir `theme.liquid` inteiro pelo GitHub
- Colar vários arquivos de uma vez
- Usar pasta `pages/`
- Usar `mega-menu.js` v8–v11 sem testar

---

## Me avise antes de cada passo

Responda: **"pode aplicar passo X"** e eu confirmo o link certo antes de você colar.
