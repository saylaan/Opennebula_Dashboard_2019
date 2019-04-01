const {VlabUsers} = require('../models')

module.exports = {
    async getVlabUsers (req, res) {
      try {
        const vlab = await VlabUsers.findByPk(req.params.vlabId)
        if (!vlab) {
          return res.status(403).send({
            error: 'The vlab does not exist'
          })
        }
        console.log(vlab)
        res.send(vlab)
      } catch (err) {
        res.status(500).send({
          err: 'An error has occured while trying to get the Vlab'
        })
      }
    }
}