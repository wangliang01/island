import { ParameterException } from './../core/http-exception';
import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../core/db'
import bcrypt from 'bcryptjs'

class User extends Model {
  static async verifyEmailPassword(account: string, password: string) {
    const user = await User.findOne({
      where: {
        email: account
      }
    })

    if (!user) {
      throw new ParameterException('用户不存在')
    }

    const correct = bcrypt.compareSync(password, user.getDataValue('password'))

    if (!correct) {
      throw new ParameterException('密码不正确')
    }

    return user.dataValues
  }
}


User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: DataTypes.STRING,
  email: {
    type: DataTypes.STRING(128),
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    set(val: string) {
      const salt = bcrypt.genSaltSync(10)

      const pwd = bcrypt.hashSync(val, salt)

      this.setDataValue('password', pwd)
    }
  },
  openid: {
    type: DataTypes.STRING(64),
    unique: true
  }
}, {sequelize, tableName: 'user'})

export default User