# Remodelagem do card de vitrine (v2)

**Objetivo:** mudar **hierarquia visual** do produto na home, busca, categorias e carrosséis — não infra de compare/PDP/compre-junto.

## Wireframe (ordem no card)

```
┌─────────────────────────┐
│ [OFF]            [♥]    │
│      imagem produto     │
├─────────────────────────┤
│ Frio · Inverter · 220V  │  ← specs (desktop)
├─────────────────────────┤
│ Título do produto…      │
│ BTU (se houver)         │
│ attrs mobile (• •)      │
├─────────────────────────┤
│ De R$ …                 │
│ R$ … no Pix             │
│ 5% desconto Pix         │
│ 6x sem juros            │
│ [ COMPRAR AGORA ]       │
│ + Comparar              │
└─────────────────────────┘
```

## Arquivos (publicar juntos)

| Arquivo | Papel |
|---------|--------|
| `sections/showcase-model-product.liquid` | DOM + `.sda-product-card--v2` |
| `assets/showcase-product-card.css` | **Visual final** (borda, sombra, tipografia, botões) |
| `layout/theme.liquid` | Link do CSS novo (após `sda-conversion-redesign.css`) |

## O que já estava pronto (base técnica)

- Um dono de layout (`sda-conversion-redesign.css`) sem guerra com mega-menu
- Comparador, Pix, favorito — **mantidos**; só mudam ordem visual e pele

## Altura uniforme (home, busca, catálogo, relacionados)

`showcase-product-card.css` bloco **CARD-UNIFORM-GRID**:

- Listas em **flex + stretch** (mesma altura por linha)
- Slots fixos: imagem, specs (desktop), título (2/3 linhas), footer preço+ações
- Variáveis CSS em `:root` (`--sda-card-img-h-desktop`, etc.) para calibrar sem mexer no Liquid

Republicar só `assets/showcase-product-card.css` ao ajustar medidas.

## Ajustes finos (com você)

Depois de publicar, diga o que quer mudar: tamanho da foto, cor do botão, chips, quantas linhas no título, etc.
