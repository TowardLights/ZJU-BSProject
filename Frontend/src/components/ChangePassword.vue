<script setup>
import { ref } from 'vue';
import axios from 'axios';

const oldPassword = ref('');
const newPassword = ref('');
const passwordError = ref('');

const changePassword = async () => {
  if (newPassword.value.length < 6) {
    passwordError.value = '新密码至少有6位';
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://10.162.146.133:3000/user/change-password', {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data.success) {
      alert('密码修改成功');
      oldPassword.value = '';
      newPassword.value = '';
      passwordError.value = '';
    } else {
      passwordError.value = response.data.message;
    }
  } catch (error) {
    passwordError.value = '修改密码失败，请稍后再试';
  }
};
</script>

<template>
  <div class="change-password">
    <h2>修改密码</h2>
    <input type="password" v-model="oldPassword" placeholder="旧密码" />
    <input type="password" v-model="newPassword" placeholder="新密码" />
    <button @click="changePassword">修改</button>
    <span v-if="passwordError">{{ passwordError }}</span>
  </div>
</template>

<style scoped>
.change-password {
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