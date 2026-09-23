/**
 * Calculadora BTUs — layout vs rodapé WDNA (v3: sem reparent, sem faixa branca gigante).
 */
(function () {
  'use strict';

  var SPACER_ID = 'sda-btu-footer-spacer';
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
    if (el.id === SPACER_ID) return true;
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
      '.footer-container',
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
    return best;
  }

  function markPage() {
    var html = document.documentElement;
    if (html && html.classList) {
      html.classList.add('sda-btu-page', 'sda-btu-active');
      html.setAttribute(MARK, '3');
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

  function pinBlockStatic(el) {
    if (!el || !el.style) return;
    el.style.setProperty('position', 'static', 'important');
    el.style.setProperty('bottom', 'auto', 'important');
    el.style.setProperty('top', 'auto', 'important');
    el.style.setProperty('transform', 'none', 'important');
    el.style.setProperty('float', 'none', 'important');
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

  function measureAndPad(root, footer, spacer) {
    if (!root) return;
    if (footer) pinBlockStatic(footer);

    var rootRect = root.getBoundingClientRect();
    var footRect = footer
      ? footer.getBoundingClientRect()
      : { top: rootRect.bottom + 999, height: 0 };
    var overlap = Math.ceil(rootRect.bottom - footRect.top + 8);
    var clearance = overlap > 4 ? Math.min(overlap + 16, 120) : 0;

    if (spacer) {
      spacer.style.height = clearance ? clearance + 'px' : '0px';
      spacer.style.minHeight = clearance ? clearance + 'px' : '0px';
      spacer.style.display = clearance ? 'block' : 'none';
    }

    document.documentElement.style.setProperty('--sda-btu-clearance', clearance + 'px');
    document.documentElement.style.setProperty('--sda-btu-spacer-h', clearance + 'px');

    if (document.body && document.body.style) {
      if (clearance > 0) {
        document.body.style.setProperty('padding-bottom', clearance + 'px', 'important');
      } else {
        document.body.style.removeProperty('padding-bottom');
      }
    }

    root.style.removeProperty('margin-bottom');

    window.sdaBtuLayoutState = {
      version: 3,
      clearance: clearance,
      overlap: overlap,
      footer: footer ? footer.className || footer.tagName : null,
    };
  }

  function applyLayoutFix() {
    var root = calcRoot();
    if (!root) return;
    markPage();
    unwrapFixedAncestors(root, null);
    var footer = findStoreFooter(root);
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
    setTimeout(scheduleFix, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
