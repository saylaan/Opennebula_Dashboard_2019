const { Vm } = require('../../models')

module.exports = {
  async index(req, res) {
    try {
      vms = await Vm.findAll({
        limit: 100
      })
      res.send(vms)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to fetch all the vm'
      })
    }
  },
  async getVm(req, res) {
    try {
      const vm = await Vm.findByPk(req.params.vmId)
      if (!vm) {
        return res.status(403).send({
          error: 'The vm does not exit'
        })
      }
      res.send(vm)
    } catch (err) {
      res.status(500).send({
        error: 'An erro has occured while trying to get the vm'
      })
    }
  },
  async put(req, res) {
    try {
      const vm = await Vm.update(req.body, {
        where: {
          id: req.params.vmId
        }
      })
      res.send(vm)
    } catch (err) {
      res.status(500).send({
        error: 'An erro has occured while trying to update the vm'
      })
    }
  },
  async delete(req, res) {
    try {
      const vm = await Vm.findByPk(req.params.vmId)
      if (!vm) {
        return res.status(403).send({
          error: 'The vm does not exit'
        })
      }
      await vm.destroy()
      res.send(vm)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to delete the vm'
      })
    }
  },
  async post(req, res) {
    try {
      const vm = await Vm.create(req.body)
      res.send(vm)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new vm'
      })
    }
  }
}
