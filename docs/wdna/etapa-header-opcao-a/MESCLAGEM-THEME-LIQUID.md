# Mesclagem mínima — `layout/theme.liquid` (Opção A)

Aplicar no **tema preview** clonado da produção. **Proibido** substituir pelo `layout/theme.liquid` v3 completo do Git (introduz `sda-card.css` e remove `showcase-product-card.css`).

---

## Passo 1 — Adicionar tokens (identidade)

Localizar:

```liquid
<link media="all" type="text/css" rel="stylesheet" href="{{ 'assets/theme-custom.css' | themeAssetUrl }}">
```

Inserir **logo abaixo**:

```liquid
<link media="all" type="text/css" rel="stylesheet" href="{{ 'assets/sda-tokens.css' | themeAssetUrl }}">
```

Manter **`mega-menu.css` antes de `header-v2.css`** (ordem atual da produção).

---

## Passo 2 — Bloco inline `#header-orange-inline-v5`

### Análise (28/out/2026)

O inline na produção mistura:

| Trecho | Função | Cobertura sem inline |
|--------|--------|----------------------|
| Ocultar `.product-compare-json` / `.showcase-card-btu` | Card/compare | **`product-compare.css`** já carregado no preview (mesma ordem que produção) — regras L107–128 |
| Badge carrinho laranja, hover conta/telefone | Header | **`header-v2.css`** (Git) — regras ~1630+ |
| Emergency SVG 24px + fundo `#f7f9fc` | Header sem CSS publicado | **Resolvido** ao publicar `header-v2.css` + `sda-tokens.css` |

### Decisão Opção A

**Remover o bloco completo** `<style id="header-orange-inline-v5">…</style>` **somente se**:

1. `product-compare.css` permanece linkado **antes** do fechamento `</head>` (como hoje), e  
2. `header-v2.css` foi substituído pela versão Git desta etapa.

**Se** após remover inline o JSON do comparador aparecer na vitrine → **rollback** do layout e reintroduzir **apenas** o sub-bloco compare (copiar de `product-compare.css` ou mínimo hotfix) — reportar; **não** ampliar escopo.

**Se** linha “BTUs” vazia reaparecer nos cards → idem (`.showcase-card-btu` está em `product-compare.css`).

---

## Passo 3 — O que NÃO alterar no layout

- Links `showcase-product-card.css`, `sda-conversion-redesign.css`, etc.
- **Não** adicionar `sda-card.css`
- Scripts defer (mega-menu, compare, …)
- Popup Diagnóstico 360 no fim do body
- Blocos fallback `initSdaMobileNavStrip` (manter até etapa mega-menu)

---

## Verificação pós-mesclagem (view-source preview)

- [ ] `sda-tokens.css` presente
- [ ] `header-v2.css` presente (novo hash após save)
- [ ] Ausência de `header-orange-inline-v5`
- [ ] Presença de `showcase-product-card.css` (inalterado)
