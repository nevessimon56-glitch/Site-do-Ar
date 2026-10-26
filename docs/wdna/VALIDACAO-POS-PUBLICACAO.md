# Validação pós-publicação WDNA

**Loja:** https://www.sitedoar.com.br/  
**Última rodada de upload:** 26/10/2026 (confirmada).

## Verificação automática (26/10/2026)

Checagem em https://www.sitedoar.com.br/ (HTML ao vivo):

| Item | Status |
|------|--------|
| `.sda-product-card` / `.sda-card-footer` | OK (~75 ocorrências na home) |
| `sda-conversion-redesign.css` referenciado | OK |
| Payload comparador em `<textarea class="product-compare-json" hidden>` | OK (não é mais `div`) |
| Comprar agora + Comparar | OK no markup |
| Linha attrs mobile (`Quente e Frio • …`) | OK |

**Nota:** ferramentas de leitura de página (e “Ver código-fonte”) ainda listam o JSON dentro do `textarea`; isso é normal. No navegador, com `hidden` + CSS, **não deve aparecer** entre título e preço. Se ainda aparecer **visualmente**, avise — próximo passo é payload mínimo só no botão Comparar.

## Correção urgente (se ainda aparecer JSON no card)

Sintoma: bloco `{"id":…,"title":…}` visível entre título e preço.

**Causa:** WDNA pode renderizar texto de `div` oculto no fluxo do card.

**Fix no Git (republicar):**

1. `sections/product-compare-data.liquid` — payload em `<textarea class="product-compare-json" hidden readonly>`
2. `assets/product-compare.js` — lê `textarea.value`
3. `layout/theme.liquid` — hotfix inline inclui `textarea.product-compare-json`
4. `assets/product-compare.css` — ocultação reforçada

## Resultado dos testes (26/10/2026 — validação manual)

| # | Item | Resultado |
|---|------|-----------|
| A | JSON no card (renderizado) | **Aprovado** — só no HTML (`textarea.product-compare-json` + CSS); não visível na tela após reload |
| B | Comparador (3 produtos) | **Aprovado** — barra inferior, painel “Comparar ar-condicionado”, tabela de specs; limpeza da seleção OK |
| C | PDP mobile 375×812 | **Aprovado** — `#product-pdp-v2` rola com a página (`position: static`, esperado). Sticky de compra = **`.sda-pdp-sticky-buy`** (preço + COMPRAR AGORA ~69px, fixo no rodapé do viewport em 0 / 500 / 1100px scroll) |

**Nota de produto:** não confundir `#product-pdp-v2` (wrapper do conteúdo PDP) com a barra sticky injetada por `sda-conversion-redesign.js` (classe `.sda-pdp-sticky-buy`).

## Checklist visual (itens ainda não marcados na loja)

| # | Onde | O que ver |
|---|------|-----------|
| 1 | Home vitrines | Comprar agora **acima**, Comparar **abaixo**, coluna |
| 2 | Busca / categoria | Mesmo card; mobile 2 colunas sem checkbox Comparar no canto |
| 3 | Card | **Sem** JSON visível; specs/chips legíveis |
| 4 | Comparador | *(validado — ver tabela acima)* |
| 5 | PDP mobile | *(validado — sticky na barra `.sda-pdp-sticky-buy`, não no `#product-pdp-v2`)* |
| 6 | Relacionados / últimos vistos | Markup igual vitrine (`.sda-product-card`) |
| 7 | Model 9 promo | Timer + card horizontal; Comparar + Pix |
| 8 | Compre junto (PDP) | Mini-cards `.sda-product-card--bundle`; totais no bloco `=` |
| 9 | Relacionados / últimos vistos | `.sda-product-card` + Comparar em coluna |

## Arquivos desta fase (fase 2)

- `sections/showcase-model-product-promotion.liquid` — `.sda-product-card--promo`
- Demais itens da tabela “Fix JSON” acima

## Se algo falhar

Anote URL + screenshot + viewport (mobile/desktop) e qual item do checklist falhou. Não editar `theme-all.css` no painel — overrides em `sda-conversion-redesign.css` ou `theme-custom.css`.
