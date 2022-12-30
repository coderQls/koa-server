const jwt = require('jsonwebtoken')
const { createUser, getUserInfo } = require('../service/user.service')
const { userRigisterError } = require('../constant/error.type')
const { JWT_SECRET } = require('../config/config.default')

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

    // 1. 获取用户的信息，在token的payload中记录id, user_name，is_admin
    try {
      // 从返回结果对象中剔除password属性，将新的属性放在res中
      const { password, ...res } = await getUserInfo({ user_name })
      ctx.body = {
        code: 0,
        message: '登陆成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
          ...res,
        },
      }
    } catch (error) {
      console.error('用户登录失败', error)
    }
  }
}

module.exports = new UserController()
