<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
});

const products = ref([]);
const currentPage = ref(1);
const itemsPerPage = 6;

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://10.162.146.133:3000/shopping/products');
    if (response.data.success && response.data.products.length > 0) {
      products.value = response.data.products;
      console.log('获取商品信息成功');
    } else {
      console.log('数据库中没有商品信息，调用爬虫获取数据');
      await searchProducts('iphone');
    }
  } catch (error) {
    console.error('获取商品信息失败', error);
  }
};

const searchProducts = async (query) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://10.162.146.133:3000/shopping/search',
      { query },
      { headers: { Authorization: `Bearer ${token}` } });
    if (response.data.success) {
      products.value = response.data.products;
      console.log('搜索商品信息成功');
    } else {
      console.log('搜索商品信息失败', response.data.message);
    }
  } catch (error) {
    console.error('搜索商品信息失败', error);
  }
};

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return products.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(products.value.length / itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

watch(() => props.searchQuery, (newQuery) => {
  if (newQuery) {
    searchProducts(newQuery);
  } else {
    searchProducts('iphone');
  }
});

onMounted(fetchProducts);
</script>

<template>
  <div class="product-list">
    <div v-for="product in paginatedProducts" :key="product.product_url" class="product-item">
      <div class="pic">
        <img :src="product.image_url" :alt="product.product_name" />
      </div>
      <div class="details">
        <div class="product-name">
          <a :href="product.product_url" target="_blank">{{ product.product_name }}</a>
        </div>
        <div class="price">价格: {{ product.current_price }}</div>
        <div class="platform">平台: {{ product.platform }}</div>
        <div class="store">店铺: {{ product.store_name }}</div>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<style scoped>
.product-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 8rem;
  left: 25%;
}

.product-item {
  display: flex;
  align-items: center;
  border: 0.5px solid #f6bf8d;
  padding: 10px;
  margin: 0, 10px;
  width: 100%;
  max-width: 800px;
}

.product-item .pic {
  flex-shrink: 0;
  margin-right: 20px;
}

.product-item img {
  max-width: 150px;
  height: auto;
  max-height: 150px;
}

.product-item .details {
  display: flex;
  flex-direction: column;
}

.product-item .details>div {
  margin-bottom: 5px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 16px;
  margin-bottom: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 16px;
}

@media (max-width: 600px) {
  .product-list {
    left: 0;
  }
}
</style>