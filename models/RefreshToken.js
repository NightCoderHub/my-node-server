const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class RefreshToken extends Model {}

RefreshToken.init({
  token: {
    type: DataTypes.STRING(500),
    allowNull: false,
    unique: true
  },
  expiresAt: {
    type: DataTypes.DATE,  // 关键修改：将类型改为 DataTypes.DATE
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'refresh_tokens'
});

RefreshToken.belongsTo(require('./User'), { foreignKey: 'userId' });

module.exports = RefreshToken;