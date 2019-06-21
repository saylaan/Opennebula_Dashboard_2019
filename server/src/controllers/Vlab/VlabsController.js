const { Vlab,
  UserOpenNebula } = require('../../models')
const openneb = require('../../opennebula/openneb')

module.exports = {
  async getAllVlabs(req, res) {
    try {
      let vlabs = null
      const search = req.query.search
      if (search) {
        vlabs = await Vlab.findAll({
          where: {
            title: search 
            // TODO : FIX ME FOR MULTIPLE RESEARCH IN NODEJS
            // $or: [
            //   'title', 'name', 'time', 'vlabImage'
            // ]: search
            // .map(key => ({
            //   [key]: search
            //   // {
            //   //   $like: `%${search}%`
            //   // }
            // }))
          }
        })
      } else {
        vlabs = await Vlab.findAll({
          limit: 100
        })
      }
      res.send(vlabs)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to fetch all the Vlab'
      })
    }
  },
  async post(req, res) {
    try {
      const vlab = await Vlab.create(req.body)
      res.send(vlab)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new Vlab'
      })
    }
  },
  async getVlab(req, res) {
    try {
      const vlab = await Vlab.findByPk(req.params.vlabId)
      if (!vlab) {
        return res.status(403).send({
          error: 'The vlab does not exist'
        })
      }
      res.send(vlab)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the Vlab'
      })
    }
  },
  async put(req, res) {
    try {
      const vlab = await Vlab.update(req.body, {
        where: {
          id: req.params.vlabId
        }
      })
      const UserOn = await UserOpenNebula.findAll();
      const vnet = await openneb.one.getVNet(req.body.idopennebula)
      UserOn.forEach(async useron => {
        if (useron.username === req.body.ownername) {
          console.log('Is EXISTING IN DB')
          await vnet.chown(useron.idopennebula, (err, data) => {
            console.log("Changing user on opennebula done")
          })
        }
      })
      res.send(vlab)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to update the vlab'
      })
    }
  }
}
