# Depois de apagar as pastas/arquivos de oferta no WDNA

Apagar `oferta-semana.*`, overlay, template, etc. **está ok**. Só não pode ficar o **`header.liquid`** (ou `theme.liquid`) **chamando** arquivos que não existem mais.

## 1) Loja abre normal?

- Se **“Página não encontrada”** ou erro 500 → primeiro **`RECUPERAR-SITE-APOS-UPLOAD-PASTAS.md`** (tema base / `theme.js`, layouts).
- Isso **não** se resolve recriando oferta.

## 2) Limpar o header no editor WDNA

Abra **`sections/header.liquid`** e:

### A) Apague **tudo depois** da linha `</header>`

Ou seja, remova:

- `<link ... oferta-semana.css ...>`
- `<div ... data-sda-oferta-overlay ...>` (overlay inteiro)
- `<script ... ofertas-semana-config.js`
- `<script ... oferta-semana.js`
- `<script>` do clique `#sda-oferta-immersiva`

O arquivo deve **terminar** logo após `</header>` (e o `<script>` interno do header, se estiver **antes** de `</header>`).

### B) Banner “Oferta da semana” (opcional)

**Esconder:** no CSS ou comentar o bloco `header-v2-mobile-offer` no Liquid.

**Ou link simples:** no topo do header, altere:

```liquid
{% assign sdaOfferWeekUrlUser = '/' %}
```

(ou a URL da vitrine real, **nunca** `/#sda-oferta-immersiva` sem overlay)

### C) No `layout/theme.liquid`

Se existir link/script de `oferta-semana` no `<head>` ou antes do `</body>`, **apague** essas linhas.

## 3) Admin — página customizada

Se existir página **oferta-da-semana**, despublique ou apague no admin (evita 404).

## 4) GitHub

Pode **fechar a PR #33** sem merge. O repo no GitHub **não afeta** a loja até você colar de novo no WDNA.

## 5) Header v2 **sem** oferta (favoritos + mobile)

Depois de limpar, se quiser só mobile/favoritos:

- `assets/header-v2.css`
- `assets/favorites.css` + `favorites.js`
- `header.liquid` **sem** bloco oferta (versão antiga do header ou cortar manualmente)

Ver **`PUBLICAR-HEADER-MOBILE-SEGURO.md`**.
