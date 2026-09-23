/**
 * Favoritos — localStorage + bucket por cliente logado
 * Evento: sitedoar-favorites-change
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'sitedoar_favorites_v1';
  var GUEST_KEY = '__guest__';
  var SERVER_KEY = 'sitedoar_favorites_server_v1';

  function safeParse(raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function readStore() {
    var data = safeParse(localStorage.getItem(STORAGE_KEY));
    if (!data || typeof data !== 'object' || !data.byUser) {
      return { byUser: {} };
    }
    return data;
  }

  function writeStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    document.dispatchEvent(new CustomEvent('sitedoar-favorites-change'));
  }

  function getCustomerId() {
    var c =
      (typeof customer !== 'undefined' && customer) ||
      window.__SITE_DOAR_CUSTOMER__ ||
      null;
    if (!c) return null;
    if (c.customerId != null) return String(c.customerId);
    if (c.id != null) return String(c.id);
    return null;
  }

  function bucketKey() {
    return getCustomerId() || GUEST_KEY;
  }

  function normalizeProduct(input) {
    if (!input || input.id == null) return null;
    return {
      id: String(input.id),
      url: input.url || '',
      title: input.title || 'Produto',
      image: input.image || '',
      price: input.price || '',
    };
  }

  function getList() {
    var store = readStore();
    var key = bucketKey();
    if (!store.byUser[key]) store.byUser[key] = [];
    return store.byUser[key];
  }

  function setList(list) {
    var store = readStore();
    store.byUser[bucketKey()] = list;
    writeStore(store);
    persistServer(list);
  }

  function mergeGuestIntoUser(userId) {
    if (!userId) return;
    var store = readStore();
    var guest = store.byUser[GUEST_KEY];
    if (!guest || !guest.length) return;
    var user = store.byUser[userId] || [];
    var map = {};
    user.forEach(function (p) {
      map[p.id] = p;
    });
    guest.forEach(function (p) {
      if (!map[p.id]) user.push(p);
    });
    store.byUser[userId] = user;
    delete store.byUser[GUEST_KEY];
    writeStore(store);
    persistServer(user);
  }

  function persistServer(list) {
    var cid = getCustomerId();
    if (!cid || typeof StoreSDK === 'undefined' || !StoreSDK.request) return;

    var payload = { items: list };
    var endpoints = [
      { method: 'post', url: '/ajax/wishlist' },
      { method: 'post', url: '/ajax/favorites' },
      { method: 'put', url: '/ajax/customer/wishlist' },
    ];

    endpoints.forEach(function (ep) {
      StoreSDK.request[ep.method](ep.url, payload).catch(function () {});
    });

    try {
      localStorage.setItem(SERVER_KEY + '_' + cid, JSON.stringify(list));
    } catch (e) {}
  }

  function loadServerIntoLocal() {
    var cid = getCustomerId();
    if (!cid || typeof StoreSDK === 'undefined' || !StoreSDK.request) return;

    StoreSDK.request
      .get('/ajax/wishlist')
      .then(function (res) {
        var items = (res && (res.items || res.data || res.products)) || [];
        if (!Array.isArray(items) || !items.length) return;
        var normalized = items
          .map(function (item) {
            return normalizeProduct({
              id: item.id || item.productId,
              url: item.url || item.link,
              title: item.title || item.name,
              image: item.image || (item.medias && item.medias[0] && item.medias[0].path),
              price: item.priceFormatted || item.price,
            });
          })
          .filter(Boolean);
        if (normalized.length) {
          var store = readStore();
          store.byUser[cid] = normalized;
          writeStore(store);
        }
      })
      .catch(function () {
        var cached = safeParse(localStorage.getItem(SERVER_KEY + '_' + cid));
        if (Array.isArray(cached) && cached.length) {
          var store = readStore();
          store.byUser[cid] = cached;
          writeStore(store);
        }
      });
  }

  function updateBadges() {
    var count = getList().length;
    document.querySelectorAll('[data-favorites-count]').forEach(function (el) {
      el.textContent = String(count);
      el.setAttribute('data-count', String(count));
    });
  }

  function syncToggleButtons() {
    var list = getList();
    var ids = {};
    list.forEach(function (p) {
      ids[p.id] = true;
    });
    document.querySelectorAll('[data-favorite-toggle]').forEach(function (btn) {
      var id = btn.getAttribute('data-product-id');
      if (id && ids[id]) btn.classList.add('is-active');
      else btn.classList.remove('is-active');
    });
  }

  function readProductFromButton(btn) {
    return normalizeProduct({
      id: btn.getAttribute('data-product-id'),
      url: btn.getAttribute('data-product-url'),
      title: btn.getAttribute('data-product-title'),
      image: btn.getAttribute('data-product-image'),
      price: btn.getAttribute('data-product-price'),
    });
  }

  function toggleProduct(product) {
    var p = normalizeProduct(product);
    if (!p) return false;
    var list = getList().slice();
    var idx = -1;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === p.id) {
        idx = i;
        break;
      }
    }
    if (idx >= 0) list.splice(idx, 1);
    else list.push(p);
    setList(list);
    return idx < 0;
  }

  function removeProduct(id) {
    var sid = String(id);
    var list = getList().filter(function (p) {
      return p.id !== sid;
    });
    setList(list);
  }

  var PANEL_REMOVE_ICON =
    '<svg class="icon_close" x="0px" y="0px" viewBox="0 0 512.001 512.001" aria-hidden="true">' +
    '<path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285L284.286,256.002z"/></svg>';

  function buildPanelItemHtml(p) {
    return (
      '<section class="cart-section favorites-panel__item" data-favorite-id="' +
      escapeAttr(p.id) +
      '">' +
      '<div class="cart-image float-left">' +
      '<a class="cart-image_link" href="' +
      escapeAttr(p.url) +
      '" title="' +
      escapeAttr(p.title) +
      '">' +
      (p.image
        ? '<picture><img src="' +
          escapeAttr(p.image) +
          '" alt="' +
          escapeAttr(p.title) +
          '" loading="lazy"></picture>'
        : '') +
      '</a>' +
      '</div>' +
      '<div class="cart-product float-right">' +
      '<div class="columns">' +
      '<div class="cart-product_header col-12 column">' +
      '<a class="cart-product_title float-left" href="' +
      escapeAttr(p.url) +
      '" title="' +
      escapeAttr(p.title) +
      '">' +
      escapeHtml(p.title) +
      '</a>' +
      '<a class="btn-cartItem_delete float-right" href="javascript:void(0)" data-favorite-remove="' +
      escapeAttr(p.id) +
      '" aria-label="Remover dos favoritos">' +
      PANEL_REMOVE_ICON +
      '</a>' +
      '</div>' +
      (p.price
        ? '<div class="cart-product_prices col-12 column">' +
          '<div class="cart-product_price"><p class="cart-price_total favorites-panel__price">' +
          escapeHtml(p.price) +
          '</p></div></div>'
        : '') +
      '<div class="col-12 column favorites-panel__view">' +
      '<a class="btn btn-sm col-12" href="' +
      escapeAttr(p.url) +
      '">Ver produto</a>' +
      '</div>' +
      '</div></div></section>'
    );
  }

  function renderFavoritesPanel() {
    var listEl = document.getElementById('favoritos-panel-list');
    var emptyEl = document.getElementById('favoritos-panel-empty');
    var footerEl = document.getElementById('favoritos-panel-footer');
    if (!listEl) return;

    var list = getList();
    listEl.innerHTML = '';

    if (!list.length) {
      if (emptyEl) emptyEl.hidden = false;
      if (footerEl) footerEl.hidden = true;
      return;
    }

    if (emptyEl) emptyEl.hidden = true;
    if (footerEl) footerEl.hidden = false;

    list.forEach(function (p) {
      listEl.insertAdjacentHTML('beforeend', buildPanelItemHtml(p));
    });
  }

  function renderFavoritesPage() {
    var root = document.getElementById('favoritos-page-grid');
    var empty = document.getElementById('favoritos-page-empty');
    if (!root) return;

    var list = getList();
    root.innerHTML = '';

    if (!list.length) {
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;

    list.forEach(function (p) {
      var li = document.createElement('li');
      li.className = 'favoritos-card';
      li.innerHTML =
        '<div class="favoritos-card__img">' +
          (p.image
            ? '<a href="' + escapeAttr(p.url) + '"><img src="' + escapeAttr(p.image) + '" alt="' + escapeAttr(p.title) + '" loading="lazy"></a>'
            : '') +
        '</div>' +
        '<div class="favoritos-card__body">' +
          '<h3 class="favoritos-card__title"><a href="' + escapeAttr(p.url) + '">' + escapeHtml(p.title) + '</a></h3>' +
          (p.price ? '<p class="favoritos-card__price">' + escapeHtml(p.price) + '</p>' : '') +
          '<div class="favoritos-card__actions">' +
            '<a class="btn btn-primary" href="' + escapeAttr(p.url) + '">Ver produto</a>' +
            '<button type="button" class="favoritos-card__remove" data-favorite-remove="' + escapeAttr(p.id) + '">Remover</button>' +
          '</div>' +
        '</div>';
      root.appendChild(li);
    });

    root.querySelectorAll('[data-favorite-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        removeProduct(btn.getAttribute('data-favorite-remove'));
      });
    });
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, '&#39;');
  }

  var HEART_BTN_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.4-7 10-7 10z"/></svg>';

  function extractProductIdFromCard(card) {
    var buyBtn = card.querySelector('[onclick*="handleAddToCart"]');
    if (buyBtn) {
      var onclick = buyBtn.getAttribute('onclick') || '';
      var m = onclick.match(/handleAddToCart\s*\(\s*['"]([^'"]+)['"]/);
      if (m && m[1]) return String(m[1]);
    }
    var link = card.querySelector('a.showcase-product_link[href], a.showcase-product_link__image[href]');
    if (link) {
      var href = link.getAttribute('href') || '';
      var m2 = href.match(/-p(\d+)\/?$/i) || href.match(/\/p(\d+)\/?$/i);
      if (m2 && m2[1]) return String(m2[1]);
    }
    return '';
  }

  function injectFavoriteButtons(root) {
    var scope = root && root.querySelectorAll ? root : document;
    var cards = scope.querySelectorAll ? scope.querySelectorAll('.showcase-product.card') : [];
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (card.getAttribute('data-favorite-injected') === '1') continue;
      if (card.querySelector('[data-favorite-toggle]')) {
        card.setAttribute('data-favorite-injected', '1');
        continue;
      }
      var imgWrap = card.querySelector('.showcase-product_image.card-image, .showcase-product_image, .card-image');
      if (!imgWrap) continue;

      var id = extractProductIdFromCard(card);
      if (!id) continue;

      var titleEl = card.querySelector('.showcase-product_link_title, a.showcase-product_link.showcase-product_link_title');
      var linkEl = card.querySelector('a.showcase-product_link__image, a.showcase-product_link[href]');
      var imgEl = card.querySelector('img[data-src], img[src]');
      var priceEl = card.querySelector('.showcase-prices_price b, .showcase-prices_price');

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'showcase-favorite-btn';
      btn.setAttribute('data-favorite-toggle', '');
      btn.setAttribute('data-product-id', id);
      btn.setAttribute('data-product-url', linkEl ? linkEl.getAttribute('href') || '' : '');
      btn.setAttribute('data-product-title', titleEl ? titleEl.textContent.trim() : '');
      btn.setAttribute(
        'data-product-image',
        imgEl ? imgEl.getAttribute('data-src') || imgEl.getAttribute('src') || '' : ''
      );
      btn.setAttribute('data-product-price', priceEl ? priceEl.textContent.trim() : '');
      btn.setAttribute('aria-label', 'Favoritar produto');
      btn.setAttribute('title', 'Favoritar');
      btn.innerHTML = HEART_BTN_SVG;

      imgWrap.insertBefore(btn, imgWrap.firstChild);
      card.setAttribute('data-favorite-injected', '1');
    }
  }

  function bootFavoriteButtons() {
    injectFavoriteButtons(document);
    syncToggleButtons();
  }

  function onDocumentClick(e) {
    var btn = e.target.closest('[data-favorite-toggle]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    toggleProduct(readProductFromButton(btn));
  }

  function refreshUI() {
    updateBadges();
    syncToggleButtons();
    renderFavoritesPage();
    renderFavoritesPanel();
  }

  function openFavoritesPanel() {
    renderFavoritesPanel();
    if (typeof openSideNavOverlay === 'function') {
      openSideNavOverlay('.sidenav-overlay_favorites', false);
    } else {
      window.location.href = '/pagina/favoritos';
    }
  }

  function onLoginMerge() {
    var cid = getCustomerId();
    if (cid) {
      mergeGuestIntoUser(cid);
      loadServerIntoLocal();
    }
    refreshUI();
  }

  function onPanelClick(e) {
    var removeBtn = e.target.closest('[data-favorite-remove]');
    if (!removeBtn || !removeBtn.closest('.sidenav-overlay_favorites')) return;
    e.preventDefault();
    removeProduct(removeBtn.getAttribute('data-favorite-remove'));
  }

  window.SiteDoarFavorites = {
    getAll: getList,
    isFavorite: function (id) {
      var sid = String(id);
      return getList().some(function (p) {
        return p.id === sid;
      });
    },
    toggle: toggleProduct,
    remove: removeProduct,
    mergeGuestOnLogin: onLoginMerge,
    refresh: refreshUI,
    injectButtons: bootFavoriteButtons,
    openPanel: openFavoritesPanel,
  };

  window.openFavoritesPanel = openFavoritesPanel;

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('click', onPanelClick);
  document.addEventListener('sitedoar-favorites-change', refreshUI);
  document.addEventListener('change-customer-login', function () {
    setTimeout(onLoginMerge, 100);
  });

  var injectTimer;
  function scheduleInject() {
    clearTimeout(injectTimer);
    injectTimer = setTimeout(bootFavoriteButtons, 80);
  }

  if (typeof MutationObserver !== 'undefined') {
    var mo = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes && mutations[i].addedNodes.length) {
          scheduleInject();
          break;
        }
      }
    });
    document.addEventListener('DOMContentLoaded', function () {
      mo.observe(document.body, { childList: true, subtree: true });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    onLoginMerge();
    bootFavoriteButtons();
    refreshUI();
  });
  window.addEventListener('load', function () {
    bootFavoriteButtons();
    refreshUI();
  });
})();
