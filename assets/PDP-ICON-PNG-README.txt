ÍCONES DESTAQUES — PNG (vitrine Site do Ar)
==========================================

Por que ainda vejo SVG?
- No WDNA, `pdp-icon-svg.liquid` estava com pdp_icons_use_png = false (emergência após o bug do async).
- Com true + PNG abaixo no tema, passam a aparecer os recortes da vitrine.

PASSO A PASSO WDNA (ordem obrigatória)
--------------------------------------
1) Assets do tema → enviar estes 9 arquivos (pasta assets/):
   pdp-icon-heat-cool.png
   pdp-icon-snowflake-cool.png
   pdp-icon-r32.png
   pdp-icon-indoor-unit.png
   pdp-icon-outdoor-unit.png
   pdp-icon-cool-breeze.png
   pdp-icon-heat-breeze.png
   pdp-icon-sun-heat.png
   pdp-icon-droplet.png

2) Sections → substituir sections/pdp-icon-svg.liquid
   (deve conter: {% assign pdp_icons_use_png = true %})
   NUNCA use decoding="async" em <img> dentro de Liquid.

3) Ctrl+F5 na PDP.

MAPEAMENTO
----------
Quente e Frio     → pdp-icon-heat-cool.png
Só Frio / BTU     → pdp-icon-snowflake-cool.png
R-32 ecológico    → pdp-icon-r32.png
Tecnologia Inverter → pdp-icon-indoor-unit.png
Serpentina Cobre  → pdp-icon-outdoor-unit.png
Brisa Suave       → pdp-icon-cool-breeze.png

Emergência (produto 404): pdp_icons_use_png = false

Raw GitHub (branch cursor/pdp-integrate-v2-2cf7):
https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/pdp-integrate-v2-2cf7/assets/pdp-icon-heat-cool.png
(repetir para cada nome acima)
