# Ficha 08 — Uma API REST com Express

API REST do catálogo de jogos, em Node 22 + Express 5, com os dados em memória (carregados de `data/items.json`).

## Como correr

```
npm install
npm run dev
```

O servidor fica em `http://localhost:3000`. Com o servidor a correr, noutro terminal: `node check.mjs` (não imprime nada quando passa). Para repetir o teste, reiniciar o servidor primeiro (os dados são memória).

## O que está feito

- **Parte 1:** `GET /api/health`, `GET /api/items` (com `?q=`) e `GET /api/items/:id` (404 em JSON).
- **Parte 2:** `POST /api/items` com `express.json()`, validação no servidor (400 com `errors`) e 201 com o item criado; `check.mjs`.
- **Parte 3:** `PUT` e `DELETE` (204), rotas num `Router()` em `src/items/router.js`, middleware de logger e 404 em JSON.
- **Parte 4:** (ainda por fazer) `server/` no repositório do grupo.

## Declaração de uso de IA

Usei o Claude em casa como apoio (explicações e geração de código). Testei e revi o código, e consigo explicá-lo.

## Perguntas de reflexão

1. Quem decide o estado é o servidor (`res.status(404)`), e o `fetch` só rejeita quando não há resposta nenhuma (offline, DNS, CORS). Um 404 é uma conversa bem-sucedida em que o servidor respondeu "não existe", por isso chega como `res.ok === false` e o cliente decide o que fazer.
2. O `express.json()` é um middleware, e os middlewares correm pela ordem do `app.use`. Se estiver depois das rotas, o `req.body` já é lido como `undefined`. Num POST sem `Content-Type: application/json` o parser salta o corpo, o `req.body` fica `undefined` e o servidor trata-o como vazio (`?? {}`), por isso devolve 400 com os dois erros.
3. Igual: os dados vivem só em memória e perdem-se ao reiniciar (o servidor, ou o reload no M1). Diferente: o `create()` do M1 corre no browser, e agora é um POST a um servidor que valida e dá o `id`. No M2 o MongoDB guarda os dados, e as rotas ficam quase iguais.
4. Igual: rota, handler, JSON, códigos de estado e middleware. Diferente: o Laravel dá `validate()` (422), `findOrFail` (404) e Eloquent, e no Express escrevo isso à mão. Em Node um só processo fica vivo e o array em memória sobrevive entre pedidos, em PHP cada pedido começa de novo e o array perdia-se.

- `twa-ficha08/` — API REST do catálogo com Express 5 (GET, POST, PUT, DELETE)
Usei o Claude como apoio nas Fichas 02, 03, 04, 05, 06 e 08.