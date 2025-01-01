const cron = require('node-cron');
const { checkPriceAlerts } = require('./priceAlert');

// 每天凌晨1点执行一次
const task = cron.schedule('0 1 * * *', () => {
    try {
        console.log('开始检查价格提醒...');
        checkPriceAlerts();
        console.log('价格提醒检查完成');
    } catch (error) {
        console.error('检查价格提醒错误:', error);
    }
}, {
    scheduled: false // 设置为 false 以便手动启动
});

// 导出启动函数
module.exports = {
    start: () => task.start()
};
