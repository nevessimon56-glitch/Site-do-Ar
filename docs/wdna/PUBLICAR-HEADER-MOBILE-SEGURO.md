# Publicar correção do header mobile **sem** derrubar a loja

## O que causou “Página não encontrada!”

O arquivo **`layout/theme.liquid`** é o esqueleto de **todas** as páginas. Se algo falha ao compilar (arquivo incompleto ao colar, caractere estranho, tag Liquid quebrada), a WDNA pode responder com erro e a home vira só **“Página não encontrada!”**.

O **`assets/header-v2.css` sozinho não quebra** a loja (é só CSS).

A correção de **espaçamento mobile** (altura 90px da navbar, max-width das sections, nav “Todos os produtos”) está **toda no `header-v2.css`** — você **não precisa** republicar o `theme.liquid` só por causa do header mobile.

---

## Recuperar agora (faça nesta ordem)

### 1. Voltar o `theme.liquid` que funcionava

No editor WDNA → **`layout/theme.liquid`**:

- Use **desfazer / histórico** do editor, **ou**
- Cole de volta o conteúdo que estava **antes** do upload de hoje (se você guardou em bloco de notas), **ou**
- Baixe a cópia estável do GitHub (commit anterior ao inline mobile duplicado):  
  https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/e6b4297/layout/theme.liquid  

Salve e **publique o tema**.

Confira: `https://www.sitedoar.com.br/` deve voltar a mostrar vitrine/banners, não só o texto de erro.

### 2. Publicar **somente** o CSS do header

Abra **`assets/header-v2.css`** no WDNA e cole **o arquivo inteiro** (Raw):

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/header-favoritos-v2-e52b/assets/header-v2.css

Salve → publique → teste no celular (aba anônima).

**Não mexa no `theme.liquid` neste passo**, a menos que a loja ainda não carregue `header-v2.css` no código-fonte (Ctrl+U: procure `header-v2`).

---

## Se no futuro precisar atualizar o `theme.liquid`

1. **Nunca** cole por cima sem backup (copie o arquivo atual para um `.txt` antes).
2. Confira que o final do arquivo tem **`</body>`** e **`</html>`** (≈780 linhas na versão completa do repo).
3. Confira que existem no tema as sections que o layout chama, por exemplo:
   - `sections/sidenav-overlay-favorites.liquid`
   - `sections/product-compare-panel.liquid`
   - `sections/mega-menu-ar.liquid`
4. Preferência: altere **só o trecho** (links CSS no `<head>`), em vez de substituir 780 linhas.

---

## Checklist rápido

| Arquivo | Obrigatório para mobile? | Risco se errar |
|---------|--------------------------|----------------|
| `assets/header-v2.css` | **Sim** | Baixo |
| `sections/header.liquid` | Se ainda não publicou header v2 | Médio |
| `layout/theme.liquid` | Só se faltar link do CSS/JS no `<head>` | **Alto** |
