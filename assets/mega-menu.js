/**
 * ARQUIVO: assets/mega-menu.js
 * IMPORTANTE: este arquivo deve conter JAVASCRIPT, não CSS.
 * O CSS fica em assets/mega-menu.css
 */
(function () {
  'use strict';

  function initMegaMenuCarousel(root) {
    var carousel = root ? root.querySelector('[data-mega-carousel]') : document.querySelector('[data-mega-carousel]');
    if (!carousel || carousel.getAttribute('data-mega-carousel-init') === '1') return;

    var slides = carousel.querySelectorAll('.mega-menu-ar__slide');
    if (!slides.length) return;

    carousel.setAttribute('data-mega-carousel-init', '1');

    var dots = carousel.querySelectorAll('.mega-menu-ar__dot');
    var current = 0;
    var timer = null;
    var delay = 5000;

    function goTo(index) {
      current = index;
      if (current >= slides.length) current = 0;
      if (current < 0) current = slides.length - 1;

      for (var i = 0; i < slides.length; i++) {
        if (i === current) {
          slides[i].classList.add('is-active');
        } else {
          slides[i].classList.remove('is-active');
        }
      }

      for (var j = 0; j < dots.length; j++) {
        if (j === current) {
          dots[j].classList.add('is-active');
        } else {
          dots[j].classList.remove('is-active');
        }
      }
    }

    function nextSlide() {
      goTo(current + 1 >= slides.length ? 0 : current + 1);
    }

    function startCarousel() {
      if (timer) clearInterval(timer);
      timer = setInterval(nextSlide, delay);
    }

    function stopCarousel() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    for (var d = 0; d < dots.length; d++) {
      (function (idx) {
        dots[idx].addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          goTo(idx);
          startCarousel();
        });
      })(d);
    }

    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);

    goTo(0);
    startCarousel();
  }

  function initMegaMenuAr() {
    if (!window.matchMedia('(min-width: 992px)').matches) return false;

    var nav = document.querySelector('.nav-main');
    var template = document.getElementById('mega-menu-ar-template');
    if (!nav || !template) return false;

    var legacySlugs = ['split-inverter', 'piso-teto', 'janela'];
    var items = nav.querySelectorAll('.nav-main_item');

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var link = item.querySelector('a.nav-main_link');
      if (!link) continue;
      var path = (link.getAttribute('href') || '').toLowerCase();
      for (var j = 0; j < legacySlugs.length; j++) {
        if (path.indexOf(legacySlugs[j]) !== -1) {
          item.classList.add('nav-main_item--legacy-ac');
          break;
        }
      }
    }

    if (nav.querySelector('.mega-menu-ar')) {
      initMegaMenuCarousel(document);
      return true;
    }

    var inner = template.querySelector('.mega-menu-ar__inner');
    if (!inner) return false;

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
    panel.appendChild(inner);

    var todosItem = nav.querySelector('.nav-main_item');
    if (todosItem && todosItem.nextSibling) {
      nav.insertBefore(megaItem, todosItem.nextSibling);
    } else {
      nav.appendChild(megaItem);
    }

    template.parentNode.removeChild(template);

    var closeTimer;
    function openMenu() {
      clearTimeout(closeTimer);
      megaItem.classList.add('is-open');
    }
    function closeMenu() {
      closeTimer = setTimeout(function () {
        megaItem.classList.remove('is-open');
      }, 120);
    }

    megaItem.addEventListener('mouseenter', openMenu);
    megaItem.addEventListener('mouseleave', closeMenu);
    megaItem.addEventListener('focusin', openMenu);
    megaItem.addEventListener('focusout', function (e) {
      if (!megaItem.contains(e.relatedTarget)) closeMenu();
    });

    initMegaMenuCarousel(panel);
    return true;
  }

  window.initMegaMenuAr = initMegaMenuAr;

  function bootMegaMenu() {
    try {
      initMegaMenuAr();
    } catch (err) {
      console.error('Mega menu:', err);
    }
  }

  document.addEventListener('DOMContentLoaded', bootMegaMenu);
  window.addEventListener('load', bootMegaMenu);
})();
