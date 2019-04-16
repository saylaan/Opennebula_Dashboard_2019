const {
  Vlab,
  VlabUserLog
} = require('../../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const UserId = req.user.id
      const vlabuserlogs = await VlabUserLog.findAll({
        where: {
          UserId: UserId
        },
        include: [
          {
            model: Vlab
          }
        ]
      })
        .map(vlabuserlog => vlabuserlog.toJSON())
        .map(vlabuserlog => _.extend(
          {},
          vlabuserlog.Vlab,
          vlabuserlog
        ))
      res.send(_.uniqBy(vlabuserlogs, vlabuserlog => vlabuserlog.VlabId))
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the Vlab User'
      })
    }
  },
  async post(req, res) {
    try {
      const UserId = req.user.id
      const { VlabId } = req.body
      const vlabuserlog = await VlabUserLog.create({
        VlabId: VlabId,
        UserId: UserId
      })
      res.send(vlabuserlog)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to create the log for the user'
      })
    }
  }
}