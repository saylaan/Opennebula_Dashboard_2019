const {
  Vm,
  VmUser
} = require('../../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const VlabId = req.user.id
      const vmsUser = await VmVlab.findAll({
        where: {
          VlabId: VlabId
        },
        include: [
          {
            model: Vm
          }
        ]
      })
        .map(vmUser => vmUser.toJSON())
        .map(vmUser => _.extend(
          {},
          vmUser.Vm,
          vmUser
        ))
      res.send(_.uniqBy(vmsUser, vmUser => vmUser.VmId))
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the Vms of the User'
      })
    }
  },
  async post(req, res) {
    try {
      const UserId = req.user.id
      const { VmId } = req.body
      const vmUser = await VmVlab.create({
        UserId: UserId,
        VmId: VmId
      })
      res.send(vmUser)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to create the Vm for the User'
      })
    }
  },
  async delete(req, res) {
    try {
      const UserId = req.user.id
      const { vmUserId } = req.params

      const vmUser = await VmUser.findOne({
        where: {
          id: vmUserId,
          UserId: UserId
        }
      })
      if (!vmUser) {
        return res.status(403).send({
          error: 'you do nat have acces to this vmUser'
        })
      }
      await vmUser.destroy()
      res.send(vmUser)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to delete the url user'
      })
    }
  }
}