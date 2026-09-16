# Estrutura do `sections/header.liquid` (WDNA)

Referência extraída do HTML publicado — **não editar IDs/classes** sem atualizar o CSS `MOBILE-HEADER-KABUM-v3`.

```
.header
  .header-content.content
    .container
      .navbar
        .navbar-section          ← logo (oculto no mobile)
        .navbar-center
          .header-box-account-info  ← oculto no mobile
          .search-desktop.hide-lg  ← busca mobile (#term2)
        .navbar-section          ← display:contents no mobile
          .header-link_search.show-lg
          .header-box-account_tel
          .header-link_cart
          .header-link_menu__mobile
      .search.close             ← overlay busca (oculto no mobile KaBuM)
  .nav-content.hide-lg           ← barra categorias (oculta no mobile KaBuM)
```

Grid mobile: **menu | busca branca | carrinho**

Se puder colar o conteúdo do seu `header.liquid` no chat ou publicar no GitHub, validamos linha a linha.
