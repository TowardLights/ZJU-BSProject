<script setup>
import { ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import ProductList from '@/components/ProductList.vue';
import UserCenterLink from '@/components/UserCenterLink.vue';

const searchQuery = ref('');

const handleSearch = (query) => {
  searchQuery.value = query;
};
</script>

<template>
  <header>
    <SearchBar class="search-bar" @search="handleSearch" />
    <UserCenterLink class="user-center-link" />
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

.user-center-link {
  margin: auto;
  position: absolute;
  top: 4rem;
  padding: 10px 20px;
  left: 10%;
  /* background-color: whitesmoke; */
}

@media (max-width: 600px) {
  .search-bar {
    position: relative;
    top: 2rem;
    left: 10%;
  }

  .user-center-link {
    position: relative;
    top: -0.8rem;
    left: -8%;
  }

}
</style>