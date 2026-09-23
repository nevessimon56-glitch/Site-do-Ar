# Calculadora BTUs v4 (página adicional)

## Layout

- **Uma página**, 4 cartões + botão **Calcular BTUs Necessários** (não é wizard com “Continuar”).
- JavaScript expõe `window.sdaCalcular` e usa `#sda-btn-calc`, `#sda-comp`, `#sda-larg`, etc.

## O que quebrou

1. Foi colado o JS do **wizard de 3 etapas** (`#sda-calculadora`, `data-next`) — **incompatível** com este HTML.
2. Script externo dentro de `<p>...</p>` — o WDNA pode não carregar ou exibir como texto.
3. CDN apontando para branch/arquivo com JS errado.

## O que usar

Arquivo pronto (HTML + CSS + `<script>` inline):

`docs/wdna/calculadora-btus-v4-pagina-completa.html`

1. Copie **tudo** do arquivo.
2. Cole no conteúdo HTML da página adicional (substitua o conteúdo atual).
3. **Não** deixe `<script src="jsdelivr...">` separado nem JS solto fora de `<script>`.

## CDN (opcional)

Se preferir arquivo externo, publique `assets/calculadora-btus.js` (versão v4 com `sdaCalcular`) no tema e use **fora de `<p>`**:

```html
<script src="URL_DO_ASSET_NO_TEMA"></script>
```

Ou jsDelivr **depois** de merge na branch certa:

`https://cdn.jsdelivr.net/gh/nevessimon56-glitch/Site-do-Ar@main/assets/calculadora-btus.js`

(requer o arquivo v4 em `main`.)
