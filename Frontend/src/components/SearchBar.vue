<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const query = ref('');
const emit = defineEmits(['search']);

const search = () => {
  emit('search', query.value);
};
</script>

<template>
  <div class="search-bar">
    <input type="text" v-model="query" placeholder="输入商品名称" />
    <button @click="search">搜索</button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  max-width: 30rem;
  width: 50%;
}

input {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>