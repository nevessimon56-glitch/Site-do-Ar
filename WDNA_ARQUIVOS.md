# Arquivos WDNA — o que colar e onde

Este repositório GitHub é **parcial**. O WDNA também usa arquivos que **não estão no Git** (`theme.js`, `theme-defer.js`, etc.).

## Mapa de pastas no painel WDNA

| Caminho no WDNA | Arquivo no GitHub | Obrigatório? | Função |
|-----------------|-------------------|--------------|--------|
| `sections/showcase-model-product.liquid` | `sections/showcase-model-product.liquid` | **SIM** | Cards da vitrine (home, categorias) |
| `sections/product-content.liquid` | `sections/product-content.liquid` | **SIM** | **Página do produto** + preço principal |
| `sections/product-spec-icons.liquid` | `sections/product-spec-icons.liquid` | Sim | Pills de specs nos cards |
| `assets/mega-menu.js` | `assets/mega-menu.js` | Sim | Hover, carrossel, fix após login |
| `assets/mega-menu.css` | `assets/mega-menu.css` | Sim | Estilos dos cards |
| `layout/theme.liquid` | `layout/theme.liquid` | Recomendado | Login + carrega JS |
| `sections/mega-menu-ar.liquid` | `sections/mega-menu-ar.liquid` | Se usar mega menu | Menu Modelos |
| `pages/showcase-model-product.liquid` | `pages/showcase-model-product.liquid` | **NÃO** | Só cópia para referência — **o WDNA usa `sections/`** |

## Como validar se colou certo

### showcase-model-product.liquid
- Deve ter: `VERSAO: 2026-07-15-v4`
- Deve ter: `data-showcase-tpl="v3-site-price"` nos `<li>`
- **NÃO** deve ter: `product.primaryPrice`

### product-content.liquid  ← ESTE ERA O ARQUIVO QUE FALTAVA
- Deve ter: `VERSAO: 2026-07-15-product-v1`
- **NÃO** deve ter: `{% assign productPricePrimary = product.primaryPrice %}`

### product-spec-icons.liquid
- Deve ter: `VERSAO: 2026-07-15-spec-v3`
- Deve ter: `data-spec-icons="v3"` no `<ul class="showcase-spec-bar">`
- Janela/mecânico **não** devem mostrar pill Wi-Fi

### No site (F12 → Inspecionar card)
- `<li class="showcase-item" data-showcase-tpl="v3-site-price">` = vitrine atualizada
- Sem esse atributo = arquivo antigo ainda no WDNA

## Por que puxava Mercado Livre?

1. **`product-content.liquid`** (página do produto) usava `product.primaryPrice` → tabela ML no login
2. **Painel WDNA** pode ter "Lista de preço para usuário logado" = Mercado Livre
3. **`pages/`** no GitHub não é outra pasta do site — é só cópia

## Links raw (branch atual)

Substitua `COMMIT` pelo hash do último commit:

- `sections/showcase-model-product.liquid`
- `sections/product-content.liquid`
- `assets/mega-menu.js`
