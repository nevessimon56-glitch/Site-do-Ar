/**
 * Calculadora BTUs — Site do Ar
 * URLs validadas no catálogo ao vivo (set/2026).
 * Split Inverter só até 30.000 BTUs; acima disso → Piso Teto.
 */
(function () {
  'use strict';

  /* Catálogo real — cada url retorna produtos (testado no site) */
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

  function fmt(n) {
    return n.toLocaleString('pt-BR');
  }

  function fatPe(altura) {
    return altura > 3 ? altura / 2.6 : 1.0;
  }

  function calcBtus(area, sol, uso, pe, pessoas, equip) {
    var btus = area * 600 * (FAT_SOL[sol] || 1.10) * (FAT_USO[uso] || 1.10) * fatPe(pe);
    if (pessoas > 1) btus += (pessoas - 1) * 600;
    btus += equip || 0;
    return Math.ceil(btus / 500) * 500;
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

  function buildProductUrl(entry) {
    return entry.url;
  }

  function renderRecCard(tagClass, tagLabel, entry, sublabel) {
    return (
      '<div class="rec-card">' +
        '<span class="rec-tag ' + tagClass + '">' + tagLabel + '</span>' +
        '<div class="rec-btus">' + entry.label + '</div>' +
        '<div class="rec-label">' + sublabel + '<br>' + entry.tipo + '</div>' +
        '<a class="rec-link" href="' + buildProductUrl(entry) + '">Ver modelos</a>' +
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

    if (!comp || !larg || comp <= 0 || larg <= 0) {
      errEl.classList.add('show');
      boxEl.classList.remove('show');
      return;
    }
    errEl.classList.remove('show');

    var area = comp * larg;
    var btus = calcBtus(area, sol, uso, pe, pessoas, equip);
    var idealIdx = findIdealIndex(btus);
    var minEntry = catalogEntry(idealIdx - 1);
    var recEntry = catalogEntry(idealIdx);
    var maxEntry = catalogEntry(idealIdx + 1);

    document.getElementById('sda-resultNum').innerHTML = fmt(btus) + '<span>BTUs/h</span>';
    document.getElementById('sda-resultSub').textContent =
      'Ambiente de ' + area.toFixed(1).replace('.', ',') + ' m² · capacidade arredondada para o padrão comercial';

    document.getElementById('sda-infoGrid').innerHTML =
      '<div class="info-item"><div class="info-val">' + area.toFixed(1).replace('.', ',') + ' m²</div><div class="info-key">Área total</div></div>' +
      '<div class="info-item"><div class="info-val">' + fmt(recEntry.btu) + '</div><div class="info-key">Capacidade sugerida</div></div>' +
      '<div class="info-item"><div class="info-val">' + recEntry.tipo + '</div><div class="info-key">Linha indicada</div></div>';

    document.getElementById('sda-recCards').innerHTML =
      renderRecCard('minimo', 'Mínimo', minEntry, 'Para ambientes menores') +
      renderRecCard('recomendado', 'Recomendado', recEntry, 'Ideal para o seu cálculo') +
      renderRecCard('folga', 'Com folga', maxEntry, 'Margem extra de potência');

    var tip = document.getElementById('sda-tipBox');
    if (btus > 30000 && recEntry.tipo === 'Piso Teto') {
      tip.innerHTML =
        '<strong>Acima de 30.000 BTUs:</strong> split hi-wall não existe nesta faixa na loja. ' +
        'Os modelos de <strong>Piso Teto</strong> são os indicados para salões, lojas e ambientes amplos.';
    } else if (btus >= 36000) {
      tip.innerHTML =
        '<strong>Dica:</strong> para ' + fmt(btus) + ' BTUs, confira a linha <strong>Piso Teto</strong> — ' +
        'não há split inverter de 36.000 BTUs no catálogo.';
    } else {
      tip.innerHTML =
        '<strong>Dica:</strong> prefira inverter na faixa recomendada para economia de energia. ' +
        'Subdimensionar força o aparelho e aumenta a conta de luz.';
    }

    boxEl.classList.add('show');
    boxEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
})();
