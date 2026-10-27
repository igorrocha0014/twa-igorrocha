<script setup>
import { ref, computed, watch } from 'vue'
import { search, byCategory, categories, sortByPrice } from './catalog.js'
import { getJSON } from './api/getJSON.js'
import { useLoad } from './composables/useLoad.js'
import ItemList from './components/ItemList.vue'
import ItemDetail from './components/ItemDetail.vue'
import ItemForm from './components/ItemForm.vue'

const { status, error, data: items, load } = useLoad(() =>
  getJSON('/items.json')
)

const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)
watch(query, () => {
  selectedId.value = null
})

const visible = computed(() => {
  let list = search(items.value ?? [], query.value)
  if (category.value) list = byCategory(list, category.value)
  return sortByPrice(list, sortDir.value)
})

const cats = computed(() => categories(items.value ?? []))

const selected = computed(() =>
  (items.value ?? []).find((i) => i.id === selectedId.value)
)

const nextId = computed(
  () => Math.max(0, ...(items.value ?? []).map((i) => i.id)) + 1
)

function addItem(item) {
  items.value = [...(items.value ?? []), { id: nextId.value, ...item }]
}
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

  <ItemForm :cats="cats" @save="addItem" />

  <p v-if="status === 'loading'">A carregar…</p>
  <p v-else-if="status === 'error'">
    Erro: {{ error }}
    <button @click="load">Tentar de novo</button>
  </p>
  <template v-else>
    <p v-if="visible.length === 0">Sem resultados.</p>
    <ItemList
      :items="visible"
      :selected-id="selectedId"
      @select="selectedId = $event"
    />
  </template>

  <ItemDetail v-if="selected" :item="selected" />
</template>

<style scoped>
.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>