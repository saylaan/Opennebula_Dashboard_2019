const { User } = require('../../models')
const Opennebula = require('opennebula')
const one = new Opennebula('vlabportal:A-hj*@qd7q',
  'http://10.1.2.150:2633/RPC2')
const crypto = require('crypto')
const generator = require('generate-password')
const nodemailer = require('nodemailer')

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
      const newUser = {
        admin: req.body.admin,
        companyname: req.body.companyname,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: "",
        purpose: req.body.purpose,
        active_hash: "",
        salt: ""
      }
      let tmppwd = await generator.generate({
        length: 8,
        numbers: true
      })
      newUser.salt = crypto.randomBytes(16).toString(`hex`)
      newUser.active_hash = crypto.pbkdf2Sync(tmppwd, newUser.salt,
        1000, 64, `sha512`).toString(`hex`)
      await User.update(newUser, {
        where: {
          id: user.id
        }
      })
      const transporter = nodemailer.createTransport({
        pool: true,
        host: "vlab.dspp.al-enterprise.com",
        port: 465,
        secure: true, // use TLS
        auth: {
          user: 'support@vlab.dspp.al-enterprise.com',
          pass: '6JQY^iN(^+7i'
        }
      })
      var message = "Greetings " + newUser.firstname + "\n" +
      "A new account has been created for you in the Developer Solution Partner Program Virtual Lab.\n" +
      "Please login to https://portal-vlab.ale-aapp.com , and use the following credentials:\n" + 
      "Login: " + newUser.email + "\n" + "Password: " + tmppwd + "\n\n\n" +
      "We hope you will enjoy your journey with us.\n" + 
      "If you need any help, please do not hesitate to contact support@vlab.dspp.al-enterprise.com\n"
      var mailOpt = {
        from: 'support@vlab.dspp.al-enterprise.com',
        to: newUser.email,
        subject: 'AAPP Program - Created Account',
        text: message
      }
      transporter.sendMail(mailOpt, function(error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
      await one.getGroups(async (err, data) => {
        data.forEach(async element => {
          if (element.NAME === "users" && !user.admin) {
            console.log(element.NAME)
            await one.createUser(user.email, tmppwd, 'core', async (err, data) => {
              console.log('The creation of the user in opennebula has been a success')
              const useron = await one.getUser(data.id)
              useron.chgrp(parseInt(element.ID, 10), (err, data) => {
                console.log('The user is set to users')
                console.log(data)
              })
            })
          } else if (element.NAME === "oneadmin" && user.admin) {
            console.log(element.NAME)
            await one.createUser(user.email, tmppwd, 'core', async (err, data) => {
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
