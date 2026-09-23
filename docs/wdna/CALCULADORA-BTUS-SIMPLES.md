# Calculadora BTUs — simples + visual (recomendado)

**Um arquivo só** na página adicional WDNA: funciona sem pastas, CDN ou arquivos no tema.

## Arquivo

`docs/wdna/calculadora-btus-simples.html`  
Versão no topo do arquivo: **`v7-result-box`** (mesma lógica de resultado do v4 original)

- **Funcional:** uma tela, botão **Calcular BTUs**, JS inline (`window.sdaCalcular`).
- **Visual:** hero azul/laranja Site do Ar, 3 blocos numerados, resultado em destaque.

## WDNA

1. Copie **todo** o HTML do arquivo.
2. Cole na página adicional Calculadora BTUs (substitua o conteúdo).
3. Salve. Template da página pode ser o **padrão** (não precisa `page.calculadora-btus`).

## Teste

F12 → `window.__sdaCalcProReady` deve ser `true` e `typeof window.sdaCalcular` deve ser `"function"`.

Se o botão não responder:

1. Veja se trechos `(function () {` aparecem **como texto** na página — a WDNA quebrou o `<script>` (often dentro de `<p>`). Recole o HTML v6 ou use o fallback jsDelivr no final do arquivo.
2. Com campos vazios, deve aparecer mensagem vermelha pedindo comprimento/largura (isso também prova que o JS rodou).
