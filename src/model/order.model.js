const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Order = seq.define('zd_orders', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户ID',
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '地址ID',
  },
  goods_info: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '商品信息',
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '订单总金额',
  },
  order_number: {
    type: DataTypes.CHAR(15),
    allowNull: false,
    comment: '订单编号',
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: '订单状态',
  },
})

// Order.sync({ force: true })

module.exports = Order
