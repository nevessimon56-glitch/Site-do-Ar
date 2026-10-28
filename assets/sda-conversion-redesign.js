/**
 * SDA-CONVERSION-REDESIGN-v3 — cards + PDP desktop/mobile
 */
(function () {
  'use strict';

  document.documentElement.classList.add('sda-conversion-v2');

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

  /* injectCatalogDiagIfMissing — desativado (loja sem bloco “Fazer diagnóstico” no catálogo) */
  function injectCatalogDiagIfMissing() {}

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

  function collapseSearchFilterSections() {
    document.querySelectorAll('.search-filters details.search-filter').forEach(function (det) {
      var hasActive =
        det.querySelector('.active, .form-radio input:checked, .btu-filter-btn.active') !== null;
      var titleEl = det.querySelector('.search-filter-title');
      if (titleEl && !titleEl.querySelector('.sda-filter-count')) {
        var count = det.querySelectorAll('.btu-filter-btn, .search-filter-link_category, .form-checkbox, .form-radio').length;
        if (count > 0) {
          var badge = document.createElement('span');
          badge.className = 'sda-filter-count';
          badge.textContent = '(' + count + ')';
          titleEl.appendChild(badge);
        }
      }
      if (!hasActive && window.matchMedia('(min-width: 992px)').matches) {
        var isBtu = det.classList.contains('search-filter_btu');
        if (isBtu || det.classList.contains('search-filter_ciclo') || det.classList.contains('search-filter_brand')) {
          det.removeAttribute('open');
        }
      }
    });
  }

  function extractAreaHint(text) {
    if (!text) return '';
    var m = text.match(/(\d+)\s*m²?\s*(?:a|até|-)\s*(\d+)\s*m²?/i);
    if (m) return 'Ideal para ambientes de ' + m[1] + ' m² a ' + m[2] + ' m²';
    m = text.match(/(\d+)\s*m²/i);
    if (m) return 'Ideal para ambientes de até ' + m[1] + ' m²';
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

    var prices = box.querySelector('.product-box_prices');
    var ctas = box.querySelector('.product-header-box_ctas');
    if (prices && ctas) {
      prices.parentNode.insertBefore(el, ctas);
    } else if (prices) {
      prices.parentNode.appendChild(el);
    }
  }

  function formatStickyPrice() {
    var inner = document.querySelector('.product-main .product-prices_price-inner');
    var suffix = document.querySelector('.product-main .product-prices_pix-suffix');
    if (!inner) return '';
    var t = inner.textContent.trim();
    if (suffix) t += ' ' + suffix.textContent.trim();
    return t;
  }

  function pdpStickyBuy() {
    if (!document.querySelector('.product-main')) return;
    if (!window.matchMedia('(max-width: 991px)').matches) return;

    var buy = document.querySelector('.product-main .product-btn_buy');
    if (!buy) return;

    var bar = document.querySelector('.sda-pdp-sticky-buy');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'sda-pdp-sticky-buy';
      bar.setAttribute('role', 'region');
      bar.setAttribute('aria-label', 'Compra rápida');

      var price = document.createElement('div');
      price.className = 'sda-pdp-sticky-buy__price';

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sda-pdp-sticky-buy__btn';
      btn.textContent = 'COMPRAR AGORA';
      btn.addEventListener('click', function () {
        buy.click();
      });

      bar.appendChild(price);
      bar.appendChild(btn);
      document.body.appendChild(bar);
      document.body.classList.add('sda-pdp-sticky-on');
    }

    var priceEl = bar.querySelector('.sda-pdp-sticky-buy__price');
    if (priceEl) priceEl.textContent = formatStickyPrice();
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
    if (title) title.textContent = 'Filtrar produtos';
  }

  function mobileChipPolicy() {
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    document.querySelectorAll(
      '.showcase-spec-bar__tag--cobre, .showcase-spec-bar__tag--voltage, .showcase-spec-bar__tag--procel'
    ).forEach(function (el) {
      el.classList.add('sda-spec-chip--hidden');
    });
  }

  function limitCardSpecChips() {
    document.querySelectorAll('.showcase-product.card .showcase-spec-bar').forEach(function (bar) {
      if (bar.dataset.sdaChipCap) return;
      var tags = bar.querySelectorAll('.showcase-spec-bar__tag:not(.sda-spec-chip--hidden)');
      var max = window.matchMedia('(max-width: 767px)').matches ? 2 : 4;
      tags.forEach(function (t, i) {
        if (i >= max) t.classList.add('sda-spec-chip--hidden');
      });
      bar.dataset.sdaChipCap = '1';
    });
  }

  function buildCardAttrLines() {
    document.querySelectorAll('.sda-product-card').forEach(function (card) {
      var line = card.querySelector('.showcase-card-attrs-line');
      if (!line || line.textContent.trim()) return;
      var labels = [];
      card.querySelectorAll('.showcase-spec-bar__tag:not(.sda-spec-chip--hidden)').forEach(function (tag) {
        var t = (tag.getAttribute('title') || tag.textContent || '').trim();
        if (t === 'A') t = 'Classe A';
        if (t === 'Q/F') t = 'Quente/Frio';
        if (t && labels.indexOf(t) === -1) labels.push(t);
      });
      if (labels.length) {
        var maxLabels = window.matchMedia('(max-width: 767px)').matches ? 2 : 4;
        line.textContent = labels.slice(0, maxLabels).join(' • ');
        line.removeAttribute('aria-hidden');
      }
    });
  }

  function syncRecommendationArea() {
    var hint = document.querySelector('.product-main .sda-product-area-hint');
    var list = document.querySelector('.sda-pdp-rec__list');
    if (!hint || !list || list.dataset.areaSynced) return;
    var li = document.createElement('li');
    li.textContent = hint.textContent.trim();
    list.insertBefore(li, list.firstChild);
    list.dataset.areaSynced = '1';
  }

  function pdpTechGrid() {
    if (!window.matchMedia('(max-width: 991px)').matches) return;
    var host = document.getElementById('sda-pdp-tech-grid');
    if (!host || host.dataset.filled) return;
    var tags = document.querySelectorAll(
      '.product-main .showcase-spec-bar__tag, .product-content .showcase-spec-bar__tag'
    );
    if (!tags.length) {
      host.classList.add('sda-pdp-tech-grid-host--empty');
      return;
    }
    host.dataset.filled = '1';
    tags.forEach(function (tag) {
      var label = (tag.getAttribute('title') || tag.textContent || '').trim();
      if (!label) return;
      if (label === 'A') label = 'Classe A';
      var cell = document.createElement('div');
      cell.className = 'sda-pdp-tech-grid__cell';
      cell.textContent = label;
      host.appendChild(cell);
    });
  }

  function pdpMobileChrome() {
    if (!document.querySelector('.product-main')) return;
    if (window.matchMedia('(max-width: 991px)').matches) {
      document.body.classList.add('sda-pdp-mobile');
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
        $l.slick('slickSetOption', 'autoplay', false, true);
        $l.slick('slickSetOption', 'dots', true, true);
      } catch (e) {}
    });
    document.querySelectorAll('.home-main .showcase-banners .slick-slide').forEach(function (slide, i) {
      if (i >= 4) slide.setAttribute('aria-hidden', 'true');
    });
  }

  function run() {
    enhanceSearchCount();
    injectCatalogDiagIfMissing();
    setupDesktopFilterToggle();
    collapseSearchFilterSections();
    productAreaHint();
    syncRecommendationArea();
    pdpTechGrid();
    pdpMobileChrome();
    pdpStickyBuy();
    limitHomeCarousels();
    renderActiveFilterChips();
    enhanceMobileFilterLabel();
    mobileChipPolicy();
    limitCardSpecChips();
    buildCardAttrLines();
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
