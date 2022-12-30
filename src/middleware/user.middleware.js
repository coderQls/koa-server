const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const {
  userFormatError,
  userAlreadyExisted,
  userRigisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
} = require('../constant/error.type')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  console.log(ctx.request.body)
  // 合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    return ctx.app.emit('error', userFormatError, ctx)
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  try {
    const res = await getUserInfo({ user_name })

    if (res) {
      console.error('用户名已经存在', { user_name })
      ctx.app.emit('error', userAlreadyExisted, ctx)
      return
    }
  } catch (error) {
    console.log('获取用户信息错误')
    ctx.app.emit('error', userRigisterError, ctx)
  }

  await next()
}

const encryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const salt = bcrypt.genSaltSync(10)
  // hash保存的是密文
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body

  // 1. 用户是否存在
  try {
    const res = await getUserInfo({ user_name })

    if (!res) {
      console.error('用户名不存在', { user_name })
      ctx.app.emit('error', userDoesNotExist, ctx)
      return
    }
    console.log('userinfo', res)
    // 密码是否匹配（不匹配：报错）
    if (!bcrypt.compareSync(password, res.password)) {
      return ctx.app.emit('error', invalidPassword, ctx)
    }
  } catch (error) {
    console.log('获取用户信息错误')
    return ctx.app.emit('error', userLoginError, ctx)
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  encryptPassword,
  verifyLogin,
}
