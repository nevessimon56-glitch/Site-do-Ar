# Ofertas da semana — página imersiva

O banner/botão **Oferta da semana** no header v2 leva à **página dedicada** (`/pagina/oferta-da-semana`), com layout imersivo (countdown, revelar oferta, pulseira de cards) — **não** abre produto solto nem a vitrine comum da home.

## Por que não usar o menu WDNA?

Antes, o tema podia pegar um item do menu cujo nome contém “oferta” e usar o link dele (muitas vezes **URL de um produto**). Isso foi removido: o href é **fixo** em `header.liquid`.

## Configurar produtos

Edite **`assets/ofertas-semana-config.js`** no tema WDNA:

```javascript
products: [
  {
    url: 'https://...',
    title: 'Nome do produto',
    image: 'https://salescdn.net/...',
    price: 'R$ 0,00',      // opcional
    productId: '123'       // opcional (favoritos)
  }
]
```

- Com `products` preenchido → a página imersiva usa esses itens **primeiro** e completa com a vitrine “ofertas” da home (fetch).
- `products: []` → só produtos lidos da vitrine de ofertas na home.

## Admin WDNA

1. **Página customizada** slug `oferta-da-semana` → template **`page.oferta-semana`**
2. Publicar arquivos (um a um):
   - `sections/header.liquid`
   - `templates/page.oferta-semana.liquid`
   - `sections/oferta-semana.liquid`
   - `assets/oferta-semana.css`
   - `assets/oferta-semana.js`
   - `assets/ofertas-semana-config.js`

## Home (opcional)

Ainda existe suporte a `/#sda-ofertas-semana` na home (`ofertas-semana-home.js`): confete + destaque na vitrine. O **header não aponta mais** para esse hash.

- **`/ofertas`** — busca vazia na loja; não use no banner.
