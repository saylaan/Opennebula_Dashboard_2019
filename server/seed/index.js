const {
  sequelize,
  Vlab,
  User,
  VlabUser
} = require('../src/models')

const Promise = require('bluebird')
const vlabs = require('./vlabs.json')
const users = require('./users.json')
const vlabUsers = require('./vlabUsers.json')

sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
      vlabs.map(vlab => {
        Vlab.create(vlab)
      })
    )

    await Promise.all(
      vlabUsers.map(vlabUser => {
        VlabUser.create(vlabUser)
      })
    )
  })