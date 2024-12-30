<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const productUrl = ref('');
const productName = ref('');
const currentPrice = ref('');
const lowestPrice = ref('');
const historyPrices = ref([]);
const chartData = ref({
  labels: [],
  datasets: [
    {
      label: '价格',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: false,
    },
  ],
});

const fetchHistoryPrices = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://10.162.146.133:3000/shopping/history-price', { productUrl: productUrl.value }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
      const data = response.data.historyPricesInfo;
      productName.value = data.chartTitle;
      historyPrices.value = data.historyPrices;
      currentPrice.value = data.currentPrice;
      lowestPrice.value = data.lowestPrice;
      chartData.value.labels = historyPrices.value.map(item => item.date);
      chartData.value.datasets[0].data = historyPrices.value.map(item => item.price);
    } else {
      console.error('获取历史价格失败', response.data.message);
    }
  } catch (error) {
    console.error('获取历史价格失败', error);
  }
};

const chartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          const date = context.label;
          const price = context.raw;
          return `日期: ${date}, 价格: ${price}`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: '日期',
      },
    },
    y: {
      title: {
        display: true,
        text: '价格',
      },
    },
  },
};

</script>

<template>

  <header>
    <input type="text" v-model="productUrl" placeholder="输入商品网页地址, 如 https://item.jd.com/100026667872.html" />
    <button @click="fetchHistoryPrices">搜索</button>
  </header>
  <main v-if="historyPrices.length">
    <h3>{{ productName }}</h3>
    <Line :data="chartData" :options="chartOptions" />
  </main>

</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: absolute;
  top: 4rem;
  left: 30%;
}

input {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 600px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 60px;
}

button:hover {
  background-color: #0056b3;
}

main {
  position: absolute;
  top: 10rem;
  left: 25%;
  width: 100%;
  max-width: 800px;
}

h3 {
  text-align: center;
  margin-bottom: 20px;
}

@media (max-width: 600px) {
  header {
    position: absolute;
    top: 4.5rem;
    left: 18%;
  }

  input {
    width: 200px;
  }

  h3 {
    font-size: 0.8rem;
  }

  main {
    position: absolute;
    top: 8rem;
    left: 0;
    width: 600px;
  }

}
</style>