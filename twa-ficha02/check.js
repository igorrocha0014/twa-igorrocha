import assert from 'node:assert/strict'
import { items } from './data.js'
import { byCategory, search, total, top, categories, withDiscount } from './catalog.js'


assert.equal(byCategory(items, 'platformer').length, 2)
assert.equal(search(items, 'hollow').length, 1)
assert.equal(total(items) > 0, true)
assert.equal(top(items, 3).length, 3)
assert.equal(top(items, 3)[0].price >= top(items, 3)[1].price, true)
assert.equal(categories(items).includes('action'), true)


const discounted = withDiscount(items, 10)
assert.equal(discounted[0].price < items[0].price, true)
assert.equal(items[0].price, 59.99) 
