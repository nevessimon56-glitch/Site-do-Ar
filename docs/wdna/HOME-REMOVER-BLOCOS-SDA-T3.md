# Tema 3 — blocos da home ainda aparecem depois de apagar assets SDA

## Por quê

Apagar `sda-*.css` / `sda-*.js` **não remove o HTML**. No ar (out/2026), o site ainda entrega **4 `<section>`** antes do banner, geradas no **servidor** — em geral coladas em **`templates/home.liquid`** no painel WDNA.

Classes: `sda-home-hero`, `sda-trust-bar`, `sda-home-section`, `sda-diag-cta`.

## Correção definitiva (recomendado)

1. Painel → **Personalizar → tema 3 → Editar código**
2. Abrir **`templates/home.liquid`**
3. Dentro de `<main class="home-main">`, **apagar** todo HTML com `sda-home-hero`, `sda-trust-bar`, `sda-home-section` (hero, faixas, chips).
4. Deixar **só** o loop de vitrines (como no Git):

   https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/home-strip-promo-b192/templates/home.liquid

5. Salvar → Ctrl+F5 na home.

## Correção rápida (sem editar home.liquid)

Substituir **`assets/theme-defer.js`** (já carregado no tema 3) — remove os blocos no carregamento:

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/home-strip-promo-b192/assets/theme-defer.js

E manter no final de **`assets/theme-custom.css`**:

https://raw.githubusercontent.com/nevessimon56-glitch/Site-do-Ar/cursor/home-strip-promo-b192/assets/theme-custom.css

## Conferir

View-source da home: após `<main class="home-main">` deve ir direto para `<!-- Showcase Model` (banner), sem `sda-home-hero`.
