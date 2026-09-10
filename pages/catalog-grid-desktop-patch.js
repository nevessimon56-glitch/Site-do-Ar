/* PATCH — cole no FINAL do assets/mega-menu.js */
/* NÃO substitua o arquivo inteiro. Versão: CATALOG-DESKTOP-GRID-v4 (3 col theme-all) */
/* NÃO use o patch antigo com flex + 33.333% — ele força 3 colunas via inline style. */

/**
 * Catálogo desktop — grade 3 col do tema (CSS visual no mega-menu.css PRODUCT-CARD-v2)
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

  function clearInlineGridStyles(list) {
    var listProps = ['display', 'width', 'max-width', 'flex-direction', 'flex-wrap', 'margin-left', 'margin-right'];
    for (var p = 0; p < listProps.length; p++) {
      list.style.removeProperty(listProps[p]);
    }

    var items = list.querySelectorAll('.showcase-item');
    var itemProps = ['width', 'max-width', 'min-width', 'flex', 'display', 'float', 'clear', 'opacity', 'visibility', 'margin-left', 'margin-right'];
    for (var j = 0; j < items.length; j++) {
      for (var k = 0; k < itemProps.length; k++) {
        items[j].style.removeProperty(itemProps[k]);
      }
    }
  }

  function fixCatalogDesktopGrid() {
    if (!window.matchMedia(DESKTOP_MQ).matches) return;
    if (!isCatalogListingPage()) return;

    var sections = document.querySelectorAll('.showcase-search.showcase-search_list, .showcase-search.showcase-search_grid');
    for (var s = 0; s < sections.length; s++) {
      if (sections[s].classList.contains('showcase-search_list')) {
        sections[s].classList.remove('showcase-search_list');
        sections[s].classList.add('showcase-search_grid');
      }
    }

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

      clearInlineGridStyles(list);
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
