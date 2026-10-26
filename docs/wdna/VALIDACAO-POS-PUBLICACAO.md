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

## Checklist visual (marque na loja)

| # | Onde | O que ver |
|---|------|-----------|
| 1 | Home vitrines | Comprar agora **acima**, Comparar **abaixo**, coluna |
| 2 | Busca / categoria | Mesmo card; mobile 2 colunas sem checkbox Comparar no canto |
| 3 | Card | **Sem** JSON visível; specs/chips legíveis |
| 4 | Comparador | Até 3–4 produtos; barra inferior; painel abre |
| 5 | PDP `#product-pdp-v2` | Preço Pix, comprar, specs; sticky mobile |
| 6 | Relacionados / últimos vistos | Markup igual vitrine (`.sda-product-card`) |
| 7 | Model 9 promo | Timer + card horizontal; Comparar + Pix após republicar promo liquid |

## Arquivos desta fase (fase 2)

- `sections/showcase-model-product-promotion.liquid` — `.sda-product-card--promo`
- Demais itens da tabela “Fix JSON” acima

## Se algo falhar

Anote URL + screenshot + viewport (mobile/desktop) e qual item do checklist falhou. Não editar `theme-all.css` no painel — overrides em `sda-conversion-redesign.css` ou `theme-custom.css`.
