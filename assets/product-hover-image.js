/**
 * ARQUIVO: assets/product-hover-image.js
 * Hover de imagem estilo Nike em todos os cards .showcase-product (site inteiro).
 * Mobile: toque na imagem mostra a 2ª foto; segundo toque abre o produto.
 */
(function () {
  'use strict';

  var HOVER_CLASS = 'has-hover-image';
  var ACTIVE_CLASS = 'is-product-hover-active';
  var PROCESSED = 'data-hover-ready';
  var cache = {};

  function isTouchDevice() {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  }

  function imgSrc(img) {
    return img.getAttribute('src') || img.getAttribute('data-src') || img.getAttribute('data-hover-src') || '';
  }

  function loadAltImage(altImg) {
    if (!altImg || altImg.getAttribute('data-hover-loaded') === '1') return;
    var src = altImg.getAttribute('data-hover-src') || altImg.getAttribute('data-src') || '';
    if (!src) return;
    altImg.setAttribute('src', src);
    altImg.setAttribute('data-hover-loaded', '1');
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

  function urlExists(url, cb) {
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

  function buildHoverWrap(mainImg, altSrc) {
    var wrap = document.createElement('span');
    wrap.className = 'product-hover-wrap';

    var main = mainImg.cloneNode(true);
    main.classList.add('product-hover-img', 'product-hover-img--main');
    wrap.appendChild(main);

    var alt = document.createElement('img');
    alt.className = 'product-hover-img product-hover-img--alt';
    alt.alt = mainImg.alt || '';
    alt.setAttribute('data-hover-src', altSrc);
    alt.setAttribute('aria-hidden', 'true');
    wrap.appendChild(alt);

    return wrap;
  }

  function bindHover(card, link) {
    if (link.getAttribute('data-hover-bound') === '1') return;
    link.setAttribute('data-hover-bound', '1');

    var altImg = link.querySelector('.product-hover-img--alt');
    if (!altImg) return;

    function activate() {
      loadAltImage(altImg);
      card.classList.add(ACTIVE_CLASS);
    }

    function deactivate() {
      card.classList.remove(ACTIVE_CLASS);
    }

    card.addEventListener('mouseenter', function () {
      if (isTouchDevice()) return;
      activate();
    });

    card.addEventListener('mouseleave', function () {
      if (isTouchDevice()) return;
      deactivate();
    });

    link.addEventListener(
      'touchend',
      function (e) {
        if (!isTouchDevice()) return;
        if (!card.classList.contains(HOVER_CLASS)) return;
        if (!card.classList.contains(ACTIVE_CLASS)) {
          e.preventDefault();
          activate();
        }
      },
      { passive: false }
    );
  }

  function enhanceCard(card) {
    if (card.getAttribute(PROCESSED) === '1') return;
    if (card.closest('.mega-menu-ar')) return;

    var link = card.querySelector('.showcase-product_link__image');
    if (!link) return;

    var existingAlt = link.querySelector('.product-hover-img--alt');
    if (existingAlt) {
      if (existingAlt.classList.contains('lazy')) {
        existingAlt.classList.remove('lazy');
      }
      if (!existingAlt.getAttribute('data-hover-src') && existingAlt.getAttribute('data-src')) {
        existingAlt.setAttribute('data-hover-src', existingAlt.getAttribute('data-src'));
        existingAlt.removeAttribute('data-src');
        existingAlt.removeAttribute('src');
      }
      card.classList.add(HOVER_CLASS);
      card.setAttribute(PROCESSED, '1');
      bindHover(card, link);
      return;
    }

    var mainImg = link.querySelector('img:not(.product-hover-img--alt)');
    if (!mainImg) return;

    if (link.querySelector('.product-hover-wrap')) {
      card.setAttribute(PROCESSED, '1');
      return;
    }

    var mainUrl = imgSrc(mainImg);
    var hoverUrl = guessHoverUrl(mainUrl);
    if (!hoverUrl || hoverUrl === mainUrl) {
      card.setAttribute(PROCESSED, '1');
      return;
    }

    urlExists(hoverUrl, function (ok) {
      if (!ok || !card.isConnected) return;

      var wrap = buildHoverWrap(mainImg, hoverUrl);
      mainImg.parentNode.replaceChild(wrap, mainImg);
      card.classList.add(HOVER_CLASS);
      card.setAttribute(PROCESSED, '1');
      bindHover(card, link);
    });
  }

  function scan(root) {
    var scope = root || document;
    var cards = scope.querySelectorAll('.showcase-product.card:not([' + PROCESSED + '="1"])');
    for (var i = 0; i < cards.length; i++) {
      enhanceCard(cards[i]);
    }
  }

  function init() {
    scan(document);

    if (typeof MutationObserver !== 'undefined') {
      var observer = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var nodes = mutations[i].addedNodes;
          for (var j = 0; j < nodes.length; j++) {
            var node = nodes[j];
            if (node.nodeType !== 1) continue;
            if (node.classList && node.classList.contains('showcase-product')) {
              enhanceCard(node);
            } else if (node.querySelectorAll) {
              scan(node);
            }
          }
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.initProductHoverImage = init;
})();
