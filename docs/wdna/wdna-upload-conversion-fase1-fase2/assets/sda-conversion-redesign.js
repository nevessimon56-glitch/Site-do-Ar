/**
 * SDA-CONVERSION-REDESIGN-v1 — UX leve sem quebrar integrações WDNA.
 */
(function () {
  'use strict';

  function enhanceSearchCount() {
    var right = document.querySelector('main.search-main .search-right p');
    if (!right || right.querySelector('.sda-search-count')) return;
    var text = (right.textContent || '').trim();
    var match = text.match(/(\d+)/);
    if (!match) return;
    var n = match[1];
    right.innerHTML =
      '<span class="sda-search-count">' +
      n +
      '</span> produto' +
      (Number(n) === 1 ? '' : 's') +
      ' encontrado' +
      (Number(n) === 1 ? '' : 's');
  }

  function injectCatalogDiagIfMissing() {
    if (!document.querySelector('main.search-main')) return;
    if (document.querySelector('.sda-diag-cta')) return;
    var header = document.querySelector('main.search-main .search-header');
    if (!header) return;
    var wrap = document.createElement('div');
    wrap.className = 'sda-diag-cta content';
    wrap.innerHTML =
      '<div class="sda-diag-cta__inner">' +
      '<div class="sda-diag-cta__box">' +
      '<div><p class="sda-diag-cta__title">Não sabe qual escolher?</p>' +
      '<p class="sda-diag-cta__text">Faça o Diagnóstico 360 e veja modelos indicados para o seu ambiente — sem comprometer preços nem estoque.</p></div>' +
      '<a class="sda-diag-cta__btn" href="/pagina/diagnostico-360">Fazer diagnóstico</a>' +
      '</div></div>';
    header.parentNode.insertBefore(wrap, header.nextSibling);
  }

  function setupDesktopFilterToggle() {
    var main = document.querySelector('main.search-main');
    if (!main || !window.matchMedia('(min-width: 992px)').matches) return;
    if (main.querySelector('.sda-filter-toggle')) return;
    var rightCol = main.querySelector('.search-right.column');
    if (!rightCol) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sda-filter-toggle';
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = 'Ocultar filtros';

    btn.addEventListener('click', function () {
      var collapsed = main.classList.toggle('sda-filters-collapsed');
      btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      btn.textContent = collapsed ? 'Filtrar produtos' : 'Ocultar filtros';
    });

    var options = rightCol.querySelector('.search-options');
    if (options && options.parentNode) {
      options.parentNode.insertBefore(btn, options);
    } else {
      rightCol.insertBefore(btn, rightCol.firstChild);
    }
  }

  function extractAreaHint(text) {
    if (!text) return '';
    var m = text.match(/(\d+)\s*m²?\s*(?:a|até|-)\s*(\d+)\s*m²?/i);
    if (m) return 'Ideal para ambientes de ' + m[1] + ' m² a ' + m[2] + ' m²';
    m = text.match(/(\d+)\s*m²/i);
    if (m) return 'Área recomendada: ' + m[1] + ' m²';
    return '';
  }

  function productAreaHint() {
    var box = document.querySelector('.product-main .product-header-box');
    if (!box || box.querySelector('.sda-product-area-hint')) return;

    var blob = '';
    document.querySelectorAll('.product-main .showcase-spec-bar__tag, .product-content .showcase-spec-bar__tag').forEach(function (el) {
      blob += ' ' + (el.textContent || '');
    });
    var specSection = document.querySelector('.product-content_specification, .product-specification, #specification');
    if (specSection) blob += ' ' + specSection.textContent;

    var hint = extractAreaHint(blob);
    if (!hint) return;

    var el = document.createElement('p');
    el.className = 'sda-product-area-hint';
    el.textContent = hint;

    var prices = box.querySelector('.product-prices');
    if (prices) {
      prices.parentNode.insertBefore(el, prices.nextSibling);
    } else {
      var title = box.querySelector('.product-title_desktop, .product-title');
      if (title) title.parentNode.insertBefore(el, title.nextSibling);
    }
  }

  function pdpStickyBuy() {
    if (!document.querySelector('.product-main')) return;
    if (!window.matchMedia('(max-width: 991px)').matches) return;
    if (document.querySelector('.sda-pdp-sticky-buy')) return;

    var buy = document.querySelector('.product-main .product-btn_buy');
    if (!buy) return;

    var priceEl =
      document.querySelector('.product-main .product-prices_price-inner') ||
      document.querySelector('.product-main .sda-pdp-price-pix') ||
      document.querySelector('.product-main .product-prices_price');
    var bar = document.createElement('div');
    bar.className = 'sda-pdp-sticky-buy';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Compra rápida');

    var price = document.createElement('div');
    price.className = 'sda-pdp-sticky-buy__price';
    price.textContent = priceEl ? priceEl.textContent.trim() : '';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sda-pdp-sticky-buy__btn';
    btn.textContent = (buy.textContent || '').replace(/\s+/g, ' ').trim() || 'Comprar';
    btn.addEventListener('click', function () {
      buy.click();
    });

    bar.appendChild(price);
    bar.appendChild(btn);
    document.body.appendChild(bar);
    document.body.classList.add('sda-pdp-sticky-on');
  }

  var FILTER_LABELS = {
    minPotencia: 'BTUs mín.',
    maxPotencia: 'BTUs máx.',
    marcas: 'Marca',
    categorias: 'Categoria',
    preco: 'Preço'
  };

  function buildFilterRemoveUrl(param, value) {
    var url = new URL(window.location.href);
    var vals = url.searchParams.getAll(param);
    url.searchParams.delete(param);
    for (var i = 0; i < vals.length; i++) {
      if (vals[i] !== value) url.searchParams.append(param, vals[i]);
    }
    url.searchParams.delete('pag');
    return url.pathname + url.search;
  }

  function renderActiveFilterChips() {
    var host = document.getElementById('sda-active-filters');
    if (!host) return;
    host.innerHTML = '';
    var params = new URLSearchParams(window.location.search);
    params.forEach(function (value, key) {
      if (key === 'pag' || key === 'ordem' || key === 'qtdPag') return;
      var label = FILTER_LABELS[key] || key;
      var chip = document.createElement('a');
      chip.className = 'sda-active-filters__chip';
      chip.href = buildFilterRemoveUrl(key, value);
      chip.title = 'Remover filtro';
      chip.innerHTML =
        '<span>' + label + ': ' + decodeURIComponent(value).replace(/\+/g, ' ') + '</span>' +
        '<span class="sda-active-filters__chip-x" aria-hidden="true">×</span>';
      host.appendChild(chip);
    });
  }

  function enhanceMobileFilterLabel() {
    var title = document.querySelector('.search-options_mobile .search-options-header_item:first-child .search-option-title');
    if (title && title.textContent.indexOf('Filtrar') === -1) {
      title.textContent = 'Filtrar produtos';
    }
  }

  function limitHomeCarousels() {
    if (!document.querySelector('main.home-main')) return;
    document.querySelectorAll('.home-main .showcase-list.slick-initialized').forEach(function (list) {
      if (list.dataset.sdaSlideCap) return;
      list.dataset.sdaSlideCap = '1';
      if (typeof jQuery === 'undefined' || !jQuery.fn || !jQuery.fn.slick) return;
      var $l = jQuery(list);
      try {
        var count = $l.find('.slick-slide:not(.slick-cloned)').length;
        if (count > 4) {
          $l.slick('slickSetOption', 'autoplay', false, true);
        }
      } catch (e) {}
    });
  }

  function run() {
    enhanceSearchCount();
    injectCatalogDiagIfMissing();
    setupDesktopFilterToggle();
    productAreaHint();
    pdpStickyBuy();
    limitHomeCarousels();
    renderActiveFilterChips();
    enhanceMobileFilterLabel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  window.addEventListener('load', function () {
    window.setTimeout(run, 500);
  });
})();
