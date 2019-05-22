const {
  Sip,
  SipVlab
} = require('../../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const VlabId = req.query.VlabId
      const sipsVlab = await SipVlab.findAll({
        where: {
          VlabId: VlabId
        },
        include: [
          {
            model: Sip
          }
        ]
      })
        .map(sipVlab => sipVlab.toJSON())
        .map(sipVlab => _.extend(
          {},
          sipVlab.Sip,
          sipVlab
        ))
      res.send(_.uniqBy(sipsVlab, sipVlab => sipVlab.SipId))
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the Sip User'
      })
    }
  },
  async post(req, res) {
    try {
      const { VlabId, UrlId } = req.body
      const urlVlab = await SipVlab.create({
        UrlId: UrlId,
        VlabId: VlabId
      })
      res.send(urlVlab)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to create the sip for the user'
      })
    }
  },
  async delete(req, res) {
    try {
      const { urlVlabId } = req.params
      const urlVlab = await SipVlab.findOne({
        where: {
          id: urlVlabId
        }
      })
      if (!urlVlab) {
        return res.status(403).send({
          error: 'you do not have access to this sipvlab'
        })
      }
      await sipVlab.destroy()
      res.send(urlvlab)
    } catch (err) {
      res.status(500).send({
        err: 'An erro has occured while trying to delte the sip of the vlab'
      })
    }
  }
}