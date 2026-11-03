<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoad } from '../composables/useLoad.js'
import { list, PAGE } from '../api/pokeapi.js'

const route = useRoute()
const router = useRouter()

// o URL é a fonte de verdade: a página NÃO é um ref
const page = computed(() => Number(route.query.page ?? 1))

const { status, error, data, load } = useLoad(() => list(page.value))

// o onMounted do useLoad fez o primeiro pedido; o watch faz os seguintes
watch(page, load)

const pages = computed(() => Math.ceil((data.value?.count ?? 0) / PAGE))

function go(p) {
  router.push({ query: { page: p } })
}
</script>

<template>
  <h1>Pokémon</h1>

  <div class="pager">
    <button :disabled="page <= 1" @click="go(page - 1)">‹ Anterior</button>
    Página {{ page }} de {{ pages }}
    <button :disabled="page >= pages" @click="go(page + 1)">Seguinte ›</button>
  </div>

  <p v-if="status === 'loading'">A carregar…</p>
  <p v-else-if="status === 'error'">
    Erro: {{ error }}
    <button @click="load">Tentar de novo</button>
  </p>
  <ul v-else>
    <li v-for="p in data.results" :key="p.name">{{ p.name }}</li>
  </ul>
</template>

<style scoped>
.pager {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;
}
li {
  list-style: none;
  padding: 0.15rem 0;
}
</style>