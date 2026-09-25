# Calculadora BTUs — use o **original v4**

A WDNA costuma **remover o `<script>` inline**. Por isso o arquivo de colagem traz o **HTML/CSS original** + uma linha **jsDelivr** no final (mesmo JavaScript do v4).

## Arquivo para colar (único)

**`docs/wdna/calculadora-btus-simples.html`**

(Cópia fiel de `calculadora-btus-v4-pagina-completa.html` + script externo de backup.)

Link direto no GitHub (branch do PR):

https://github.com/nevessimon56-glitch/Site-do-Ar/blob/cursor/header-favoritos-v2-e52b/docs/wdna/calculadora-btus-simples.html

1. Abra o link → **Raw** / copiar arquivo inteiro.
2. WDNA → página **Calculadora Btus** → modo HTML → **apague tudo** → cole → salve.

## Como funciona (original)

- Botão: `onclick="return sdaCalcular(event)"`
- Resultado: `#sda-resultBox` com classe **`result-box`** + **`show`**
- Erro: **`error-msg`**
- Cards **Ver modelos** com URLs do catálogo (`/split-inverter/9000-btus`, etc.)

## Teste

- Comprimento **4**, largura **3** → **Calcular BTUs Necessarios**
- F12: `typeof sdaCalcular` → `"function"`
- Código-fonte da página publicada: deve existir `calculadora-btus.js?v=orig` **ou** o bloco `<script>(function () {` antes do `</script>`
