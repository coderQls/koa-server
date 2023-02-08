const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const {
  tokenExpireError,
  jsonWebTokenError,
  hasNotAdminPermisson,
} = require('../constant/error.type')

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  try {
    // user中包含了payload的信息（id, user_name, is_admin）
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        console.log('token已过期')
        return ctx.app.emit('error', tokenExpireError, ctx)
      case 'JsonWebTokenError':
        console.log('无效的token')
        return ctx.app.emit('error', jsonWebTokenError, ctx)
    }
  }

  await next()
}

const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user

  if (!is_admin) {
    console.error('该用户没有管理员权限')
    return ctx.app.emit('error', hasNotAdminPermisson)
  }

  await next()
}

module.exports = {
  auth,
  hadAdminPermission,
}
