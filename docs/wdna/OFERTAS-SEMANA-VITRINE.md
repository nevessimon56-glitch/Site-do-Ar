# Ofertas da semana — vitrine na home + confete

Sem página extra nem layout diferente: o banner/botão leva à **vitrine de ofertas na home** (`/#sda-ofertas-semana`), com **confete** ao chegar.

## Escolher os produtos

Edite **`assets/ofertas-semana-config.js`** no tema WDNA:

```javascript
products: [
  {
    url: '/seu-produto-p91',
    title: 'Nome do produto',
    image: 'https://salescdn.net/...webp',
    price: 'R$ 1.234,56',  // opcional
    productId: '91'          // opcional (favoritos)
  }
]
```

- **`products: []`** → vitrine **100% do admin WDNA** (só confete + scroll).
- Com itens no array → esses produtos vão para o **topo** (se já estiverem na vitrine, só reordenam; se não estiverem, entram como card extra). **Nada é removido.**

Copie `url`, `title`, `image` e `productId` do HTML do card na loja (botão favoritar / data attributes).

## Publicar

1. `assets/ofertas-semana-config.js`
2. `assets/ofertas-semana-home.js`
3. `layout/theme.liquid`
4. `sections/header.liquid`

## Título da vitrine

O script acha a seção pelo título **`h2.showcase-title`** que contenha “ofertas” (ex.: “OFERTAS DE VERÃO”). Se mudar o título no admin, ajuste `sectionTitleMatch` no config.

## Não usar

- **`/ofertas`** — vira busca vazia na loja.
- A página `page.oferta-semana` (experiência antiga) **não é necessária** para este fluxo.
