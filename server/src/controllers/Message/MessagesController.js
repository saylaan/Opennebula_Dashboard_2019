const { Message } = require('../../models')
const _ = require('lodash')
module.exports = {
  async index(req, res) {
    try {
      const value = req.query.value
      if (value == 1) {
        messages = await Message.findAll({
            where: {
              faq: true
            }
          })
      } else if (value == 2) {
        messages = await Message.findAll({
          where: {
            user: true
          }
        })
      }
      res.send(_.uniqBy(messages))
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to fetch all the Message'
      })
    }
  },
  async post(req, res) {
    try {
      const message = await Message.create(req.body)
      res.send(message)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new message'
      })
    }
  },
  async postNewMsg(req, res) {
    try {
      const message = await Message.create(req.body)
      res.send(message)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new message'
      })
    }
  },
  async getMessage(req, res) {
    try {
      const message = await Message.findByPk(req.params.messageId)
      if (!message) {
        return res.status(403).send({
          error: 'The message does not exist'
        })
      }
      res.send(message)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to get the message'
      })
    }
  },
  async delete(req, res) {
    try {
      const message = await Message.findByPk(req.params.messageId)
      if (!message) {
        return res.status(403).send({
          error: 'The message does no exist'
        })
      }
      await message.destroy()
      res.send(message)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to delete the Vlab User'
      })
    }
  },
  async deleteBis(req, res) {
    try {
      const message = await Message.findByPk(req.query.messageId)
      if (!message) {
        return res.status(403).send({
          error: 'The message does no exist'
        })
      }
      await message.destroy()
      res.send(message)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to delete the Vlab User'
      })
    }
  }
}
