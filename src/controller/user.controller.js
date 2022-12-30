const { createUser } = require('../service/user.service')

const { userRigisterError } = require('../constant/error.type')
class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    const { user_name, password, is_admin } = ctx.request.body

    // 2. 操作数据库
    try {
      const res = await createUser(user_name, password, is_admin)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
          is_admin: res.is_admin,
        },
      }
    } catch (error) {
      ctx.emit('error', userRigisterError, ctx)
    }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body
    ctx.body = `欢迎回来，${user_name}`
  }
}

module.exports = new UserController()
