const { Template } = require('../../models')

module.exports = {
  async index(req, res) {
    try {
      templates = await Template.findAll({
        limit: 100
      })
      res.send(templates)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to fetch all the template'
      })
    }
  },
  async post(req, res) {
    try {
      const template = await Template.create(req.body)
      res.send(template)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new template'
      })
    }
  }
}
