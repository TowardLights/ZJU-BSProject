<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/shopping">商城</router-link>
      <router-link to="/user-center">用户中心</router-link>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
div {
  position: absolute;
  top: 1.5rem;
  left: 10%;
}
</style>
