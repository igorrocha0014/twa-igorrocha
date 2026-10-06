import { writeFile } from 'node:fs/promises'
import { items } from './data.js'
import { byCategory, search, total, top, categories } from './catalog.js'

const [cmd, arg] = process.argv.slice(2)

const printList = (list) => {
  list.forEach((item) => console.log(`${item.id} · ${item.name} · ${item.price}€`))
}

if (!cmd) {
  printList(items)
} else if (cmd === 'search') {
  printList(search(items, arg))
} else if (cmd === 'top') {
  printList(top(items, Number(arg)))
} else if (cmd === 'report') {
  const report = {
    count: items.length,
    total: total(items),
    categories: categories(items),
    top3: top(items, 3),
  }
  await writeFile('report.json', JSON.stringify(report, null, 2))
  console.log('Relatório guardado em report.json')
} else {
  printList(byCategory(items, cmd))
}