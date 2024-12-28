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
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
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

module.exports = router;
