# Ofertas da semana — overlay imersivo

O banner **Oferta da semana** abre um **painel full-screen** na própria loja (`/#sda-oferta-immersiva`): layout **curadoria PMN** (hero “O clima certo muda tudo.”, destaque da semana, cards horizontais, banner calculadora). **Não depende** de criar página no admin WDNA.

## Por que não `/pagina/...`?

Sem página customizada configurada, o WDNA manda de volta à home **sem mudança visível**. O overlay vive no `layout/theme.liquid` e funciona em qualquer página após publicar os arquivos abaixo.

## Publicar no WDNA (obrigatório para ver a experiência)

| Arquivo |
|---------|
| `layout/theme.liquid` (CSS + overlay + script) |
| `sections/oferta-semana-overlay.liquid` |
| `sections/header.liquid` |
| `assets/oferta-semana.css` |
| `assets/oferta-semana.js` |
| `assets/ofertas-semana-config.js` |
| `assets/ofertas-semana-home.js` (opcional: destaque na vitrine da home) |

Link do header: **`/#sda-oferta-immersiva`**. Não reutiliza item do menu “oferta” (evita abrir produto aleatório).

## Produtos

Edite **`assets/ofertas-semana-config.js`** — ver comentários no arquivo.

## Página `page.oferta-semana` (opcional)

A landing em `/pagina/oferta-da-semana` continua disponível se você criar a página no admin; o **header não aponta mais** para ela.
