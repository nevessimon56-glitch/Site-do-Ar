# UX refactor — auditoria Site do Ar (tema 11)

## Arquivos para upload no painel WDNA

| Arquivo | Função |
|---------|--------|
| `layout/theme.liquid` | Stack CSS/JS (sda-card, etapa2, ux-refactor) |
| `sections/header.liquid` | Busca, mobile menu\|logo\|carrinho, strip enxuta |
| `sections/product-content.liquid` | Painel de compra + resumo PDP |
| `sections/product-descriptions-v2.liquid` | Acordeão mobile (1º aberto) |
| `sections/sda-pdp-decision-summary.liquid` | Resumo escaneável (3 bullets) |
| `assets/sda-header-redesign-etapa2.css` | Header 1200px, sticky compacto, hierarquia CTAs |
| `assets/sda-ux-refactor.css` | Home, grid cards, PDP sticky |
| `assets/sda-ux-refactor.js` | Classe `is-sticky-compact` no scroll |
| `assets/sda-card.css` | Dono visual dos cards (se ainda não estava no tema) |

## Checklist Visualizar tema 11

- [ ] 1440px: hero + início vitrine sem excesso de header
- [ ] 375px: busca na 2ª linha; sem overflow horizontal
- [ ] Card: imagem, tags, preço Pix, CTA ≥44px
- [ ] PDP: preço + CTA no 1º viewport; painel sticky desktop
- [ ] Mobile PDP: barra `sda-pdp-sticky-buy` ao rolar

## Pendências (P2)

- Reordenar vitrines da home via painel (showcase), se ordem atual ≠ auditoria
- Comparação estruturada / reviews verificadas
- Arte mobile dedicada para banners sazonais
