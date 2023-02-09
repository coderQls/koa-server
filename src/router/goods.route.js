const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')
const {
  upload,
  create,
  update,
  remove,
  restore,
  findAll,
} = require('../controller/goods.controller')

const router = new Router({ prefix: '/goods' })

// 商品图片上传接口
router.post('/upload', auth, hadAdminPermission, upload)
// router.post('/upload', upload)

// 发布商品接口
router.post('/create', auth, hadAdminPermission, validator, create)

// 更新商品接口
router.put('/update/:id', auth, hadAdminPermission, validator, update)

// 硬删除商品
// router.delete('/delete/:id', auth, hadAdminPermission, remove)

// 下架商品
router.post('/off/:id', auth, hadAdminPermission, remove)

// 上架商品
router.post('/on/:id', auth, hadAdminPermission, restore)

// 获取商品列表
router.get('/list', findAll)

module.exports = router
