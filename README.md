# Site Do Ar — Tema

## Diagnóstico Clima 360

Arquivos do quiz interativo:

| Arquivo | Função |
|---------|--------|
| `templates/page.diagnostico.liquid` | Template da página — esconde header/footer do tema |
| `sections/diagnostico-360.liquid` | Section com o quiz isolado em iframe |
| `layout/theme.liquid` | Layout principal com popup promocional |

### Como publicar

1. Faça upload dos 3 arquivos nas pastas correspondentes do editor de tema.
2. Crie uma página no admin com o template **page.diagnostico** e URL `/pagina/diagnostico-360`.
3. A section `diagnostico-360` deve estar incluída no template (já configurado).

### Correções aplicadas

- **JavaScript quebrado**: o `</script>` dentro do HTML do iframe encerrava o script pai. Solução: HTML em `<script type="text/plain">`.
- **Layout desalinhado**: CSS do tema vazava para o quiz. Solução: iframe `srcdoc` + ocultar chrome do tema na página do diagnóstico.
- **Popup recarregava o site**: botão "Agora não" agora usa `preventDefault`/`stopPropagation` e não move o DOM do popup.
