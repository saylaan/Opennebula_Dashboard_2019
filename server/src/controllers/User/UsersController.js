const { User } = require('../../models')
const Opennebula = require('opennebula')
const one = new Opennebula('geoffroy:2961Sailaan1992!',
  'http://10.1.2.150:2633/RPC2')
const date = require('date-and-time')

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
      await one.getGroups(async (err, data) => {
        data.forEach(async element => {
          if (element.NAME === "users" && !user.admin) {
            console.log(element.NAME)
            await one.createUser(user.email, user.password, 'core', async (err, data) => {
              console.log('The creation of the user in opennebula has been a success')
              const useron = await one.getUser(data.id)
              useron.chgrp(parseInt(element.ID, 10), (err, data) => {
                console.log('The user is set to users')
                console.log(data)
              })
            })
          } else if (element.NAME === "oneadmin" && user.admin) {
            console.log(element.NAME)
            await one.createUser(user.email, user.password, 'core', async (err, data) => {
              console.log('The creation of the user in opennebula has been a success')
              const useron = await one.getUser(data.id)
              useron.chgrp(parseInt(element.ID, 10), (err, data) => {
                console.log('The user is set to oneadmin')
                console.log(data)
              })
            })
          }
        })
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new user'
      })
    }
  },
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.userId)
      if (!user) {
        return res.status(403).send({
          error: 'The user does not exist'
        })
      }
      await one.getUsers((err, data) => {
        data.forEach(async element => {
          if (user.email === element.NAME) {
            const userdel = await one.getUser(parseInt(element.ID, 10))
            await userdel.delete(async (err, data) => {
              console.log(data)
            })
            await user.destroy()
          }
        })
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to delete the user'
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
      if (req.body.dayleft >= 0) {
        var date = new Date()
        var endlicence = date.getTime()
        var datestart = new Date(endlicence)
        var months = datestart.getMonth() + 1
        if (parseInt(months, 10) < 10) {
          months = "0" + months
        }
        var days = datestart.getDate()
        if (parseInt(days, 10) < 10) {
          days = "0" + days
        }
        var startlicence = datestart.getFullYear() + "-" + months + "-" + days
        var day = parseInt(req.body.dayleft, 10) * 24 * 60 * 60 * 1000
        endlicence = endlicence + day
        var newdate = new Date(endlicence)
        months = newdate.getMonth() + 1
        if (parseInt(months, 10) < 10) {
          months = "0" + months
        }
        days = newdate.getDate()
        if (parseInt(days, 10) < 10) {
          days = "0" + days
        }
        endlicence = newdate.getFullYear() + "-" + months + "-" + days
        req.body.startlicence = startlicence
        req.body.endlicence = endlicence
      } else {
        req.body.startlicence = "XX/XX/XX"
        req.body.endlicence = "XX/XX/XX"
      }
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
        err: 'An error has occured while trying to update the setting of user'
      })
    }
  }
}
