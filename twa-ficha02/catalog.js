export const byCategory = (list, cat) =>
  list.filter((item) => item.category === cat)

export const search = (list, text) => {
  const needle = text.toLowerCase()
  return list.filter((item) =>
    item.name.toLowerCase().includes(needle) ||
    item.tags.some((tag) => tag.toLowerCase().includes(needle))
  )
}

export const total = (list) =>
  list.reduce((sum, item) => sum + item.price, 0)

export const top = (list, n) =>
  [...list].toSorted((a, b) => b.price - a.price).slice(0, n)

export const categories = (list) =>
  [...new Set(list.map((item) => item.category))].toSorted()

export const withDiscount = (list, pct) =>
  list.map((item) => ({
    ...item,
    price: item.price * (1 - pct / 100),
  }))