const {
  Vm,
  VmVlab
} = require('../../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const VlabId = req.query.VlabId
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
        err: 'An error has occured while trying to get the Vm Vlab'
      })
    }
  },
  async post(req, res) {
    try {
      console.log(req.body)
      const { VlabId, VmId } = req.body
      const vmVlab = await VmVlab.create({
        VmId: VmId,
        VlabId: VlabId
      })
      res.send(vmVlab)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to create the vm for the vlab'
      })
    }
  },
  async delete(req, res) {
    try {
      const { vmVlabId } = req.params

      const vmvlab = await VmVlab.findOne({
        where: {
          id: vmVlabId
        }
      })
      if (!vmvlab) {
        return res.status(403).send({
          error: 'you do not have access to this vmvlab'
        })
      }
      await vmvlab.destroy()
      res.send(vmvlab)
    } catch (err) {
      res.status(500).send({
        err: 'An erro has occured while trying to delte the vm from the vlab'
      })
    }
  }
}