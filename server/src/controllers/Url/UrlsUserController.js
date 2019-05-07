const {
  Url,
  UrlUser
} = require('../../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const UserId = req.user.id
      const urlsUser = await UrlUser.findAll({
        where: {
          UserId: UserId
        },
        include: [
          {
            model: Url
          }
        ]
      })
        .map(urlUser => urlUser.toJSON())
        .map(urlUser => _.extend(
          {},
          urlUser.Url,
          urlUser
        ))
      res.send(_.uniqBy(urlsUser, urlUser => urlUser.UrlId))
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the Url User'
      })
    }
  },
  async post(req, res) {
    try {
      const UserId = req.user.id
      const { UrlId } = req.body
      const urlUser = await UrlUser.create({
        UrlId: UrlId,
        UserId: UserId
      })
      res.send(urlUser)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to create the url for the user'
      })
    }
  },
  async delete(req, res) {
    try {
      const UserId = req.user.id
      const { urlUserId } = req.params

      const urluser = await UrlUser.findOne({
        where: {
          id: urlUserId,
          UserId: UserId
        }
      })
      if (!urlUser) {
        return res.status(403).send({
          error: 'you do nat have acces to this urluser'
        })
      }
      await urluser.destroy()
      res.send(urluser)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to delete the url user'
      })
    }
  }
}