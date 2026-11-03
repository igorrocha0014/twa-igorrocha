<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { search, byCategory, categories, sortByPrice } from '../catalog.js'
import { items, status, error, load, ensureLoaded } from '../store.js'
import ItemList from '../components/ItemList.vue'

const router = useRouter()

const query = ref('')
const category = ref('')
const sortDir = ref('desc')

onMounted(ensureLoaded)

const visible = computed(() => {
  let list = search(items.value ?? [], query.value)
  if (category.value) list = byCategory(list, category.value)
  return sortByPrice(list, sortDir.value)
})

const cats = computed(() => categories(items.value ?? []))
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

  <p v-if="status === 'loading' || status === 'idle'">A carregar…</p>
  <p v-else-if="status === 'error'">
    Erro: {{ error }}
    <button @click="load">Tentar de novo</button>
  </p>
  <template v-else>
    <p v-if="visible.length === 0">Sem resultados.</p>
    <ItemList
      :items="visible"
      @select="router.push({ name: 'item', params: { id: $event } })"
    />
  </template>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>