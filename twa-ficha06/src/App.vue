<template>
  <nav>
    <RouterLink to="/">Catálogo</RouterLink>
    <RouterLink to="/items/new">Novo jogo</RouterLink>
    <RouterLink to="/pokemon">Pokémon</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.router-link-active {
  font-weight: bold;
}
</style>