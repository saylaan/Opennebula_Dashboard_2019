const { Message } = require('../../models')

module.exports = {
  async index(req, res) {
    try {
      message = await Message.findAll({
          limit: 100
        })
      res.send(message)
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
  }
  // async put(req, res) {
  //   try {
  //     const user = await User.update(req.body, {
  //       where: {
  //         id: req.params.userId
  //       }
  //     })
  //     res.send(user)
  //   } catch (err) {
  //     res.status(500).send({
  //       err: 'An error has occured while trying to update the user'
  //     })
  //   }
  // }
}
