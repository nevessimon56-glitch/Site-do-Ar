/**
 * ARQUIVO: assets/product-hover-image.js
 * Troca o src da imagem no hover — funciona com lazy load do tema WDNA.
 */
(function () {
  'use strict';

  var PROCESSED = 'data-hover-swap-ready';
  var cache = {};

  function isTouchOnly() {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  }

  function currentMainSrc(img) {
    if (img.getAttribute('data-main-src')) {
      return img.getAttribute('data-main-src');
    }
    var src = img.getAttribute('src') || '';
    if (src && src.indexOf('data:') !== 0) {
      return src;
    }
    return img.getAttribute('data-src') || '';
  }

  function guessHoverUrl(mainUrl) {
    if (!mainUrl) return '';
    if (/-0-\d+\.webp/i.test(mainUrl)) {
      return mainUrl.replace(/-0-(\d+\.webp)/i, '-1-$1');
    }
    if (/-0\.webp/i.test(mainUrl)) {
      return mainUrl.replace(/-0\.webp/i, '-1.webp');
    }
    return '';
  }

  function urlOk(url, cb) {
    if (!url) {
      cb(false);
      return;
    }
    if (cache[url] === true) {
      cb(true);
      return;
    }
    if (cache[url] === false) {
      cb(false);
      return;
    }
    var probe = new Image();
    probe.onload = function () {
      cache[url] = true;
      cb(true);
    };
    probe.onerror = function () {
      cache[url] = false;
      cb(false);
    };
    probe.src = url;
  }

  function normalizeImg(link) {
    var alt = link.querySelector('.product-hover-img--alt, img[data-hover-src]:not(.product-hover-swap)');
    var img = link.querySelector('.product-hover-swap, .product-hover-img--main, img');

    if (!img) return null;

    if (alt && alt !== img) {
      var hoverFromAlt = alt.getAttribute('data-hover-src') || alt.getAttribute('data-src') || alt.getAttribute('src');
      if (hoverFromAlt && !img.getAttribute('data-hover-src')) {
        img.setAttribute('data-hover-src', hoverFromAlt);
      }
      alt.parentNode.removeChild(alt);
    }

    var wrap = link.querySelector('.product-hover-wrap');
    if (wrap && wrap.parentNode === link) {
      while (wrap.firstChild) {
        link.insertBefore(wrap.firstChild, wrap);
      }
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

  function showHover(img) {
    var hoverSrc = getHoverSrc(img);
    if (!hoverSrc) return;

    rememberMain(img);
    img.setAttribute('src', hoverSrc);
    if (img.classList.contains('lazy')) {
      img.classList.add('loaded');
    }
  }

  function showMain(img) {
    var mainSrc = img.getAttribute('data-main-src') || img.getAttribute('data-src');
    if (!mainSrc) return;
    img.setAttribute('src', mainSrc);
  }

  function bindLink(link) {
    if (link.getAttribute(PROCESSED) === '1') return;

    var img = normalizeImg(link);
    if (!img) return;

    var hoverSrc = getHoverSrc(img);
    if (!hoverSrc) return;

    function attach() {
      if (!link.isConnected) return;
      if (link.getAttribute(PROCESSED) === '1') return;

      if (!img.getAttribute('data-hover-src')) {
        img.setAttribute('data-hover-src', hoverSrc);
      }

      rememberMain(img);
      link.setAttribute(PROCESSED, '1');
      var showingHover = false;

      link.addEventListener('mouseenter', function () {
        if (isTouchOnly()) return;
        link.classList.add('is-hovering');
        showHover(img);
        showingHover = true;
      });

      link.addEventListener('mouseleave', function () {
        if (isTouchOnly()) return;
        link.classList.remove('is-hovering');
        showMain(img);
        showingHover = false;
      });

      link.addEventListener(
        'touchend',
        function (e) {
          if (!isTouchOnly()) return;
          if (!showingHover) {
            e.preventDefault();
            showHover(img);
            showingHover = true;
            link.classList.add('is-hovering');
          }
        },
        { passive: false }
      );
    }

    if (img.getAttribute('data-hover-src')) {
      attach();
      return;
    }

    urlOk(hoverSrc, function (ok) {
      if (!ok) return;
      attach();
    });
  }

  function scan(root) {
    var scope = root || document;
    var links = scope.querySelectorAll('.showcase-product_link__image:not([' + PROCESSED + '="1"])');
    for (var i = 0; i < links.length; i++) {
      if (links[i].closest('.mega-menu-ar')) continue;
      bindLink(links[i]);
    }
  }

  function init() {
    scan(document);

    if (typeof MutationObserver !== 'undefined') {
      var observer = new MutationObserver(function () {
        scan(document);
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', init);

  window.initProductHoverImage = init;
})();
