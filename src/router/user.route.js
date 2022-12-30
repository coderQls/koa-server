const path = require('path')
const Router = require('koa-router')

const {
  userValidator,
  verifyUser,
  encryptPassword,
  verifyLogin,
} = require('../middleware/user.middleware')

const { register, login } = require(path.resolve(
  __dirname,
  '../controller/user.controller'
))

const router = new Router({
  prefix: '/users',
})

// 注册接口
router.post('/register', userValidator, verifyUser, encryptPassword, register)

// 登录接口
router.post('/login', userValidator, verifyLogin, login)

module.exports = router
