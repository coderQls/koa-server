const path = require('path')
const Koa = require('koa')
const { koaBody } = require('koa-body')
const userRouter = require(path.resolve(__dirname, '../router/user.route'))

const app = new Koa()

app.use(koaBody())
app.use(userRouter.routes())

module.exports = app
