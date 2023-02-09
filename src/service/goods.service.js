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

  // 查找商品
  async findGoods(pageNum, pageSize) {
    // // 1. 获取总数
    // const count = await Goods.count()
    // // console.log(count)
    // // 2. 获取分页的具体数据
    // const offset = (pageNum - 1) * pageSize
    // const rows = await Goods.findAll({ offset, limit: pageSize })

    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Goods.findAndCountAll({
      offset,
      limit: pageSize,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
    })

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    }
  }
}

module.exports = new GoodsService()
