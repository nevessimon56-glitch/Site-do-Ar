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
        renderFavoritesPage();
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
  }

  function onLoginMerge() {
    var cid = getCustomerId();
    if (cid) {
      mergeGuestIntoUser(cid);
      loadServerIntoLocal();
    }
    refreshUI();
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
  };

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('sitedoar-favorites-change', refreshUI);
  document.addEventListener('change-customer-login', function () {
    setTimeout(onLoginMerge, 100);
  });

  document.addEventListener('DOMContentLoaded', function () {
    onLoginMerge();
    refreshUI();
  });
  window.addEventListener('load', refreshUI);
})();
