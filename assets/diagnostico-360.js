(function () {
  if (window.__diag360Ready) return;

  var overlay = document.getElementById('diag360-overlay');
  if (!overlay) return;

  document.body.classList.add('diag360-active');

  var LOGO_URL = 'https://salescdn.net/XOFBUXAbeaqnTcy-gCa7vQrXkio=/adaptive-fit-in/260x0/prod/store/13805/medias/storage/1777059085610.webp';
  (function ensureLogo() {
    var link = document.querySelector('.d-logo');
    if (!link) return;
    link.style.background = 'none';
    link.querySelectorAll('.d-logo-icon').forEach(function(el) { el.remove(); });
    var imgs = link.querySelectorAll('img');
    var img = imgs[0] || null;
    if (!img) {
      link.textContent = '';
      img = document.createElement('img');
      img.className = 'd-logo-img';
      img.alt = 'Site Do Ar';
      img.width = 180;
      img.height = 40;
      link.appendChild(img);
    }
    for (var i = 1; i < imgs.length; i++) imgs[i].remove();
    img.className = 'd-logo-img';
    img.src = LOGO_URL;
    link.setAttribute('title', 'Site Do Ar');
    link.setAttribute('aria-label', 'Site Do Ar');
  })();

  var dims = { economy: 'Economia', comfort: 'Conforto', speed: 'Agilidade', silence: 'Silêncio', tech: 'Tecnologia', power: 'Potência' };
  var state = { step: 0, answers: {}, scores: { economy:0, comfort:0, speed:0, silence:0, tech:0, power:0 }, btuRaw: 9000, btuBase: 9000 };

  /* Faixas com URLs reais do catálogo (sem 36k split — vitrine inexistente na loja) */
  var BTU_RANGES = [
    { max:  9000, btu:  9000, label: '9.000',  url: '/split-inverter/9000-btus' },
    { max: 12000, btu: 12000, label: '12.000', url: '/split-inverter/12000-Btus' },
    { max: 18000, btu: 18000, label: '18.000', url: '/split-inverter/18000-Btus' },
    { max: 24000, btu: 24000, label: '24.000', url: '/split-inverter/24000-Btus' },
    { max: 30000, btu: 30000, label: '30.000', url: '/split-inverter/30000-Btus' },
    { max: 36000, btu: 36000, label: '36.000', url: '/Piso-Teto/36000-Btus' },
    { max: 46000, btu: 46000, label: '46.000', url: '/Piso-Teto/46000-Btus' },
    { max: 48000, btu: 48000, label: '48.000', url: '/Piso-Teto/48000-Btus' },
    { max: 56000, btu: 56000, label: '56.000', url: '/Piso-Teto/56000-btus' },
    { max: 99999, btu: 56000, label: '56.000', url: '/Piso-Teto/56000-btus' }
  ];

  var questions = [
    { id:'environment', type:'single', title:'Qual tipo de ambiente será climatizado?', hint:'Cada ambiente tem perfil de uso e carga térmica diferente.',
      options:[
        {label:'Quarto',desc:'Dormitório ou quarto de hóspedes.',emoji:'🛏',scores:{silence:2,comfort:2}},
        {label:'Sala de estar',desc:'Área de convivência da casa.',emoji:'🛋',scores:{comfort:3,power:1}},
        {label:'Escritório',desc:'Home office ou sala de estudos.',emoji:'💻',scores:{silence:2,tech:2}},
        {label:'Comercial',desc:'Loja, consultório ou recepção.',emoji:'🏢',scores:{power:3,speed:2}},
        {label:'Cozinha',desc:'Calor de fogão e eletros.',emoji:'🍳',scores:{power:4,speed:1}},
        {label:'Lavanderia',desc:'Umidade e calor de máquinas.',emoji:'🧺',scores:{power:2,comfort:1}}
      ]
    },
    { id:'roomSize', type:'single', title:'Qual é a área aproximada do ambiente?', hint:'Usamos a mesma base da calculadora de BTUs do site (600 BTU/m²).',
      options:[
        {label:'Até 10 m²',desc:'Quarto individual ou closet.',emoji:'📐'},
        {label:'10 a 15 m²',desc:'Quarto pequeno ou home office.',emoji:'📐'},
        {label:'15 a 25 m²',desc:'Quarto casal ou sala compacta.',emoji:'📐'},
        {label:'25 a 40 m²',desc:'Sala de estar ou escritório médio.',emoji:'📐'},
        {label:'Mais de 40 m²',desc:'Sala grande ou ambiente comercial.',emoji:'📐'}
      ]
    },
    { id:'roomType', type:'single', title:'Como é a exposição solar do ambiente?', hint:'Sol e pé-direito influenciam a potência necessária.',
      options:[
        {label:'Pouco sol',desc:'Sombra ou janelas pequenas.',emoji:'🌥',scores:{economy:2}},
        {label:'Sol parcial',desc:'Sol em parte do dia.',emoji:'⛅',scores:{comfort:1}},
        {label:'Muito sol direto',desc:'Janelas grandes voltadas ao sol.',emoji:'☀',scores:{power:3}},
        {label:'Pé-direito alto',desc:'Acima de 3 metros de altura.',emoji:'⬆',scores:{power:2}},
        {label:'Planta aberta',desc:'Mezanino ou integrado à casa.',emoji:'🏗',scores:{power:4}}
      ]
    },
    { id:'windows', type:'single', title:'Quantas janelas ou aberturas o ambiente tem?', hint:'Vidros e aberturas aumentam a carga térmica.',
      options:[
        {label:'Poucas janelas',desc:'Uma janela ou quase fechado.',emoji:'🪟',scores:{economy:1}},
        {label:'Janelas médias',desc:'Duas a três janelas comuns.',emoji:'🪟',scores:{comfort:1}},
        {label:'Muitas janelas',desc:'Vários vãos ou parede de vidro.',emoji:'🌅',scores:{power:2}},
        {label:'Varanda integrada',desc:'Portas de correr ou sacada aberta.',emoji:'🚪',scores:{power:3}}
      ]
    },
    { id:'floor', type:'single', title:'Em qual andar fica o ambiente?', hint:'Cobertura e térreo recebem calor de formas diferentes.',
      options:[
        {label:'Térreo ou subsolo',desc:'Sem apartamento acima.',emoji:'🏠',scores:{comfort:1}},
        {label:'Andar intermediário',desc:'Entre o 2º e penúltimo andar.',emoji:'🏢',scores:{economy:1}},
        {label:'Cobertura ou último andar',desc:'Sol direto no telhado/laje.',emoji:'☀',scores:{power:3}}
      ]
    },
    { id:'insulation', type:'single', title:'Como é o isolamento térmico do ambiente?', hint:'Paredes, vidros e laje afetam quanto calor entra.',
      options:[
        {label:'Bem isolado',desc:'Paredes grossas, vidro duplo ou reforma recente.',emoji:'🧱',scores:{economy:2}},
        {label:'Isolamento padrão',desc:'Construção comum, sem destaque.',emoji:'🏠',scores:{comfort:1}},
        {label:'Pouco isolado',desc:'Vidro simples, parede fina ou muito sol.',emoji:'🌡',scores:{power:2}}
      ]
    },
    { id:'occupants', type:'single', title:'Quantas pessoas ocupam o ambiente normalmente?', hint:'Cada pessoa adiciona cerca de 600 BTU/h.',
      options:[
        {label:'Somente eu',desc:'Uso individual.',emoji:'👤',scores:{economy:2}},
        {label:'2 pessoas',desc:'Casal ou dupla.',emoji:'👥',scores:{comfort:2}},
        {label:'3 a 4 pessoas',desc:'Família ou reunião pequena.',emoji:'👨‍👩‍👧',scores:{comfort:2,power:1}},
        {label:'5 a 8 pessoas',desc:'Sala de reunião ou família grande.',emoji:'👨‍👩‍👧‍👦',scores:{power:3}},
        {label:'9 ou mais',desc:'Comercial, sala de aula ou eventos.',emoji:'↔',scores:{power:5,speed:2}}
      ]
    },
    { id:'heatLoad', type:'single', title:'Há equipamentos que geram calor no ambiente?', hint:'TV, PC, geladeira e fogão aumentam a carga térmica.',
      options:[
        {label:'Quase nenhum',desc:'Só lâmpadas e celular.',emoji:'💡',scores:{economy:2}},
        {label:'TV e computador',desc:'Home office ou entretenimento.',emoji:'🖥',scores:{tech:2,comfort:1}},
        {label:'Vários eletrodomésticos',desc:'PC, TV, geladeira ou micro-ondas.',emoji:'🔌',scores:{power:2}},
        {label:'Ambiente comercial/cozinha',desc:'Equipamentos ligados o dia todo.',emoji:'🏭',scores:{power:4,speed:1}}
      ]
    },
    { id:'usage', type:'single', title:'Qual é a rotina de uso do ar-condicionado?', hint:'Frequência de uso influencia eficiência e payback.',
      options:[
        {label:'Só para dormir',desc:'6 a 8 horas por noite.',emoji:'🌙',scores:{silence:4,economy:3}},
        {label:'Tarde e noite',desc:'Uso moderado, principalmente à tarde.',emoji:'🌅',scores:{comfort:3,economy:2}},
        {label:'O dia todo',desc:'Uso intenso e contínuo.',emoji:'☀',scores:{economy:4,power:2}},
        {label:'Uso comercial',desc:'Abertura à fechamento.',emoji:'🏪',scores:{power:5,speed:2}}
      ]
    },
    { id:'climate', type:'single', title:'Como é o clima na sua região?', hint:'Temperatura média impacta o dimensionamento.',
      options:[
        {label:'Muito quente',desc:'Verão intenso, acima de 35°C.',emoji:'🔥',scores:{power:3,economy:2}},
        {label:'Quente com chuvas',desc:'Umidade alta e calor.',emoji:'🌧',scores:{comfort:2,power:2}},
        {label:'Clima ameno',desc:'Temperaturas moderadas.',emoji:'🌤',scores:{economy:2,comfort:2}},
        {label:'Faz frio no inverno',desc:'Precisa aquecer também.',emoji:'❄',scores:{comfort:4}}
      ]
    },
    { id:'humidity', type:'single', title:'Como é a umidade do ar na região?', hint:'Ambientes úmidos exigem mais capacidade de resfriamento.',
      options:[
        {label:'Baixa umidade',desc:'Ar seco, interior ou altitude.',emoji:'🏜',scores:{economy:1}},
        {label:'Umidade normal',desc:'Padrão da maioria das cidades.',emoji:'💧',scores:{comfort:1}},
        {label:'Alta umidade',desc:'Litoral, vale ou chuvas frequentes.',emoji:'🌊',scores:{power:2,comfort:1}}
      ]
    },
    { id:'noise', type:'single', title:'O barulho do ar-condicionado te incomoda?', hint:'Filtra linhas silenciosas e inverter.',
      options:[
        {label:'Muito, não consigo dormir',desc:'Linha silenciosa é prioridade.',emoji:'😣',scores:{silence:5}},
        {label:'Um pouco',desc:'Prefiro silencioso mas não é crítico.',emoji:'😐',scores:{silence:3}},
        {label:'Não me incomoda',desc:'Conforto térmico é o foco.',emoji:'😌',scores:{comfort:2}},
        {label:'É para área comercial',desc:'Ruído não é determinante.',emoji:'🏪',scores:{power:3}}
      ]
    },
    { id:'priority', type:'single', title:'Qual fator é mais importante para você?', hint:'Define o perfil de recomendação e argumentação de venda.',
      options:[
        {label:'Economizar na conta',desc:'Menor consumo possível.',emoji:'💡',scores:{economy:5}},
        {label:'Conforto constante',desc:'Temperatura sempre agradável.',emoji:'🌡',scores:{comfort:5}},
        {label:'Menos ruído',desc:'Dormir e trabalhar sem barulho.',emoji:'🔇',scores:{silence:5}},
        {label:'Tecnologia e praticidade',desc:'Controle pelo celular e recursos.',emoji:'📱',scores:{tech:5}},
        {label:'Potência máxima',desc:'Resfriamento rápido e forte.',emoji:'⚡',scores:{power:5}}
      ]
    },
    { id:'features', type:'multi', title:'Quais recursos fariam você escolher mais rápido?', hint:'Selecione quantos quiser — ajuda a personalizar a recomendação.',
      options:[
        {label:'Inverter',desc:'Economia e conforto contínuo.',emoji:'♻',scores:{economy:4,comfort:2}},
        {label:'Wi-Fi',desc:'Controle pelo celular e rotina.',emoji:'📶',scores:{tech:5}},
        {label:'Quente/Frio',desc:'Uso em mais épocas do ano.',emoji:'🌡',scores:{comfort:4}},
        {label:'Purificador de ar',desc:'Filtro HEPA ou ionizador.',emoji:'🌬',scores:{comfort:3,tech:2}},
        {label:'Controle por voz',desc:'Alexa, Google ou app inteligente.',emoji:'🎙',scores:{tech:4}},
        {label:'Marca reconhecida',desc:'Segurança e pós-venda.',emoji:'⭐',scores:{comfort:2,power:1}}
      ]
    },
    { id:'urgency', type:'single', title:'Qual é o nível de urgência da compra?', hint:'Ajuda a direcionar para WhatsApp, vitrine ou comparação.',
      options:[
        {label:'Estou pesquisando',desc:'Precisa de conteúdo e comparação.',emoji:'🔎',scores:{tech:1,economy:2}},
        {label:'Quero comprar em breve',desc:'Mostre produtos e benefícios.',emoji:'🛒',scores:{comfort:2,speed:2}},
        {label:'Preciso resolver rápido',desc:'WhatsApp e estoque disponível.',emoji:'🚨',scores:{speed:5,power:2}},
        {label:'É para projeto maior',desc:'Atendimento consultivo.',emoji:'📐',scores:{power:4,tech:2}}
      ]
    }
  ];

  var facts = [
    'Em 1842, John Gorrie projetou uma máquina para produzir gelo e resfriar ambientes hospitalares na Flórida.',
    'Em 1902, Willis Carrier criou o primeiro sistema moderno de controle de temperatura e umidade para uma gráfica de Nova York.',
    'O termo "air conditioning" foi popularizado em 1906 pelo engenheiro Stuart Cramer.',
    'Na década de 1920, cinemas com ar-condicionado viraram atração nos Estados Unidos.',
    'Em 1931, H.H. Schultz e J.Q. Sherman patentearam o ar-condicionado de janela.',
    'A tecnologia inverter ajusta a velocidade do compressor, economizando energia e mantendo temperatura estável.',
    'O Protocolo de Montreal limitou os CFCs e impulsionou a evolução dos fluidos refrigerantes.',
    'Sistemas modernos controlam temperatura, umidade, filtração e nível de ruído ao mesmo tempo.',
    'O ar-condicionado ajudou no crescimento de regiões muito quentes, tornando casas e escritórios confortáveis.',
    'Em 1939, a Packard apresentou um dos primeiros sistemas de ar-condicionado para automóveis.',
    'Cada pessoa em um ambiente adiciona cerca de 600 BTU/h de carga térmica — por isso salas cheias exigem mais potência.',
    'Ambientes no último andar ou cobertura recebem calor extra do telhado e podem precisar de 10% a 15% mais BTUs.',
    'Vidros grandes sem proteção solar podem aumentar a necessidade de resfriamento em até 20%.',
    'Um aparelho subdimensionado trabalha no limite, consome mais e desgasta mais rápido.',
    'O dimensionamento correto considera área, pessoas, sol, umidade, equipamentos e horas de uso — não só metragem.'
  ];

  var els = {
    bars: document.getElementById('dBars'),
    qTitle: document.getElementById('dQTitle'),
    qHint: document.getElementById('dQHint'),
    options: document.getElementById('dOptions'),
    fact: document.getElementById('dFact'),
    stepNum: document.getElementById('dStepNum'),
    stepOf: document.getElementById('dStepOf'),
    stepType: document.getElementById('dStepType'),
    quizBar: document.getElementById('dQuizBar'),
    heroBar: document.getElementById('dHeroBar'),
    heroFit: document.getElementById('dHeroFit'),
    heroBtu: document.getElementById('dHeroBtu'),
    heroStatus: document.getElementById('dHeroStatus'),
    liveBtu: document.getElementById('dLiveBtu'),
    sideStatus: document.getElementById('dSideStatus'),
    mobBtu: document.getElementById('dMobBtu'),
    mobFit: document.getElementById('dMobFit'),
    mobStep: document.getElementById('dMobStep'),
    mobBar: document.getElementById('dMobBar'),
    back: document.getElementById('dBack'),
    next: document.getElementById('dNext'),
    result: document.getElementById('dResult')
  };

  var lastFact = -1;

  function hideStoreChrome() {
    var sels = ['.header','.footer','.top-bar','.breadcrumb','.page-title','.page-header','#diag360pop'];
    sels.forEach(function(s) {
      document.querySelectorAll(s).forEach(function(el) { el.style.display = 'none'; });
    });
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.background = '#0a0e1a';
  }

  function initBars() {
    els.bars.innerHTML = Object.entries(dims).map(function(e) {
      return '<div class="d-bar-row"><div class="d-bar-label"><span>' + e[1] + '</span><strong id="dl-' + e[0] + '">0</strong></div><div class="d-bar"><span id="db-' + e[0] + '"></span></div></div>';
    }).join('');
  }

  function getSelected(q) {
    var a = state.answers[q.id];
    if (a === undefined || a === null) return [];
    return Array.isArray(a) ? a : [a];
  }

  function resetScores() {
    Object.keys(state.scores).forEach(function(k){ state.scores[k] = 0; });
    state.btuRaw = 9000;
    state.btuBase = 9000;
  }

  /* Converte respostas do quiz nos parametros da calculadora BTUs v4 do site */
  function mapAnswersToBtuParams() {
    var areaBySize = [8, 13, 20, 32, 55];
    var area = 20;
    if (state.answers.roomSize !== undefined) {
      area = areaBySize[state.answers.roomSize] || 20;
    }

    var fatSol = 1.10;
    var fatPe = 1.0;
    var fatLayout = 1.0;
    var fatJanelas = 1.08;
    var fatIsol = 1.0;
    var fatAndar = 1.0;

    if (state.answers.roomType !== undefined) {
      var solByType = [1.0, 1.10, 1.25, 1.10, 1.15];
      fatSol = solByType[state.answers.roomType] || 1.10;
      if (state.answers.roomType === 3) fatPe = 3.0 / 2.6;
      if (state.answers.roomType === 4) fatLayout = 1.20;
    }

    if (state.answers.windows !== undefined) {
      var janelasByAns = [1.0, 1.08, 1.15, 1.20];
      fatJanelas = janelasByAns[state.answers.windows] || 1.08;
      if (state.answers.windows === 3) fatLayout = Math.max(fatLayout, 1.12);
    }

    if (state.answers.floor !== undefined) {
      var andarByAns = [1.0, 1.0, 1.10];
      fatAndar = andarByAns[state.answers.floor] || 1.0;
    }

    if (state.answers.insulation !== undefined) {
      var isolByAns = [0.95, 1.0, 1.10];
      fatIsol = isolByAns[state.answers.insulation] || 1.0;
    }

    var fatUso = 1.10;
    var equip = 0;
    if (state.answers.environment !== undefined) {
      var usoByEnv = [1.0, 1.10, 1.10, 1.50, 1.40, 1.20];
      var equipByEnv = [0, 600, 1500, 3000, 2500, 800];
      fatUso = usoByEnv[state.answers.environment] || 1.10;
      equip = equipByEnv[state.answers.environment] || 0;
    }

    if (state.answers.heatLoad !== undefined) {
      var equipByLoad = [0, 600, 1500, 3000];
      equip = Math.max(equip, equipByLoad[state.answers.heatLoad] || 0);
    }

    var fatHoras = 1.05;
    var fatUmid = 1.0;
    if (state.answers.usage !== undefined) {
      var horasByUsage = [1.0, 1.05, 1.10, 1.15];
      fatHoras = horasByUsage[state.answers.usage] || 1.05;
      if (state.answers.usage === 3) {
        fatUso = Math.max(fatUso, 1.50);
        equip = Math.max(equip, 1500);
      }
      if (state.answers.usage === 2) equip = Math.max(equip, 800);
    }

    var fatClima = 1.08;
    if (state.answers.climate !== undefined) {
      var climaByAns = [1.15, 1.10, 1.0, 1.0];
      fatClima = climaByAns[state.answers.climate] || 1.08;
    }

    if (state.answers.humidity !== undefined) {
      var umidByAns = [1.0, 1.0, 1.05];
      fatUmid = umidByAns[state.answers.humidity] || 1.0;
      if (state.answers.humidity === 2 && state.answers.climate === 1) fatUmid = 1.08;
    }

    var pessoas = 2;
    if (state.answers.occupants !== undefined) {
      pessoas = [1, 2, 4, 7, 12][state.answers.occupants] || 2;
    }

    if (state.answers.occupants >= 3 && area < 22) area = 22;
    if (state.answers.environment === 1 && state.answers.occupants >= 2 && area < 24) area = 24;
    if (state.answers.environment === 3 && area < 35) area = 35;
    if (state.answers.environment === 4 && area < 12) area = 12;
    if (state.answers.roomType === 4 && area < 28) area = 28;
    if (state.answers.occupants >= 4 && area < 30) area = 30;

    return {
      area: area, fatSol: fatSol, fatUso: fatUso, fatPe: fatPe,
      fatLayout: fatLayout, fatJanelas: fatJanelas, fatClima: fatClima,
      fatHoras: fatHoras, fatUmid: fatUmid, fatIsol: fatIsol, fatAndar: fatAndar,
      pessoas: pessoas, equip: equip
    };
  }

  /* Mesma logica da calculadora BTUs v4 do site */
  function calcBtuSiteDoAr(params) {
    var base = params.area * 600;
    var fatorTotal = params.fatSol * params.fatUso * params.fatPe *
      params.fatLayout * params.fatJanelas * params.fatClima *
      params.fatHoras * params.fatUmid * (params.fatIsol || 1) * (params.fatAndar || 1);
    var btus = base * fatorTotal;
    if (params.pessoas > 1) btus += (params.pessoas - 1) * 600;
    btus += params.equip || 0;

    if (params.pessoas >= 5) btus = Math.max(btus, 15000);
    if (params.pessoas >= 7) btus = Math.max(btus, 18000);
    if (params.pessoas >= 10) btus = Math.max(btus, 24000);
    if (params.area >= 32) btus = Math.max(btus, 18000);
    if (params.area >= 40) btus = Math.max(btus, 22000);
    if (params.area >= 55) btus = Math.max(btus, 30000);

    return Math.ceil(btus / 500) * 500;
  }

  function fmtBtuNum(n) {
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function fmtBtuHtml(n) {
    return fmtBtuNum(n) + '<span class="d-btu-unit">BTUs/h</span>';
  }

  function recommendBtuRange(raw) {
    for (var i = 0; i < BTU_RANGES.length; i++) {
      if (raw <= BTU_RANGES[i].max) return BTU_RANGES[i];
    }
    return BTU_RANGES[BTU_RANGES.length - 1];
  }

  function recommendBtu(raw) {
    return recommendBtuRange(raw).btu;
  }

  function recalc() {
    resetScores();

    questions.forEach(function(q) {
      getSelected(q).forEach(function(i) {
        var opt = q.options[i]; if (!opt) return;
        Object.entries(opt.scores || {}).forEach(function(e){ state.scores[e[0]] += e[1]; });
      });
    });

    var params = mapAnswersToBtuParams();
    state.btuRaw = calcBtuSiteDoAr(params);
    state.btuBase = recommendBtu(state.btuRaw);
    updateUI();
  }

  function getTop() {
    return Object.entries(state.scores).sort(function(a,b){ return b[1]-a[1]; })[0];
  }

  function updateUI() {
    var max = Math.max(10, Math.max.apply(null, Object.values(state.scores)));
    Object.entries(state.scores).forEach(function(e) {
      document.getElementById('db-'+e[0]).style.width = Math.round((e[1]/max)*100)+'%';
      document.getElementById('dl-'+e[0]).textContent = e[1];
    });
    var answered = Object.keys(state.answers).length;
    var fit = Math.round((answered/questions.length)*100);
    var btu = state.btuBase;
    var btuHtml = fmtBtuHtml(btu);
    var btuText = fmtBtuNum(btu) + ' BTUs/h';
    var status = answered < 4 ? 'Coletando sinais' : answered < 10 ? 'Perfil em formacao' : 'Diagnostico quase pronto';
    els.heroFit.textContent = fit+'%';
    els.heroBar.style.width = fit+'%';
    els.heroBtu.innerHTML = btuHtml;
    els.heroStatus.textContent = answered === 0 ? 'Aguardando inicio do diagnostico' : status;
    els.liveBtu.innerHTML = btuHtml;
    els.sideStatus.textContent = status;
    els.quizBar.style.width = Math.round(((state.step+1)/questions.length)*100)+'%';
    if (els.mobBtu) els.mobBtu.textContent = btuText;
    if (els.mobFit) els.mobFit.textContent = fit + '%';
    if (els.mobStep) els.mobStep.textContent = (state.step + 1) + ' de ' + questions.length;
    if (els.mobBar) els.mobBar.style.width = Math.round(((state.step + 1) / questions.length) * 100) + '%';
  }

  function showFact() {
    var idx = Math.floor(Math.random()*facts.length);
    while (facts.length > 1 && idx === lastFact) idx = Math.floor(Math.random()*facts.length);
    lastFact = idx;
    els.fact.textContent = facts[idx];
  }

  function renderQ() {
    var q = questions[state.step];
    if (!q || !els.qTitle || !els.options) return;
    var sel = getSelected(q);
    els.stepNum.textContent = state.step+1;
    els.stepOf.textContent = 'de '+questions.length;
    els.stepType.textContent = q.type==='multi' ? 'Múltipla escolha' : 'Escolha única';
    els.qTitle.textContent = q.title;
    els.qHint.textContent = q.hint;
    els.options.className = 'd-option-grid' + (q.options.length >= 5 ? ' cols-3' : '');
    els.options.innerHTML = q.options.map(function(opt,i) {
      return '<button class="d-option'+(sel.includes(i)?' selected':'')+'" type="button" data-i="'+i+'"><div class="d-opt-emoji">'+opt.emoji+'</div><span class="d-opt-title">'+opt.label+'</span><span class="d-opt-desc">'+opt.desc+'</span></button>';
    }).join('');
    els.back.disabled = state.step === 0;
    els.next.textContent = state.step === questions.length-1 ? 'Gerar diagnóstico ✦' : 'Próxima →';
    recalc();
  }

  function toggle(idx) {
    var q = questions[state.step];
    if (q.type==='multi') {
      var cur = getSelected(q);
      state.answers[q.id] = cur.includes(idx) ? cur.filter(function(x){return x!==idx;}) : cur.concat([idx]);
    } else {
      state.answers[q.id] = idx;
    }
    renderQ(); showFact();
  }

  function buildWa(persona, btu, priority, feats) {
    var get = function(id) {
      var a = state.answers[id];
      if (a===undefined||a===null) return null;
      var q = questions.find(function(q){return q.id===id;});
      return q ? q.options[a]?.label||null : null;
    };
    var lines = ['Ola! Fiz o Diagnostico Clima 360 no site.','','📊 *Meu perfil:* '+persona.title,'🌡 *BTUs sugeridos:* '+fmtBtuNum(btu)+' BTUs/h','⚡ *Prioridade:* '+priority,''];
    var env=get('environment'),type=get('roomType'),size=get('roomSize'),win=get('windows'),urg=get('urgency');
    if(env) lines.push('🏠 *Tipo de ambiente:* '+env);
    if(size) lines.push('📏 *Área:* '+size);
    if(type) lines.push('☀ *Exposição solar:* '+type);
    if(win) lines.push('🪟 *Janelas:* '+win);
    if(urg) lines.push('⏰ *Urgência:* '+urg);
    if(feats.length) lines.push('✅ *Recursos:* '+feats.join(', '));
    lines.push('','Pode me ajudar a escolher o modelo ideal?');
    return 'https://wa.me/5519984176960?text='+encodeURIComponent(lines.join('\n'));
  }

  function buildLink(rawBtu) {
    var range = recommendBtuRange(rawBtu || state.btuRaw);
    return 'https://www.sitedoar.com.br' + range.url + '?pg=1';
  }

  function buildResult() {
    recalc();
    var top = getTop(), topKey = top[0];
    var btu = state.btuBase;
    var hasUrgency = state.answers.urgency === 2;
    var featIdxs = state.answers.features || [];
    var feats = featIdxs.map(function(i){ return questions.find(function(q){return q.id==='features';}).options[i].label; });

    var personas = {
      economy: {title:'Perfil Economista Inverter',text:'O cliente valoriza consumo baixo e bom custo no longo prazo. Destaque modelos inverter e eficiência energética.',route:'Mostre primeiro modelos inverter e explique a economia mensal estimada.'},
      comfort: {title:'Perfil Conforto Completo',text:'O cliente quer acertar na escolha e ter conforto constante. Abordagem consultiva com comparação de modelos.',route:'Combine capacidade adequada, quente/frio quando fizer sentido e atendimento especializado.'},
      speed:   {title:'Perfil Solução Rápida',text:'O cliente quer resolver logo. Reduza atrito: mostre produtos disponíveis e capacidade segura.',route:'Priorize atendimento rápido e equipamentos com capacidade bem dimensionada.'},
      silence: {title:'Perfil Silêncio e Descanso',text:'O cliente se preocupa com ruído e estabilidade. Destaque linhas silenciosas e inverter.',route:'Indique modelos para quarto, home office e ambientes de descanso.'},
      tech:    {title:'Perfil Smart Control',text:'O cliente valoriza praticidade, Wi-Fi e controle pelo celular.',route:'Mostre modelos com Wi-Fi e explique cenários de uso no dia a dia.'},
      power:   {title:'Perfil Alta Performance',text:'O ambiente exige mais potência. Evite subdimensionamento e incentive contato consultivo.',route:'Para ambientes grandes, priorize linhas Piso-Teto ou atendimento consultivo no WhatsApp.'}
    };
    var p = personas[topKey] || personas.comfort;

    document.getElementById('dResultTitle').textContent = p.title;
    document.getElementById('dResultText').textContent = p.text+' Faixa sugerida: '+fmtBtuNum(btu)+' BTUs/h (calculo bruto: '+fmtBtuNum(state.btuRaw)+' BTUs/h).';
    document.getElementById('dRouteTitle').textContent = hasUrgency ? 'Rota: atendimento imediato' : 'Rota recomendada';
    document.getElementById('dRouteText').textContent = p.route+(feats.length ? ' Recursos citados: '+feats.join(', ')+'.' : '');
    document.getElementById('dPrimaryCta').href = buildLink(state.btuRaw);
    document.getElementById('dWaCta').href = buildWa(p, btu, dims[topKey], feats);
    document.getElementById('dResultBadges').innerHTML = [
      {label:fmtBtuNum(btu)+' BTUs/h',h:true},
      {label:dims[topKey],h:true},
      {label:hasUrgency?'Alta urgência':'Comparar opções',h:false}
    ].concat(feats.slice(0,2).map(function(l){return {label:l,h:false};}))
     .map(function(b){return '<span class="d-badge'+(b.h?' hl':'')+'">'+b.label+'</span>';}).join('');

    els.result.classList.add('show');
    els.result.scrollIntoView({behavior:'smooth',block:'start'});
  }

  if (els.options) {
    els.options.addEventListener('click', function(e) {
      var btn = e.target.closest('.d-option');
      if (!btn) return;
      toggle(Number(btn.dataset.i));
    });
  }

  if (els.back) {
    els.back.addEventListener('click', function() {
      if (state.step === 0) return;
      state.step--; renderQ();
    });
  }

  if (els.next) {
    els.next.addEventListener('click', function() {
      var q = questions[state.step];
      var a = state.answers[q.id];
      var empty = a===undefined||a===null||(Array.isArray(a)&&a.length===0);
      if (empty) {
        if (els.options && els.options.animate) els.options.animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}],{duration:260});
        return;
      }
      if (state.step < questions.length-1) { state.step++; renderQ(); return; }
      buildResult();
    });
  }

  if (els.result) els.result.classList.remove('show');

  hideStoreChrome();
  initBars();
  renderQ();

  if (overlay && overlay.parentNode !== document.body) {
    document.body.appendChild(overlay);
  }

  window.__diag360Ready = true;
})();
