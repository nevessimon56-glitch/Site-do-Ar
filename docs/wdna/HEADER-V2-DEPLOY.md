# Header v2 + Favoritos — deploy WDNA

## Arquivos (ordem sugerida)

| # | Arquivo no WDNA | Ação |
|---|-----------------|------|
| 1 | `assets/header-v2.css` | Criar/substituir (layout do header) |
| 2 | `assets/favorites.css` | Criar/substituir (**obrigatório** com o JS) |
| 3 | `assets/favorites.js` | Criar/substituir |
| 4 | `layout/theme.liquid` | Substituir (links CSS/JS + merge favoritos no login) |
| 5 | `sections/header.liquid` | **Substituir todo** o header padrão |
| 6 | `sections/showcase-model-product.liquid` | Substituir (botão coração) |
| 7 | `sections/favoritos-page.liquid` | Criar |
| 8 | `templates/page.favoritos.liquid` | Criar |

Manter como já estava: `mega-menu-ar.liquid`, `mega-menu.js`, `mega-menu.css`.

## Página no admin

1. **Páginas** → nova página customizada  
2. Slug: `favoritos`  
3. URL: `/pagina/favoritos`  
4. Template: `page.favoritos` (se o painel listar templates)

## Links configurados no header

| Item | URL |
|------|-----|
| Atendimento | WhatsApp 5519984176960 |
| Meus pedidos (topo + bloco) | `/pedidos` |
| Compre por ambiente | `/pagina/calculadora-btus` |
| Favoritos | `/pagina/favoritos` |
| Ofertas da semana | `/ofertas` (ajuste no Liquid se usar outro slug) |
| Menu **Modelo** | Rótulo no Liquid; link continua o item “Peças…” do menu admin |

## Favoritos (comportamento)

- Visitante: `localStorage` (`sitedoar_favorites_v1`), bucket `__guest__`.
- Logado: bucket por `customerId`; ao login, favoritos do visitante são mesclados.
- Tentativa de sync com `/ajax/wishlist` e `/ajax/favorites` (silenciosa se a API não existir).
- Contador no header: `[data-favorites-count]`.

## Testar

- [ ] Faixa azul: Atendimento, Meus pedidos, Entre ou cadastre-se  
- [ ] Busca, logo, Meus pedidos / Favoritos / Carrinho (desktop)  
- [ ] Compre por ambiente + menu + Ofertas da semana  
- [ ] Mega menu Ar-condicionado  
- [ ] Coração na vitrine + contador + `/pagina/favoritos`  
- [ ] Login: favoritos do visitante aparecem logado  
