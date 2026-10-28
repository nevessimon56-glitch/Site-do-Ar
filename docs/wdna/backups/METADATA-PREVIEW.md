# Metadados — tema preview (Etapa Header)

**Atualizado:** 28 out 2026 (America/Sao_Paulo)

| Campo | Valor | Confiança |
|-------|--------|-----------|
| URL informada pelo operador (preview) | `https://sitedoar.com.br` (e `https://www.sitedoar.com.br`) | Declaração operador |
| themeId editor preview (painel) | **11** — `/admin/personalize/themes/edit/11` | Declaração operador |
| themeId na vitrine **anônima** (curl 28/out/2026 03:20 UTC-3) | **3** — 19× `.../themes/3/assets` na home | **Comprovado** |
| themeId **11** na vitrine anônima | **Não observado** | **Comprovado** (ausência) |
| Header v2 na vitrine (`header-utility`, `#myForm2Desktop`) | **Presente** | **Comprovado** (HTML) |

## Interpretação (sem acesso ao painel)

1. **Hipótese A:** “Preview” no WDNA abre em `sitedoar.com.br` apenas **logado no admin** ou via botão Visualizar — visitante anônimo continua no tema **3** publicado.  
2. **Hipótese B:** Operador usará o domínio principal para validar **depois** de publicar tema 11 — **não** é estado atual do CDN.  
3. **Hipótese C:** Tema 11 ainda não está ligado à vitrine; editor 11 ≠ HTML servido ao público.

## Ação requerida (operador)

- [ ] No painel, abrir **Visualizar** do tema **11** e copiar a URL **completa** (query/subdomínio se houver).  
- [ ] Confirmar se tema **11** está **publicado** ou **rascunho** (não publicar sem checklist E-10+).  
- [ ] Com URL de preview real, repetir: DevTools → Network → asset → path `themes/{id}/`.

## Critério de isolamento (E-08)

Preview considerado **isolado** quando `themes/11/` aparecer na URL de teste **e** `sitedoar.com.br` anônimo permanecer em `themes/3/` **ou** quando a URL de preview for distinta do tráfego de clientes.

**Status E-07 / E-08:** URL registrada parcialmente; **isolamento theme 11 na vitrine — NÃO comprovado** (28/out/2026).

**Decisão operacional:** preparação e testes pós-upload no **themeId 3**; tema 11 não bloqueia o patch documentado em [`ETAPA_HEADER_PATCH_PROPOSTO.md`](../../ETAPA_HEADER_PATCH_PROPOSTO.md).

**Decisão operacional (28/out/2026):** etapa Header prossegue preparação e testes pós-upload no **themeId 3** publicado; tema 11 permanece registro editor, não alvo obrigatório do patch.
