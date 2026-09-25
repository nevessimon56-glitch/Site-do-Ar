/**
 * Calculadora BTUs — layout WDNA v4: calculadora sempre ANTES do rodapé no DOM.
 */
(function () {
  'use strict';

  var MARK = 'data-sda-btu-layout';
  var scheduled = false;

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
    return false;
  }

  /** Último bloco grande do body (theme-schema / rodapé WDNA) */
  function findMainFooter(root) {
    var body = document.body;
    if (!body) return null;
    var selectors =
      'footer, .footer, #footer, .store-footer, .footer-store, .rodape, .main-footer, [class*="footer-store"]';
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

    for (i = body.children.length - 1; i >= 0; i--) {
      var kid = body.children[i];
      if (!kid || kid.nodeType !== 1) continue;
      if (kid.tagName === 'SCRIPT' || kid.tagName === 'STYLE' || kid.tagName === 'LINK') continue;
      if (kid.id === 'diag360pop' || kid.id === 'diag360backdrop') continue;
      if (root && (kid === root || kid.contains(root))) continue;
      if (kid.offsetHeight < 80) continue;
      return kid;
    }
    return null;
  }

  function markPage() {
    document.documentElement.classList.add('sda-btu-page', 'sda-btu-active');
    document.documentElement.setAttribute(MARK, '4');
    if (document.body) document.body.classList.add('sda-btu-page', 'sda-btu-active');
  }

  function fixDomOrder(root, footer) {
    if (!root || !footer || !footer.parentNode) return false;
    if (footer === root || footer.contains(root)) return false;
    footer.parentNode.insertBefore(root, footer);
    return true;
  }

  function pinFooterStatic(el) {
    if (!el || !el.style) return;
    el.style.setProperty('position', 'static', 'important');
    el.style.setProperty('bottom', 'auto', 'important');
    el.style.setProperty('top', 'auto', 'important');
    el.style.setProperty('transform', 'none', 'important');
  }

  function unwrapAncestors(root) {
    var el = root ? root.parentElement : null;
    while (el && el !== document.body) {
      try {
        var st = window.getComputedStyle(el);
        if (st && (st.overflow === 'hidden' || st.overflowY === 'hidden' || st.maxHeight !== 'none')) {
          el.style.setProperty('overflow', 'visible', 'important');
          el.style.setProperty('max-height', 'none', 'important');
          el.style.setProperty('height', 'auto', 'important');
        }
      } catch (e1) {
        /* ignore */
      }
      el = el.parentElement;
    }
  }

  function applyLayoutFix() {
    var root = calcRoot();
    if (!root) return;
    markPage();
    unwrapAncestors(root);
    var footer = findMainFooter(root);
    var moved = footer ? fixDomOrder(root, footer) : false;
    if (footer) pinFooterStatic(footer);
    if (document.body && document.body.style) {
      document.body.style.removeProperty('padding-bottom');
    }
    var oldSp = document.getElementById('sda-btu-footer-spacer');
    if (oldSp && oldSp.parentNode) oldSp.parentNode.removeChild(oldSp);

    window.sdaBtuLayoutState = {
      version: 4,
      moved: moved,
      footer: footer ? (footer.className || footer.tagName) : null,
      calcBeforeFooter: footer
        ? !!(footer.compareDocumentPosition(root) & Node.DOCUMENT_POSITION_PRECEDING)
        : null,
    };
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
    setTimeout(applyLayoutFix, 300);
    setTimeout(applyLayoutFix, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
