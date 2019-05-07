const {
  Url,
  UrlVlab
} = require('../../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const VlabId = req.query.VlabId
      const urlsVlab = await UrlVlab.findAll({
        where: {
          VlabId: VlabId
        },
        include: [
          {
            model: Url
          }
        ]
      })
        .map(urlVlab => urlVlab.toJSON())
        .map(urlVlab => _.extend(
          {},
          urlVlab.Url,
          urlVlab
        ))
      res.send(_.uniqBy(urlsVlab, urlVlab => urlVlab.UrlId))
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the Url User'
      })
    }
  },
  async post(req, res) {
    try {
      const { VlabId, UrlId } = req.body
      const urlVlab = await UrlVlab.create({
        UrlId: UrlId,
        VlabId: VlabId
      })
      res.send(urlVlab)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to create the url for the user'
      })
    }
  },
  async delete(req, res) {
    try {
      const { urlVlabId } = req.params

      const urlvlab = await UrlVlab.findOne({
        where: {
          id: urlVlabId
        }
      })
      if (!urlvlab) {
        return res.status(403).send({
          error: 'you do not have access to this urlvlab'
        })
      }
      await urlvlab.destroy()
      res.send(urlvlab)
    } catch (err) {
      res.status(500).send({
        err: 'An erro has occured while trying to delte the url of the vlab'
      })
    }
  }
}