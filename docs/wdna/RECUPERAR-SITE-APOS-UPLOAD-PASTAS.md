# Recuperar loja após subir pastas `assets/` ou `layout/`

## O que aconteceu

Este repositório GitHub **não é o tema completo da WDNA**. Ele só guarda os arquivos que **nós alteramos** (header v2, favoritos, calculadora, etc.).

Se no painel WDNA você fez **upload da pasta inteira** `assets/` ou `layout/` do GitHub (ZIP ou “substituir pasta”), é provável que:

| Pasta enviada | Risco |
|---------------|--------|
| **`layout/`** | Ficou só `theme.liquid` e **sumiram** os outros layouts (`home.liquid`, `product.liquid`, `category.liquid`, …) → loja mostra **“Página não encontrada!”** |
| **`assets/`** | Sumiram arquivos **obrigatórios da plataforma** (`theme.js`, `theme-all.css`, `theme-custom.css`, `theme-plugins.css`, `theme-defer.js`, …) → erro **500** ou página quebrada |

A faixa marrom + texto “Página não encontrada!” é o fallback da WDNA quando o template/layout da home não existe ou o tema não compila.

---

## Passo 1 — Restaurar o tema (urgente)

No admin WDNA, abra **Aparência / Tema / Editor de arquivos** (ou equivalente):

1. **Histórico / versões do tema**  
   Se existir “Restaurar versão anterior” ou lista de publicações, volte para a **última versão que funcionava** (antes do upload das duas pastas).  
   Publique de novo.

2. **Duplicar tema de backup**  
   Se você tinha outro tema rascunho ou cópia da loja, **ative** esse tema.

3. **Suporte WDNA**  
   Se não houver histórico, peça restauração do tema da loja **13805** — eles costumam ter backup do pacote original.

**Não tente “consertar” só colando de novo o GitHub inteiro** antes de recuperar os layouts base.

---

## Passo 2 — Conferir se voltou ao normal

Na pasta **`layout/`** do editor WDNA devem existir **vários** arquivos `.liquid`, por exemplo:

- `theme.liquid` (base)
- layouts de home, categoria, produto, busca, página, checkout, etc.

Só `theme.liquid` na pasta **`layout/`** = loja continua quebrada.

Na pasta **`assets/`** devem existir, entre outros:

- `theme.js`
- `theme-all.css`
- `theme-custom.css`
- `theme-plugins.css`
- `theme-defer.js`

Sem esses arquivos, **não publique** só os nossos CSS/JS custom.

---

## Passo 3 — Publicar header mobile do jeito certo

Depois que a home voltar a abrir, siga **`docs/wdna/PUBLICAR-HEADER-MOBILE-SEGURO.md`**.

Resumo: publique **`assets/header-v2.css`**; **evite** substituir o `theme.liquid` inteiro só por causa do mobile (o CSS já traz os overrides).

| Arquivo no WDNA | Quando usar |
|-----------------|-------------|
| `assets/header-v2.css` | **Sempre** para o fix mobile |
| `layout/theme.liquid` | Só se souber que falta link do CSS no `<head>` — com backup antes |

Raw do CSS (branch `cursor/header-favoritos-v2-e52b`):

- https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/header-favoritos-v2-e52b/assets/header-v2.css

---

## Passo 4 — Teste rápido

1. Abrir `https://www.sitedoar.com.br/` (aba anônima).
2. Ver home com vitrine/banners (não só “Página não encontrada!”).
3. Inspecionar código-fonte: deve carregar `header-v2-….css` e `<header class="header header-v2">`.

---

## Resumo

- **Duas pastas do Git = errado** para WDNA neste projeto.
- **Dois arquivos** (ou a lista do `HEADER-V2-DEPLOY.md`) = certo, **depois** de restaurar o tema completo.
