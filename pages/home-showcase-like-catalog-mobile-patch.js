/* ==========================================================
   HOME MOBILE — grid 2 col (CSS Grid + inline, telas estreitas)
   Alvo: main.home-main — NÃO mexe em .showcase-search
   ========================================================== */

(function () {
  'use strict';

  var MOBILE_MQ = '(max-width: 991px)';
  var GRID_CLASS = 'showcase-home_grid--mobile-2col';
  var GAP = '8px 10px';

  function isMobile() {
    return window.matchMedia(MOBILE_MQ).matches;
  }

  function isHomePage() {
    var p = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '') || '/';
    if (p === '/') return true;
    return !!document.querySelector('main.home-main');
  }

  function isHomeProductBlock(node) {
    return !!(
      node &&
      node.closest &&
      node.closest('main.home-main section.showcase .showcase-products') &&
      !node.closest('.showcase-search') &&
      !node.closest('main.search-main')
    );
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

  function applyGridStyles(list) {
    if (!list) return;

    list.style.setProperty('display', 'grid', 'important');
    list.style.setProperty('grid-template-columns', 'repeat(2, minmax(0, 1fr))', 'important');
    list.style.setProperty('gap', GAP, 'important');
    list.style.setProperty('align-items', 'stretch', 'important');
    list.style.setProperty('width', '100%', 'important');
    list.style.setProperty('max-width', '100%', 'important');
    list.style.setProperty('margin', '0', 'important');
    list.style.setProperty('padding', '0', 'important');
    list.style.setProperty('transform', 'none', 'important');
    list.style.setProperty('left', '0', 'important');
    list.style.setProperty('height', 'auto', 'important');

    var slickList = list.querySelector('.slick-list');
    if (slickList) {
      slickList.style.setProperty('overflow', 'visible', 'important');
      slickList.style.setProperty('width', '100%', 'important');
      slickList.style.setProperty('height', 'auto', 'important');
    }

    var track = list.querySelector('.slick-track');
    if (track) {
      track.style.setProperty('display', 'grid', 'important');
      track.style.setProperty('grid-template-columns', 'repeat(2, minmax(0, 1fr))', 'important');
      track.style.setProperty('gap', GAP, 'important');
      track.style.setProperty('width', '100%', 'important');
      track.style.setProperty('transform', 'none', 'important');
      track.style.setProperty('left', '0', 'important');
      track.style.setProperty('height', 'auto', 'important');
    }

    var items = list.querySelectorAll('.showcase-item');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      item.style.setProperty('width', '100%', 'important');
      item.style.setProperty('max-width', '100%', 'important');
      item.style.setProperty('min-width', '0', 'important');
      item.style.setProperty('display', 'flex', 'important');
      item.style.setProperty('flex-direction', 'column', 'important');
      item.style.setProperty('height', 'auto', 'important');
      item.style.setProperty('float', 'none', 'important');
      item.style.setProperty('margin', '0', 'important');
      item.style.setProperty('opacity', '1', 'important');
      item.style.setProperty('visibility', 'visible', 'important');
    }
  }

  function applyHomeShowcaseGrid() {
    if (!isMobile() || !isHomePage()) return;

    var blocks = document.querySelectorAll('main.home-main section.showcase .showcase-products');
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      if (!block.querySelector('.showcase-item')) continue;

      block.classList.add(GRID_CLASS);
      block.setAttribute('data-mobile-grid', '2col');

      var roots = block.querySelectorAll(
        '.showcase-slider, .showcase-list, ul[class*="showcase-slider"], .slick-initialized'
      );
      for (var j = 0; j < roots.length; j++) {
        if (!roots[j].querySelector('.showcase-item') && !roots[j].classList.contains('showcase-item')) continue;
        unslickNode(roots[j]);
      }

      var grids = block.querySelectorAll('.showcase-slider, .showcase-list, .slick-track');
      for (var k = 0; k < grids.length; k++) {
        if (grids[k].querySelector('.showcase-item')) {
          applyGridStyles(grids[k]);
        }
      }
    }
  }

  function scheduleFix() {
    applyHomeShowcaseGrid();
    window.setTimeout(applyHomeShowcaseGrid, 100);
    window.setTimeout(applyHomeShowcaseGrid, 400);
    window.setTimeout(applyHomeShowcaseGrid, 1200);
  }

  window.applyHomeShowcaseGrid = applyHomeShowcaseGrid;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleFix);
  } else {
    scheduleFix();
  }

  window.addEventListener('load', scheduleFix);
  window.addEventListener('resize', function () {
    window.setTimeout(applyHomeShowcaseGrid, 100);
  });
  window.addEventListener('orientationchange', function () {
    window.setTimeout(applyHomeShowcaseGrid, 300);
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
      if (isMobile() && isHomeProductBlock(el)) {
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
