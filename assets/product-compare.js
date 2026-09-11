/**
 * ARQUIVO: assets/product-compare.js
 * VERSAO: 2026-09-11-compare-v8 — até 3 produtos, descrição, botão comprar
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'site-do-ar-compare-v3';
  var STORAGE_KEY_LEGACY = 'site-do-ar-compare-v2';
  var MAX_COMPARE = 3;
  var state = { items: [] };

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
    var tpl = root.querySelector('template.product-compare-data');
    if (tpl && tpl.innerHTML) {
      return parseProductJson({ textContent: tpl.innerHTML });
    }
    var legacy = root.querySelector('.product-compare-json');
    if (legacy) return parseProductJson(legacy);
    var btn = root.querySelector('[data-compare-product]');
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
      return { display: 'Até ' + maxOnly + ' m²', min: 0, max: maxOnly, source: 'ficha' };
    }
    var single = raw.match(/(\d{1,3})\s*m²/);
    if (single) {
      var value = parseInt(single[1], 10);
      return { display: value + ' m²', min: value, max: value, source: 'ficha' };
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
    if (data.area) {
      var fromArea = parseAreaRange(data.area);
      if (fromArea) return fromArea;
      return { display: data.area, min: null, max: null, source: 'ficha' };
    }
    if (specs.recommendedArea) {
      var fromSpecField = parseAreaRange(specs.recommendedArea) || {
        display: specs.recommendedArea,
        min: null,
        max: null,
        source: 'ficha'
      };
      return fromSpecField;
    }
    var fromText = parseAreaRange(data.areaHint || '');
    if (fromText) return fromText;
    var estimated = estimateAreaFromBtu(btu);
    if (estimated) return estimated;
    return { display: '—', min: null, max: null, source: 'none' };
  }

  var INTERNAL_ATTR_KEYS = [
    'productmaingridoption', 'maingridoption', 'gridoption', 'optionid', 'productid',
    'channel', 'integration', 'marketplace', 'serialized', 'payload', 'base64',
    'hash', 'token', 'compressed', 'meli_', 'ml_', 'json', 'script', 'html'
  ];

  var ALLOWED_EXTRA_ATTR_KEYS = [
    'garantia', 'warranty', 'potencia', 'power', 'dimens', 'altura', 'largura', 'profund',
    'peso', 'weight', 'cor', 'color', 'refrigerante', 'gas', 'ruido', 'noise', 'decibel',
    'funcoes', 'recursos', 'filtro', 'controle', 'display', 'timer', 'modalidade',
    'compressor', 'origem', 'pais', 'linha', 'serie', 'modelo comercial', 'consumo',
    'capacidade de aquecimento', 'umidade', 'velocidade', 'dreno', 'instalacao'
  ];

  function isInternalAttrKey(key, rawKey) {
    var k = normalizeAttrKey(key);
    if (!k) return true;
    for (var i = 0; i < INTERNAL_ATTR_KEYS.length; i++) {
      if (k.indexOf(INTERNAL_ATTR_KEYS[i]) !== -1) return true;
    }
    if (rawKey && /[a-z][A-Z]/.test(String(rawKey))) return true;
    if (k.indexOf(' ') === -1 && k.length > 24 && /^[a-z0-9_]+$/.test(k) === false && /[A-Z]/.test(String(rawKey || ''))) {
      return true;
    }
    return false;
  }

  function isGarbageAttrValue(value) {
    var v = String(value || '').trim();
    if (!v) return true;
    if (v.length > 100) return true;
    if (v.indexOf('H4sI') === 0) return true;
    if (/^[A-Za-z0-9+/=_-]{50,}$/.test(v)) return true;
    return false;
  }

  function isUsableAttribute(item) {
    if (!item || !item.k || !item.v) return false;
    if (isInternalAttrKey(item.k, item.l || item.k)) return false;
    if (isGarbageAttrValue(item.v)) return false;
    return true;
  }

  function normalizeAttrKey(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function buildAttrIndex(attrs) {
    var map = {};
    var labels = {};
    if (!attrs || !attrs.length) return { map: map, labels: labels };
    for (var i = 0; i < attrs.length; i++) {
      var item = attrs[i];
      if (!isUsableAttribute(item)) continue;
      var key = normalizeAttrKey(item.k);
      var val = String(item.v).trim();
      if (!key || !val) continue;
      map[key] = val;
      labels[key] = item.l || item.k || key;
    }
    return { map: map, labels: labels };
  }

  function findValueContaining(map, patterns, excludePatterns) {
    for (var key in map) {
      if (excludePatterns && attrKeyMatches(key, excludePatterns)) continue;
      if (isInternalAttrKey(key, key)) continue;
      var valNorm = normalizeAttrKey(map[key]);
      for (var i = 0; i < patterns.length; i++) {
        if (valNorm.indexOf(patterns[i]) !== -1) return map[key];
      }
    }
    return '';
  }

  function findAttr(map, patterns) {
    for (var key in map) {
      for (var i = 0; i < patterns.length; i++) {
        if (key.indexOf(patterns[i]) !== -1) return map[key];
      }
    }
    return '';
  }

  function attrKeyMatches(key, patterns) {
    for (var i = 0; i < patterns.length; i++) {
      if (key.indexOf(patterns[i]) !== -1) return true;
    }
    return false;
  }

  function parseBtuFromText(text) {
    var raw = String(text || '');
    var match = raw.match(/(\d{1,2})[\.\s]?(\d{3})\s*btus?/i) || raw.match(/(\d{4,5})\s*btus?/i) || raw.match(/(\d{4,5})/);
    if (!match) return null;
    if (match[2]) return parseInt(match[1] + match[2], 10);
    return parseInt(match[1], 10);
  }

  function parseCycleFromText(text) {
    var value = normalizeAttrKey(text);
    if (!value) return '';
    if (value.indexOf('quente') !== -1) return 'Quente/Frio';
    if (value.indexOf('frio') !== -1) return 'Só Frio';
    return String(text).trim();
  }

  function parseVoltageFromText(text) {
    var value = normalizeAttrKey(text);
    if (!value) return '';
    if (value.indexOf('220') !== -1) return '220V';
    if (value.indexOf('127') !== -1) return '127V';
    if (value.indexOf('110') !== -1 || value.indexOf('115') !== -1) return '110V';
    if (value.indexOf('380') !== -1) return '380V';
    if (value.indexOf('bivolt') !== -1 || value.indexOf('bi-volt') !== -1) return 'Bivolt';
    return String(text).trim();
  }

  function parseBoolFromText(text, positivePatterns) {
    var value = normalizeAttrKey(text);
    if (!value) return null;
    if (value === 'sim' || value === 'yes' || value === 'true') return true;
    if (value === 'nao' || value === 'não' || value === 'no' || value === 'false') return false;
    for (var i = 0; i < positivePatterns.length; i++) {
      if (value.indexOf(positivePatterns[i]) !== -1) return true;
    }
    return null;
  }

  function parseCoilFromText(text) {
    var value = normalizeAttrKey(text);
    if (!value) return null;
    if (value.indexOf('cobre') !== -1) return { cobre: true, aluminio: false, coil: 'Cobre' };
    if (value.indexOf('alum') !== -1) return { cobre: false, aluminio: true, coil: 'Alumínio' };
    return { cobre: false, aluminio: false, coil: String(text).trim() };
  }

  function parseProcelLabel(text) {
    var value = String(text || '').trim();
    if (!value) return '—';
    var norm = normalizeAttrKey(value);
    if (norm === 'a' || norm.indexOf('classe a') !== -1) return 'Classe A';
    if (norm === 'b' || norm.indexOf('classe b') !== -1) return 'Classe B';
    if (norm === 'c' || norm.indexOf('classe c') !== -1) return 'Classe C';
    return value;
  }

  function applyMlAttributes(product, attrs) {
    var index = buildAttrIndex(attrs);
    var map = index.map;
    var labels = index.labels;
    product.attrMap = map;
    product.attrLabels = labels;

    var btuAttr = findAttr(map, ['btu', 'capacidade de refrigera', 'capacidade em btu', 'cooling_capacity', 'capacidade nominal']);
    if (btuAttr) {
      var parsedBtu = parseBtuFromText(btuAttr);
      if (parsedBtu) product.btu = parsedBtu;
    }

    var areaAttr = findAttr(map, ['area recomendada', 'area de cobertura', 'ambiente recomendado', 'tamanho do ambiente', 'room_size', 'area minima', 'area maxima']);
    if (areaAttr) {
      var parsedArea = parseAreaRange(areaAttr);
      if (parsedArea) {
        product.recommendedArea = parsedArea.display;
        product.areaMin = parsedArea.min;
        product.areaMax = parsedArea.max;
        product.areaSource = 'atributo';
      } else {
        product.recommendedArea = areaAttr;
        product.areaSource = 'atributo';
      }
    }

    var typeAttr = findAttr(map, ['tipo de ar', 'tipo do ar', 'tipo de aparelho', 'tipo de equipamento', 'product_type', 'tipo split']);
    if (typeAttr) product.type = typeAttr;

    var cycleAttr = findAttr(map, ['ciclo', 'cooling_and_heating', 'funcao do ciclo', 'funcao ciclo', 'modo de operacao']);
    if (cycleAttr) product.cycle = parseCycleFromText(cycleAttr);

    var voltageAttr = findAttr(map, ['voltagem', 'voltage', 'tensao', 'alimentacao eletrica', 'line_voltage', 'tensao nominal']);
    if (voltageAttr) product.voltage = parseVoltageFromText(voltageAttr);

    var inverterAttr = findAttr(map, ['inverter', 'inversor', 'tecnologia do compressor', 'tipo de tecnologia', 'tecnologia']);
    if (inverterAttr) {
      var inverterBool = parseBoolFromText(inverterAttr, ['inverter', 'inversor']);
      if (inverterBool !== null) product.inverter = inverterBool;
    }

    var wifiAttr = findAttr(map, ['wi-fi', 'wifi', 'conectividade', 'compatibilidade wi-fi', 'smart']);
    if (wifiAttr) {
      var wifiBool = parseBoolFromText(wifiAttr, ['wi-fi', 'wifi', 'smart']);
      if (wifiBool !== null) product.wifi = wifiBool;
    }

    var coilAttr = findAttr(map, [
      'serpentina', 'material do evaporador', 'material da serpentina', 'material da tubulacao',
      'tubulacao', 'evaporador', 'trocador de calor', 'coil_material', 'material do condensador'
    ]);
    if (!coilAttr) {
      coilAttr = findValueContaining(map, ['cobre', 'aluminio', 'aluminium', 'copper'], ['refrigerante', 'gas']);
    }
    if (coilAttr) {
      var coilParsed = parseCoilFromText(coilAttr);
      if (coilParsed) {
        product.cobre = coilParsed.cobre;
        product.aluminio = coilParsed.aluminio;
        product.coil = coilParsed.coil;
      }
    }

    var procelAttr = findAttr(map, [
      'procel', 'eficiencia energ', 'classificacao energ', 'energy_efficiency', 'selo procel',
      'classe energetica', 'consumo energetico', 'seer', 'eer', 'efficiency'
    ]);
    if (!procelAttr) {
      procelAttr = findValueContaining(map, ['classe a', 'classe b', 'classe c', 'procel'], []);
    }
    if (procelAttr) {
      product.procelLabel = parseProcelLabel(procelAttr);
      var procelNorm = normalizeAttrKey(procelAttr);
      product.procelA = procelNorm === 'a' || procelNorm.indexOf('classe a') !== -1 || procelNorm.indexOf('procel a') !== -1;
    }

    return product;
  }

  function resolveCycle(specs) {
    if (specs.quenteFrio) return 'Quente/Frio';
    if (specs.frio) return 'Só Frio';
    if (specs.type === 'Janela') return 'Só Frio';
    return '—';
  }

  function resolveCoil(specs) {
    if (specs.cobre) return 'Cobre';
    if (specs.aluminio) return 'Alumínio';
    return '—';
  }

  function stripHtml(text) {
    return String(text || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function enrichProduct(data) {
    if (!data) return null;
    var specs = data.specs || {};
    var btu = extractBtu(data.title);
    var cycle = resolveCycle(specs);
    var coil = resolveCoil(specs);
    var area = resolveRecommendedArea(data, btu);
    var description = stripHtml(data.description || '');

    var product = {
      id: String(data.id),
      title: data.title || '',
      url: data.url || '#',
      image: data.image || '',
      description: description,
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
      aluminio: !!specs.aluminio,
      coil: coil,
      procelA: !!specs.procelA,
      procelLabel: specs.procelA ? 'Classe A' : '—',
      voltage: specs.voltage || '—',
      type: specs.type || '—',
      attrMap: {},
      attrLabels: {}
    };

    return applyMlAttributes(product, data.attrs || []);
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
    } catch (e) {}
  }

  function loadState() {
    state.items = [];
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed.items)) {
          state.items = parsed.items.slice(0, MAX_COMPARE);
          return;
        }
      }
      var legacyRaw = localStorage.getItem(STORAGE_KEY_LEGACY);
      if (legacyRaw) {
        var legacy = JSON.parse(legacyRaw);
        if (legacy.first) state.items.push(legacy.first);
        if (legacy.second) state.items.push(legacy.second);
        state.items = state.items.slice(0, MAX_COMPARE);
        saveState();
      }
    } catch (e) {
      state.items = [];
    }
  }

  function clearState() {
    state.items = [];
    saveState();
    syncButtons();
    updateBar();
    closePanel();
  }

  function findItemIndex(id) {
    id = String(id);
    for (var i = 0; i < state.items.length; i++) {
      if (state.items[i].id === id) return i;
    }
    return -1;
  }

  function isSelected(id) {
    return findItemIndex(id) !== -1;
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

  function truncate(str, max) {
    str = String(str || '');
    return str.length > max ? str.slice(0, max - 1) + '…' : str;
  }

  function updateBar() {
    var bar = document.getElementById('product-compare-bar');
    if (!bar) return;

    var count = state.items.length;
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
      if (count === 1) {
        textEl.textContent = '“' + truncate(state.items[0].title, 38) + '” — escolha mais 1 ou 2 produtos';
      } else if (count === 2) {
        textEl.textContent = '2 produtos selecionados — pode adicionar mais 1 ou comparar agora';
      } else {
        textEl.textContent = '3 produtos selecionados — pronto para comparar';
      }
    }
    if (openBtn) openBtn.disabled = count < 2;
  }

  function selectProduct(product) {
    if (!product) return;

    var idx = findItemIndex(product.id);
    if (idx !== -1) {
      state.items.splice(idx, 1);
      saveState();
      syncButtons();
      updateBar();
      return;
    }

    if (state.items.length >= MAX_COMPARE) {
      var bar = document.getElementById('product-compare-bar');
      var textEl = bar && bar.querySelector('[data-compare-bar-text]');
      if (textEl) {
        textEl.textContent = 'Máximo de 3 produtos — remova um para trocar';
      }
      return;
    }

    state.items.push(product);
    saveState();
    syncButtons();
    updateBar();
  }

  var CORE_PATTERNS = [
    'btu', 'capacidade de refrigera', 'capacidade em btu', 'cooling_capacity',
    'area recomendada', 'area de cobertura', 'ambiente recomendado', 'tamanho do ambiente', 'room_size',
    'tipo de ar', 'tipo do ar', 'tipo de aparelho', 'product_type',
    'ciclo', 'cooling_and_heating', 'funcao do ciclo', 'modo de operacao',
    'voltagem', 'voltage', 'tensao', 'alimentacao eletrica', 'line_voltage',
    'inverter', 'inversor', 'tecnologia do compressor', 'tipo de tecnologia',
    'wi-fi', 'wifi', 'conectividade', 'compatibilidade wi-fi', 'smart',
    'serpentina', 'material do evaporador', 'material da serpentina', 'tubulacao', 'evaporador',
    'procel', 'eficiencia energ', 'classificacao energ', 'energy_efficiency', 'selo procel', 'classe energetica'
  ];

  function buildMlExtraRows(products) {
    var keys = {};
    var labels = {};

    for (var p = 0; p < products.length; p++) {
      var map = products[p].attrMap || {};
      var lbl = products[p].attrLabels || {};
      for (var key in map) {
        keys[key] = true;
        if (!labels[key]) labels[key] = lbl[key] || key;
      }
    }

    var rows = [];
    for (var attrKey in keys) {
      if (isInternalAttrKey(attrKey, labels[attrKey] || attrKey)) continue;
      if (attrKeyMatches(attrKey, CORE_PATTERNS)) continue;
      if (!attrKeyMatches(attrKey, ALLOWED_EXTRA_ATTR_KEYS)) continue;

      var values = [];
      var hasValue = false;
      for (var i = 0; i < products.length; i++) {
        var val = (products[i].attrMap && products[i].attrMap[attrKey]) || '—';
        values.push(val);
        if (val !== '—') hasValue = true;
      }
      if (!hasValue) continue;
      if (isGarbageAttrValue(values.filter(function (v) { return v !== '—'; })[0] || '')) continue;

      rows.push({
        key: 'attr_' + attrKey,
        label: labels[attrKey] || attrKey,
        values: values
      });
    }

    rows.sort(function (x, y) {
      return String(x.label).localeCompare(String(y.label), 'pt-BR');
    });
    return rows;
  }

  function getCompareRows(products) {
    var coreDefs = [
      {
        key: 'description',
        label: 'Descrição',
        values: products.map(function (p) {
          return p.description ? truncate(p.description, 220) : '—';
        })
      },
      {
        key: 'pixPrice',
        label: 'Preço no Pix',
        values: products.map(function (p) { return formatMoney(p.pixPrice); }),
        raw: products.map(function (p) { return p.pixPrice || 0; }),
        better: 'min'
      },
      {
        key: 'listPrice',
        label: 'Preço de tabela',
        values: products.map(function (p) { return formatMoney(p.listPrice); }),
        raw: products.map(function (p) { return p.listPrice || 0; }),
        better: 'min'
      },
      {
        key: 'btu',
        label: 'Capacidade (BTU)',
        values: products.map(function (p) {
          return p.btu ? p.btu.toLocaleString('pt-BR') + ' BTUs' : '—';
        }),
        raw: products.map(function (p) { return p.btu || 0; }),
        better: 'max'
      },
      {
        key: 'area',
        label: 'Área recomendada',
        values: products.map(function (p) { return p.recommendedArea || '—'; }),
        raw: products.map(function (p) { return p.areaMax || p.areaMin || 0; }),
        better: 'max'
      },
      { key: 'type', label: 'Tipo', values: products.map(function (p) { return p.type; }) },
      { key: 'cycle', label: 'Ciclo', values: products.map(function (p) { return p.cycle; }) },
      {
        key: 'inverter',
        label: 'Tecnologia',
        values: products.map(function (p) { return p.inverter ? 'Inverter' : 'Convencional'; }),
        bool: products.map(function (p) { return p.inverter; })
      },
      { key: 'voltage', label: 'Voltagem', values: products.map(function (p) { return p.voltage; }) },
      {
        key: 'wifi',
        label: 'Wi-Fi',
        values: products.map(function (p) { return p.wifi ? 'Sim' : 'Não'; }),
        bool: products.map(function (p) { return p.wifi; })
      },
      {
        key: 'cobre',
        label: 'Serpentina',
        values: products.map(function (p) { return p.coil; }),
        bool: products.map(function (p) { return p.cobre; })
      },
      {
        key: 'procelA',
        label: 'Procel / Eficiência',
        values: products.map(function (p) { return p.procelLabel || (p.procelA ? 'Classe A' : '—'); }),
        bool: products.map(function (p) { return p.procelA; })
      }
    ];

    var filtered = [];
    for (var i = 0; i < coreDefs.length; i++) {
      var row = coreDefs[i];
      if (row.key === 'description') {
        var hasDesc = row.values.some(function (v) { return v && v !== '—'; });
        if (hasDesc) filtered.push(row);
        continue;
      }
      if ((row.key === 'cobre' || row.key === 'procelA') && row.values.every(function (v) { return v === '—'; })) continue;
      filtered.push(row);
    }

    return filtered.concat(buildMlExtraRows(products));
  }

  function bestIndices(rawValues, mode) {
    if (!rawValues || !rawValues.length) return [];
    var best = [];
    var bestVal = null;
    for (var i = 0; i < rawValues.length; i++) {
      var val = Number(rawValues[i]) || 0;
      if (!val) continue;
      if (bestVal === null) {
        bestVal = val;
        best = [i];
      } else if (mode === 'min' && val < bestVal) {
        bestVal = val;
        best = [i];
      } else if (mode === 'max' && val > bestVal) {
        bestVal = val;
        best = [i];
      } else if (val === bestVal) {
        best.push(i);
      }
    }
    return best;
  }

  function buildInsightsForProduct(product, others) {
    var pros = [];
    var cons = [];

    if (product.pixPrice > 0) {
      var cheapest = others.every(function (o) {
        return !o.pixPrice || product.pixPrice <= o.pixPrice;
      });
      if (cheapest && others.some(function (o) { return o.pixPrice > product.pixPrice; })) {
        pros.push('Menor preço no Pix entre os selecionados');
      }
      var expensive = others.some(function (o) {
        return o.pixPrice > 0 && product.pixPrice > o.pixPrice;
      });
      if (expensive) cons.push('Preço no Pix mais alto que outro modelo selecionado');
    }

    if (product.btu) {
      var topBtu = others.every(function (o) { return !o.btu || product.btu >= o.btu; });
      if (topBtu && others.some(function (o) { return o.btu && product.btu > o.btu; })) {
        pros.push('Maior capacidade (' + product.btu.toLocaleString('pt-BR') + ' BTUs)');
      }
      var lowBtu = others.some(function (o) { return o.btu && product.btu < o.btu; });
      if (lowBtu) cons.push('Capacidade menor que outro modelo da comparação');
    }

    if (product.inverter && others.some(function (o) { return !o.inverter; })) {
      pros.push('Tecnologia Inverter');
    } else if (!product.inverter && others.every(function (o) { return o.inverter; })) {
      cons.push('Sem Inverter');
    }

    if (product.procelA && others.some(function (o) { return !o.procelA; })) {
      pros.push('Selo Procel classe A');
    }

    if (product.wifi && others.some(function (o) { return !o.wifi; })) {
      pros.push('Wi-Fi integrado');
    }

    if (product.coil === 'Cobre' && others.some(function (o) { return o.coil !== 'Cobre'; })) {
      pros.push('Serpentina de cobre');
    }

    if (product.cycle === 'Quente/Frio' && others.some(function (o) { return o.cycle === 'Só Frio'; })) {
      pros.push('Ciclo Quente/Frio');
    }

    if (product.description) {
      pros.push('Descrição disponível para análise');
    }

    if (!pros.length) pros.push('Opção equilibrada para o perfil do ambiente');
    if (!cons.length) cons.push('Nenhum ponto crítico em relação aos outros modelos');

    return { pros: pros, cons: cons };
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

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function productCardHtml(product, label) {
    var img = product.image
      ? '<img src="' + escapeHtml(product.image) + '" alt="" loading="lazy">'
      : '<span class="product-compare-card__placeholder">Sem imagem</span>';
    return (
      '<article class="product-compare-card">' +
        '<span class="product-compare-card__badge">Produto ' + label + '</span>' +
        '<a class="product-compare-card__image" href="' + escapeHtml(product.url) + '">' + img + '</a>' +
        '<h3 class="product-compare-card__title"><a href="' + escapeHtml(product.url) + '">' + escapeHtml(truncate(product.title, 70)) + '</a></h3>' +
        '<p class="product-compare-card__price">' + formatMoney(product.pixPrice) + ' <span>no Pix</span></p>' +
        '<a class="product-compare-card__buy" href="' + escapeHtml(product.url) + '">Comprar produto</a>' +
      '</article>'
    );
  }

  function productLabels(count) {
    return ['A', 'B', 'C'].slice(0, count);
  }

  function openPanel() {
    if (state.items.length < 2) return;

    var panel = document.getElementById('product-compare-panel');
    if (!panel) return;

    var products = state.items.slice();
    var rows = getCompareRows(products);
    var labels = productLabels(products.length);

    var productsEl = panel.querySelector('[data-compare-products]');
    if (productsEl) {
      var cardsHtml = '';
      for (var c = 0; c < products.length; c++) {
        if (c > 0) {
          cardsHtml += '<div class="product-compare-panel__vs" aria-hidden="true">VS</div>';
        }
        cardsHtml += productCardHtml(products[c], labels[c]);
      }
      productsEl.innerHTML = cardsHtml;
      productsEl.setAttribute('data-compare-count', String(products.length));
    }

    var head = panel.querySelector('[data-compare-table-head]');
    var body = panel.querySelector('[data-compare-table-body]');
    if (head) {
      var headHtml = '<tr><th>Especificação</th>';
      for (var h = 0; h < products.length; h++) {
        headHtml += '<th>Produto ' + labels[h] + '</th>';
      }
      headHtml += '</tr>';
      head.innerHTML = headHtml;
    }

    if (body) {
      var bodyHtml = '';
      for (var r = 0; r < rows.length; r++) {
        var row = rows[r];
        var betterIdx = [];
        if (row.raw && row.better) {
          betterIdx = bestIndices(row.raw, row.better);
        } else if (row.bool) {
          var trueCount = row.bool.filter(function (v) { return v; }).length;
          if (trueCount === 1) {
            for (var b = 0; b < row.bool.length; b++) {
              if (row.bool[b]) betterIdx.push(b);
            }
          }
        }

        bodyHtml += '<tr><th>' + escapeHtml(row.label) + '</th>';
        for (var v = 0; v < row.values.length; v++) {
          var cls = betterIdx.indexOf(v) !== -1 ? ' is-better' : '';
          var cell = row.key === 'description'
            ? '<div class="product-compare-table__desc">' + escapeHtml(row.values[v]) + '</div>'
            : escapeHtml(row.values[v]);
          bodyHtml += '<td class="product-compare-table__val' + cls + '">' + cell + '</td>';
        }
        bodyHtml += '</tr>';
      }
      body.innerHTML = bodyHtml;
    }

    var insightsEl = panel.querySelector('[data-compare-insights]');
    if (insightsEl) {
      var insightsHtml = '';
      for (var i = 0; i < products.length; i++) {
        var others = products.filter(function (_, idx) { return idx !== i; });
        var insight = buildInsightsForProduct(products[i], others);
        insightsHtml +=
          '<div class="product-compare-insight">' +
            '<h3 class="product-compare-insight__title">' + escapeHtml(truncate(products[i].title, 60)) + '</h3>' +
            '<div class="product-compare-insight__group">' +
              '<p class="product-compare-insight__label product-compare-insight__label--pro">Pontos positivos</p>' +
              '<ul class="product-compare-insight__list product-compare-insight__list--pro">' +
                insight.pros.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('') +
              '</ul>' +
            '</div>' +
            '<div class="product-compare-insight__group">' +
              '<p class="product-compare-insight__label product-compare-insight__label--con">Pontos de atenção</p>' +
              '<ul class="product-compare-insight__list product-compare-insight__list--con">' +
                insight.cons.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('') +
              '</ul>' +
            '</div>' +
          '</div>';
      }
      insightsEl.innerHTML = insightsHtml;
    }

    var buyFooter = panel.querySelector('[data-compare-buy-footer]');
    if (buyFooter) {
      var buyHtml = '<p class="product-compare-buy-footer__title">Escolheu? Vá direto ao produto:</p><div class="product-compare-buy-footer__actions">';
      for (var j = 0; j < products.length; j++) {
        buyHtml +=
          '<a class="product-compare-buy-footer__btn" href="' + escapeHtml(products[j].url) + '">' +
            'Comprar produto ' + labels[j] +
          '</a>';
      }
      buyHtml += '</div>';
      buyFooter.innerHTML = buyHtml;
    }

    panel.hidden = false;
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('compare-panel-open');
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

  function bindButtons() {
    if (document.body.getAttribute('data-compare-delegation') === '1') return;
    document.body.setAttribute('data-compare-delegation', '1');
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.showcase-compare-btn, .product-compare-btn');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      onCompareClick(btn);
    });
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
    if (window.__productCompareInit) return;
    window.__productCompareInit = true;

    loadState();
    bindPanel();
    bindBar();
    bindButtons();
    syncButtons();
    updateBar();
  }

  window.initProductCompare = init;
  window.openProductComparePanel = openPanel;
  window.clearProductCompare = clearState;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
