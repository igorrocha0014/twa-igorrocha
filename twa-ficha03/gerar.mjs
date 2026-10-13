import { writeFile } from 'node:fs/promises'
import { items } from '../twa-ficha02/data.js'

await writeFile('public/items.json', JSON.stringify(items, null, 2))