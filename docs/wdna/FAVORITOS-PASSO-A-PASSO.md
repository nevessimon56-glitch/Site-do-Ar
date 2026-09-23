# Favoritos — por onde começar

## O que já está pronto no Git

| Peça | Arquivo | Função |
|------|---------|--------|
| Coração no card | `sections/showcase-model-product.liquid` | v4 (Pix/specs/comparar) + botão canto superior direito |
| Fallback automático | `assets/favorites.js` | Coloca o coração em **qualquer** `.showcase-product.card` (ex.: template `v3-site-price` da loja) |
| Visual | `assets/favorites.css` | Estilo do coração + página de favoritos |
| Lógica | `assets/favorites.js` | Salvar/remover, contador no header, `/pagina/favoritos` |
| Tema | `layout/theme.liquid` | Carrega CSS/JS + merge ao logar |
| Página | `templates/page.favoritos.liquid` + `sections/favoritos-page.liquid` | Lista de favoritos |

## Passo 1 — Publicar no WDNA (mínimo para funcionar)

1. `assets/favorites.css`
2. `assets/favorites.js`
3. `layout/theme.liquid` (se ainda não publicou a versão com favoritos)

**Teste:** abra a home, deve aparecer o coração no canto do card. Clique → contador **Favoritos** no header sobe.

## Passo 2 — Card com coração (recomendado)

Substitua **`sections/showcase-model-product.liquid`** pela versão do repo (coração já embutido no Liquid, dados do produto corretos).

Se a vitrine usar outro template (`data-showcase-tpl="v3-site-price"`), o **Passo 1** já injeta o coração via JS; o Passo 2 deixa tudo nativo no HTML.

## Passo 3 — Página de favoritos

1. Admin WDNA → **Páginas** → nova página, slug **`favoritos`**
2. URL: `/pagina/favoritos`
3. Template: **`page.favoritos`**
4. Publique `sections/favoritos-page.liquid` e `templates/page.favoritos.liquid`

## Passo 4 — Testar fluxo

- [ ] Clicar no coração → fica vermelho (`is-active`)
- [ ] Header **Favoritos** mostra contador
- [ ] `/pagina/favoritos` lista o produto
- [ ] Remover na página ou clicar de novo no coração
- [ ] Logout/login: favoritos do visitante mesclam na conta (localStorage)

## Próximo (opcional)

- Coração na **página do produto** (PDP) — precisa do template Liquid da PDP no WDNA
- Sync servidor WDNA se existir API de wishlist
