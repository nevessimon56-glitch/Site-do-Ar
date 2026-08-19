# Site Do Ar — Tema

## Diagnóstico Clima 360

O quiz roda como **Página Adicional** no WDNA (não como template de tema).

### Arquivos

| Arquivo | Função |
|---------|--------|
| `pages/diagnostico-360-pagina-adicional.html` | **Principal** — cole no admin WDNA (Páginas adicionais → `diagnostico-360`) |
| `pages/popup-diagnostico-360-snippet.html` | Referência do popup (já integrado em `layout/theme.liquid`) |
| `layout/theme.liquid` | Popup promocional no site inteiro |
| `templates/page.diagnostico.liquid` | Alternativa via template de tema (legado) |
| `sections/diagnostico-360.liquid` | Section do quiz em iframe (legado — use a página adicional) |

### Como publicar (WDNA)

1. **Quiz:** abra `pages/diagnostico-360-pagina-adicional.html`, copie **todo** o conteúdo e cole em **Páginas adicionais → diagnostico-360** (modo HTML, não editor visual).
2. **Meta tags:** no admin da página, preencha título e descrição conforme o cabeçalho do arquivo HTML.
3. **Popup:** publique `layout/theme.liquid` no editor de tema (ou substitua só o bloco `diag360pop` pelo snippet).
4. Teste em `/pagina/diagnostico-360`: home, quiz completo, links de produto e WhatsApp.

### Popup — regras

- **Visitante (não logado):** vê o popup em toda visita.
- **Cliente logado:** vê uma vez; depois de fechar, não aparece mais (`localStorage`).

### Correções incluídas

- Calculadora BTU alinhada à calculadora do site (`calcBtuSiteDoAr`).
- Links de produto apontam para URLs reais do catálogo (Split Inverter 9k–30k; Piso-Teto acima de 30k).
- Layout mobile dedicado; header/footer da loja ocultos na página do quiz.
- Logo com fallback quando o WDNA remove `<img>`.
