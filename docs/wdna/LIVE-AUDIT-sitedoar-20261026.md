# Auditoria ao vivo — https://www.sitedoar.com.br/ (26 out 2026)

## Diagnóstico (HTML + CDN)

| Item | No ar hoje | Deveria |
|------|------------|---------|
| `showcase-product-card.css` | **Ausente** no `<head>` | Link no `theme.liquid` |
| `SDA-THEME-MARKER-v3` | **Não** | Comentário no layout publicado |
| Markup card | `data-showcase-tpl="v3-site-price"` (25×) | `v4-card-remodel` + opcional `--v2` |
| Classe | `.sda-product-card` sem `--v2` | CSS v3 agora cobre `:not(.sda-product-card--promo)` |
| `mega-menu.css` CDN | ~**190 KB**, blocos `PRODUCT-CARD-v2` | SDA v3 ~**80–100 KB**, sem card |
| Compare JSON | `textarea` hidden | OK |
| Header | `class="header header-v2"` | OK |

**Conclusão:** a loja carrega conversão + mega-menu **antigo**, mas **não** o CSS visual do card. Por isso “subiu tudo e não mudou”.

## Publicar agora (mínimo visual)

1. **Criar/substituir** `assets/showcase-product-card.css` (do pacote `tema-sda-ultimo`)
2. **Republicar** `layout/theme.liquid` (confirme link `showcase-product-card.css` no código-fonte)
3. **Substituir** `assets/mega-menu.css` pela versão **SDA v3** (remove conflito de card)
4. **Recomendado:** `sections/showcase-model-product.liquid` (v4 — specs fora do body, BTU correto)

## Melhorias já no repo (após publish)

- CSS do card vale para **v3 e v4** (mesmo sem `--v2`)
- Specs acima do título no markup v3
- Esconde linha “BTUs” vazia do liquid antigo
- Carrossel / grade 2 col (quando `showcase-product-card` carregar)

## Próximo passo visual (depois do mínimo)

- Republicar `showcase-model-product.liquid` v4
- Smoke: home carrossel, promo grid, busca, PDP
- Opcional: reduzir tema preto GLOBAL-BLACK se quiser header azul de marca
