/**
 * Calculadora BTUs — wizard 3 etapas (#sda-calculadora, data-next/prev/calc)
 * Compatível WDNA: delegação de clique + funções globais de fallback.
 */
(function () {
  'use strict';

  if (window.__SDA_BTU_WIZARD__) return;

  var root = null;
  var step = 1;
  var TOTAL = 3;

  var catalog = [
    { btu: 9000, label: '9.000', tipo: 'Split Inverter', url: '/split-inverter/9000-btus' },
    { btu: 12000, label: '12.000', tipo: 'Split Inverter', url: '/split-inverter/12000-Btus' },
    { btu: 18000, label: '18.000', tipo: 'Split Inverter', url: '/split-inverter/18000-Btus' },
    { btu: 24000, label: '24.000', tipo: 'Split Inverter', url: '/split-inverter/24000-Btus' },
    { btu: 30000, label: '30.000', tipo: 'Split Inverter', url: '/split-inverter/30000-Btus' },
    { btu: 36000, label: '36.000', tipo: 'Piso Teto', url: '/Piso-Teto/36000-Btus' },
    { btu: 46000, label: '46.000', tipo: 'Piso Teto', url: '/Piso-Teto/46000-Btus' },
    { btu: 48000, label: '48.000', tipo: 'Piso Teto', url: '/Piso-Teto/48000-Btus' },
    { btu: 56000, label: '56.000', tipo: 'Piso Teto', url: '/Piso-Teto/56000-btus' },
  ];

  var factors = {
    sol: { sem_sol: 1, sol_manha: 1.1, sol_tarde: 1.25 },
    uso: { quarto: 1, sala: 1.1, cozinha: 1.2, comercio: 1.5 },
    andar: { terreo: 1.05, intermediario: 1, cobertura: 1.15 },
    janelas: { poucas: 1, moderadas: 1.08, muitas: 1.18 },
    isol: { bom: 0.95, regular: 1, ruim: 1.12 },
    layout: { fechado: 1, planta_aberta: 1.15, mezanino: 1.2 },
    clima: { ameno: 1, quente: 1.08, muito_quente: 1.15, frio_inverno: 1 },
    horas: { noite: 1, tarde_noite: 1.05, dia_todo: 1.1, comercial: 1.15 },
    umid: { normal: 1, alta: 1.05, muito_alta: 1.1 },
  };

  var labels = {
    sol: { sem_sol: 'Sem sol direto', sol_manha: 'Sol pela manhã', sol_tarde: 'Sol à tarde' },
    uso: { quarto: 'Quarto', sala: 'Sala/escritório', cozinha: 'Cozinha', comercio: 'Comércio' },
    andar: { terreo: 'Térreo', intermediario: 'Andar intermediário', cobertura: 'Cobertura' },
    janelas: { poucas: 'Poucas janelas', moderadas: 'Janelas moderadas', muitas: 'Muitas janelas' },
    isol: { bom: 'Isolamento bom', regular: 'Isolamento regular', ruim: 'Isolamento ruim' },
    layout: { fechado: 'Ambiente fechado', planta_aberta: 'Planta aberta', mezanino: 'Mezanino' },
    clima: { ameno: 'Clima ameno', quente: 'Clima quente', muito_quente: 'Muito quente', frio_inverno: 'Frio no inverno' },
    horas: { noite: 'Uso noturno', tarde_noite: 'Tarde/noite', dia_todo: 'Dia todo', comercial: 'Uso comercial' },
    umid: { normal: 'Umidade normal', alta: 'Umidade alta', muito_alta: 'Umidade muito alta' },
  };

  function get(id) {
    return document.getElementById(id);
  }

  function fmt(n) {
    return Math.round(n).toLocaleString('pt-BR');
  }

  function pct(n) {
    var d = Math.round((n - 1) * 100);
    return d === 0 ? '0%' : (d > 0 ? '+' : '') + d + '%';
  }

  function val(id) {
    var el = get(id);
    return el ? el.value : '';
  }

  function parseNum(id, fallback) {
    var raw = String(val(id))
      .trim()
      .replace(/\s/g, '')
      .replace(',', '.');
    var n = parseFloat(raw);
    return isFinite(n) ? n : fallback;
  }

  function entry(i) {
    return catalog[Math.max(0, Math.min(catalog.length - 1, i))];
  }

  function errorElForStep(n) {
    return get('sda-error-step' + n) || get('sda-error');
  }

  function hideAllErrors() {
    var s;
    for (s = 1; s <= TOTAL; s++) {
      var el = errorElForStep(s);
      if (el) {
        el.classList.remove('show');
        el.style.display = 'none';
      }
    }
  }

  function showError(stepNum, msg) {
    hideAllErrors();
    var el = errorElForStep(stepNum);
    if (el) {
      el.textContent = msg;
      el.classList.add('show');
      el.style.display = 'block';
    }
  }

  function showStep(n) {
    if (!root) return;
    step = n;
    var cards = root.querySelectorAll('.step-card');
    var ci;
    for (ci = 0; ci < cards.length; ci++) {
      var sn = parseInt(cards[ci].getAttribute('data-step'), 10);
      if (sn === n) cards[ci].classList.add('active');
      else cards[ci].classList.remove('active');
    }
    var bar = get('sda-progressBar');
    var txt = get('sda-progressText');
    if (bar) bar.style.width = (n / TOTAL) * 100 + '%';
    if (txt) txt.textContent = 'Etapa ' + n + ' de ' + TOTAL;
    hideAllErrors();
    try {
      window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY - 12, behavior: 'smooth' });
    } catch (e) {
      window.scrollTo(0, root.offsetTop - 12);
    }
  }

  function markField(id, bad) {
    var el = get(id);
    if (el && el.closest) {
      var field = el.closest('.field');
      if (field) field.classList.toggle('invalid', bad);
    }
  }

  function validate(n) {
    var msg = '';
    if (n === 1) {
      var c = parseNum('sda-comp', NaN);
      var l = parseNum('sda-larg', NaN);
      markField('sda-comp', !(c > 0));
      markField('sda-larg', !(l > 0));
      if (!(c > 0) && !(l > 0)) msg = 'Informe o comprimento e a largura do ambiente para continuar.';
      else if (!(c > 0)) msg = 'Informe o comprimento do ambiente para continuar.';
      else if (!(l > 0)) msg = 'Informe a largura do ambiente para continuar.';
    }
    if (msg) {
      showError(n, msg);
      return false;
    }
    hideAllErrors();
    return true;
  }

  function calculate() {
    if (!validate(1)) {
      showStep(1);
      return false;
    }
    var comp = parseNum('sda-comp', 0);
    var larg = parseNum('sda-larg', 0);
    var pe = parseNum('sda-pe', 2.6);
    var pessoas = Math.max(1, parseInt(val('sda-pessoas') || '1', 10) || 1);
    var equip = parseInt(val('sda-equip') || '0', 10) || 0;
    var area = comp * larg;
    var p = {
      sol: val('sda-sol'),
      uso: val('sda-uso'),
      andar: val('sda-andar'),
      janelas: val('sda-janelas'),
      isol: val('sda-isol'),
      layout: val('sda-layout'),
      clima: val('sda-clima'),
      horas: val('sda-horas'),
      umid: val('sda-umidade'),
    };
    var fs = {};
    var fk;
    for (fk in factors) {
      if (Object.prototype.hasOwnProperty.call(factors, fk)) {
        fs[fk] = factors[fk][p[fk]] || 1;
      }
    }
    fs.pe = pe > 3 ? pe / 2.6 : 1;
    var combined =
      fs.sol * fs.uso * fs.pe * fs.andar * fs.janelas * fs.isol * fs.layout * fs.clima * fs.horas * fs.umid;
    var base = area * 600;
    var extras = (pessoas > 1 ? (pessoas - 1) * 600 : 0) + equip;
    var load = Math.ceil((base * combined + extras) / 500) * 500;
    var idx = -1;
    var ii;
    for (ii = 0; ii < catalog.length; ii++) {
      if (catalog[ii].btu >= load) {
        idx = ii;
        break;
      }
    }
    if (idx < 0) idx = catalog.length - 1;
    var rec = entry(idx);
    var min = entry(idx - 1);
    var max = entry(idx + 1);

    var resultNum = get('sda-resultNum');
    var resultSub = get('sda-resultSub');
    var recBtu = get('sda-recommendationBtu');
    var recText = get('sda-recommendationText');
    if (resultNum) resultNum.innerHTML = fmt(load) + ' <span>BTUs/h</span>';
    if (resultSub) {
      resultSub.textContent =
        'Carga térmica estimada para ' +
        area.toFixed(1).replace('.', ',') +
        ' m² · ' +
        pessoas +
        ' pessoa' +
        (pessoas > 1 ? 's' : '') +
        '.';
    }
    if (recBtu) recBtu.textContent = rec.label + ' BTUs';
    if (recText) {
      recText.textContent =
        load === rec.btu
          ? 'A capacidade calculada coincide com uma opção comercial.'
          : 'A carga calculada fica entre capacidades comerciais; recomendamos a próxima faixa para evitar subdimensionamento.';
    }

    var infoGrid = get('sda-infoGrid');
    if (infoGrid) {
      infoGrid.innerHTML =
        '<div class="info-item"><div class="info-val">' +
        area.toFixed(1).replace('.', ',') +
        ' m²</div><div class="info-key">Área total</div></div><div class="info-item"><div class="info-val">' +
        fmt(Math.round(base)) +
        '</div><div class="info-key">Carga base</div></div><div class="info-item"><div class="info-val">' +
        rec.tipo +
        '</div><div class="info-key">Linha indicada</div></div>';
    }

    var keys = [
      ['sol', 'Insolação'],
      ['uso', 'Uso'],
      ['pe', 'Pé-direito'],
      ['andar', 'Andar'],
      ['janelas', 'Janelas'],
      ['isol', 'Isolamento'],
      ['layout', 'Layout'],
      ['clima', 'Clima'],
      ['horas', 'Horas'],
      ['umid', 'Umidade'],
    ];
    var breakdown = get('sda-breakdown');
    if (breakdown) {
      var html = '';
      var xi;
      for (xi = 0; xi < keys.length; xi++) {
        var key = keys[xi][0];
        if (key === 'pe' && pe <= 3) continue;
        var label =
          key === 'pe' ? 'Pé-direito acima de 3 m' : labels[key][p[key]] || p[key];
        html +=
          '<div class="breakdown-item"><span>' +
          keys[xi][1] +
          ' · ' +
          label +
          '</span><span>' +
          pct(fs[key]) +
          '</span></div>';
      }
      html +=
        '<div class="breakdown-item"><span>Pessoas + equipamentos</span><span>+' +
        fmt(extras) +
        ' BTU</span></div>';
      breakdown.innerHTML = html;
    }

    function card(tag, e, cls, desc) {
      return (
        '<div class="rec-card ' +
        cls +
        '"><span class="rec-tag">' +
        tag +
        '</span><div class="rec-btu">' +
        e.label +
        '</div><div class="rec-label">' +
        desc +
        '<br>' +
        e.tipo +
        '</div><a class="rec-link" href="' +
        e.url +
        '">Ver modelos</a></div>'
      );
    }
    var recCards = get('sda-recCards');
    if (recCards) {
      recCards.innerHTML =
        card('Mínimo', min, '', 'Para ambientes menores') +
        card('Recomendado', rec, 'recommended', 'Faixa indicada para o cálculo') +
        card('Com folga', max, '', 'Margem extra de potência');
    }

    var tip =
      'Evite escolher abaixo da recomendação: um aparelho subdimensionado trabalha mais e pode aumentar o consumo.';
    if (p.layout !== 'fechado') {
      tip = 'Planta aberta: considere a posição do aparelho e a possibilidade de mais de uma unidade.';
    }
    if (p.clima === 'frio_inverno' || val('sda-ciclo') === 'quente_frio') {
      tip = 'Como há necessidade de aquecimento, prefira um modelo com ciclo quente e frio.';
    }
    var tipBox = get('sda-tipBox');
    if (tipBox) tipBox.textContent = tip;

    var wa = get('sda-whatsapp');
    if (wa) {
      wa.href =
        'https://wa.me/5519984176960?text=' +
        encodeURIComponent(
          'Olá! Calculei ' +
            rec.label +
            ' BTUs para um ambiente de ' +
            area.toFixed(1) +
            ' m² e gostaria de ajuda para escolher o aparelho.'
        );
    }

    var resultBox = get('sda-resultBox');
    if (resultBox) {
      resultBox.classList.remove('cycle-hot', 'cycle-cold');
      resultBox.classList.add(val('sda-ciclo') === 'quente_frio' ? 'cycle-hot' : 'cycle-cold');
      resultBox.classList.add('show');
      resultBox.style.display = 'block';
      try {
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (e2) {
        resultBox.scrollIntoView();
      }
    }
    return false;
  }

  function goNext(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    if (!validate(step)) return false;
    showStep(Math.min(TOTAL, step + 1));
    return false;
  }

  function goPrev(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    showStep(Math.max(1, step - 1));
    return false;
  }

  function resetCalc(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var resultBox = get('sda-resultBox');
    if (resultBox) {
      resultBox.classList.remove('show');
      resultBox.style.display = 'none';
    }
    var pe = get('sda-pe');
    var pessoas = get('sda-pessoas');
    if (pe) pe.value = '2,6';
    if (pessoas) pessoas.value = '2';
    showStep(1);
    return false;
  }

  function bindDelegation() {
    document.addEventListener(
      'click',
      function (e) {
        if (!root) return;
        var t = e.target;
        if (!t || !root.contains(t)) return;
        var nextBtn = t.closest ? t.closest('[data-next]') : null;
        var prevBtn = t.closest ? t.closest('[data-prev]') : null;
        var calcBtn = t.closest ? t.closest('[data-calc-submit]') : null;
        var resetBtn = t.id === 'sda-reset' ? t : t.closest ? t.closest('#sda-reset') : null;
        if (nextBtn) {
          e.preventDefault();
          goNext(e);
        } else if (prevBtn) {
          e.preventDefault();
          goPrev(e);
        } else if (calcBtn) {
          e.preventDefault();
          calculate();
        } else if (resetBtn) {
          e.preventDefault();
          resetCalc(e);
        }
      },
      false
    );
  }

  function init() {
    root = document.getElementById('sda-calculadora');
    if (!root) return;
    if (window.__SDA_BTU_WIZARD__) return;
    window.__SDA_BTU_WIZARD__ = true;
    showStep(1);
    bindDelegation();
  }

  window.sdaWizardNext = goNext;
  window.sdaWizardPrev = goPrev;
  window.sdaWizardCalc = calculate;
  window.sdaWizardReset = resetCalc;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
