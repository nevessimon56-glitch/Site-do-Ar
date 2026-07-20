# theme.liquid — só estes trechos (não substituir o arquivo)

Abra o `theme.liquid` **que já está no WDNA** e confira se cada trecho existe. Se faltar, **adicione** no lugar indicado.

---

## 1. CSS no `<head>` (depois de `theme-custom.css`)

```liquid
    <link media="all" type="text/css" rel="stylesheet" href="{{ 'assets/mega-menu.css' | themeAssetUrl }}">
    <link media="all" type="text/css" rel="stylesheet" href="{{ 'assets/product-hover-image.css' | themeAssetUrl }}">
```

---

## 2. Mega menu template (antes de `{% block content %}`)

```liquid
{% render 'sections/mega-menu-ar' %}
```

Coloque junto dos outros `{% render 'sections/...' %}`, por exemplo depois do carrinho lateral.

---

## 3. JS antes de `</body>` (depois de `scripts.main`)

```liquid
<script src="{{ 'assets/mega-menu.js' | themeAssetUrl }}" defer></script>
<script src="{{ 'assets/product-hover-image.js' | themeAssetUrl }}" defer></script>
<script>
  window.addEventListener('load', function () {
    if (typeof window.initMegaMenuAr === 'function' && !document.querySelector('.mega-menu-ar')) {
      window.initMegaMenuAr();
    }
  });
</script>
```

---

## 4. Conferir se já existe (não duplicar)

O `theme.liquid` do WDNA já deve ter:

- `x-data="setupStore()"` no `<body>`
- `function setupStore()` com login (`changeCustomerLogin`, `checkLoginLogged`)
- `{{ 'assets/theme.js' | themeAssetUrl }}` e demais CSS padrão WDNA

**Não apague** nada disso. Só adicione os trechos 1–3 se faltarem.

---

## 5. Popup Diagnóstico 360 (opcional)

No final do arquivo, **antes** de `</body>`, o bloco HTML + CSS + script do popup (linhas ~237–409 do `layout/theme.liquid` na branch `main`).

Link completo:  
https://github.com/nevessimon56-glitch/Site-do-Ar/blob/main/layout/theme.liquid#L237-L409

Só aplique se quiser o popup “Qual ar-condicionado é ideal para você?”.

---

## O que NÃO fazer

- Substituir o `theme.liquid` inteiro pelo GitHub  
- Colar o conteúdo de `mega-menu.css` dentro do `.js`  
- Duplicar os mesmos `<link>` ou `<script>` duas vezes  
