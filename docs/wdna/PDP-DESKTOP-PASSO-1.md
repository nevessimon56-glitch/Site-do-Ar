# PDP — Desktop primeiro (passo 1)

Mobile fica para depois. Este passo só vale para **≥992px**.

## Bug que deixava “igual ao layout antigo”

No `product-content.liquid` as colunas estavam assim:

```html
<div class="product-header-left col-7 col-lg-12 column">
<div class="product-header-right col-5 col-lg-12 column">
```

No grid do tema, **`col-lg-12` = 100% de largura em telas grandes**. Resultado: foto e card de compra **empilhados**, não lado a lado como no mock — mesmo colando CSS novo.

## Correção obrigatória no Liquid

```html
<div class="product-header-left col-7 col-lg-7 column">
<div class="product-header-right col-5 col-lg-5 column">
```

Sem substituir o `product-content.liquid` inteiro, **só trocar essas duas linhas** já muda o desktop.

## CSS

`assets/product-page-v2.css` — bloco `#product-pdp-v2` dentro de `@media (min-width: 992px)` (grid 56/40, ref+estoque na mesma linha, preço+qtd, thumbs flex).

## Ordem no WDNA

1. `sections/product-content.liquid` (col-lg-7 / col-lg-5 + galeria `product-pdp-thumbs` se ainda não tiver)
2. `assets/product-page-v2.css`
3. Confirmar link no `theme.liquid` **depois** de `theme-custom.css`

## Conferir no desktop

- [ ] Foto à esquerda (~56%), card cinza à direita (~40%)
- [ ] Miniaturas em fila abaixo da foto (2+ imagens no produto)
- [ ] Ref. à esquerda, disponibilidade à direita no topo do card
- [ ] Preço + quantidade na mesma linha; Comprar / Comparar com ~10px entre si
