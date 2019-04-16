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
        err: 'An error has occured while trying to fetch all the Vm'
      })
    }
  },
  async post(req, res) {
    try {
      const vm = await Vm.create(req.body)
      res.send(vm)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new Vm'
      })
    }
  }
}
