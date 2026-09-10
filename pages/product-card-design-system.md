# Design System — Card de Produto (Site do Ar)

Sistema visual único para cards de ar-condicionado. **Mobile e desktop usam exatamente a mesma paleta, tipografia relativa, componentes e hierarquia.** A única diferença permitida é o **número de colunas do grid** e o **escalonamento proporcional** do card à largura disponível.

---

## Princípios

1. **Uma marca, um card** — o usuário reconhece o mesmo padrão no celular e no monitor.
2. **Hierarquia fixa** — imagem → título (2 linhas) → badges → preço riscado → preço final → pill Pix → parcelamento → botões.
3. **Grid alinhado** — blocos com altura mínima fixa para título e badges; preços e botões ficam na mesma linha base entre cards vizinhos.
4. **Clean & técnico** — no máximo 4 famílias de cor nos badges; selo de desconto discreto; sem competição visual entre selos.

---

## Tokens de cor (hex)

### Marca — azul primário

| Token | Hex | Uso |
|-------|-----|-----|
| `--sda-blue-600` | `#1A6EB5` | CTA Comprar (fundo), borda Comparar, hover links |
| `--sda-blue-700` | `#0A5089` | Preço final (destaque), texto Comparar ativo |
| `--sda-blue-500` | `#2C8FD6` | Gradiente/hover opcional |
| `--sda-blue-50` | `#EEF6FD` | Fundo Comparar, hover Comparar |
| `--sda-blue-100` | `#DBEAFE` | Borda selo desconto, hover Comparar pressionado |
| `--sda-blue-800` | `#1565A8` | Borda Comparar hover |

### Marca — verde Pix / economia

| Token | Hex | Uso |
|-------|-----|-----|
| `--sda-green-700` | `#1A6B32` | Texto pill Pix, ícone Pix |
| `--sda-green-50` | `#EDF8F0` | Fundo pill Pix |
| `--sda-green-300` | `#7BC896` | Borda pill Pix |

### Neutros — texto e preço

| Token | Hex | Uso |
|-------|-----|-----|
| `--sda-neutral-400` | `#94A3B8` | Preço riscado, sufixo "OFF" do selo |
| `--sda-neutral-500` | `#64748B` | Texto secundário selo desconto |
| `--sda-neutral-600` | `#475569` | Percentual selo, badge voltagem (texto) |
| `--sda-neutral-700` | `#5A6F82` | Parcelamento |
| `--sda-neutral-800` | `#3D5A73` | Destaque parcelamento (negrito) |
| `--sda-neutral-300` | `#9AA8B8` | Prefixo parcelamento |
| `--sda-white` | `#FFFFFF` | Fundo card, selo desconto |
| `--sda-shadow` | `rgba(15, 23, 42, 0.08)` | Sombra leve selo / card |

### Badges de especificação — 4 famílias fixas

Cada categoria de informação usa **sempre** a mesma tríade `fundo / borda / texto`:

| Família | Categorias HTML | Fundo | Borda | Texto |
|---------|-----------------|-------|-------|-------|
| **Refrigeração** | `--cycle-frio`, `--cycle-qf`, `--cobre` | `#EEF6FD` | `#7EB8E8` | `#0D5A9E` |
| **Tecnologia** | `--inverter`, `--procel` | `#F3F0FF` | `#C4B5FD` | `#5B21B6` |
| **Voltagem** | `--voltage` | `#F1F5F9` | `#CBD5E1` | `#475569` |
| **Conectividade** | `--wifi` | `#ECFDF5` | `#5EEAD4` | `#0F766E` |

> Procel usa a família **Tecnologia** (selo de eficiência = atributo técnico), não verde — evita confusão com pill Pix.

---

## Anatomia do card

```
┌─────────────────────────────┐
│ [-5% OFF]          (selo)   │
│                             │
│      [ imagem 168px ]       │
│                             │
├─────────────────────────────┤
│ Título em até 2 linhas…     │  ← altura fixa
│ [Frio] [Inverter] [220V]    │  ← altura fixa (badges)
├─────────────────────────────┤
│ R$ 3.999,00                 │  ← riscado
│ R$ 3.799,05                 │  ← preço final (azul)
│ (P) no Pix                  │  ← pill fit-content
│ 10x de R$ 379,91            │
│ [ Comparar ] [   COMPRAR  ] │
└─────────────────────────────┘
```

**Classes HTML (WDNA):** `.showcase-product.card` > `.showcase-product_image.card-image` + `.card-header` + `.showcase-spec-wrap` + `.card-footer` + `.showcase-card-actions`

---

## Componentes reutilizáveis

### 1. Área de imagem

| Propriedade | Valor | Observação |
|-------------|-------|------------|
| Altura do container | `168px` fixo | Todas as telas |
| Padding | `8px 8px 0` | |
| Alinhamento | flex center | Split, janela, piso-teto centralizados |
| Imagem interna | `max-height: 148px`, `object-fit: contain` | Proporção preservada |
| Fundo | transparente ou `#FAFBFC` opcional | |

### 2. Selo de desconto (`.showcase-offer`)

Substitui círculo/ribbon verde. **Formato único em todas as telas.**

| Propriedade | Valor |
|-------------|-------|
| Posição | `top: 6px; left: 6px` (canto superior esquerdo da imagem) |
| Formato | Tag retangular |
| Padding | `2px 6px` |
| Border-radius | `4px` |
| Fundo | `rgba(255,255,255,0.94)` |
| Borda | `1px solid #DBEAFE` |
| Sombra | `0 1px 3px rgba(15,23,42,0.08)` |
| Texto | `"-5% OFF"` — prefixo `-` via CSS no primeiro span |
| Cor percentual | `#475569`, 10px, weight 800 |
| Cor "OFF" | `#94A3B8`, 9px, weight 700 |
| Text-transform | uppercase |

**Regra:** selo informa desconto percentual; preço riscado informa valor absoluto — sem redundância visual agressiva.

### 3. Título (`.showcase-product_link_title`)

| Propriedade | Valor |
|-------------|-------|
| Linhas | 2 (`-webkit-line-clamp: 2`) |
| Altura fixa bloco | `2.5em` (line-height × 2) |
| Line-height | `1.25` |
| Font-size | `13px` (escala até `11px` em telas &lt;360px via `clamp`) |
| Font-weight | 600–700 |
| Cor | `#1E293B` ou herdar tema |
| Overflow | ellipsis |
| Alinhamento | left |

**Container `.card-header`:** `min-height: 3.2em`, `padding: 8px 8px 0`.

### 4. Badge de especificação (`.showcase-spec-bar__tag`)

| Propriedade | Valor |
|-------------|-------|
| Formato | Cápsula retangular (`border-radius: 4px`) |
| Altura | `20px` |
| Padding | `0 6px` |
| Font-size | `9px` |
| Font-weight | `700` |
| Text-transform | uppercase |
| Letter-spacing | `0.02em` |
| Gap entre badges | `4px` |
| Max por card | 3–4 badges visíveis |
| Box-shadow | none |

**Container `.showcase-spec-wrap`:** `min-height: 46px`, `padding: 0 8px 4px`.  
**Barra `.showcase-spec-bar`:** flex wrap, center, `min-height: 40px`.

Aplicar modificadores `--cycle-frio`, `--inverter`, `--voltage`, `--wifi` conforme tabela de famílias.

### 5. Bloco de preço (`.showcase-prices--card`)

| Elemento | Font-size | Cor | Peso |
|----------|-----------|-----|------|
| `.showcase-prices_strike` | `11px` | `#94A3B8` | 400 |
| `.showcase-prices_price` | `22px` | `#0A5089` | 900 |
| `.showcase-prices_installment` | `11px` | `#5A6F82` | 400 |
| Parcela em negrito | — | `#3D5A73` | 800 |

Alinhamento: **left** em todas as telas.

### 6. Pill Pix (`.showcase-prices_pix`)

| Propriedade | Valor |
|-------------|-------|
| Display | `inline-flex` |
| Width | `fit-content` (nunca full-width) |
| Padding | `3px 8px 3px 6px` |
| Border-radius | `999px` |
| Fundo | `#EDF8F0` |
| Borda | `1px solid #7BC896` |
| Texto | `#1A6B32`, 11px, weight 800 |
| Ícone | `::before` — quadrado 12×12px, `#1A6B32`, letra "P" 8px branca |
| Gap ícone/texto | `4px` |

### 7. Botão Comprar (`.showcase-product_buy`) — CTA primário

| Propriedade | Valor |
|-------------|-------|
| Flex | `1 1 auto` (~62% da linha) |
| Altura | `34px` |
| Padding | `0 12px` |
| Font-size | `12px` |
| Font-weight | `800` |
| Text-transform | uppercase |
| Letter-spacing | `0.04em` |
| Border-radius | `999px` |
| Fundo | `#1A6EB5` |
| Texto | `#FFFFFF` |
| Borda | none |
| Sombra | `0 2px 8px rgba(26,110,181,0.25)` |

### 8. Botão Comparar (`.showcase-compare-btn`) — secundário visível

| Propriedade | Valor |
|-------------|-------|
| Flex | `0 0 38%` |
| Altura | `34px` (mesma do Comprar) |
| Padding | `0 8px` |
| Font-size | `11px` |
| Font-weight | `700` |
| Border-radius | `999px` |
| Fundo | `#EEF6FD` |
| Borda | `2px solid #1A6EB5` |
| Texto | `#1A6EB5` |
| Hover / `[aria-pressed=true]` | fundo `#DBEAFE`, borda `#1565A8`, texto `#0A5089` |

**Container `.showcase-card-actions`:** `display: flex`, `gap: 6px`, `margin-top: 6px`, largura 100%.

> **Proibido no sistema unificado:** Comparar como checkbox absoluto no canto (padrão antigo mobile). Ambos os botões ficam sempre na mesma linha, mesmas proporções.

---

## Comportamento por breakpoint

Somente **grid** e **escala fluida** mudam. Componentes mantêm mesmas cores e estilos.

| Breakpoint | Viewport | Colunas | Gap horizontal | Padding item | Notas |
|------------|----------|---------|----------------|--------------|-------|
| **Mobile pequeno** | `0 – 575px` | **1** | — | `0 0 14px` | Card ocupa largura útil; badges podem scroll horizontal se &gt;3 |
| **Mobile grande** | `576px – 991px` | **2** | `8px` | `0 4px 12px` | Classe `showcase-search_grid--mobile-2col` |
| **Desktop** | `≥ 992px` | **4** | `12px` (implícito no grid) | `0 6px 14px` | Classe `showcase-search_grid` + JS `fixCatalogDesktopGrid` |

### Grid CSS

```css
/* Mobile pequeno — 1 col */
@media (max-width: 575px) {
  .showcase-list { grid-template-columns: 1fr; }
}

/* Mobile grande — 2 col */
@media (min-width: 576px) and (max-width: 991px) {
  .showcase-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

/* Desktop — 4 col */
@media (min-width: 992px) {
  .showcase-list { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
```

### Escala fluida permitida (opcional)

Valores abaixo usam `clamp()` — **mesma proporção visual**, não estilos diferentes:

| Token | Fórmula |
|-------|---------|
| Título | `clamp(11px, 2.8vw, 13px)` |
| Preço final | `clamp(18px, 5vw, 22px)` |
| Botões altura | `clamp(32px, 8vw, 34px)` |
| Imagem container | `168px` fixo (não escala) |

---

## Checklist de consistência

Antes de publicar CSS, validar:

- [ ] Selo de desconto é tag branca discreta (não ribbon azul, não círculo verde)
- [ ] Comparar e Comprar lado a lado, 38% / 62%, mesma altura
- [ ] Badge `--cycle-frio` e `--inverter` usam famílias corretas (não todos azuis)
- [ ] Pill Pix com ícone, fit-content, alinhada à esquerda
- [ ] Título truncado em 2 linhas; badges com min-height fixo
- [ ] Imagem 168px com produto centralizado
- [ ] Mesmas cores hex mobile e desktop (DevTools → computed styles)

---

## Implementação no repo

| Arquivo | Função |
|---------|--------|
| `assets/mega-menu.css` | Arquivo completo — inclui `PRODUCT-CARD-UNIFIED-v1` no final |
| `pages/product-card-unified-system.css` | Cópia do bloco unificado (só patch, se preferir colar) |
| `pages/product-card-design-system.md` | Este documento |
| `assets/mega-menu.js` | `fixCatalogDesktopGrid` — converte `_list` → `_grid` no desktop |

**Workflow WDNA:** substituir **inteiro** o `mega-menu.css` pelo arquivo do repo (~3027 linhas). Não colar patches antigos `CARD-MOBILE-REDESIGN` / `CARD-DESKTOP-REDESIGN`.

---

## Estado atual vs. sistema alvo

| Aspecto | Mobile atual | Desktop atual | Sistema unificado |
|---------|--------------|---------------|-------------------|
| Selo desconto | Ribbon azul | Tag branca | **Tag branca** |
| Comparar | Checkbox canto | Botão 38% | **Botão 38%** |
| Badges | Quase todos azuis | 4 famílias | **4 famílias** |
| Pill Pix | Sem ícone | Com ícone `P` | **Com ícone** |
| Imagem | 120–150px variável | 168px fixo | **168px fixo** |
| Colunas | 2 (&lt;992px) | 4 | **1 / 2 / 4** |
