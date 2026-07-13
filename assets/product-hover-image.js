/**
 * ARQUIVO: assets/product-hover-image.js
 * Hover de imagem estilo Nike em todos os cards .showcase-product (site inteiro).
 * Mobile: toque na imagem alterna entre foto 1 e 2.
 */
(function () {
  'use strict';

  var HOVER_CLASS = 'has-hover-image';
  var TOUCH_CLASS = 'is-img-hover';
  var PROCESSED = 'data-hover-ready';
  var cache = {};

  function imgSrc(img) {
    return img.getAttribute('src') || img.getAttribute('data-src') || '';
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
    alt.className = 'lazy product-hover-img product-hover-img--alt';
    alt.alt = mainImg.alt || '';
    alt.loading = 'lazy';
    alt.setAttribute('data-src', altSrc);
    if (mainImg.src && mainImg.src.indexOf('data:') !== 0) {
      alt.src = altSrc;
    }
    wrap.appendChild(alt);

    return wrap;
  }

  function enhanceCard(card) {
    if (card.getAttribute(PROCESSED) === '1') return;
    if (card.closest('.mega-menu-ar')) return;

    var link = card.querySelector('.showcase-product_link__image');
    if (!link) return;

    var existingAlt = link.querySelector('.product-hover-img--alt');
    if (existingAlt) {
      card.classList.add(HOVER_CLASS);
      card.setAttribute(PROCESSED, '1');
      bindTouch(card, link);
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
      bindTouch(card, link);
    });
  }

  function bindTouch(card, link) {
    if (link.getAttribute('data-hover-touch') === '1') return;
    link.setAttribute('data-hover-touch', '1');

    link.addEventListener(
      'touchend',
      function (e) {
        if (!window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
        if (!card.classList.contains(HOVER_CLASS)) return;
        if (!card.classList.contains(TOUCH_CLASS)) {
          e.preventDefault();
          card.classList.add(TOUCH_CLASS);
        }
      },
      { passive: false }
    );
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
