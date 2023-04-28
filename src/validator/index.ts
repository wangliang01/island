import { LoginType } from './../config/enum'
import { Context } from './../types/index'
import { WangValidator } from './../core/wang-validator'
import User from '../model/user'
export class PositiveIntegerValidator extends WangValidator {
  constructor(ctx: Context) {
    super(ctx)
    this.id = [
      {
        type: 'boolean',
        message: '需要是正整数'
      }
    ]
  }
}

export class RegisterValidator extends WangValidator {
  constructor(ctx: Context) {
    super(ctx)

    // nickname
    this.nickname = [
      { required: true, type: 'string', message: '昵称不能为空' },
      { min: 2, max: 32, message: '昵称长度在2-32位' }
    ]
    // email
    const validateEmail = async (rule: any, value: string, callback: (msg: any) => any) => {
      const user = await User.findOne({
        where: {
          email: value
        }
      })

      if (user) {
        callback(new Error('邮箱已经存在'))
      }
    }
    this.email = [{ required: true, type: 'email', message: '不符合Email规范' }, { asyncValidator: validateEmail }]
    // password
    this.password = [
      { required: true, type: 'string', message: '密码不能为空' },
      { type: 'string', message: '密码至少包含 数字和英文，长度6-20', pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, min: 6, max: 20 }
    ]

    const validatePass = (rule: any, value: string, callback: () => any) => {
      return this.ctx.request.body.password === value
    }

    // confirmPassword
    this.confirmPassword = [...this.password, { validator: validatePass, message: '两个密码不相同' }]
  }
}

export class TokenValidator extends WangValidator {
  constructor(ctx: Context) {
    super(ctx)
    // type 登录方式
    this.type = [
      { required: true, message: 'type是必填参数' },
      { type: 'enum', enum: [LoginType.USER_MINI_PROGRAM, LoginType.USER_EMAIL, LoginType.USER_MOBILE], message: 'type参数不合法' }
    ]
    // account
    this.account = [{ required: true, message: '不符合账号规则', min: 4, max: 32 }]

    const validatePass = (rule: any, value: string, callback: () => any) => {
      console.log(this.ctx.request.body.type, LoginType.USER_EMAIL)
      return this.ctx.request.body.type !== LoginType.USER_EMAIL
    }

    // password
    this.password = [
      { required: this.ctx.request.body.type === LoginType.USER_EMAIL, message: 'password不能为空', type: 'string' },
      { type: 'string', message: '密码至少包含 数字和英文，长度6-20', pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, min: 6, max: 20 }
    ]
  }
}
