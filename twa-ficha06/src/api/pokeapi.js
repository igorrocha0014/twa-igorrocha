import { getJSON } from './getJSON.js'

const BASE = 'https://pokeapi.co/api/v2'
export const PAGE = 20

// página 1 → offset 0, página 2 → offset 20, ...
export const list = (page = 1) =>
  getJSON(`${BASE}/pokemon?limit=${PAGE}&offset=${(page - 1) * PAGE}`)
// devolve { count, results: [{ name, url }] }

export const get = (name) => getJSON(`${BASE}/pokemon/${name}`)