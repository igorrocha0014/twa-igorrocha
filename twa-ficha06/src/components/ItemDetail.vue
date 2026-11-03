<script setup>
defineProps({
  item: { type: Object, required: true },
})
</script>

<template>
  <section>
    <h2>{{ item.name }}</h2>
    <p>Preço: {{ item.price.toFixed(2) }} €</p>
    <p>Categoria: {{ item.category }}</p>
    <p>Tags: {{ item.tags.join(', ') }}</p>
    <p v-if="item.studio">Estúdio: {{ item.studio.name }} ({{ item.studio.country }})</p>
  </section>
</template>