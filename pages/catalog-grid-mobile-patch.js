/* PATCH — cole no FINAL do assets/mega-menu.js */
/* NÃO substitua o arquivo inteiro. Versão: CATALOG-GRID-MOBILE-v7 */
/* Catálogo mobile 2 col + produtos relacionados (remove Slick + grid) */

(function () {
  'use strict';

  var MOBILE_MQ = '(max-width: 991px)';
  var GRID_CLASS = 'showcase-search_grid--mobile-2col';

  function isMobile() {
    return window.matchMedia(MOBILE_MQ).matches;
  }

  function isCatalogPage() {
    if (document.querySelector('main.search-main, .search-main, .showcase-search')) return true;
    var p = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '') || '/';
    if (p === '/todos-os-produtos') return true;
    if (p.indexOf('/busca') === 0) return true;
    if (/\d+\s*btus?/.test(p) || p.indexOf('btus') !== -1) return true;
    return false;
  }

  function unslickList(list) {
    if (typeof jQuery !== 'undefined' && jQuery.fn && jQuery.fn.slick) {
      var $list = jQuery(list);
      if ($list.hasClass('slick-initialized')) {
        try {
          $list.slick('unslick');
        } catch (e) {}
      }
    }
  }

  function applyGridToList(list, opts) {
    opts = opts || {};
    var gap = opts.gap || '6px 8px';
    var stretch = opts.stretch !== false;

    list.style.setProperty('display', 'grid', 'important');
    list.style.setProperty('grid-template-columns', 'repeat(2, minmax(0, 1fr))', 'important');
    list.style.setProperty('gap', gap, 'important');
    list.style.setProperty('align-items', stretch ? 'stretch' : 'start', 'important');
    list.style.setProperty('width', '100%', 'important');
    list.style.setProperty('max-width', '100%', 'important');
    list.style.setProperty('margin', '0', 'important');
    list.style.setProperty('padding', '0', 'important');
    list.style.setProperty('overflow', 'visible', 'important');

    var track = list.querySelector('.slick-track');
    if (track) {
      track.style.setProperty('display', 'grid', 'important');
      track.style.setProperty('grid-template-columns', 'repeat(2, minmax(0, 1fr))', 'important');
      track.style.setProperty('gap', gap, 'important');
      track.style.setProperty('align-items', stretch ? 'stretch' : 'start', 'important');
      track.style.setProperty('width', '100%', 'important');
      track.style.setProperty('max-width', '100%', 'important');
      track.style.setProperty('transform', 'none', 'important');
      track.style.setProperty('left', '0', 'important');
    }

    var slickList = list.querySelector('.slick-list');
    if (slickList) {
      slickList.style.setProperty('overflow', 'visible', 'important');
      slickList.style.setProperty('width', '100%', 'important');
      slickList.style.setProperty('max-width', '100%', 'important');
    }

    var itemHeight = stretch ? '100%' : 'auto';
    var items = list.querySelectorAll('.showcase-item');
    for (var j = 0; j < items.length; j++) {
      var item = items[j];
      item.style.setProperty('width', '100%', 'important');
      item.style.setProperty('max-width', '100%', 'important');
      item.style.setProperty('min-width', '0', 'important');
      item.style.setProperty('display', stretch ? 'flex' : 'block', 'important');
      if (stretch) {
        item.style.setProperty('flex-direction', 'column', 'important');
      }
      item.style.setProperty('height', itemHeight, 'important');
      item.style.setProperty('min-height', '0', 'important');
      item.style.setProperty('float', 'none', 'important');
      item.style.setProperty('clear', 'none', 'important');
      item.style.setProperty('opacity', '1', 'important');
      item.style.setProperty('visibility', 'visible', 'important');

      var card = item.querySelector('.showcase-product');
      if (card) {
        card.style.setProperty('height', itemHeight, 'important');
        card.style.setProperty('min-height', '0', 'important');
        if (stretch) {
          card.style.setProperty('flex', '1 1 auto', 'important');
        } else {
          card.style.removeProperty('flex');
        }
      }
    }
  }

  function fixCatalogMobileGrid() {
    if (!isMobile() || !isCatalogPage()) return;

    var section = document.querySelector('.showcase-search');
    if (section) {
      section.classList.remove('showcase-search_list');
      section.classList.add('showcase-search_grid', GRID_CLASS);
      section.setAttribute('data-mobile-grid', '2col');
    }

    var lists = document.querySelectorAll(
      'main.search-main .showcase-list, .search-main .showcase-list, .showcase-search .showcase-list'
    );

    for (var i = 0; i < lists.length; i++) {
      unslickList(lists[i]);
      applyGridToList(lists[i], { gap: '6px 8px', stretch: true });
    }
  }

  function fixProductShowcaseMobile() {
    if (!isMobile()) return;

    var lists = document.querySelectorAll(
      '.product-showcase .showcase-list, .col-product-related .showcase-list'
    );

    for (var i = 0; i < lists.length; i++) {
      unslickList(lists[i]);
      applyGridToList(lists[i], { gap: '8px 10px', stretch: false });
    }
  }

  function scheduleMobileGridFix() {
    fixCatalogMobileGrid();
    fixProductShowcaseMobile();
    window.setTimeout(function () {
      fixCatalogMobileGrid();
      fixProductShowcaseMobile();
    }, 300);
    window.setTimeout(function () {
      fixCatalogMobileGrid();
      fixProductShowcaseMobile();
    }, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleMobileGridFix);
  } else {
    scheduleMobileGridFix();
  }
  window.addEventListener('load', scheduleMobileGridFix);
  window.addEventListener('resize', function () {
    window.setTimeout(scheduleMobileGridFix, 150);
  });
})();
