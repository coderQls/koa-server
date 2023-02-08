const path = require('path')

const Koa = require('koa')
const { koaBody } = require('koa-body')

const router = require('../router')
const errHandler = require('./errHandler')

const app = new Koa()

app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 在配置选项option里面，不推荐使用相对路径
      // 在option里的相对路径，不是相对当前文件，而是相对process.cwd()
      uploadDir: path.resolve(__dirname, '../upload'),
      keepExtensions: true,
    },
  })
)
app.use(router.routes()).use(router.allowedMethods())

// 统一的错误处理
app.on('error', errHandler)

module.exports = app
