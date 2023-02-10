// 1. 导入koa-router包
const Router = require('koa-router')

// 中间件
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/addr.middleware')

// 控制器
const { create } = require('../controller/address.controller')

// 2. 实例化对象
const router = new Router({ prefix: '/address' })

// 3. 编写路由规则
router.post(
  '/add',
  auth,
  validator({
    consignee: 'string',
    phone: {
      type: 'string',
      format: /^1\d{10}$/,
    },
    address: 'string',
  }),
  create
)

// 4. 导出router对象
module.exports = router
