import { Auth } from './../../middleware/auth';
import { PositiveIntegerValidator } from './../../validator/index';
import Router from 'koa-router'

const router = new Router({
  prefix: '/v1'
})

// 
router.get('/classic/latest',new Auth(4).m,  async (ctx, next) => {
  try {
    await new PositiveIntegerValidator(ctx).validate()
  } catch (error) {
    console.log("error", error)
    throw error
  }

  ctx.body = {
    key: 'classic'
  }
})

export default router
