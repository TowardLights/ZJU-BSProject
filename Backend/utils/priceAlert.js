const dbApi = require('../database/dbapi');
const { fetchProductPrice } = require('./productsCrawler');
const nodemailer = require('nodemailer');

async function checkPriceAlerts() {
  try {
    const alerts = await dbApi.getAllPriceAlerts();
    for (const alert of alerts) {
      const currentPrice = await fetchProductPrice(alert.product_name);
      if (currentPrice !== null && currentPrice <= alert.target_price) {
        await sendNotification(alert.email, alert.product_name, currentPrice);
      }
    }
  } catch (error) {
    console.error('检查价格提醒错误:', error);
  }
}

async function sendNotification(email, productUrl, currentPrice) {
  const transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // QQ 邮箱的授权码
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '商品降价提醒',
    text: `您关注的商品(${productUrl})价格已降至${currentPrice}元，快去看看吧！`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('通知发送成功:', email);
  } catch (error) {
    console.error('发送通知错误:', error);
  }
}

module.exports = { checkPriceAlerts };