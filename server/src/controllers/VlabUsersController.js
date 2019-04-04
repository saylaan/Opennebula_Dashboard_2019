const {
  VlabUser,
  Vlab,
  User
} = require('../models')
const _ = require('lodash')

module.exports = {
  async getVlabUsers(req, res) {
    try {
      const UserId = req.user.id
      const { VlabId } = req.query
      const where = {
        UserId: UserId
      }
      if (VlabId) {
        where.VlabId = VlabId
      }
      const vlabusers = await VlabUser.findAll({
        where: where,
        include: [
          {
            model: Vlab
          }
        ]
      })
        .map(vlabuser => vlabuser.toJSON())
        .map(vlabuser => _.extend(
          {},
          vlabuser.Vlab,
          vlabuser
        ))
      res.send(vlabusers)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the Vlab User'
      })
    }
  },
  async post(req, res) {
    try {
      const UserId = req.user.id
      const { VlabId } = req.body
      const vlabuser = await VlabUser.findOne({
        where: {
          VlabId: VlabId,
          UserId: UserId
        }
      })
      if (vlabuser) {
        return res.status(400).send({
          error: 'this user already have a this vlab'
        })
      }
      const newVlabUser = await VlabUser.create({
        VlabId: VlabId,
        UserId: UserId
      })
      res.send(newVlabUser)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to create the Vlab User'
      })
    }
  },
  async delete(req, res) {
    try {
      const UserId = req.user.id
      const { vlabuserId } = req.params
      const vlabuser = await VlabUser.findOne({
        where: {
          id: vlabuserId,
          UserId: UserId
        }
      })
      if (!vlabuser) {
        return res.status(403).send({
          error: 'you do not have access to this vlabuser'
        })
      }
      await vlabuser.destroy()
      res.send(vlabuser)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to delete the Vlab User'
      })
    }
  }
}