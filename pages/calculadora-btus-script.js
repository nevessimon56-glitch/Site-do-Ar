/**
 * Calculadora BTUs — Site do Ar
 * Dimensionamento completo v2 (set/2026).
 * Split Inverter só até 30.000 BTUs; acima disso → Piso Teto.
 */
(function () {
  'use strict';

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
    sol: { sem_sol: 'Sem sol', sol_manha: 'Sol manhã', sol_tarde: 'Sol tarde' },
    uso: { quarto: 'Quarto', sala: 'Sala', cozinha: 'Cozinha', comercio: 'Comércio' },
    andar: { terreo: 'Térreo', intermediario: 'Intermediário', cobertura: 'Cobertura' },
    janelas: { poucas: 'Poucas janelas', moderadas: 'Janelas moderadas', muitas: 'Muitas janelas' },
    isol: { bom: 'Isolamento bom', regular: 'Isolamento regular', ruim: 'Isolamento ruim' },
    layout: { fechado: 'Fechado', planta_aberta: 'Planta aberta', mezanino: 'Mezanino' },
    clima: { ameno: 'Clima ameno', quente: 'Clima quente', muito_quente: 'Muito quente', frio_inverno: 'Frio no inverno' },
    horas: { noite: 'Uso noturno', tarde_noite: 'Tarde/noite', dia_todo: 'Dia todo', comercial: 'Uso comercial' },
    umid: { normal: 'Umidade normal', alta: 'Umidade alta', muito_alta: 'Umidade muito alta' }
  };

  function fmt(n) {
    return n.toLocaleString('pt-BR');
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

  window.sdaCalcular = function sdaCalcular() {
    var errEl = document.getElementById('sda-error');
    var boxEl = document.getElementById('sda-resultBox');
    var comp = parseFloat(document.getElementById('sda-comp').value);
    var larg = parseFloat(document.getElementById('sda-larg').value);
    var pe = parseFloat(document.getElementById('sda-pe').value) || 2.6;
    var sol = document.getElementById('sda-sol').value;
    var uso = document.getElementById('sda-uso').value;
    var pessoas = parseInt(document.getElementById('sda-pessoas').value, 10) || 1;
    var equip = parseInt(document.getElementById('sda-equip').value, 10) || 0;
    var andar = document.getElementById('sda-andar').value;
    var janelas = document.getElementById('sda-janelas').value;
    var isol = document.getElementById('sda-isol').value;
    var layout = document.getElementById('sda-layout').value;
    var clima = document.getElementById('sda-clima').value;
    var horas = document.getElementById('sda-horas').value;
    var ciclo = document.getElementById('sda-ciclo').value;
    var umid = document.getElementById('sda-umidade').value;

    if (!comp || !larg || comp <= 0 || larg <= 0) {
      errEl.classList.add('show');
      boxEl.classList.remove('show');
      return;
    }
    errEl.classList.remove('show');

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

    document.getElementById('sda-resultNum').innerHTML = fmt(btus) + '<span>BTUs/h</span>';
    document.getElementById('sda-resultSub').textContent =
      'Ambiente de ' + area.toFixed(1).replace('.', ',') + ' m² · ' +
      pessoas + ' pessoa' + (pessoas > 1 ? 's' : '') + ' · fator combinado ×' + result.fatorTotal.toFixed(2);

    document.getElementById('sda-infoGrid').innerHTML =
      '<div class="info-item"><div class="info-val">' + area.toFixed(1).replace('.', ',') + ' m²</div><div class="info-key">Área total</div></div>' +
      '<div class="info-item"><div class="info-val">' + fmt(Math.round(result.base)) + '</div><div class="info-key">Carga base (600 BTU/m²)</div></div>' +
      '<div class="info-item"><div class="info-val">' + fmt(recEntry.btu) + '</div><div class="info-key">Capacidade sugerida</div></div>' +
      '<div class="info-item"><div class="info-val">' + recEntry.tipo + '</div><div class="info-key">Linha indicada</div></div>';

    var f = result.fatores;
    var breakdownHtml = '';
    breakdownHtml += '<div class="breakdown-item"><span>Insolação · ' + LABELS.sol[sol] + '</span><span>' + pct(f.sol) + '</span></div>';
    breakdownHtml += '<div class="breakdown-item"><span>Uso · ' + LABELS.uso[uso] + '</span><span>' + pct(f.uso) + '</span></div>';
    if (pe > 3) {
      breakdownHtml += '<div class="breakdown-item"><span>Pé-direito · ' + pe.toFixed(1).replace('.', ',') + ' m</span><span>' + pct(f.pe) + '</span></div>';
    }
    breakdownHtml += '<div class="breakdown-item"><span>' + LABELS.andar[andar] + '</span><span>' + pct(f.andar) + '</span></div>';
    breakdownHtml += '<div class="breakdown-item"><span>' + LABELS.janelas[janelas] + '</span><span>' + pct(f.janelas) + '</span></div>';
    breakdownHtml += '<div class="breakdown-item"><span>' + LABELS.isol[isol] + '</span><span>' + pct(f.isol) + '</span></div>';
    breakdownHtml += '<div class="breakdown-item"><span>' + LABELS.layout[layout] + '</span><span>' + pct(f.layout) + '</span></div>';
    breakdownHtml += '<div class="breakdown-item"><span>' + LABELS.clima[clima] + '</span><span>' + pct(f.clima) + '</span></div>';
    breakdownHtml += '<div class="breakdown-item"><span>' + LABELS.horas[horas] + '</span><span>' + pct(f.horas) + '</span></div>';
    breakdownHtml += '<div class="breakdown-item"><span>' + LABELS.umid[umid] + '</span><span>' + pct(f.umid) + '</span></div>';
    if (result.extras > 0) {
      breakdownHtml += '<div class="breakdown-item"><span>Pessoas + equipamentos</span><span>+' + fmt(result.extras) + ' BTU</span></div>';
    }
    document.getElementById('sda-breakdown').innerHTML = breakdownHtml;

    document.getElementById('sda-recCards').innerHTML =
      renderRecCard('minimo', 'Mínimo', minEntry, 'Para ambientes menores') +
      renderRecCard('recomendado', 'Recomendado', recEntry, 'Ideal para o seu cálculo') +
      renderRecCard('folga', 'Com folga', maxEntry, 'Margem extra de potência');

    var tip = document.getElementById('sda-tipBox');
    var tips = [];
    if (ciclo === 'quente_frio' || clima === 'frio_inverno') {
      tips.push('<strong>Quente/Frio:</strong> prefira modelos com ciclo reversível para aquecer no inverno.');
    }
    if (btus > 30000 && recEntry.tipo === 'Piso Teto') {
      tips.push('<strong>Acima de 30.000 BTUs:</strong> split hi-wall não existe nesta faixa na loja — os modelos de <strong>Piso Teto</strong> são os indicados.');
    } else if (layout !== 'fechado') {
      tips.push('<strong>Planta aberta:</strong> considere instalar o aparelho centralizado ou usar mais de uma unidade para cobrir todo o espaço.');
    } else if (horas === 'comercial' || horas === 'dia_todo') {
      tips.push('<strong>Uso intenso:</strong> inverter na faixa recomendada reduz consumo e desgaste do compressor.');
    } else {
      tips.push('<strong>Dica:</strong> subdimensionar força o aparelho e aumenta a conta de luz — prefira a faixa recomendada.');
    }
    tip.innerHTML = tips.join(' ');

    boxEl.classList.add('show');
    boxEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
})();
