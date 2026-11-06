# Etapa Header — Opção A (pacote manual WDNA preview)

**Status:** aguardando **URL / ID do tema preview** — não publicar no tema ativo.

## Arquivos nesta pasta (upload literal)

| Arquivo WDNA | Origem no repo |
|--------------|----------------|
| `assets/sda-tokens.css` | `../../assets/sda-tokens.css` |
| `assets/header-v2.css` | `../../assets/header-v2.css` |
| `sections/header.liquid` | Ver **alerta** abaixo — Git **≠** produção |

**Alerta:** o `header.liquid` do Git **não** contém `.header-utility` (presente no ar). Antes do upload, exportar Liquid do tema ativo e reconciliar conforme [ESPECIFICACAO_HEADER_REDESIGN.md](../../ESPECIFICACAO_HEADER_REDESIGN.md) §A.2.

SHA-256 (Git `cursor/auditoria-tecnica-b192`):

- `sda-tokens.css`: `4887f1bc1b3f8a48ccacd6a12ac1388a76f7d6ce282897e84d2425e71986a716`
- `header-v2.css`: `7af196269fcccbb82b8df8ba20690feecc0f3aa8b025dce32410d75c66a5bf31`
- `header.liquid`: `a460203d61f2c429742c0ab2ab77070c6d665a5f0cb991bf1030004a44d262aa`

## NÃO substituir nesta etapa

`mega-menu.css`, `mega-menu.js`, `mega-menu-ar.liquid`, card, PDP, `theme.js`, compare/favorites JS/CSS (salvo já no clone).

## `layout/theme.liquid` — mesclagem mínima

Seguir **[MESCLAGEM-THEME-LIQUID.md](./MESCLAGEM-THEME-LIQUID.md)** no **backup** do layout do preview — **não** colar o `layout/theme.liquid` v3 inteiro do Git (ele referencia `sda-card.css`).

## Backup antes (painel WDNA)

Baixar/copiar conteúdo atual do preview:

1. `layout/theme.liquid`
2. `assets/header-v2.css` (se existir)
3. `sections/header.liquid`
4. Criar `assets/sda-tokens.css` só se for novo

## Rollback

Restaurar os 4 backups no editor do **mesmo** tema preview.
