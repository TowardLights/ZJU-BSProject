<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/shopping/products');
        products.value = response.data.products;
    } catch (error) {
        console.error('获取商品信息失败', error);
    }
});
</script>

<style scoped>
.product-list {
    display: flex;
    flex-wrap: wrap;
}

.product-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    width: calc(33.333% - 20px);
}
</style>