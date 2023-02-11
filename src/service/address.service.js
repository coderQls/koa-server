const Address = require('../model/address.model')

class AddrService {
  async createAddr(addr) {
    const res = await Address.create(addr)
    // console.log(res)
    return res
  }

  async findAllAddr(user_id) {
    const res = await Address.findAll({
      attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],
      where: {
        user_id,
      },
    })
    // console.log(res)
    return res
  }

  async updateAddr(id, addr) {
    const res = await Address.update(addr, {
      where: {
        id,
      },
    })
    // console.log(res)
    return res
  }

  async deleteAddr(id) {
    const res = await Address.destroy({
      where: {
        id,
      },
    })
    // console.log(res)
    return res
  }
}

module.exports = new AddrService()
