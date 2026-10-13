import assert from 'node:assert/strict'
import { items } from '../twa-ficha02/data.js'
import { sortByPrice } from './src/catalog.js'

const asc = sortByPrice(items, 'asc')
const desc = sortByPrice(items, 'desc')

assert.equal(asc[0].price <= asc[1].price, true)
assert.equal(desc[0].price >= desc[1].price, true)
assert.equal(asc.length, items.length)
// não altera o original
assert.equal(items[0].id, 1)