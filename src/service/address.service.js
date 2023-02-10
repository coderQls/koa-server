const Address = require('../model/address.model')

class AddrService {
  async createAddr(addr) {
    const res = await Address.create(addr)
    console.log(res)
    return res
  }
}

module.exports = new AddrService()
