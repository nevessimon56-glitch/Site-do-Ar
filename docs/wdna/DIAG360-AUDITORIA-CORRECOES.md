# Diagnóstico Clima 360 — deploy WDNA (página adicional)

Mesmo fluxo da **calculadora BTU**: HTML colado na página do admin + template no tema.

## 1. Tema WDNA

| Pasta | Arquivo | Ação |
|-------|---------|------|
| `templates/` | `page.diagnostico.liquid` | Substituir (renderiza `{{ page.content }}`) |

A **`sections/diagnostico-360.liquid`** pode ficar vazia / não usada — o quiz **não** vem da section.

## 2. Admin — página adicional

1. Slug: `diagnostico-360` → `/pagina/diagnostico-360`
2. Template: **`page.diagnostico`**
3. Corpo: copiar **inteiro** de  
   **`pages/diagnostico-360-pagina-adicional.html`** (GitHub, branch `cursor/header-favoritos-v2-e52b`)

Use o editor em **modo HTML / código-fonte**. Se o WDNA separar emoji dos botões, recole do GitHub (estrutura correta: emoji **dentro** de cada `<button class="d-option">`).

## 3. Script (BTU corrigido)

No final do HTML colado deve existir **só uma** linha:

```html
<script src="https://cdn.jsdelivr.net/gh/nevessimon56-glitch/Site-do-Ar@cursor/header-favoritos-v2-e52b/assets/diagnostico-360.js?v=20260925-audit" defer></script>
```

**Apague** na sua página antiga:

- `@cursor/fix-diagnostico-360-ed4c/...`
- O `setTimeout` que carrega `?r=2` de novo (mesmo arquivo duplicado)

## 4. Valores iniciais corretos

| Elemento | Deve mostrar |
|----------|----------------|
| `#dLiveBtu` / `#dMobBtu` | **—** (não `9.000` nem `24.000`) |
| Após responder **área** | BTU estimado |

Console: `window.__diag360Ready === true`

## 5. Meta tags (admin)

- Title / description conforme comentários no topo do HTML de referência.
