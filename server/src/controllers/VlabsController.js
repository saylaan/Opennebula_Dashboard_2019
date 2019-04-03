const {Vlab} = require('../models')

// async getAllVlabs (req, res) { // for searching all Vlabs
//   try {
//     const vlabs = await Vlab.findAll({
//         limit: 100
//     })
//     res.send(vlabs)
//   } catch (err) {
//     res.status(500).send({
//       err: 'An error has occured while trying to fetch all the Vlab'
//     })
//   }
// }

module.exports = {
    async getAllVlabs (req, res) {
      try {
        let vlabs = null
        const search = req.query.search
        if (search) {
          vlabs = await Vlab.findAll({
            where: {
              $or: [
                'title', 'name', 'time', 'vlabImage'
              ].map(key => ({
                [key]: {
                  $like: `%${search}%`
                }
              }))
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
          err: 'An error has occured while trying to get the Vlab'
        })
      }
    },
    async put (req, res) {
      try {
        const vlab = await Vlab.update(req.body, {
          where : {
            id: req.params.vlabId
          }
        })
        res.send(vlab)
      } catch (err) {
        res.status(500).send({
          err: 'An error has occured while trying to update the vlab'
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
