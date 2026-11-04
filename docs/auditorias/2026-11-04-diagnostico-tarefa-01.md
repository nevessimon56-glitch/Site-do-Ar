# TAREFA 01 — Diagnóstico de consistência e organização

**Loja:** Site do Ar — `sitedoar.com.br`  
**Tema auditado:** Site do ar (Novo), tema 3  
**Data da auditoria:** 04/11/2026  
**Escopo:** diagnóstico somente. Nenhum arquivo do tema, produto, checkout ou página adicional foi alterado, salvo ou excluído.

## Conclusão geral

A loja está funcional no fluxo público observado, mas há uma inconsistência comercial importante entre o preço exibido no card e o preço principal da página do produto. O card mostra o valor promocional do Pix, enquanto a página individual mantém o preço cheio como valor principal e apenas informa o percentual de desconto. Isso pode gerar dúvida sobre qual valor será efetivamente cobrado.

A regra de frete grátis parece estar sendo aplicada ou cadastrada fora dos arquivos Liquid auditados, pois o tema apenas exibe a etiqueta e delega o cálculo ao mecanismo de frete da plataforma. Não foi encontrada, no tema, uma regra explícita que restrinja a comunicação ao estado de São Paulo. A confirmação definitiva depende de testes por CEP e da configuração de frete no painel administrativo.

## Prioridade P0 — risco comercial imediato

### P0.1 — Preço do card e preço da página individual não são apresentados da mesma forma

**Evidência pública:** na [vitrine da página inicial](https://sitedoar.com.br/), o produto Hitachi SPC48B3IV aparece como “De R$ 12.621,05” e “R$ 11.990,00 no Pix”, com “5% de desconto no Pix”. Na [página individual do mesmo produto](https://sitedoar.com.br/ar-condicionado-split-piso-teto-inverter-46000-btus-hitachi-air-core-600-quente-frio-spc48b3iv-220v-p190), o valor principal exibido é “R$ 12.621,05”; abaixo aparece somente “5% DE DESCONTO NO PIX”.

**Arquivos/componentes envolvidos:** `sections/showcase-prices.liquid`; componente de preço da página de produto; dados comerciais do produto, especialmente `product.price`, `product.prices`, `promotionPrice` e `promotionMargin`.

**Causa provável:** o card renderiza `sitePrice.promotionPrice` como preço principal quando há promoção, enquanto a página individual renderiza o preço-base e deixa a condição do Pix como informação secundária. São apresentações diferentes para a mesma condição comercial.

**Risco:** abandono, questionamento no atendimento e percepção de divergência de preço. A diferença também pode ser interpretada como erro se o cliente comparar o card com a página antes de comprar.

**Recomendação:** definir uma regra única de comunicação: preço promocional do Pix como preço destacado, preço normal riscado e condição do cartão claramente separada. Depois validar o valor final no carrinho e no checkout antes de qualquer alteração.

### P0.2 — A lógica do card combina fontes de preço diferentes

**Evidência no código:** `sections/showcase-prices.liquid` começa com `product.price`, pode selecionar outro grupo em `product.prices`, exclui grupos cujo nome contém “mercado”, “marketplace” ou “meli”, usa `sitePrice.promotionPrice` para o Pix e usa `product.secondaryPrice` para parcelas. Para as parcelas, calcula a base como `listPriceCard` e substitui pela `product.secondaryPrice.price` quando esta for maior.

**Causa provável:** tentativa de manter o preço do site separado de Mercado Livre, mas sem uma fonte comercial única para preço normal, Pix e cartão.

**Risco:** em produtos com grupos ou promoções cadastrados de forma diferente, Pix, preço cheio e parcelamento podem vir de registros distintos. O valor exibido no card pode não corresponder exatamente ao valor que a página ou o checkout usam.

**Recomendação:** mapear, em amostra de produtos, os valores de `product.price`, cada item de `product.prices` e `product.secondaryPrice`; então estabelecer uma fonte canônica e uma regra documentada de fallback.

## Prioridade P1 — alta importância operacional

### P1.1 — Frete grátis é comunicado de modo amplo, mas a restrição territorial não está visível

**Evidência pública:** a página inicial mostra “Frete Grátis” nos cards e a página individual do Hitachi também mostra “Frete Grátis”. O rodapé informa atendimento à “Região Metropolitana de Campinas”. A exigência comercial informada para esta auditoria é frete grátis para todo o estado de São Paulo.

**Arquivos/componentes envolvidos:** componente de card; página de produto; `sections/checkout-shipping.liquid`; `sections/checkout-order-summary.liquid`; configuração de métodos/regiões de frete no painel.

**Evidência no Liquid:** `checkout-shipping.liquid` somente coleta o CEP e chama `handleShippingCalculate()`. `checkout-order-summary.liquid` exibe `order.subtotalShipping` como “Custo do frete”. Não há, nesses arquivos, uma condição explícita para “SP” nem uma mensagem específica de frete grátis para São Paulo.

**Causa provável:** a regra está no motor/configuração de frete da plataforma, enquanto a etiqueta “Frete Grátis” é renderizada pelo tema sem mostrar a condição geográfica.

**Risco:** o cliente pode interpretar frete grátis como nacional; se o checkout apresentar cobrança para fora de SP, haverá fricção e possível reclamação. Também não é possível concluir pelo tema se todos os CEPs paulistas estão cobertos.

**Recomendação:** confirmar a regra no painel por CEP de SP, fora de SP e CEP não atendido. Na comunicação visual, explicitar “Frete grátis para o estado de São Paulo — consulte o CEP” se essa for a regra real.

### P1.2 — O checkout exibe o valor final da plataforma, mas não replica a comunicação comercial do Pix

**Evidência no código:** `sections/checkout-order-summary.liquid` apresenta `product.price * product.quantity`, `order.subtotal`, desconto ou acréscimo de forma de pagamento, frete (`order.subtotalShipping`) e total (`order.total`). O bloco não apresenta a etiqueta “no Pix” nem o preço promocional do card.

**Risco:** mesmo que o total esteja correto, o cliente pode não entender em que etapa o desconto do Pix foi aplicado. O desconto depende de `order.payments[0].storeTaxValue` e `gatewayTaxValue`, portanto sua visualização ocorre como desconto/acréscimo da forma de pagamento, não como preço promocional do produto.

**Recomendação:** validar um carrinho real de teste com Pix e cartão, sem concluir pagamento, e comparar: card, produto, carrinho, seleção de pagamento e resumo final.

### P1.3 — Informações técnicas são visíveis, mas a padronização do cadastro precisa ser verificada

**Evidência pública:** a página do produto apresenta tags como “Q/F”, “Inverter”, “Cobre” e “220V”, além de abas/seções “Descrição”, “Destaques” e “Especificações”. O bloco de destaques observado contém uma imagem embutida como `data:image/png;base64,...`.

**Risco:** parte da informação parece estruturada em tags e parte em texto rico/imagens. Isso dificulta comparação entre produtos, busca, manutenção e acessibilidade. Uma alteração de conteúdo pode exigir editar uma imagem ou descrição longa, em vez de atualizar um campo técnico.

**Recomendação:** separar campos técnicos essenciais — BTU, ciclo, tecnologia, tensão, gás, serpentina, classificação energética, dimensões e garantia — de descrição editorial. Definir nomenclatura e unidade padrão antes de mexer no layout.

## Prioridade P2 — manutenção e organização

### P2.1 — Há várias folhas CSS com áreas potencialmente sobrepostas

**Arquivos encontrados em `assets`:** `theme-all.css`, `theme-custom.css`, `theme-plugins.css`, `header-v2.css`, `mega-menu.css`, `product-page.css`, `product-page-v2.css`, `product-hover-image.css`, `product-compare.css`, `favorites.css` e `theme-solar-calculator.css`.

**Evidência no `theme-custom.css`:** há declarações repetidas, como `.account_link` em blocos separados, regras repetidas para `.header .dropdown-content` e `.header-link_text__logged .account_link`; também existem muitos `!important` em preços, cards, imagens e botões. O arquivo mistura header, busca, navegação, cards, página de produto, hover e responsividade.

**Causa provável:** evolução incremental por blocos adicionados em datas diferentes, sem uma camada única de tokens, escopo ou índice de responsabilidades.

**Risco:** mudanças futuras podem depender da ordem de carregamento e de especificidade acidental. O risco é maior no mobile, nos cards relacionados e na página de produto, onde há regras de animação e cancelamento de animação para os mesmos componentes.

**Recomendação:** somente em tarefa aprovada, inventariar a ordem de carregamento, localizar regras duplicadas por seletor e separar alterações por escopo. Não remover regras nesta etapa.

### P2.2 — O Liquid comercial está concentrado em lógica de fallback não documentada fora do próprio arquivo

`sections/showcase-prices.liquid` contém uma lógica extensa de seleção de grupo, exclusão textual de Mercado Livre, fallback e cálculo visual. Ela é reutilizável no card, mas a página individual e o checkout seguem outras fontes. A ausência de uma documentação central aumenta a chance de divergência quando um novo grupo de preço ou promoção for criado.

**Recomendação:** criar, em etapa futura e aprovada, uma matriz de campos comerciais e uma regra de precedência. A matriz deve ser validada com produtos reais antes de qualquer refatoração.

## Arquivos/componentes analisados

- `sections/showcase-prices.liquid`
- `sections/checkout-order-summary.liquid`
- `sections/checkout-shipping.liquid`
- existência de `sections/checkout-payment.liquid` e `sections/checkout-summary.liquid`
- existência de `templates/checkout.liquid` e `templates/checkout-order.liquid`
- `assets/theme-custom.css`
- `assets/theme-all.css`
- `assets/header-v2.css`
- `assets/product-page.css`
- `assets/product-page-v2.css`
- `assets/mega-menu.css`
- `assets/product-hover-image.css`
- `assets/product-compare.css`
- páginas públicas inicial e de produto

## Limitações e próximos testes recomendados

Não foi realizado pedido, pagamento ou alteração de carrinho. Também não foi possível confirmar, somente pelo tema, a tabela administrativa de frete nem o valor final calculado para múltiplos CEPs. A próxima fase deve começar apenas após sua aprovação e deve testar, em ambiente controlado, pelo menos um CEP de São Paulo, um CEP fora de São Paulo, Pix e cartão, sem concluir transação.

**Status da Fase 1:** concluída. Nenhuma alteração no site foi feita. Aguardo aprovação explícita para iniciar a Fase 2 — Planejamento.
