# TAREFA 03 — Verificação de viabilidade da correção P0

**Loja:** Site do Ar — `sitedoar.com.br`  
**Tema:** Site do ar (Novo), tema 3  
**Data:** 04/11/2026  
**Modo:** investigação somente de leitura. Nenhum arquivo do tema foi alterado, criado, salvo ou excluído.

## Conclusão

A correção é **tecnicamente viável apenas de forma condicional**.

A menor solução segura seria criar uma variável exclusivamente visual no PDP, derivada da mesma fonte de preço promocional usada pelo card, sem alterar `mainPrice`, carrinho, checkout, estoque, pagamento ou valor enviado à compra. Porém, a investigação somente de leitura não consegue provar que `product.prices` esteja disponível e preenchido no contexto de `sections/product-content.liquid`.

Portanto, não é seguro implementar um resolvedor no PDP neste momento. A próxima etapa precisa confirmar a disponibilidade real da coleção no contexto Liquid do produto ou obter uma variável oficial compartilhada pela WDNA.

## Evidência principal

Para o produto Hitachi, ID `190`, foram observados dois JSONs públicos de comparação:

### Card

O JSON dentro de `.showcase-product.card` apresentou:

```json
{
  "id": 190,
  "pixPrice": 11989.9975,
  "listPrice": 12621.05
}
```

O card exibe aproximadamente **R$ 11.990,00 no Pix**.

### Página individual

O JSON dentro de `.product-header-right`, associado ao bloco do PDP, apresentou:

```json
{
  "id": 190,
  "pixPrice": 12621.05,
  "listPrice": 12621.05
}
```

A página individual exibe **R$ 12.621,05** como preço principal e mostra separadamente **5% de desconto no Pix**.

A diferença é anterior ao CSS e à formatação monetária. Os componentes receberam valores diferentes.

## 1. `product.prices` no contexto do PDP

### O que foi comprovado

`sections/showcase-prices.liquid` percorre explicitamente `product.prices` quando precisa resolver o grupo de preço do site. O algoritmo usa:

- `pg.price`;
- `pg.priceGroupName`;
- `pg.promotionMargin`;
- `pg.promotionPrice`.

O mesmo algoritmo não aparece no bloco original de `sections/product-content.liquid`.

### O que não foi possível comprovar em modo somente leitura

O HTML público não expõe o objeto Liquid completo do PDP. O JSON de comparação mostra o resultado final, mas não informa diretamente se `product.prices` existia, estava vazio ou simplesmente não foi consultado pelo template.

Assim, há duas possibilidades ainda abertas:

1. `product.prices` não é disponibilizado ou não é preenchido no contexto do PDP;
2. `product.prices` está disponível, mas o template original não o utiliza.

A investigação confirma a ausência de uso no código original, mas não permite afirmar a disponibilidade estrutural da coleção no backend.

## 2. Compatibilidade da estrutura dos grupos

A estrutura usada pelo card é compatível, em termos de propriedades referenciadas, com a ideia de um grupo comercial:

```liquid
pg.price
pg.priceGroupName
pg.promotionPrice
pg.promotionMargin
```

Entretanto, não foi possível inspecionar diretamente um objeto `pg` do PDP. Não se deve presumir que `product.primaryPrice`, `product.price` e um item de `product.prices` sejam o mesmo objeto ou tenham a mesma precedência.

A investigação anterior também confirmou que o PDP usa `product.secondaryPrice` com uma estrutura própria para cartão, enquanto o card calcula a parcela com outra base. Isso reforça que objetos com nomes semelhantes não devem ser tratados como equivalentes sem evidência.

## 3. Identificação confiável do grupo promocional

O card identifica grupos que não parecem pertencer ao Mercado Livre por meio de uma comparação textual de `priceGroupName`:

```liquid
{% if pgNameLower contains 'mercado'
   or pgNameLower contains 'marketplace'
   or pgNameLower contains 'meli' %}
  {% assign pgIsMl = true %}
{% endif %}
```

Esse método é funcional para o card observado, mas não é uma garantia universal de identidade comercial. Ele depende do texto do nome do grupo e não de um identificador oficial documentado.

Para o produto 190, o resultado público confirma que o card encontrou um preço promocional válido. O nome exato do grupo que produziu `11989.9975` não foi exposto publicamente.

**Conclusão:** a identificação é observável e repetível no card, mas ainda não é comprovadamente confiável no PDP. Reutilizá-la no PDP sem confirmar o mesmo conjunto de grupos poderia escolher um registro errado ou não escolher nenhum.

## 4. Produtos com e sem promoção

Foi consultada a listagem pública geral e foram extraídos 12 registros de `product-compare-json` na página carregada.

Os produtos comercialmente válidos observados apresentaram `listPrice > pixPrice`, por exemplo:

```json
{
  "id": 64,
  "listPrice": 4563.39,
  "pixPrice": 4335.2205,
  "diff": 228.1695
}
```

```json
{
  "id": 85,
  "listPrice": 6520.39,
  "pixPrice": 6194.3705,
  "diff": 326.0195
}
```

O único registro com `diff: 0` na amostra foi:

```json
{
  "id": 205,
  "listPrice": 0,
  "pixPrice": 0
}
```

Esse registro não representa um produto vendável sem promoção, pois os dois preços estão zerados. Não foi encontrado, na amostra pública carregada, um produto válido com `listPrice == pixPrice > 0`.

### Comportamento esperado pelo código

Com promoção válida:

- card: usa `promotionPrice` como preço Pix e `price` como preço de lista;
- PDP original: pode manter o preço-base como principal e mostrar apenas o percentual do Pix.

Sem promoção válida:

- card: cai no preço normal, sem bloco promocional de Pix;
- PDP: deve exibir o preço-base sem aplicar desconto, embora o fallback visual original possa exibir uma etiqueta em algumas combinações de `primaryPrice`, `secondaryPrice` ou desconto calculado.

Essa última observação é um risco de comunicação: o PDP possui fallback visual de 5% que não deve ser confundido com prova de que existe um `promotionPrice` real.

## 5. Risco de duplicar descontos

O risco é alto se a correção alterar `mainPrice`, `product.price`, `product.primaryPrice` ou qualquer valor que participe do carrinho e do pagamento.

O código original contém o aviso:

```liquid
<!-- TODO: Não alterar mainPrice. Se caso alterar, vai afetar no calculo de pagamento-->
```

A correção segura, se viável, deve cumprir todos estes critérios:

- não alterar `mainPrice`;
- não alterar `product.price` ou os objetos do produto;
- não alterar `product.secondaryPrice`;
- não alterar `product-compare-data` com valores financeiros de compra sem entender seu uso;
- não aplicar desconto Liquid ao carrinho;
- não recalcular parcelas;
- alterar somente a variável usada para o texto visual do Pix e, se necessário, o preço riscado visual.

Mesmo uma alteração aparentemente visual em `product-compare-data` exige cautela, porque o componente pode ser usado por comparação de produtos e não apenas por exibição.

## 6. Possibilidade de restringir a solução à apresentação

A solução pode ser restrita à apresentação somente se houver uma fonte promocional comprovadamente disponível no PDP.

A forma conceitual segura seria:

```text
mainPrice                 permanece intacto
preço enviado à compra   permanece intacto
parcelamento             permanece intacto
pdpPixDisplayPrice       variável visual independente
pdpListDisplayPrice      variável visual independente
```

Nesse modelo, a página individual poderia exibir:

- preço normal riscado: `R$ 12.621,05`;
- preço Pix destacado: `R$ 11.990,00`;
- percentual real derivado da promoção;
- cartão preservado em `6x de R$ 2.103,51`.

Essa solução ainda não foi implementada porque a origem do grupo no PDP não foi confirmada.

## Arquivos envolvidos

- `sections/showcase-prices.liquid`: resolve o grupo de preço do card e usa `sitePrice.promotionPrice`;
- `sections/product-content.liquid`: define `mainPrice`, `productPricePrimary`, `_pixPrice`, `_listPrice` e a apresentação do PDP;
- `sections/product-compare-data.liquid`: recebe os valores de comparação passados pelo card ou pelo PDP e os expõe no JSON público;
- `sections/checkout-order-summary.liquid`: exibe o preço recebido no pedido, subtotal, frete, descontos da forma de pagamento e total;
- `product.secondaryPrice`: participa do parcelamento do card e do PDP por caminhos diferentes.

Nenhum desses arquivos foi alterado nesta tarefa.

## Menor alteração possível

### Cenário A — `product.prices` comprovadamente disponível no PDP

A menor alteração seria criar uma resolução local, limitada ao bloco visual do PDP, usando a mesma seleção de grupo do card e sem substituir `mainPrice`. O preço de compra, o carrinho e o checkout permaneceriam fora da alteração.

Antes da execução seria necessário testar:

- produto com promoção real;
- produto sem promoção e preço positivo;
- produto com grupo Mercado Livre e grupo de site;
- produto com `secondaryPrice` e parcelamento;
- produto com variação;
- carrinho e checkout comparados com o estado original.

### Cenário B — `product.prices` não disponível no PDP

Não existe uma correção Liquid segura baseada em uma propriedade não fornecida. Nesse caso, a menor solução deve ser uma configuração ou variável oficial da plataforma que exponha o preço Pix correto no contexto do produto. Criar um objeto artificial ou copiar valores do card por JavaScript não é recomendado, pois poderia divergir do preço real do checkout.

## Comportamento esperado

### Estado atual

| Contexto | Preço de lista | Pix visual | Cartão |
|---|---:|---:|---:|
| Card do produto 190 | R$ 12.621,05 | R$ 11.990,00 | calculado pelo card |
| Página individual | R$ 12.621,05 | R$ 12.621,05 no JSON do PDP, com etiqueta visual de 5% | 6x de R$ 2.103,51 |

### Estado esperado após correção segura

| Contexto | Preço normal | Pix visual | Cartão |
|---|---:|---:|---:|
| Card | R$ 12.621,05 riscado | R$ 11.990,00 | condição existente preservada |
| Página individual | R$ 12.621,05 riscado | R$ 11.990,00 | 6x de R$ 2.103,51 |
| Checkout | valor efetivo da plataforma | desconto real da forma de pagamento | regras da plataforma preservadas |

O estado esperado é visual. Ele não autoriza alterar o valor efetivamente cobrado.

## Critérios de validação antes de executar

1. Confirmar por documentação ou teste controlado que `product.prices` existe no PDP.
2. Confirmar que o item escolhido no PDP possui `price`, `promotionPrice` e `promotionMargin` coerentes.
3. Confirmar que a seleção exclui grupos de marketplace sem depender apenas de texto não documentado.
4. Testar um produto promocionado e um produto sem promoção com preço positivo.
5. Testar produto com variação e produto com `secondaryPrice`.
6. Comparar preço visual do card e PDP.
7. Confirmar que `mainPrice` permanece igual antes e depois.
8. Confirmar que o parcelamento permanece igual antes e depois.
9. Adicionar ao carrinho sem concluir pedido e comparar o preço recebido.
10. Abrir checkout de teste e confirmar subtotal, desconto, frete e total.
11. Verificar console e comportamento desktop/mobile.
12. Manter o backup do tema e registrar o rollback possível.

## Atualização P0 — correção pela configuração oficial do canal

Durante a continuidade da investigação, foi identificada a causa operacional no painel WDNA: em **Canal Site Do Ar → Valores em destaque**, o Pix não estava selecionado como destaque primário.

A configuração foi ajustada no painel, sem alteração em arquivos Liquid, CSS ou JavaScript:

- símbolo de moeda: `R$`;
- destaque primário: `Pix`;
- destaque secundário: `Cielo - Cartão de crédito`.

Após salvar a configuração, a PDP do produto Hitachi 190 passou a apresentar visualmente o mesmo preço Pix do card:

- preço normal riscado: `R$ 12.621,05`;
- preço Pix na PDP: `R$ 11.990,00`;
- indicação: `5% DE DESCONTO NO PIX`;
- cartão: `6x de R$ 2.103,51 no cartão`.

Essa evidência confirma que a divergência visual podia ser resolvida pela configuração oficial de **Valores em destaque**, sem modificar `mainPrice`, `product.price`, `product.primaryPrice`, carrinho ou checkout.

## Validação 1 — preço original e preço Pix na PDP

**Status: aprovado visualmente.**

Na URL pública do produto 190, a renderização observada foi:

```text
R$ 12.621,05   (preço normal riscado)
R$ 11.990,00   (Pix)
5% DE DESCONTO NO PIX
```

O card correspondente continuou exibindo `R$ 11.990,00 no Pix`. O preço original permaneceu disponível como referência riscada.

Observação técnica: o `textarea.product-compare-json` interno do PDP ainda apresentou `listPrice: 12621.05` e `pixPrice: 12621.05` em uma captura, enquanto o preço visível já era `R$ 11.990,00`. Isso indica que o ajuste de **Valores em destaque** alterou a apresentação principal do PDP, mas não necessariamente o JSON auxiliar de comparação. Esse dado oculto não foi usado para alterar o código e deve ser validado separadamente se houver alguma funcionalidade que consuma esse JSON.

## Validação 2 — parcelamento Cielo

**Status: aprovado na apresentação; seleção completa no checkout pendente.**

Na PDP do produto 190, o parcelamento continuou sendo exibido como:

```text
6x de R$ 2.103,51 no cartão
```

Nenhuma alteração de `product.secondaryPrice`, cálculo de parcela ou arquivo do tema foi realizada.

Foi aberto o carrinho e o checkout com uma unidade do produto. O fluxo exibiu o item e manteve o resumo financeiro. Entretanto, o avanço para uma etapa posterior ficou bloqueado por uma mensagem da própria loja:

```text
Por favor, remova os produtos sem estoque ou altere a quantidade conforme o estoque disponível antes de finalizar.
```

Por isso, não foi possível selecionar explicitamente a opção Cielo na etapa final. Não foi feita nenhuma tentativa de contornar a mensagem nem qualquer submissão de pedido.

## Validação 3 — desconto Pix no carrinho e checkout

**Status: confirmado no resumo; seleção manual da forma de pagamento pendente.**

No carrinho e no checkout, o resumo exibiu:

```text
Preço unitário:                 R$ 12.621,05
Subtotal:                       R$ 12.621,05
Desconto da forma de pagamento: -R$ 631,05
Total:                          R$ 11.990,00
```

O desconto corresponde a 5% de `R$ 12.621,05` e confirma que o valor total apresentado no fluxo observado permaneceu em `R$ 11.990,00`.

A etapa de pagamento não foi concluída porque o checkout bloqueou o avanço por estoque. Assim, a evidência confirma o desconto no resumo carregado, mas ainda não confirma a alternância manual entre Pix e Cielo dentro da etapa de pagamento.

## Validação 4 — consistência em outro produto

**Status: aprovado visualmente na amostra realizada.**

Foi testado o produto Elgin 48.000 BTUs, ID `100`.

No card da vitrine:

```text
Preço normal: R$ 10.848,69
Preço Pix:    R$ 10.306,26
```

Na PDP correspondente, a apresentação visual observada foi:

```text
Preço normal riscado: R$ 10.848,69
Preço Pix:            R$ 10.306,26
5% DE DESCONTO NO PIX
6x de R$ 1.808,12 no cartão
```

Isso demonstra que a configuração oficial também foi aplicada visualmente a outro produto promocionado, não apenas ao Hitachi 190.

Assim como no produto 190, a estrutura auxiliar `product-compare-json` pode conter registros de comparação diferentes dos valores visuais principais. A validação realizada foi da apresentação comercial visível ao cliente.

## Status atualizado do P0

A divergência visual principal entre card e PDP está **corrigida por configuração oficial do canal**, sem alteração de código.

### Confirmado

- causa operacional: Pix não estava selecionado como destaque primário;
- configuração aplicada em **Valores em destaque**;
- PDP do Hitachi mostra `R$ 11.990,00` no Pix;
- preço normal continua riscado em `R$ 12.621,05`;
- parcelamento continua visível em `6x de R$ 2.103,51`;
- carrinho/checkout exibiram desconto de `R$ 631,05` e total de `R$ 11.990,00`;
- segundo produto testado também apresentou alinhamento visual entre card e PDP;
- nenhum arquivo do tema foi alterado nesta correção.

### Pendente

- selecionar manualmente Cielo na etapa final do checkout;
- alternar explicitamente Pix e Cielo com um produto aceito pelo estoque do checkout;
- verificar se o `product-compare-json` auxiliar é consumido por alguma função de comparação e se seus valores devem refletir o destaque Pix;
- repetir a amostra em produtos sem promoção válida, quando houver um produto positivo disponível para esse teste.

O P0 está **corrigido visualmente e parcialmente validado**, mas não deve ser considerado totalmente encerrado até a validação manual das formas de pagamento no checkout.

## Continuação — validação das formas de pagamento

### Produto candidato

Foi identificado como candidato o produto **Ar-Condicionado Split Piso Teto Inverter Elgin 48.000 BTUs Frio 220V**, ID `100`:

- disponibilidade exibida na PDP: **Imediata**;
- preço normal: **R$ 10.848,69**;
- preço Pix: **R$ 10.306,26**;
- parcelamento exibido: **6x de R$ 1.808,12 no cartão**.

O produto atende aos critérios públicos de preço positivo e disponibilidade imediata. A habilitação efetiva de Pix e Cielo no checkout não pôde ser confirmada porque o teste foi bloqueado antes da etapa de pagamento.

### Bloqueio encontrado

Ao abrir o carrinho/checkout para iniciar o teste, a sessão ainda continha o produto Hitachi do teste anterior. O resumo exibiu:

```text
Preço unitário:                 R$ 12.621,05
Subtotal:                       R$ 12.621,05
Desconto da forma de pagamento: -R$ 631,05
Total:                          R$ 11.990,00
```

O checkout mostrou a mensagem:

```text
Por favor, remova os produtos sem estoque ou altere a quantidade conforme o estoque disponível antes de finalizar.
```

Como a regra desta etapa determina interromper diante de um bloqueio, não foram removidos itens, não foi tentado contornar a validação de estoque, não houve seleção de forma de pagamento e nenhum pedido foi submetido.

### Resultado desta etapa

- produto candidato identificado: **sim**;
- preço positivo e disponibilidade pública: **confirmados**;
- Pix habilitado no checkout: **não confirmado**;
- Cielo selecionável: **não confirmado**;
- alternância Pix/Cielo: **não testada**;
- atualização de totais após alternância: **não testada**;
- parcelamento no checkout: **não testado** nesta etapa;
- compra ou pagamento real: **não realizados**.

O bloqueio de estoque deve ser resolvido em uma etapa posterior, com autorização para limpar o carrinho de teste ou iniciar uma sessão limpa. Até lá, não é correto declarar a validação das formas de pagamento aprovada.
