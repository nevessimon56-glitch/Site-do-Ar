# Registro central — Site do Ar / WDNA

**Atualizado:** 26 out 2026 (America/Sao_Paulo)  
**Branch de trabalho:** `cursor/audit-consolidacao-b192`  
**Modo desta entrega:** **Fase M** — integração unificada (mega menu, comparador, hover v2) + correções de cascata CSS; commit local após `b40943e`; **sem publicação WDNA**, **sem push**. **Validação visual na loja: pendente.**

---

## A. Estado inicial (evidências desta sessão)

| Artefato | Antes | Observação |
|----------|-------|------------|
| `assets/theme-all.css` | 645 011 bytes, 30 891 linhas, **brace EOF +1** | Conteúdo alinhado ao commit **`f3ae95c`** (bundle duplicado + `@media` potência não fechado — ALL-CSS-001/002). |
| `assets/theme-custom.css` | 41 910 bytes, 2 187 linhas | Badge carrinho **verde `#61bb47`**; **sem** bloco PIX verde; popup D360 presente; **sem** blocos PDP premium 2B–2G (não existiam nesta branch). |
| `layout/theme.liquid` | 3 folhas CSS | **Sem** `mega-menu.css`, **sem** `product-hover-image.css`, **sem** `{% render 'sections/mega-menu-ar' %}`, **sem** scripts defer dos dois JS. |
| Backups `docs/wdna/backups/` | Ausentes | Recriado apenas `theme-all.recovery-candidate.css` espelhando o arquivo corrigido. |
| CSS publicado CDN (`theme-custom-1789651320449.css`) | 40 140 bytes, SHA `c6812741…` | Referência da loja; baixado em `/tmp/theme-custom-wdna-published.css` para comparação. |
| Commit `709a967` | Existe no repositório | **Não** é ancestral da branch atual; usado como base estrutural via `git show`. |
| Backup WDNA 671 205 bytes (`theme-all.wdna-pre-709a967.css`) | **Não** presente nesta branch | Referência histórica do incidente; conteúdo **não** revalidado byte-a-byte nesta sessão. |

**Limitação explícita:** não foi possível comprovar, a partir deste ambiente, qual `theme-all.css` / `theme-custom.css` a WDNA está servindo **agora** (cache, hash no HTML, DevTools). Nenhuma afirmação de “publicado” ou “não publicado” além das informações relatadas pelo usuário.

---

## B. Causa-raiz confirmada × correção

| ID | Problema confirmado | Evidência | Correção aplicada |
|----|---------------------|-----------|-------------------|
| **CR-ALL-001** | `theme-all.css` com **duplicação interna** e **`{`/`}` desbalanceado (+1)** | `brace_eof=+1`, 645 011 bytes; auditoria ALL-CSS-001/002 | Substituído por **candidata de recuperação**: base `709a967` + regras WDNA (L134–143 opacidade vitrine + cauda “sem fade” + `.product-main:hover` tail). **brace EOF = 0**, 323 071 bytes, 15 463 linhas. |
| **CR-LAY-001** | Folhas **`mega-menu.css`** e **`product-hover-image.css`** existiam em `assets/` mas **não eram carregadas** | Diff com `docs/wdna/theme.liquid-ATUALIZADO-WDNA.liquid`; PHV/MEGA na auditoria | `layout/theme.liquid`: `<link>` após `theme-custom.css`; `mega-menu.js` + `product-hover-image.js` defer; fallback `initMegaMenuAr`; render `sections/mega-menu-ar`. |
| **CR-CUS-001** | Badge do carrinho **fora da identidade / loja publicada** | CDN `#f97316` vs local `#61bb47` | `.cart_quantity { background-color: #f97316; }` |
| **CR-CUS-002** | Regras **PIX** (badge verde) presentes na CDN, ausentes no local | EOF CDN `.showcase-prices_pix, .product-prices_pix` | Bloco equivalente inserido antes do CSS do popup D360. |
| **CR-CUS-003** | **`transform: none !important`** em `.showcase-products .showcase-product:hover` cancelava hover da vitrine geral | Conflito documentado (listagem vs bloco “Remove pulo…”) | Escopo reduzido a **`.product-related` apenas**; vitrine home mantém regras `.showcase-product.card:hover`. |

---

## C. Personalizações preservadas

- Header, footer, listagem, busca, filtros, cards, botões e identidade azul `#2C77BB` / navy `#163D5C` no `theme-custom.css` existente.
- Popup **Diagnóstico 360** (CSS + markup em `theme.liquid`).
- `.logo-store-name` (a11y).
- Regras WDNA de vitrine no **`theme-all.css`**: `:not(.showcase-product_link__image)`, opacidade imagem, bloco **“Cards de produto — sem fade no hover”**.
- Alterações locais da branch (auditorias em `docs/wdna/AUDITORIA-ARQUIVOS-CONSOLIDACAO.md`, etc.) — **nenhum reset** executado.

**Não reintroduzido nesta branch:** blocos **PDP premium 2B–2G** (~1 300 linhas) que existiam em outras linhas de trabalho — **sem markup/HTML verificado neste checkout**; reintrodução seria escopo separado.

---

## D. Arquivos modificados (26 out 2026)

| Arquivo | Alteração |
|---------|-----------|
| `assets/theme-all.css` | Recuperação estrutural + customizações WDNA (ver CR-ALL-001). SHA-256: `ef9ae0a673cb36a129dc1a3c4a983891b3c154873760b771d8a5022ab54fd353` |
| `assets/theme-custom.css` | CR-CUS-001..003; §K (Fase 1/1.1 cards); §L (Fase 2B-1 tokens/acentos, 2B-2 títulos vitrine). **Estado atual (26 out 2026, pós-Fases 2B-1/2B-2):** SHA-256 `793478ed0c274b8db49b6f9f263bb70d3482968a409e2e1e939a06356989ce8e`, 43 345 bytes, 2 245 linhas (`sha256sum` + `wc -c -l`). |
| `assets/mega-menu.css` | §L Fase 2B-3 — cores via `var(--brand-primary)` / `var(--brand-navy)`. **Estado atual (26 out 2026):** SHA-256 `4c64b587aa60f5a1145c306a728a3f537825d735867f82c26e1afc02bedd322b`, 7 973 bytes, 398 linhas. |
| `layout/theme.liquid` | Carregamento CSS/JS mega-menu + hover imagem + render template (CR-LAY-001). Ordem CSS: `theme-all` → `theme-custom` → `mega-menu` → `product-hover-image` (L112–115). |
| `docs/wdna/backups/theme-all.recovery-candidate.css` | Cópia espelho do `theme-all.css` corrigido. |
| `docs/wdna/REGISTRO-CENTRAL-PROJETO.md` | Este registro. |

---

## E. Validações executadas (reais)

| Verificação | Resultado |
|-------------|-----------|
| Balanceamento `{`/`}` em `theme-all.css` | **0** no EOF |
| Balanceamento `{`/`}` em `theme-custom.css` | **0** no EOF |
| `@font-face` Akhand em `theme-all.css` | **4** (sem duplicata 8×) |
| Presença regras vitrine WDNA em `theme-all.css` | `a:focus:not(.showcase-product_link__image)` e bloco “sem fade” — **presentes** |
| `sections/mega-menu-ar.liquid` | **Existe** |
| Diff local `theme-custom` vs CDN publicada | **Diferente** (esperado: local inclui D360 + `.logo-store-name` + escopo transform); CDN SHA inalterado `c6812741…` |
| Testes automatizados do repo | **Nenhum** aplicável a CSS de tema encontrado/executado |
| Validação visual na loja | **Não executada** (sem ambiente WDNA autenticado nesta sessão) |
| Escopo hover cards (Fase 1.1) | **Revisão estática** concluída; seletores alinhados ao Liquid (`showcase-related`, `showcase-search_grid`, `product-main`) |
| Auditoria identidade **Fase 2C** (somente leitura) | Concluída; **nenhum arquivo alterado** durante a auditoria; riscos visuais listados em §L.4 |

---

## F. Problemas corrigidos vs não confirmados

**Corrigidos localmente (com evidência acima):** estrutura `theme-all`, ordem de carregamento mega-menu/hover, carrinho/PIX no custom, conflito transform vitrine (CR-CUS-003 → escopo **`.showcase-related`** na Fase 1.1), **padronização visual dos cards** (§K), **tokens e acentos de marca** (§L.1), **títulos de vitrine** (§L.2), **cores do mega-menu** (§L.3).

**Não confirmados como resolvidos na loja:**

- “Site desorganizado” após publicações anteriores — **causa na WDNA não medida** (bytes servidos, ordem real, cache).
- Eficácia da recuperação visual após publicar novo `theme-all` — depende de deploy + smoke.
- Conteúdo remoto de `theme-all.css` na CDN — **desconhecido** nesta sessão.
- Comportamento visual dos cards após Fase 1/1.1 — **pendente validação na loja** (riscos em §K.4).
- Identidade visual Fase 2B (header, footer accent, títulos, mega-menu) — **pendente validação visual** (§L.4); alterações **não publicadas** na WDNA neste registro.

---

## G. Pendências externas (usuário / WDNA)

1. **Publicação autorizada** na WDNA, nesta ordem recomendada: `assets/theme-all.css` → `assets/theme-custom.css` → `layout/theme.liquid` (layout exige editor WDNA para Liquid).
2. **Smoke mínimo pós-publicação:** Network (bytes/SHA: `theme-custom` e `mega-menu` conforme §D/§L.5), home vitrine (**títulos** §L.2 + hover card **−5px** + imagem), busca **grade vs lista**, busca ≥992px (potência), **mega menu** (links, dots, CTA hover §L.3), hover segunda imagem nos cards, PDP (vitrine topo sem lift; related/last-viewed títulos navy), checkout.
3. **Opcional:** restaurar backup `theme-all.wdna-pre-709a967.css` no repositório se ainda necessário para auditoria byte-a-byte (arquivo não estava na branch).

---

## H. Histórico de incidente `theme-all` (referência)

- Publicação relatada do commit **`709a967`** → regressão visual reportada.
- Publicação relatada da candidata → **sem mudança perceptível** (hipótese consistente: **`theme-custom` da loja domina vitrine** e/ou CDN não refletiu o arquivo esperado — **não comprovado aqui**).
- Workspace **desta branch** estava em **`f3ae95c`**, pior caso estrutural (duplicação), **não** em `709a967`.

---

## I. Próxima ação mínima

**Validação visual** na loja ou preview WDNA: cards (§K.4) + identidade 2B (§L.4) **antes ou junto** da publicação. Publicar na ordem §G e conferir Network: `theme-all.css` ≈ **323 071 bytes** (SHA `ef9ae0a6…`), `theme-custom.css` ≈ **43 345 bytes** (SHA `793478ed…`), `mega-menu.css` ≈ **7 973 bytes** (SHA `4c64b587…`), `product-hover-image.css` no HTML.

---

## J. Confirmações de conduta

- **Não** houve publicação WDNA, deploy, **commit** ou **push** nesta entrega.
- **Não** houve reset, checkout destrutivo ou limpeza de alterações do usuário.
- **Não** foi substituído `theme-custom.css` inteiro pelo arquivo da CDN (apenas merges pontuais comprovados).

---

## K. Redesign visual — Fase 1 e 1.1 (cards de produto)

**Arquivo alterado:** somente `assets/theme-custom.css` (Fase 1 e 1.1). **Não** alterados: `theme-all.css`, Liquid, JS, preços, PIX, botões de compra, dimensões funcionais de preço/footer.

### K.1 Fase 1 — padronização base

- **Borda:** `1px solid #b8cfe8`, **`border-radius: 12px`** (bloco «Card do produto»; consolidado; removida duplicata EOF de bordas por lado e borda navy `#163d5c` redundante).
- **Hover unificado:** `translateY(-5px)` + sombra `0 8px 24px rgba(44, 119, 187, 0.15)` — eliminados conflitos anteriores **−8px** / **−4px** no custom.
- **Escopo inicial da regra unificada:** `.showcase-products …` e `.showcase-search …` (revisão estática posterior identificou excesso de escopo — corrigido na Fase 1.1).

### K.2 Fase 1.1 — escopo do hover (pós-revisão estática)

| Contexto | Elevação (`translateY(-5px)`) | Sombra no hover | Seletor / evidência |
|----------|-------------------------------|-----------------|---------------------|
| Vitrines **home** (e demais `.showcase-products` fora das exceções) | **Sim** | Sim | `.showcase-products .showcase-product.card:hover` |
| Busca **grade** | **Sim** | Sim | `.showcase-search.showcase-search_grid .showcase-product.card:hover` (`theme.js` alterna `_grid` / `_list`) |
| Busca **lista** | **Não** | Base do card | Sem `_grid`; layout lista em `theme-all.css` (`display: table`, floats) |
| **Produtos relacionados** | **Não** | **Sim** (`0 8px 24px …`) | Markup: `sections/product-related.liquid` → `.showcase-related` > `.showcase-products` |
| Vitrines no **topo da PDP** | **Não** | Sombra reduzida (`0 2px 8px rgba(0,0,0,0.06)`) | `templates/product.liquid`: `<main class="product-main">`; vitrines = `.showcase.showcase-model-*`; exceção: `.product-main .showcase:not(.showcase-related):not(.showcase-last-viewed) … :hover` |

**Correções de seletor (1.1):**

- Relacionados: **`.product-related` → `.showcase-related`** (classe `.product-related` **não** existe no Liquid; só `col-product-related` no layout).
- PDP: removida exceção **`.page-product` / `.product-page`** — classes **não** encontradas no repositório (`layout/theme.liquid`, templates); substituída por **`.product-main`** com exclusões acima.

**Nota sobre CR-CUS-003:** a intenção original (sem “pulo” nos relacionados) passa a valer via **`.showcase-related`**; vitrine geral mantém lift onde aplicável (§K.2).

### K.3 O que não mudou nestas fases

- Cores/estilo de **PIX**, preços, descontos e **`a.showcase-product_buy`**.
- **Zoom** de imagem: `.showcase-product:hover .showcase-product_link__image img` (`scale(1.04)`) — regra global mantida.
- **`assets/theme-all.css`**, cabeçalho, mega-menu, banners.

### K.4 Riscos pendentes (validação visual obrigatória)

1. **Carrosséis** (home, relacionados): trilho Tiny Slider / viewport pode **cortar sombra** apesar de `overflow: visible` nos cards — não verificável só com CSS estático.
2. **Alternância busca grade ↔ lista:** confirmar lift **apenas** com `.showcase-search_grid` após toggle (`theme.js` / `theme-defer.js`).
3. **Últimos vistos na PDP** (`.showcase-last-viewed`): **fora** da exceção “sem lift” do topo; podem receber **−5px** — comportamento a confirmar.
4. **Zoom global** da imagem no hover aplica-se também a lista, relacionados e PDP — independente do lift do card.

**Comprovado localmente após Fase 1.1 (26 out 2026):** SHA-256 `97eaf6588482b49bde09e647e5cda9ff4e143c625df824f6f17c3dfca9ae63aa`, 41 312 bytes, 2 162 linhas — **snapshot histórico** antes das Fases 2B. Hash **atual** do arquivo completo: §L.5 / §D.

---

## L. Redesign visual — Fase 2B (identidade) e auditoria 2C

**Estado geral:** alterações das Fases 2B-1, 2B-2 e 2B-3 existem **apenas no workspace local**; **não** houve publicação WDNA, commit ou push registrados nesta atualização. **A loja não foi validada visualmente** após 2B.

### L.1 Fase 2B-1 — tokens e acentos decorativos (`assets/theme-custom.css`)

- **Tokens globais** (bloco `:root` no início do arquivo): `--brand-primary` `#2C77BB`, `--brand-navy` `#163D5C`, `--brand-purple` `#6D28D9`, `--brand-orange` `#F97316`, `--brand-lavender` `#F3E8FF`.
- **Segundo bloco `:root`** (footer, ~L1061): mantém `--footer-*`; `--footer-cta-bg` e `--footer-accent` passam a referenciar `var(--brand-primary)`.
- **`#4b96d4` removido** do custom: ícones header (SSL, links, menu mobile), ícones busca mobile (`.search_link .icon-bar`), `--footer-accent`.
- **Preservado:** verde PIX/sucesso, hover busca desktop `#3677ad`, hover botão compra `#4ea3f1`, badge carrinho `#f97316` literal (equivalente a `--brand-orange`, não migrado nesta fase).
- **`--brand-orange` e `--brand-lavender`:** declarados; **sem uso** em seletores na 2B-1 (auditoria 2C).

### L.2 Fase 2B-2 — títulos de vitrine (`assets/theme-custom.css`, ~L13–86)

| Escopo | Regras | Comportamento |
|--------|--------|----------------|
| **Geral** | `.showcase-title` | `var(--brand-primary)`, 30px desktop, peso 700, `text-transform: none`, margem ~26px; override de `theme-all.css` L3638+ (35px uppercase). |
| **Traço** | `.showcase-title::after` | 56×3px, `var(--brand-purple)`; alinhamento via margens + seletores `[style*="text-align: …"]` (center/left/right, com/sem espaço). |
| **Ocultos** | `[style*="display: none"]`, `[style*="opacity: 0"]` | Suprime pseudo-elemento (ex.: `showcase-model-9.liquid`). |
| **PDP secundário** | `.showcase-related .showcase-title`, `.showcase-last-viewed .showcase-title` | `var(--brand-navy)`, ~23px; **não** aplicado a vitrines `showcase-model-*` no topo da PDP. |
| **Mobile** | `@media (max-width: 991px)` | Geral ~24px; secundários ~21px (mesmo breakpoint que `theme-all` L3860). |

**Não alterado:** `.search-left h1` (busca); cards, preços, PIX, botões; fundos lavanda em seções.

**Riscos pendentes (2B-2 / reforçados na 2C):** títulos longos; carrosséis vs setas; classe `showcase-title_carousel` sem CSS dedicado; `text-align` só via inline ou herança do monolith.

### L.3 Fase 2B-3 — mega-menu (`assets/mega-menu.css`)

- **`#4b96d4` e `#2c77bb` literais** substituídos por `var(--brand-primary)` (colunas, links hover, ver-tudo, dot ativo, kicker, título banner, CTA default).
- **Hover CTA banner:** `var(--brand-navy)` (mantém contraste vs CTA default primário).
- **Dependência:** tokens definidos em `theme-custom.css`; **`layout/theme.liquid`** carrega **custom antes** de mega-menu — obrigatório publicar **ambos**; servir só `mega-menu.css` deixa `var()` indefinido.
- **Preservado:** neutros (`#334155`, `#94a3b8`, `#cbd5e1`, `#f0f7fc`), dimensões, `@media (min-width: 992px)`.

### L.4 Fase 2C — auditoria estática (somente leitura)

- **Escopo:** `theme-custom.css`, `mega-menu.css`, leitura de `theme-all.css`, `layout/theme.liquid`, Liquid de vitrines (alinhamento inline).
- **Resultado:** ordem de carga e tokens **aprovados**; cascata títulos custom > monolith **aprovada**; mega-menu sem hex legado `#4b96d4`; **sem** interferência detectada em preços/PIX/botões/cards nas regras 2B.
- **Achados menores:** dois blocos `:root` no custom (marca + footer) — válido; tokens orange/lavender ainda não consumidos; seletor `[style*="opacity: 0"]` amplo para usos futuros.
- **Durante a 2C:** **nenhum arquivo** foi modificado.
- **Validação visual:** **não realizada** — itens abaixo exigem smoke na WDNA:

  1. Header + mega-menu (primário unificado vs referência anterior `#4b96d4`).
  2. Títulos vitrine (30px, traço roxo, related navy).
  3. Distância título ↔ carrossel / setas.
  4. CTA mega-menu hover marinho.
  5. Toggle busca grade/lista (cards §K, inalterado na 2B).
  6. Publicação parcial (só mega-menu sem custom).

### L.5 Metadados verificados nesta atualização do registro (26 out 2026)

Comandos: `sha256sum` e `wc -c -l` no ambiente Cursor (workspace).

| Arquivo | SHA-256 | Bytes | Linhas |
|---------|---------|-------|--------|
| `assets/theme-custom.css` | `793478ed0c274b8db49b6f9f263bb70d3482968a409e2e1e939a06356989ce8e` | 43 345 | 2 245 |
| `assets/mega-menu.css` | `4c64b587aa60f5a1145c306a728a3f537825d735867f82c26e1afc02bedd322b` | 7 973 | 398 |

**CDN WDNA / bytes servidos na loja:** **não verificados** nesta atualização.

### L.6 Fase 2D — atualização do registro central

- **Escopo:** somente `docs/wdna/REGISTRO-CENTRAL-PROJETO.md` (esta seção §L e referências cruzadas em §D, §E, §F, §G, §I).
- **Histórico preservado:** §A–§K e entradas anteriores **não** removidas nem reescritas; §K.4 mantém snapshot pós–Fase 1.1 distinto do hash atual.
- **Conteúdo consolidado:** Fase 2B-1 (tokens e `#4b96d4` → primário), 2B-2 (títulos gerais, traço roxo, secundários PDP, responsividade, riscos), 2B-3 (mega-menu + ordem de carga), 2C (auditoria estática sem edição de arquivos).
- **Metadados:** recalculados na Fase 2D — ver §L.5 (comandos `sha256sum`, `wc -c`, `wc -l` no workspace Cursor).
- **Estado:** implementação 2B **não publicada** na WDNA; **validação visual pendente** (§L.4); **nenhum** commit/push executado nesta fase de registro.

---

## M. Integração unificada e correções (26 out 2026)

**Base:** commit `b40943e` (stack `theme-unified-ed4c` / `9324c88`). Backup permanente: `docs/wdna/backups/recovery-impl-20261026/` (+ `MANIFEST.sha256`).

### M.1 Escopo integrado no workspace

| Componente | Arquivos |
|------------|----------|
| Mega menu | `assets/mega-menu.css` (monólito), `assets/mega-menu.js`, `sections/mega-menu-ar.liquid` |
| Comparador | `assets/product-compare.css/js`, `sections/product-compare-panel.liquid`, `product-compare-data.liquid` |
| Vitrine | `sections/showcase-model-product.liquid`, `sections/product-spec-icons.liquid` |
| Hover | `mega-menu.js` (`__SDA_HOVER_V2__`) + `product-hover-image.js` (guard v2) |
| Layout | `layout/theme.liquid` — compare CSS/JS + render panel; SEO/canonical/`__storeCustomer`/D360/checkout preservados |

**Preservados sem substituição:** `assets/theme-all.css`, `assets/theme-custom.css` (edições pontuais §M.2), registro, backups anteriores. **Logos mega menu:** texto/CSS em `mega-menu-ar.liquid` (sem SVG em `assets/`).

### M.2 Correções aplicadas (pós-`b40943e`)

1. **`product-compare.css`:** overrides mobile 2 col — `mega-menu.css` posicionava `.showcase-compare-btn` como ícone absoluto; restaurada **linha flex** Comparar + Comprar no footer (compatível com `showcase-model-product.liquid`).
2. **`theme-custom.css`:** footer com comparador — `margin-top` do Comprar zerado dentro de `.showcase-card-actions`; classe `card-footer--actions` reduz `min-height` fixo do §K que quebrava card compacto.
3. **`showcase-model-product.liquid`:** `card-footer--actions` no markup.
4. **`product-hover-image.css`:** cascata **pós mega-menu** — borda §K `#b8cfe8`, hover lift/lista/related/PDP, PIX verde `#f0fdf4`; banners sem fade no hover; carrega por último no `theme.liquid`.
5. **`product-compare.js`:** `syncButtons` / `updateBar` em `change-customer-login` e `check-login-logged`.

### M.3 Testes executados (ambiente Cursor)

| Teste | Resultado |
|-------|-----------|
| `node --check` em `mega-menu.js`, `product-compare.js`, `product-hover-image.js` | OK |
| Balance `{`/`}` em CSS alterados | 0 |
| Referências Liquid/JS (`#mega-menu-ar-template`, `#product-compare-bar`, `product-compare-data`, `__SDA_HOVER_V2__`) | OK |
| Navegador / WDNA publicada | **Não executado** |

### M.4 Impedimentos à publicação

- Smoke visual obrigatório (mega menu desktop, compare 2–3 produtos, hover 2ª imagem, busca grade/lista, mobile dock).
- Publicação manual WDNA + ordem de upload dos assets (fora deste ambiente).
- `theme-all.css` / `theme-custom.css` locais ainda divergentes do CDN — publicar apenas após validação.

### M.5 Confirmações

- **Não** push, deploy ou publicação WDNA.
- **Não** `reset` / `clean` / `restore`.
- Commit `b40943e` e backup `recovery-impl-20261026` **preservados**.

### M.6 Pré-publicação (pós-`5b8f2d3`)

- **`theme-all.css` (working tree, não commitado):** candidata recuperada ~323 071 bytes, brace EOF **0**; snapshot em `docs/wdna/backups/pre-publish-theme-all-worktree.css`. **Coerente** com `theme-custom.css` (custom sobrescreve identidade/cards; monólito `mega-menu.css` carrega depois do custom).
- **`theme.liquid` ordem:** `theme-plugins` → `theme-all` → `theme-custom` → `mega-menu` → `product-compare` → `product-hover-image`; JS defer: `mega-menu.js` → `product-compare.js` → `product-hover-image.js`.
- **Correções:** painel compare atualiza/fecha ao remover produto; busca **lista** mobile — flex Comparar+Comprar; `syncButtons` ignora botões sem `data-compare-id`.
- **Validação visual WDNA:** **pendente** (sem preview autenticado neste ambiente).
