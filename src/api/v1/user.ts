import { Auth } from './../../middleware/auth'
import { LoginType } from './../../config/enum'
import { Success, ParameterException } from './../../core/http-exception'
import Router from 'koa-router'
import { RegisterValidator, TokenValidator } from './../../validator/index'
import User from '../../model/user'
import { generateToken } from '../../core/utils'
// import { Values } from 'async-validator'

const router = new Router({
  prefix: '/v1'
})

/**
 * 用户注册
 */
router.post('/user/register', async (ctx) => {
  const v = await new RegisterValidator(ctx).validate()

  const user = {
    nickname: v?.nickname,
    email: v?.email,
    password: v?.password
  }
  await User.create(user)

  throw new Success()
})

/**
 * 获取token
 */
router.post('/user/token', async (ctx) => {
  const v = await new TokenValidator(ctx).validate()

  if (!v) return
  let token, user

  const type = v?.type
  switch (type) {
    case LoginType.USER_MINI_PROGRAM:
      throw new ParameterException('该方法尚未实现')
    case LoginType.USER_EMAIL:
      user = await User.verifyEmailPassword(v.account, v.password)
      token = generateToken(user.id, Auth.USER)
      break
    case LoginType.USER_MOBILE:
      throw new ParameterException('该方法尚未实现')
    default:
      throw new ParameterException('没有相应的处理函数')
  }

  ctx.body = {
    token
  }
})

export default router
