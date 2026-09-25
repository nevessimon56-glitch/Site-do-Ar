# Calculadora BTUs — página única (recomendado WDNA)

Visual **laranja/navy** igual ao wizard, porém **uma tela só** — sem Continuar/Voltar (evita bugs de etapa na WDNA).

## O que colar no WDNA

Arquivo: **`docs/wdna/calculadora-btus-pagina-unica.html`**

1. Copie **todo** o conteúdo na página adicional (modo HTML).
2. Template da página: **`page.calculadora-btus`** (mantém layout/footer).
3. Tema publicado com `calculadora-btus-page.css?v=4` e `calculadora-btus-layout.js?v=4`.

## Scripts (jsDelivr)

- `calculadora-btus-layout.js?v=4` — ordem calculadora / rodapé
- `calculadora-btus-single.js?v=1` — cálculo e botão **Calcular BTUs**

**Não** inclua `calculadora-btus-wizard.js` nesta página.

## Teste (F12)

```js
window.__sdaBtuSingleReady   // true
window.__sdaBtuWizardReady   // undefined
```
