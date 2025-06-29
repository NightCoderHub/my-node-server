const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  username: DataTypes.STRING(50),
  password: DataTypes.STRING(100),
  nickname: DataTypes.STRING(50),
  email: DataTypes.STRING(100),
  mobile: DataTypes.STRING(20),
  role: DataTypes.STRING(20),
  status: DataTypes.STRING(20),
  createTime: {  // 关键修改：明确指定类型为 DataTypes.DATE
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW  // 可选：显式设置默认值（与数据库的 CURRENT_TIMESTAMP 对应）
  },
  lastLoginTime: DataTypes.DATE
}, {
  sequelize,
  tableName: 'users'
});

module.exports = User;