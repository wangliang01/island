import Koa = require('koa')
import InitManager from './core/init'
import bodyParser from 'koa-bodyparser'
import './config/env'
import { getFreePort } from './core/utils'
const app = new Koa()


app.use(bodyParser())
InitManager.initCore(app)





const start = async () => {
  const port = await getFreePort(3000)
  app.listen(port, () => {
    console.log(`the server is running at http://localhost:${port}`)
  })
}


start()