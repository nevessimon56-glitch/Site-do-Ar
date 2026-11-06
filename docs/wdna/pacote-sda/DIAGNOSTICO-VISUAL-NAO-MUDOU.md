# Subi os arquivos e o visual não mudou — checklist WDNA

Siga **na ordem**. Pare no primeiro item que falhar.

---

## 1. Tema certo está **ativo**?

No painel WDNA: **Aparência → Temas**.

- O tema onde você colou os arquivos precisa estar **Publicado / Ativo** (não só “rascunho”).
- Abra a loja em **aba anônima** depois de ativar.
- Preview de tema **não ativo** = você vê o tema antigo.

---

## 2. `layout/theme.liquid` foi publicado?

Sem este arquivo, **nenhum** CSS novo entra no HTML.

**Ver código-fonte da home** (Ctrl+U) e busque:

| Buscar | Se **não** achar |
|--------|------------------|
| `showcase-product-card.css` | `theme.liquid` não está ativo ou links não foram salvos |
| `sda-conversion-redesign.css` | Idem |
| `mega-menu.js` (defer) | Idem |

Opcional: busque `SDA-THEME-MARKER-v3` — marcador que prova o layout certo (commit recente).

---

## 3. Markup do card é o novo?

No código-fonte da home, busque:

| Buscar | Significado |
|--------|-------------|
| `sda-product-card--v2` | OK — `sections/showcase-model-product.liquid` publicado |
| `data-showcase-tpl="v4-card-remodel"` | OK — mesmo liquid |
| Só `class="showcase-product card"` **sem** `sda-product-card` | Liquid **não** foi substituído ou vitrine usa outro template |

---

## 4. CSS chegou na CDN (não está vazio / 404)?

DevTools → **Network** → recarregar → filtrar `showcase-product-card`:

- Status **200**
- Tamanho **~15–25 KB** (não 0 bytes, não HTML de erro)
- Abrir preview: deve começar com comentário `SDA v3` / `CARD-UNIFORM`

Repita para `mega-menu.css` — SDA v3 ≈ **~80–120 KB** transferido (texto ~3k linhas).  
Se mega-menu ainda tiver **centenas de KB** e regras `PRODUCT-CARD-v2`, você subiu arquivo **antigo**.

---

## 5. Caminho dos arquivos no editor WDNA

Cada arquivo na **raiz do tema**, não dentro de `tema-sda-ultimo/`:

| Certo | Errado |
|-------|--------|
| `assets/showcase-product-card.css` | `assets/tema-sda-ultimo/showcase-product-card.css` |
| `layout/theme.liquid` | `theme.liquid` solto na raiz |
| `sections/showcase-model-product.liquid` | pasta errada |

---

## 6. Cache

- Ctrl+Shift+R na home
- WDNA às vezes demora minutos no CSS — teste com `?v=teste123` na URL

---

## 7. O que **não** muda só com CSS

| Expectativa | Precisa de |
|-------------|------------|
| Header v2 layout | `header.liquid` da loja com `header-v2` + `header-v2.css` |
| PDP nova | `sections/product-content.liquid` + abrir **página de produto** |
| Home igual ao antigo | Vitrines usam `showcase-model-*.liquid` do **base** — só o **card** vem de `showcase-model-product.liquid` |

---

## 8. Teste rápido (30 s)

1. Ativar tema novo  
2. Código-fonte: `showcase-product-card.css` + `sda-product-card--v2`  
3. Se (2) OK e visual igual → Network no CSS (item 4)  
4. Se (2) falha → republicar `theme.liquid` + `showcase-model-product.liquid`

---

**Pacote correto:** `docs/wdna/pacote-sda/tema-sda-ultimo/` ou ZIP na branch `cursor/card-remodel-b192`.
