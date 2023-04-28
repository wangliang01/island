import { IRouterModule, Application } from './../types/index'
import Router from 'koa-router'
import requireDirectory from 'require-directory'
import { catchError } from '../middleware/exception'
import { initDotenv } from './dotenv'

class InitManager {
  static app: Application
  static initCore(app: Application) {
    InitManager.app = app
    InitManager.initLoadGlobalException()
    InitManager.initLoadRouters()
  }
  static initLoadGlobalException() {
    const app = InitManager.app
    app.use(catchError)
  }
  static initEnv() {
    initDotenv()
  }
  static initLoadRouters() {
    const app = InitManager.app

    const apiDirectory = `${process.cwd()}/src/api`
    requireDirectory(module, apiDirectory, {
      extensions: ['ts', 'js', 'json'],
      visit(router: { default: Router | IRouterModule }) {
        if (router.default instanceof Router) {
          app.use(router.default.routes()).use(router.default.allowedMethods())
        } else {
          const innerRouter = (router.default as IRouterModule).router
          if (innerRouter instanceof Router) {
            app.use(innerRouter.routes()).use(innerRouter.allowedMethods())
          }
        }
      }
    })
  }
}

export default InitManager
