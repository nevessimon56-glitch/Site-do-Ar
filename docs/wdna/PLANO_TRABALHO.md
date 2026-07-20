# Plano de trabalho — Site do Ar

Documento de estruturação. **Nenhuma alteração no WDNA sem confirmação.**

Atualizado: 2026-07-20

---

## 1. Diagnóstico atual (site ao vivo)

| Página | URL | Status | Situação |
|--------|-----|--------|----------|
| Home | `/` | 200 | OK |
| Produto | `/...-p65` | 200 | OK |
| Catálogo | `/Todos-os-Produtos` | **500** | "Página não encontrada!" |
| Busca | `/busca` | **500** | Idem |
| Conta | `/conta` | **500** | Idem |
| Checkout | `/checkout` | **500** | Idem |

**Conclusão:** o problema não é só o catálogo — vários templates quebraram ao mesmo tempo.

---

## 2. O que o GitHub tem vs o que o WDNA tem

### No GitHub (este repositório) — só customizações

| Pasta | Arquivos no repo | Existe no WDNA? |
|-------|------------------|-----------------|
| `assets/` | `mega-menu.js`, `mega-menu.css`, `product-hover-image.*` | Sim (+ theme.js etc. só no WDNA) |
| `layout/` | `theme.liquid` | Sim — **cuidado: nosso arquivo pode ser incompleto** |
| `sections/` | poucos arquivos custom | WDNA tem ~60 sections |
| `templates/` | só `page.diagnostico.liquid` | WDNA tem todos os templates |

### No WDNA (lista oficial do dono da loja)

Ver [`ESTRUTURA_TEMA.md`](ESTRUTURA_TEMA.md).

**Não existe:** pasta `pages/`, `site-price-resolve.liquid`, `showcase-prices.liquid`.

---

## 3. Problemas identificados nas tentativas anteriores

| Erro | O que aconteceu |
|------|-----------------|
| Indicar pasta `pages/` | Arquivo não existe no WDNA |
| Substituir `theme.liquid` inteiro | Pode ter removido partes do tema original WDNA |
| `mega-menu.js` v8–v11 agressivo | JS pesado; restore em loop quando logado |
| Hack de tabela ML no tema | Sintoma é configuração do painel WDNA, não só código |
| `search-filters` vs `search-filter` | Nome errado pode quebrar catálogo |

---

## 4. Causa raiz dos sintomas (separar em camadas)

### Camada A — Painel WDNA (configuração)

- Usuário logado com **Lista de preço = Mercado Livre**
- Afeta: preços, carrinho, pedidos
- **Correção:** Configurações → Produto → Preço → logado = Site do Ar

### Camada B — Tema quebrado (urgente agora)

- Templates search, account, checkout com HTTP 500
- **Correção:** restaurar histórico do tema no WDNA **antes** de colar qualquer arquivo do GitHub

### Camada C — Melhorias custom (depois de estável)

- Mega menu, hover imagem, filtros mobile, preço Pix nos cards
- Aplicar **um arquivo por vez**, testar, publicar

---

## 5. Plano em fases (só executar com OK do dono)

### Fase 0 — Estabilizar (URGENTE)

1. WDNA → Temas → **Histórico de versões** → restaurar última versão que funcionava
2. Publicar
3. Testar: home, catálogo, produto, checkout, login
4. **Parar** — não colar nada do GitHub até confirmar que voltou

### Fase 1 — Configuração WDNA

1. Ajustar lista de preço do usuário logado = Site do Ar
2. Testar login: preços, carrinho, novo pedido (tabela no pedido)

### Fase 2 — Customizações (uma por vez)

Ordem sugerida:

1. `assets/mega-menu.css` + `assets/mega-menu.js` (versão **simples** da `main`, ~180 linhas)
2. `sections/showcase-model-product.liquid` (versão `main`)
3. `sections/search-filter.liquid` (branch `fix-search-filters-v2`, se filtros mobile forem necessários)
4. `sections/product-content.liquid` (só se página de produto precisar de ajuste)

**Regra:** nunca substituir `theme.liquid` inteiro — só adicionar linhas (mega-menu.css, mega-menu.js, etc.).

### Fase 3 — Login / preços (se ainda necessário após Fase 1)

- Reavaliar se ainda precisa de JS no tema
- Se sim: patch **mínimo**, testado em staging

---

## 6. Perguntas para o dono da loja (responder antes de aplicar)

1. **Você consegue acessar o Histórico de versões do tema no WDNA?** (sim/não)
2. **Qual foi o último arquivo que você colou antes do site quebrar?** (nome exato)
3. **Você substituiu o `theme.liquid` inteiro ou só partes?**
4. **O catálogo funcionava antes de qual alteração?** (login? preços? filtros?)
5. **A lista de preço do usuário logado no painel ainda está como Mercado Livre?**
6. **Você quer priorizar:** (a) site funcionando para todos, ou (b) login com preço certo primeiro?

**Atualização 2026-07-20:** `theme.liquid` restaurado pelo usuário. Site voltou; logado mostra poucos produtos na vitrine. Próximo passo: **Passo 1 do painel WDNA** (sem arquivo). Ver [`ORDEM_ARQUIVOS.md`](ORDEM_ARQUIVOS.md).

---

## 7. O que NÃO fazer mais

- [ ] Colar vários arquivos de uma vez
- [ ] Substituir `theme.liquid` completo pelo GitHub
- [ ] Criar arquivos que não existem na estrutura WDNA
- [ ] Aplicar JS agressivo de "guest restore" sem testar
- [ ] Ignorar configuração de preço no painel WDNA

---

## 8. Referências

- Estrutura WDNA: [`ESTRUTURA_TEMA.md`](ESTRUTURA_TEMA.md)
- Recuperação catálogo: [`RECUPERACAO_URGENTE.md`](RECUPERACAO_URGENTE.md)
- Branch estável (custom mínimo): `main`
- Branch rollback: `cursor/rollback-recuperar-site-ed4c`
