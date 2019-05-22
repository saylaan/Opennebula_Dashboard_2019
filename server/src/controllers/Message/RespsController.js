const { Resp } = require('../../models')
const _ = require('lodash')
module.exports = {
  async index(req, res) {
    try {
      const value = req.query.value
      if (value == 1) {
        resps = await Resp.findAll({
            where: {
              faq: true
            }
          })
      } else if (value == 2) {
        resps = await Resp.findAll({
          where: {
            user: true
          }
        })
      } else if (value == 3) {
        resps = await Resp.findAll({
          where: {
            admin: true,
          }
        })
      }
      res.send(_.uniqBy(resps))
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to fetch all the resp'
      })
    }
  },
  async post(req, res) {
    try {
      const resp = await Resp.create(req.body)
      res.send(resp)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new resp'
      })
    }
  },
  async get(req, res) {
    try {
      const resp = await Resp.findByPk(req.params.respId)
      if (!resp) {
        return res.status(403).send({
          error: 'The resp does no exist'
        })
      }
      res.send(resp)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to get the resp'
      })
    }
  },
  async delete(req, res) {
    try {
      const resp = await Resp.findByPk(req.params.respId)
      if (!resp) {
        return res.status(403).send({
          error: 'The resp does no exist'
        })
      }
      await resp.destroy()
      res.send(resp)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to delete the resp'
      })
    }
  }
}
