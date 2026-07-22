/**
 * ARQUIVO: assets/mega-menu.js
 * VERSAO: 2026-07-15-js-mobile-nav-v3
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
  var lastSliderRefresh = 0;
  var SLIDER_REFRESH_MIN_MS = 4000;
  var WIFI_FIXED = 'data-wifi-fixed';
  var showcaseObserver = null;
  var showcaseRootsSeen = null;
  var bindObserverRaf = 0;

  function refreshThemeShowcaseSliders(force) {
    var now = Date.now();
    if (!force && now - lastSliderRefresh < SLIDER_REFRESH_MIN_MS) return;
    lastSliderRefresh = now;

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
        } catch (e) {}
      });
      if (force) {
        jQuery('.showcase-list.slick-initialized').each(function () {
          try {
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
    }
  }

  function scheduleSliderRefresh(delay, force) {
    clearTimeout(sliderRefreshTimer);
    sliderRefreshTimer = setTimeout(function () {
      refreshThemeShowcaseSliders(!!force);
    }, delay || 300);
  }

  function refreshShowcaseCards(root) {
    var scope = root || document;
    scan(scope);
    fixCardInstallments(scope);
    fixWrongWifiTags(scope);
  }

  function onAuthStateChange() {
    clearTimeout(authChangeTimer);
    authChangeTimer = setTimeout(function () {
      refreshShowcaseCards(document);
      scheduleSliderRefresh(500, true);
    }, 120);
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
    if (typeof IntersectionObserver !== 'undefined') {
      if (!cardObserver) {
        cardObserver = new IntersectionObserver(function (entries) {
          for (var i = 0; i < entries.length; i++) {
            if (!entries[i].isIntersecting) continue;
            cardObserver.unobserve(entries[i].target);
            bindLink(entries[i].target);
          }
        }, { rootMargin: '160px 0px', threshold: 0.01 });
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

  function getShowcaseCards(root) {
    if (!root) return document.querySelectorAll('.showcase-product');
    if (root.nodeType === 1 && root.classList && root.classList.contains('showcase-product')) return [root];
    if (root.querySelectorAll) return root.querySelectorAll('.showcase-product');
    return [];
  }

  function fixWrongWifiTags(root) {
    var cards = getShowcaseCards(root);
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (card.getAttribute(WIFI_FIXED) === '1') continue;

      var titleEl = card.querySelector('.showcase-product_name, .showcase-product_title, .product-name, h2, h3');
      var title = '';
      if (titleEl) {
        title = (titleEl.getAttribute('title') || titleEl.textContent || '').toLowerCase();
      }
      if (!title) continue;

      var hasWifiInTitle = /\bwi-?fi\b/.test(title);
      var isMechanical = /\bmec[aâ]nico\b/.test(title);
      var isWindow = /\bjanela\b/.test(title);
      if (isMechanical || (isWindow && !hasWifiInTitle)) {
        var wifiTags = card.querySelectorAll('.showcase-spec-bar__tag--wifi');
        for (var j = 0; j < wifiTags.length; j++) {
          if (wifiTags[j].parentNode) wifiTags[j].parentNode.removeChild(wifiTags[j]);
        }
      }
      card.setAttribute(WIFI_FIXED, '1');
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
        refreshShowcaseCards(roots[i]);
      }
    });
  }

  function findShowcaseObserveTargets() {
    return document.querySelectorAll('.showcase-list, .showcase-section, section.showcase, .showcase');
  }

  function bindShowcaseObserver() {
    if (typeof MutationObserver === 'undefined') return;
    if (!showcaseObserver) {
      showcaseRootsSeen = new WeakSet();
      showcaseObserver = new MutationObserver(scheduleMutationWork);
    }
    var targets = findShowcaseObserveTargets();
    for (var i = 0; i < targets.length; i++) {
      if (showcaseRootsSeen.has(targets[i])) continue;
      showcaseRootsSeen.add(targets[i]);
      showcaseObserver.observe(targets[i], { childList: true, subtree: true });
    }
  }

  function scheduleBindShowcaseObserver() {
    if (bindObserverRaf) return;
    bindObserverRaf = requestAnimationFrame(function () {
      bindObserverRaf = 0;
      bindShowcaseObserver();
    });
  }

  function initProductHoverImage() {
    resetTouchHoverStates();
    refreshShowcaseCards(document);

    if (!hoverInitDone) {
      hoverInitDone = true;
      cleanupDuplicateSpecBars();
      bindShowcaseObserver();
      if (typeof MutationObserver !== 'undefined' && document.body && !document.body._showcaseRootWatcher) {
        document.body._showcaseRootWatcher = new MutationObserver(scheduleBindShowcaseObserver);
        document.body._showcaseRootWatcher.observe(document.body, { childList: true, subtree: false });
      }
    }
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
  window.fixWrongWifiTags = fixWrongWifiTags;

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

/**
 * Evita teclado no mobile ao carregar páginas (autofocus em painéis ocultos de login/senha).
 */
(function () {
  'use strict';

  var PANEL_SEL = '.sidenav-overlay, .sidenav-password, .sidenav-forgot-password';
  var isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  function isPanelOpen(panel) {
    if (!panel) return false;
    if (panel.classList && !panel.classList.contains('open')) return false;
    var style = window.getComputedStyle(panel);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    if (parseFloat(style.opacity || '1') === 0) return false;
    return true;
  }

  function stripHiddenAutofocus() {
    var panels = document.querySelectorAll(PANEL_SEL);
    for (var i = 0; i < panels.length; i++) {
      if (isPanelOpen(panels[i])) continue;
      var inputs = panels[i].querySelectorAll('[autofocus]');
      for (var j = 0; j < inputs.length; j++) {
        inputs[j].removeAttribute('autofocus');
        inputs[j].setAttribute('data-autofocus-on-open', '1');
      }
    }
    blurHiddenField();
  }

  function blurHiddenField() {
    var active = document.activeElement;
    if (!active || !active.closest || !active.matches) return;
    if (!active.matches('input, textarea, select')) return;
    var panel = active.closest(PANEL_SEL);
    if (panel && !isPanelOpen(panel)) {
      try { active.blur(); } catch (e) {}
    }
  }

  function focusFirstField(panel) {
    if (!panel || !isPanelOpen(panel)) return;
    if (isTouch) return;
    var input = panel.querySelector('[data-autofocus-on-open="1"], input[type="email"], input[type="password"]');
    if (!input) return;
    setTimeout(function () {
      if (!isPanelOpen(panel)) return;
      try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); }
    }, 100);
  }

  function patchOverlayOpeners() {
    if (typeof window.openSideNavOverlay === 'function' && !window.openSideNavOverlay._keyboardGuard) {
      var originalOpen = window.openSideNavOverlay;
      window.openSideNavOverlay = function (selector) {
        var result = originalOpen.apply(this, arguments);
        if (typeof selector === 'string') {
          setTimeout(function () {
            focusFirstField(document.querySelector(selector));
          }, 150);
        }
        return result;
      };
      window.openSideNavOverlay._keyboardGuard = true;
    }

    var openers = [
      ['openUserPassword', '.sidenav-password'],
      ['openForgotPassword', '.sidenav-forgot-password']
    ];
    for (var i = 0; i < openers.length; i++) {
      (function (name, selector) {
        if (typeof window[name] !== 'function' || window[name]._keyboardGuard) return;
        var original = window[name];
        window[name] = function () {
          var result = original.apply(this, arguments);
          setTimeout(function () {
            focusFirstField(document.querySelector(selector));
          }, 150);
          return result;
        };
        window[name]._keyboardGuard = true;
      })(openers[i][0], openers[i][1]);
    }
  }

  function initKeyboardGuard() {
    if (typeof window.__stripHiddenAutofocus === 'function') {
      window.__stripHiddenAutofocus();
    }
    stripHiddenAutofocus();
    patchOverlayOpeners();

    if (typeof MutationObserver !== 'undefined' && !document.body._keyboardGuardObserver) {
      var guardRaf = 0;
      document.body._keyboardGuardObserver = new MutationObserver(function () {
        if (guardRaf) return;
        guardRaf = requestAnimationFrame(function () {
          guardRaf = 0;
          stripHiddenAutofocus();
        });
      });
      var panels = document.querySelectorAll(PANEL_SEL);
      for (var i = 0; i < panels.length; i++) {
        document.body._keyboardGuardObserver.observe(panels[i], { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKeyboardGuard);
  } else {
    initKeyboardGuard();
  }
  window.addEventListener('load', stripHiddenAutofocus);
  document.addEventListener('focusin', function (e) {
    if (!e.target || !e.target.closest) return;
    var panel = e.target.closest(PANEL_SEL);
    if (panel && !isPanelOpen(panel)) {
      e.target.blur();
    }
  }, true);
})();

/**
 * Barra de atalhos mobile — chips discretos (sem botão grande)
 */
(function () {
  'use strict';

  var MOBILE_MQ = '(max-width: 991px)';
  var DISCOVER_CHIPS = [
    { href: '/Todos-os-Produtos', label: 'Todos', match: '/todos-os-produtos' },
    { href: '/split-inverter', label: 'Split Inverter', match: '/split-inverter' },
    { href: '/Piso-Teto', label: 'Piso Teto', match: '/piso-teto' },
    { href: '/janela', label: 'Janela', match: '/janela' },
    { href: '/pagina/diagnostico-360', label: 'Qual escolher?', match: '/diagnostico' }
  ];

  function isMobile() {
    return window.matchMedia(MOBILE_MQ).matches;
  }

  function normalizePath(path) {
    return (path || '').toLowerCase().replace(/\/+$/, '') || '/';
  }

  function isCheckoutPage() {
    var p = normalizePath(window.location.pathname);
    return p.indexOf('/checkout') === 0;
  }

  function isHomePage() {
    var p = normalizePath(window.location.pathname);
    return p === '/';
  }

  function isCatalogPage() {
    var p = normalizePath(window.location.pathname);
    return p === '/todos-os-produtos' || p.indexOf('/busca') === 0 || !!document.querySelector('main.search-main');
  }

  function pathMatches(href) {
    var p = normalizePath(window.location.pathname);
    var target = normalizePath(href);
    if (target === '/todos-os-produtos') {
      return p === '/todos-os-produtos';
    }
    return p.indexOf(target) === 0;
  }

  function mountDiscoverBar() {
    if (!isMobile() || isCheckoutPage() || isHomePage() || isCatalogPage()) return;
    if (document.querySelector('.mobile-discover-bar')) return;

    var header = document.querySelector('.header, header.header, .header-main');
    var nav = document.createElement('nav');
    nav.className = 'mobile-discover-bar';
    nav.setAttribute('aria-label', 'Navegação rápida');

    var chips = document.createElement('div');
    chips.className = 'mobile-discover-bar__chips';
    for (var i = 0; i < DISCOVER_CHIPS.length; i++) {
      var chip = document.createElement('a');
      chip.className = 'mobile-discover-bar__chip';
      chip.href = DISCOVER_CHIPS[i].href;
      chip.title = DISCOVER_CHIPS[i].label;
      chip.textContent = DISCOVER_CHIPS[i].label;
      if (pathMatches(DISCOVER_CHIPS[i].match || DISCOVER_CHIPS[i].href)) {
        chip.classList.add('is-active');
      }
      chips.appendChild(chip);
    }
    nav.appendChild(chips);

    if (header && header.parentNode) {
      header.parentNode.insertBefore(nav, header.nextSibling);
    } else {
      var main = document.querySelector('main');
      if (!main) return;
      main.insertBefore(nav, main.firstChild);
    }
  }

  function initMobileDiscoverNav() {
    if (!isMobile()) return;
    mountDiscoverBar();
  }

  window.initMobileDiscoverNav = initMobileDiscoverNav;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileDiscoverNav);
  } else {
    initMobileDiscoverNav();
  }
  window.addEventListener('load', initMobileDiscoverNav);
})();

/**
 * Catálogo mobile — grade 2 colunas em vez de lista horizontal
 */
(function () {
  'use strict';

  var MOBILE_MQ = '(max-width: 991px)';
  var GRID_CLASS = 'showcase-search_grid--mobile-2col';

  function isMobile() {
    return window.matchMedia(MOBILE_MQ).matches;
  }

  function isCatalogPage() {
    var p = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '') || '/';
    return p === '/todos-os-produtos' || p.indexOf('/busca') === 0 || !!document.querySelector('main.search-main');
  }

  function applyCatalogGrid(root) {
    var section = root || document.querySelector('.showcase-search.showcase-search_list');
    if (!section) return;

    section.classList.remove('showcase-search_list');
    section.classList.add('showcase-search_grid', GRID_CLASS);
    section.setAttribute('data-mobile-grid', '2col');
  }

  function initCatalogMobileGrid() {
    if (!isMobile() || !isCatalogPage()) return;
    applyCatalogGrid();
  }

  window.initCatalogMobileGrid = initCatalogMobileGrid;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCatalogMobileGrid);
  } else {
    initCatalogMobileGrid();
  }
  window.addEventListener('load', initCatalogMobileGrid);
})();

/**
 * Dock inferior mobile — padrão Mercado Livre / Shopee (catálogo sempre a 1 toque)
 */
(function () {
  'use strict';

  var MOBILE_MQ = '(max-width: 991px)';
  var DOCK_CATEGORIES = [
    { href: '/split-inverter', label: 'Split Inverter' },
    { href: '/Piso-Teto', label: 'Piso Teto' },
    { href: '/janela', label: 'Janela' },
    { href: '/frio', label: 'Só Frio' },
    { href: '/quente-frio', label: 'Quente/Frio' },
    { href: '/pagina/diagnostico-360', label: 'Qual escolher?' }
  ];

  var ICON_HOME =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
  var ICON_GRID =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" fill="currentColor"/></svg>';
  var ICON_FILTER =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16l-6.2 7.2V18l-3.6 2v-6.8L4 6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
  var ICON_MENU =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M5 12h14M5 17h10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  function isMobile() {
    return window.matchMedia(MOBILE_MQ).matches;
  }

  function normalizePath(path) {
    return (path || '').toLowerCase().replace(/\/+$/, '') || '/';
  }

  function isCheckoutPage() {
    return normalizePath(window.location.pathname).indexOf('/checkout') === 0;
  }

  function isCatalogPage() {
    var p = normalizePath(window.location.pathname);
    if (p === '/todos-os-produtos') return true;
    if (p.indexOf('/busca') === 0) return true;
    if (document.querySelector('main.search-main')) return true;
    return false;
  }

  function isCategoryPage() {
    var p = normalizePath(window.location.pathname);
    for (var i = 0; i < DOCK_CATEGORIES.length; i++) {
      var href = normalizePath(DOCK_CATEGORIES[i].href);
      if (href === '/pagina/diagnostico-360') continue;
      if (p === href || p.indexOf(href + '/') === 0) return true;
    }
    return false;
  }

  function isProductPage() {
    var p = normalizePath(window.location.pathname);
    if (document.querySelector('main.product-main, .product-main, .product-content')) return true;
    return /-p\d+$/.test(p) || p.indexOf('/produto') === 0;
  }

  function getDockActiveTab() {
    if (isHomePage()) return 'home';
    if (isCategoryPage()) return 'categories';
    if (isCatalogPage() || isProductPage()) return 'catalog';
    return '';
  }

  function isTodosProdutosPage() {
    return normalizePath(window.location.pathname) === '/todos-os-produtos';
  }

  function isHomePage() {
    return normalizePath(window.location.pathname) === '/';
  }

  function openCatalogFilters() {
    var toolbar = document.querySelector('.search-options_mobile');
    if (!toolbar) return;
    var filterToggle = toolbar.querySelector('.search-options-header_item');
    if (filterToggle) filterToggle.click();
    var body = toolbar.querySelector('.search-options-body_item');
    if (body && !body.classList.contains('open') && filterToggle) {
      filterToggle.click();
    }
    try {
      toolbar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) {
      toolbar.scrollIntoView(true);
    }
  }

  function createDockButton(opts) {
    var el = opts.tag === 'button' ? document.createElement('button') : document.createElement('a');
    el.className = 'mobile-catalog-dock__btn' + (opts.modifier ? ' ' + opts.modifier : '');
    if (opts.tab) el.setAttribute('data-dock-tab', opts.tab);
    if (opts.active) {
      el.classList.add('is-active');
      el.setAttribute('aria-current', 'page');
    }
    if (el.tagName === 'A') {
      el.href = opts.href || '#';
    } else {
      el.type = 'button';
    }
    el.setAttribute('aria-label', opts.label);
    el.innerHTML =
      '<span class="mobile-catalog-dock__icon">' + opts.icon + '</span>' +
      '<span class="mobile-catalog-dock__label">' + opts.label + '</span>';
    if (opts.onClick) {
      el.addEventListener('click', opts.onClick);
    }
    return el;
  }

  function mountCategorySheet(dock) {
    var sheet = document.createElement('div');
    sheet.className = 'mobile-catalog-dock__sheet';
    sheet.setAttribute('hidden', 'hidden');

    var backdrop = document.createElement('button');
    backdrop.type = 'button';
    backdrop.className = 'mobile-catalog-dock__sheet-backdrop';
    backdrop.setAttribute('aria-label', 'Fechar categorias');

    var panel = document.createElement('div');
    panel.className = 'mobile-catalog-dock__sheet-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Categorias');

    var title = document.createElement('p');
    title.className = 'mobile-catalog-dock__sheet-title';
    title.textContent = 'Escolha uma categoria';
    panel.appendChild(title);

    var list = document.createElement('div');
    list.className = 'mobile-catalog-dock__sheet-list';
    for (var i = 0; i < DOCK_CATEGORIES.length; i++) {
      var link = document.createElement('a');
      link.className = 'mobile-catalog-dock__sheet-link';
      link.href = DOCK_CATEGORIES[i].href;
      link.textContent = DOCK_CATEGORIES[i].label;
      list.appendChild(link);
    }
    panel.appendChild(list);

    function closeSheet() {
      sheet.setAttribute('hidden', 'hidden');
      dock.classList.remove('is-sheet-open');
    }

    function openSheet() {
      sheet.removeAttribute('hidden');
      dock.classList.add('is-sheet-open');
    }

    backdrop.addEventListener('click', closeSheet);
    sheet.appendChild(backdrop);
    sheet.appendChild(panel);
    dock.appendChild(sheet);

    return { open: openSheet, close: closeSheet };
  }

  function mountCatalogDock() {
    if (!isMobile() || isCheckoutPage() || document.querySelector('.mobile-catalog-dock')) return;

    var activeTab = getDockActiveTab();
    var dock = document.createElement('nav');
    dock.className = 'mobile-catalog-dock';
    dock.setAttribute('aria-label', 'Navegação rápida');

    var inner = document.createElement('div');
    inner.className = 'mobile-catalog-dock__inner';

    inner.appendChild(
      createDockButton({
        tag: 'a',
        href: '/',
        label: 'Início',
        icon: ICON_HOME,
        tab: 'home',
        active: activeTab === 'home'
      })
    );

    inner.appendChild(
      createDockButton({
        tag: 'a',
        href: '/Todos-os-Produtos',
        label: 'Catálogo',
        icon: ICON_GRID,
        modifier: 'mobile-catalog-dock__btn--primary',
        tab: 'catalog',
        active: activeTab === 'catalog'
      })
    );

    var sheetApi = mountCategorySheet(dock);

    if (isCatalogPage()) {
      inner.appendChild(
        createDockButton({
          tag: 'button',
          label: 'Filtros',
          icon: ICON_FILTER,
          tab: 'filters',
          active: false,
          onClick: function (e) {
            e.preventDefault();
            openCatalogFilters();
          }
        })
      );
    } else {
      inner.appendChild(
        createDockButton({
          tag: 'button',
          label: 'Categorias',
          icon: ICON_MENU,
          tab: 'categories',
          active: activeTab === 'categories',
          onClick: function (e) {
            e.preventDefault();
            sheetApi.open();
          }
        })
      );
    }

    dock.appendChild(inner);
    document.body.appendChild(dock);
    document.body.classList.add('has-mobile-catalog-dock');
  }

  function initCatalogDock() {
    if (!isMobile()) {
      var existing = document.querySelector('.mobile-catalog-dock');
      if (existing) existing.parentNode.removeChild(existing);
      document.body.classList.remove('has-mobile-catalog-dock');
      return;
    }
    mountCatalogDock();
  }

  window.initCatalogDock = initCatalogDock;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCatalogDock);
  } else {
    initCatalogDock();
  }
  window.addEventListener('load', initCatalogDock);
})();

/**
 * WDNA: /split-inverter?marcas=Midea retorna erro.
 * Redireciona para /Todos-os-Produtos?marcas=Midea em links, forms e URL direta.
 */
(function () {
  'use strict';

  var MIDEA_VALUE = 'Midea';
  var FIXED_BASE = '/Todos-os-Produtos';

  function hasMideaMarca(search) {
    if (!search) return false;
    return /(?:^|[&?])marcas=Midea(?:&|$)/i.test(search);
  }

  function fixMideaUrl(url) {
    if (!url) return url;

    var raw = String(url).trim();
    if (!raw || raw.indexOf('javascript:') === 0) return raw;

    var parsed;
    try {
      parsed = new URL(raw, window.location.origin);
    } catch (e) {
      return raw;
    }

    if (!hasMideaMarca(parsed.search)) return raw;

    var path = parsed.pathname.replace(/\/+$/, '').toLowerCase();
    if (path === '/split-inverter') {
      parsed.pathname = FIXED_BASE;
      return parsed.pathname + parsed.search + parsed.hash;
    }

    return raw;
  }

  function patchMideaLinks(root) {
    var scope = root || document;
    var links = scope.querySelectorAll('a[href*="marcas=Midea"], a[href*="marcas=midea"]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      var fixed = fixMideaUrl(href);
      if (fixed && fixed !== href) {
        links[i].setAttribute('href', fixed);
      }
    }
  }

  function fixMideaForm(form) {
    if (!form || form.getAttribute('data-midea-form-fixed') === '1') return;
    form.setAttribute('data-midea-form-fixed', '1');

    form.addEventListener('submit', function () {
      var mideaChecked = form.querySelector(
        'input[name="marcas"][value="' + MIDEA_VALUE + '"]:checked'
      );
      if (!mideaChecked) return;

      var action = form.getAttribute('action') || window.location.pathname;
      if (action.replace(/\/+$/, '').toLowerCase() === '/split-inverter') {
        form.setAttribute('action', FIXED_BASE);
      }
    });
  }

  function fixMideaForms(root) {
    var scope = root || document;
    var forms = scope.querySelectorAll('.search-filters-form');
    for (var i = 0; i < forms.length; i++) {
      fixMideaForm(forms[i]);
    }
  }

  function redirectBrokenMideaUrl() {
    var search = window.location.search;
    var path = window.location.pathname.replace(/\/+$/, '').toLowerCase();

    if (hasMideaMarca(search) && path === '/split-inverter') {
      var quickTarget = FIXED_BASE + search;
      if (!/(^|[&?])categorias=/.test(quickTarget)) {
        quickTarget += (search.indexOf('?') >= 0 ? '&' : '?') + 'categorias=todos-os-produtos';
      }
      window.location.replace(quickTarget);
      return true;
    }

    var fixed = fixMideaUrl(window.location.pathname + search + window.location.hash);
    var current = window.location.pathname + search + window.location.hash;
    if (fixed !== current) {
      window.location.replace(fixed);
      return true;
    }

    return false;
  }

  function redirectMideaErrorPage() {
    if (!hasMideaMarca(window.location.search)) return false;
    var html = document.documentElement && document.documentElement.innerHTML;
    if (!html || html.indexOf('não retornou nenhum resultado') === -1) return false;

    var target = FIXED_BASE + window.location.search;
    if (!/(^|[&?])categorias=/.test(target)) {
      target += (window.location.search.indexOf('?') >= 0 ? '&' : '?') + 'categorias=todos-os-produtos';
    }
    window.location.replace(target);
    return true;
  }

  function initMideaFilterFix() {
    if (redirectBrokenMideaUrl()) return;

    patchMideaLinks(document);
    fixMideaForms(document);

    function runErrorRedirect() {
      if (redirectMideaErrorPage()) return;
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runErrorRedirect);
    } else {
      runErrorRedirect();
    }

    document.addEventListener(
      'click',
      function (e) {
        var link = e.target.closest('a[href]');
        if (!link) return;
        var href = link.getAttribute('href');
        var fixed = fixMideaUrl(href);
        if (fixed && fixed !== href) {
          e.preventDefault();
          window.location.href = fixed;
        }
      },
      true
    );

    if (typeof MutationObserver !== 'undefined') {
      var observer = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var nodes = mutations[i].addedNodes;
          for (var j = 0; j < nodes.length; j++) {
            if (nodes[j].nodeType !== 1) continue;
            patchMideaLinks(nodes[j]);
            fixMideaForms(nodes[j]);
          }
        }
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMideaFilterFix);
  } else {
    initMideaFilterFix();
  }
})();
