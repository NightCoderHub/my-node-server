const { Sequelize } = require('sequelize');

// 从环境变量获取配置（生产环境建议使用.env文件）
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',      // 本地MySQL地址
  port: 3306,             // 默认端口
  username: 'root',       // 你的MySQL用户名
  password: '*SPMc6jz&X53=t',
  database: 'my_node_server_db',
  define: {
    timestamps: false,    // 关闭自动时间戳字段
    underscored: false      // 字段名使用蛇形命名
  }
});

module.exports = sequelize;
