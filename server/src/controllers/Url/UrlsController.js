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
  async getUrl(req, res) {
    try {
      const url = await Url.findByPk(req.params.urlId)
      if (!url) {
        return res.status(403).send({
          error: 'The url does not exit'
        })
      }
      res.send(url)
    } catch (err) {
      res.status(500).send({
        error: 'An erro has occured while trying to get the url'
      })
    }
  },
  async put(req, res) {
    try {
      const url = await Url.update(req.body, {
        where: {
          id: req.params.urlId
        }
      })
      res.send(url)
    } catch (err) {
      res.status(500).send({
        error: 'An erro has occured while trying to update the url'
      })
    }
  },
  async delete(req, res) {
    try {
      const url = await Url.findByPk(req.params.urlId)
      if (!url) {
        return res.status(403).send({
          error: 'The url does not exit'
        })
      }
      await url.destroy()
      res.send(url)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to delete the url'
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
