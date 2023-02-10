// 1. 导入koa-router
const Router = require('koa-router')

// 中间件
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')

// 控制器
const {
  add,
  findAll,
  update,
  remove,
  selectAll,
  unselectAll,
  total,
} = require('../controller/cart.controller')

// 2. 实例化router对象
const router = new Router({ prefix: '/carts' })

// 3. 编写路由规则

// 3.1 添加购物车接口：登录，格式
router.post('/add', auth, validator({ goods_id: 'number' }), add)

// 3.2 获取购物车列表
router.get('/list', auth, findAll)

// 3.3 更新购物车
router.patch(
  '/update/:id',
  auth,
  validator({
    number: { type: 'number', required: false },
    selected: { type: 'boolean', required: false },
  }),
  update
)

// 3.4 删除购物车商品
router.delete('/remove', auth, validator({ ids: 'array' }), remove)

// 3.5 全选
router.post('/selectAll', auth, selectAll)

// 3.6 全不选
router.post('/unselectAll', auth, unselectAll)

// 3.7 获取购物车商品总数
router.get('/total', auth, total)

// 4. 导出router对象
module.exports = router
