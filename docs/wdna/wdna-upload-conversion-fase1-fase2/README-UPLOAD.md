# Pacote WDNA — Conversão Fase 1 + 2 (com header-v2 de produção)

## Seu `layout/theme.liquid` atual (produção)

Você **já tem** o layout certo: header-v2, favoritos, PDP v2, inline laranja, `setupStore` com `init()`, popup Diagnóstico 360.

**Não substitua** o arquivo inteiro pelo `layout/theme.liquid` do repositório (branch sem header-v2).

### Alteração mínima no theme.liquid da loja

1. **CSS** — depois de `product-page-v2.css` e **depois** do `<style id="header-orange-inline-v5">` (inline continua vencendo o carrinho; conversão vem por último):

```liquid
<link media="all" type="text/css" rel="stylesheet" href="{{ 'assets/sda-conversion-redesign.css' | themeAssetUrl }}">
```

2. **JS** — depois de `product-hover-image.js`:

```liquid
<script src="{{ 'assets/sda-conversion-redesign.js' | themeAssetUrl }}" defer></script>
```

Ordem CSS recomendada: `theme-all` → `theme-custom` → `mega-menu` → `header-v2` → `favorites` → `product-compare` → `product-hover-image` → `product-page-v2` → **inline laranja** → **`sda-conversion-redesign.css`**.

## O que subir desta pasta

| Caminho | Ação |
|---------|------|
| `assets/sda-conversion-redesign.css` | Publicar |
| `assets/sda-conversion-redesign.js` | Publicar |
| `assets/product-hover-image.css` | Só se quiser grid vitrine + azul do PR |
| `sections/showcase-model-product.liquid` | Publicar |
| `sections/product-content.liquid` | Publicar |
| `sections/search-order.liquid` | Publicar |
| `sections/sda-*.liquid` | Publicar |
| `templates/home.liquid`, `templates/search.liquid` | Publicar |
| `sections/header.liquid` | **Não** — loja usa header-v2 |
| `layout/theme.liquid` (deste pacote) | **Referência** — use o da loja + 2 linhas acima |

Referência do inline laranja completo (header-v2): `assets/header-orange-inline-v5.css`.
