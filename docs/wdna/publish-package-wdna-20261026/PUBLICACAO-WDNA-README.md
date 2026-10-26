# Pacote de publicação WDNA — Site do Ar

**Gerado:** 26 out 2026 (America/Sao_Paulo)  
**Base Git:** commit `7b82ab0` (+ `assets/theme-all.css` local validado)  
**Não inclui:** `docs/wdna/backups/` (somente repositório interno)

## Ordem recomendada de upload no editor WDNA

1. `assets/theme-all.css`
2. `assets/theme-custom.css`
3. Demais `assets/*.css` e `assets/*.js`
4. `sections/*.liquid`
5. `layout/theme.liquid` (por último — exige editor de layout)

## Referências cruzadas (todas resolvidas neste pacote)

| Origem | Aponta para |
|--------|-------------|
| `layout/theme.liquid` | `mega-menu.css/js`, `product-compare.css/js`, `product-hover-image.css/js`, `theme-all`, `theme-custom`, `theme-plugins`, `theme.js`, `theme-defer.js` (estes **não** estão no pacote — já na loja) |
| `layout/theme.liquid` | `{% render 'sections/mega-menu-ar' %}`, `product-compare-panel`, `check-cookie`, `sidenav-overlay-cart`, `theme-schema` (exceto os dois primeiros, já na loja) |
| `sections/showcase-model-product.liquid` | `product-spec-icons`, `product-compare-data` |

## `theme-all.css`

SHA-256: `ef9ae0a673cb36a129dc1a3c4a983891b3c154873760b771d8a5022ab54fd353`  
Idêntico a `docs/wdna/backups/pre-publish-theme-all-worktree.css` (323 071 bytes).

## Validação visual

Pendente no ambiente WDNA após upload — este pacote **não** substitui smoke test na loja.
