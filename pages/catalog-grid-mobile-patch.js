/* PATCH — cole no FINAL do assets/mega-menu.js */
/* NÃO substitua o arquivo inteiro. Versão: CATALOG-GRID-MOBILE-v8 */
/* Catálogo + produtos relacionados mobile (2 col, sem Slick) */

(function () {
  'use strict';

  var MOBILE_MQ = '(max-width: 991px)';
  var GRID_CLASS = 'showcase-search_grid--mobile-2col';
  var LIST_GRID_CLASS = 'showcase-list--grid-mobile-2col';

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

  function isRelatedList(list) {
    return !!(list.closest && (list.closest('.product-showcase') || list.closest('.col-product-related')));
  }

  function unslickList(list) {
    if (typeof jQuery === 'undefined' || !jQuery.fn || !jQuery.fn.slick) return;
    var $list = jQuery(list);
    if ($list.hasClass('slick-initialized')) {
      try {
        $list.slick('unslick');
      } catch (e) {}
    }
  }

  function applyGridToList(list, opts) {
    opts = opts || {};
    var gap = opts.gap || '6px 8px';

    list.classList.add(LIST_GRID_CLASS);
    list.style.setProperty('display', 'grid', 'important');
    list.style.setProperty('grid-template-columns', 'repeat(2, minmax(0, 1fr))', 'important');
    list.style.setProperty('gap', gap, 'important');
    list.style.setProperty('align-items', 'start', 'important');
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
      track.style.setProperty('align-items', 'start', 'important');
      track.style.setProperty('width', '100%', 'important');
      track.style.setProperty('max-width', '100%', 'important');
      track.style.setProperty('transform', 'none', 'important');
      track.style.setProperty('left', '0', 'important');
      track.style.setProperty('height', 'auto', 'important');
    }

    var slickList = list.querySelector('.slick-list');
    if (slickList) {
      slickList.style.setProperty('overflow', 'visible', 'important');
      slickList.style.setProperty('width', '100%', 'important');
      slickList.style.setProperty('max-width', '100%', 'important');
      slickList.style.setProperty('height', 'auto', 'important');
    }

    var items = list.querySelectorAll('.showcase-item');
    for (var j = 0; j < items.length; j++) {
      var item = items[j];
      item.style.setProperty('width', '100%', 'important');
      item.style.setProperty('max-width', '100%', 'important');
      item.style.setProperty('min-width', '0', 'important');
      item.style.setProperty('display', 'block', 'important');
      item.style.setProperty('height', 'auto', 'important');
      item.style.setProperty('min-height', '0', 'important');
      item.style.setProperty('float', 'none', 'important');
      item.style.setProperty('clear', 'none', 'important');
      item.style.setProperty('opacity', '1', 'important');
      item.style.setProperty('visibility', 'visible', 'important');

      var card = item.querySelector('.showcase-product');
      if (card) {
        card.style.setProperty('width', '100%', 'important');
        card.style.setProperty('height', 'auto', 'important');
        card.style.setProperty('min-height', '0', 'important');
        card.style.removeProperty('flex');
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
      applyGridToList(lists[i], { gap: '6px 8px' });
    }
  }

  function fixProductShowcaseMobile() {
    if (!isMobile()) return;

    var lists = document.querySelectorAll(
      '.product-showcase .showcase-list, .col-product-related .showcase-list'
    );

    for (var i = 0; i < lists.length; i++) {
      unslickList(lists[i]);
      applyGridToList(lists[i], { gap: '8px 10px' });
    }
  }

  function scheduleMobileGridFix() {
    fixCatalogMobileGrid();
    fixProductShowcaseMobile();
  }

  window.fixProductShowcaseMobile = fixProductShowcaseMobile;
  window.scheduleMobileGridFix = scheduleMobileGridFix;

  function hookThemeRefresh() {
    var origRefresh = window.refreshThemeShowcaseSliders;
    if (typeof origRefresh === 'function' && !origRefresh._gridMobilePatched) {
      window.refreshThemeShowcaseSliders = function (force) {
        origRefresh(force);
        window.setTimeout(scheduleMobileGridFix, 0);
        window.setTimeout(scheduleMobileGridFix, 250);
        window.setTimeout(scheduleMobileGridFix, 800);
      };
      window.refreshThemeShowcaseSliders._gridMobilePatched = true;
    }

    var origHover = window.initProductHoverImage;
    if (typeof origHover === 'function' && !origHover._gridMobilePatched) {
      window.initProductHoverImage = function () {
        origHover();
        window.setTimeout(scheduleMobileGridFix, 0);
        window.setTimeout(scheduleMobileGridFix, 400);
      };
      window.initProductHoverImage._gridMobilePatched = true;
    }
  }

  function bindProductShowcaseObserver() {
    if (typeof MutationObserver === 'undefined') return;

    var pending = 0;
    var observer = new MutationObserver(function () {
      if (pending) return;
      pending = requestAnimationFrame(function () {
        pending = 0;
        fixProductShowcaseMobile();
      });
    });

    var targets = document.querySelectorAll('.product-showcase, .col-product-related');
    for (var i = 0; i < targets.length; i++) {
      observer.observe(targets[i], { childList: true, subtree: true });
    }

    if (document.body) {
      var bodyObserver = new MutationObserver(function (mutations) {
        for (var m = 0; m < mutations.length; m++) {
          var added = mutations[m].addedNodes;
          for (var a = 0; a < added.length; a++) {
            var node = added[a];
            if (node.nodeType !== 1) continue;
            if (
              (node.matches && (node.matches('.product-showcase') || node.matches('.col-product-related'))) ||
              (node.querySelector && node.querySelector('.product-showcase, .col-product-related'))
            ) {
              scheduleMobileGridFix();
              return;
            }
          }
        }
      });
      bodyObserver.observe(document.body, { childList: true, subtree: true });
    }
  }

  function initMobileGrid() {
    hookThemeRefresh();
    scheduleMobileGridFix();
    bindProductShowcaseObserver();
    window.setTimeout(scheduleMobileGridFix, 300);
    window.setTimeout(scheduleMobileGridFix, 1200);
    window.setTimeout(scheduleMobileGridFix, 2500);
    window.setTimeout(scheduleMobileGridFix, 4000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileGrid);
  } else {
    initMobileGrid();
  }
  window.addEventListener('load', initMobileGrid);
  window.addEventListener('pageshow', initMobileGrid);
  window.addEventListener('resize', function () {
    window.setTimeout(scheduleMobileGridFix, 150);
  });
})();
