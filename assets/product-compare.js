/**
 * ARQUIVO: assets/product-compare.js
 * VERSAO: 2026-07-30-compare-v2-area
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'site-do-ar-compare-v1';
  var state = { first: null, second: null };

  function formatMoney(value) {
    var num = Number(value);
    if (!isFinite(num)) return '—';
    try {
      return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } catch (e) {
      return 'R$ ' + num.toFixed(2).replace('.', ',');
    }
  }

  function parseProductJson(el) {
    if (!el) return null;
    try {
      return JSON.parse(el.textContent || el.innerText || '{}');
    } catch (e) {
      return null;
    }
  }

  function getProductDataFromCard(card) {
    if (!card) return null;
    var root = card.closest('.showcase-product, .showcase-item, .product-main, .product-content') || card;
    var jsonEl = root.querySelector('.product-compare-json');
    if (jsonEl) return parseProductJson(jsonEl);
    var btn = card.querySelector('[data-compare-product]');
    if (btn) {
      try {
        return JSON.parse(btn.getAttribute('data-compare-product'));
      } catch (e) {}
    }
    return null;
  }

  function extractBtu(title) {
    var text = String(title || '');
    var match = text.match(/(\d{1,2})[\.\s]?(\d{3})\s*btus?/i) || text.match(/(\d{4,5})\s*btus?/i);
    if (!match) return null;
    if (match[2]) return parseInt(match[1] + match[2], 10);
    return parseInt(match[1], 10);
  }

  function parseAreaRange(text) {
    var raw = String(text || '').toLowerCase().replace(/m2/g, 'm²');
    var range = raw.match(/(\d{1,3})\s*(?:a|até|ate|-|–)\s*(\d{1,3})\s*m²/);
    if (range) {
      return {
        display: range[1] + '–' + range[2] + ' m²',
        min: parseInt(range[1], 10),
        max: parseInt(range[2], 10),
        source: 'ficha'
      };
    }
    var ate = raw.match(/at[eé]\s*(\d{1,3})\s*m²/);
    if (ate) {
      var maxOnly = parseInt(ate[1], 10);
      return {
        display: 'Até ' + maxOnly + ' m²',
        min: 0,
        max: maxOnly,
        source: 'ficha'
      };
    }
    var single = raw.match(/(\d{1,3})\s*m²/);
    if (single) {
      var value = parseInt(single[1], 10);
      return {
        display: value + ' m²',
        min: value,
        max: value,
        source: 'ficha'
      };
    }
    return null;
  }

  function parseAreaFromAttributes(attributes) {
    if (!attributes || !attributes.length) return null;
    for (var i = 0; i < attributes.length; i++) {
      var name = String(attributes[i].name || '').toLowerCase();
      var value = String(attributes[i].value || '').trim();
      if (!value) continue;
      if (name.indexOf('área') !== -1 || name.indexOf('area') !== -1 || name.indexOf('ambiente') !== -1) {
        var parsed = parseAreaRange(value);
        if (parsed) return parsed;
        return { display: value, min: null, max: null, source: 'ficha' };
      }
    }
    return null;
  }

  function estimateAreaFromBtu(btu) {
    if (!btu) return null;
    var table = [
      { btu: 9000, min: 12, max: 15 },
      { btu: 12000, min: 15, max: 22 },
      { btu: 18000, min: 20, max: 30 },
      { btu: 24000, min: 30, max: 40 },
      { btu: 30000, min: 40, max: 50 },
      { btu: 36000, min: 50, max: 60 },
      { btu: 48000, min: 65, max: 80 },
      { btu: 56000, min: 80, max: 95 }
    ];
    for (var i = 0; i < table.length; i++) {
      if (btu <= Math.round(table[i].btu * 1.1)) {
        return {
          display: table[i].min + '–' + table[i].max + ' m² (estimativa)',
          min: table[i].min,
          max: table[i].max,
          source: 'estimativa'
        };
      }
    }
    var minM2 = Math.round(btu / 800);
    var maxM2 = Math.round(btu / 600);
    return {
      display: minM2 + '–' + maxM2 + ' m² (estimativa)',
      min: minM2,
      max: maxM2,
      source: 'estimativa'
    };
  }

  function resolveRecommendedArea(data, btu) {
    var specs = data.specs || {};
    if (specs.recommendedArea) {
      var fromSpecField = parseAreaRange(specs.recommendedArea) || {
        display: specs.recommendedArea,
        min: null,
        max: null,
        source: 'ficha'
      };
      return fromSpecField;
    }
    var fromAttributes = parseAreaFromAttributes(data.attributes || []);
    if (fromAttributes) return fromAttributes;
    var fromText = parseAreaRange(data.searchText || '');
    if (fromText) return fromText;
    var estimated = estimateAreaFromBtu(btu);
    if (estimated) return estimated;
    return { display: '—', min: null, max: null, source: 'none' };
  }

  function enrichProduct(data) {
    if (!data) return null;
    var specs = data.specs || {};
    var btu = extractBtu(data.title);
    var cycle = '—';
    if (specs.quenteFrio) cycle = 'Quente/Frio';
    else if (specs.frio) cycle = 'Só Frio';
    var area = resolveRecommendedArea(data, btu);

    return {
      id: String(data.id),
      title: data.title || '',
      url: data.url || '#',
      image: data.image || '',
      pixPrice: Number(data.pixPrice) || 0,
      listPrice: Number(data.listPrice) || 0,
      btu: btu,
      recommendedArea: area.display,
      areaMin: area.min,
      areaMax: area.max,
      areaSource: area.source,
      cycle: cycle,
      inverter: !!specs.inverter,
      wifi: !!specs.wifi,
      cobre: !!specs.cobre,
      procelA: !!specs.procelA,
      voltage: specs.voltage || '—',
      type: specs.type || '—',
      attributes: Array.isArray(data.attributes) ? data.attributes : []
    };
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ first: state.first, second: state.second }));
    } catch (e) {}
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var parsed = JSON.parse(raw);
      state.first = parsed.first || null;
      state.second = parsed.second || null;
    } catch (e) {
      state.first = null;
      state.second = null;
    }
  }

  function clearState() {
    state.first = null;
    state.second = null;
    saveState();
    syncButtons();
    updateBar();
  }

  function isSelected(id) {
    id = String(id);
    return (state.first && state.first.id === id) || (state.second && state.second.id === id);
  }

  function syncButtons() {
    var buttons = document.querySelectorAll('.showcase-compare-btn, .product-compare-btn');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var id = btn.getAttribute('data-compare-id');
      var selected = isSelected(id);
      btn.classList.toggle('is-selected', selected);
      btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
      btn.textContent = selected ? 'Selecionado' : 'Comparar';
    }
  }

  function updateBar() {
    var bar = document.getElementById('product-compare-bar');
    if (!bar) return;

    var count = (state.first ? 1 : 0) + (state.second ? 1 : 0);
    if (count === 0) {
      bar.hidden = true;
      bar.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('has-compare-bar');
      return;
    }

    bar.hidden = false;
    bar.setAttribute('aria-hidden', 'false');
    document.body.classList.add('has-compare-bar');

    var countEl = bar.querySelector('[data-compare-bar-count]');
    var textEl = bar.querySelector('[data-compare-bar-text]');
    var openBtn = bar.querySelector('[data-compare-bar-open]');

    if (countEl) countEl.textContent = String(count);
    if (textEl) {
      if (count === 1 && state.first) {
        textEl.textContent = '“' + truncate(state.first.title, 42) + '” — escolha outro produto';
      } else if (state.first && state.second) {
        textEl.textContent = 'Pronto para comparar os 2 produtos';
      }
    }
    if (openBtn) openBtn.disabled = count < 2;
  }

  function truncate(str, max) {
    str = String(str || '');
    return str.length > max ? str.slice(0, max - 1) + '…' : str;
  }

  function selectProduct(product) {
    if (!product) return;

    if (state.first && state.first.id === product.id) {
      state.first = state.second;
      state.second = null;
      saveState();
      syncButtons();
      updateBar();
      return;
    }
    if (state.second && state.second.id === product.id) {
      state.second = null;
      saveState();
      syncButtons();
      updateBar();
      return;
    }

    if (!state.first) {
      state.first = product;
    } else if (!state.second) {
      state.second = product;
      openPanel();
    } else {
      state.second = product;
      openPanel();
    }

    saveState();
    syncButtons();
    updateBar();

    if (state.first && state.second) {
      openPanel();
    }
  }

  function getCompareRows(a, b) {
    return [
      { key: 'pixPrice', label: 'Preço no Pix', a: formatMoney(a.pixPrice), b: formatMoney(b.pixPrice), rawA: a.pixPrice, rawB: b.pixPrice },
      { key: 'listPrice', label: 'Preço de tabela', a: formatMoney(a.listPrice), b: formatMoney(b.listPrice), rawA: a.listPrice, rawB: b.listPrice },
      { key: 'btu', label: 'Capacidade (BTU)', a: a.btu ? a.btu.toLocaleString('pt-BR') + ' BTUs' : '—', b: b.btu ? b.btu.toLocaleString('pt-BR') + ' BTUs' : '—', rawA: a.btu || 0, rawB: b.btu || 0 },
      { key: 'area', label: 'Área recomendada', a: a.recommendedArea || '—', b: b.recommendedArea || '—', rawA: a.areaMax || a.areaMin || 0, rawB: b.areaMax || b.areaMin || 0 },
      { key: 'type', label: 'Tipo', a: a.type, b: b.type },
      { key: 'cycle', label: 'Ciclo', a: a.cycle, b: b.cycle },
      { key: 'inverter', label: 'Tecnologia', a: a.inverter ? 'Inverter' : 'Convencional', b: b.inverter ? 'Inverter' : 'Convencional', boolA: a.inverter, boolB: b.inverter },
      { key: 'voltage', label: 'Voltagem', a: a.voltage, b: b.voltage },
      { key: 'wifi', label: 'Wi-Fi', a: a.wifi ? 'Sim' : 'Não', b: b.wifi ? 'Sim' : 'Não', boolA: a.wifi, boolB: b.wifi },
      { key: 'cobre', label: 'Serpentina', a: a.cobre ? 'Cobre' : '—', b: b.cobre ? 'Cobre' : '—', boolA: a.cobre, boolB: b.cobre },
      { key: 'procelA', label: 'Procel', a: a.procelA ? 'Classe A' : '—', b: b.procelA ? 'Classe A' : '—', boolA: a.procelA, boolB: b.procelA }
    ];
  }

  function buildInsights(a, b) {
    var prosA = [];
    var consA = [];
    var prosB = [];
    var consB = [];

    if (a.pixPrice > 0 && b.pixPrice > 0) {
      if (a.pixPrice < b.pixPrice) {
        prosA.push('Menor preço no Pix (' + formatMoney(a.pixPrice) + ' vs ' + formatMoney(b.pixPrice) + ')');
        consB.push('Preço no Pix mais alto');
      } else if (b.pixPrice < a.pixPrice) {
        prosB.push('Menor preço no Pix (' + formatMoney(b.pixPrice) + ' vs ' + formatMoney(a.pixPrice) + ')');
        consA.push('Preço no Pix mais alto');
      }
    }

    if (a.btu && b.btu) {
      if (a.btu > b.btu) {
        prosA.push('Maior capacidade de refrigeração (' + a.btu.toLocaleString('pt-BR') + ' BTUs)');
        consB.push('Capacidade menor — pode não refrigerar bem ambientes amplos');
      } else if (b.btu > a.btu) {
        prosB.push('Maior capacidade de refrigeração (' + b.btu.toLocaleString('pt-BR') + ' BTUs)');
        consA.push('Capacidade menor — pode não refrigerar bem ambientes amplos');
      }
    }

    if (a.areaMax && b.areaMax) {
      if (a.areaMax > b.areaMax) {
        prosA.push('Cobre área maior (' + a.recommendedArea + ')');
        consB.push('Área recomendada menor (' + b.recommendedArea + ')');
      } else if (b.areaMax > a.areaMax) {
        prosB.push('Cobre área maior (' + b.recommendedArea + ')');
        consA.push('Área recomendada menor (' + a.recommendedArea + ')');
      }
    } else if (a.recommendedArea !== '—' && b.recommendedArea === '—') {
      prosA.push('Área recomendada informada (' + a.recommendedArea + ')');
    } else if (b.recommendedArea !== '—' && a.recommendedArea === '—') {
      prosB.push('Área recomendada informada (' + b.recommendedArea + ')');
    }

    if (a.areaSource === 'ficha' && b.areaSource === 'estimativa') {
      prosA.push('Área recomendada confirmada na ficha técnica');
    } else if (b.areaSource === 'ficha' && a.areaSource === 'estimativa') {
      prosB.push('Área recomendada confirmada na ficha técnica');
    }

    if (a.inverter && !b.inverter) {
      prosA.push('Tecnologia Inverter — tende a consumir menos energia');
      consB.push('Sem Inverter — consumo elétrico tende a ser maior');
    } else if (b.inverter && !a.inverter) {
      prosB.push('Tecnologia Inverter — tende a consumir menos energia');
      consA.push('Sem Inverter — consumo elétrico tende a ser maior');
    }

    if (a.procelA && !b.procelA) {
      prosA.push('Selo Procel classe A — maior eficiência energética');
      consB.push('Sem classificação Procel A destacada');
    } else if (b.procelA && !a.procelA) {
      prosB.push('Selo Procel classe A — maior eficiência energética');
      consA.push('Sem classificação Procel A destacada');
    }

    if (a.wifi && !b.wifi) {
      prosA.push('Controle via Wi-Fi pelo celular');
      consB.push('Sem Wi-Fi integrado');
    } else if (b.wifi && !a.wifi) {
      prosB.push('Controle via Wi-Fi pelo celular');
      consA.push('Sem Wi-Fi integrado');
    }

    if (a.cobre && !b.cobre) {
      prosA.push('Serpentina de cobre — melhor troca térmica');
      consB.push('Sem serpentina de cobre informada');
    } else if (b.cobre && !a.cobre) {
      prosB.push('Serpentina de cobre — melhor troca térmica');
      consA.push('Sem serpentina de cobre informada');
    }

    if (a.cycle === 'Quente/Frio' && b.cycle === 'Só Frio') {
      prosA.push('Ciclo Quente/Frio — também aquece no inverno');
      consB.push('Apenas refrigeração (Só Frio)');
    } else if (b.cycle === 'Quente/Frio' && a.cycle === 'Só Frio') {
      prosB.push('Ciclo Quente/Frio — também aquece no inverno');
      consA.push('Apenas refrigeração (Só Frio)');
    }

    if (!prosA.length) prosA.push('Opção equilibrada para o perfil do ambiente');
    if (!prosB.length) prosB.push('Opção equilibrada para o perfil do ambiente');
    if (!consA.length) consA.push('Nenhum ponto crítico em relação ao outro modelo');
    if (!consB.length) consB.push('Nenhum ponto crítico em relação ao outro modelo');

    return { prosA: prosA, consA: consA, prosB: prosB, consB: consB };
  }

  function renderList(el, items) {
    if (!el) return;
    el.innerHTML = '';
    for (var i = 0; i < items.length; i++) {
      var li = document.createElement('li');
      li.textContent = items[i];
      el.appendChild(li);
    }
  }

  function openPanel() {
    if (!state.first || !state.second) return;

    var panel = document.getElementById('product-compare-panel');
    if (!panel) return;

    var a = state.first;
    var b = state.second;
    var rows = getCompareRows(a, b);
    var insights = buildInsights(a, b);

    var productsEl = panel.querySelector('[data-compare-products]');
    if (productsEl) {
      productsEl.innerHTML =
        productCardHtml(a, 'A') +
        '<div class="product-compare-panel__vs" aria-hidden="true">VS</div>' +
        productCardHtml(b, 'B');
    }

    var head = panel.querySelector('[data-compare-table-head]');
    var body = panel.querySelector('[data-compare-table-body]');
    if (head) {
      head.innerHTML =
        '<tr><th>Especificação</th><th>Produto A</th><th>Produto B</th></tr>';
    }
    if (body) {
      var html = '';
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var classA = '';
        var classB = '';
        if (row.key === 'pixPrice' && row.rawA && row.rawB) {
          classA = row.rawA < row.rawB ? ' is-better' : '';
          classB = row.rawB < row.rawA ? ' is-better' : '';
        }
        if (row.key === 'btu' && row.rawA && row.rawB) {
          classA = row.rawA > row.rawB ? ' is-better' : '';
          classB = row.rawB > row.rawA ? ' is-better' : '';
        }
        if (row.key === 'area' && row.rawA && row.rawB) {
          classA = row.rawA > row.rawB ? ' is-better' : '';
          classB = row.rawB > row.rawA ? ' is-better' : '';
        }
        if (typeof row.boolA === 'boolean') {
          classA = row.boolA && !row.boolB ? ' is-better' : '';
          classB = row.boolB && !row.boolA ? ' is-better' : '';
        }
        html +=
          '<tr><th>' + row.label + '</th>' +
          '<td class="product-compare-table__val' + classA + '">' + row.a + '</td>' +
          '<td class="product-compare-table__val' + classB + '">' + row.b + '</td></tr>';
      }
      body.innerHTML = html;
    }

    var titleA = panel.querySelector('[data-compare-insight-title-a]');
    var titleB = panel.querySelector('[data-compare-insight-title-b]');
    if (titleA) titleA.textContent = truncate(a.title, 60);
    if (titleB) titleB.textContent = truncate(b.title, 60);

    renderList(panel.querySelector('[data-compare-pros-a]'), insights.prosA);
    renderList(panel.querySelector('[data-compare-cons-a]'), insights.consA);
    renderList(panel.querySelector('[data-compare-pros-b]'), insights.prosB);
    renderList(panel.querySelector('[data-compare-cons-b]'), insights.consB);

    panel.hidden = false;
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('compare-panel-open');
  }

  function productCardHtml(product, label) {
    var img = product.image
      ? '<img src="' + product.image + '" alt="" loading="lazy">'
      : '<span class="product-compare-card__placeholder">Sem imagem</span>';
    return (
      '<article class="product-compare-card">' +
        '<span class="product-compare-card__badge">Produto ' + label + '</span>' +
        '<a class="product-compare-card__image" href="' + product.url + '">' + img + '</a>' +
        '<h3 class="product-compare-card__title"><a href="' + product.url + '">' + truncate(product.title, 70) + '</a></h3>' +
        '<p class="product-compare-card__price">' + formatMoney(product.pixPrice) + ' <span>no Pix</span></p>' +
      '</article>'
    );
  }

  function closePanel() {
    var panel = document.getElementById('product-compare-panel');
    if (!panel) return;
    panel.hidden = true;
    panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('compare-panel-open');
  }

  function onCompareClick(btn) {
    var card = btn.closest('.showcase-product, .product-main, .product-content, .product-buy');
    var data = getProductDataFromCard(card || btn.closest('.showcase-item'));
    if (!data && btn.getAttribute('data-compare-product')) {
      try {
        data = JSON.parse(btn.getAttribute('data-compare-product'));
      } catch (e) {}
    }
    var product = enrichProduct(data);
    if (!product) return;
    selectProduct(product);
  }

  function bindButtons(root) {
    root = root || document;
    var buttons = root.querySelectorAll('.showcase-compare-btn:not([data-compare-bound]), .product-compare-btn:not([data-compare-bound])');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('data-compare-bound', '1');
      buttons[i].addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        onCompareClick(this);
      });
    }
  }

  function bindPanel() {
    var panel = document.getElementById('product-compare-panel');
    if (!panel || panel.getAttribute('data-bound') === '1') return;
    panel.setAttribute('data-bound', '1');

    var closers = panel.querySelectorAll('[data-compare-close]');
    for (var i = 0; i < closers.length; i++) {
      closers[i].addEventListener('click', closePanel);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePanel();
    });
  }

  function bindBar() {
    var bar = document.getElementById('product-compare-bar');
    if (!bar || bar.getAttribute('data-bound') === '1') return;
    bar.setAttribute('data-bound', '1');

    var clearBtn = bar.querySelector('[data-compare-bar-clear]');
    var openBtn = bar.querySelector('[data-compare-bar-open]');
    if (clearBtn) clearBtn.addEventListener('click', clearState);
    if (openBtn) openBtn.addEventListener('click', openPanel);
  }

  function init() {
    loadState();
    bindPanel();
    bindBar();
    bindButtons(document);
    syncButtons();
    updateBar();

    if (typeof MutationObserver !== 'undefined') {
      var observer = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          if (mutations[i].addedNodes.length) {
            bindButtons(document);
            syncButtons();
          }
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  window.initProductCompare = init;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
