const { Sip, SipVlab } = require('../../models')
const handlingPwd = require('../../password/HandlingPwd')
const generator = require('generate-password')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      sips = await Sip.findAll({
        limit: 100
      })
      res.send(sips)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to fetch all the sip'
      })
    }
  },
  async getSip(req, res) {
    try {
      const sip = await Sip.findByPk(req.params.sipId)
      if (!sip) {
        return res.status(403).send({
          error: 'The sip does not exit'
        })
      }
      res.send(sip)
    } catch (err) {
      res.status(500).send({
        error: 'An erro has occured while trying to get the sip'
      })
    }
  },
  async put(req, res) {
    try {
      const sip = await Sip.update(req.body, {
        where: {
          id: req.params.sipId
        }
      })
      res.send(sip)
    } catch (err) {
      res.status(500).send({
        error: 'An erro has occured while trying to update the sip'
      })
    }
  },
  async changePwd(req, res) {
    try {
      req.body.forEach(async sip => {
        const newSip = {
          name: sip.name,
          login: sip.login,
          passwd: generator.generate({
            length: 8,
            numbers: true
          }),
          vlabname: sip.vlabname,
          active: sip.active
        }
        await Sip.update(newSip, {
          where: {
            id: sip.id
          }
        })
      })
      sipVlab = await SipVlab.findOne({
        where: {
          SipId: req.body[0].id
        }
      })
      let tmpsips = await SipVlab.findAll({
        where: {
          vlabId: sipVlab.VlabId
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
      )).then(async (sips) => {
        await handlingPwd.pwdSIP(sips)
      })
      res.send(tmpsips)
    } catch (err) {
      res.status(500).send({
        error: 'An erro has occured while trying to update the sip'
      })
    }
  },
  async delete(req, res) {
    try {
      const sip = await Sip.findByPk(req.params.sipId)
      if (!sip) {
        return res.status(403).send({
          error: 'The sip does not exit'
        })
      }
      await sip.destroy()
      res.send(sip)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to delete the sip'
      })
    }
  },
  async post(req, res) {
    try {
      const sip = await Sip.create(req.body)
      res.send(sip)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new sip'
      })
    }
  }
}
