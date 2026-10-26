# Migração — funcionalidades Site do Ar para tema novo (WDNA)

**Objetivo:** tema **limpo** na WDNA + copiar só o que você **customizou**, sem arrastar anos de CSS conflitante.

**Fonte da verdade (Git):** branch `cursor/card-remodel-b192` (ou `main` após merge).

---

## 1. Como criar o tema novo na WDNA

1. Duplique o tema atual **ou** importe um export base (ex.: `site-do-ar-(novo)-*.zip` na raiz do repo).
2. **Não ative** o tema novo até passar o checklist §5.
3. Trabalhe no editor de arquivos do tema **novo** (pasta isolada na plataforma).

---

## 2. O que **NÃO** copiar do zip “novo” antigo

| Arquivo | Motivo |
|---------|--------|
| `assets/theme-all.css` do zip (~645 KB) | Versão **quebrada** (duplicada / braces). Use o do repo (~**322 KB**). |

Todo o resto do zip pode ser a **base**; as customizações vêm do pacote §3.

---

## 3. Pacote SDA — arquivos para levar ao tema novo

### 3.1 Layout (obrigatório)

| Arquivo | Função |
|---------|--------|
| `layout/theme.liquid` | Ordem dos CSS/JS, renders (mega menu, comparador, favoritos), hotfixes inline (JSON compare, header emergency). |

**Alternativa:** mesclar manualmente só os blocos marcados nos comentários `Custom CSS`, `render mega-menu-ar`, scripts `defer` — mais trabalhoso, mesmo efeito.

### 3.2 Assets — CSS

| Arquivo | Função |
|---------|--------|
| `assets/theme-all.css` | Base WDNA **corrigida** (repo). |
| `assets/theme-custom.css` | Identidade, PIX, popup D360, ajustes gerais. |
| `assets/mega-menu.css` | Mega menu + regras mobile home (legado escopado). |
| `assets/header-v2.css` | **Obrigatório** se o header publicado usa `class="header header-v2"`. |
| `assets/favorites.css` | Botão coração nos cards. |
| `assets/product-compare.css` | UI comparador (até 3 produtos). |
| `assets/product-hover-image.css` | Hover 2ª imagem (legado / shim). |
| `assets/sda-conversion-redesign.css` | Layout `.sda-product-card`, busca, compare coluna, PDP helpers. |
| `assets/product-page-v2.css` | PDP `#product-pdp-v2`. |
| `assets/showcase-product-card.css` | **Visual + altura uniforme** do card remodelado (carregar **por último** entre folhas de card). |

**Ordem no `<head>`:** igual ao comentário em `layout/theme.liquid` (plugins → all → custom → mega-menu → header-v2 → favorites → compare → hover → sda-conversion → product-page-v2 → **showcase-product-card**).

### 3.3 Assets — JavaScript

| Arquivo | Função |
|---------|--------|
| `assets/mega-menu.js` | Mega menu + hover v2 flag. |
| `assets/product-compare.js` | Comparador (lê `textarea.product-compare-json`). |
| `assets/sda-conversion-redesign.js` | Filtros colapsados, sticky PDP, comportamentos conversão. |
| `assets/product-hover-image.js` | Hover imagem (respeita `__SDA_HOVER_V2__`). |
| `assets/favorites.js` | Lista de favoritos / sidenav. |

**Não substituir** `theme.js` / `theme-defer.js` **a menos** que você tenha diff documentado — o carrossel vitrine (Tiny Slider) depende deles.

### 3.4 Sections — vitrine + compare + nav

| Arquivo | Função |
|---------|--------|
| `sections/showcase-model-product.liquid` | Card `.sda-product-card--v2` (home, busca, relacionados). |
| `sections/showcase-model-product-promotion.liquid` | Card promo (model 9 / showcases 9). |
| `sections/product-compare-data.liquid` | Payload compare em `<textarea hidden>` (evita JSON visível). |
| `sections/product-compare-panel.liquid` | Painel flutuante comparador. |
| `sections/mega-menu-ar.liquid` | Markup mega menu. |
| `sections/sidenav-overlay-favorites.liquid` | Overlay favoritos. |

### 3.5 Sections — PDP (se usar layout conversão v2)

| Arquivo | Função |
|---------|--------|
| `sections/product-content.liquid` | Wrapper `#product-pdp-v2`, compare na PDP, blocos SDA. |
| `sections/product-descriptions-v2.liquid` | Descrições PDP (se referenciado no content). |
| `sections/product-pdp-spec-bar.liquid` | Barra de specs ícones. |
| `sections/product-pdp-cycle-class.liquid` | Classe ciclo frio/QF. |
| `sections/sda-pdp-recommendation.liquid` | Caixa m² / recomendação. |
| `sections/sda-pdp-trust.liquid` | Selos confiança (se incluído no content). |
| `sections/pdp-icon-svg.liquid` | Ícones inline PDP. |
| `sections/product-spec-icons.liquid` | Specs ícones produto. |
| `sections/sda-card-btu-line.liquid` | Linha BTU no card (se usado). |

### 3.6 Templates / header (validar no tema **atual** antes de copiar)

| Arquivo | Nota |
|---------|------|
| `sections/header.liquid` | No repo local pode ser header “clássico”. Se na loja hoje aparece **`header-v2`**, exporte o `header.liquid` **da loja** para o tema novo + publique `header-v2.css`. |
| `templates/search.liquid` | Só se tiver alterações SDA (filtros, classes `search-main`, etc.) — compare diff com o base do tema novo. |
| `templates/home.liquid` | Idem — normalmente igual ao base WDNA. |

### 3.7 Logos marcas (mega menu)

Se o mega menu referencia SVGs de marca, copie também de `assets/brand-logo-*.svg` (presentes em backups em `docs/wdna/backups/...` se faltarem na raiz).

---

## 4. Copiar via script (repo → pasta local do tema)

```bash
# Exemplo: você descompactou o tema novo em ~/wdna/site-do-ar-novo
./docs/wdna/pacote-sda/copiar-para-tema.sh ~/wdna/site-do-ar-novo
```

Depois suba os arquivos alterados no editor WDNA do **tema novo** (ou sync pelo fluxo que você usar).

Lista exata de paths: `docs/wdna/pacote-sda/MANIFEST.txt`.

---

## 5. Checklist pós-migração (antes de ativar o tema)

1. **Network / HTML:** 8 folhas CSS custom + `showcase-product-card.css` **depois** de `product-page-v2.css`.
2. **Home:** carrossel “Os mais vendidos” — 2 cards largura total; grade promo 2 colunas.
3. **Busca:** grade 2 col mobile, comparar + coração, sem JSON visível.
4. **Comparador:** 3 produtos, painel abre/fecha.
5. **PDP:** `#product-pdp-v2`, sticky `.sda-pdp-sticky-buy`, relacionados com mesmo card.
6. **Header:** sem ícone SVG gigante; se v2, `header-v2.css` carregado.
7. **Mega menu:** abre, links e marcas OK.

---

## 6. Estratégia recomendada (zero controlado)

1. Tema novo = base WDNA **+ pacote SDA** (§3).
2. **Não** colar CSS de card no painel `theme-custom` sem escopo.
3. Card remodelado: dono = `showcase-product-card.css` + `showcase-model-product.liquid` (ver `CARD-ARQUIVOS-ATIVOS.md`).
4. Tema **antigo** fica intacto até o smoke §5 passar; aí você troca o tema ativo.

---

## 7. Documentação de apoio

| Doc | Uso |
|-----|-----|
| `CARD-ARQUIVOS-ATIVOS.md` | Ordem CSS e dono do card |
| `RECUPERACAO-SITE/LEIA-PRIMEIRO.md` | Header v2 + compare mínimo |
| `VALIDACAO-POS-PUBLICACAO.md` | Smoke após publish |

**Atualizado:** 26 out 2026 (America/Sao_Paulo)
