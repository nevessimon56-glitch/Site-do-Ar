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

  var megaMenuBooted = false;

  function bootMegaMenu() {
    if (megaMenuBooted) return;
    megaMenuBooted = true;
    try {
      initMegaMenuAr();
    } catch (err) {
      console.error('Mega menu:', err);
    }
  }

  document.addEventListener('DOMContentLoaded', bootMegaMenu);
})();

/**
 * Hover de imagem nos cards de produto (site inteiro)
 */
(function () {
  'use strict';

  var PROCESSED = 'data-hover-swap-ready';
  var PLOT_FIXED = 'data-plot-fixed';
  var cache = {};
  var touchOnlyCached = null;
  var hoverInitDone = false;
  var mutationRaf = 0;
  var probeQueue = [];
  var probeActive = 0;
  var PROBE_MAX = 3;
  var cardObserver = null;
  var sliderRefreshTimer = 0;
  var authChangeTimer = 0;

  function refreshThemeShowcaseSliders() {
    var lists = document.querySelectorAll('.showcase-list');
    for (var i = 0; i < lists.length; i++) {
      var items = lists[i].querySelectorAll('.showcase-item');
      for (var j = 0; j < items.length; j++) {
        items[j].style.removeProperty('display');
        items[j].style.removeProperty('width');
        items[j].style.removeProperty('opacity');
        items[j].style.removeProperty('visibility');
      }
    }

    if (typeof jQuery !== 'undefined' && jQuery.fn && jQuery.fn.slick) {
      jQuery('.showcase-list.slick-initialized').each(function () {
        try {
          jQuery(this).slick('setPosition');
          jQuery(this).slick('refresh');
        } catch (e) {}
      });
      jQuery('.showcase-list').not('.slick-initialized').each(function () {
        var $list = jQuery(this);
        if ($list.find('.showcase-item').length && typeof $list.slick === 'function') {
          try { $list.slick(); } catch (e) {}
        }
      });
    }

    var lazyImgs = document.querySelectorAll('.showcase img.lazy:not(.loaded)');
    for (var k = 0; k < lazyImgs.length; k++) {
      var ds = lazyImgs[k].getAttribute('data-src');
      if (ds) {
        lazyImgs[k].setAttribute('src', ds);
        lazyImgs[k].classList.add('loaded');
      }
    }

    var themeInits = ['initShowcase', 'initShowcaseCarousel', 'initShowcases', 'loadShowcase', 'showcaseSlider'];
    for (var n = 0; n < themeInits.length; n++) {
      if (typeof window[themeInits[n]] === 'function') {
        try { window[themeInits[n]](); } catch (e) {}
      }
    }
  }

  function scheduleSliderRefresh(delay) {
    clearTimeout(sliderRefreshTimer);
    sliderRefreshTimer = setTimeout(refreshThemeShowcaseSliders, delay || 200);
  }

  function onAuthStateChange() {
    clearTimeout(authChangeTimer);
    authChangeTimer = setTimeout(function () {
      initProductHoverImage();
      scheduleSliderRefresh(150);
      scheduleSliderRefresh(700);
    }, 80);
  }

  function isTouchOnly() {
    if (touchOnlyCached === null) {
      touchOnlyCached = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    }
    return touchOnlyCached;
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
    probeQueue.push({ url: url, cb: cb });
    drainProbeQueue();
  }

  function drainProbeQueue() {
    while (probeActive < PROBE_MAX && probeQueue.length) {
      (function (job) {
        probeActive++;
        var probe = new Image();
        probe.onload = function () {
          cache[job.url] = true;
          probeActive--;
          job.cb(true);
          drainProbeQueue();
        };
        probe.onerror = function () {
          cache[job.url] = false;
          probeActive--;
          job.cb(false);
          drainProbeQueue();
        };
        probe.src = job.url;
      })(probeQueue.shift());
    }
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

  function ensureImgSrc(img) {
    if (!img) return '';
    if (!img.getAttribute('src') && img.getAttribute('data-src')) {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.classList.add('loaded');
    }
    return img.getAttribute('src') || img.getAttribute('data-src') || '';
  }

  function setupMobileCarousel(link, img, hoverSrc) {
    rememberMain(img);
    ensureImgSrc(img);
    link.classList.add('has-mobile-carousel');
    link.classList.remove('is-hovering');
    link.setAttribute(PROCESSED, '1');

    if (link.querySelector('.product-mobile-carousel')) return;

    var carousel = document.createElement('div');
    carousel.className = 'product-mobile-carousel';
    carousel.setAttribute('data-mobile-carousel', '1');

    var track = document.createElement('div');
    track.className = 'product-mobile-carousel__track';

    var slideMain = document.createElement('div');
    slideMain.className = 'product-mobile-carousel__slide';
    slideMain.appendChild(img);

    var slideAlt = document.createElement('div');
    slideAlt.className = 'product-mobile-carousel__slide';
    var altImg = document.createElement('img');
    altImg.className = 'product-mobile-carousel__img';
    altImg.alt = img.alt || '';
    altImg.src = hoverSrc;
    slideAlt.appendChild(altImg);

    track.appendChild(slideMain);
    track.appendChild(slideAlt);
    carousel.appendChild(track);

    var dots = document.createElement('div');
    dots.className = 'product-mobile-carousel__dots';
    dots.setAttribute('aria-hidden', 'true');
    dots.innerHTML = '<span class="is-active"></span><span></span>';
    carousel.appendChild(dots);

    var hint = document.createElement('span');
    hint.className = 'product-mobile-carousel__hint';
    hint.textContent = 'Deslize →';
    carousel.appendChild(hint);

    link.appendChild(carousel);
    bindMobileSwipe(link, track, dots, hint);
    if (hint) {
      setTimeout(function () {
        hint.style.opacity = '0';
        setTimeout(function () {
          if (hint.parentNode) hint.parentNode.removeChild(hint);
        }, 650);
      }, 3500);
    }
  }

  function bindMobileSwipe(link, track, dots, hint) {
    var index = 0;
    var startX = 0;
    var startY = 0;
    var deltaX = 0;
    var swiping = false;

    function goTo(nextIndex) {
      index = nextIndex < 0 ? 0 : (nextIndex > 1 ? 1 : nextIndex);
      track.style.transform = 'translateX(-' + (index * 50) + '%)';
      var dotEls = dots.querySelectorAll('span');
      for (var i = 0; i < dotEls.length; i++) {
        if (i === index) dotEls[i].classList.add('is-active');
        else dotEls[i].classList.remove('is-active');
      }
      if (hint && hint.parentNode) hint.parentNode.removeChild(hint);
    }

    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      deltaX = 0;
      swiping = false;
    }, { passive: true });

    track.addEventListener('touchmove', function (e) {
      var dx = e.touches[0].clientX - startX;
      var dy = e.touches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
        swiping = true;
        deltaX = dx;
      }
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      if (!swiping) return;
      if (deltaX < -35) goTo(index + 1);
      else if (deltaX > 35) goTo(index - 1);
      link.setAttribute('data-swiped', '1');
      setTimeout(function () {
        link.removeAttribute('data-swiped');
      }, 400);
      e.preventDefault();
      e.stopPropagation();
    }, { passive: false });

    link.addEventListener('click', function (e) {
      if (link.getAttribute('data-swiped') === '1') {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    dots.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var spans = dots.querySelectorAll('span');
      for (var i = 0; i < spans.length; i++) {
        if (e.target === spans[i]) goTo(i);
      }
    });
  }

  function bindLink(link) {
    if (link.getAttribute(PROCESSED) === '1') return;
    var img = normalizeImg(link);
    if (!img) return;
    var hoverSrc = getHoverSrc(img);
    if (!hoverSrc) return;

    if (isTouchOnly()) {
      link.classList.remove('is-hovering');
      urlOk(hoverSrc, function (ok) {
        if (ok) setupMobileCarousel(link, img, hoverSrc);
        else link.setAttribute(PROCESSED, '1');
      });
      return;
    }

    function attach() {
      if (!link.isConnected || link.getAttribute(PROCESSED) === '1') return;
      setupDualImage(link, img, hoverSrc);
      link.setAttribute(PROCESSED, '1');

      link.addEventListener('mouseenter', function () {
        showHoverImage(link, hoverSrc);
      });
      link.addEventListener('mouseleave', function () {
        hideHoverImage(link);
      });
    }

    if (img.getAttribute('data-hover-src')) {
      attach();
      return;
    }
    urlOk(hoverSrc, function (ok) {
      if (ok) attach();
    });
  }

  function queueBindLink(link) {
    if (link.getAttribute(PROCESSED) === '1') return;
    if (isTouchOnly() && typeof IntersectionObserver !== 'undefined') {
      if (!cardObserver) {
        cardObserver = new IntersectionObserver(function (entries) {
          for (var i = 0; i < entries.length; i++) {
            if (!entries[i].isIntersecting) continue;
            cardObserver.unobserve(entries[i].target);
            bindLink(entries[i].target);
          }
        }, { rootMargin: '120px 0px', threshold: 0.01 });
      }
      cardObserver.observe(link);
      return;
    }
    bindLink(link);
  }

  function scan(root) {
    var links = (root || document).querySelectorAll('.showcase-product_link__image:not([' + PROCESSED + '="1"])');
    for (var i = 0; i < links.length; i++) {
      if (links[i].closest('.mega-menu-ar')) continue;
      queueBindLink(links[i]);
    }
  }

  function resetTouchHoverStates() {
    if (!isTouchOnly()) return;
    var stuck = document.querySelectorAll('.showcase-product_link__image.is-hovering');
    for (var i = 0; i < stuck.length; i++) {
      stuck[i].classList.remove('is-hovering');
    }
  }

  function formatMoneyBRL(num) {
    if (isNaN(num)) return '';
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function fixCardInstallments(root) {
    var nodes = (root || document).querySelectorAll('.showcase-prices_installment[data-plot-base][data-plot-count]:not([' + PLOT_FIXED + '="1"])');
    for (var i = 0; i < nodes.length; i++) {
      var base = parseFloat(nodes[i].getAttribute('data-plot-base'));
      var count = parseInt(nodes[i].getAttribute('data-plot-count'), 10);
      if (!base || !count || count < 2) continue;
      var each = Math.round((base / count) * 100) / 100;
      var valEl = nodes[i].querySelector('.showcase-prices_installment-value');
      if (valEl) valEl.textContent = formatMoneyBRL(each);
      nodes[i].setAttribute(PLOT_FIXED, '1');
    }
  }

  function nodeHasShowcase(node) {
    if (!node || node.nodeType !== 1) return false;
    if (node.classList && (node.classList.contains('showcase-product') || node.classList.contains('showcase-item') || node.classList.contains('showcase-prices_installment'))) {
      return true;
    }
    return !!(node.querySelector && node.querySelector('.showcase-product_link__image, .showcase-prices_installment'));
  }

  function scheduleMutationWork(mutations) {
    if (mutationRaf) return;
    var roots = [];
    for (var m = 0; m < mutations.length; m++) {
      var added = mutations[m].addedNodes;
      for (var a = 0; a < added.length; a++) {
        if (nodeHasShowcase(added[a])) roots.push(added[a]);
      }
    }
    if (!roots.length) return;
    mutationRaf = requestAnimationFrame(function () {
      mutationRaf = 0;
      for (var i = 0; i < roots.length; i++) {
        scan(roots[i]);
        fixCardInstallments(roots[i]);
      }
      scheduleSliderRefresh(200);
    });
  }

  function initProductHoverImage() {
    resetTouchHoverStates();
    scan(document);
    fixCardInstallments(document);

    if (!hoverInitDone) {
      hoverInitDone = true;
      cleanupDuplicateSpecBars();
      if (typeof MutationObserver !== 'undefined' && document.body && !document.body._productHoverObserver) {
        document.body._productHoverObserver = new MutationObserver(scheduleMutationWork);
        document.body._productHoverObserver.observe(document.body, { childList: true, subtree: true });
      }
    }

    scheduleSliderRefresh(250);
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
  window.refreshThemeShowcaseSliders = refreshThemeShowcaseSliders;
  window.onAuthStateChange = onAuthStateChange;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductHoverImage);
  } else {
    initProductHoverImage();
  }

  window.addEventListener('change-customer-login', onAuthStateChange);
  window.addEventListener('check-login-logged', onAuthStateChange);

  document.addEventListener('touchend', resetTouchHoverStates, { passive: true });
  document.addEventListener('touchcancel', resetTouchHoverStates, { passive: true });
})();
