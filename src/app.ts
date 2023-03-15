import Koa = require('koa')
import InitManager from './core/init'
import bodyParser from 'koa-bodyparser'
import './config/env'
const app = new Koa()


app.use(bodyParser())
InitManager.initCore(app)




app.listen(3000, () => {
  console.log('the server is running at http://localhost:3000')
})