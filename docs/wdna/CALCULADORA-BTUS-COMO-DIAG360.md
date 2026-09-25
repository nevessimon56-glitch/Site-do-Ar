# Calculadora BTUs — mesmo padrão do Diagnóstico 360

## Por que o Diagnóstico funciona e a calculadora não (antes)

| Diagnóstico 360 | Calculadora (erro comum) |
|-----------------|---------------------------|
| Texto com **entidades HTML** (`&ccedil;`, `&oacute;`) | UTF-8 “cru” → `tÃ©rmica`, `mÂ²` |
| **JS externo** no jsDelivr | Script **inline** gigante (WDNA corta ou não executa) |
| `<script src="...">` dentro de `<p>...</p>` | JS solto ou só `<script>` sem src |
| Fallback se CDN falhar (`__diag360Ready`) | Sem flag / sem retry |
| JS move `#diag360-overlay` para `document.body` (overlay tela cheia) | **Calculadora NÃO move** — fica no conteúdo da página, acima do footer |

## O que colar no WDNA

Arquivo: **`docs/wdna/calculadora-btus-etapas-pagina-completa.html`**

( cópia idêntica: `calculadora-btus-pagina-adicional-cdn.html` )

1. Copie **tudo** (comentários, `<style>`, HTML, bloco `<p>` com jsDelivr no final).
2. **Não** cole o `.js` no corpo da página.
3. Aguarde alguns minutos após push no GitHub para o jsDelivr atualizar.

## Etapa 3 ao abrir / footer em cima

- O tema WDNA pode forçar `section { display: block !important }`, exibindo **todas** as etapas (parece “pular” para a 3).
- A v10 do HTML inclui CSS com `!important` + script **inline** logo após `#sda-calculadora` que força **Etapa 1** antes do CDN carregar.
- **Footer sobre a calculadora:** o template da página **não basta** — é preciso **publicar o tema** com `layout/theme.liquid` atualizado, que carrega:
  - `assets/calculadora-btus-page.css`
  - `assets/calculadora-btus-layout.js` (mede sobreposição e empurra o rodapé para baixo)
- No admin WDNA: template **`page.calculadora-btus`** na página + tema publicado.

## URL do script (atual)

```
https://cdn.jsdelivr.net/gh/nevessimon56-glitch/Site-do-Ar@cursor/header-favoritos-v2-e52b/assets/calculadora-btus-wizard.js?v=8
```

Quando fizer merge na `main`, troque no HTML `@cursor/header-favoritos-v2-e52b` por `@main` (como preferir no Diagnóstico com `@cursor/fix-diagnostico-360-ed4c`).

## Asset no repositório

- `assets/calculadora-btus-wizard.js` — lógica das 3 etapas + `window.__sdaBtuWizardReady = true`

## Teste rápido

Abra a loja → F12 → Console → após carregar a página:

```js
window.__sdaBtuWizardReady
```

Deve ser `true`. Se for `undefined`, o CDN não carregou (branch errada ou cache).
