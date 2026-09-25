# Diagnóstico Clima 360 — correções pós-auditoria (25/09/2026)

## Publicar no WDNA

1. **`pages/diagnostico-360-pagina-adicional.html`** — colar na página adicional `/pagina/diagnostico-360` (conteúdo completo).
2. Aguardar jsDelivr (~5 min) após push no GitHub.

Script (branch atual):

```
https://cdn.jsdelivr.net/gh/nevessimon56-glitch/Site-do-Ar@cursor/header-favoritos-v2-e52b/assets/diagnostico-360.js?v=20260925-audit
```

## O que mudou no JS (`assets/diagnostico-360.js`)

| Item auditoria | Correção |
|----------------|----------|
| Teto silencioso em 56.000 BTU/h | `exceedsCatalog`: mostra carga bruta, aviso, CTA principal → WhatsApp (não vitrine 56k) |
| Área alterada por ocupação/tipo | Removidos mínimos arbitrários de m² em `mapAnswersToBtuParams` |
| BTU antes de responder | Só calcula após responder **área** (`roomSize`); antes exibe **—** |
| Fatores ≠ calculadora BTU | Coeficientes alinhados a `calculadora-btus-wizard.js` (sol, andar, janelas, isolamento, uso, clima, horas, umidade) |
| Script duplicado idêntico | Removido retry `?r=2` na página HTML (uma tag `<script defer>`) |

## Ainda orientativo

O quiz continua sendo **estimativa preliminar**, não substitui projeto térmico. Textos de resultado e WhatsApp deixam isso explícito.

## Teste rápido (Console)

Após carregar a página:

```js
window.__diag360Ready
```

Deve ser `true`.

Cenário alto (manual): área >40 m² + comercial + muitos fatores → resultado deve mostrar **acima do catálogo**, sem CTA de compra na faixa 56.000 como “ideal”.
