# Recuperação urgente — catálogo com erro 500

## Sintoma

- **Home** (`/`) → funciona
- **Catálogo** (`/Todos-os-Produtos`), **busca** (`/busca`) → **"Página não encontrada!"** (HTTP 500)
- Ícone **Catálogo** no menu mobile → mesma tela de erro

## Causa provável

Arquivo **`sections/search-filter.liquid`** quebrado ou substituído incorretamente no WDNA.

> No WDNA o nome é **`search-filter.liquid`** (singular), não `search-filters.liquid`.

## Solução 1 — Mais rápida (recomendada)

No painel WDNA:

1. **Temas → seu tema → Histórico de versões**
2. Restaure a versão **anterior** à última publicação
3. Publique

## Solução 2 — Substituir só o arquivo quebrado

Cole o conteúdo deste link em **`sections/search-filter.liquid`**:

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/rollback-recuperar-site-ed4c/sections/search-filter.liquid

(Após commit de recuperação nesta branch.)

## O que NÃO fazer

- **Não substituir** `layout/theme.liquid` inteiro pelo GitHub — o arquivo do Git é **parcial** (só customizações)
- **Não criar** pasta `pages/`
- **Não usar** `search-filters.liquid` — o WDNA usa `search-filter.liquid`

## Arquivos seguros para restaurar (se necessário)

| Arquivo WDNA | Link rollback |
|--------------|---------------|
| `assets/mega-menu.js` | branch `c5da2b0` |
| `sections/showcase-model-product.liquid` | branch `c5da2b0` |
| `sections/product-content.liquid` | branch `c5da2b0` |

**`layout/theme.liquid`:** só adicione trechos, não substitua o arquivo completo do WDNA.
