<script>
(function () {
  'use strict';
  if (window.__SDA_CALC_READY) return;
  window.__SDA_CALC_READY = true;
  window.SDA_CALC = window.SDA_CALC || { lojaUrl: 'https://www.sitedoar.com.br' };

  var root = null;
  var bound = false;
  var catalog = [
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
  var F = {
    sol: { sem_sol: 1, sol_manha: 1.1, sol_tarde: 1.25 },
    uso: { quarto: 1, sala: 1.1, cozinha: 1.2, comercio: 1.5 },
    andar: { terreo: 1.05, intermediario: 1, cobertura: 1.15 },
    janelas: { poucas: 1, moderadas: 1.08, muitas: 1.18 },
    isol: { bom: 0.95, regular: 1, ruim: 1.12 },
    layout: { fechado: 1, planta_aberta: 1.15, mezanino: 1.2 },
    clima: { ameno: 1, quente: 1.08, muito_quente: 1.15, frio_inverno: 1 },
    horas: { noite: 1, tarde_noite: 1.05, dia_todo: 1.1, comercial: 1.15 },
    umid: { normal: 1, alta: 1.05, muito_alta: 1.1 }
  };
  var L = {
    sol: { sem_sol: 'Sem sol direto', sol_manha: 'Sol pela manh\u00e3', sol_tarde: 'Sol \u00e0 tarde' },
    uso: { quarto: 'Quarto', sala: 'Sala / Escrit\u00f3rio', cozinha: 'Cozinha', comercio: 'Com\u00e9rcio' },
    andar: { terreo: 'T\u00e9rreo', intermediario: 'Andar intermedi\u00e1rio', cobertura: 'Cobertura' },
    janelas: { poucas: 'Poucas janelas', moderadas: 'Janelas moderadas', muitas: 'Muitas janelas' },
    isol: { bom: 'Isolamento bom', regular: 'Isolamento regular', ruim: 'Isolamento ruim' },
    layout: { fechado: 'Ambiente fechado', planta_aberta: 'Planta aberta', mezanino: 'Mezanino' },
    clima: { ameno: 'Clima ameno', quente: 'Clima quente', muito_quente: 'Muito quente', frio_inverno: 'Frio no inverno' },
    horas: { noite: 'Uso noturno', tarde_noite: 'Tarde / noite', dia_todo: 'Dia todo', comercial: 'Uso comercial' },
    umid: { normal: 'Umidade normal', alta: 'Umidade alta', muito_alta: 'Umidade muito alta' }
  };

  function $(id) { return document.getElementById(id); }
  function v(id) { var e = $(id); return e ? e.value : ''; }
  function num(id, def) {
    var n = parseFloat(String(v(id)).replace(/\s/g, '').replace(',', '.').trim());
    return isFinite(n) ? n : def;
  }
  function fmt(n) {
    try { return Math.round(n).toLocaleString('pt-BR'); }
    catch (eF) { return String(Math.round(n)); }
  }
  function pct(f) { var n = Math.round((f - 1) * 100); return n === 0 ? '0%' : (n > 0 ? '+' : '') + n + '%'; }
  function entry(i) {
    if (i < 0) return catalog[0];
    if (i >= catalog.length) return catalog[catalog.length - 1];
    return catalog[i];
  }
  function shopBase() {
    var cfg = window.SDA_CALC || {};
    if (cfg.lojaUrl) return String(cfg.lojaUrl).replace(/\/$/, '');
    try {
      if (window.location && window.location.origin && window.location.origin !== 'null') {
        return String(window.location.origin).replace(/\/$/, '');
      }
    } catch (e0) {}
    return 'https://www.sitedoar.com.br';
  }
  function productHref(path) {
    if (!path) return shopBase();
    if (/^https?:\/\//i.test(path)) return path;
    return shopBase() + (path.charAt(0) === '/' ? path : '/' + path);
  }
  function fieldInvalid(id, bad) {
    var e = $(id);
    if (!e || !e.closest) return;
    var field = e.closest('.field');
    if (field) field.classList.toggle('invalid', bad);
  }
  function hideResult(box) {
    if (!box) return;
    box.classList.remove('show', 'cycle-hot', 'cycle-cold');
    box.style.display = 'none';
    box.style.visibility = 'hidden';
    box.style.opacity = '0';
  }
  function showResult(box, cycle) {
    if (!box) return;
    box.classList.remove('cycle-hot', 'cycle-cold');
    box.classList.add(cycle === 'quente_frio' ? 'cycle-hot' : 'cycle-cold', 'show');
    box.style.display = 'block';
    box.style.visibility = 'visible';
    box.style.opacity = '1';
    try { box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e1) { box.scrollIntoView(); }
  }
  function showCalcError(msg) {
    var err = $('sda-error');
    if (err) {
      err.textContent = msg;
      err.classList.add('show');
      err.style.display = 'block';
    }
    hideResult($('sda-resultBox'));
  }
  function cardHtml(tag, e, cls, desc) {
    var href = productHref(e.url);
    return (
      '<div class="rec-card ' + cls + '">' +
      '<span class="rec-tag">' + tag + '</span>' +
      '<div class="rec-btu">' + e.label + '</div>' +
      '<div class="rec-label">' + desc + '<br>' + e.tipo + '</div>' +
      '<a class="rec-link" href="' + href + '">Ver modelos</a></div>'
    );
  }

  function sdaCalcular(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    try {
      var err = $('sda-error');
      var box = $('sda-resultBox');
      var comp = num('sda-comp', NaN);
      var larg = num('sda-larg', NaN);
      fieldInvalid('sda-comp', !(comp > 0));
      fieldInvalid('sda-larg', !(larg > 0));
      if (!(comp > 0) || !(larg > 0)) {
        var msg = !(comp > 0) && !(larg > 0)
          ? 'Por favor, preencha o comprimento e a largura do ambiente.'
          : (!(comp > 0) ? 'Informe o comprimento do ambiente.' : 'Informe a largura do ambiente.');
        showCalcError(msg);
        return false;
      }
      if (err) {
        err.classList.remove('show');
        err.style.display = 'none';
        err.textContent = '';
      }

      var pe = num('sda-pe', 2.6);
      var pessoas = Math.max(1, parseInt(v('sda-pessoas'), 10) || 1);
      var equip = parseInt(v('sda-equip'), 10) || 0;
      var area = comp * larg;
      var p = {
        sol: v('sda-sol'), uso: v('sda-uso'), andar: v('sda-andar'), janelas: v('sda-janelas'),
        isol: v('sda-isol'), layout: v('sda-layout'), clima: v('sda-clima'), horas: v('sda-horas'), umid: v('sda-umidade')
      };
      var f = {}, k;
      for (k in F) { if (Object.prototype.hasOwnProperty.call(F, k)) f[k] = F[k][p[k]] || 1; }
      f.pe = pe > 3 ? pe / 2.6 : 1;
      var total = f.sol * f.uso * f.pe * f.andar * f.janelas * f.isol * f.layout * f.clima * f.horas * f.umid;
      var base = area * 600;
      var extras = (pessoas > 1 ? (pessoas - 1) * 600 : 0) + equip;
      var load = Math.ceil((base * total + extras) / 500) * 500;
      var idx = catalog.length - 1;
      var i;
      for (i = 0; i < catalog.length; i++) {
        if (load <= catalog[i].btu) { idx = i; break; }
      }
      var rec = entry(idx);
      var min = entry(idx - 1);
      var max = entry(idx + 1);

      if ($('sda-resultNum')) $('sda-resultNum').innerHTML = fmt(load) + ' <span>BTUs/h</span>';
      if ($('sda-resultSub')) {
        $('sda-resultSub').textContent =
          'Ambiente de ' + area.toFixed(1).replace('.', ',') + ' m\u00b2 \u00b7 ' +
          pessoas + ' pessoa' + (pessoas > 1 ? 's' : '') + ' \u00b7 c\u00e1lculo estimado.';
      }
      if ($('sda-recommendationBtu')) $('sda-recommendationBtu').textContent = rec.label + ' BTUs';
      if ($('sda-recommendationText')) {
        $('sda-recommendationText').textContent = load === rec.btu
          ? 'A capacidade calculada coincide com uma op\u00e7\u00e3o comercial.'
          : 'A pr\u00f3xima faixa comercial oferece margem para evitar subdimensionamento.';
      }
      if ($('sda-infoGrid')) {
        $('sda-infoGrid').innerHTML =
          '<div class="info-item"><div class="info-val">' + area.toFixed(1).replace('.', ',') + ' m\u00b2</div><div class="info-key">\u00c1rea total</div></div>' +
          '<div class="info-item"><div class="info-val">' + fmt(base) + '</div><div class="info-key">Carga base</div></div>' +
          '<div class="info-item"><div class="info-val">' + rec.tipo + '</div><div class="info-key">Linha indicada</div></div>';
      }
      var keys = [['sol', 'Insola\u00e7\u00e3o'], ['uso', 'Uso'], ['pe', 'P\u00e9-direito'], ['andar', 'Andar'], ['janelas', 'Janelas'], ['isol', 'Isolamento'], ['layout', 'Layout'], ['clima', 'Clima'], ['horas', 'Horas'], ['umid', 'Umidade']];
      var out = '';
      for (i = 0; i < keys.length; i++) {
        k = keys[i][0];
        if (k === 'pe' && pe <= 3) continue;
        var label = k === 'pe' ? 'Acima de 3 m' : (L[k][p[k]] || p[k]);
        out += '<div class="breakdown-item"><span>' + keys[i][1] + ' \u00b7 ' + label + '</span><span>' + pct(f[k]) + '</span></div>';
      }
      out += '<div class="breakdown-item"><span>Pessoas + equipamentos</span><span>+' + fmt(extras) + ' BTU</span></div>';
      if ($('sda-breakdown')) $('sda-breakdown').innerHTML = out;
      if ($('sda-recCards')) {
        $('sda-recCards').innerHTML =
          cardHtml('M\u00ednimo', min, '', 'Para ambientes menores') +
          cardHtml('Recomendado', rec, 'recommended', 'Faixa indicada') +
          cardHtml('Com folga', max, '', 'Margem extra');
      }
      var tip = p.layout !== 'fechado'
        ? 'Planta aberta: avalie centralizar o aparelho ou usar mais de uma unidade.'
        : (p.clima === 'frio_inverno' || v('sda-ciclo') === 'quente_frio'
          ? 'Para aquecer no inverno, prefira um modelo Quente e Frio.'
          : 'Evite escolher abaixo da recomenda\u00e7\u00e3o para n\u00e3o for\u00e7ar o aparelho.');
      if ($('sda-tipBox')) $('sda-tipBox').textContent = tip;

      var shopUrl = productHref(rec.url);
      if ($('sda-ver-modelos')) {
        $('sda-ver-modelos').href = shopUrl;
        $('sda-ver-modelos').textContent = 'Ver modelos de ' + rec.label + ' BTUs';
      }
      if ($('sda-whatsapp')) {
        $('sda-whatsapp').href = 'https://wa.me/5519984176960?text=' + encodeURIComponent(
          'Ol\u00e1! Calculei ' + rec.label + ' BTUs para um ambiente de ' + area.toFixed(1) + ' m\u00b2 e gostaria de ajuda.'
        );
      }
      showResult(box, v('sda-ciclo'));
      return false;
    } catch (err2) {
      showCalcError('Erro ao calcular. Recarregue a p\u00e1gina e tente novamente.');
      if (typeof console !== 'undefined' && console.error) console.error('sdaCalcular:', err2);
      return false;
    }
  }

  function resetCalc(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    hideResult($('sda-resultBox'));
    var err = $('sda-error');
    if (err) { err.classList.remove('show'); err.style.display = 'none'; err.textContent = ''; }
    fieldInvalid('sda-comp', false);
    fieldInvalid('sda-larg', false);
    if (root && root.scrollIntoView) {
      try { root.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e3) { root.scrollIntoView(); }
    }
    return false;
  }

  function bind() {
    if (bound) return true;
    var btn = $('sda-btn-calc');
    if (!btn) return false;
    if (!root) root = $('sda-calc-app');
    bound = true;
    btn.onclick = function (e) { if (e) e.preventDefault(); sdaCalcular(e); return false; };
    var reset = $('sda-reset');
    if (reset) reset.onclick = function (e) { if (e) e.preventDefault(); resetCalc(e); return false; };
    var scope = root || document;
    var inputs = scope.querySelectorAll ? scope.querySelectorAll('#sda-calc-app input, #sda-comp, #sda-larg') : [];
    for (var j = 0; j < inputs.length; j++) {
      inputs[j].oninput = function () { fieldInvalid(this.id, false); };
    }
    return true;
  }

  function markPage() {
    document.documentElement.classList.add('sda-btu-page', 'sda-btu-active');
    if (document.body) document.body.classList.add('sda-btu-page', 'sda-btu-active');
  }

  function init() {
    root = $('sda-calc-app');
    if (!root) return false;
    markPage();
    if (!bind()) return false;
    window.__sdaCalcProReady = true;
    return true;
  }

  function attachDocClick() {
    if (window.__SDA_CALC_DOC_CLICK) return;
    window.__SDA_CALC_DOC_CLICK = true;
    document.addEventListener(
      'click',
      function (ev) {
        var t = ev.target;
        if (!t || !t.closest) return;
        if (t.id === 'sda-btn-calc' || t.closest('#sda-btn-calc')) {
          ev.preventDefault();
          if (window.sdaCalcular) window.sdaCalcular(ev);
        } else if (t.id === 'sda-reset' || t.closest('#sda-reset')) {
          ev.preventDefault();
          if (window.sdaCalcReset) window.sdaCalcReset(ev);
        }
      },
      true
    );
  }

  function boot() {
    if (init()) return;
    var tries = 0;
    var iv = setInterval(function () {
