<script setup>
import router from '@/router';
import { ref } from 'vue';
import axios from 'axios';

const isLogin = ref(true);
const username = ref('');
const email = ref('');
const password = ref('');
const usernameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const serverError = ref(''); // 定义 serverError

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  clearErrors();
};

const clearErrors = () => {
  usernameError.value = '';
  emailError.value = '';
  passwordError.value = '';
  serverError.value = ''; // 清空 serverError
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleSubmit = async () => {
  clearErrors();
  let valid = true;

  if (!validateEmail(email.value)) {
    emailError.value = '邮箱格式不正确';
    valid = false;
  }

  if (password.value.length < 6) {
    passwordError.value = '密码至少有6位';
    valid = false;
  }

  if (valid) {
    if (isLogin.value) {
      await login();
    } else {
      await register();
    }
  }
};

const login = async () => {
  try {
    const response = await axios.post('http://10.162.146.133:3000/user/login', {
      email: email.value,
      password: password.value,
    });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      router.push('/shopping');
    } else {
      serverError.value = response.data.message;
    }
  } catch (error) {
    print(error);
    serverError.value = '登录失败，请稍后再试';
  }
};

const register = async () => {
  try {
    const response = await axios.post('http://10.162.146.133:3000/user/register', {
      username: username.value,
      email: email.value,
      password: password.value,
    });
    if (response.data.success) {
      isLogin.value = true;
      clearErrors();
      email.value = '';
      password.value = '';
    } else {
      serverError.value = response.data.message;
    }
  } catch (error) {
    serverError.value = '注册失败，请稍后再试';
  }
};
</script>

<template>
  <div class="login-box">
    <h2>{{ isLogin ? '登录' : '注册' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div v-if="!isLogin">
        <label for="username">用户名:</label>
        <input type="text" v-model="username" id="username" />
        <span v-if="usernameError">{{ usernameError }}</span>
      </div>
      <label for="email">邮箱:</label>
      <input type="email" v-model="email" id="email" />
      <span v-if="emailError">{{ emailError }}</span>
      <label for="password">密码:</label>
      <input type="password" v-model="password" id="password" />
      <span v-if="passwordError">{{ passwordError }}</span>
      <span v-if="serverError">{{ serverError }}</span> <!-- 显示 serverError -->
      <button type="submit">{{ isLogin ? '登录' : '注册' }}</button>
      <button type="button" @click="toggleMode">{{ isLogin ? '没有账号？注册' : '已有账号？登录' }}</button>
    </form>
  </div>
</template>

<style scoped>
.login-box {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button[type="button"] {
  background-color: #6c757d;
}

button:hover {
  background-color: #0056b3;
}

button[type="button"]:hover {
  background-color: #5a6268;
}

span {
  color: red;
  font-size: 13px;
}
</style>