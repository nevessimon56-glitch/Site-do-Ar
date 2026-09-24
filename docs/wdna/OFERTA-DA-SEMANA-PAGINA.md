# Oferta da Semana — página imersiva

Experiência dedicada (aurora, countdown, revelar oferta, trilho de produtos) sincronizada com a vitrine **OFERTAS DE VERÃO** da home.

## Admin WDNA

1. **Páginas** → nova página customizada  
2. **Slug:** `oferta-da-semana`  
3. **URL:** `/pagina/oferta-da-semana`  
4. **Template:** `page.oferta-semana`  

## Arquivos no tema (publicar um a um)

| Arquivo | Ação |
|---------|------|
| `templates/page.oferta-semana.liquid` | Criar |
| `sections/oferta-semana.liquid` | Criar |
| `assets/oferta-semana.css` | Criar |
| `assets/oferta-semana.js` | Criar |
| `sections/header.liquid` | Atualizar (link do banner + botão desktop) |

## Header

Banner mobile e botão **Ofertas da semana** (desktop) apontam para `/pagina/oferta-da-semana`.

## Comportamento

- Countdown até domingo 23:59 (renovação simbólica da “semana”).  
- Produtos carregados via fetch da home (vitrine com título “Ofertas”).  
- **Revelar oferta** remove blur do destaque; **Embaralhar** troca o produto em destaque.
