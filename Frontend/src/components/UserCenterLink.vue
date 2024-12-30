<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router';
const username = ref('');

const fetchUserInfo = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://10.162.146.133:3000/user/user-center', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
            username.value = response.data.user.user_name;
        } else {
            router.push('/');
            alert('未获取到用户信息，请先登录');
        }
    } catch (error) {
        router.push('/');
        alert('未获取到用户信息，请先登录');
    }
};

onMounted(fetchUserInfo);

const goToUserCenter = () => {
    router.push('/user-center');
};
</script>

<template>
    <div class="user-center" @click="goToUserCenter">
        当前用户：{{ username }}
    </div>
</template>

<style scoped>
.user-center {
    margin-left: auto;
    cursor: pointer;
    color: #000000;
    font-weight: bold;
}

.user-center:hover {
    text-decoration: underline;
}
</style>