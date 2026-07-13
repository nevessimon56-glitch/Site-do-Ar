(function () {
  'use strict';

  function initMegaMenuAr() {
    if (!window.matchMedia('(min-width: 992px)').matches) return;

    var nav = document.querySelector('.nav-main');
    var template = document.getElementById('mega-menu-ar-template');
    if (!nav || !template) return;

    var legacySlugs = ['split-inverter', 'piso-teto', 'janela'];
    nav.querySelectorAll('.nav-main_item').forEach(function (item) {
      var link = item.querySelector(':scope > .nav-main_link');
      if (!link || !link.href) return;
      var path = (link.getAttribute('href') || '').toLowerCase();
      if (legacySlugs.some(function (slug) { return path.indexOf(slug) !== -1; })) {
        item.classList.add('nav-main_item--legacy-ac');
      }
    });

    if (nav.querySelector('.mega-menu-ar')) return;

    var megaItem = document.createElement('div');
    megaItem.className = 'nav-main_item dropdown mega-menu-ar';
    megaItem.innerHTML =
      '<a href="/Todos-os-Produtos" class="nav-main_link dropdown-toggle" tabindex="0" title="Ar Condicionado">' +
        '<div class="nav-main-box_link">' +
          '<div class="nav-main_text">Ar Condicionado</div>' +
          '<div class="nav-main_arrow">' +
            '<svg class="icon_arrow_down" width="40" height="40" viewBox="0 0 451.847 451.847" aria-hidden="true">' +
              '<path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"></path>' +
            '</svg>' +
          '</div>' +
        '</div>' +
      '</a>' +
      '<div class="mega-menu-ar__panel dropdown-content" role="region" aria-label="Categorias de ar-condicionado"></div>';

    var panel = megaItem.querySelector('.mega-menu-ar__panel');
    panel.appendChild(template.firstElementChild);

    var todosItem = nav.querySelector('.nav-main_item');
    if (todosItem && todosItem.nextSibling) {
      nav.insertBefore(megaItem, todosItem.nextSibling);
    } else {
      nav.appendChild(megaItem);
    }

    template.remove();

    var closeTimer;
    function open() {
      clearTimeout(closeTimer);
      megaItem.classList.add('is-open');
    }
    function close() {
      closeTimer = setTimeout(function () {
        megaItem.classList.remove('is-open');
      }, 120);
    }

    megaItem.addEventListener('mouseenter', open);
    megaItem.addEventListener('mouseleave', close);
    megaItem.addEventListener('focusin', open);
    megaItem.addEventListener('focusout', function (e) {
      if (!megaItem.contains(e.relatedTarget)) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMegaMenuAr);
  } else {
    initMegaMenuAr();
  }
})();
