# Recuperação urgente — tela preta + ícone azul gigante

## O que aconteceu (confirmado no ar)

A loja usa **`header class="header header-v2"`** (header novo), mas **não carrega** `header-v2.css` nem `sda-conversion-redesign.css`.

Sem esse CSS:

- O `mega-menu.css` aplica **HEADER-INVERT-v8** (faixa preta).
- Os **SVGs do header não têm tamanho** e ocupam a tela inteira (o “U” azul gigante).
- O restante do site fica atrás / ilegível; só widgets externos (ex.: Diagnóstico) aparecem.

## Correção mínima (3 arquivos + layout)

Publique **nesta ordem** no editor WDNA (substituir conteúdo inteiro de cada arquivo):

| # | Arquivo na loja | Origem no repo |
|---|-----------------|----------------|
| 1 | `assets/header-v2.css` | `assets/header-v2.css` (~36 KB) |
| 2 | `assets/sda-conversion-redesign.css` | `assets/sda-conversion-redesign.css` |
| 3 | `layout/theme.liquid` | `layout/theme.liquid` ou `docs/wdna/RECUPERACAO-SITE/layout-theme.liquid` |

O `theme.liquid` novo **já inclui** links para esses CSS + CSS de emergência inline (limita SVG se alguém esquecer o passo 1).

Salve, **publique o tema**, teste em aba anônima (Ctrl+Shift+R).

## Comparador (JSON na vitrine)

Se ainda aparecer JSON nos cards:

| Arquivo na loja | Origem |
|-----------------|--------|
| `sections/product-compare-data.liquid` | `docs/wdna/RECUPERACAO-SITE/product-compare-data.liquid` |
| `assets/product-compare.css` | `docs/wdna/RECUPERACAO-SITE/product-compare.css` |

## Não faça

- **Não** remova `header-v2.css` do `theme.liquid` enquanto o header for v2.
- **Não** suba só `sections/header.liquid` v2 sem subir `header-v2.css`.

## theme-all.css

Se na loja o `theme-all.css` estiver truncado (muito menor que ~300 KB), restaure do GitHub antes dos passos acima.
