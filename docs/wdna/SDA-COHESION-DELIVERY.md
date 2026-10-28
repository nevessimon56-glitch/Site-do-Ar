# Entrega — coesão visual SDA (preview / branch)

**Produção:** nada foi publicado na WDNA. Alterações apenas no Git (`cursor/card-remodel-b192`).

## Estrutura atual (preservada)

| Camada | Responsabilidade | Contratos |
|--------|------------------|-----------|
| `sections/showcase-model-product.liquid` v5 | Markup card: imagem → specs → título → preços → Comprar → Comparar | `data-showcase-tpl="v5-zero"`, `data-compare-id`, `onclick="handleAddToCart('id')"`, `product-compare-data` |
| `assets/sda-card.css` | Visual único vitrine `.sda-card` | Sem alterar preços Liquid |
| `assets/product-page-v2.css` | PDP `#product-pdp-v2.product-v2` | Classes WDNA existentes |
| `assets/sda-conversion-redesign.js/css` | Sticky PDP, filtros, coluna ações | `body.sda-pdp-mobile`, `sda-pdp-sticky-on` |
| `assets/product-compare.js/css` | Até 3 produtos, barra + painel | `has-compare-bar`, `compare-panel-open`, JSON oculto |
| `assets/mega-menu.js/css` | Dock mobile `mobile-catalog-dock`, nav | `has-mobile-catalog-dock` |

## O que mudou nesta entrega

1. **`assets/sda-tokens.css`** — tokens partilhados (cor primária, superfície, tipografia, alturas de card, camadas mobile).
2. **`layout/theme.liquid`** — carrega `sda-tokens.css` antes da pilha SDA; marcador `SDA-ZERO-v2`.
3. **Cards** — favorito fora da área da foto; seletores CSS de altura uniforme corrigidos; parcelas compactas no mobile; CTA primária via tokens.
4. **PDP** — fundo alinhado à home; CTA compra = gradiente primário; overflow horizontal contido em tabelas mobile.
5. **Nav mobile PDP** — oculta faixa de chips + nav azul fixa quando não expandida (`body.sda-pdp-mobile`).
6. **Comparador** — usa tokens de altura (barra acima do dock — commit anterior + tokens).

Preview local: `docs/preview/sda-cohesion-preview.html`

## Checklist de regressão

| # | Teste | Resultado esperado | Notas |
|---|--------|-------------------|--------|
| 1 | Cards desktop 1440px | Alturas alinhadas, preço + Comprar + Comparar | Preview local + inspeção CSS |
| 2 | Cards mobile 375px | 2 colunas, touch 44px, sem overflow X | Preview local |
| 3 | Comparador 3 itens + dock | Barra acima do dock | CSS + preview com `has-compare-bar` |
| 4 | PDP sticky mobile | Não cobre dock/compare | Regras em conversion + page-v2 |
| 5 | Payload compare oculto | `product-compare-data` display none | Inalterado |
| 6 | handleAddToCart / data-compare-id | Handlers intactos | Liquid preservado |
| 7 | Compra real | Não executada | — |

## Dependências externas

- Visual no domínio público só muda após upload do pacote WDNA e ativação do tema preview.
- Carrinho/frete/stock: validar na loja após deploy.
