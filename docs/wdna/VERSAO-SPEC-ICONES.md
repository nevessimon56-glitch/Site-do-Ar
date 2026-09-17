# Pills coloridas nos cards — versão bonita completa

**O que falta no site:** as etiquetas coloridas em cada produto (A, Q/F, Frio, Inverter, Cobre, 220V, Wi-Fi).

**Commit:** `70254aa` (branch `cursor/product-spec-icons-ed4c`)

---

## Arquivos para colar no WDNA (nesta ordem)

### 1 — NOVO: `sections/product-spec-icons.liquid`

Crie o arquivo se não existir.

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/70254aa/sections/product-spec-icons.liquid

### 2 — `sections/showcase-model-product.liquid`

Substitua **todo** o conteúdo.

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/70254aa/sections/showcase-model-product.liquid

### 3 — `assets/mega-menu.css`

Substitua **todo** o conteúdo (tem as cores das pills + preço Pix verde + parcelas + mobile).

> **IMPORTANTE:** o arquivo completo tem **~1500 linhas**. Se tiver menos de 1000 linhas, está incompleto e os cards ficam quebrados.

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/mobile-restore-ed4c/assets/mega-menu.css

### 4 — `assets/mega-menu.js`

Substitua **todo** o conteúdo (hover nos cards + mega menu).

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/70254aa/assets/mega-menu.js

> Este JS tem ~820 linhas (versão completa de ontem). **Não use** a branch `fix-logged-price-table`.

### 5 — Manter como está

- `layout/theme.liquid` — versão `c7be17c` (já com links CSS/JS)
- `sections/mega-menu-ar.liquid` — versão `c7be17c`
- `assets/product-hover-image.css` / `.js` — opcional (o mega-menu.js já cuida do hover)

---

## Cores das pills (identidade visual)

| Pill | Cor | Significado |
|------|-----|-------------|
| **A** | Verde | Procel classe A |
| **Q/F** | Laranja | Quente/Frio |
| **Frio** | Azul claro | Só frio |
| **Inverter** | Roxo | Tecnologia Inverter |
| **Cobre** | Bege/dourado | Serpentina cobre |
| **220V** | Azul | Voltagem |
| **Wi-Fi** | Verde-água | Conectividade |

---

## Testar depois

- [ ] Cada card da vitrine mostra pills coloridas abaixo do título
- [ ] Preço Pix com badge verde “% off no Pix”
- [ ] Parcelas “ou em até Nx…”
- [ ] Mega menu ok
- [ ] Catálogo abre

---

## Se o site ficar lento

Volte só o `mega-menu.js` para a versão simples:

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/c7be17c/assets/mega-menu.js

As pills coloridas **continuam** (estão no liquid + CSS).
