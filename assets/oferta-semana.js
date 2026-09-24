/**
 * Oferta da Semana — layout curadoria PMN + overlay #sda-oferta-immersiva
 */
(function () {
  'use strict';

  var OVERLAY_HASH = 'sda-oferta-immersiva';

  function cfg() {
    return window.SDA_OFERTAS_SEMANA || {};
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function inferCategory(title) {
    var t = (title || '').toLowerCase();
    if (t.indexOf('piso') !== -1) return 'PISO-TETO';
    if (t.indexOf('janela') !== -1) return 'JANELA';
    if (t.indexOf('multi') !== -1) return 'MULTI-SPLIT';
    return 'SPLIT INVERTER';
  }

  function inferBtus(title) {
    var m = String(title || '').match(/(\d{1,3})[\.,]?\d{3}\s*btus/i);
    if (m) return m[1] + ',000';
    m = String(title || '').match(/(\d+)\s*btus/i);
    return m ? m[1] : '';
  }

  function parseDiscount(p) {
    if (p.discountLabel) return p.discountLabel;
    if (p.compareAtPrice && p.price) {
      var oldN = parseMoney(p.compareAtPrice);
      var newN = parseMoney(p.price);
      if (oldN > newN && oldN > 0) {
        var pct = Math.round(((oldN - newN) / oldN) * 100);
        if (pct > 0) return pct + '% OFF';
      }
    }
    return '';
  }

  function parseMoney(str) {
    var s = String(str || '').replace(/[^\d,]/g, '').replace(',', '.');
    var n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  }

  function parseProductsFromHtml(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var section =
      doc.querySelector('.showcase-14') ||
      (function () {
        var titles = doc.querySelectorAll('h2.showcase-title');
        var matchRe = (cfg().sectionTitleMatch || /ofertas/i);
        for (var i = 0; i < titles.length; i++) {
          if (matchRe.test(titles[i].textContent || '')) {
            return titles[i].closest('section.showcase');
          }
        }
        return null;
      })();

    if (!section) return [];

    var items = section.querySelectorAll('.showcase-item');
    var list = [];
    var seen = {};

    for (var j = 0; j < items.length; j++) {
      var item = items[j];
      var node = item.querySelector('[data-product-url]');
      if (!node) continue;
      var url = node.getAttribute('data-product-url') || '';
      if (!url || seen[url]) continue;
      seen[url] = true;

      var title = node.getAttribute('data-product-title') || '';
      var price =
        node.getAttribute('data-product-price') ||
        (item.querySelector('.showcase-price_value') &&
          item.querySelector('.showcase-price_value').textContent.trim()) ||
        '';
      var compareAt = '';
      var oldEl = item.querySelector('.showcase-price_old, .old-price, del');
      if (oldEl) compareAt = oldEl.textContent.trim();

      list.push({
        url: url,
        title: title || 'Oferta',
        image: node.getAttribute('data-product-image') || '',
        price: price,
        compareAtPrice: compareAt,
        productId: node.getAttribute('data-product-id') || ''
      });
    }
    return list;
  }

  function fetchShowcaseProducts() {
    return fetch('/', { credentials: 'same-origin', cache: 'no-store' })
      .then(function (r) {
        return r.text();
      })
      .then(parseProductsFromHtml)
      .catch(function () {
        return [];
      });
  }

  function configProducts() {
    var list = cfg().products;
    if (!list || !list.length) return [];
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var p = list[i];
      if (p && p.url) out.push(p);
    }
    return out;
  }

  function mergeProducts(primary, extra) {
    var seen = {};
    var merged = [];
    function push(p) {
      if (!p || !p.url || seen[p.url]) return;
      seen[p.url] = true;
      merged.push(p);
    }
    for (var i = 0; i < primary.length; i++) push(primary[i]);
    for (var j = 0; j < extra.length; j++) push(extra[j]);
    return merged;
  }

  function loadProducts() {
    var fromConfig = configProducts();
    if (fromConfig.length) {
      return fetchShowcaseProducts().then(function (fromHome) {
        return mergeProducts(fromConfig, fromHome);
      });
    }
    return fetchShowcaseProducts();
  }

  function fireConfetti() {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText =
      'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:100002';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var colors = ['#f58220', '#4b96d4', '#ff7f5c', '#2d6a6a', '#ffffff'];
    var originX = window.innerWidth * 0.5;
    var originY = window.innerHeight * 0.18;
    var pieces = [];
    for (var i = 0; i < 70; i++) {
      pieces.push({
        x: originX,
        y: originY,
        vx: (Math.random() - 0.5) * 9,
        vy: Math.random() * -11 - 3,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.18,
        w: 5 + Math.random() * 5,
        h: 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 80 + Math.random() * 40
      });
    }
    var frame = 0;
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var alive = 0;
      for (var k = 0; k < pieces.length; k++) {
        var p = pieces[k];
        p.life -= 1;
        if (p.life <= 0) continue;
        alive++;
        p.vy += 0.32;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, p.life / 28);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      frame++;
      if (alive > 0 && frame < 200) requestAnimationFrame(tick);
      else canvas.remove();
    }
    requestAnimationFrame(tick);
  }

  function buildCardHtml(p, index, isActive) {
    var discount = parseDiscount(p);
    var btus = p.btus || inferBtus(p.title);
    var category = p.category || inferCategory(p.title);
    var room = p.room || (btus ? 'Ambiente ideal · 2026' : 'SITE DO AR · 2026');
    var feat = p.features || (btus ? btus + ' BTUs · conforto inverter' : 'Seleção curada Site do Ar');
    var oldPrice = p.compareAtPrice ? '<span class="opmn-card__old">DE ' + escapeHtml(p.compareAtPrice) + '</span>' : '';
    var price = p.price ? '<span class="opmn-card__price">' + escapeHtml(p.price) + '</span>' : '';

    return (
      '<article class="opmn-card' +
      (isActive ? ' is-active' : '') +
      '" data-opmn-index="' +
      index +
      '" tabindex="0">' +
      (discount ? '<span class="opmn-card__off">' + escapeHtml(discount) + '</span>' : '') +
      '<p class="opmn-card__type">' +
      escapeHtml(category) +
      '</p>' +
      '<p class="opmn-card__avail">Disponível</p>' +
      '<div class="opmn-card__media"><img src="' +
      escapeHtml(p.image) +
      '" alt="' +
      escapeHtml(p.title) +
      '" loading="lazy"></div>' +
      '<p class="opmn-card__room">' +
      escapeHtml(room) +
      '</p>' +
      '<h3 class="opmn-card__name">' +
      escapeHtml(p.title) +
      '</h3>' +
      '<p class="opmn-card__feat">' +
      escapeHtml(feat) +
      '</p>' +
      '<div class="opmn-card__prices">' +
      oldPrice +
      price +
      '</div>' +
      '<div class="opmn-card__foot">' +
      '<a class="opmn-card__link" href="' +
      escapeHtml(p.url) +
      '">Ver produto</a>' +
      '<a class="opmn-card__cart" href="' +
      escapeHtml(p.url) +
      '" title="Ir ao produto" aria-label="Ir ao produto">🛒</a>' +
      '</div></article>'
    );
  }

  function renderPMN(root, products) {
    var rail = root.querySelector('[data-opmn-rail]');
    var empty = root.querySelector('[data-opmn-empty]');
    var loader = root.querySelector('[data-opmn-loader]');
    var edition = root.querySelector('[data-opmn-edition]');
    var spotImg = root.querySelector('[data-opmn-spot-img]');
    var spotTitle = root.querySelector('[data-opmn-spot-title]');
    var spotLink = root.querySelector('[data-opmn-spot-link]');
    var spotDiscount = root.querySelector('[data-opmn-spot-discount]');

    if (edition && cfg().edition) {
      edition.textContent = cfg().edition;
    }

    function setSpot(i) {
      var p = products[i];
      if (!p) return;
      if (spotImg) {
        spotImg.src = p.image || '';
        spotImg.alt = p.title || '';
      }
      if (spotTitle) spotTitle.textContent = p.title || '';
      if (spotLink) {
        spotLink.href = p.url || '#';
        spotLink.setAttribute('title', p.title || '');
      }
      var disc = parseDiscount(p);
      if (spotDiscount) {
        if (disc) {
          spotDiscount.textContent = disc;
          spotDiscount.hidden = false;
        } else {
          spotDiscount.hidden = true;
        }
      }
      if (rail) {
        var cards = rail.querySelectorAll('.opmn-card');
        for (var c = 0; c < cards.length; c++) {
          cards[c].classList.toggle('is-active', Number(cards[c].getAttribute('data-opmn-index')) === i);
        }
      }
    }

    if (!products.length) {
      if (empty) empty.hidden = false;
      if (rail) rail.innerHTML = '';
      if (spotTitle) spotTitle.textContent = 'Em breve novas ofertas';
      if (loader) loader.classList.add('is-hidden');
      return;
    }

    if (empty) empty.hidden = true;

    if (rail) {
      rail.innerHTML = '';
      for (var k = 0; k < products.length; k++) {
        rail.insertAdjacentHTML('beforeend', buildCardHtml(products[k], k, k === 0));
      }
      rail.addEventListener('click', function (ev) {
        var card = ev.target.closest('.opmn-card');
        if (!card) return;
        var idx = Number(card.getAttribute('data-opmn-index'));
        if (!isNaN(idx)) setSpot(idx);
      });
    }

    setSpot(0);
    if (loader) loader.classList.add('is-hidden');
  }

  function bindScrollActions(root) {
    var offers = root.querySelector('[data-opmn-offers]');
    root.querySelectorAll('[data-opmn-scroll]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (offers) offers.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function init() {
    var overlay = document.querySelector('[data-sda-oferta-overlay]');
    var root = overlay ? overlay.querySelector('[data-opmn-root]') : document.querySelector('[data-opmn-root]');
    if (!root) return;

    var appPromise = null;

    function ensureApp() {
      if (appPromise) return appPromise;
      appPromise = loadProducts().then(function (products) {
        renderPMN(root, products);
        bindScrollActions(root);
        return products;
      });
      return appPromise;
    }

    function setHash(open) {
      var base = location.pathname + location.search;
      if (open) {
        if (history.replaceState) history.replaceState(null, '', base + '#' + OVERLAY_HASH);
        else location.hash = OVERLAY_HASH;
      } else if (location.hash === '#' + OVERLAY_HASH) {
        if (history.replaceState) history.replaceState(null, '', base);
        else location.hash = '';
      }
    }

    function openOverlay(withConfetti) {
      if (!overlay) return;
      overlay.hidden = false;
      overlay.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('sda-oferta-overlay-open');
      document.body.classList.add('sda-oferta-overlay-open');
      setHash(true);
      ensureApp().then(function (products) {
        if (withConfetti && products && products.length) fireConfetti();
      });
      var closeBtn = overlay.querySelector('[data-sda-oferta-close]');
      if (closeBtn) closeBtn.focus();
    }

    function closeOverlay() {
      if (!overlay) return;
      overlay.hidden = true;
      overlay.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('sda-oferta-overlay-open');
      document.body.classList.remove('sda-oferta-overlay-open');
      setHash(false);
    }

    function isOfferLink(href) {
      if (!href) return false;
      return href.indexOf('#' + OVERLAY_HASH) !== -1 || href.indexOf('/pagina/oferta-da-semana') !== -1;
    }

    function bindHeaderLinks() {
      var links = document.querySelectorAll('[data-sda-offer-week-link]');
      for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (e) {
          var href = this.getAttribute('href') || '';
          if (!isOfferLink(href)) return;
          e.preventDefault();
          if (!overlay) {
            window.location.href = '/#' + OVERLAY_HASH;
            return;
          }
          openOverlay(true);
        });
      }
    }

    if (overlay) {
      bindHeaderLinks();
      var closeEl = overlay.querySelector('[data-sda-oferta-close]');
      if (closeEl) closeEl.addEventListener('click', closeOverlay);
      document.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape' && !overlay.hidden) closeOverlay();
      });
      window.addEventListener('hashchange', function () {
        if (location.hash === '#' + OVERLAY_HASH) openOverlay(true);
        else if (!overlay.hidden) closeOverlay();
      });
      if (location.hash === '#' + OVERLAY_HASH) {
        setTimeout(function () {
          openOverlay(true);
        }, 300);
      }
      window.SDA_openOfertaImmersiva = function () {
        openOverlay(true);
      };
      return;
    }

    ensureApp().then(function (products) {
      if (products.length) fireConfetti();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
