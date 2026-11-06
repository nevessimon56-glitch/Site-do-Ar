# Pills coloridas nos cards — versão integrada (hover + spec)

**Branch:** `cursor/product-visual-spec-pills-2cf7` (merge na `main` quando aprovado)

Combina:
- Hover Nike (`product-hover-wrap`) — correção de fotos empilhadas (`main`)
- Pills coloridas (A, Q/F, Frio, Inverter, Cobre, 220V, Wi-Fi)
- Preço Pix com badge verde + parcelas

---

## Arquivos para colar no WDNA (nesta ordem)

### 1 — NOVO: `sections/product-spec-icons.liquid`

Crie o arquivo se não existir.

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/product-visual-spec-pills-2cf7/sections/product-spec-icons.liquid

### 2 — `sections/showcase-model-product.liquid`

Substitua **todo** o conteúdo.

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/product-visual-spec-pills-2cf7/sections/showcase-model-product.liquid

### 3 — `assets/mega-menu.css`

Substitua **todo** o conteúdo (pills + preços + mega menu + fallback hover).

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/product-visual-spec-pills-2cf7/assets/mega-menu.css

### 4 — Manter da versão atual (`main` / `c7be17c`)

- `layout/theme.liquid` — links CSS/JS
- `sections/mega-menu-ar.liquid`
- `assets/mega-menu.js` — versão `c7be17c` (não usar `fix-logged-price-table`)
- `assets/product-hover-image.css` + `.js` — recomendado (hover em todo o site)

---

## Cores das pills

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

- [ ] Cada card mostra **uma** foto (sem empilhar)
- [ ] Hover / toque troca para 2ª foto quando existir
- [ ] Pills coloridas abaixo do título
- [ ] Preço Pix com badge verde “% off no Pix”
- [ ] Parcelas “ou em até Nx…”
- [ ] Mega menu ok

---

## Se o site ficar lento

Volte só o `mega-menu.js` para `c7be17c`. Pills e preços continuam (liquid + CSS).
