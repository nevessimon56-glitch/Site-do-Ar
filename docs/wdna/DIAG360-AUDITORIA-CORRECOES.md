# Diagnóstico Clima 360 — deploy WDNA (section + template)

Igual ao fluxo da **calculadora**: você **não** precisa colar HTML gigante em “página adicional” nem criar arquivos em `assets/` no editor WDNA.

## Arquivos no tema WDNA (só estes dois)

| Pasta | Arquivo | Ação |
|-------|---------|------|
| `sections/` | `diagnostico-360.liquid` | Substituir **inteiro** |
| `templates/` | `page.diagnostico.liquid` | Substituir **inteiro** |

## Admin da loja

1. Página **Diagnóstico Clima 360** → slug `diagnostico-360` → URL `/pagina/diagnostico-360`
2. Template: **`page.diagnostico`**
3. Corpo da página adicional: **pode ficar vazio** (o quiz vem da section)

## JavaScript (BTU / 15 perguntas)

A section carrega automaticamente:

```
https://cdn.jsdelivr.net/gh/nevessimon56-glitch/Site-do-Ar@cursor/header-favoritos-v2-e52b/assets/diagnostico-360.js?v=20260925-audit
```

Aguarde ~5 min após push no GitHub. Console: `window.__diag360Ready === true`.

(O arquivo `assets/diagnostico-360.js` existe no **GitHub** para o CDN; **não** é obrigatório publicá-lo manualmente no WDNA.)

## Correções da auditoria (25/09/2026)

- Sem teto silencioso em 56.000 BTU/h (estado “acima do catálogo” + WhatsApp)
- Área não é mais alterada por ocupação/tipo
- BTU ao vivo só depois de responder **área** (`—` antes disso)
- Fatores alinhados à calculadora BTU (`calculadora-btus-wizard.js`)

## Referência opcional

`pages/diagnostico-360-pagina-adicional.html` — mesmo conteúdo que a section, para quem ainda usa página adicional no admin (legado). **Preferir section + template.**
