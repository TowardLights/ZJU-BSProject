<script setup>
import { ref } from 'vue';
import axios from 'axios';

const product = ref('');
const price = ref('');
const alertError = ref('');

const setPriceAlert = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:3000/user/price-alert', {
      product: product.value,
      price: price.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data.success) {
      alert('降价提醒设置成功');
      product.value = '';
      price.value = '';
    } else {
      alertError.value = response.data.message;
    }
  } catch (error) {
    alertError.value = '设置降价提醒失败，请稍后再试';
  }
};
</script>

<template>
  <div class="price-alert">
    <h2>设置降价提醒</h2>
    <input type="text" v-model="product" placeholder="商品名称" />
    <input type="number" v-model="price" placeholder="期望价格" />
    <button @click="setPriceAlert">设置</button>
    <span v-if="alertError">{{ alertError }}</span>
  </div>
</template>

<style scoped>
.price-alert {
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