<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';

const query = ref('');

const search = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://10.162.146.133:3000/shopping/search',
      { query: query.value },
      { headers: { Authorization: `Bearer ${token}` } });
    if (response.data.success) {
      // 处理搜索结果
    } else {
      // router.push('/');
    }
  } catch (error) {
    // router.push('/');
  }
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