const { Url, User, UrlUser } = require('../../models')
const generator = require('generate-password')
const handlingPwd = require('../../password/HandlingPwd')

module.exports = {
  async index(req, res) {
    try {
      urls = await Url.findAll({
        limit: 100
      })
      res.send(urls)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to fetch all the url'
      })
    }
  },
  async getUrl(req, res) {
    try {
      const url = await Url.findByPk(req.params.urlId)
      if (!url) {
        return res.status(403).send({
          error: 'The url does not exit'
        })
      }
      res.send(url)
    } catch (err) {
      res.status(500).send({
        error: 'An erro has occured while trying to get the url'
      })
    }
  },
  async put(req, res) {
    try {
      const url = await Url.update(req.body, {
        where: {
          id: req.params.urlId
        }
      })
      res.send(url)
    } catch (err) {
      res.status(500).send({
        error: 'An erro has occured while trying to update the url'
      })
    }
  },
  async changePwd(req, res) {
    try {
      let url = await Url.findByPk(req.params.urlId)
      let newUrl = {
        id: url.id,
        name: url.name,
        log: 'admin',
        urltype: url.urltype,
        password: "default",
        vlabname: url.vlabname,
        active: url.active
      }
      if (url.name === "Vlab Management") {
        const urlUser = await UrlUser.findOne({
          where: {
            UrlId: req.params.urlId
          }
        })
        if (urlUser) {
          newUrl.password = await generator.generate({
            length: 8,
            numbers: true
          })
          const usertmp = await User.findByPk(urlUser.UserId)
          newUrl.log = usertmp.email
          await handlingPwd.pwdVNC(newUrl, usertmp)
        }
      }  else if (url.name === "O2G Access") {
        newUrl.password = await generator.generate({
          length: 8,
          numbers: true
        })
        await handlingPwd.pwdO2G(newUrl) // CCHANGE O2G
      }
      url = await Url.update(newUrl, {
        where: {
          id: req.params.urlId
        }
      })
      res.send(newUrl)
    } catch (err) {
      res.status(500).send({
        error: 'An erro has occured while trying to update the sip'
      })
    }
  },
  async delete(req, res) {
    try {
      const url = await Url.findByPk(req.params.urlId)
      if (!url) {
        return res.status(403).send({
          error: 'The url does not exit'
        })
      }
      await url.destroy()
      res.send(url)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to delete the url'
      })
    }
  },
  async post(req, res) {
    try {
      const url = await Url.create(req.body)
      res.send(url)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new url'
      })
    }
  }
}
