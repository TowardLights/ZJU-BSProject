var express = require('express');
var router = express.Router();
var dbApi = require('../database/dbapi');
var jwt = require('jsonwebtoken');

const { fetchProducts, fetchHistoryPrices } = require('../utils/productsCrawler');

const SECRET_KEY = process.env.SECRET_KEY;
const MAX_PAGES = 1;

router.post('/search', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ success: false, message: '未提供token' });
  }

  jwt.verify(token.split(' ')[1], SECRET_KEY, async (err) => {
    if (err) {
      return res.status(401).json({ success: false, message: '无效的token' });
    }
    const { query } = req.body;
    try {
      const products = await fetchProducts(query, MAX_PAGES);
      // 将每个产品插入到数据库中
      for (const product of products) {
        await dbApi.insertProduct(
          product.product_name,
          product.image_url,
          product.current_price,
          product.platform,
          product.store_name,
          product.product_url
        );
      }
      res.status(200).json({ success: true, products });
    } catch (error) {
      console.error('获取商品错误:', error);
      res.status(500).json({ success: false, message: '获取商品失败' });
    }
  });
});

router.get('/products', async (req, res) => {
  try {
    const products = await dbApi.getProducts();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('获取商品错误:', error);
    res.status(500).json({ success: false, message: '获取商品失败' });
  }
});

router.post('/history-price', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ success: false, message: '未提供token' });
  }

  jwt.verify(token.split(' ')[1], SECRET_KEY, async (err) => {
    if (err) {
      return res.status(401).json({ success: false, message: '无效的token' });
    }
    const { productUrl } = req.body;
    try {
      const historyPricesInfo = await fetchHistoryPrices(productUrl);
      res.status(200).json({ success: true, historyPricesInfo });
    } catch (error) {
      console.error('获取历史价格错误:', error);
      res.status(500).json({ success: false, message: '获取历史价格失败' });
    }
  });
});
module.exports = router;