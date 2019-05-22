const {
  Resp,
  RespMessage
} = require('../../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const MessageId = req.query.MessageId
      const respsMessage = await RespMessage.findAll({
        where: {
          MessageId: MessageId
        },
        include: [
          {
            model: Resp
          }
        ]
      })
        .map(respMessage => respMessage.toJSON())
        .map(respMessage => _.extend(
          {},
          respMessage.Resp,
          respMessage
        ))
      res.send(_.uniqBy(respsMessage, respMessage => respMessage.RespId))
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the resp message'
      })
    }
  },
  async post(req, res) {
    try {
      const { MessageId, RespId } = req.body
      const respMessage = await RespMessage.create({
        MessageId: MessageId,
        RespId: RespId
      })
      res.send(respMessage)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to create the resp message'
      })
    }
  },
  async delete(req, res) {
    try {
      const { respMessageId } = req.params
      const respmessage = await RespMessage.findOne({
        where: {
          id: respMessageId
        }
      })
      if (!respmessage) {
        return res.status(403).send({
          error: 'you do not have access to this resp message'
        })
      }
      await respmessage.destroy()
      res.send(respmessage)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to delete the resp message'
      })
    }
  }
}