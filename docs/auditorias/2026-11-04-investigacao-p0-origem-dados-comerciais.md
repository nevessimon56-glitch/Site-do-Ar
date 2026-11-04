# INVESTIGAÇÃO P0 — Origem dos dados comerciais

**Loja:** Site do Ar — `sitedoar.com.br`  
**Tema auditado:** Site do ar (Novo), tema 3  
**Data:** 04/11/2026  
**Modo:** somente leitura para a investigação; nenhuma correção foi mantida no tema.  
**Produto de referência:** Hitachi Air Core 600, produto `190`, SKU `SPC48B3IV`.

## Escopo e estado da loja

Esta investigação compara exclusivamente a origem e a estrutura dos dados usados pelos cards e pela página individual. A tentativa anterior em `sections/product-content.liquid` foi revertida e validada publicamente. O PDP voltou a apresentar:

- preço principal: **R$ 12.621,05**;
- indicação: **5% DE DESCONTO NO PIX**;
- cartão: **6x de R$ 2.103,51 no cartão**.

O backup do tema foi concluído antes da tentativa anterior:

- processo WDNA: `89b25a9b`;
- tema: **Site do ar (Novo)**, tema 3;
- exportação: 110 itens;
- status: 100%;
- arquivo local: `site-do-ar-(novo)-20261104132223503.zip`.

A restauração foi confirmada no editor: o bloco original voltou a conter `productPricePrimary`, `product.price.promotionMargin`, `product.price.promotionPrice`, o fallback visual de 5% e a ausência do resolvedor experimental.

## Causa confirmada em uma frase

O card seleciona uma fonte de preço de site, podendo percorrer `product.prices` e escolher um grupo não-Mercado Livre que possui `promotionPrice`; a página individual não percorre `product.prices` e calcula a apresentação a partir de `product.price`/`product.primaryPrice`, cujo valor promocional não aparece disponível nesse contexto para o produto analisado.

## Evidência pública decisiva

O card do produto 190 contém um `textarea.product-compare-json` renderizado por `sections/product-compare-data`. O JSON exposto no card foi:

```json
{
  "id": 190,
  "pixPrice": 11989.9975,
  "listPrice": 12621.05
}
```

O mesmo tipo de JSON renderizado dentro do cabeçalho da página individual foi:

```json
{
  "id": 190,
  "pixPrice": 12621.05,
  "listPrice": 12621.05
}
```

A hierarquia DOM confirmou os contextos:

- JSON `pixPrice: 12621.05`: dentro de `.product-header-right`, associado ao bloco `product-prices` do PDP;
- JSON `pixPrice: 11989.9975`: dentro de `.showcase-product.card`, associado ao rodapé do card.

Portanto, a diferença não é causada por arredondamento, CSS ou formatação monetária. O card recebe uma promoção real no valor de entrada do componente; o PDP recebe o preço de lista como `mainPrice`/`comparePixPrice`.

## 1. `product.price`

### No card

`sections/showcase-prices.liquid` inicia com:

```liquid
{% assign sitePrice = product.price %}
```

Em seguida, verifica `product.price.priceGroupName`, `product.price.price`, `product.price.promotionMargin` e `product.price.promotionPrice`. Se o grupo atual parecer Mercado Livre, ou se o preço for zero/nulo, o card tenta resolver outro item em `product.prices`.

### No PDP

`sections/product-content.liquid` preserva explicitamente:

```liquid
{% assign mainPrice = product.price.price %}

{% if product.price.promotionPrice > 0 %}
  {% assign mainPrice = product.price.promotionPrice %}
{% endif %}
```

Mais abaixo, o preço visual usa novamente `product.price.price` como `_listPrice` e usa `productPricePrimary` para `_pixPrice`.

### Evidência de comportamento

No PDP do produto 190, o bloco renderizado mostrou `R$ 12.621,05` como preço principal. O JSON de comparação do PDP também recebeu `pixPrice: 12621.05` e `listPrice: 12621.05`.

**Conclusão:** neste contexto, `product.price` fornece o preço-base de `12621.05` e não forneceu um `promotionPrice` positivo aproveitado pelo PDP.

## 2. `product.primaryPrice`

O PDP define:

```liquid
{% assign productPricePrimary = product.price %}

{% if product.primaryPrice %}
  {% assign productPricePrimary = product.primaryPrice %}
{% endif %}
```

Depois usa:

```liquid
{% assign _pixPrice = productPricePrimary.price %}
{% if productPricePrimary.promotionPrice > 0 %}
  {% assign _pixPrice = productPricePrimary.promotionPrice %}
{% endif %}
```

Também consulta `productPricePrimary.discountPercentage` e, como fallback, `product.primaryPrice.discountPercentage`.

**O que foi comprovado:** essa propriedade é referenciada pelo Liquid do PDP e participa da precedência visual quando existe. Porém, o ambiente público não expõe o objeto Liquid original em JSON completo. Não foi possível afirmar, somente pelo DOM, se `product.primaryPrice` existe para o produto 190, quais são todos os seus campos ou se ele aponta para o mesmo grupo escolhido pelo card.

**Conclusão:** `product.primaryPrice` é uma hipótese relevante de divergência, mas sua estrutura interna não foi diretamente observável com segurança. Não deve ser tratada como equivalente a `sitePrice` sem inspeção própria do contexto Liquid.

## 3. `product.prices`

O card é o único dos dois componentes analisados que percorre explicitamente `product.prices`:

```liquid
{% if needsResolve and product.prices.size > 0 %}
  {% assign sitePrice = nil %}
  {% for pg in product.prices %}
    {% if pg.price > 0 %}
      ...
      {% if pgIsMl == false %}
        {% if sitePrice == nil %}
          {% assign sitePrice = pg %}
        {% elsif pg.promotionMargin > 0 and pg.promotionPrice != null and pg.promotionPrice > 0 %}
          ...
          {% assign sitePrice = pg %}
        {% endif %}
      {% endif %}
    {% endif %}
  {% endfor %}
{% endif %}
```

O card usa os seguintes campos de cada item percorrido:

- `pg.price`;
- `pg.priceGroupName`;
- `pg.promotionMargin`;
- `pg.promotionPrice`.

O JSON público do card comprova que essa seleção resultou em `pixPrice: 11989.9975` e `listPrice: 12621.05` para o produto 190.

O trecho original auditado do PDP não percorre `product.prices`. Portanto, mesmo que `product.prices` contenha o grupo promocional usado no card, ele não entra na precedência do PDP.

**Conclusão confirmada:** há uma diferença de algoritmo entre os componentes. O card tem acesso/uso de uma coleção de grupos de preço; o PDP não usa essa coleção na lógica original auditada.

## 4. `product.secondaryPrice`

### No card

O card usa `product.secondaryPrice` somente para parcelamento:

```liquid
{% if product.secondaryPrice %}
  {% if product.secondaryPrice.installment > 1 %}
    {% assign plotBasePrice = listPriceCard %}
    {% if product.secondaryPrice.price and product.secondaryPrice.price > plotBasePrice %}
      {% assign plotBasePrice = product.secondaryPrice.price %}
    {% endif %}
    {{ plotBasePrice | divided_by: product.secondaryPrice.installment | money }}
  {% endif %}
{% endif %}
```

Campos efetivamente referenciados:

- `secondaryPrice.installment`;
- `secondaryPrice.price`;
- `secondaryPrice.installmentValue` não é usado no card; o card calcula a parcela dividindo a base.

### No PDP

O PDP copia:

```liquid
{% if product.secondaryPrice %}
  {% assign productPriceSecond = product.secondaryPrice %}
{% endif %}
```

E renderiza:

```liquid
{% if productPriceSecond.installment > 1 %}
  {{ productPriceSecond.installment }}x de {{ productPriceSecond.installmentValue | money }} no cartão
{% else %}
  ou {{ _mainPriceSecond | money }} à vista
{% endif %}
```

No produto 190, a saída pública foi **6x de R$ 2.103,51 no cartão**.

**Conclusão:** o parcelamento também tem regras diferentes de apresentação. O card calcula a parcela com uma base derivada de `listPriceCard`; o PDP exibe `productPriceSecond.installmentValue`. Isso não prova que o valor cobrado seja diferente, mas prova que a camada visual não usa a mesma fórmula.

## 5. `promotionPrice`

O card usa `sitePrice.promotionPrice` quando:

```liquid
sitePrice.promotionMargin > 0
and sitePrice.promotionPrice != null
```

Nesse caso:

```liquid
{% assign pixPriceCard = sitePrice.promotionPrice %}
```

Para o produto 190, o resultado efetivo foi `11989.9975`, exibido como **R$ 11.990,00 no Pix**.

O PDP verifica `productPricePrimary.promotionPrice` e também `product.price.promotionPrice` em um bloco separado. Entretanto, para o produto 190, o resultado do PDP foi `12621.05`, sem preço promocional aplicado ao valor principal.

**Conclusão:** `promotionPrice` existe como conceito e é efetivamente usado no card, mas a propriedade consultada pelo PDP não resolveu para o mesmo registro promocional no teste observado.

## 6. `promotionMargin`

O card usa `promotionMargin` para decidir se há promoção e para definir o percentual visual:

```liquid
{% assign pixPercentCard = sitePrice.promotionMargin | round %}
```

No card do produto 190, a etiqueta visual foi **5% de desconto no Pix**.

O PDP também consulta `product.price.promotionMargin`, mas somente dentro da lógica de `product.price`, não dentro da resolução de `product.prices`. Quando não encontra um percentual, o código original possui fallback visual para 5% caso haja indícios de desconto ou grupos de preço:

```liquid
{% if _pixBadgePct == 0 %}
  {% if _hasPixDiscount or product.primaryPrice or product.secondaryPrice or productPriceSecond %}
    {% assign _pixBadgePct = 5 %}
  {% endif %}
{% endif %}
```

Depois, o PDP força a exibição da etiqueta:

```liquid
{% assign _showPixBadge = true %}
```

**Conclusão:** no PDP, o percentual de 5% pode aparecer como comunicação visual mesmo quando o preço promocional correspondente não foi usado como `_displayPrice`. Isso explica por que o PDP mostra preço cheio mais “5% de desconto no Pix”, enquanto o card mostra o preço já reduzido.

## 7. `productPricePrimary`

`productPricePrimary` é uma variável local criada no PDP. Ela começa como `product.price` e pode ser substituída por `product.primaryPrice`.

Sua finalidade atual é alimentar o cálculo visual de `_pixPrice` e o percentual de desconto. Ela não é usada para resolver a coleção `product.prices`.

**Conclusão:** `productPricePrimary` não é uma fonte comercial independente. É um alias com precedência local do PDP, cuja origem pode ser `product.price` ou `product.primaryPrice`. O nome não garante equivalência com o `sitePrice` resolvido no card.

## 8. `mainPrice`

`mainPrice` é criado no início de `sections/product-content.liquid` e possui um comentário explícito para não ser alterado:

```liquid
<!-- TODO: Não alterar mainPrice. Se caso alterar, vai afetar no calculo de pagamento-->
```

A regra é:

```liquid
{% assign mainPrice = product.price.price %}
{% if product.price.promotionPrice > 0 %}
  {% assign mainPrice = product.price.promotionPrice %}
{% endif %}
```

Mais tarde, o PDP passa `mainPrice` ao componente de comparação:

```liquid
{% assign comparePixPrice = mainPrice %}
{% render 'sections/product-compare-data', product: product, pixPrice: comparePixPrice, listPrice: compareListPrice %}
```

No produto 190, o JSON de comparação do PDP confirmou que `mainPrice` chegou como `12621.05`.

**Conclusão:** `mainPrice` é uma variável sensível. Não deve ser alterada como solução visual sem confirmar sua ligação com o fluxo de pagamento e o preço efetivamente enviado ao carrinho.

## Matriz de precedência observada

### Card

1. começa em `product.price`;
2. identifica grupo Mercado Livre por `priceGroupName`;
3. se necessário, percorre `product.prices`;
4. exclui grupos cujo nome contém `mercado`, `marketplace` ou `meli`;
5. seleciona um grupo de site com preço válido;
6. usa `sitePrice.promotionPrice` quando `promotionMargin > 0`;
7. usa `product.secondaryPrice` para parcelas, com base própria.

### PDP

1. define `mainPrice` a partir de `product.price`;
2. usa `product.price.promotionPrice` apenas se for positivo;
3. define `productPricePrimary = product.price`;
4. substitui por `product.primaryPrice` se disponível;
5. usa `productPricePrimary.price` e `productPricePrimary.promotionPrice` no bloco visual;
6. consulta `product.price.promotionMargin` em uma regra separada;
7. não percorre `product.prices`;
8. usa `product.secondaryPrice.installmentValue` para o cartão;
9. envia `mainPrice` para `product-compare-data`.

## O que está comprovado e o que ainda não está

### Comprovado

- O card e o PDP renderizam JSONs com valores diferentes para o mesmo produto.
- O card efetivo usa `pixPrice: 11989.9975` e `listPrice: 12621.05`.
- O PDP efetivo usa `pixPrice: 12621.05` e `listPrice: 12621.05`.
- O card percorre `product.prices`; o bloco original do PDP não percorre.
- O card usa `sitePrice.promotionPrice`; o PDP usa `productPricePrimary.promotionPrice`/`product.price.promotionPrice`.
- O card e o PDP têm regras diferentes para parcelamento.
- `mainPrice` é tratado pelo tema como sensível ao cálculo de pagamento.
- A tentativa anterior de alterar essa lógica foi revertida e não está mais ativa.

### Ainda não comprovado

- O conteúdo completo dos objetos Liquid `product.price`, `product.primaryPrice`, `product.prices` e `product.secondaryPrice` no contexto do PDP.
- O nome exato do grupo de preço que gerou `11989.9975` no card.
- Se `product.primaryPrice` no PDP é nulo, igual ao preço-base ou um objeto sem a promoção escolhida pelo card.
- Se a plataforma expõe `product.prices` em todos os contextos ou se a coleção é montada apenas para vitrines/listagens.
- Se o valor final do Pix no checkout é calculado pelo mesmo grupo do card ou por uma regra posterior da plataforma.

Não foram inventadas propriedades para preencher essas lacunas. As propriedades citadas são apenas as referenciadas pelos componentes Liquid auditados ou observadas nos JSONs públicos renderizados.

## Limitação da plataforma identificada

Não é possível concluir, somente pelo HTML público, que os objetos Liquid tenham a mesma forma em todos os templates. O card recebe um contexto de vitrine que permite a seleção de grupo em `product.prices`. O PDP recebe um contexto de produto que usa `product.price`/`product.primaryPrice` no código auditado. A diferença pode resultar de:

1. coleções diferentes disponibilizadas pelo backend em cada contexto;
2. campos presentes, mas não preenchidos no objeto usado pelo PDP;
3. regras de preço do tema que foram implementadas separadamente;
4. uma combinação desses fatores.

A evidência atual confirma a divergência de dados entregues aos componentes, mas não permite afirmar qual dessas quatro causas é responsável pela montagem backend sem uma forma oficial de inspeção do objeto Liquid ou documentação da WDNA.

## Menor alteração possível — ainda não autorizada

A menor alteração segura não é alterar `mainPrice` nem criar um resolvedor experimental. Primeiro seria necessário confirmar se `product.prices` existe no PDP e qual item corresponde ao `sitePrice` do card.

Se a coleção estiver comprovadamente disponível no PDP, a menor correção seria reutilizar uma resolução centralizada apenas para apresentação, mantendo `mainPrice`, carrinho, checkout e valores de pagamento intactos. Se a coleção não estiver disponível no PDP, a correção precisa ocorrer na origem/configuração comercial da plataforma ou por uma variável oficial compartilhada, não por uma suposição no Liquid.

Nenhuma dessas correções foi aplicada nesta etapa.

## Arquivos auditados

- `sections/showcase-prices.liquid`;
- `sections/product-content.liquid`;
- `sections/product-compare-data.liquid` por meio do JSON público renderizado;
- `sections/checkout-order-summary.liquid`;
- página pública da vitrine;
- página pública do produto 190.

## Referências públicas

- [Página pública do produto 190](https://sitedoar.com.br/ar-condicionado-split-piso-teto-inverter-46000-btus-hitachi-air-core-600-quente-frio-spc48b3iv-220v-p190)
- [Vitrine pública do Site do Ar](https://sitedoar.com.br/)
- [Editor do tema 3 no painel WDNA](https://sitedoar.com.br/dashboard/personalize/themes/edit/3)
- [Processos do painel WDNA](https://sitedoar.com.br/dashboard/process/list)

## Status

**Investigação P0 concluída em modo somente leitura.** A causa da divergência de apresentação foi confirmada no nível dos valores efetivamente enviados aos dois componentes. Nenhum arquivo do tema foi alterado nesta investigação. Aguardar autorização explícita para elaborar a Fase 2 — Planejamento.
