<script setup>
import { ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import ProductList from '@/components/ProductList.vue';

const searchQuery = ref('');

const handleSearch = (query) => {
  searchQuery.value = query;
};
</script>

<template>
  <header>
    <SearchBar class="search-bar" @search="handleSearch" />
  </header>

  <main>
    <ProductList :searchQuery="searchQuery" />
  </main>
</template>

<style scoped>
.search-bar {
  margin: auto;
  position: absolute;
  top: 4rem;
  left: 35%;
  background-color: transparent;
}

@media (max-width: 600px) {
  .search-bar {
    position: relative;
    top: 2rem;
    left: 3%;
    width: 100%;
  }
}
</style>