const path = require('path')
const { APP_PORT } = require(path.resolve(__dirname, './config/config.default'))

const app = require(path.resolve(__dirname, './app'))

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`)
})
