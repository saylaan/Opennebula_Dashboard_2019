const { Sip } = require('../../models')

module.exports = {
  async index(req, res) {
    try {
      sips = await Sip.findAll({
        limit: 100
      })
      res.send(sips)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to fetch all the sip'
      })
    }
  },
  async getSip(req, res) {
    try {
      const sip = await Sip.findByPk(req.params.sipId)
      if (!sip) {
        return res.status(403).send({
          error: 'The sip does not exit'
        })
      }
      res.send(sip)
    } catch (err) {
      res.status(500).send({
        error: 'An erro has occured while trying to get the sip'
      })
    }
  },
  async put(req, res) {
    try {
      const sip = await Sip.update(req.body, {
        where: {
          id: req.params.sipId
        }
      })
      res.send(sip)
    } catch (err) {
      res.status(500).send({
        error: 'An erro has occured while trying to update the sip'
      })
    }
  },
  async delete(req, res) {
    try {
      const sip = await Sip.findByPk(req.params.sipId)
      if (!sip) {
        return res.status(403).send({
          error: 'The sip does not exit'
        })
      }
      await sip.destroy()
      res.send(sip)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to delete the sip'
      })
    }
  },
  async post(req, res) {
    try {
      const sip = await Sip.create(req.body)
      res.send(sip)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new sip'
      })
    }
  }
}
