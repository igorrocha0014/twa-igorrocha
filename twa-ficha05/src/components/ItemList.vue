<script setup>
defineProps({
  items: { type: Array, required: true },
  selectedId: { type: Number, default: null },
})

const emit = defineEmits(['select'])
</script>

<template>
  <ul>
    <li
      v-for="item in items"
      :key="item.id"
      :class="{ selected: item.id === selectedId }"
      @click="emit('select', item.id)"
    >
      {{ item.name }} · {{ item.price.toFixed(2) }} €
    </li>
  </ul>
</template>

<style scoped>
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