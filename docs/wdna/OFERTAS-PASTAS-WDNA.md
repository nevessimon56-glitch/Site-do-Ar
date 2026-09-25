# Pastas corretas no editor WDNA (oferta da semana)

## Erro comum

| Errado | Certo |
|--------|--------|
| Enviar pasta `assets/` inteira do GitHub | Só **um arquivo por vez** dentro de `assets/` |
| `assets/assets/oferta-semana.css` | `assets/oferta-semana.css` |
| `sections/sections/header.liquid` | `sections/header.liquid` |
| Só `oferta-semana-overlay.liquid` sem header | **`sections/header.liquid`** (overlay está **dentro** dele, v4+) |
| Section `oferta-semana-overlay` no render | **Não precisa mais** — overlay inline no header |

## Árvore mínima (v4)

```
sections/
  header.liquid          ← overlay + CSS/JS link + banner oferta

assets/
  oferta-semana.css
  oferta-semana.js
  ofertas-semana-config.js
  header-v2.css          ← estilo do banner mobile
```

Opcional: `layout/theme.liquid` (só se quiser CSS global duplicado; header já carrega oferta-semana.css).

## Como validar no ar

1. Código-fonte da loja → buscar `data-sda-oferta-version="2026-03-25-mobile-v4"`.
2. Se aparecer **v3** ou **sem atributo** → header antigo ainda publicado.
3. Buscar `?v=20260325-v4` nos links de CSS/JS da oferta.

## Simulação local (antes do WDNA)

Na raiz do repo:

```bash
cd /caminho/Site-do-Ar
python3 -m http.server 8765
```

Abrir no navegador (modo celular 414px):

`http://localhost:8765/simulacao-oferta-mobile.html`

Botão **Abrir oferta** → hero no topo, foto demo, barra inferior **Ver produto** com texto branco.
