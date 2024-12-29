<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router';

const user = ref({});

const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://10.162.146.133:3000/user/user-center', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data.success) {
      user.value = response.data.user;
    }
    else {
      router.push('/');
    }
  } catch (error) {
    router.push('/');
    console.error('获取用户信息失败', error);
  }
};

onMounted(fetchUserInfo);
</script>

<template>
  <div class="user-info">
    <h2>用户信息</h2>
    <p>用户名: {{ user.user_name }}</p>
    <p>邮箱: {{ user.email }}</p>
  </div>
</template>

<style scoped>
.user-info {
  margin-bottom: 20px;
}
</style>