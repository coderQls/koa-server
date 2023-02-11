const { createOrder } = require('../service/order.service')

const create = async (ctx) => {
  const user_id = ctx.state.user.id
  const { address_id, goods_info, total } = ctx.request.body

  const order_number = 'ZD' + Date.now()

  const res = await createOrder({
    user_id,
    address_id,
    goods_info,
    total,
    order_number,
  })

  ctx.body = {
    code: 0,
    message: '生成订单成功',
    result: res,
  }
}

module.exports = {
  create,
}
