/* ============================================================
   SUBSTITUI todo bloco antigo de grid mobile no assets/mega-menu.js
   Versão: CATALOG-GRID-FINAL-v19
   MutationObserver permanente + guard Slick + grid 2 col mobile
   ============================================================ */

(function () {
  'use strict';

  var MOBILE_MQ = '(max-width: 991px)';
  var GRID_CLASS = 'showcase-search_grid--mobile-2col';
  var LIST_GRID_CLASS = 'showcase-list--grid-mobile-2col';
  var PROTECTED_ROOT = '.product-showcase, .col-product-related, .col-product-visited';
  var observedRoots = typeof WeakSet !== 'undefined' ? new WeakSet() : null;
  var observedFallback = [];
  var fixRaf = 0;
  var slickGuardInstalled = false;

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

  function isProtectedList(list) {
    if (!list || !list.closest) return false;
    return !!list.closest('.product-showcase, .col-product-related, .col-product-visited');
  }

  function isProtectedNode(node) {
    if (!node || node.nodeType !== 1) return false;
    if (node.matches && node.matches(PROTECTED_ROOT)) return true;
    return !!(node.closest && node.closest(PROTECTED_ROOT));
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
    if (!list) return;
    opts = opts || {};
    var gap = opts.gap || '6px 8px';

    list.classList.add(LIST_GRID_CLASS);
    list.setAttribute('data-mobile-grid-fixed', '1');

    list.style.setProperty('display', 'grid', 'important');
    list.style.setProperty('grid-template-columns', 'repeat(2, minmax(0, 1fr))', 'important');
    list.style.setProperty('gap', gap, 'important');
    list.style.setProperty('align-items', 'stretch', 'important');
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
      track.style.setProperty('align-items', 'stretch', 'important');
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
      item.style.setProperty('display', 'flex', 'important');
      item.style.setProperty('flex-direction', 'column', 'important');
      item.style.setProperty('height', '100%', 'important');
      item.style.setProperty('min-height', '0', 'important');
      item.style.setProperty('float', 'none', 'important');
      item.style.setProperty('clear', 'none', 'important');
      item.style.setProperty('opacity', '1', 'important');
      item.style.setProperty('visibility', 'visible', 'important');

      var card = item.querySelector('.showcase-product');
      if (card) {
        card.style.setProperty('width', '100%', 'important');
        card.style.setProperty('height', '100%', 'important');
        card.style.setProperty('min-height', '0', 'important');
        card.style.setProperty('flex', '1 1 auto', 'important');
      }
    }
  }

  function fixListCollection(selector, gap) {
    var lists = document.querySelectorAll(selector);
    for (var i = 0; i < lists.length; i++) {
      unslickList(lists[i]);
      applyGridToList(lists[i], { gap: gap });
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

    fixListCollection(
      'main.search-main .showcase-list, .search-main .showcase-list, .showcase-search .showcase-list',
      '6px 8px'
    );
  }

  function fixHomeShowcaseMobile() {
    if (!isMobile()) return;
    fixListCollection('section.showcase .showcase-list', '6px 8px');
  }

  function fixProductShowcaseMobile() {
    if (!isMobile()) return;
    fixListCollection(
      '.product-showcase .showcase-list, .col-product-related .showcase-list, .col-product-visited .showcase-list',
      '8px 10px'
    );
  }

  function runAllFixes() {
    if (!isMobile()) return;
    fixCatalogMobileGrid();
    fixHomeShowcaseMobile();
    fixProductShowcaseMobile();
  }

  function scheduleFix() {
    if (fixRaf) cancelAnimationFrame(fixRaf);
    fixRaf = requestAnimationFrame(function () {
      fixRaf = 0;
      runAllFixes();
    });
  }

  window.fixProductShowcaseMobile = fixProductShowcaseMobile;
  window.scheduleMobileGridFix = runAllFixes;

  function markObserved(node) {
    if (!node) return false;
    if (observedRoots) {
      if (observedRoots.has(node)) return false;
      observedRoots.add(node);
      return true;
    }
    if (observedFallback.indexOf(node) !== -1) return false;
    observedFallback.push(node);
    return true;
  }

  function attachGridObserver(root) {
    if (!root || typeof MutationObserver === 'undefined') return;
    if (!markObserved(root)) return;

    var observer = new MutationObserver(function (mutations) {
      var needsFix = false;
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'childList') {
          needsFix = true;
          break;
        }
        if (m.type === 'attributes') {
          var target = m.target;
          if (
            m.attributeName === 'class' &&
            target.classList &&
            (target.classList.contains('slick-initialized') ||
              target.classList.contains('slick-slide') ||
              target.classList.contains('showcase-list'))
          ) {
            needsFix = true;
            break;
          }
          if (m.attributeName === 'style' && target.classList && target.classList.contains('showcase-item')) {
            needsFix = true;
            break;
          }
        }
      }
      if (needsFix) scheduleFix();
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  }

  function scanAndObserveAll() {
    var nodes = document.querySelectorAll(
      '.product-showcase, .product-showcase-content, .product-showcase-container, .col-product-related, .col-product-visited'
    );
    for (var i = 0; i < nodes.length; i++) attachGridObserver(nodes[i]);
  }

  function installSlickGuard() {
    if (slickGuardInstalled || typeof jQuery === 'undefined' || !jQuery.fn || !jQuery.fn.slick) return;
    var original = jQuery.fn.slick;
    if (original._catalogGridFinalGuard) return;

    jQuery.fn.slick = function (options) {
      var el = this[0];
      if (isMobile() && el && (isProtectedList(el) || (el.classList && el.classList.contains('showcase-list') && isProtectedNode(el)))) {
        if (typeof options === 'string') {
          if (options === 'unslick') return original.apply(this, arguments);
          scheduleFix();
          return this;
        }
        scheduleFix();
        return this;
      }
      if (isMobile() && el && el.classList && el.classList.contains('showcase-list') && el.classList.contains(LIST_GRID_CLASS)) {
        if (typeof options === 'string' && options === 'unslick') return original.apply(this, arguments);
        scheduleFix();
        return this;
      }
      return original.apply(this, arguments);
    };
    jQuery.fn.slick._catalogGridFinalGuard = true;
    slickGuardInstalled = true;
  }

  function hookHistoryNavigation() {
    if (window._catalogGridHistoryHooked) return;
    window._catalogGridHistoryHooked = true;

    var pushState = history.pushState;
    var replaceState = history.replaceState;

    history.pushState = function () {
      var result = pushState.apply(history, arguments);
      scheduleFix();
      window.setTimeout(scheduleFix, 100);
      window.setTimeout(scanAndObserveAll, 100);
      window.setTimeout(scheduleFix, 500);
      return result;
    };

    history.replaceState = function () {
      var result = replaceState.apply(history, arguments);
      scheduleFix();
      window.setTimeout(scheduleFix, 100);
      return result;
    };

    window.addEventListener('popstate', function () {
      scheduleFix();
      window.setTimeout(scanAndObserveAll, 50);
      window.setTimeout(scheduleFix, 400);
    });
  }

  function hookThemeCallbacks() {
    var origRefresh = window.refreshThemeShowcaseSliders;
    if (typeof origRefresh === 'function' && !origRefresh._catalogGridFinalHook) {
      window.refreshThemeShowcaseSliders = function (force) {
        origRefresh(force);
        scheduleFix();
        window.setTimeout(scheduleFix, 50);
        window.setTimeout(scheduleFix, 300);
      };
      window.refreshThemeShowcaseSliders._catalogGridFinalHook = true;
    }

    var origHover = window.initProductHoverImage;
    if (typeof origHover === 'function' && !origHover._catalogGridFinalHook) {
      window.initProductHoverImage = function () {
        origHover();
        scanAndObserveAll();
        scheduleFix();
        window.setTimeout(scheduleFix, 200);
      };
      window.initProductHoverImage._catalogGridFinalHook = true;
    }
  }

  function initCatalogGridFinal() {
    installSlickGuard();
    hookHistoryNavigation();
    hookThemeCallbacks();
    scanAndObserveAll();
    runAllFixes();

    window.setTimeout(function () {
      scanAndObserveAll();
      runAllFixes();
    }, 100);
    window.setTimeout(runAllFixes, 400);
    window.setTimeout(runAllFixes, 1000);
    window.setTimeout(runAllFixes, 2500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCatalogGridFinal);
  } else {
    initCatalogGridFinal();
  }

  window.addEventListener('load', initCatalogGridFinal);
  window.addEventListener('pageshow', initCatalogGridFinal);
  window.addEventListener('resize', function () {
    window.setTimeout(runAllFixes, 120);
  });

  if (typeof MutationObserver !== 'undefined' && document.documentElement) {
    var bootObserver = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var added = mutations[i].addedNodes;
        for (var a = 0; a < added.length; a++) {
          var node = added[a];
          if (node.nodeType !== 1) continue;
          if (
            (node.matches && node.matches('.product-showcase, .col-product-related, .col-product-visited')) ||
            (node.querySelector && node.querySelector('.product-showcase, .col-product-related, .col-product-visited, .showcase-list'))
          ) {
            scanAndObserveAll();
            scheduleFix();
            return;
          }
        }
      }
    });
    bootObserver.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
