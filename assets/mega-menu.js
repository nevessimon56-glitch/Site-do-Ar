/**
 * ARQUIVO: assets/mega-menu.js
 * IMPORTANTE: este arquivo deve conter JAVASCRIPT, não CSS.
 * O CSS fica em assets/mega-menu.css
 */
(function () {
  'use strict';

  function initMegaMenuCarousel(root) {
    var carousel = root ? root.querySelector('[data-mega-carousel]') : document.querySelector('[data-mega-carousel]');
    if (!carousel) return;

    var slides = carousel.querySelectorAll('.mega-menu-ar__slide');
    if (!slides.length) return;

    var dots = carousel.querySelectorAll('.mega-menu-ar__dot');
    var current = 0;
    var delay = 3000;

    if (carousel._megaCarouselTimer) {
      clearInterval(carousel._megaCarouselTimer);
      carousel._megaCarouselTimer = null;
    }

    function goTo(index) {
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;
      current = index;

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
      goTo(current + 1);
    }

    function startCarousel() {
      if (carousel._megaCarouselTimer) clearInterval(carousel._megaCarouselTimer);
      carousel._megaCarouselTimer = setInterval(nextSlide, delay);
    }

    if (carousel.getAttribute('data-mega-carousel-init') !== '1') {
      carousel.setAttribute('data-mega-carousel-init', '1');

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

      for (var s = 0; s < slides.length; s++) {
        (function (slide) {
          slide.addEventListener('touchstart', function () {
            slide.classList.toggle('is-img-hover');
          }, { passive: true });
        })(slides[s]);
      }
    }

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
      var existingPanel = nav.querySelector('.mega-menu-ar .mega-menu-ar__panel');
      initMegaMenuCarousel(existingPanel || document);
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

    megaItem.addEventListener('mouseenter', function () {
      openMenu();
      initMegaMenuCarousel(panel);
    });
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

/**
 * Hover de imagem nos cards de produto (site inteiro)
 */
(function () {
  'use strict';

  var PROCESSED = 'data-hover-swap-ready';
  var cache = {};

  function isTouchOnly() {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  }

  function currentMainSrc(img) {
    if (img.getAttribute('data-main-src')) return img.getAttribute('data-main-src');
    var src = img.getAttribute('src') || '';
    if (src && src.indexOf('data:') !== 0) return src;
    return img.getAttribute('data-src') || '';
  }

  function guessHoverUrl(mainUrl) {
    if (!mainUrl) return '';
    if (/-0-\d+\.webp/i.test(mainUrl)) return mainUrl.replace(/-0-(\d+\.webp)/i, '-1-$1');
    if (/-0\.webp/i.test(mainUrl)) return mainUrl.replace(/-0\.webp/i, '-1.webp');
    return '';
  }

  function urlOk(url, cb) {
    if (!url) { cb(false); return; }
    if (cache[url] === true) { cb(true); return; }
    if (cache[url] === false) { cb(false); return; }
    var probe = new Image();
    probe.onload = function () { cache[url] = true; cb(true); };
    probe.onerror = function () { cache[url] = false; cb(false); };
    probe.src = url;
  }

  function normalizeImg(link) {
    var alt = link.querySelector('.product-hover-img--alt');
    var img = link.querySelector('.product-hover-swap, .product-hover-img--main, img');
    if (!img) return null;
    if (alt && alt !== img) {
      var hoverFromAlt = alt.getAttribute('data-hover-src') || alt.getAttribute('data-src') || alt.getAttribute('src');
      if (hoverFromAlt && !img.getAttribute('data-hover-src')) img.setAttribute('data-hover-src', hoverFromAlt);
      alt.parentNode.removeChild(alt);
    }
    var wrap = link.querySelector('.product-hover-wrap');
    if (wrap && wrap.parentNode === link) {
      while (wrap.firstChild) link.insertBefore(wrap.firstChild, wrap);
      wrap.parentNode.removeChild(wrap);
    }
    img.classList.add('product-hover-swap');
    return img;
  }

  function getHoverSrc(img) {
    return img.getAttribute('data-hover-src') || guessHoverUrl(currentMainSrc(img)) || '';
  }

  function rememberMain(img) {
    if (!img.getAttribute('data-main-src')) {
      var main = currentMainSrc(img);
      if (main) img.setAttribute('data-main-src', main);
    }
  }

  function setupDualImage(link, img, hoverSrc) {
    rememberMain(img);
    if (!img.getAttribute('data-hover-src')) img.setAttribute('data-hover-src', hoverSrc);
    img.classList.add('product-hover-img--main');
    if (img.classList.contains('lazy')) img.classList.add('loaded');

    var hoverImg = link.querySelector('.product-hover-img--hover');
    if (!hoverImg) {
      hoverImg = document.createElement('img');
      hoverImg.className = 'product-hover-img--hover lazy loaded';
      hoverImg.alt = img.alt || '';
      hoverImg.setAttribute('src', hoverSrc);
      link.appendChild(hoverImg);
    } else if (!hoverImg.getAttribute('src')) {
      hoverImg.setAttribute('src', hoverSrc);
    }
    hoverImg.classList.add('loaded');
  }

  function bindLink(link) {
    if (link.getAttribute(PROCESSED) === '1') return;
    var img = normalizeImg(link);
    if (!img) return;
    var hoverSrc = getHoverSrc(img);
    if (!hoverSrc) return;

    function attach() {
      if (!link.isConnected || link.getAttribute(PROCESSED) === '1') return;
      setupDualImage(link, img, hoverSrc);
      link.setAttribute(PROCESSED, '1');
      var showingHover = false;

      link.addEventListener('mouseenter', function () {
        if (isTouchOnly()) return;
        link.classList.add('is-hovering');
        showingHover = true;
      });
      link.addEventListener('mouseleave', function () {
        if (isTouchOnly()) return;
        link.classList.remove('is-hovering');
        showingHover = false;
      });
      link.addEventListener('touchend', function (e) {
        if (!isTouchOnly()) return;
        if (!showingHover) {
          e.preventDefault();
          showingHover = true;
          link.classList.add('is-hovering');
        }
      }, { passive: false });
    }

    if (img.getAttribute('data-hover-src')) {
      attach();
      return;
    }
    urlOk(hoverSrc, function (ok) {
      if (ok) attach();
    });
  }

  function scan(root) {
    var links = (root || document).querySelectorAll('.showcase-product_link__image:not([' + PROCESSED + '="1"])');
    for (var i = 0; i < links.length; i++) {
      if (links[i].closest('.mega-menu-ar')) continue;
      bindLink(links[i]);
    }
  }

  function initProductHoverImage() {
    scan(document);
    if (typeof MutationObserver !== 'undefined' && !document.body._productHoverObserver) {
      document.body._productHoverObserver = new MutationObserver(function () { scan(document); });
      document.body._productHoverObserver.observe(document.body, { childList: true, subtree: true });
    }
  }

  window.initProductHoverImage = initProductHoverImage;
  document.addEventListener('DOMContentLoaded', initProductHoverImage);
  window.addEventListener('load', initProductHoverImage);
})();
