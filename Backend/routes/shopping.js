var express = require('express');
var router = express.Router();
var dbApi = require('../database/dbapi');
var jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

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
      const products = await dbApi.searchProducts(query);
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
module.exports = router;