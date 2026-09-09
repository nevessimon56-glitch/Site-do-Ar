/* PATCH — cole no FINAL do assets/mega-menu.js (~1800 linhas) */
/* NÃO substitua o arquivo inteiro. Versão: CATALOG-GRID-DESKTOP-v2 */

/**
 * Catálogo desktop — remove slick e força grade 3 colunas
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

  function applyGridToList(list) {
    list.style.setProperty('display', 'flex', 'important');
    list.style.setProperty('flex-direction', 'row', 'important');
    list.style.setProperty('flex-wrap', 'wrap', 'important');
    list.style.setProperty('width', '100%', 'important');
    list.style.setProperty('max-width', '100%', 'important');

    var items = list.querySelectorAll('.showcase-item');
    for (var j = 0; j < items.length; j++) {
      var item = items[j];
      item.style.setProperty('float', 'left', 'important');
      item.style.setProperty('display', 'flex', 'important');
      item.style.setProperty('flex', '0 0 33.333%', 'important');
      item.style.setProperty('width', '33.333%', 'important');
      item.style.setProperty('max-width', '33.333%', 'important');
      item.style.setProperty('clear', 'none', 'important');
      item.style.setProperty('opacity', '1', 'important');
      item.style.setProperty('visibility', 'visible', 'important');
    }
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

      applyGridToList(list);
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
  window.addEventListener('resize', function () {
    window.setTimeout(fixCatalogDesktopGrid, 100);
  });
})();
