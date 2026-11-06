# Auditoria — avaliações de produtos (WDNA)

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Escopo:** investigação apenas — **sem implementação**, sem dados fictícios.  
**Confiança:** API e markup PDP **alta** (curl/HTML); volume real de reviews na loja **baixa** (amostra 1 SKU).

---

## 1. Conclusão executiva

O Site do Ar **já possui integração nativa WDNA de avaliações**, consumida via **StoreSDK** e renderizada na PDP. **Não** foi encontrado app third-party no código tema analisado. O repositório Git referencia `sections/product-reviews.liquid`, mas o **arquivo não está versionado** no workspace — provavelmente existe **apenas no tema publicado WDNA** (ou export não sincronizado).

Na amostra ao vivo (produto 91), a API retornou **zero avaliações** — UI de estrelas fica oculta (`x-if="state.review.total > 0"`).

**Recomendação migração:** ao subir preview v3, **copiar `product-reviews.liquid` do tema ativo** antes de ativar; **não** remover hooks em `product-content.liquid` nem alterar endpoint.

---

## 2. Evidências — API WDNA

| Item | Valor |
|------|--------|
| Endpoint | `GET /ajax/product/{productId}/review` |
| Exemplo | `https://www.sitedoar.com.br/ajax/product/91/review` |
| Resposta 28/out/2026 | `{"reviews":[],"pagination":{"total":0,"current":1,"pages":0},"media":0,"total":0}` |
| Paginação | `?page={n}` usado em `loadMoreReviews` |

**Classificação:** **B — plataforma WDNA** (backend reviews); tema só consome.

**Confiança:** alta para contrato endpoint; média para campos quando há reviews (não observado com dados).

---

## 3. Evidências — tema (PDP)

### 3.1 `sections/product-content.liquid` (repo)

| Recurso | Linhas / detalhe |
|---------|------------------|
| Estrelas no topo compra | `template x-if="state.review.total > 0"` — `.product-review`, `.star-rating` |
| Estado Alpine | `state.review` — `total`, `media`, `pagination`, `data` |
| Fetch | `getProductReviews()` → `StoreSDK.request.get('/ajax/product/${id}/review')` |
| Lista completa | `{% render 'sections/product-reviews', product: product %}` (~L759) |
| Scroll | `redirectReviewSection()` → `#product-reviews` |
| Init | `initProduct` chama `getProductReviews` |

### 3.2 `sections/product-schema.liquid`

Se `state.review.total > 0`, injeta JSON-LD:

```javascript
aggregateRating: {
  "@type": "AggregateRating",
  "ratingValue": state.review.media,
  "reviewCount": state.review.total
}
```

**SEO:** preservar este bloco — remoção quebra rich results quando houver reviews.

### 3.3 CSS SDA

`assets/sda-conversion-redesign.css` — regra escopada `.sda-pdp-buy-stack .product-review` (não remove funcionalidade).

### 3.4 Cards vitrine

**Não encontrado** no repo markup de estrelas em `showcase-model-product.liquid` — avaliações **não** aparecem nos cards listados (confiança alta).

---

## 4. Section `product-reviews.liquid`

| Fonte | Status |
|-------|--------|
| Repositório Git (`sections/`) | **Ausente** |
| Export zip jul/2026 na raiz repo | **Não listado** em `unzip -l` |
| Documentação `TEMA-NOVO-INVENTARIO.md` | Cita manter `product-reviews.liquid` do tema novo WDNA |
| HTML produção PDP | Referência `product-reviews` / scroll target |

**Ação pré-preview (painel WDNA):** exportar/copiar conteúdo de `sections/product-reviews.liquid` do **tema ativo** para o clone v3 + opcionalmente commitar no Git para rastreabilidade.

**Confiança:** alta que a section é necessária em runtime (`render` quebraria se ausente no editor).

---

## 5. Painel / apps / scripts externos

| Canal | Achado |
|-------|--------|
| Código tema | Somente StoreSDK + Liquid render |
| `scripts.header` / footer | **Não inspecionado** — could add review widget (confiança N/A) |
| Apps WDNA marketplace | **Desconhecido** — confirmar no painel “Aplicativos” |

**Não inventar** integração Trustpilot/etc. sem evidência no painel.

---

## 6. Estado funcional (existente × ativo × a desenvolver)

| Recurso | Existe? | Ativo? | Desenvolvimento |
|---------|---------|--------|-----------------|
| API reviews WDNA | Sim | Sim (endpoint responde) | Não |
| Estrelas PDP | Sim (código) | Condicional (`total > 0`) | Não |
| Lista/comentários PDP | Sim (render section) | **Não verificado visual** | Só se section no tema |
| Load more reviews | Sim (JS) | Se houver paginação | Não |
| Schema AggregateRating | Sim | Se `total > 0` | Não |
| Reviews em cards busca | Não no repo | — | **Opcional futuro** (fora escopo) |
| Moderation/admin reviews | WDNA backend | **Desconhecido** | Painel loja |

---

## 7. Riscos migração busca/nav × reviews

| ID | Risco | Criticidade | Mitigação |
|----|-------|-------------|-----------|
| RV-01 | Omitir `product-reviews.liquid` no upload v3 | **Alto** | Copiar do tema ativo (pré-requisito P6) |
| RV-02 | Editar `product-content` e quebrar fetch | **Alto** | Não tocar na fase busca/nav |
| RV-03 | Perder aggregateRating | **Médio** | Manter `product-schema.liquid` + state review |
| RV-04 | CSS SDA esconder estrelas | **Baixo** | Teste R2 checklist com produto que tenha reviews |

---

## 8. Como validar (quando houver produto com reviews)

1. Identificar no admin WDNA produto com `total > 0` (ou criar review teste sandbox se permitido).
2. PDP: estrelas visíveis; clique scroll até `#product-reviews`.
3. Network: GET review 200, JSON com `reviews[]` não vazio.
4. View source: `application/ld+json` com `aggregateRating`.
5. Preview v3 vs produção: mesma contagem e texto.

**Produto 91 (28/out):** `total: 0` — testes R2/R4 ficam **NT** até SKU com reviews.

---

## 9. Pendências para o responsável

1. Confirmar se a loja **usa** reviews ativamente (moderação, e-mail pós-compra).
2. Enviar export `sections/product-reviews.liquid` do tema ativo.
3. Indicar 1–2 URLs de produtos **com** avaliações publicadas para smoke.
4. Confirmar no painel se há app de reviews redundante.

---

## 10. Referências

- `docs/CHECKLIST_VALIDACAO_PREVIEW.md` §7
- `docs/wdna/pacote-sda/TEMA-NOVO-INVENTARIO.md` (manter product-reviews)
- `sections/product-content.liquid`, `sections/product-schema.liquid`
