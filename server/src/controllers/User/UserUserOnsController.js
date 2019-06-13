const {
  User,
  UserUserOn
} = require('../../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const UserOpenNebulaId = req.query.UserOpenNebulaId
      const userUserOns = await UserUserOn.findAll({
        where: {
          UserOpenNebulaId: UserOpenNebulaId
        },
        include: [
          {
            model: User
          }
        ]
      })
        .map(userUserOn => userUserOn.toJSON())
        .map(userUserOn => _.extend(
          {},
          userUserOn.User,
          userUserOn
        ))
      res.send(_.uniqBy(userUserOns, userUserOn => userUserOn.UserId))
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the user of user opennebula'
      })
    }
  },
  async post(req, res) {
    try {
      const { UserId, UserOpenNebulaId } = req.body
      const userUserOn = await UserUserOn.create({
        UserId: UserId,
        UserOpenNebulaId: UserOpenNebulaId
      })
      res.send(userUserOn)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to create the vm for the user of user opennebula'
      })
    }
  },
  async delete(req, res) {
    try {
      const { userUserOnId } = req.params

      const useruserOn = await VmVlab.findOne({
        where: {
          id: userUserOnId
        }
      })
      if (!useruserOn) {
        return res.status(403).send({
          error: 'you do not have access to this user of user opennebula'
        })
      }
      await useruserOn.destroy()
      res.send(useruserOn)
    } catch (err) {
      res.status(500).send({
        err: 'An erro has occured while trying to delete the user of user opennebula'
      })
    }
  }
}