<script setup>
import SearchBar from '@/components/SearchBar.vue';
import ProductList from '@/components/ProductList.vue';
import UserCenterLink from '@/components/UserCenterLink.vue';
</script>

<template>
  <header>
    <SearchBar class="search-bar" />
    <UserCenterLink class="user-center-link" />
  </header>

  <main>
    <!-- <ProductList /> -->
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
</style>