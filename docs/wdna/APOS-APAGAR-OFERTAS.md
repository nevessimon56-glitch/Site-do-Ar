# WDNA — header v2 sem “Oferta da semana”

O repositório **não tem mais** overlay, página ou assets de oferta. No editor WDNA, publique **arquivo por arquivo** (nunca a pasta `assets/` ou `layout/` inteira).

## Substituir (copiar do GitHub / branch `cursor/header-favoritos-v2-e52b`)

| Pasta no WDNA | Arquivo |
|---------------|---------|
| `sections/` | `header.liquid` |
| `layout/` | `theme.liquid` (só se você já usa o `theme.liquid` do repo) |
| `assets/` | `header-v2.css` |

## Apagar no WDNA (se ainda existir)

| Pasta | Arquivos |
|-------|----------|
| `assets/` | `oferta-semana.css`, `oferta-semana.js`, `ofertas-semana-config.js`, `ofertas-semana-home.js` |
| `sections/` | `oferta-semana.liquid`, `oferta-semana-overlay.liquid` |
| `templates/` | `page.oferta-semana.liquid` |

## Admin

- Página **oferta-da-semana** → despublicar ou excluir (evita 404).

## Conferir na loja

Código-fonte da home **não** deve conter: `sda-oferta-immersiva`, `oferta-semana`, `data-sda-oferta-overlay`, `header-v2-mobile-offer`, `header-v2-cta-semana`.

Header v2 (favoritos + mobile): ver **`HEADER-V2-DEPLOY.md`** e **`PUBLICAR-HEADER-MOBILE-SEGURO.md`**.
