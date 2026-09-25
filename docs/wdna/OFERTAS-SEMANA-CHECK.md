# Como saber se a oferta nova está no ar

1. No celular, toque **Oferta da semana** no header.
2. Deve abrir tela cheia com **“O clima certo muda tudo.”** (fundo claro), não só a vitrine da home.
3. **Ver código-fonte** da loja (ou inspecionar) e buscar:
   - `data-sda-oferta-version="2026-03-25-mobile-v4"`
   - `?v=20260325-v4` no CSS/JS da oferta

Se **não achar**, o tema WDNA ainda não tem o **header.liquid v4** publicado.

## Mínimo para funcionar (v4 — overlay dentro do header)

| Arquivo WDNA |
|--------------|
| `sections/header.liquid` (overlay **inline**, não depende de section extra) |
| `assets/oferta-semana.css` |
| `assets/oferta-semana.js` |
| `assets/ofertas-semana-config.js` |

Simulação local: `simulacao-oferta-mobile.html` — ver `docs/wdna/OFERTAS-PASTAS-WDNA.md`.

`layout/theme.liquid` **não é obrigatório** para o overlay (desde mar/2026 o overlay vem no header).

Limpe cache do navegador ou abra aba anônima após publicar.
