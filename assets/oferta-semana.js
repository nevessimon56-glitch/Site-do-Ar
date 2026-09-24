/**
 * Oferta da Semana — vitrine dinâmica + countdown + reveal
 */
(function () {
  'use strict';

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function nextSundayEnd() {
    var now = new Date();
    var day = now.getDay();
    var daysUntil = day === 0 ? 0 : 7 - day;
    var end = new Date(now);
    end.setDate(now.getDate() + daysUntil);
    end.setHours(23, 59, 59, 999);
    if (end <= now) {
      end.setDate(end.getDate() + 7);
    }
    return end;
  }

  function startCountdown(root) {
    var box = root.querySelector('[data-os-countdown]');
    if (!box) return;
    var elD = box.querySelector('[data-os-cd-d]');
    var elH = box.querySelector('[data-os-cd-h]');
    var elM = box.querySelector('[data-os-cd-m]');
    var elS = box.querySelector('[data-os-cd-s]');

    function tick() {
      var target = nextSundayEnd();
      var diff = Math.max(0, target - Date.now());
      var sec = Math.floor(diff / 1000);
      var d = Math.floor(sec / 86400);
      sec -= d * 86400;
      var h = Math.floor(sec / 3600);
      sec -= h * 3600;
      var m = Math.floor(sec / 60);
      sec -= m * 60;
      if (elD) elD.textContent = pad(d);
      if (elH) elH.textContent = pad(h);
      if (elM) elM.textContent = pad(m);
      if (elS) elS.textContent = pad(sec);
    }

    tick();
    setInterval(tick, 1000);
  }

  function parseProductsFromHtml(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var section =
      doc.querySelector('.showcase-14') ||
      (function () {
        var titles = doc.querySelectorAll('h2.showcase-title');
        for (var i = 0; i < titles.length; i++) {
          if (/ofertas/i.test(titles[i].textContent || '')) {
            return titles[i].closest('section.showcase');
          }
        }
        return null;
      })();

    if (!section) return [];

    var nodes = section.querySelectorAll('[data-product-url]');
    var list = [];
    var seen = {};

    for (var j = 0; j < nodes.length; j++) {
      var node = nodes[j];
      var url = node.getAttribute('data-product-url') || '';
      if (!url || seen[url]) continue;
      seen[url] = true;
      list.push({
        url: url,
        title: node.getAttribute('data-product-title') || 'Oferta',
        image: node.getAttribute('data-product-image') || ''
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

  function renderApp(root, products) {
    var heroCard = root.querySelector('[data-os-hero-card]');
    var heroImg = root.querySelector('[data-os-hero-img]');
    var heroTitle = root.querySelector('[data-os-hero-title]');
    var heroLink = root.querySelector('[data-os-hero-link]');
    var rail = root.querySelector('[data-os-rail]');
    var revealBtn = root.querySelector('[data-os-reveal]');
    var shuffleBtn = root.querySelector('[data-os-shuffle]');
    var loader = root.querySelector('[data-os-loader]');

    if (!products.length) {
      if (heroTitle) heroTitle.textContent = 'Em breve novas ofertas';
      if (heroLink) heroLink.setAttribute('href', '/');
      if (heroCard) heroCard.hidden = false;
      if (loader) loader.classList.add('is-hidden');
      return;
    }

    var index = 0;

    function setHero(i, mystery) {
      var p = products[i];
      if (!p) return;
      index = i;
      if (heroCard) {
        heroCard.hidden = false;
        heroCard.classList.toggle('is-mystery', !!mystery);
      }
      if (heroImg) {
        heroImg.src = p.image || '';
        heroImg.alt = p.title;
      }
      if (heroTitle) heroTitle.textContent = mystery ? 'Oferta surpresa…' : p.title;
      if (heroLink) {
        heroLink.href = p.url;
        heroLink.setAttribute('title', p.title);
      }
      if (rail) {
        var chips = rail.querySelectorAll('.os-week__chip');
        for (var c = 0; c < chips.length; c++) {
          chips[c].classList.toggle('is-active', Number(chips[c].getAttribute('data-index')) === i);
        }
      }
    }

    if (rail) {
      rail.innerHTML = '';
      for (var k = 0; k < products.length; k++) {
        (function (idx) {
          var p = products[idx];
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'os-week__chip' + (idx === 0 ? ' is-active' : '');
          btn.setAttribute('data-index', String(idx));
          btn.innerHTML =
            (p.image ? '<img src="' + p.image.replace(/"/g, '&quot;') + '" alt="" loading="lazy">' : '') +
            '<span class="os-week__chip-title">' +
            (p.title || 'Oferta') +
            '</span>';
          btn.addEventListener('click', function () {
            setHero(idx, heroCard && heroCard.classList.contains('is-mystery'));
          });
          rail.appendChild(btn);
        })(k);
      }
    }

    setHero(0, true);

    if (revealBtn) {
      revealBtn.addEventListener('click', function () {
        if (heroCard) heroCard.classList.remove('is-mystery');
        if (heroTitle && products[index]) heroTitle.textContent = products[index].title;
      });
    }

    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', function () {
        var next = Math.floor(Math.random() * products.length);
        if (products.length > 1) {
          while (next === index) next = Math.floor(Math.random() * products.length);
        }
        setHero(next, true);
      });
    }

    if (loader) loader.classList.add('is-hidden');
  }

  function init() {
    var root = document.querySelector('[data-os-week]');
    if (!root) return;
    startCountdown(root);
    fetchShowcaseProducts().then(function (products) {
      renderApp(root, products);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
