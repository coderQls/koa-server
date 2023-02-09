const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')
const { upload, create, update } = require('../controller/goods.controller')

const router = new Router({ prefix: '/goods' })

// 商品图片上传接口
router.post('/upload', auth, hadAdminPermission, upload)
// router.post('/upload', upload)

// 发布商品接口
router.post('/create', auth, hadAdminPermission, validator, create)

// 更新商品接口
router.put('/update/:id', auth, hadAdminPermission, validator, update)

module.exports = router
