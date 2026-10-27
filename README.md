# TWA - Ficha 01

Repositório com os exercícios da Ficha 01 de Tecnologias Web Avançadas.

- `twa-ficha01/` - módulo ES e fecth de API
- `twa-vite/` - projeto Vite com contador

## Declaração de uso de IA

Usei o Claude como apoio nas Fichas 02 e 03 (explicações e geração de código), que depois testei e revi.

- `twa-ficha03/` — catálogo de jogos no browser (Vite)

# TWA - Ficha04

- `twa-ficha04/` — catálogo de jogos em Vue (ref, computed, v-model, v-for)

## Declaração de uso de IA

Usei o Claude como apoio na ficha04 (explicações e geração de código), que depois testei e revi.

# Ficha 05 — Componentes e formulários

Catálogo de jogos em Vue 3 + Vite, dividido em componentes.

## Declaração de uso de IA

Usei o Claude em casa como apoio (explicações e geração de código). Testei e revi o código, e consigo explicá-lo.

## Perguntas de reflexão

1. O `ItemList` não escreve em `selectedId` porque a prop pertence ao pai e o filho só a lê (alterá-la dá o aviso "Attempting to mutate prop"). Com o emit, o filho só reporta o clique e o pai decide, por isso o estado tem um único dono e o filho é reutilizável.
2. `computed` deriva um valor do estado (como `visible`), de forma pura e em cache. `watch` corre um efeito quando algo muda, como escrever noutro ref (limpar `selectedId`). Se só calculo um valor, uso `computed`. Se escrevo estado ou faço algo, uso `watch`.
3. O `useLoad` poupa-me repetir as mesmas linhas de `status`, `error`, `data` e `load()` em cada ecrã de cada entidade: escrevo uma vez e uso `useLoad(() => api.list())`. Com o `onMounted` fora dele, cada componente teria de se lembrar de o chamar, e esquecê-lo faria com que o `load` nunca corresse.
4. O HTML e o `computed` dão feedback imediato ao utilizador (UX), mas qualquer pessoa pode editar o DOM, tirar o `required` ou chamar a API com `curl`. Só a validação da API, no servidor, protege os dados.