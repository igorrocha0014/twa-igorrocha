# Ficha 06 — Rotas e paginação

Catálogo de jogos em Vue 3 + Vite + Vue Router, com um URL por ecrã e uma lista paginada da PokéAPI.

## Como correr

```
npm install
npm run dev
```

Para os testes: `node check.js` (não imprime nada quando passa).

## O que está feito

- **Parte 1:** `router.js` com `/`, `/items/new` e `/items/:id`; `App.vue` só com `<nav>` + `<RouterView>`; estado em `store.js`; páginas `CatalogPage`, `ItemPage` e `NewItemPage`.
- **Parte 2:** detalhe pelo URL (`Number(route.params.id)`), "não encontrado", rota 404 (`NotFound`) e `router.push` para o item novo depois de guardar.
- **Parte 3:** `/pokemon?page=N` paginado com `api/pokeapi.js`, `route.query`, `useLoad` + `watch(page, load)`, botões Anterior/Seguinte e "Página x de y".

## Declaração de uso de IA

Usei o Claude em casa como apoio (explicações e geração de código). Testei e revi o código, e consigo explicá-lo.

## Perguntas de reflexão

1. Com um ref, a página perdia-se no reload (voltava à 1), o back do browser saía da lista em vez de recuar uma página e não dava para partilhar o link da página 3. No URL, tudo isso funciona sem código extra.
2. Voltei à lista e o item estava lá porque o `store.js` é um módulo ES, avaliado uma só vez e partilhado por todas as páginas, por isso os refs sobrevivem à navegação. O reload reinicia o JavaScript e a memória perde-se. No M2 os dados ficam guardados na API/MongoDB.
3. De `/` para `/items/1` o ecrã é montado de novo e o `onMounted` corre. De `/items/1` para `/items/2` a rota é a mesma e o componente é reutilizado, por isso o `onMounted` não volta a correr e é preciso um `watch(() => route.params.id, load)` se a página carregar dados por id.
4. Para o projeto escolhia SPA: é uma aplicação de dados e formulários, o SEO não é essencial e o servidor só serve ficheiros estáticos e a API. Para o site público da ISLA escolhia SSR ou SSG, porque o HTML chega já feito (primeira pintura rápida, SEO e pré-visualizações ao partilhar links).