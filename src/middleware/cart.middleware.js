const { cartFormatError } = require('../constant/error.type')

const validator = (rules) => {
  return async (ctx, next) => {
    console.log(123, ctx.request)
    try {
      ctx.verifyParams(rules)
    } catch (err) {
      console.error(err)
      cartFormatError.result = err
      return ctx.app.emit('error', cartFormatError, ctx)
    }

    await next()
  }
}

module.exports = {
  validator,
}
