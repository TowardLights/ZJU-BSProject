require('dotenv').config();
var express = require('express');
var router = express.Router();
var dbApi = require('../database/dbapi');
var jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY; // 从环境变量中读取密钥

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const isValidUser = await dbApi.verifyUser(email, password);
    if (isValidUser) {
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: 24 * 3600 });
      res.status(200).json({ success: true, message: '登录成功', token });
    } else {
      res.status(200).json({ success: false, message: '邮箱或密码错误' });
    }
  } catch (error) {
    console.error('登录错误:', error); // 调试，记录错误信息
    res.status(500).json({ success: false, message: '登录失败，请稍后再试（服务端）' });
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUsers = await dbApi.checkUserExists(username, email);
    if (existingUsers.length > 0) {
      const userExists = existingUsers.some(user => user.user_name === username);
      const emailExists = existingUsers.some(user => user.email === email);
      if (emailExists) {
        res.status(200).json({ success: false, message: '该邮箱已经被注册' });
      } else if (userExists) {
        res.status(200).json({ success: false, message: '用户名重复' });
      }
    } else {
      await dbApi.createUser(username, email, password);
      res.status(200).json({ success: true, message: '用户注册成功' });
    }
  } catch (error) {
    console.error('注册错误:', error); // 记录错误信息
    res.status(500).json({ success: false, message: '用户注册失败' });
  }
});

router.get('/user-center', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ success: false, message: '未提供token' });
  }
  jwt.verify(token.split(' ')[1], SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'token无效' });
    }
    const { email } = decoded;
    try {
      const user = await dbApi.getUser(email);
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error('获取用户信息错误:', error);
      res.status(500).json({ success: false, message: '获取用户信息失败' });
    }
  });
});

router.post('/change-username', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ success: false, message: '未提供token' });
  }
  jwt.verify(token.split(' ')[1], SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'token无效' });
    }
    const { email } = decoded;
    const { newUsername } = req.body;
    try {
      await dbApi.updateUsername(email, newUsername);
      res.status(200).json({ success: true, message: '用户名更新成功' });
    } catch (error) {
      if (error.message === '用户名重复') {
        res.status(200).json({ success: false, message: '用户名重复' });
      } else {
        console.error('更新用户名错误:', error);
        res.status(500).json({ success: false, message: '更新用户名失败' });
      }
    }
  });
});

router.post('/change-password', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ success: false, message: '未提供token' });
  }
  jwt.verify(token.split(' ')[1], SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'token无效' });
    }
    const { email } = decoded;
    const { oldPassword, newPassword } = req.body;
    try {
      await dbApi.updatePassword(email, oldPassword, newPassword);
      res.status(200).json({ success: true, message: '密码更新成功' });
    } catch (error) {
      if (error.message === '旧密码不正确') {
        res.status(200).json({ success: false, message: '旧密码不正确' });
      } else {
        console.error('更新密码错误:', error);
        res.status(500).json({ success: false, message: '更新密码失败' });
      }
    }
  });
});

router.post('/price-alert', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ success: false, message: '未提供token' });
  }
  jwt.verify(token.split(' ')[1], SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'token无效' });
    }
    const { email } = decoded;
    const { productName, targetPrice } = req.body;
    try {
      await dbApi.addPriceAlert(email, productName, targetPrice);
      res.status(200).json({ success: true, message: '价格提醒设置成功' });
    } catch (error) {
      console.error('设置价格提醒错误:', error);
      res.status(500).json({ success: false, message: '设置价格提醒失败' });
    }
  });
});

module.exports = router;
