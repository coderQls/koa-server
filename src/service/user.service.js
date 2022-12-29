const User = require('../model/user.model')

class UserService {
  async createUser(user_name, password) {
    // 插入数据
    const res = await User.create({
      // 表的字段
      user_name,
      password,
    })

    return res.dataValues
  }

  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt,
    })
  }
}

module.exports = new UserService()
