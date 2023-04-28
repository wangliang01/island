import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(process.env.DATABASE as string, process.env.USER as string, process.env.PASSWORD as string, {
  dialect: 'mysql',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  logging: true,
  timezone: '+08:00',
  define: {
    timestamps: true, // create_time, update_time
    paranoid: true, // delete_time
    // createdAt: 'create_at',
    // updatedAt: 'update_at',
    // deletedAt: 'delete_at',
    underscored: true
  }
})

sequelize.sync({
  force: false
})
