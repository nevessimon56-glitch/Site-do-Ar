# Calculadora BTUs — versão simples (recomendada)

**Um único arquivo** para colar na página adicional WDNA. Igual à calculadora **original**: uma tela, cartões azuis, botão **Calcular BTUs**.

## Arquivo

`docs/wdna/calculadora-btus-simples.html`

1. Abra o arquivo no GitHub e copie **tudo** (do primeiro comentário até o final do `</script>`).
2. WDNA → Página adicional Calculadora BTUs → conteúdo HTML → **substituir tudo** e salvar.
3. Template da página: pode ser o **padrão** da loja (não precisa `page.calculadora-btus`).
4. **Não** suba JS/CSS no tema para esta versão.
5. **Não** use junto `calculadora-btus-wizard.js`, `single.js` ou HTML de 3 etapas.

## Teste

Console (F12): `typeof window.sdaCalcular` → `"function"`.

Preencha comprimento e largura → **Calcular BTUs Necessários** → resultado abaixo.
