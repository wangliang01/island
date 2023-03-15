// import { errorCode, errorMsg } from './../config/error-code';
export class HttpException extends Error {
  constructor(public msg: string | string[] = '业务异常', public errorCode: string = '00400',  public code: number = 400) {
    super()
    this.errorCode = errorCode
    this.msg = msg 
    this.code = code
  }
}

export class ParameterException extends HttpException {
  constructor(public msg: string | string[], public errorCode: string = '00400' ) {
    super()
    this.errorCode = errorCode 
    this.msg = msg 
    this.code = 400
  }
}

export class Success extends HttpException {
  constructor(public msg: string = '操作成功', public errorCode: string = '00200') {
    super()
    this.errorCode = errorCode 
    this.msg = msg 
    this.code = 200
  }
}

export class Forbbiden extends HttpException {
  constructor(public msg: string = '禁止访问', public errorCode: string = '00403') {
    super()
    this.errorCode = errorCode 
    this.msg = msg 
    this.code = 403
  }
}