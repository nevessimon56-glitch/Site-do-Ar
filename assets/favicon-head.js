/**
 * Favicon Site Do Ar — floco + folha azul
 * Publicar em: assets/favicon-head.js
 * No layout/theme.liquid, dentro do <head>:
 *   <script src="{{ 'assets/favicon-head.js' | themeAssetUrl }}"></script>
 */
(function () {
  'use strict';

  var SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">' +
    '<rect width="48" height="48" fill="#000"/>' +
    '<g fill="#2c8fd6" stroke="#2c8fd6" stroke-width="1.2" stroke-linecap="round">' +
    '<path d="M12 24h6M9.5 19.5l3 3M9.5 28.5l3-3M15 15v6M15 27v6" fill="none"/>' +
    '<path d="M24 13v22M20.5 17h7M20.5 31h7" fill="none"/>' +
    '<path d="M29 18c1.8 1.6 4.2 3.8 4.2 6s-2.4 4.4-4.2 6M35 18c-1.8 1.6-4.2 3.8-4.2 6s2.4 4.4 4.2 6M29 30c1.8-1.6 4.2-3.8 4.2-6s-2.4-4.4-4.2-6" fill="none"/>' +
    '</g></svg>';

  var href = 'data:image/svg+xml,' + encodeURIComponent(SVG);

  function setIcon(rel, sizes) {
    var link = document.createElement('link');
    link.rel = rel;
    link.type = 'image/svg+xml';
    link.href = href;
    if (sizes) link.setAttribute('sizes', sizes);
    document.head.appendChild(link);
  }

  var existing = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
  if (!existing || (existing.href && existing.href.indexOf('data:') === -1 && existing.href.indexOf('webp') !== -1)) {
    setIcon('icon', '48x48');
    setIcon('apple-touch-icon', '180x180');
  }
})();
