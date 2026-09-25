(function () {
  'use strict';
  if (window.__SDA_CALC_READY) return;
  window.__SDA_CALC_READY = true;

  var SDA_CATALOG = [
    { btu: 9000, label: '9.000', tipo: 'Split Inverter', url: '/split-inverter/9000-btus' },
    { btu: 12000, label: '12.000', tipo: 'Split Inverter', url: '/split-inverter/12000-Btus' },
    { btu: 18000, label: '18.000', tipo: 'Split Inverter', url: '/split-inverter/18000-Btus' },
    { btu: 24000, label: '24.000', tipo: 'Split Inverter', url: '/split-inverter/24000-Btus' },
    { btu: 30000, label: '30.000', tipo: 'Split Inverter', url: '/split-inverter/30000-Btus' },
    { btu: 36000, label: '36.000', tipo: 'Piso Teto', url: '/Piso-Teto/36000-Btus' },
    { btu: 46000, label: '46.000', tipo: 'Piso Teto', url: '/Piso-Teto/46000-Btus' },
    { btu: 48000, label: '48.000', tipo: 'Piso Teto', url: '/Piso-Teto/48000-Btus' },
    { btu: 56000, label: '56.000', tipo: 'Piso Teto', url: '/Piso-Teto/56000-btus' }
  ];

  var FAT_SOL = { sem_sol: 1.0, sol_manha: 1.10, sol_tarde: 1.25 };
  var FAT_USO = { quarto: 1.0, sala: 1.10, cozinha: 1.20, comercio: 1.50 };
  var FAT_ANDAR = { terreo: 1.05, intermediario: 1.0, cobertura: 1.15 };
  var FAT_JANELAS = { poucas: 1.0, moderadas: 1.08, muitas: 1.18 };
  var FAT_ISOL = { bom: 0.95, regular: 1.0, ruim: 1.12 };
  var FAT_LAYOUT = { fechado: 1.0, planta_aberta: 1.15, mezanino: 1.20 };
  var FAT_CLIMA = { ameno: 1.0, quente: 1.08, muito_quente: 1.15, frio_inverno: 1.0 };
  var FAT_HORAS = { noite: 1.0, tarde_noite: 1.05, dia_todo: 1.10, comercial: 1.15 };
  var FAT_UMID = { normal: 1.0, alta: 1.05, muito_alta: 1.10 };

  var LABELS = {
    sol: { sem_sol: 'Sem sol', sol_manha: 'Sol manha', sol_tarde: 'Sol tarde' },
    uso: { quarto: 'Quarto', sala: 'Sala', cozinha: 'Cozinha', comercio: 'Comercio' },
    andar: { terreo: 'Terreo', intermediario: 'Intermediario', cobertura: 'Cobertura' },
    janelas: { poucas: 'Poucas janelas', moderadas: 'Janelas moderadas', muitas: 'Muitas janelas' },
    isol: { bom: 'Isolamento bom', regular: 'Isolamento regular', ruim: 'Isolamento ruim' },
    layout: { fechado: 'Fechado', planta_aberta: 'Planta aberta', mezanino: 'Mezanino' },
    clima: { ameno: 'Clima ameno', quente: 'Clima quente', muito_quente: 'Muito quente', frio_inverno: 'Frio no inverno' },
    horas: { noite: 'Uso noturno', tarde_noite: 'Tarde/noite', dia_todo: 'Dia todo', comercial: 'Uso comercial' },
    umid: { normal: 'Umidade normal', alta: 'Umidade alta', muito_alta: 'Umidade muito alta' }
  };

  function sdaEl(id) { return document.getElementById(id); }

  function val(id, def) {
    var el = sdaEl(id);
    if (!el) return def;
    var v = el.value;
    return (v === '' || v == null) ? def : v;
  }

  function fmt(n) {
    try { return n.toLocaleString('pt-BR'); }
    catch (e) { return String(n); }
  }

  function pct(fator) {
    var diff = Math.round((fator - 1) * 100);
    if (diff === 0) return '0%';
    return (diff > 0 ? '+' : '') + diff + '%';
  }

  function fatPe(altura) {
    return altura > 3 ? altura / 2.6 : 1.0;
  }

  function calcBtus(params) {
    var base = params.area * 600;
    var fSol = FAT_SOL[params.sol] || 1.10;
    var fUso = FAT_USO[params.uso] || 1.10;
    var fPe = fatPe(params.pe);
    var fAndar = FAT_ANDAR[params.andar] || 1.0;
    var fJan = FAT_JANELAS[params.janelas] || 1.0;
    var fIsol = FAT_ISOL[params.isol] || 1.0;
    var fLayout = FAT_LAYOUT[params.layout] || 1.0;
    var fClima = FAT_CLIMA[params.clima] || 1.0;
    var fHoras = FAT_HORAS[params.horas] || 1.0;
    var fUmid = FAT_UMID[params.umid] || 1.0;
    var fatorTotal = fSol * fUso * fPe * fAndar * fJan * fIsol * fLayout * fClima * fHoras * fUmid;
    var btus = base * fatorTotal;
    var extraPessoas = params.pessoas > 1 ? (params.pessoas - 1) * 600 : 0;
    var extraEquip = params.equip || 0;
    btus += extraPessoas + extraEquip;
    return {
      btus: Math.ceil(btus / 500) * 500,
      base: base,
      fatorTotal: fatorTotal,
      extras: extraPessoas + extraEquip,
      fatores: {
        sol: fSol, uso: fUso, pe: fPe, andar: fAndar, janelas: fJan,
        isol: fIsol, layout: fLayout, clima: fClima, horas: fHoras, umid: fUmid
      }
    };
  }

  function findIdealIndex(rawBtu) {
    for (var i = 0; i < SDA_CATALOG.length; i++) {
      if (rawBtu <= SDA_CATALOG[i].btu) return i;
    }
    return SDA_CATALOG.length - 1;
  }

  function catalogEntry(idx) {
    if (idx < 0) return SDA_CATALOG[0];
    if (idx >= SDA_CATALOG.length) return SDA_CATALOG[SDA_CATALOG.length - 1];
    return SDA_CATALOG[idx];
  }

  function renderRecCard(tagClass, tagLabel, entry, sublabel) {
    return (
      '<div class="rec-card">' +
        '<span class="rec-tag ' + tagClass + '">' + tagLabel + '</span>' +
        '<div class="rec-btus">' + entry.label + '</div>' +
        '<div class="rec-label">' + sublabel + '<br>' + entry.tipo + '</div>' +
        '<a class="rec-link" href="' + entry.url + '">Ver modelos</a>' +
      '</div>'
    );
  }

  function hideResult(boxEl) {
    if (!boxEl) return;
    boxEl.classList.remove('show');
    boxEl.style.display = 'none';
  }

  function showResult(boxEl) {
    if (!boxEl) return;
    boxEl.classList.add('show');
    boxEl.style.display = 'block';
    boxEl.style.visibility = 'visible';
    boxEl.style.opacity = '1';
    if (boxEl.scrollIntoView) {
      try { boxEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
      catch (e2) { boxEl.scrollIntoView(); }
    }
  }

  function showError(msg) {
    var errEl = sdaEl('sda-error');
    if (errEl) {
      errEl.textContent = msg;
      errEl.classList.add('show');
      errEl.style.display = 'block';
    }
    hideResult(sdaEl('sda-resultBox'));
  }

  function sdaCalcular(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    try {
      var errEl = sdaEl('sda-error');
      var boxEl = sdaEl('sda-resultBox');
      var comp = parseFloat(val('sda-comp', ''));
      var larg = parseFloat(val('sda-larg', ''));
      var pe = parseFloat(val('sda-pe', '2.6')) || 2.6;
      var sol = val('sda-sol', 'sol_manha');
      var uso = val('sda-uso', 'sala');
      var pessoas = parseInt(val('sda-pessoas', '1'), 10) || 1;
      var equip = parseInt(val('sda-equip', '0'), 10) || 0;
      var andar = val('sda-andar', 'intermediario');
      var janelas = val('sda-janelas', 'moderadas');
      var isol = val('sda-isol', 'regular');
      var layout = val('sda-layout', 'fechado');
      var clima = val('sda-clima', 'quente');
      var horas = val('sda-horas', 'tarde_noite');
      var ciclo = val('sda-ciclo', 'frio');
      var umid = val('sda-umidade', 'normal');

      if (!comp || !larg || comp <= 0 || larg <= 0) {
        if (errEl) {
          errEl.textContent = 'Por favor, preencha o comprimento e a largura do ambiente.';
          errEl.classList.add('show');
          errEl.style.display = 'block';
        }
        hideResult(boxEl);
        return false;
      }
      if (errEl) {
        errEl.classList.remove('show');
        errEl.style.display = 'none';
      }

      var area = comp * larg;
      var result = calcBtus({
        area: area, sol: sol, uso: uso, pe: pe, pessoas: pessoas, equip: equip,
        andar: andar, janelas: janelas, isol: isol, layout: layout,
        clima: clima, horas: horas, umid: umid
      });
      var btus = result.btus;
      var idealIdx = findIdealIndex(btus);
      var minEntry = catalogEntry(idealIdx - 1);
      var recEntry = catalogEntry(idealIdx);
      var maxEntry = catalogEntry(idealIdx + 1);

      var resultNum = sdaEl('sda-resultNum');
      var resultSub = sdaEl('sda-resultSub');
      var infoGrid = sdaEl('sda-infoGrid');
      var breakdown = sdaEl('sda-breakdown');
      var recCards = sdaEl('sda-recCards');
      var tip = sdaEl('sda-tipBox');

      if (resultNum) resultNum.innerHTML = fmt(btus) + '<span>BTUs/h</span>';
      if (resultSub) {
        resultSub.textContent =
          'Ambiente de ' + area.toFixed(1).replace('.', ',') + ' m2 · ' +
          pessoas + ' pessoa' + (pessoas > 1 ? 's' : '') + ' · fator combinado x' + result.fatorTotal.toFixed(2);
      }

      if (infoGrid) {
        infoGrid.innerHTML =
          '<div class="info-item"><div class="info-val">' + area.toFixed(1).replace('.', ',') + ' m2</div><div class="info-key">Area total</div></div>' +
          '<div class="info-item"><div class="info-val">' + fmt(Math.round(result.base)) + '</div><div class="info-key">Carga base (600 BTU/m2)</div></div>' +
          '<div class="info-item"><div class="info-val">' + fmt(recEntry.btu) + '</div><div class="info-key">Capacidade sugerida</div></div>' +
          '<div class="info-item"><div class="info-val">' + recEntry.tipo + '</div><div class="info-key">Linha indicada</div></div>';
      }

      if (breakdown) {
        var f = result.fatores;
        var breakdownHtml = '';
        breakdownHtml += '<div class="breakdown-item"><span>Insolacao · ' + (LABELS.sol[sol] || sol) + '</span><span>' + pct(f.sol) + '</span></div>';
        breakdownHtml += '<div class="breakdown-item"><span>Uso · ' + (LABELS.uso[uso] || uso) + '</span><span>' + pct(f.uso) + '</span></div>';
        if (pe > 3) {
          breakdownHtml += '<div class="breakdown-item"><span>Pe-direito · ' + pe.toFixed(1).replace('.', ',') + ' m</span><span>' + pct(f.pe) + '</span></div>';
        }
        breakdownHtml += '<div class="breakdown-item"><span>' + (LABELS.andar[andar] || andar) + '</span><span>' + pct(f.andar) + '</span></div>';
        breakdownHtml += '<div class="breakdown-item"><span>' + (LABELS.janelas[janelas] || janelas) + '</span><span>' + pct(f.janelas) + '</span></div>';
        breakdownHtml += '<div class="breakdown-item"><span>' + (LABELS.isol[isol] || isol) + '</span><span>' + pct(f.isol) + '</span></div>';
        breakdownHtml += '<div class="breakdown-item"><span>' + (LABELS.layout[layout] || layout) + '</span><span>' + pct(f.layout) + '</span></div>';
        breakdownHtml += '<div class="breakdown-item"><span>' + (LABELS.clima[clima] || clima) + '</span><span>' + pct(f.clima) + '</span></div>';
        breakdownHtml += '<div class="breakdown-item"><span>' + (LABELS.horas[horas] || horas) + '</span><span>' + pct(f.horas) + '</span></div>';
        breakdownHtml += '<div class="breakdown-item"><span>' + (LABELS.umid[umid] || umid) + '</span><span>' + pct(f.umid) + '</span></div>';
        if (result.extras > 0) {
          breakdownHtml += '<div class="breakdown-item"><span>Pessoas + equipamentos</span><span>+' + fmt(result.extras) + ' BTU</span></div>';
        }
        breakdown.innerHTML = breakdownHtml;
      }

      if (recCards) {
        recCards.innerHTML =
          renderRecCard('minimo', 'Minimo', minEntry, 'Para ambientes menores') +
          renderRecCard('recomendado', 'Recomendado', recEntry, 'Ideal para o seu calculo') +
          renderRecCard('folga', 'Com folga', maxEntry, 'Margem extra de potencia');
      }

      if (tip) {
        var tips = [];
        if (ciclo === 'quente_frio' || clima === 'frio_inverno') {
          tips.push('<strong>Quente/Frio:</strong> prefira modelos com ciclo reversivel para aquecer no inverno.');
        }
        if (btus > 30000 && recEntry.tipo === 'Piso Teto') {
          tips.push('<strong>Acima de 30.000 BTUs:</strong> split hi-wall nao existe nesta faixa na loja — use <strong>Piso Teto</strong>.');
        } else if (layout !== 'fechado') {
          tips.push('<strong>Planta aberta:</strong> considere instalar o aparelho centralizado ou usar mais de uma unidade.');
        } else if (horas === 'comercial' || horas === 'dia_todo') {
          tips.push('<strong>Uso intenso:</strong> inverter na faixa recomendada reduz consumo e desgaste.');
        } else {
          tips.push('<strong>Dica:</strong> subdimensionar forca o aparelho e aumenta a conta de luz.');
        }
        tip.innerHTML = tips.join(' ');
      }

      showResult(boxEl);
      return false;
    } catch (err) {
      showError('Erro ao calcular. Recarregue a pagina e tente novamente.');
      if (window.console && console.error) console.error('sdaCalcular:', err);
      return false;
    }
  }

  window.sdaCalcular = sdaCalcular;

  function bindCalc() {
    var btn = sdaEl('sda-btn-calc');
    if (btn && !btn.getAttribute('data-sda-bound')) {
      btn.setAttribute('data-sda-bound', '1');
      btn.addEventListener('click', sdaCalcular);
    }
  }

  if (!window.__SDA_CALC_CLICK_BOUND) {
    window.__SDA_CALC_CLICK_BOUND = true;
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (!t) return;
      if (t.id === 'sda-btn-calc' || (t.closest && t.closest('#sda-btn-calc'))) {
        sdaCalcular(e);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindCalc);
  } else {
    bindCalc();
  }
})();
