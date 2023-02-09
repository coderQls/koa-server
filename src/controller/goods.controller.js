const path = require('path')

const {
  fileUploadError,
  unSupportedFileType,
  publishGoodsError,
  invalidGoodsID,
} = require('../constant/error.type')

const { createGoods, updateGoods } = require('../service/goods.service')

class GoodsContrller {
  async upload(ctx, next) {
    const img = ctx.request.files && ctx.request.files.img
    const fileTypes = ['image/jpeg', 'image/png']
    if (img) {
      if (!fileTypes.includes(img.mimetype)) {
        return ctx.app.emit('error', unSupportedFileType, ctx)
      }
      ctx.body = {
        code: 0,
        message: '商品图片上传成功',
        result: {
          goods_img: path.basename(img.filepath),
        },
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx)
    }
  }

  async create(ctx) {
    // 直接调用service的createGoods方法
    try {
      const res = await createGoods(ctx.request.body)
      console.log(3322, res)
      ctx.body = {
        code: 0,
        message: '发布商品成功',
        result: res,
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', publishGoodsError)
    }
  }

  async update(ctx) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body)

      if (res) {
        ctx.body = {
          code: 0,
          message: '更新商品成功',
          result: '',
        }
      } else {
        return ctx.app.emit('error', invalidGoodsID, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = new GoodsContrller()
