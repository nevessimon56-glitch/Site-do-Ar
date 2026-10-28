/**
 * Site do Ar — UX refactor (header sticky compact + helpers)
 */
(function () {
  'use strict';

  var header = document.querySelector('.header.header-v2');
  if (header) {
    header.id = header.id || 'sda-site-header';
    var compactThreshold = 100;
    var ticking = false;

    function syncHeaderCompact() {
      ticking = false;
      if (window.innerWidth < 992) {
        header.classList.remove('is-sticky-compact');
        return;
      }
      if (window.scrollY > compactThreshold) {
        header.classList.add('is-sticky-compact');
      } else {
        header.classList.remove('is-sticky-compact');
      }
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(syncHeaderCompact);
        }
      },
      { passive: true }
    );
    window.addEventListener('resize', syncHeaderCompact, { passive: true });
    syncHeaderCompact();
  }
})();
