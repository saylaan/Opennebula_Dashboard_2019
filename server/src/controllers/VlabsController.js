const {Vlab} = require('../models')
const config = require('../config/config')

module.exports = {
    async getAllVlabs (req, res) {
      try {
        const vlabs = await Vlab.findAll({
            limit: 100
        })
        res.send(vlabs)
      } catch (err) {
        res.status(500).send({
          err: 'An error has occured while trying to fetch all the Vlab'
        })
      }
    },
    async post (req, res) {
      try {
        const vlab = await Vlab.create(req.body)
        res.send(vlab)
      } catch (err) {
        res.status(500).send({
          error: 'An error has occured while trying to create a new Vlab'
        })
      }
    },
    async getVlab (req, res) {
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
          err: 'An error has occured while trying to get a Vlab'
        })
      }
    }
    /* only for testing the response on Postman */
    //register (req, res) { // express endpoint / middleware
    // res.send({
      //   message : `Hello ${req.body.email}! Your user was registered! Have fun!`
      // })
    //}
}
