const { createUser } = require('../service/user.service')

const { userRigisterError } = require('../constant/error.type')
class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    const { user_name, password } = ctx.request.body

    // 2. 操作数据库
    try {
      const res = await createUser(user_name, password)
    } catch (error) {
      console.log(error)
      ctx.emit('error', userRigisterError, ctx)
    }

    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '用户注册成功',
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    }
  }

  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
