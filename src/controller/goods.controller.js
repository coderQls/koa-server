const path = require('path')

const { fileUploadError } = require('../constant/error.type')

class GoodsContrller {
  async upload(ctx, next) {
    // console.log(ctx.request.files.img)
    const { img } = ctx.request.files
    console.log(img, img.filepath)
    // console.log(path.basename(img.path))
    if (img) {
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
}

module.exports = new GoodsContrller()
