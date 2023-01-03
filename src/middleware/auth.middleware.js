const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const {
  tokenExpireError,
  jsonWebTokenError,
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

module.exports = auth
