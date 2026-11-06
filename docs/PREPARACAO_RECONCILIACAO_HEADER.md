# Preparação para reconciliação do Header (Site do Ar)

**Data:** 28 out 2026 (America/Sao_Paulo)  
**Contexto:** Veredito **BLOQUEADO** em [`AUDITORIA_HEADER_ENGENHARIA_SENIOR.md`](AUDITORIA_HEADER_ENGENHARIA_SENIOR.md). Opção A aprovada apenas como **escopo arquitetural/visual** — **não** é autorização para implementar, upload ou publicar.  
**Esta tarefa:** preparar coleta de dados e reconciliação **documental** — **sem** editar código, Liquid, painel ou produção.

**Evidências já disponíveis:**

| Fonte | Caminho / URL | Papel |
|-------|---------------|--------|
| HTML produção (home) | `docs/wdna/backups/production-home-2026-10-28.html` | Complementar — DOM renderizado |
| HTML produção (amostra) | curl `sitedoar.com.br`, `/Todos-os-Produtos`, `/split-inverter` (28/out/2026) | `.top-content` ausente |
| Git | `sections/header.liquid`, `layout/theme.liquid` | Baseline desejada pós-merge — **≠** produção |
| CDN | `.../store/13805/themes/3/assets/` | **themeId publicado = 3** (inferido por URLs de asset) |

**Não realizado nesta entrega:** acesso ao painel WDNA, criação de preview, export Liquid oficial, testes interativos.

---

## 1. Guia para localizar ou criar o tema preview (WDNA)

### 1.1 O que precisamos registrar

Preencher e guardar em `docs/wdna/backups/METADATA-PREVIEW.md` (criar na fase de coleta):

| Campo | Exemplo / formato | Para quê |
|-------|-------------------|----------|
| `storeId` | `13805` (já na CDN) | Rastrear assets |
| `themeId_publicado` | `3` (CDN produção) | Baseline “no ar” |
| `themeId_preview` | *(a coletar)* | Alvo de upload Opção A |
| `nome_tema_publicado` | *(painel)* | Evitar confusão humana |
| `nome_tema_preview` | ex.: “SDA Header Preview — NÃO PUBLICAR” | Governança |
| `url_loja_publicada` | `https://www.sitedoar.com.br` | Smoke baseline |
| `url_preview` | subdomínio ou query WDNA *(a coletar)* | Testes sem afetar faturamento |
| `data_hora_criacao_preview` | ISO + America/Sao_Paulo | Auditoria |
| `operador` | Nome/e-mail | Responsabilidade |
| `tema_preview_esta_publicado?` | **Deve ser NÃO** | Bloqueio crítico |

### 1.2 Como confirmar que o preview **não** é o tema publicado

Use **duas** evidências independentes (não basta o nome):

1. **themeId na CDN**  
   - Abrir a loja **publicada** → DevTools → Network → qualquer CSS/JS do tema.  
   - Padrão observado: `https://salescdn.net/prod/store/13805/themes/{themeId}/assets/...`  
   - Produção (28/out/2026): `{themeId}` = **3**.  
   - Repetir na **URL de preview**. Se `{themeId}` for **diferente de 3** (ou diferente do ID anotado como “publicado”), o preview é outro tema.

2. **Flag “publicado / ativo” no painel**  
   - A interface exata depende da versão do painel WDNA disponível à loja.  
   - **Não inventamos** rótulos de menu aqui: localize a área de **temas / aparência / editor de tema** onde a loja gerencia arquivos Liquid e assets.  
   - Deve existir distinção entre tema **em uso na loja ao vivo** e temas **rascunho / cópia**.  
   - **Regra:** só testar upload no tema cuja URL de preview você abriu explicitamente; **nunca** marcar publicação no tema 3 até autorização futura.

3. **Teste de mutação inofensiva (opcional, fase posterior)**  
   - No preview only: alterar um comentário HTML visível em `header.liquid` → recarregar URL preview → ver mudança.  
   - Confirmar que a loja pública **não** muda.  
   - **Não executar** na tarefa atual.

### 1.3 Criar tema separado para testes (fluxo genérico)

Depende da UI WDNA (nomes de botões **não verificados** neste ambiente):

1. Entrar no painel administrativo da loja Site do Ar (credenciais do operador — **não** solicitadas neste doc).  
2. Abrir a gestão de **tema** associada à storefront (mesma área onde se editam `sections/*.liquid` e `assets/*`).  
3. **Duplicar / copiar** o tema atualmente ligado à produção (themeId 3), gerando um **novo** themeId.  
4. Associar esse clone a uma **URL de visualização** de preview (mecanismo varia: subdomínio temporário, link “visualizar tema”, etc. — **registrar o que a UI mostrar**).  
5. Documentar IDs e URLs na tabela §1.1.  
6. **Não** ativar/publicar o clone na loja principal.

**Referência interna:** [`PREPARACAO_MIGRACAO_AMBIENTE.md`](PREPARACAO_MIGRACAO_AMBIENTE.md) §A.3, [`docs/wdna/etapa-header-opcao-a/README-UPLOAD.md`](wdna/etapa-header-opcao-a/README-UPLOAD.md).

---

## 2. Procedimento de exportação de `sections/header.liquid`

### 2.1 Objetivo

Obter o **Liquid fonte** do tema **publicado** (themeId 3), não apenas HTML renderizado. O snapshot HTML **não** substitui o Liquid (menu `{% for %}`, condicionais Alpine, CSRF, scripts inline).

### 2.2 Passos (painel — interface exata a confirmar no local)

1. Identificar o tema **publicado** (themeId **3** por CDN).  
2. Abrir o **editor de arquivos** do tema (estrutura típica WDNA: `sections/`, `layout/`, `assets/`).  
3. Navegar até `sections/header.liquid`.  
4. **Copiar integralmente** o conteúdo para um arquivo local **antes** de qualquer edição.  
5. Repetir para o **tema preview** quando existir (dois exports distintos).

### 2.3 Convenção de arquivamento no repositório

| Arquivo | Conteúdo |
|---------|----------|
| `docs/wdna/backups/header-producao-theme3-YYYYMMDD.liquid` | Export do tema publicado |
| `docs/wdna/backups/header-preview-theme{N}-YYYYMMDD.liquid` | Export do preview (quando houver) |
| `docs/wdna/backups/header-git-YYYYMMDD.liquid` | Cópia opcional de `sections/header.liquid` do Git na mesma data (para diff) |

**Metadados** no topo do backup (comentário Liquid ou README sidecar):

```text
# Export WDNA header.liquid
# storeId: 13805
# themeId: 3
# exported_at: 2026-10-28T... America/Sao_Paulo
# exported_by: <operador>
# source: tema publicado | preview
# sha256: <hash do arquivo>
```

Calcular SHA-256: `sha256sum docs/wdna/backups/header-producao-*.liquid`

### 2.4 Preservação do original

- Manter o primeiro export **imutável** (somente leitura; reconciliação em cópia de trabalho).  
- Não sobrescrever backup sem novo sufixo de data.  
- Rollback futuro no **preview**: re-upload do backup exportado (ver auditoria §8).

### 2.5 O que o HTML já prova (limites)

Do snapshot e curl, sabemos que o DOM publicado inclui, entre outros: `.header-utility`, `#myForm2Desktop`, `.header-v2-search-pill`, `alterForm2Desktop()`, `openFavoritesPanel()`.  
**Sem** o Liquid exportado **não** sabemos: condicionais Liquid removidas, blocos comentados, diferenças no loop `menu`, integração exata com `themeConfig`.

---

## 3. Inventário de scripts (modelo)

Use o template preenchível:

**[`docs/wdna/templates/INVENTARIO-SCRIPTS-PAINEL.md`](wdna/templates/INVENTARIO-SCRIPTS-PAINEL.md)**

Resumo do estado atual (28/out/2026):

| Categoria | Status |
|-----------|--------|
| `theme.js`, `mega-menu.js`, `favorites.js` (tema 3 CDN) | **Identificados** no HTML |
| Inline `header-orange-inline-v5`, fallbacks nav | **Inspecionados** no HTML |
| `scripts.footer` / WhatsApp slug | **Identificado** no Git; **inspeção painel pendente** |
| `scripts.header`, `scripts.content`, marketing tags | **Desconhecidos** |
| `main-*.js` (CDN WDNA prod) | **Identificado** URL; impacto header **desconhecido** |

**Não solicitar** credenciais do painel neste fluxo.

---

## 4. Verificação de `.top-content` (banner topo)

### 4.1 O que o Git faz

`sections/header.liquid` (Git) sempre renderiza:

```liquid
<div class="top-content content" style="background-color: {{ themeConfig.store.bannerTop.backgroundColor }};">
```

Depende de `themeConfig.store.bannerTop.*` (link, imagens desktop/mobile).

### 4.2 O que a produção mostra (evidência estática 28/out/2026)

| Página | Ocorrências `class="...top-content` | `.header-utility` |
|--------|-------------------------------------|-------------------|
| `/` (home) | **0** | 3 (markup utility) |
| `/Todos-os-Produtos` | **0** | 3 |
| `/split-inverter` | **0** | 3 |

**Interpretação (parcial — não conclusiva alone):**

- Cenário A: banner **desconfigurado** no painel (sem imagem) → bloco Liquid não emite HTML visível.  
- Cenário B: bloco emitido mas **oculto** por CSS (`header-v2.css` define `.top-content { display: none }` no Git).  
- Cenário C: Liquid **publicado** já **removeu** `.top-content` (só o export confirmaria).

### 4.3 Como fechar a verificação (operador)

1. **Painel:** localizar configuração de **banner topo** / `bannerTop` (nome exato na UI — **a confirmar**). Registrar se há imagem, link e cores ativas.  
2. **Export `header.liquid`:** presença ou ausência do bloco `.top-content`.  
3. **HTML:** inspecionar view-source em home + uma PDP + checkout (se aplicável) buscando `top-content`.  
4. **CSS computado (preview, fase futura):** DevTools → elemento `.top-content` se existir no DOM → `display`.  
5. **Conclusão documental:** tabela “global vs oculto vs removido” — **pendente** até passos 1–2.

---

## 5. Matriz de reconciliação (Liquid publicado × Git × HTML produção)

**Legenda coluna “Liquid publicado”:** **PENDENTE EXPORT** — inferido do HTML até existir `header-producao-theme3-*.liquid`.

| # | Funcionalidade / contrato | HTML produção | Git `header.liquid` | Liquid publicado (export) | Preservar na reconciliação |
|---|---------------------------|---------------|---------------------|---------------------------|----------------------------|
| R-01 | Faixa `.header-utility` | Sim | **Não** | Pendente | **Sim** — base = export |
| R-02 | Atendimento WhatsApp utility (link API) | Sim | Não (usa `sendWhatsPlugin` no header antigo) | Pendente | **Sim** — não reverter para só plugin |
| R-03 | Conta utility `openSideNavOverlay('.sidenav-overlay_account', true)` | Sim | Parcial (conta na navbar) | Pendente | **Sim** |
| R-04 | Busca desktop `#myForm2Desktop` / `#term2Desktop` | Sim | **Não** (só `#myForm2` na barra) | Pendente | **Sim** + `alterForm2Desktop()` |
| R-05 | Busca mobile pill `#myForm2` / `#term2` | Sim | `#myForm2` em `.search-desktop` (outro layout) | Pendente | **Sim** — IDs únicos, layout pill |
| R-06 | Busca overlay `#myForm` / `#term` | Sim | Sim | Pendente | **Sim** |
| R-07 | `alterForm()` / `alterForm2()` + `form.submit()` | Prod: submit explícito | Git: sem `.submit()` em `alterForm2` | Pendente | **Sim** — alinhar à produção |
| R-08 | `alterForm2Desktop()` | Sim (inline) | **Ausente** | Pendente | **Sim** |
| R-09 | `headerV2FocusMobileSearch()` | Sim (inline) | **Ausente** | Pendente | **Sim** ou equivalente documentado |
| R-10 | `openSearch()` + `.search_link` | HTML prod: sem ícone search_link no trecho v2; função em fallback | Sim `.search_link` | Pendente | Validar UX mobile |
| R-11 | `openNavMobile()` + `.sidebar-nav` | Sim | Sim | Pendente | **Sim** |
| R-12 | `openSideNavOverlay` carrinho + `{isViewCart:true}` | Sim | Sim | Pendente | **Sim** |
| R-13 | `openFavoritesPanel()` + badges | Sim | **Não** no header Git | Pendente | **Sim** |
| R-14 | `.header-v2-actions`, mobile tools, strip | Sim | **Não** | Pendente | **Sim** |
| R-15 | Nav `.header-v2-nav-row`, CTA Ambiente/Diag | Sim | Parcial (estrutura antiga) | Pendente | **Sim** |
| R-16 | Menu WDNA `{% for menuItem in menu %}` | Sim (HTML gerado) | Sim | Pendente | **Sim** — não hardcodar sem diff |
| R-17 | Mega menu template (layout, não header) | Global | — | — | Não alterar na Opção A |
| R-18 | CSRF `{{ csrfToken }}` | Hidden presente (valor vazio no curl estático) | Sim Liquid | Pendente | **Sim** |
| R-19 | Alpine `setupStore()` templates conta | Sidebar + utility | Navbar templates | Pendente | **Sim** — ambos se existirem |
| R-20 | Logo H1 home | `<h1>` no logo prod | Lógica `logoUseH1` Git | Pendente | Mesclar regra Git se export for `<h1>` fixo |
| R-21 | Classe root `sda-header-v2` | Não (`header header-v2`) | Sim | Pendente | Opcional — só se CSS depender |
| R-22 | Banner `.top-content` | Não no DOM amostrado | Sim Liquid | Pendente | Decidir após §4 |
| R-23 | `sendWhatsPlugin()` no header bar | Não na utility v2 | Sim bloco WhatsApp | Pendente | Não duplicar com utility |
| R-24 | Telefone `tel:` header boxes | ? | Sim Git | Pendente | Ver export |
| R-25 | Script inline busca (ordem funções) | Prod: 4 funções | Git: 2 funções | Pendente | **Sim** — merge scripts |

**IDs críticos (não renomear):** `myForm`, `myForm2`, `myForm2Desktop`, `term`, `term2`, `term2Desktop`, `nav-mobile`.

**Classes críticas (CSS/JS):** `header-utility`, `header-v2-navbar`, `header-v2-search-pill`, `cart_quantity`, `data-cart-quantity`, `data-favorites-count`, `sidebar-nav`, `search.close`, `nav-main`.

---

## 6. Critérios de entrada (antes de propor mudança no preview)

Todos devem estar **atendidos** antes de qualquer proposta de diff/upload (ainda não autorizado):

| ID | Critério | Status 28/out/2026 |
|----|----------|---------------------|
| E-01 | Tema **preview** criado, themeId ≠ publicado, **não publicado** | **Faltando** |
| E-02 | URL preview registrada | **Faltando** |
| E-03 | Export imutável `header-producao-theme3-*.liquid` + SHA-256 | **Faltando** |
| E-04 | Export `layout/theme.liquid` publicado (mesclagem Opção A) | **Faltando** |
| E-05 | Inventário scripts painel preenchido (template §3) | **Parcial** |
| E-06 | Decisão documentada `.top-content` (§4) | **Pendente** |
| E-07 | Matriz §5 revisada com Liquid export (coluna “publicado” preenchida) | **Pendente** |
| E-08 | Diff reconciliação **aprovado** (prod base + Git tokens/CSS) | **Faltando** |
| E-09 | Autorização **explícita** implementação preview (separada da Opção A) | **Faltando** |
| E-10 | Plano rollback com backups preview | Documentado — execução **pendente** |
| E-11 | Testes T-01–T-04 mínimos com evidência no preview | **BLOQUEADO** |

---

## 7. Relatório de bloqueios (informação ausente)

| Bloqueio | Por que é necessária | Como obter | Risco se seguir sem ela |
|----------|----------------------|------------|-------------------------|
| **B-01** Export `header.liquid` tema 3 | Única fonte do markup + scripts inline reais | Painel → editor tema → copiar/download | Upload Git **apaga** utility, busca dual, favoritos (**crítico**) |
| **B-02** themeId + URL preview | Isolamento de testes | Duplicar tema; anotar CDN path | Teste acidental em **produção** (**crítico**) |
| **B-03** Confirmação “tema publicado” vs preview | Governança | Painel + compare CDN themeId | Publicação indevida (**crítico**) |
| **B-04** `layout/theme.liquid` exportado | Opção A exige mesclagem mínima links CSS | Painel | Quebra ordem CSS / inline emergency (**alto**) |
| **B-05** Scripts painel (`scripts.*`) | WhatsApp, tags, conflitos globals | Listagem painel + template inventário | Regressão atendimento / JS error (**médio–alto**) |
| **B-06** Config `bannerTop` | Decidir `.top-content` | Painel loja | Header height / duplicidade banner (**médio**) |
| **B-07** Menu WDNA export/config | Strip mobile vs menu dinâmico | Painel menus + Liquid | Links quebrados ou desatualizados (**médio**) |
| **B-08** Testes interativos preview | Critério de aprovação auditoria | Browser + HAR no preview | Falso positivo “funciona” (**crítico**) |
| **B-09** Autorização escrita pós-doc | Opção A ≠ implementar | Product owner | Escopo creep / deploy não aprovado (**alto**) |

---

## 8. Testes (status inalterado)

Conforme [`AUDITORIA_HEADER_ENGENHARIA_SENIOR.md`](AUDITORIA_HEADER_ENGENHARIA_SENIOR.md) §7: todos permanecem **PENDENTE** ou **BLOQUEADO**. Nenhum teste foi executado nesta tarefa.

---

## 9. Suficiência dos dados para iniciar reconciliação documental do Liquid

| Pergunta | Resposta |
|----------|----------|
| Dá para **iniciar reconciliação documental completa** (diff Liquid publicado × Git × plano de merge)? | **Não** — falta o export **`header.liquid` do tema publicado** (B-01). |
| Dá para **preparar** reconciliação (matriz §5, critérios §6, procedimentos §1–2, inventário §3)? | **Sim** — concluído neste documento. |
| Dá para **inferir** requisitos de preservação a partir do HTML? | **Sim, parcial** — coluna “HTML produção” da matriz §5; **não** substitui Liquid. |
| Próximo passo operacional recomendado | Operador: §1 + §2 + preencher template scripts → commit backups no repo → atualizar matriz §5 com coluna “Liquid publicado”. |

**Veredito de fase:** permanece **BLOQUEADO** para implementação/upload; **habilitado** apenas o trabalho de **coleta** guiada por este documento.

---

## Documentos relacionados

- [`AUDITORIA_HEADER_ENGENHARIA_SENIOR.md`](AUDITORIA_HEADER_ENGENHARIA_SENIOR.md)  
- [`ESPECIFICACAO_HEADER_REDESIGN.md`](ESPECIFICACAO_HEADER_REDESIGN.md)  
- [`docs/wdna/etapa-header-opcao-a/README-UPLOAD.md`](wdna/etapa-header-opcao-a/README-UPLOAD.md)  
- [`PREPARACAO_MIGRACAO_AMBIENTE.md`](PREPARACAO_MIGRACAO_AMBIENTE.md)
