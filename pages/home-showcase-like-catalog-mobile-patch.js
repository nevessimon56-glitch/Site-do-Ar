/* ==========================================================
   HOME MOBILE — unslick vitrine (grid 2 col como catálogo)
   Cole no FINAL do mega-menu.js. NÃO afeta .showcase-search.
   ========================================================== */

(function () {
  'use strict';

  var MOBILE_MQ = '(max-width: 991px)';

  function isHomeShowcaseList(list) {
    return !!(list && list.closest && list.closest('section.showcase') && !list.closest('.showcase-search'));
  }

  function fixHomeShowcaseGrid() {
    if (!window.matchMedia(MOBILE_MQ).matches) return;

    var lists = document.querySelectorAll('section.showcase .showcase-list');
    for (var i = 0; i < lists.length; i++) {
      if (!isHomeShowcaseList(lists[i])) continue;

      if (typeof jQuery !== 'undefined' && jQuery.fn && jQuery.fn.slick) {
        var $list = jQuery(lists[i]);
        if ($list.hasClass('slick-initialized')) {
          try {
            $list.slick('unslick');
          } catch (e) {}
        }
      }
    }
  }

  function scheduleFix() {
    fixHomeShowcaseGrid();
    window.setTimeout(fixHomeShowcaseGrid, 200);
    window.setTimeout(fixHomeShowcaseGrid, 800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleFix);
  } else {
    scheduleFix();
  }

  window.addEventListener('load', scheduleFix);
  window.addEventListener('resize', function () {
    window.setTimeout(fixHomeShowcaseGrid, 120);
  });

  var origRefresh = window.refreshThemeShowcaseSliders;
  if (typeof origRefresh === 'function' && !origRefresh._homeShowcaseGridHook) {
    window.refreshThemeShowcaseSliders = function (force) {
      origRefresh(force);
      window.setTimeout(fixHomeShowcaseGrid, 50);
      window.setTimeout(fixHomeShowcaseGrid, 350);
    };
    window.refreshThemeShowcaseSliders._homeShowcaseGridHook = true;
  }
})();
