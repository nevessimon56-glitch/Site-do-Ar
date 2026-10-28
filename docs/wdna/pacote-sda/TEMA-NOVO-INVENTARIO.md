# Tema novo WDNA — inventário vs pacote Site do Ar

Você listou o **tema base completo** (assets + `layout/theme.liquid` + sections + templates + `config.json`).  
Isso é o ponto de partida certo: **não apague nada** que só exista no tema novo (checkout draft, `product-reviews`, `showcase-model-15/16`, `brands.liquid`, etc.).

A migração é: **manter o base** + **substituir só o que customizamos** + **criar arquivos que o base não tem**.

Fonte das customizações: repositório Git (`cursor/card-remodel-b192` ou `main` após merge).

---

## 1. Assets — o que fazer

| Arquivo no tema novo | Ação | Origem no repo |
|----------------------|------|----------------|
| `theme-plugins.css` | **Manter** do tema novo (só substituir se byte-a-byte igual ao repo e você quiser congelar versão) | — |
| `theme-all.css` | **Substituir** | `assets/theme-all.css` (~322 KB, **corrigido** — não use export antigo 645 KB) |
| `theme-custom.css` | **Substituir** | `assets/theme-custom.css` |
| `theme.js` | **Manter** do tema novo | Repo pode estar desatualizado vs WDNA; carrossel tns depende dele |
| `theme-defer.js` | **Manter** do tema novo | Idem |
| `theme-solar-calculator.css` | **Manter** do tema novo | — |
| `theme-solar-calculator.js` | **Manter** do tema novo | — |
| *(não existem no base)* | **Criar** | `assets/mega-menu.css` |
| *(criar)* | **Criar** | `assets/mega-menu.js` |
| *(criar)* | **Criar** | `assets/header-v2.css` |
| *(criar)* | **Criar** | `assets/favorites.css` |
| *(criar)* | **Criar** | `assets/favorites.js` |
| *(criar)* | **Criar** | `assets/product-compare.css` |
| *(criar)* | **Criar** | `assets/product-compare.js` |
| *(criar)* | **Criar** | `assets/product-hover-image.css` |
| *(criar)* | **Criar** | `assets/product-hover-image.js` |
| *(criar)* | **Criar** | `assets/sda-conversion-redesign.css` |
| *(criar)* | **Criar** | `assets/sda-conversion-redesign.js` |
| *(criar)* | **Criar** | `assets/product-page-v2.css` |
| *(criar)* | **Criar** | `assets/showcase-product-card.css` |

---

## 2. Layout

| Arquivo | Ação | Origem |
|---------|------|--------|
| `layout/theme.liquid` | **Substituir** (inteiro) | `layout/theme.liquid` do repo — links CSS/JS, `mega-menu-ar`, `product-compare-panel`, `sidenav-overlay-favorites`, scripts defer |

Sem este arquivo publicado, os **11 assets novos** acima não carregam.

---

## 3. Sections — manter do tema novo (não sobrescrever pelo repo)

Estes existem no seu tema novo e **não** estão no repo (ou são mais novos). **Deixe como vieram do WDNA:**

- `checkout-*-draft.liquid`, `maintenance-content.liquid`
- `product-reviews.liquid`
- `showcase-model-15.liquid`, `showcase-model-16.liquid`
- `sidenav-order.liquid`
- Demais vitrines/checkout/page **sem** alteração listada na §4

Repo tem extras que **não** estão na sua lista (opcional depois): `diagnostico-360.liquid`, `showcases-model-*.liquid`, `menus-model-1.liquid` — só copie se usar essas vitrines/páginas no layout antigo.

---

## 4. Sections — substituir pelo repo (funcionalidade SDA)

| Section | Motivo |
|---------|--------|
| `showcase-model-product.liquid` | Card `.sda-product-card--v2` + compare |
| `showcase-model-product-promotion.liquid` | Card promo alinhado |
| `product-content.liquid` | PDP `#product-pdp-v2`, compare, blocos SDA |

**Substituir só se você validou diff** (ou copiar do tema **ativo** atual se for mais recente que o Git):

| Section | Motivo |
|---------|--------|
| `header.liquid` | Se na loja hoje usa `header-v2` — confira classe no HTML publicado |
| `search-filter.liquid` / `search-order.liquid` | Se busca/conversão foi alterada no repo |

Todas as outras sections da sua lista (`footer`, `showcase-model-1`…`14`, sidenavs padrão, etc.): **manter tema novo**, salvo smoke falhar.

---

## 5. Sections — criar no tema novo (não estão na sua lista)

Crie arquivo novo no editor WDNA e cole do repo:

| Arquivo | Função |
|---------|--------|
| `mega-menu-ar.liquid` | Mega menu |
| `product-compare-data.liquid` | JSON compare em `<textarea hidden>` |
| `product-compare-panel.liquid` | Painel comparador |
| `sidenav-overlay-favorites.liquid` | Favoritos |
| `product-descriptions-v2.liquid` | PDP descrições (se `product-content` renderiza) |
| `product-pdp-spec-bar.liquid` | Barra specs PDP |
| `product-pdp-cycle-class.liquid` | Classe ciclo frio/QF |
| `sda-pdp-recommendation.liquid` | Recomendação m² |
| `sda-pdp-trust.liquid` | Selos confiança |
| `pdp-icon-svg.liquid` | Ícones PDP |
| `product-spec-icons.liquid` | Ícones specs |
| `sda-card-btu-line.liquid` | Linha BTU (se referenciado) |

---

## 6. Templates + config

| Arquivo | Ação |
|---------|------|
| `config.json` | **Manter** do tema novo (config da loja no painel) |
| `home.liquid`, `product.liquid`, `checkout*.liquid`, etc. | **Manter** tema novo |
| `search.liquid` | **Comparar** com repo — se faltar classe `search-main` / filtros SDA, mesclar trechos do repo |
| `page.diagnostico.liquid` | Só se usar Diagnóstico 360 — existe no repo, não na sua lista (pode **criar** template + section `diagnostico-360.liquid`) |
| `brands.liquid`, `maintenance.liquid`, `customer-wallet.liquid`, … | **Manter** tema novo |

---

## 7. Ordem prática de upload (WDNA)

1. **Criar** os 11 assets §1 (lista “criar”).
2. **Substituir** `theme-all.css`, `theme-custom.css`.
3. **Substituir** `layout/theme.liquid`.
4. **Criar** sections §5.
5. **Substituir** `showcase-model-product.liquid`, `showcase-model-product-promotion.liquid`, `product-content.liquid`.
6. Publicar tema **sem ativar** → smoke §5 de `MIGRACAO-TEMA-NOVO.md`.

Script local (pasta descompactada do tema novo):

```bash
./docs/wdna/pacote-sda/copiar-para-tema.sh /caminho/tema-novo
```

Isso **não** remove arquivos do tema novo; só sobrescreve/cria os paths do `MANIFEST.txt`.

---

## 8. Resumo em números

| | Quantidade (aprox.) |
|--|--|
| Arquivos do **seu inventário** | Base completa — **manter** |
| Assets **a criar** | 11 |
| Assets **a substituir** | 2 (`theme-all`, `theme-custom`) |
| Layout **a substituir** | 1 |
| Sections **a criar** | 12 |
| Sections **a substituir** (mínimo) | 3 |

**Atualizado:** 26 out 2026 (America/Sao_Paulo)
