# Avaliação UX — Conversão (Site do Ar / WDNA)

**Registrado:** 26 out 2026 (America/Sao_Paulo)  
**Origem:** feedback do usuário (revisão desktop + mobile pós-Fases conversão)  
**Instrução:** apenas registro — **não implementar** até nova solicitação explícita.

---

## Avaliação geral

| Contexto | Nota | Resumo |
|----------|------|--------|
| **Desktop** | **8/10** | Estrutura mais profissional e proposta mais clara. Problemas: excesso na primeira tela, inconsistências de hierarquia. |
| **Mobile** | **6,5/10** | Adapta à largura, sem rolagem horizontal. Problemas: excesso acima dos produtos, pop-up invasivo, dificuldade para preço/compra rápido. |

---

## Revisão desktop

### 1. Home

**Melhorias percebidas**

- Hero com proposta clara: *“Ar-condicionado com preço justo e orientação de especialista”*; CTAs Diagnóstico 360 e Calculadora BTUs.
- Faixa de confiança: 10+ anos, originais/NF, compra segura, atendimento, entrega regional.
- Seções “Compre pelo ambiente” e “Escolha pela necessidade”.
- Uso mais claro de azul, laranja e roxo.
- Organização aproxima de loja especializada vs catálogo genérico.

**Problemas atuais**

1. **Pop-up invade a primeira tela** — Diagnóstico 360 sobre o hero; compete com CTA principal (desktop: canto inferior direito).
   - **Recomendação:** não exibir imediatamente; delay ou após scroll; uma vez por sessão; card fixo discreto ou faixa lateral; hero > pop-up.

2. **Primeira tela com muita informação** — header, menu, hero, trust, ambiente, necessidade, banner.
   - **Recomendação:** reduzir altura dos atalhos ou “Escolha pela necessidade” em faixa horizontal compacta.

3. **Banner sazonal desalinhado** — hero institucional → Halloween → ofertas.
   - **Recomendação:** banners na linguagem do hero (Pix 5%, ambientes, especialista, entrega RM Campinas).

### 2. Cabeçalho desktop

**Positivos:** busca visível, logo, carrinho/favoritos/pedidos, categorias, D360 destacado.

**Melhorar:** blocos pedidos/favoritos/carrinho compactos; menu denso (ícones/setas); D360 compete com “Compre por ambiente”; barra preta divide forte topo/navegação.

**Sugestão:** −15% altura; dois destaques: Compre por ambiente + Diagnóstico 360.

### 3. Cards desktop

**Positivos:** “Comprar agora”, imagens, selos, favoritos, chips técnicos, preço/parcelamento.

**Problemas:** muitos chips; cards inconsistentes por cor/categoria; “Comparar” peso próximo ao CTA; hierarquia preço antigo/atual/Pix; falta selos comerciais (custo-benefício, mais vendido, quarto, econômico, Wi-Fi).

**Recomendação (layout alvo):**

```
[5% OFF]                    [♡]
[Imagem]
Ar-condicionado EOS
12.000 BTUs • Inverter • Frio
R$ 2.399,98 no Pix
ou 6x de R$ 421,05 sem juros
[COMPRAR AGORA]
Comparar (discreto)
```

### Listagem desktop

**Positivos:** contagem visível, CTA diagnóstico, filtros, ordenação, grade/lista, “Comprar agora”, espaço horizontal.

**Problemas:**

- Filtro capacidade (BTUs) muito alto → seções recolhíveis (Capacidade, Ciclo, Marca, Preço) com contagem de opções.
- CTA D360: evoluir copy — *“Descubra quantos BTUs você precisa e veja os modelos ideais para o seu ambiente.”*
- Cards densos → máx. 3 chips visíveis; resto no PDP.

### Página de produto desktop

**Positivos:** galeria, painel compra, disponibilidade, preço, botão comprar, comparar secundário, frete, trust, duas colunas.

**Ajustes:**

1. **Pix explícito** — hoje R$ 2.526,29 + “5% Pix”; cards ~R$ 2.399,98. Alvo:
   ```
   De R$ 2.526,29
   R$ 2.399,98 no Pix
   5% de desconto
   ```
2. **Título/respiro** — mais espaço nome↔preço; área recomendada (15–20 m²) junto do preço ou antes do CTA.
3. **Breadcrumb** — reduzir a `Home / Ar-condicionado / Split`; nome só no título.

---

## Revisão mobile

### 1. Home mobile (crítico)

- **Pop-up** cobre ~toda primeira tela — principal problema.
  - Não auto na primeira visita; faixa inferior pós-scroll; ~25% altura; *“Não sabe qual BTU escolher?”* + *“Fazer diagnóstico”*; X maior/contrastante.

- **Header alto:** atendimento, logo, favoritos, carrinho, menu, busca, categorias, chips, barra fixa.
  - Alvo: logo+busca+carrinho+menu → busca → categorias scroll → hero/produto → barra fixa; esconder “Entrar” no topo estreito (menu).

### 2. Categorias mobile

- Ícones Split/Piso/Janela/Ambiente úteis mas área grande.
- Reduzir ícones; cards horizontais; parcial + swipe.
- Evitar duas navs repetidas (faixa categorias + chips “Todos”, “Split Inverter”, etc.).

### 3. Cards mobile

- 2 colunas OK; pouco espaço.
- 3 atributos; Comparar em ícone/menu; Comprar principal; título 2 linhas; altura mínima preço+CTA alinhada.

### 4. PDP mobile

- Melhora: barra inferior compra/preço.
- Topo longo: header, busca, categorias, chips, breadcrumb, título, imagem.

**Ordem sugerida:**

```
[Voltar]
Ar-condicionado Split EOS — 12.000 BTUs
[Imagem]
R$ 2.399,98 no Pix — 6x ...
Ideal para 15 m² a 20 m²
[COMPRAR AGORA]
→ frete, trust, destaques, specs, descrição
```

- Breadcrumb → `‹ Voltar para ar-condicionado`
- Barra fixa: `R$ 2.399,98  [COMPRAR]` — contraste máximo, sem overlap.

---

## Pontos técnicos e conteúdo

1. Preço final Pix padronizado cards ↔ PDP.
2. Specs claras: gás, área, voltagem, garantia, instalação, condições.
3. Taxonomia única desktop/mobile (“Modelos” vs “Todos” vs chips).
4. Menos destaque campanhas sazonais vs hero institucional.

---

## Prioridades recomendadas

### Prioridade 1

- Reduzir/atrasar pop-up D360.
- Valor final Pix no PDP.
- Breadcrumb mobile simplificado.
- Reduzir altura header mobile.
- Fixar preço + comprar PDP mobile.

### Prioridade 2

- Simplificar chips cards.
- Comparar mais discreto.
- Filtros listagem (recolhíveis).
- Padronizar categorias.
- Destacar área recomendada + BTUs.

### Prioridade 3

- Espaçamentos.
- Header desktop −15%.
- Banners harmonizados ao hero.
- Selos comerciais.
- Avaliações + FAQ.

---

## Conclusão (texto original)

A evolução visual foi positiva, principalmente na home desktop. O site ficou mais estratégico e menos catálogo genérico.

**Gargalo mobile:** pop-up invasivo, header alto, breadcrumb extenso, muitos elementos antes do produto, preço final pouco evidente no PDP.

Corrigindo esses pontos, a experiência fica mais rápida e orientada à conversão sem mudar a identidade visual atual.
