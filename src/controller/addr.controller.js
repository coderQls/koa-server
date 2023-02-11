const {
  createAddr,
  findAllAddr,
  updateAddr,
  deleteAddr,
} = require('../service/address.service')

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

const findAll = async (ctx) => {
  const user_id = ctx.state.user.id
  const res = await findAllAddr(user_id)

  ctx.body = {
    code: 0,
    message: '获取列表成功',
    result: res,
  }
}

const update = async (ctx) => {
  const id = ctx.request.params.id
  await updateAddr(id, ctx.request.body)
  ctx.body = {
    code: 0,
    message: '更新地址成功',
    result: '',
  }
}

const remove = async (ctx) => {
  const id = ctx.request.params.id
  const res = await deleteAddr(id)
  ctx.body = {
    code: 0,
    message: '删除地址成功',
    result: res,
  }
}

module.exports = {
  create,
  findAll,
  update,
  remove,
}
