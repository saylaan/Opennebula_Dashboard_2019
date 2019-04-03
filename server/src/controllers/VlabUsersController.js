const {VlabUser} = require('../models')

module.exports = {
    async getVlabUsers (req, res) {
      try {
        const {VlabId, UserId} = req.query
        console.log(req.query)
        const vlabUser = await VlabUser.findOne({
          where: {
            UserId: UserId,
            VlabId: VlabId
          }
        })
        if (!vlabUser) {
          res.send({
            message: 'no more vlab link to a user'
          })
        }
        res.send(vlabUser)
      } catch (err) {
        res.status(500).send({
          err: 'An error has occured while trying to get the Vlab User'
        })
      }
    },
    async post (req, res) {
      try {
        const {VlabId, UserId} = req.body
        const vlabuser = await VlabUser.findOne({
          where: {
            VlabId: VlabId,
            UserId: UserId
          }
        })
        if (vlabuser) {
          return res.status(400).send({
            error: 'this user already have a vlab'
          })
        }
        const newVlabUser = await VlabUser.create(req.body)
        res.send(newVlabUser)
      } catch (err) {
        res.status(500).send({
          err: 'An error has occured while trying to create the Vlab User'
        })
      }
    },
    async delete (req, res) {
      try {
        const {vlabuserId} = req.params
        const vlabuser = await VlabUser.findByPk(vlabuserId)
        await vlabuser.destroy()
        res.send(vlabuser)
      } catch (err) {
        res.status(500).send({
          err: 'An error has occured while trying to delete the Vlab User'
        })
      }
    }
}