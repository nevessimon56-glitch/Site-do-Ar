# Colou errado? Recuperar oferta + header (WDNA)

## Sinais de que algo foi colado no lugar errado

| Sintoma | Provável erro |
|---------|----------------|
| Loja com **“Página não encontrada”** ou erro 500 | Subiu pasta **`layout/`** ou **`assets/`** inteira do GitHub |
| Banner oferta igual, curadoria **não muda** | Só colou `oferta-semana.css` ou overlay num **arquivo novo**, sem **`header.liquid` completo** |
| Aparece **código** na página (`{% assign`, `</div>` solto) | Colou Liquid dentro de **página HTML** do admin ou cortou o arquivo no meio |
| Curadoria abre mas **sem estilo** | `oferta-semana.css` no caminho errado ou nome errado |
| Duas barras / layout quebrado no topo | Colou o **final do header** (overlay) **duas vezes** ou no **`theme.liquid`** sem saber |

---

## Regra de ouro

1. **Nunca** substituir pastas inteiras `assets/` ou `layout/` pelo ZIP do GitHub.  
2. **Sempre** substituir o arquivo **inteiro** no editor WDNA (Ctrl+A → apagar → colar → salvar).  
3. Para a oferta v4, o mínimo é **4 arquivos** (caminhos exatos abaixo).

---

## Passo a passo seguro (v4)

### 1) `sections/header.liquid`

- Abra no GitHub: `sections/header.liquid` (branch `cursor/header-favoritos-v2-e52b` ou `main` após merge).  
- **Raw** → selecionar **tudo** → copiar.  
- No WDNA: **sections → header.liquid** → **apagar tudo** → colar → salvar.

**Antes de salvar, busque no editor (Ctrl+F):**

| Deve existir | Não pode faltar |
|--------------|-----------------|
| `sdaOfertaAssetVer = '20260325-v4'` | |
| `data-sda-oferta-version="2026-03-25-mobile-v4"` | |
| `O clima certo` | |
| `</header>` **antes** do overlay | |
| Arquivo termina com `})();` e `</script>` (clique oferta) | |

**Ordem correta no final do arquivo:**

1. `</header>` (fecha o header da loja)  
2. `<link ... oferta-semana.css ...>`  
3. `<div ... data-sda-oferta-overlay ...>` (overlay grande)  
4. `<script ... ofertas-semana-config.js`  
5. `<script ... oferta-semana.js`  
6. `<script>` pequeno do clique no banner  

Se o overlay estiver **dentro** de `<header>...</header>` **sem** fechar o header antes, está errado.

### 2) Assets (um por um)

Crie ou substitua **só estes nomes** dentro de **`assets/`** (sem subpasta extra):

| Arquivo | Conteúdo vem do GitHub |
|---------|-------------------------|
| `oferta-semana.css` | `assets/oferta-semana.css` |
| `oferta-semana.js` | `assets/oferta-semana.js` |
| `ofertas-semana-config.js` | `assets/ofertas-semana-config.js` |
| `header-v2.css` | `assets/header-v2.css` (banner mobile) |

### 3) O que **não** precisa colar (v4)

- `sections/oferta-semana-overlay.liquid` — opcional; o HTML já está **dentro do header**.  
- `layout/theme.liquid` — só se souber o que está fazendo; **não é obrigatório** para oferta.

---

## Conferir na loja (celular anônimo)

1. Ver código-fonte → buscar: **`2026-03-25-mobile-v4`**.  
2. Subtítulo do banner: **Curadoria · toque para abrir**.  
3. Toque no banner → tela **O clima certo muda tudo.**

Não achou `v4` → o **`header.liquid` do painel ainda não é o do GitHub**.

---

## Loja quebrada?

Siga **`docs/wdna/RECUPERAR-SITE-APOS-UPLOAD-PASTAS.md`** (restaurar tema / versão anterior) **antes** de colar de novo.

---

## Testar no PC antes do WDNA

No repo: abrir `simulacao-oferta-mobile.html` com um servidor local (ver `OFERTAS-PASTAS-WDNA.md`). Se a simulação estiver ok e a loja não, o problema é **só publicação/caminho no WDNA**, não o código.
