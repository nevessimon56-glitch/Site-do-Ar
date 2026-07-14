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
    var prevBtn = carousel.querySelector('.mega-menu-ar__arrow--prev');
    var nextBtn = carousel.querySelector('.mega-menu-ar__arrow--next');
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

    function prevSlide() {
      goTo(current - 1);
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

      if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          prevSlide();
          startCarousel();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          nextSlide();
          startCarousel();
        });
      }
    }

    goTo(0);
    startCarousel();
  }

  var ARROW_SVG =
    '<svg class="icon_arrow_down" width="40" height="40" viewBox="0 0 451.847 451.847" aria-hidden="true">' +
      '<path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"></path>' +
    '</svg>';

  function findModelosNavItem(nav) {
    var items = nav.querySelectorAll('.nav-main_item');
    for (var i = 0; i < items.length; i++) {
      var link = items[i].querySelector('a.nav-main_link');
      if (!link) continue;
      var text = (link.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      var path = (link.getAttribute('href') || '').toLowerCase();
      if (
        text === 'modelos' ||
        text.indexOf('modelos') === 0 ||
        text.indexOf('ar condicionado') === 0 ||
        path.indexOf('/modelos') !== -1
      ) {
        return items[i];
      }
    }
    return null;
  }

  function ensureModelosLabel(megaItem) {
    var link = megaItem.querySelector('a.nav-main_link');
    if (!link) return;
    link.setAttribute('title', 'Modelos');
    var textEl = link.querySelector('.nav-main_text');
    if (textEl) textEl.textContent = 'Modelos';
    if (!link.querySelector('.nav-main_arrow')) {
      var box = link.querySelector('.nav-main-box_link');
      if (box) {
        var arrow = document.createElement('div');
        arrow.className = 'nav-main_arrow';
        arrow.innerHTML = ARROW_SVG;
        box.appendChild(arrow);
      }
    }
    if (!link.classList.contains('dropdown-toggle')) {
      link.classList.add('dropdown-toggle');
    }
  }

  function buildModelosNavItem() {
    var megaItem = document.createElement('div');
    megaItem.className = 'nav-main_item dropdown mega-menu-ar';
    megaItem.innerHTML =
      '<a href="/Todos-os-Produtos" class="nav-main_link dropdown-toggle" tabindex="0" title="Modelos">' +
        '<div class="nav-main-box_link">' +
          '<div class="nav-main_text">Modelos</div>' +
          '<div class="nav-main_arrow">' + ARROW_SVG + '</div>' +
        '</div>' +
      '</a>' +
      '<div class="mega-menu-ar__panel dropdown-content" role="region" aria-label="Categorias de modelos"></div>';
    return megaItem;
  }

  function bindMegaMenuEvents(megaItem, panel) {
    if (megaItem.getAttribute('data-mega-menu-bound') === '1') {
      initMegaMenuCarousel(panel);
      return;
    }
    megaItem.setAttribute('data-mega-menu-bound', '1');

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
  }

  function mountMegaMenuPanel(megaItem, inner, template) {
    var panel = megaItem.querySelector('.mega-menu-ar__panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'mega-menu-ar__panel dropdown-content';
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-label', 'Categorias de modelos');
      megaItem.appendChild(panel);
    }

    if (!panel.querySelector('.mega-menu-ar__inner')) {
      panel.appendChild(inner);
      if (template && template.parentNode) {
        template.parentNode.removeChild(template);
      }
    }

    bindMegaMenuEvents(megaItem, panel);
  }

  function initMegaMenuAr() {
    if (!window.matchMedia('(min-width: 992px)').matches) return false;

    var nav = document.querySelector('.nav-main');
    var template = document.getElementById('mega-menu-ar-template');
    if (!nav || !template) return false;

    var inner = template.querySelector('.mega-menu-ar__inner');
    if (!inner) return false;

    var megaItem = nav.querySelector('.mega-menu-ar') || findModelosNavItem(nav);

    if (megaItem) {
      megaItem.classList.add('dropdown', 'mega-menu-ar');
      ensureModelosLabel(megaItem);
      mountMegaMenuPanel(megaItem, inner, template);
      return true;
    }

    megaItem = buildModelosNavItem();
    mountMegaMenuPanel(megaItem, inner, template);

    var todosItem = nav.querySelector('.nav-main_item');
    if (todosItem && todosItem.nextSibling) {
      nav.insertBefore(megaItem, todosItem.nextSibling);
    } else {
      nav.appendChild(megaItem);
    }

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
    var img = link.querySelector('.product-hover-img--main, .product-hover-swap, .product-hover-wrap img:not(.product-hover-img--hover), img');
    if (!img) return null;
    if (alt && alt !== img) {
      var hoverFromAlt = alt.getAttribute('data-hover-src') || alt.getAttribute('data-src') || alt.getAttribute('src');
      if (hoverFromAlt && !img.getAttribute('data-hover-src')) img.setAttribute('data-hover-src', hoverFromAlt);
      alt.parentNode.removeChild(alt);
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

    var wrap = link.querySelector('.product-hover-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'product-hover-wrap';
      link.insertBefore(wrap, img);
      wrap.appendChild(img);
    } else if (img.parentNode !== wrap) {
      wrap.appendChild(img);
    }

    var hoverImg = wrap.querySelector('.product-hover-img--hover');
    if (!hoverImg) {
      hoverImg = document.createElement('img');
      hoverImg.className = 'product-hover-img--hover';
      hoverImg.alt = img.alt || '';
      hoverImg.setAttribute('data-src', hoverSrc);
      wrap.appendChild(hoverImg);
    } else if (!hoverImg.getAttribute('data-src')) {
      hoverImg.setAttribute('data-src', hoverSrc);
    }
  }

  function showHoverImage(link, hoverSrc) {
    var hoverImg = link.querySelector('.product-hover-img--hover');
    if (!hoverImg) return;
    if (!hoverImg.getAttribute('src')) {
      hoverImg.setAttribute(
        'src',
        hoverImg.getAttribute('data-src') || hoverSrc || ''
      );
    }
    link.classList.add('is-hovering');
  }

  function hideHoverImage(link) {
    link.classList.remove('is-hovering');
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
        showHoverImage(link, hoverSrc);
        showingHover = true;
      });
      link.addEventListener('mouseleave', function () {
        if (isTouchOnly()) return;
        hideHoverImage(link);
        showingHover = false;
      });
      link.addEventListener('touchend', function (e) {
        if (!isTouchOnly()) return;
        if (!showingHover) {
          e.preventDefault();
          showHoverImage(link, hoverSrc);
          showingHover = true;
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
      document.body._productHoverObserver = new MutationObserver(function () {
        scan(document);
        cleanupDuplicateSpecBars();
      });
      document.body._productHoverObserver.observe(document.body, { childList: true, subtree: true });
    }
    cleanupDuplicateSpecBars();
  }

  function cleanupDuplicateSpecBars() {
    var cards = document.querySelectorAll('.showcase-product');
    for (var i = 0; i < cards.length; i++) {
      var imageArea = cards[i].querySelector('.showcase-product_image, .card-image');
      if (imageArea) {
        var dupes = imageArea.querySelectorAll('.showcase-spec-bar, .showcase-spec-wrap, .showcase-spec-bar__item, .showcase-spec-bar__badge');
        for (var j = 0; j < dupes.length; j++) {
          if (dupes[j].parentNode) dupes[j].parentNode.removeChild(dupes[j]);
        }
      }
      var wraps = cards[i].querySelectorAll('.showcase-spec-wrap');
      if (wraps.length > 1) {
        for (var k = 1; k < wraps.length; k++) {
          if (wraps[k].parentNode) wraps[k].parentNode.removeChild(wraps[k]);
        }
      }
    }
  }

  window.cleanupDuplicateSpecBars = cleanupDuplicateSpecBars;

  window.initProductHoverImage = initProductHoverImage;
  document.addEventListener('DOMContentLoaded', initProductHoverImage);
  window.addEventListener('load', initProductHoverImage);
})();
