# Celular lento ou não carrega a home

Se **todos os celulares** ficam pesados ou com spinner, a causa costuma ser **JavaScript da vitrine na abertura** (hover de imagem + favoritos observando o DOM inteiro). As correções abaixo estão no repo; publique os arquivos indicados na WDNA.

Quando **só um aparelho** falha, ainda vale **cache/dados locais** ou iOS muito antigo.

## Teste rápido (2 minutos)

1. **Safari (iPhone):** Ajustes → Safari → **Limpar Histórico e Dados dos Sites** (ou só para sitedoar.com.br: Safari → botão AA → Configurações do site → Limpar dados).
2. Abra **aba anônima/privada** e acesse `https://www.sitedoar.com.br/`.
3. Se funcionar na anônima: o problema é **cache ou localStorage** desse aparelho.

## Se você está logado neste celular

Login dispara **favoritos** (localStorage + `/ajax/wishlist`). Se o storage estiver **cheio ou corrompido**, o Safari pode travar só aí.

**Correção no aparelho:** limpar dados do site (passo acima) ou, no Safari, desativar temporariamente “Impedir rastreamento entre sites” só para testar.

## Tema WDNA (equipe)

Confirme no `layout/theme.liquid` publicado:

- Existe **uma** linha: `header-v2-mobile.js` com `defer`.
- **Não** existe bloco inline grande com `initSdaMobileNavStrip` duplicado (isso deixava celular fraco engasgando no scroll).
- Arquivo `assets/header-v2-mobile.js` existe no tema (URL no código-fonte da página deve retornar **200**, não 404).

Versão estável (branch header v2):  
https://github.com/nevessimon56-glitch/Site-do-Ar/tree/cursor/header-favoritos-v2-e52b

## O que mudou no código (robustez)

- `localStorage` com `try/catch` (favoritos + parâmetros `seller`/`ref`).
- Remoção de `?.` no `theme.liquid` (Safari muito antigo quebra o script inteiro).
- Favoritos e merge pós-login **adiados** (`requestIdleCallback` / debounce).
- Fallback que tira o spinner `.loading-main` após ~14s se algum JS falhar.

## Se ainda falhar só no seu iPhone

Anote:

- Modelo do iPhone e versão do iOS (Ajustes → Geral → Sobre).
- O que aparece: tela branca, spinner infinito, “Página não encontrada”, ou trava ao rolar?
- Funciona em **Wi‑Fi** e em **4G**?

Com isso dá para saber se é rede, iOS antigo ou dado local preso na conta.
