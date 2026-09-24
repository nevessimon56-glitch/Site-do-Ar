/**
 * Home — vitrine Ofertas da semana: id + produtos do config + confete ao entrar
 */
(function () {
  'use strict';

  var HASH = 'sda-ofertas-semana';
  var confettiFired = false;

  function cfg() {
    return window.SDA_OFERTAS_SEMANA || {};
  }

  function isHome() {
    var p = (window.location.pathname || '/').replace(/\/index\.html$/i, '');
    return p === '' || p === '/';
  }

  function findOfferSection() {
    var c = cfg();
    var byClass = document.querySelector('.showcase-14');
    if (byClass) return byClass;
    var titles = document.querySelectorAll('h2.showcase-title');
    var matchRe = c.sectionTitleMatch || /ofertas/i;
    for (var i = 0; i < titles.length; i++) {
      if (matchRe.test(titles[i].textContent || '')) {
        var sec = titles[i].closest('section.showcase');
        if (sec) return sec;
      }
    }
    return null;
  }

  function ensureSectionId(section) {
    if (!section) return null;
    if (!section.id) section.id = HASH;
    return section;
  }

  function fireConfetti(section) {
    if (confettiFired) return;
    confettiFired = true;

    var rect = section.getBoundingClientRect();
    var originX = rect.left + rect.width * 0.5;
    var originY = rect.top + Math.min(80, rect.height * 0.25);
    if (originY < 0) originY = window.innerHeight * 0.35;

    var canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText =
      'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:99999';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var colors = ['#f58220', '#4b96d4', '#ffffff', '#ffd166', '#1a2d4a'];
    var pieces = [];
    var n = 80;
    for (var i = 0; i < n; i++) {
      pieces.push({
        x: originX,
        y: originY,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * -12 - 4,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.2,
        w: 6 + Math.random() * 6,
        h: 4 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 90 + Math.random() * 40
      });
    }

    var frame = 0;
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var alive = 0;
      for (var j = 0; j < pieces.length; j++) {
        var p = pieces[j];
        p.life -= 1;
        if (p.life <= 0) continue;
        alive++;
        p.vy += 0.35;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, p.life / 30);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      frame++;
      if (alive > 0 && frame < 220) {
        requestAnimationFrame(tick);
      } else {
        canvas.remove();
      }
    }
    requestAnimationFrame(tick);
    setTimeout(function () {
      confettiFired = false;
    }, 3000);
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function buildCard(p) {
    var url = escapeHtml(p.url);
    var title = escapeHtml(p.title);
    var img = escapeHtml(p.image);
    var price = p.price ? escapeHtml(p.price) : '';
    var fav =
      p.productId
        ? '<button type="button" class="showcase-favorite-btn" data-favorite-toggle data-product-id="' +
          escapeHtml(p.productId) +
          '" data-product-url="' +
          url +
          '" data-product-title="' +
          title +
          '" data-product-image="' +
          img +
          '" data-product-price="' +
          price +
          '" aria-label="Favoritar" title="Favoritar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.4-7 10-7 10z"/></svg></button>'
        : '';

    var priceHtml = price
      ? '<div class="showcase-price"><span class="showcase-price_value">' + price + '</span></div>'
      : '';

    return (
      '<li class="showcase-item" data-showcase-tpl="v3-site-price" data-sda-week-offer="1">' +
      '<div class="showcase-product card">' +
      '<div class="showcase-product_image card-image">' +
      fav +
      '<a class="showcase-product_link showcase-product_link__image" href="' +
      url +
      '"><img class="lazy product-hover-swap" src="' +
      img +
      '" data-src="' +
      img +
      '" alt="' +
      title +
      '"></a></div>' +
      '<div class="card-header"><h3><a class="showcase-product_link showcase-product_link_title" href="' +
      url +
      '">' +
      title +
      '</a></h3></div>' +
      priceHtml +
      '</div></li>'
    );
  }

  function normalizeProductPath(href) {
    try {
      return (new URL(href, window.location.origin).pathname || '')
        .toLowerCase()
        .replace(/\/+$/, '');
    } catch (err) {
      return String(href || '')
        .toLowerCase()
        .split('?')[0]
        .replace(/\/+$/, '');
    }
  }

  /** Destaca / coloca no topo — nunca apaga a vitrine do admin WDNA */
  function applyCustomProducts(section) {
    var products = cfg().products;
    if (!products || !products.length) return;
    var list = section.querySelector('.showcase-list');
    if (!list) return;

    var items = list.querySelectorAll('.showcase-item');
    var byPath = {};
    for (var e = 0; e < items.length; e++) {
      var item = items[e];
      var link = item.querySelector('[data-product-url], a.showcase-product_link[href]');
      var href = link && (link.getAttribute('data-product-url') || link.getAttribute('href'));
      if (href) byPath[normalizeProductPath(href)] = item;
    }

    var toFront = [];
    var seen = {};

    for (var i = 0; i < products.length; i++) {
      var p = products[i];
      if (!p || !p.url) continue;
      var path = normalizeProductPath(p.url);
      if (seen[path]) continue;
      seen[path] = true;

      var existing = byPath[path];
      if (existing) {
        existing.classList.add('sda-week-offer-highlight');
        existing.setAttribute('data-sda-week-offer', '1');
        toFront.push(existing);
      } else if (p.title && p.image) {
        var wrap = document.createElement('div');
        wrap.innerHTML = buildCard(p);
        var li = wrap.firstElementChild;
        if (li) toFront.push(li);
      }
    }

    for (var j = toFront.length - 1; j >= 0; j--) {
      list.insertBefore(toFront[j], list.firstChild);
    }

    if (toFront.length) section.setAttribute('data-sda-week-boost', '1');
  }

  function scrollToSection(withConfetti) {
    var section = ensureSectionId(findOfferSection());
    if (!section) return false;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (withConfetti) {
      setTimeout(function () {
        fireConfetti(section);
      }, 500);
    }
    return true;
  }

  function bindHeaderLinks() {
    var links = document.querySelectorAll('[data-sda-offer-week-link]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) {
        var href = this.getAttribute('href') || '';
        if (href.indexOf(HASH) === -1) return;
        if (!isHome()) return;
        e.preventDefault();
        if (history.replaceState) {
          history.replaceState(null, '', '#' + HASH);
        } else {
          location.hash = HASH;
        }
        scrollToSection(true);
      });
    }
  }

  function init() {
    if (!isHome()) return;

    var section = ensureSectionId(findOfferSection());
    if (!section) return;

    applyCustomProducts(section);
    bindHeaderLinks();

    if (location.hash === '#' + HASH) {
      setTimeout(function () {
        scrollToSection(true);
      }, 400);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
