const {
  Sip,
  SipUser
} = require('../../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const UserId = req.user.id
      const sipsUser = await SipUser.findAll({
        where: {
          UserId: UserId
        },
        include: [
          {
            model: Sip
          }
        ]
      })
        .map(sipUser => sipUser.toJSON())
        .map(sipUser => _.extend(
          {},
          sipUser.Sip,
          sipUser
        ))
      res.send(_.uniqBy(sipsUser, sipUser => sipUser.SipId))
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the sip User'
      })
    }
  },
  async post(req, res) {
    try {
      const UserId = req.user.id
      const { SipId } = req.body
      const sipUser = await SipUser.create({
        SipId: SipId,
        UserId: UserId
      })
      res.send(sipUser)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to create the sip for the user'
      })
    }
  },
  async delete(req, res) {
    try {
      const UserId = req.user.id
      const { sipUserId } = req.params

      const sipUser = await SipUser.findOne({
        where: {
          id: sipUserId,
          UserId: UserId
        }
      })
      if (!sipUser) {
        return res.status(403).send({
          error: 'you do nat have acces to this sipUser'
        })
      }
      await sipUser.destroy()
      res.send(sipUser)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to delete the sip user'
      })
    }
  }
}