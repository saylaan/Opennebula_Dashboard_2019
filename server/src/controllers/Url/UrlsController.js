const { Url } = require('../../models')

module.exports = {
  async index(req, res) {
    try {
      urls = await Url.findAll({
        limit: 100
      })
      res.send(urls)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to fetch all the url'
      })
    }
  },
  async post(req, res) {
    try {
      const url = await Url.create(req.body)
      res.send(url)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new url'
      })
    }
  }
}
