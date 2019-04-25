const {
  Message,
  MessageUser
} = require('../../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const UserId = req.user.id
      const messagesUser = await MessageUser.findAll({
        where: {
          UserId: UserId
        },
        include: [
          {
            model: Message
          }
        ]
      })
        .map(messageUser => messageUser.toJSON())
        .map(messageUser => _.extend(
          {},
          messageUser.Message,
          messageUser
        ))
      res.send(_.uniqBy(messagesUser, messageUser => messageUser.MessageId))
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the Message User'
      })
    }
  },
  async post(req, res) {
    try {
      const UserId = req.user.id
      const { MessageId } = req.body
      const messageUser = await MessageUser.create({
        MessageId: MessageId,
        UserId: UserId
      })
      res.send(messageUser)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to create the message for the user'
      })
    }
  }
}