# PDP v2 — checklist vs mock (desktop + mobile)

Referência visual: mockups aprovados + `.cursor/preview/product-page.html`.

## Por que quebrava fora do mock

| Sintoma | Causa | Correção |
|--------|--------|----------|
| Faixa cinza sob a foto | Classe `.product-gallery_list` — o JS do tema (Tiny Slider) esvazia o nó e deixa placeholder | Markup estático: `.product-gallery_pdp` > `.product-pdp-thumbs` > `.product-pdp-thumbs_list` (sem `product-gallery_list`) |
| Título / layout mobile estranho | `show-lg` / `hide-lg` do tema **invertem** visibilidade | Remover essas classes; só CSS `#product-pdp-v2` / `.product-v2` |
| Vão enorme antes dos botões | `.col-12` do theme-all = 100% width + margens; preço em coluna no desktop | Reset `col-12` no card; preço + qtd na mesma linha; `gap: 10px` no `.product-header-box` |
| Destaques ≠ mock | Pills de vitrine | `product-highlights` (ícone + texto) |
| Specs desktop | Tabela oculta / só barra | Barra + tabela WDNA sempre visíveis |

## Arquivos WDNA (sempre juntos)

1. `assets/product-page-v2.css`
2. `sections/product-content.liquid`
3. `sections/product-descriptions-v2.liquid`
4. `sections/product-spec-icons.liquid` (modo `pdpHighlights: true`)
5. `sections/product-pdp-spec-bar.liquid`

## Conferência rápida pós-deploy

- [ ] Miniaturas abaixo da foto (produto com 2+ imagens)
- [ ] Desktop: título só no card da direita; mobile: título acima da foto
- [ ] Preço + quantidade na mesma linha
- [ ] Comprar / Comparar com ~10px entre si; CEP logo abaixo
- [ ] Descrição ~58% + Destaques ~38% no desktop
- [ ] Especificações: barra 4 itens + tabela completa
