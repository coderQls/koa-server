const Goods = require('../model/goods.model')

class GoodsService {
  // 创建商品
  async createGoods(goods) {
    const { dataValues } = await Goods.create(goods)
    const { createdAt, updatedAt, ...data } = dataValues
    return data
  }

  // 更新商品
  async updateGoods(id, goods) {
    // 返回的结果为受影响的个数
    const res = await Goods.update(goods, { where: { id } })
    return res[0] > 0
  }

  // 删除/下架商品
  async removeGoods(id) {
    const res = await Goods.destroy({
      where: {
        id,
      },
    })
    return res > 0
  }

  // 上架商品
  async restoreGoods(id) {
    const res = await Goods.restore({
      where: {
        id,
      },
    })
    return res > 0
  }
}

module.exports = new GoodsService()
