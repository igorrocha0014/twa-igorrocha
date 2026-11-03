import { ref } from 'vue'
import { getJSON } from './api/getJSON.js'

export const items = ref(null) // null até o primeiro load terminar
export const status = ref('idle') // 'idle' | 'loading' | 'error' | 'ready'
export const error = ref(null)

export async function load() {
  status.value = 'loading'
  error.value = null
  try {
    items.value = await getJSON('/items.json')
    status.value = 'ready'
  } catch (err) {
    error.value = err.message
    status.value = 'error'
  }
}

// as páginas chamam isto ao montar: carrega UMA vez
export function ensureLoaded() {
  if (items.value === null && status.value !== 'loading') load()
}

const nextId = () => Math.max(0, ...items.value.map((i) => i.id)) + 1

// o único sítio onde `items` muda
export function addItem(item) {
  const id = nextId()
  items.value.push({ id, ...item })
  return id
}