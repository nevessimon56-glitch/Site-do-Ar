/* ==========================================================
   HOME MOBILE — grade só em vitrine grid (Promoção); carrossel intacto (tns)
   Alvo: main.home-main — NÃO mexe em .showcase-search
   Cole no FINAL do mega-menu.js
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

  function applyHomeGridVitrines() {
    if (!isMobile() || !isHomePage()) return;

    var blocks = document.querySelectorAll('main.home-main section.showcase .showcase-products_grid');
    for (var i = 0; i < blocks.length; i++) {
      if (!blocks[i].querySelector('.showcase-item')) continue;
      blocks[i].classList.add(GRID_CLASS);
      blocks[i].setAttribute('data-mobile-grid', '2col');
    }
  }

  function initHomeShowcaseMobile() {
    applyHomeGridVitrines();
  }

  window.applyHomeGridVitrines = applyHomeGridVitrines;
  window.initHomeShowcaseMobile = initHomeShowcaseMobile;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomeShowcaseMobile);
  } else {
    initHomeShowcaseMobile();
  }
  window.addEventListener('load', initHomeShowcaseMobile);
})();
