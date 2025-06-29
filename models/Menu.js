const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class Menu extends Model {}

Menu.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  path: DataTypes.STRING(100),
  name: DataTypes.STRING(50),
  component: DataTypes.STRING(100),
  redirect: DataTypes.STRING(100),
  meta: DataTypes.JSON,
  alwaysShow: DataTypes.BOOLEAN,
  parentId: DataTypes.INTEGER.UNSIGNED
}, {
  sequelize,
  tableName: 'menus'
});

// 定义自关联（父-子菜单关系）
Menu.hasMany(Menu, { as: 'children', foreignKey: 'parentId' });
Menu.belongsTo(Menu, { as: 'parent', foreignKey: 'parentId' });

module.exports = Menu;