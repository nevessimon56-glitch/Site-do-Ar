# Checklist — validação tema preview vs produção

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Uso:** comparar **tema preview (clone v3)** com **tema ativo (baseline)**.  
**Regra:** status só **Aprovado** com evidência (print, URL, Network HAR, ou nota de teste datada). Caso contrário: Reprovado, Bloqueado ou Não testado.

**Legenda status:** `AP` Aprovado | `RE` Reprovado | `BL` Bloqueado | `NT` Não testado

| Campo evidência | Exemplo |
|-----------------|---------|
| `EV-` | `EV-20261028-busca-network.png` |

---

## Metadados da sessão de teste

| Campo | Preview | Produção (baseline) |
|-------|---------|---------------------|
| URL preview | | https://www.sitedoar.com.br |
| Tema WDNA (nome/ID) | | |
| SHA/branch Git | | |
| Testador | | |
| Data/hora (America/Sao_Paulo) | | |
| Dispositivo / viewport | | |

---

## 1. Rede e console (todas as páginas do roteiro)

| ID | Teste | Preview | Prod | Evidência |
|----|-------|---------|------|-----------|
| N1 | Console sem erro JS crítico (Alpine, StoreSDK) | NT | NT | |
| N2 | `theme.js` 200 | NT | NT | |
| N3 | Ordem CSS v3 (`sda-tokens` … `sda-card`) no preview | NT | NT | |
| N4 | Sem CSS inline `#header-orange-inline-v5` no preview | NT | RE* | *prod 28/out tinha inline |
| N5 | Marcador `SDA-ZERO-v3-REWRITE` no HTML preview | NT | RE* | *prod sem marcador |

---

## 2. Navegação global

| ID | Teste | Preview | Prod | Evidência |
|----|-------|---------|------|-----------|
| G1 | Logo → home | NT | NT | |
| G2 | Menu desktop — links top-level | NT | NT | |
| G3 | Mega menu “Modelos” — abrir/fechar | NT | NT | |
| G4 | Mega menu — 3 links internos amostra | NT | NT | |
| G5 | Nav fixa ao scroll (desktop) | NT | NT | |
| G6 | Mobile strip 3 categorias após scroll | NT | NT | |
| G7 | Dock mobile — Início/Catálogo/Conta | NT | NT | |
| G8 | Header busca desktop → resultados | NT | NT | |
| G9 | Header busca mobile overlay | NT | NT | |
| G10 | Carrinho abre sidenav | NT | NT | |
| G11 | Tab teclado até busca (a11y mínimo) | NT | NT | |

---

## 3. Busca e categorias

| ID | Teste | Preview | Prod | Evidência |
|----|-------|---------|------|-----------|
| B1 | `/busca?termo=` termo com resultados | NT | AP* | *prod 28/out termo vazio no curl; retest manual |
| B2 | Contagem produtos = paginação | NT | NT | |
| B3 | `.sda-search-count` ou equivalente | NT | AP* | *prod tinha span |
| B4 | Chips `#sda-active-filters` ao filtrar | NT | NT | |
| B5 | Remover chip atualiza URL | NT | NT | |
| B6 | Ordenação menor preço | NT | NT | |
| B7 | Paginação página 2 | NT | NT | |
| B8 | Toggle ocultar filtros desktop (SDA) | NT | NT | |
| B9 | Filtro BTU | NT | NT | |
| B10 | Filtro marca | NT | NT | |
| B11 | Categoria — breadcrumb + H1 | NT | NT | |
| B12 | Estado sem resultados (termo nonsense) | NT | NT | |
| B13 | Grade/lista toggle | NT | NT | |
| B14 | Card — Comprar + Comparar na busca | NT | NT | |
| B15 | Link PDP da busca 200 | NT | NT | |
| B16 | CTA Diagnóstico na busca (se presente) | NT | NT | |

---

## 4. Mobile e responsividade

| ID | Teste | Preview | Prod | Evidência |
|----|-------|---------|------|-----------|
| M1 | 375px — sem scroll horizontal home | NT | NT | |
| M2 | 375px — busca filtros mobile sheet | NT | NT | |
| M3 | Comparador bar acima dock | NT | NT | |
| M4 | 1440px — mega menu layout | NT | NT | |

---

## 5. SEO e URLs (amostra)

| ID | Teste | Preview | Prod | Evidência |
|----|-------|---------|------|-----------|
| S1 | Canonical presente PDP | NT | NT | |
| S2 | Title busca/categoria | NT | NT | |
| S3 | Slug produto unchanged (amostra 3 URLs) | NT | NT | |
| S4 | robots.txt Allow (prod) | NT | AP* | *curl 28/out |

---

## 6. Frete (funcionalidade confirmada — regressão obrigatória)

| ID | Teste | Preview | Prod | Evidência |
|----|-------|---------|------|-----------|
| F1 | PDP — abrir “Calcular frete” sidenav | NT | NT | |
| F2 | Network `POST /ajax/shippings/calculator` 200 | NT | NT | |
| F3 | Exibe opções prazo/valor ou aviso vazio | NT | NT | |
| F4 | CEP inválido — mensagem erro | NT | NT | |
| F5 | Persistência CEP (localStorage) | NT | NT | |

**Integração:** `sections/sidenav-shipping-calculation.liquid`, `product-content.liquid` (`openShippingCalculation`), Alpine `setupShippingCalculation`.

---

## 7. Avaliações (somente auditoria — ver doc dedicado)

| ID | Teste | Preview | Prod | Evidência |
|----|-------|---------|------|-----------|
| R1 | `GET /ajax/product/{id}/review` responde JSON | NT | AP* | *p91 → total 0 |
| R2 | Estrelas PDP se `total > 0` | NT | NT | |
| R3 | Bloco `#product-reviews` no DOM | NT | NT | |
| R4 | Schema `aggregateRating` se reviews | NT | NT | |

---

## 8. Funcionalidades protegidas (não confirmadas — smoke leve)

Marcar **NT** até investigação; se falhar no preview, **BL** regressão (não remover feature).

| ID | Área | Preview | Prod |
|----|------|---------|------|
| P1 | Favoritos | NT | NT |
| P2 | Comparador 3 itens | NT | NT |
| P3 | Diagnóstico 360 popup | NT | NT |
| P4 | Checkout (sandbox) | BL | BL |
| P5 | Login/conta | NT | NT |
| P6 | Compre junto / kit PDP | NT | NT |
| P7 | Calculadora solar | NT | NT |

---

## 9. Resumo da sessão

| Status | Contagem |
|--------|----------|
| AP | |
| RE | |
| BL | |
| NT | |

**Bloqueadores para ativar preview em produção:** (preencher)

**Assinatura aprovação negócio:** __________________ date: __________

---

## 10. Template de registro de evidência (copiar por teste)

```
ID: B7
Status: AP
Preview URL: https://...
Passos: ...
Esperado: ...
Observado: ...
Evidência: EV-...
Data (UTC-3): ...
```
