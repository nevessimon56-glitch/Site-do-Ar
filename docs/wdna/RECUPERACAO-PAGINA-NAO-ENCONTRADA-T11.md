# Tema 11 — “Página não encontrada” após upload

## Por que acontece

No WDNA, **“Página não encontrada”** no **Visualizar tema 11** quase sempre é **erro de render do Liquid** (falta section/template/asset), não link errado.

O `layout/theme.liquid` do Git chama **sections que não vêm nos 8 arquivos da UX**. Se alguma não existir no tema 11, a home quebra.

## Confirme primeiro

1. Abra o preview pelo botão **Visualizar** do **tema 11** no painel (não use só `sitedoar.com.br` sem parâmetro de preview).
2. No editor do tema 11, verifique se existem **pastas** `layout/`, `templates/`, `sections/`, `assets/`.

## Pacote mínimo para a home abrir

Use o ZIP **`theme11-recovery-minimo.zip`** (mesmo branch) ou suba manualmente os arquivos listados abaixo.
