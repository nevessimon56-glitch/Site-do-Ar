# Como saber se a oferta nova está no ar

1. No celular, toque **Oferta da semana** no header.
2. Deve abrir tela cheia com **“O clima certo muda tudo.”** (fundo claro), não só a vitrine da home.
3. **Ver código-fonte** da loja (ou inspecionar) e buscar:
   - `data-sda-oferta-version="2026-03-25-mobile"`
   - `O clima certo`

Se **não achar**, o tema WDNA ainda não tem os arquivos novos.

## Mínimo para funcionar (só header + assets)

| Arquivo WDNA |
|--------------|
| `sections/header.liquid` (inclui overlay + scripts) |
| `sections/oferta-semana-overlay.liquid` |
| `assets/oferta-semana.css` |
| `assets/oferta-semana.js` |
| `assets/ofertas-semana-config.js` |

`layout/theme.liquid` **não é obrigatório** para o overlay (desde mar/2026 o overlay vem no header).

Limpe cache do navegador ou abra aba anônima após publicar.
