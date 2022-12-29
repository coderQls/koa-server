const { getUserInfo } = require('../service/user.service')
const {
  userFormatError,
  userAlreadyExisted,
} = require('../constant/error.type')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  console.log(ctx.request.body)
  // 合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormatError, ctx)
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  // 合理性
  if (getUserInfo({ user_name })) {
    ctx.app.emit('error', userAlreadyExisted, ctx)
    return
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
}
