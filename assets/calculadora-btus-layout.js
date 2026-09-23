/**
 * Calculadora BTUs — layout vs rodapé WDNA (theme-schema).
 * v2: reparent no body, heurística de footer, fixed/sticky no rodapé.
 */
(function () {
  'use strict';

  var SPACER_ID = 'sda-btu-footer-spacer';
  var MARK = 'data-sda-btu-layout';
  var scheduled = false;
  var CDN =
    'https://cdn.jsdelivr.net/gh/nevessimon56-glitch/Site-do-Ar@cursor/header-favoritos-v2-e52b/assets/calculadora-btus-layout.js?v=2';

  function calcRoot() {
    return document.getElementById('sda-calculadora');
  }

  function isIgnored(el) {
    if (!el || !el.closest) return true;
    if (el.closest('#sda-calculadora')) return true;
    if (el.closest('.sidenav-overlay')) return true;
    if (el.closest('.sidenav-overlay_favorites')) return true;
    if (el.closest('.card-footer')) return true;
    if (el.closest('#diag360pop')) return true;
    if (el.closest('#diag360backdrop')) return true;
    if (el.id === 'sda-btu-footer-spacer') return true;
    var id = el.id || '';
    if (/^diag360/i.test(id)) return true;
    return false;
  }

  function findStoreFooter(root) {
    var selectors = [
      'body > footer',
      'body > .footer',
      'footer.footer',
      '#footer',
      '.store-footer',
      '.footer-store',
      '.rodape',
      '.main-footer',
      'section.footer',
      '.footer-infos',
      '.infos-footer',
      '.footer_container',
      '.footer-container',
      '[class*="footer-store"]',
      '[class*="Footer"]',
    ].join(',');
    var nodes = document.querySelectorAll(selectors);
    var i;
    var best = null;
    for (i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (isIgnored(el)) continue;
      if (root && (el === root || root.contains(el))) continue;
      best = el;
    }
    if (best) return best;
    return findFooterHeuristic(root);
  }

  function findFooterHeuristic(root) {
    var body = document.body;
    if (!body || !body.children) return null;
    var kids = body.children;
    var i;
    for (i = kids.length - 1; i >= 0; i--) {
      var el = kids[i];
      if (!el || el.nodeType !== 1) continue;
      var tag = el.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'LINK' || tag === 'NOSCRIPT') continue;
      if (isIgnored(el)) continue;
      if (root && (el === root || el.contains(root))) continue;
      if (root && root.contains && root.contains(el)) continue;
      var cls = (el.className && String(el.className)) || '';
      var id = el.id || '';
      if (tag === 'FOOTER' || /footer|rodape|schema|copyright/i.test(cls + id)) {
        return el;
      }
      if (el.offsetHeight >= 60) {
        var rect = el.getBoundingClientRect();
        if (rect.width >= window.innerWidth * 0.5) return el;
      }
    }
    return null;
  }

  function markPage() {
    var html = document.documentElement;
    if (html && html.classList) {
      html.classList.add('sda-btu-page', 'sda-btu-active');
      html.setAttribute(MARK, '1');
    }
    if (document.body && document.body.classList) {
      document.body.classList.add('sda-btu-page', 'sda-btu-active');
    }
  }

  /** Container WDNA costuma clippar — sobe #sda-calculadora para filho direto do body, antes do rodapé */
  function reparentCalculator(root, footer) {
    var body = document.body;
    if (!root || !body || root.parentNode === body) {
      if (footer && footer.parentNode && root && root.parentNode !== footer.parentNode) {
        footer.parentNode.insertBefore(root, footer);
      }
      return;
    }
    var anchor = footer && footer.parentNode ? footer : null;
    if (anchor) {
      anchor.insertBefore(root, footer);
      return;
    }
    body.appendChild(root);
  }

  function ensureSpacer(footer) {
    if (!footer || !footer.parentNode) return null;
    var sp = document.getElementById(SPACER_ID);
    if (!sp) {
      sp = document.createElement('div');
      sp.id = SPACER_ID;
      sp.setAttribute('aria-hidden', 'true');
      footer.parentNode.insertBefore(sp, footer);
    } else if (sp.nextElementSibling !== footer) {
      footer.parentNode.insertBefore(sp, footer);
    }
    return sp;
  }

  function pinBlockStatic(el) {
    if (!el || !el.style) return;
    el.style.setProperty('position', 'static', 'important');
    el.style.setProperty('bottom', 'auto', 'important');
    el.style.setProperty('top', 'auto', 'important');
    el.style.setProperty('left', 'auto', 'important');
    el.style.setProperty('right', 'auto', 'important');
    el.style.setProperty('transform', 'none', 'important');
    el.style.setProperty('float', 'none', 'important');
    el.style.setProperty('margin-top', '32px', 'important');
    el.style.setProperty('width', '100%', 'important');
    el.style.setProperty('max-width', 'none', 'important');
  }

  function unwrapFixedAncestors(root, footer) {
    var el = root ? root.parentElement : null;
    while (el && el !== document.body && el !== footer) {
      try {
        var st = window.getComputedStyle(el);
        if (
          st &&
          (st.overflow === 'hidden' || st.overflowY === 'hidden' || st.maxHeight !== 'none')
        ) {
          el.style.setProperty('overflow', 'visible', 'important');
          el.style.setProperty('overflow-y', 'visible', 'important');
          el.style.setProperty('max-height', 'none', 'important');
          el.style.setProperty('height', 'auto', 'important');
        }
      } catch (e1) {
        /* ignore */
      }
      el = el.parentElement;
    }
  }

  function fixBottomFixedLayers(root) {
    if (!root || !document.body) return 0;
    var rootRect = root.getBoundingClientRect();
    var bandTop = rootRect.bottom - 40;
    var all = document.body.querySelectorAll('*');
    var pad = 0;
    var i;
    for (i = 0; i < all.length; i++) {
      var el = all[i];
      if (isIgnored(el)) continue;
      if (el === root || root.contains(el)) continue;
      var st;
      try {
        st = window.getComputedStyle(el);
      } catch (e2) {
        continue;
      }
      if (!st || (st.position !== 'fixed' && st.position !== 'sticky')) continue;
      if (st.display === 'none' || st.visibility === 'hidden') continue;
      var rect = el.getBoundingClientRect();
      if (rect.height < 24 || rect.width < window.innerWidth * 0.35) continue;
      if (rect.top > window.innerHeight * 0.55 && rect.top < bandTop + 220) {
        pinBlockStatic(el);
        pad = Math.max(pad, rect.height + 24);
      }
    }
    return pad;
  }

  function measureAndPad(root, footer, spacer) {
    if (!root) return;
    if (footer) pinBlockStatic(footer);
    var extra = fixBottomFixedLayers(root);
    var rootRect = root.getBoundingClientRect();
    var footRect = footer ? footer.getBoundingClientRect() : { top: rootRect.bottom, height: 0 };
    var overlap = rootRect.bottom - footRect.top + 32;
    var footerH = footer ? footer.offsetHeight || footRect.height || 0 : 0;
    var clearance = Math.max(160, extra, overlap, footerH + 64);
    if (spacer) {
      spacer.style.height = clearance + 'px';
      spacer.style.minHeight = clearance + 'px';
    }
    document.documentElement.style.setProperty('--sda-btu-clearance', clearance + 'px');
    document.documentElement.style.setProperty('--sda-btu-spacer-h', clearance + 'px');
    if (document.body && document.body.style) {
      document.body.style.setProperty('padding-bottom', clearance + 'px', 'important');
    }
    root.style.setProperty('margin-bottom', Math.max(48, clearance * 0.35) + 'px', 'important');
    window.sdaBtuLayoutState = {
      clearance: clearance,
      footer: footer ? footer.className || footer.tagName : null,
      reparented: root.parentNode === document.body,
    };
  }

  function applyLayoutFix() {
    var root = calcRoot();
    if (!root) return;
    markPage();
    var footer = findStoreFooter(root);
    reparentCalculator(root, footer);
    unwrapFixedAncestors(root, footer);
    if (!footer) footer = findStoreFooter(root);
    if (footer) ensureSpacer(footer);
    var spacer = document.getElementById(SPACER_ID);
    measureAndPad(root, footer, spacer);
  }

  function scheduleFix() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      applyLayoutFix();
    });
  }

  window.sdaBtuApplyLayoutFix = applyLayoutFix;

  function boot() {
    if (!calcRoot()) return;
    applyLayoutFix();
    window.addEventListener('resize', scheduleFix);
    window.addEventListener('load', scheduleFix);
    window.addEventListener('scroll', scheduleFix, { passive: true });
    if (typeof ResizeObserver !== 'undefined') {
      try {
        var ro = new ResizeObserver(scheduleFix);
        ro.observe(calcRoot());
        var footer = findStoreFooter(calcRoot());
        if (footer) ro.observe(footer);
      } catch (e3) {
        /* ignore */
      }
    }
    setTimeout(scheduleFix, 300);
    setTimeout(scheduleFix, 900);
    setTimeout(scheduleFix, 2500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  if (!window.__SDA_BTU_LAYOUT_CDN_OK__) {
    window.__SDA_BTU_LAYOUT_CDN_OK__ = true;
  }
})();
