// import { WangValidator } from './../../core/wang-validator'
// import { HttpException, ParameterException } from './../../core/http-exception'
import Router from 'koa-router'

const router = new Router({
  prefix: '/v1'
})

router.get('/book', async (ctx, next) => {
  // new WangValidator(ctx).validate()

  // throw new ParameterException('参数错误')
  ctx.body = {
    key: 'book'
  }
})

export default {
  router
}
