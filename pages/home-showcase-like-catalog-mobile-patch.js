/* ==========================================================
   HOME MOBILE — grid 2 col igual catálogo (PROMO / vitrines)
   Alvo: main.home-main — NÃO mexe em .showcase-search
   ========================================================== */

(function () {
  'use strict';

  var MOBILE_MQ = '(max-width: 991px)';
  var GRID_CLASS = 'showcase-home_grid--mobile-2col';

  function isMobile() {
    return window.matchMedia(MOBILE_MQ).matches;
  }

  function isHomePage() {
    var p = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '') || '/';
    if (p === '/') return true;
    return !!document.querySelector('main.home-main');
  }

  function isCatalogContext(node) {
    return !!(node && node.closest && (node.closest('.showcase-search') || node.closest('main.search-main') || node.closest('.search-main')));
  }

  function unslickNode(node) {
    if (typeof jQuery === 'undefined' || !jQuery.fn || !jQuery.fn.slick) return;
    var $node = jQuery(node);
    if ($node.hasClass('slick-initialized')) {
      try {
        $node.slick('unslick');
      } catch (e) {}
    }
  }

  function applyHomeShowcaseGrid() {
    if (!isMobile() || !isHomePage()) return;

    var blocks = document.querySelectorAll('main.home-main section.showcase .showcase-products');
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      if (isCatalogContext(block)) continue;
      if (!block.querySelector('.showcase-item')) continue;

      block.classList.add(GRID_CLASS);
      block.setAttribute('data-mobile-grid', '2col');

      var lists = block.querySelectorAll('.showcase-list, .showcase-slider, ul[class*="showcase-slider"]');
      for (var j = 0; j < lists.length; j++) {
        if (!lists[j].querySelector('.showcase-item')) continue;
        unslickNode(lists[j]);
      }
    }
  }

  function scheduleFix() {
    applyHomeShowcaseGrid();
    window.setTimeout(applyHomeShowcaseGrid, 150);
    window.setTimeout(applyHomeShowcaseGrid, 600);
    window.setTimeout(applyHomeShowcaseGrid, 1500);
  }

  window.applyHomeShowcaseGrid = applyHomeShowcaseGrid;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleFix);
  } else {
    scheduleFix();
  }

  window.addEventListener('load', scheduleFix);
  window.addEventListener('resize', function () {
    window.setTimeout(applyHomeShowcaseGrid, 120);
  });

  var origRefresh = window.refreshThemeShowcaseSliders;
  if (typeof origRefresh === 'function' && !origRefresh._homeShowcaseGridHook) {
    window.refreshThemeShowcaseSliders = function (force) {
      origRefresh(force);
      window.setTimeout(applyHomeShowcaseGrid, 50);
      window.setTimeout(applyHomeShowcaseGrid, 400);
    };
    window.refreshThemeShowcaseSliders._homeShowcaseGridHook = true;
  }

  if (typeof jQuery !== 'undefined' && jQuery.fn && jQuery.fn.slick && !jQuery.fn.slick._homeShowcaseGridGuard) {
    var originalSlick = jQuery.fn.slick;
    jQuery.fn.slick = function (options) {
      var el = this[0];
      if (
        isMobile() &&
        el &&
        el.closest &&
        el.closest('main.home-main') &&
        el.closest('.' + GRID_CLASS) &&
        !el.closest('.showcase-search')
      ) {
        if (typeof options === 'string' && options === 'unslick') {
          return originalSlick.apply(this, arguments);
        }
        window.setTimeout(applyHomeShowcaseGrid, 0);
        return this;
      }
      return originalSlick.apply(this, arguments);
    };
    jQuery.fn.slick._homeShowcaseGridGuard = true;
  }
})();
