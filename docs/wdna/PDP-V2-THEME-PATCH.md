# PDP v2 — o que fazer no `layout/theme.liquid`

## Não substitua pelo arquivo curto (~414 linhas) da branch antiga

Seu tema **de produção** tem ~680 linhas (header v2, favoritos, comparador, CSS inline laranja, popup Diagnóstico 360, etc.).  
**Mantenha o seu `theme.liquid` atual** e faça só o patch abaixo.

---

## Patch mínimo (recomendado)

No bloco de CSS customizado, **depois** de `product-hover-image.css`, adicione:

```liquid
    <link media="all" type="text/css" rel="stylesheet" href="{{ 'assets/product-page-v2.css' | themeAssetUrl }}">
```

Opcional: no comentário `{%- comment -%} Custom CSS`, inclua a linha:

```text
      6. product-page-v2.css — página de produto (PDP v2)
```

Nada mais no `theme.liquid` é obrigatório para a PDP v2 (scripts de compare/hover que você já tem continuam iguais).

---

## Arquivo completo de referência (opcional)

Se quiser colar o layout **inteiro** já com a linha da PDP (base = header v2 + favoritos + compare, ~681 linhas):

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/pdp-integrate-v2-2cf7/docs/wdna/theme.liquid-PRODUCAO-COM-PDP.liquid

Salve no WDNA como `layout/theme.liquid` **somente** se bater com o que você usa hoje + essa linha extra.  
Se o seu arquivo local já é igual ao que você colou no chat, use só o **patch mínimo**.

---

## Ordem correta de deploy da PDP

1. `assets/product-page-v2.css`
2. `sections/product-descriptions-v2.liquid` (novo)
3. `sections/product-spec-icons.liquid` (novo, se ainda não existir)
4. `sections/product-compare-data.liquid` (novo, se Comparar na PDP)
5. `sections/product-content.liquid` (substituir **todo** — este é o arquivo grande da página de produto, não o theme)
6. **Patch** no `theme.liquid` (1 linha de CSS), não trocar pelo arquivo curto

Ver também: `docs/wdna/PDP-V2.md`
