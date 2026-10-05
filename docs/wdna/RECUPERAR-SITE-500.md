# Site com “Página não encontrada!” (HTTP 500)

Quando **a home e todas as páginas** mostram só `<h1>Página não encontrada!</h1>`, o WDNA está com **erro fatal no tema** (Liquid quebrado ou `{% render %}` apontando para arquivo que não existe).

Isso **não** é causado só pelo CSS da PDP — é quase sempre **`layout/theme.liquid`** ou uma **section global** colada incompleta.

---

## Recuperação rápida (faça nesta ordem)

### 1. Restaurar o `theme.liquid`

No painel WDNA → **Layout → theme.liquid**:

- Use **Histórico / versão anterior** se existir, **ou**
- Cole de novo o arquivo de produção (~680 linhas) que você tinha **antes** da última alteração, **ou**
- Referência do repo (já com link do PDP v2):  
  https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/pdp-integrate-v2-2cf7/docs/wdna/theme.liquid-PRODUCAO-COM-PDP.liquid  

Salve e teste a **home**.

### 2. Se ainda falhar — comente a linha nova do PDP

No `<head>`, **comente temporariamente**:

```liquid
{% comment %}
<link media="all" type="text/css" rel="stylesheet" href="{{ 'assets/product-page-v2.css' | themeAssetUrl }}">
{% endcomment %}
```

Salve e teste a home. Se voltar, faça upload de `assets/product-page-v2.css` no WDNA e descomente.

### 3. Sections que o `theme.liquid` chama (não podem faltar)

Estas aparecem no `theme.liquid` e precisam existir no WDNA (não estão todas no GitHub):

- `sections/check-cookie`
- `sections/sidenav-overlay-cart`
- `sections/sidenav-overlay-favorites`
- `sections/mega-menu-ar`
- `sections/product-compare-panel`
- `sections/theme-schema`

Se você apagou ou renomeou alguma, **restaure do backup do painel**.

### 4. `product-content.liquid`

Só afeta **página de produto**. Se a home já abre mas o produto não:

- Confirme que colou o arquivo **inteiro** (1366 linhas na branch `cursor/pdp-integrate-v2-2cf7`).
- Confirme que existem no WDNA:
  - `sections/product-descriptions-v2.liquid`
  - `sections/product-spec-icons.liquid`
  - `sections/product-pdp-spec-bar.liquid` (render interno)
  - `sections/product-compare-data.liquid` (se usar Comparar)

---

## Mensagem “produto não encontrado”

No `product-content.liquid`, o texto *“Desculpe, sua busca por este produto…”* aparece quando **`{% if product %}` é falso** (URL/slug errado ou produto inativo). Isso é **404 de produto**, não queda do site inteiro.

---

## Depois que a home voltar

Deploy da PDP na ordem de `docs/wdna/PDP-V2.md`: CSS → sections novas → `product-content.liquid` → **só então** a linha do CSS no `theme.liquid`.
