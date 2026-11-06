# Calculadora BTUs — não avança da etapa 1

## Causa

O botão **Continuar** chama `validate(1)`. Se comprimento/largura estiverem vazios, a mensagem ia para `#sda-error`, que fica **dentro da etapa 3** (`display: none`). Você clica, nada parece acontecer.

Se `#sda-error` não existir no HTML publicado, o JavaScript pode **quebrar** ao tentar `classList.remove('show')` mesmo com campos válidos — aí também não avança.

## Correção mínima (colar no WDNA)

### 1) Em cada etapa, antes dos botões, adicione:

**Etapa 1** (antes de `.step-actions`):

```html
<div class="error" id="sda-error-step1" role="alert"></div>
```

**Etapa 2** (idem):

```html
<div class="error" id="sda-error-step2" role="alert"></div>
```

**Etapa 3** — renomeie ou duplique:

```html
<div class="error" id="sda-error-step3" role="alert"></div>
```

(pode manter `id="sda-error"` na 3 como fallback)

### 2) Troque o `<script>...</script>` inline por:

```html
<script src="{{ 'assets/calculadora-btus.js' | themeAssetUrl }}" defer></script>
```

(ou publique `assets/calculadora-btus.js` do repositório e use a URL do tema)

### 3) Etapa 3 — botão calcular

Troque `type="submit"` por `type="button"` e `data-calc-submit`:

```html
<button type="button" class="btn btn-orange" data-calc-submit>Calcular BTUs</button>
```

Evita conflito se a página WDNA estiver dentro de outro `<form>`.

### 4) Teste

- Etapa 1 vazia → mensagem vermelha **na própria etapa 1**
- Preencher `4` e `3` (ou `4,5` e `3,2`) → **Continuar** abre etapa 2

## Opção completa no Git

- `assets/calculadora-btus.js` — lógica corrigida  
- `sections/calculadora-btus.liquid` + `templates/page.calculadora-btus.liquid` — página dedicada (CSS inline do seu layout permanece na section ou no editor)
