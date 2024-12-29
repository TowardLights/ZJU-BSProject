<script setup>
import { ref } from 'vue';
import axios from 'axios';

const newUsername = ref('');
const usernameError = ref('');

const changeUsername = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:3000/user/change-username', {
      newUsername: newUsername.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data.success) {
      alert('用户名修改成功');
      newUsername.value = '';
      usernameError.value = '';
    } else {
      usernameError.value = response.data.message;
    }
  } catch (error) {
    usernameError.value = '修改用户名失败，请稍后再试';
  }
};
</script>

<template>
  <div class="change-username">
    <h2>修改用户名</h2>
    <input type="text" v-model="newUsername" placeholder="新用户名" />
    <button @click="changeUsername">修改</button>
    <span v-if="usernameError">{{ usernameError }}</span>
  </div>
</template>

<style scoped>
.change-username {
  margin-bottom: 20px;
}

input {
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

span {
  color: red;
  font-size: 13px;
}
</style>