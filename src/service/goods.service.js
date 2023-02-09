const Goods = require('../model/goods.model')

class GoodsService {
  async createGoods(goods) {
    const { dataValues } = await Goods.create(goods)
    const { createdAt, updatedAt, ...data } = dataValues
    return data
  }

  async updateGoods(id, goods) {
    const res = await Goods.update(goods, { where: { id } })
    return res[0] > 0
  }
}

module.exports = new GoodsService()
