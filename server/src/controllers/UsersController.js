const { User } = require('../models')

module.exports = {
  async index(req, res) {
    try {
      let users = null
      const search = req.query.search
      if (search) {
        users = await User.findAll({
          where: {
            companyname: search
          }
        })
      } else {
        users = await User.findAll({
          limit: 100
        })
      }
      res.send(users)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to fetch all the User'
      })
    }
  },
  async post(req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new user'
      })
    }
  },
  async getUser(req, res) {
    try {
      const user = await User.findByPk(req.params.userId)
      if (!user) {
        return res.status(403).send({
          error: 'The user does not exist'
        })
      }
      res.send(user)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the user'
      })
    }
  },
  async put(req, res) {
    try {
      const user = await User.update(req.body, {
        where: {
          id: req.params.userId
        }
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to update the user'
      })
    }
  },
  async updateSetting(req, res) {
    try {
      const user = await User.update(req.body, {
        where: {
          id: req.params.userId
        }
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to update the user'
      })
    }
  }
}
