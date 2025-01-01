<script setup>
import router from '@/router';

const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
};
</script>

<template>
    <button @click="logout" class="logout-button">退出登录</button>
</template>

<style scoped>
.logout-button {
    padding: 10px 20px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
}

.logout-button:hover {
    background-color: #c82333;
}
</style>