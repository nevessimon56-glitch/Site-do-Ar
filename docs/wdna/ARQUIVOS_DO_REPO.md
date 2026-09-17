# Repositório GitHub vs tema WDNA

## O que colar no WDNA (só estes caminhos existem)

Quando houver correção no GitHub, o usuário edita **apenas** arquivos que existem em [`ESTRUTURA_TEMA.md`](ESTRUTURA_TEMA.md).

### Correções habituais deste repo

| Pasta WDNA | Arquivo | No GitHub? |
|------------|---------|------------|
| `assets/` | `mega-menu.js` | Sim |
| `assets/` | `mega-menu.css` | Sim |
| `layout/` | `theme.liquid` | Sim |
| `sections/` | `showcase-model-product.liquid` | Sim |
| `sections/` | `product-content.liquid` | Sim |
| `sections/` | `sidenav-overlay-account.liquid` | Sim (se existir no WDNA) |
| `sections/` | `search-filter.liquid` | WDNA usa nome singular |

### Nunca pedir ao usuário

| Caminho | Motivo |
|---------|--------|
| `pages/*` | **Não existe** no tema WDNA |
| `sections/site-price-resolve.liquid` | Não existe — código inline nos arquivos acima |
| `sections/showcase-prices.liquid` | Não está na estrutura oficial do tema |

---

## Arquivos só na WDNA (não editar pelo GitHub)

Estes existem no tema mas **não estão neste repositório**:

- `assets/theme.js`
- `assets/theme-defer.js`
- `assets/theme-all.css`
- `assets/theme-custom.css`
- `assets/theme-plugins.css`
- `sections/sidenav-overlay-cart.liquid`
- `sections/sidenav-overlay-cart-script.liquid`
- Todos os `showcase-model-1` … `showcase-model-14` (exceto customizações pontuais)
- `config.json`
- `templates/*`

---

## Branch de recuperação (site estável)

Se o site quebrou após atualizar tema:

**Branch:** `cursor/rollback-recuperar-site-ed4c`  
**PR:** #17

Arquivos para restaurar:

1. `assets/mega-menu.js`
2. `layout/theme.liquid`
3. `sections/showcase-model-product.liquid`
4. `sections/product-content.liquid`

Raw: `https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/c5da2b0/<caminho>`
