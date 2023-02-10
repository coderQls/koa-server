const { createAddr } = require('../service/address.service')

const create = async (ctx) => {
  const user_id = ctx.state.user.id
  const { consignee, phone, address } = ctx.request.body

  const res = await createAddr({ user_id, consignee, phone, address })

  ctx.body = {
    code: 0,
    message: '添加地址成功',
    result: res,
  }
}

module.exports = {
  create,
}
