/**
 * Calculadora BTUs — corrige footer fixo sobrepondo o conteúdo (WDNA theme-schema).
 * Carregado pelo theme.liquid; no-op se não houver #sda-calculadora.
 */
(function () {
  'use strict';

  var SPACER_ID = 'sda-btu-footer-spacer';
  var scheduled = false;

  function calcRoot() {
    return document.getElementById('sda-calculadora');
  }

  function isPanelFooter(el) {
    if (!el || !el.closest) return false;
    if (el.closest('#sda-calculadora')) return true;
    if (el.closest('.sidenav-overlay')) return true;
    if (el.closest('.sidenav-overlay_favorites')) return true;
    if (el.closest('.card-footer')) return true;
    return false;
  }

  function findStoreFooter(root) {
    var selectors =
      'body > footer, body > .footer, footer.footer, #footer, .store-footer, .rodape, .main-footer, section.footer';
    var nodes = document.querySelectorAll(selectors);
    var i;
    var best = null;
    for (i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (!el || isPanelFooter(el)) continue;
      if (root && (el === root || root.contains(el))) continue;
      best = el;
    }
    if (best) return best;
    var fallbacks = document.querySelectorAll('footer, .footer');
    for (i = fallbacks.length - 1; i >= 0; i--) {
      el = fallbacks[i];
      if (!el || isPanelFooter(el)) continue;
      if (root && root.contains(el)) continue;
      return el;
    }
    return null;
  }

  function markPage() {
    var html = document.documentElement;
    if (html && html.classList) {
      html.classList.add('sda-btu-page', 'sda-btu-active');
    }
    if (document.body && document.body.classList) {
      document.body.classList.add('sda-btu-page', 'sda-btu-active');
    }
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

  function pinFooterStatic(footer) {
    if (!footer || !footer.style) return;
    footer.style.setProperty('position', 'static', 'important');
    footer.style.setProperty('bottom', 'auto', 'important');
    footer.style.setProperty('top', 'auto', 'important');
    footer.style.setProperty('transform', 'none', 'important');
    footer.style.setProperty('float', 'none', 'important');
    footer.style.setProperty('width', '100%', 'important');
  }

  function measureAndPad(root, footer, spacer) {
    if (!root || !footer) return;
    pinFooterStatic(footer);
    var rootRect = root.getBoundingClientRect();
    var footRect = footer.getBoundingClientRect();
    var overlap = rootRect.bottom - footRect.top + 24;
    var footerH = footRect.height || footer.offsetHeight || 0;
    var clearance = Math.max(0, overlap, footerH + 48);
    if (spacer) {
      spacer.style.setProperty('--sda-btu-spacer-h', clearance + 'px');
      spacer.style.height = clearance + 'px';
    }
    document.documentElement.style.setProperty('--sda-btu-clearance', clearance + 'px');
    if (document.body && document.body.style) {
      document.body.style.setProperty('padding-bottom', clearance + 'px', 'important');
    }
  }

  function applyLayoutFix() {
    var root = calcRoot();
    if (!root) return;
    markPage();
    var footer = findStoreFooter(root);
    if (!footer) return;
    ensureSpacer(footer);
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
    if (typeof ResizeObserver !== 'undefined') {
      try {
        var ro = new ResizeObserver(scheduleFix);
        ro.observe(calcRoot());
        var footer = findStoreFooter(calcRoot());
        if (footer) ro.observe(footer);
      } catch (e) {
        /* ignore */
      }
    }
    setTimeout(scheduleFix, 400);
    setTimeout(scheduleFix, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
