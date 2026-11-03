<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { items, status, ensureLoaded } from '../store.js'
import ItemDetail from '../components/ItemDetail.vue'

const route = useRoute()

// num reload em /items/3 esta é a primeira página: o store está vazio
onMounted(ensureLoaded)

const id = computed(() => Number(route.params.id))
const item = computed(() =>
  (items.value ?? []).find((i) => i.id === id.value)
)
</script>

<template>
  <RouterLink to="/">← Catálogo</RouterLink>

  <p v-if="status !== 'ready'">A carregar…</p>
  <p v-else-if="!item">Item {{ route.params.id }} não encontrado.</p>
  <ItemDetail v-else :item="item" />
</template>