<script setup>
import { ref, computed } from 'vue'
import { search, byCategory, categories, sortByPrice } from './catalog.js'

// 1. Estado: um ref por campo
const status = ref('loading')
const error = ref(null)
const items = ref([])
const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

// 2. load(): o mesmo fetch + res.ok + try/catch/finally
async function load() {
  status.value = 'loading'
  error.value = null
  try {
    const res = await fetch('/items.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    items.value = await res.json()
    status.value = 'ready'
  } catch (err) {
    error.value = err.message
    status.value = 'error'
  }
}

// 3. Derivados
const visible = computed(() => {
  let list = search(items.value, query.value)
  if (category.value) list = byCategory(list, category.value)
  return sortByPrice(list, sortDir.value)
})

const cats = computed(() => categories(items.value))

const selected = computed(() =>
  items.value.find((i) => i.id === selectedId.value)
)

// chamado no fim do script, sem await
load()
</script>

<template>
  <h1>Catálogo de Jogos</h1>

  <div class="controls">
    <input v-model="query" type="search" placeholder="Pesquisar..." />
    <select v-model="category">
      <option value="">Todas as categorias</option>
      <option v-for="c in cats" :key="c" :value="c">{{ c }}</option>
    </select>
    <button @click="sortDir = sortDir === 'desc' ? 'asc' : 'desc'">
      Ordenar por preço ({{ sortDir === 'desc' ? 'decrescente' : 'crescente' }})
    </button>
  </div>

  <p v-if="status === 'loading'">A carregar…</p>
  <p v-else-if="status === 'error'">
    Erro: {{ error }}
    <button @click="load">Tentar de novo</button>
  </p>
  <template v-else>
    <p v-if="visible.length === 0">Sem resultados.</p>
    <ul>
      <li
        v-for="item in visible"
        :key="item.id"
        :class="{ selected: item.id === selectedId }"
        @click="selectedId = item.id"
      >
        {{ item.name }} · {{ item.price.toFixed(2) }} €
      </li>
    </ul>
  </template>

  <section v-if="selected">
    <h2>{{ selected.name }}</h2>
    <p>Preço: {{ selected.price.toFixed(2) }} €</p>
    <p>Categoria: {{ selected.category }}</p>
    <p>Tags: {{ selected.tags.join(', ') }}</p>
    <p>Estúdio: {{ selected.studio.name }} ({{ selected.studio.country }})</p>
  </section>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
li {
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  list-style: none;
}
li:hover {
  background: #f0e6e8;
}
li.selected {
  background: #5b1f2e;
  color: white;
}
</style>