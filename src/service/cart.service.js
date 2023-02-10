const { Op } = require('sequelize')
const Cart = require('../model/cart.model')

class CartService {
  async createOrUpdate(user_id, goods_id) {
    // 根据user_id和goods_id同时查找，有没有记录
    const res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    })

    if (res) {
      // 已经存在一条记录
      await res.increment('number')
      return await res.reload()
    } else {
      const res2 = await Cart.create({
        goods_id,
        user_id,
      })

      return res2.dataValues
    }
  }
}

module.exports = new CartService()
