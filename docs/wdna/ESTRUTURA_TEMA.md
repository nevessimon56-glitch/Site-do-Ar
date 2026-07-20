# Estrutura do tema WDNA — Site do Ar (sitedoar.com.br)

Lista oficial dos arquivos que **existem no editor de tema WDNA**.  
Atualizado conforme informado pelo dono da loja.

> **Não existe pasta `pages/` neste tema.**

---

## assets/

| Arquivo |
|---------|
| `theme-all.css` |
| `theme-custom.css` |
| `theme-defer.js` |
| `theme-plugins.css` |
| `theme-solar-calculator.css` |
| `theme-solar-calculator.js` |
| `theme.js` |

### Assets customizados (adicionados ao tema — podem existir além da lista acima)

| Arquivo | Função |
|---------|--------|
| `mega-menu.js` | Menu AR, vitrine mobile, correções logado |
| `mega-menu.css` | Estilos do mega menu e catálogo mobile |
| `product-hover-image.js` | Hover de imagem nos cards |
| `product-hover-image.css` | Estilos hover |

---

## layout/

| Arquivo |
|---------|
| `theme.liquid` |

---

## sections/

| Arquivo |
|---------|
| `404-content.liquid` |
| `check-cookie.liquid` |
| `checkout-order-summary.liquid` |
| `checkout-payment.liquid` |
| `checkout-shipping.liquid` |
| `checkout-summary.liquid` |
| `customer-account-menu.liquid` |
| `customer-addresses-edit.liquid` |
| `footer.liquid` |
| `header-checkout.liquid` |
| `header.liquid` |
| `menus-model-1.liquid` |
| `menus-model-2.liquid` |
| `page-contact-form.liquid` |
| `page-nav.liquid` |
| `page-solar-calculator-products.liquid` |
| `page-solar-calculator.liquid` |
| `product-buy-to-gether.liquid` |
| `product-content.liquid` |
| `product-group-purchase.liquid` |
| `product-kit-script.liquid` |
| `product-kit.liquid` |
| `product-last-viewed.liquid` |
| `product-related.liquid` |
| `product-schema.liquid` |
| `search-filter.liquid` | Filtros do catálogo/busca — **nome singular no WDNA** |
| `search-order.liquid` |
| `showcase-model-1.liquid` |
| `showcase-model-10-script.liquid` |
| `showcase-model-10-video.liquid` |
| `showcase-model-10.liquid` |
| `showcase-model-11.liquid` |
| `showcase-model-12.liquid` |
| `showcase-model-13.liquid` |
| `showcase-model-14.liquid` |
| `showcase-model-2.liquid` |
| `showcase-model-3.liquid` |
| `showcase-model-4.liquid` |
| `showcase-model-5.liquid` |
| `showcase-model-6.liquid` |
| `showcase-model-7.liquid` |
| `showcase-model-8.liquid` |
| `showcase-model-9.liquid` |
| `showcase-model-product-buy-to-gether.liquid` |
| `showcase-model-product-promotion.liquid` |
| `showcase-model-product.liquid` |
| `showcase-video-init.liquid` |
| `showcases-model-1.liquid` |
| `showcases-model-13.liquid` |
| `showcases-model-2.liquid` |
| `showcases-model-3.liquid` |
| `showcases-model-5.liquid` |
| `showcases-model-9.liquid` |
| `sidenav-forgot-password.liquid` |
| `sidenav-overlay-account.liquid` |
| `sidenav-overlay-cart-script.liquid` |
| `sidenav-overlay-cart.liquid` |
| `sidenav-payment-calculation.liquid` |
| `sidenav-shipping-calculation.liquid` |
| `sidenav-user-password.liquid` |
| `theme-schema.liquid` |

### Sections extras no GitHub (verificar se já estão no WDNA)

| Arquivo no repo | Observação |
|-----------------|------------|
| `mega-menu-ar.liquid` | Mega menu Modelos |
| `search-filters.liquid` | Pode ser diferente de `search-filter.liquid` |
| `product-spec-icons.liquid` | Pills nos cards |
| `diagnostico-360.liquid` | Popup diagnóstico |

---

## templates/

| Arquivo |
|---------|
| `404.liquid` |
| `account.liquid` |
| `checkout-order.liquid` |
| `checkout.liquid` |
| `customer-addresses.liquid` |
| `customer-orders.liquid` |
| `home.liquid` |
| `page.liquid` |
| `product.liquid` |
| `register.liquid` |
| `search.liquid` |

---

## Raiz do tema

| Arquivo |
|---------|
| `config.json` |

---

## O que NÃO existe neste tema

- Pasta `pages/`
- Arquivo `site-price-resolve.liquid` (lógica deve ir inline em `showcase-model-product.liquid` / `product-content.liquid`)
- Arquivo `showcase-prices.liquid` (a menos que tenha sido criado manualmente)

---

## Painel WDNA — configuração crítica (não é arquivo de tema)

**Configurações → Produto → Preço**

| Campo | Valor correto |
|-------|---------------|
| Lista de preço — usuário **logado** | **Site do Ar** |
| Lista de preço — usuário **não logado** | **Site do Ar** |

Pedidos com tabela **Mercado Livre** no canal Site Do Ar = configuração errada no painel.
