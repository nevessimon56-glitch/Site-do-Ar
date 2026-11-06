# Calculadora BTUs — página adicional (só editor WDNA)

Tudo fica **no conteúdo da página adicional**. Não usa `sections/`, nem arquivo em `assets/`.

## Se a página mostra código JavaScript em azul (texto na tela)

Isso acontece quando o conteúdo de um arquivo `.js` é colado **no corpo da página** sem `<script>`, ou quando o editor está em modo “texto/código” no lugar errado.

**Corrija assim:**

1. Abra a página adicional **Calculadora Btus** no WDNA.
2. O corpo deve começar com **HTML** (`<div class="sda-calc" id="sda-calculadora">` …), depois os `<style>`, e **por último** um único bloco:
   ```html
   <script>
   (function(){ ... todo o JS aqui ... })();
   </script>
   ```
3. **Apague** do topo/meio da página qualquer trecho que comece com `(function () { 'use strict';` ou `Calculadora BTUs — Site do Ar` **fora** de `<script>`.
4. **Não** cole o arquivo `calculadora-btus.js` solto na página. **Não** use `<script src="...">` na página adicional se o WDNA não processar Liquid/URL do tema (isso também pode virar texto).
5. Salve e teste: deve aparecer o hero azul “Descubra a potência ideal…”, não linhas de código.

Mantenha um backup do HTML completo (como estava antes do erro) e aplique só o patch da etapa 1 abaixo.

## 1) HTML — etapa 1

Antes de `<div class="step-actions">` da **etapa 1**, cole:

```html
<div class="error" id="sda-error-step1" role="alert"></div>
```

(Opcional: `id="sda-error-step2"` na etapa 2; na 3 pode manter `id="sda-error"` ou usar `sda-error-step3`.)

## 2) JavaScript — substituir funções

No `<script>` que já está no final da página, **apague** as funções `validate` e o bloco que usa só `get('sda-error')` no clique de Continuar, e **cole** isto no lugar (mantendo o resto do script igual: `catalog`, `showStep`, `calculate`, listeners, etc.):

```javascript
  function errorElForStep(n) {
    return get('sda-error-step' + n) || get('sda-error');
  }

  function hideAllErrors() {
    for (var s = 1; s <= 3; s++) {
      var el = errorElForStep(s);
      if (el) el.classList.remove('show');
    }
  }

  function showError(stepNum, msg) {
    hideAllErrors();
    var el = errorElForStep(stepNum);
    if (el) {
      el.textContent = msg;
      el.classList.add('show');
    }
  }

  function validate(n) {
    var msg = '';
    if (n === 1) {
      var c = parseNum('sda-comp', NaN);
      var l = parseNum('sda-larg', NaN);
      markField('sda-comp', !(c > 0));
      markField('sda-larg', !(l > 0));
      if (!(c > 0) && !(l > 0)) {
        msg = 'Informe o comprimento e a largura do ambiente para continuar.';
      } else if (!(c > 0)) {
        msg = 'Informe o comprimento do ambiente para continuar.';
      } else if (!(l > 0)) {
        msg = 'Informe a largura do ambiente para continuar.';
      }
    }
    if (msg) {
      showError(n, msg);
      return false;
    }
    hideAllErrors();
    return true;
  }
```

## 3) `showStep` — limpar erro ao trocar etapa

Dentro de `showStep`, depois de atualizar a barra de progresso, adicione uma linha:

```javascript
    hideAllErrors();
```

## Por que parava na etapa 1

A validação escrevia em `#sda-error`, que fica na **etapa 3** (oculta). Sem comprimento/largura você não via mensagem; com campos ok, se `#sda-error` faltasse, o script podia quebrar e não chamava `showStep(2)`.

## Teste

- Vazio → aviso vermelho na etapa 1.
- `4` e `3` → Continuar abre etapa 2.
