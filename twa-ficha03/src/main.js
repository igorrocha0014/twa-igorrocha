import { search, byCategory, categories, sortByPrice } from './catalog.js'

const state = {
  status: 'loading',
  error: null,
  items: [],
  query: '',
  category: '',
  sortDir: 'desc',
  selectedId: null,
}

const q = document.querySelector('#q')
const select = document.querySelector('#category')
const sortBtn = document.querySelector('#sort')
const statusEl = document.querySelector('#status')
const list = document.querySelector('#list')
const detail = document.querySelector('#detail')

// ---------- load: vai buscar os dados ----------
async function load() {
  state.status = 'loading'
  render()
  try {
    const res = await fetch('/items.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    state.items = await res.json()
    state.status = 'ready'
    fillCategories()
  } catch (err) {
    state.status = 'error'
    state.error = err.message
  } finally {
    render()
  }
}

function fillCategories() {
  categories(state.items).forEach((cat) => {
    const opt = document.createElement('option')
    opt.value = cat
    opt.textContent = cat
    select.append(opt)
  })
}

// ---------- render: o único sítio que escreve no DOM ----------
function toLi(item) {
  const li = document.createElement('li')
  li.textContent = `${item.name} · ${item.price} €`
  li.dataset.id = item.id
  return li
}

function toDetail(item) {
  const box = document.createElement('div')

  const title = document.createElement('h2')
  title.textContent = item.name

  const price = document.createElement('p')
  price.textContent = `Preço: ${item.price} €`

  const cat = document.createElement('p')
  cat.textContent = `Categoria: ${item.category}`

  const tags = document.createElement('p')
  tags.textContent = `Tags: ${item.tags.join(', ')}`

  const studio = document.createElement('p')
  studio.textContent = `Estúdio: ${item.studio.name} (${item.studio.country})`

  box.append(title, price, cat, tags, studio)
  return box
}

function render() {
  if (state.status === 'loading') {
    statusEl.textContent = 'A carregar…'
    list.replaceChildren()
    detail.replaceChildren()
    return
  }
  if (state.status === 'error') {
    statusEl.textContent = `Erro: ${state.error}`
    list.replaceChildren()
    detail.replaceChildren()
    return
  }

  let visible = state.items
  visible = search(visible, state.query)
  if (state.category) visible = byCategory(visible, state.category)
  visible = sortByPrice(visible, state.sortDir)

  statusEl.textContent = visible.length ? '' : 'Sem resultados.'
  list.replaceChildren(...visible.map(toLi))

  const selected = state.items.find((i) => i.id === state.selectedId)
  detail.replaceChildren(...(selected ? [toDetail(selected)] : []))
}

// ---------- eventos: só mudam o state, depois render ----------
q.addEventListener('input', (e) => {
  state.query = e.target.value
  render()
})

select.addEventListener('change', (e) => {
  state.category = e.target.value
  render()
})

sortBtn.addEventListener('click', () => {
  state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc'
  render()
})

list.addEventListener('click', (e) => {
  const li = e.target.closest('li[data-id]')
  if (!li) return
  state.selectedId = Number(li.dataset.id)
  render()
})

load()