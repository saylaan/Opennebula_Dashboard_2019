const { UserOpenNebula } = require('../../models')

module.exports = {
  async index(req, res) {
    try {
      let users = await UserOpenNebula.findAll({
        where: {
          groupname: users
        }
      })
      res.send(users)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to fetch all the user OpenNebula'
      })
    }
  },
  async post(req, res) {
    try {
      const user = await UserOpenNebula.create(req.body) // TODO ADD REQUEST OPENNEBULA
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new user OpenNebula'
      })
    }
  },
  async getUser(req, res) {
    try {
      const user = await UserOpenNebula.findByPk(req.params.useropennebulaId)
      if (!user) {
        return res.status(403).send({
          error: 'The user opennebula does not exist'
        })
      }
      res.send(user)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the user opennebula'
      })
    }
  },
  async put(req, res) {
    try {
      const user = await UserOpenNebula.update(req.body, {
        where: {
          id: req.params.useropennebulaId
        }
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to update the user opennebula'
      })
    }
  }
}
