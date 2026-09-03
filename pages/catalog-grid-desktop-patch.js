/* PATCH — cole no FINAL do seu assets/mega-menu.js (~1800 linhas) */
/* NÃO substitua o arquivo inteiro. Versão: CATALOG-GRID-DESKTOP-v1 */

/**
 * Catálogo desktop — remove slick/float que quebra 6 produtos em 3+1+2
 */
(function () {
  'use strict';

  var DESKTOP_MQ = '(min-width: 992px)';

  function isCatalogListingPage() {
    if (document.querySelector('main.search-main, .search-main, .showcase-search')) return true;
    var p = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '') || '/';
    if (p === '/todos-os-produtos') return true;
    if (p.indexOf('/busca') === 0) return true;
    if (/\d+\s*btus?/.test(p) || p.indexOf('btus') !== -1) return true;
    return false;
  }

  function fixCatalogDesktopGrid() {
    if (!window.matchMedia(DESKTOP_MQ).matches) return;
    if (!isCatalogListingPage()) return;

    var lists = document.querySelectorAll('.showcase-search .showcase-list');
    for (var i = 0; i < lists.length; i++) {
      var list = lists[i];

      if (typeof jQuery !== 'undefined' && jQuery.fn && jQuery.fn.slick) {
        var $list = jQuery(list);
        if ($list.hasClass('slick-initialized')) {
          try {
            $list.slick('unslick');
          } catch (e) {}
        }
      }

      list.style.removeProperty('display');
      list.style.removeProperty('width');

      var items = list.querySelectorAll('.showcase-item');
      for (var j = 0; j < items.length; j++) {
        items[j].style.removeProperty('width');
        items[j].style.removeProperty('display');
        items[j].style.removeProperty('float');
        items[j].style.removeProperty('opacity');
        items[j].style.removeProperty('visibility');
      }
    }
  }

  function scheduleDesktopGridFix() {
    fixCatalogDesktopGrid();
    window.setTimeout(fixCatalogDesktopGrid, 400);
    window.setTimeout(fixCatalogDesktopGrid, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleDesktopGridFix);
  } else {
    scheduleDesktopGridFix();
  }
  window.addEventListener('load', scheduleDesktopGridFix);
})();
