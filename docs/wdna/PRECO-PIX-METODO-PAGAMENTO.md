# Preço Pix — desconto no método de pagamento (não na tabela)

## Configuração no painel WDNA

- **Tabela de preço:** preço cheio (sem desconto Pix)
- **Método Pix:** 5% de desconto no pagamento

Isso evita o bug de **10% off** (5% na tabela + 5% no Pix).

## Como o tema exibe

O Liquid **calcula** o preço Pix para exibição:

```
preço Pix = preço da tabela − 5%
```

**Não usa** `product.primaryPrice` (evita tabela Mercado Livre no admin).

## Arquivos para colar no WDNA

| # | Arquivo | O que faz |
|---|---------|-----------|
| 1 | `sections/showcase-model-product.liquid` | Cards da vitrine com Pix |
| 2 | `sections/product-content.liquid` | Página do produto com Pix |
| 3 | `assets/mega-menu.css` | Estilos do badge verde Pix |

Links (branch atual):

- https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/mobile-restore-ed4c/sections/showcase-model-product.liquid
- https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/mobile-restore-ed4c/sections/product-content.liquid
- https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/mobile-restore-ed4c/assets/mega-menu.css

## O que deve aparecer

**Página do produto (ex. R$ 3.675,00):**

- ~~R$ 3.675,00~~ (riscado)
- **R$ 3.491,25** (preço Pix)
- `5% de desconto no Pix`
- `6x de R$ 612,50 no cartão` (parcela no preço cheio — correto)

**Cards da vitrine:** mesmo padrão + badge verde.

## Se mudar o % do Pix no painel

Edite `pixPercentCard = 5` em `showcase-model-product.liquid` e `_pixPercent = 5` em `product-content.liquid`.

## Legado — desconto na tabela

Se um produto ainda tiver `promotionMargin` / `promotionPrice` na tabela, o tema usa esses valores (não soma 5% de novo).
