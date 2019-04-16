const {
  Vm,
  VmVlab
} = require('../../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const VlabId = req.user.id
      const vmsVlab = await VmVlab.findAll({
        where: {
          VlabId: VlabId
        },
        include: [
          {
            model: Vm
          }
        ]
      })
        .map(vmVlab => vmVlab.toJSON())
        .map(vmVlab => _.extend(
          {},
          vmVlab.Vm,
          vmVlab
        ))
      res.send(_.uniqBy(vmsVlab, vmVlab => vmVlab.VmId))
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the Vms of the Vlab'
      })
    }
  },
  async post(req, res) {
    try {
      const VlabId = req.user.id
      const { VmId } = req.body
      const vmVlab = await VmVlab.create({
        VlabId: VlabId,
        VmId: VmId
      })
      res.send(vmVlab)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to create the Vm for the Vlab'
      })
    }
  }
}