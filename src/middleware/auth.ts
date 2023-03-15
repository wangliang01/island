import jwt, {
  JsonWebTokenError,
  TokenExpiredError,
  JwtPayload
} from 'jsonwebtoken'
import { Forbbiden } from './../core/http-exception'
import { Next, Context } from './../types/index'
import basicAuth from 'basic-auth'
interface IAuth {
  level?: number
}
export class Auth {
  static USER = 8
  static ADMIN = 16
  constructor(public level = 1) {
    this.level = level
  }
  get m() {
    console.log(this.level)
    const level = this.level
    return async function (ctx: Context, next: Next) {
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      let result 
      if (!userToken || !userToken.name) {
        throw new Forbbiden()
      }
      try {
        result = jwt.verify(
          userToken.name,
          process.env.PRIVATE_KEY as string
        ) as JwtPayload

       

      } catch (error) {
        console.log(error)
        if (error instanceof TokenExpiredError) {
          errMsg = 'token已过期'
        } else {
          errMsg = 'token不合法'
        }
        throw new Forbbiden(errMsg)
      }

      if (result.scope < level) {
        errMsg = '权限不足'
        throw new Forbbiden(errMsg)
      }

      ctx.auth = {
        uid: result.uid,
        scope: result.scope
      }
    }
  }
}
