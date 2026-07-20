# Restaurar o visual — Site do Ar (seguro)

**Situação:** site estável (compra ok, Mercado Pago ok). Agora reaplicar o visual **um arquivo por vez**.

**Branch de referência:** `main`  
**Base raw:** `https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/main/`

---

## O que volta a ficar “bonito”

| Recurso | Arquivo(s) |
|---------|------------|
| Mega menu Ar Condicionado + carrossel | `mega-menu.css`, `mega-menu.js`, `mega-menu-ar.liquid` |
| Hover de imagem nos cards (estilo Nike) | `product-hover-image.css`, `product-hover-image.js`, `showcase-model-product.liquid` |
| Preço Pix nos cards | `showcase-model-product.liquid` |
| Filtros mobile no catálogo | `search-filter.liquid` |
| Popup Diagnóstico 360 | trechos no `theme.liquid` (opcional) |

---

## Regra de ouro

1. **Um arquivo** → publicar → testar → próximo  
2. **Nunca** substituir `theme.liquid` inteiro — só **adicionar trechos** ([`THEME_LIQUID_TRECHOS.md`](THEME_LIQUID_TRECHOS.md))  
3. **Nunca** usar `mega-menu.js` v8–v11 (branch `fix-logged-price-table`)  
4. Testar sempre: home, catálogo, um produto, carrinho  

---

## Ordem de aplicação

### Passo A — `assets/mega-menu.css`

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/main/assets/mega-menu.css

**Testar:** home, menu desktop (hover em “Ar Condicionado”), mobile.

---

### Passo B — `assets/mega-menu.js` (~180 linhas)

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/main/assets/mega-menu.js

**Testar:** mega menu abre, carrossel no banner do menu, catálogo ok.

---

### Passo C — `sections/mega-menu-ar.liquid`

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/main/sections/mega-menu-ar.liquid

Só funciona se o `theme.liquid` tiver `{% render 'sections/mega-menu-ar' %}` (Passo G).

**Testar:** categorias Split / Piso Teto / Janela no dropdown.

---

### Passo D — `assets/product-hover-image.css`

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/main/assets/product-hover-image.css

---

### Passo E — `assets/product-hover-image.js`

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/main/assets/product-hover-image.js

**Testar:** passar o mouse nos cards da vitrine — troca a foto.

---

### Passo F — `sections/showcase-model-product.liquid`

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/main/sections/showcase-model-product.liquid

**Testar:** preços com “5% de desconto no Pix”, hover nos cards, botão Comprar.

---

### Passo G — `layout/theme.liquid` (só trechos)

**Não colar o arquivo inteiro.** Adicione só o que faltar — ver [`THEME_LIQUID_TRECHOS.md`](THEME_LIQUID_TRECHOS.md).

**Testar:** CSS/JS carregam (F12 → Network), mega menu aparece.

---

### Passo H — `sections/search-filter.liquid` (se catálogo mobile precisar)

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/main/sections/search-filter.liquid

> Nome no WDNA: **`search-filter.liquid`** (singular).

**Testar:** `/Todos-os-Produtos` abre (não pode dar erro 500).

---

### Passo I — `sections/product-content.liquid` (opcional)

Só se a página do produto perdeu layout ou preço Pix.

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/main/sections/product-content.liquid

---

### Passo J — Popup Diagnóstico 360 (opcional)

Trecho no final do `theme.liquid` — ver [`THEME_LIQUID_TRECHOS.md`](THEME_LIQUID_TRECHOS.md) seção 5.

---

## Checklist final

- [ ] Home com mega menu e cards com hover  
- [ ] Catálogo abre  
- [ ] Página de produto ok  
- [ ] Carrinho + checkout (Mercado Pago)  
- [ ] Compra teste com valor correto  

---

## Se algo quebrar

1. WDNA → Temas → **Histórico de versões** → restaurar a anterior  
2. Ou reverter **só o último arquivo** que você colou  
3. Não colar vários arquivos de uma vez  

---

## Como pedir ajuda

Responda: **"pode aplicar passo X"** — confirmamos o link antes de você colar.
