<script setup>
import { computed, reactive } from 'vue'

defineProps({
  cats: { type: Array, required: true },
})

const emit = defineEmits(['save'])

const empty = { name: '', category: '', price: null, tags: '' }
const form = reactive({ ...empty })

const errors = computed(() => {
  const e = {}
  if (form.name.length < 3) e.name = 'pelo menos 3 caracteres'
  if (!form.category) e.category = 'escolhe uma categoria'
  if (!(form.price > 0)) e.price = 'tem de ser > 0'
  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

function submit() {
  if (!isValid.value) return
  emit('save', {
    name: form.name,
    category: form.category,
    price: form.price,
    tags: form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
  })
  Object.assign(form, empty)
}
</script>

<template>
  <form @submit.prevent="submit">
    <h2>Adicionar jogo</h2>

    <div>
      <input
        v-model.trim="form.name"
        placeholder="Nome"
        required
        minlength="3"
      />
      <small v-if="errors.name">{{ errors.name }}</small>
    </div>

    <div>
      <select v-model="form.category" required>
        <option value="" disabled>Categoria…</option>
        <option v-for="c in cats" :key="c" :value="c">{{ c }}</option>
      </select>
      <small v-if="errors.category">{{ errors.category }}</small>
    </div>

    <div>
      <input
        v-model.number="form.price"
        type="number"
        min="0"
        step="0.01"
        placeholder="Preço"
        required
      />
      <small v-if="errors.price">{{ errors.price }}</small>
    </div>

    <div>
      <input
        v-model.trim="form.tags"
        placeholder="tags, separadas por vírgulas"
      />
    </div>

    <button :disabled="!isValid">Adicionar</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 320px;
  margin: 1rem 0;
}
small {
  color: #b00020;
  margin-left: 0.5rem;
}
</style>