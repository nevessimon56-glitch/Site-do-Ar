/**
 * Header v2 — mobile nav strip, dock conta, faixa utilitária (1 arquivo, cache CDN)
 */
(function () {
  'use strict';

  var MOBILE_MQ = '(max-width: 991px)';

  function isMobile() {
    return window.matchMedia(MOBILE_MQ).matches;
  }

  function isHeaderV2() {
    return !!document.querySelector('.header.header-v2');
  }

  window.sdaUpdateUtilityBarLabels = window.sdaUpdateUtilityBarLabels || function sdaUpdateUtilityBarLabels(customer) {
    var btn = document.querySelector('.header-v2 .header-utility__account');
    if (!btn) return;
    var logged = document.querySelector('.header-v2 .header-utility__label--logged');
    var guest = document.querySelector('.header-v2 .header-utility__label--guest');
    if (!logged || !guest) return;
    if (customer && (customer.name || customer.fantasyName || customer.email)) {
      var raw = customer.name || customer.fantasyName || customer.email || '';
      var first = String(raw).trim().split(/\s+/)[0] || '';
      logged.textContent = first ? 'Olá, ' + first : 'Olá';
      logged.hidden = false;
      guest.hidden = true;
    } else {
      logged.hidden = true;
      guest.hidden = false;
    }
  };

  window.initSdaMobileNavStrip = window.initSdaMobileNavStrip || function initSdaMobileNavStrip() {
    var navContent = document.querySelector('.header > .nav-content');
    if (!navContent) return;

    if (isHeaderV2()) {
      navContent.classList.remove('sda-mobile-nav-strip--3', 'sda-mobile-nav-revealed');
      var allItems = navContent.querySelectorAll('.nav-main_item');
      var mobileNavShown = 0;
      var mobileNavMax = 6;
      for (var vi = 0; vi < allItems.length; vi++) {
        var item = allItems[vi];
        item.classList.remove('nav-main_item--nav-hidden-mobile');
        var link = item.querySelector('a.nav-main_link');
        var href = (link && link.getAttribute('href') ? link.getAttribute('href') : '').toLowerCase();
        var label = (link && link.textContent ? link.textContent : '').replace(/\s+/g, ' ').trim().toLowerCase();
        var hide =
          label.indexOf('todos os produtos') !== -1 ||
          href.indexOf('todos-os-produtos') !== -1;
        if (hide || mobileNavShown >= mobileNavMax) {
          item.classList.add('nav-main_item--nav-hidden-mobile');
          item.style.display = 'none';
          continue;
        }
        item.style.display = '';
        mobileNavShown++;
      }
      return;
    }

    var KEEP = [
      { path: '/split-inverter', label: 'split inverter' },
      { path: '/piso-teto', label: 'piso teto' },
      { path: '/janela', label: 'janela' }
    ];

    function norm(href) {
      try {
        return (new URL(href, window.location.origin).pathname || '').toLowerCase().replace(/\/+$/, '') || '/';
      } catch (e) {
        return (href || '').toLowerCase().split('?')[0].replace(/\/+$/, '') || '/';
      }
    }

    function keepItem(item) {
      var link = item.querySelector('a.nav-main_link');
      if (!link) return false;
      var path = norm(link.getAttribute('href') || '');
      var text = (link.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (text.indexOf('todos os produtos') !== -1 || path.indexOf('todos-os-produtos') !== -1) return false;
      for (var i = 0; i < KEEP.length; i++) {
        if (path.indexOf(KEEP[i].path) !== -1 || text === KEEP[i].label) return true;
      }
      return false;
    }

    var navMain = navContent.querySelector('.nav-main');
    if (!navMain) return;
    var items = navMain.querySelectorAll('.nav-main_item');
    if (!isMobile()) {
      navContent.classList.remove('sda-mobile-nav-strip--3', 'sda-mobile-nav-revealed');
      for (var j = 0; j < items.length; j++) items[j].style.display = '';
      return;
    }
    var visible = 0;
    for (var k = 0; k < items.length; k++) {
      var show = keepItem(items[k]);
      items[k].style.display = show ? '' : 'none';
      if (show) visible++;
    }
    navContent.classList.toggle('sda-mobile-nav-strip--3', visible > 0);
  };

  window.sdaSyncMobileCatalogDock = window.sdaSyncMobileCatalogDock || function sdaSyncMobileCatalogDock() {
    if (!isMobile()) return;
    var inner = document.querySelector('.mobile-catalog-dock__inner');
    if (!inner) return;
    var loggedIn = !!(window.__SITE_DOAR_CUSTOMER__ && (window.__SITE_DOAR_CUSTOMER__.customerId || window.__SITE_DOAR_CUSTOMER__.email));
    var btns = inner.querySelectorAll('.mobile-catalog-dock__btn, .mobile-catalog-dock__inner > a');
    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i];
      var labelEl = btn.querySelector('.mobile-catalog-dock__label');
      var label = (labelEl && labelEl.textContent ? labelEl.textContent : btn.textContent || '').replace(/\s+/g, ' ').trim();
      if (loggedIn && /^conta$/i.test(label)) {
        btn.classList.add('sda-dock-account-hidden');
        btn.setAttribute('aria-hidden', 'true');
        btn.setAttribute('tabindex', '-1');
      } else {
        btn.classList.remove('sda-dock-account-hidden');
        btn.removeAttribute('aria-hidden');
        btn.removeAttribute('tabindex');
      }
    }
    inner.classList.toggle('mobile-catalog-dock__inner--logged', loggedIn);
  };

  window.initSdaNavFixedTop = window.initSdaNavFixedTop || function initSdaNavFixedTop() {
    if (window.__SDA_NAV_FIXED_INIT__) return;
    window.__SDA_NAV_FIXED_INIT__ = true;
    var nav = document.querySelector('.header > .nav-content');
    if (!nav) return;
    var spacer = nav.nextElementSibling;
    if (!spacer || !spacer.classList.contains('nav-content-fixed-spacer')) {
      spacer = document.createElement('div');
      spacer.className = 'nav-content-fixed-spacer';
      spacer.setAttribute('aria-hidden', 'true');
      nav.parentNode.insertBefore(spacer, nav.nextSibling);
    }
    var fixAt = 0;

    function readScrollY() {
      return window.pageYOffset || document.documentElement.scrollTop || 0;
    }

    function getMobileRevealAt() {
      var headerContent = document.querySelector('.header:not(.header-checkout) > .header-content');
      var headerHeight = headerContent && headerContent.offsetHeight ? headerContent.offsetHeight : 56;
      return Math.max(48, Math.min(headerHeight, 100));
    }

    function measure() {
      nav.classList.remove('is-fixed-top');
      spacer.style.height = '0';
      if (isMobile()) return;
      nav.classList.remove('sda-mobile-nav-revealed');
      fixAt = nav.getBoundingClientRect().top + readScrollY();
      if (!fixAt) fixAt = nav.offsetTop || 0;
    }

    function update() {
      if (isMobile()) {
        nav.classList.remove('is-fixed-top');
        spacer.style.height = '0';
        if (isHeaderV2()) {
          nav.classList.remove('sda-mobile-nav-revealed', 'sda-mobile-nav-strip--3');
          return;
        }
        if (readScrollY() >= getMobileRevealAt() - 1) {
          nav.classList.add('sda-mobile-nav-revealed', 'sda-mobile-nav-strip--3');
        } else {
          nav.classList.remove('sda-mobile-nav-revealed');
        }
        return;
      }
      nav.classList.remove('sda-mobile-nav-revealed');
      var navHeight = nav.offsetHeight;
      if (!navHeight) {
        nav.classList.remove('is-fixed-top');
        spacer.style.height = '0';
        return;
      }
      if (readScrollY() >= fixAt - 1) {
        nav.classList.add('is-fixed-top');
        spacer.style.height = navHeight + 'px';
      } else {
        nav.classList.remove('is-fixed-top');
        spacer.style.height = '0';
      }
    }

    function remeasureAndUpdate() {
      measure();
      update();
    }

    var scrollScheduled = false;
    function onScroll() {
      if (scrollScheduled) return;
      scrollScheduled = true;
      requestAnimationFrame(function () {
        scrollScheduled = false;
        update();
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', remeasureAndUpdate, { passive: true });
    remeasureAndUpdate();
  };

  function bootHeaderV2Mobile() {
    try {
      if (typeof window.initSdaMobileNavStrip === 'function') window.initSdaMobileNavStrip();
      if (typeof window.initSdaNavFixedTop === 'function') window.initSdaNavFixedTop();
      if (typeof window.sdaSyncMobileCatalogDock === 'function') window.sdaSyncMobileCatalogDock();
      if (typeof window.sdaUpdateUtilityBarLabels === 'function') {
        window.sdaUpdateUtilityBarLabels(window.__SITE_DOAR_CUSTOMER__);
      }
    } catch (err) {
      console.error('header-v2-mobile:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootHeaderV2Mobile);
  } else {
    bootHeaderV2Mobile();
  }

  window.addEventListener('resize', function () {
    if (typeof window.initSdaMobileNavStrip === 'function') window.initSdaMobileNavStrip();
  }, { passive: true });
})();
