const {
  User,
  VlabUser,
  Vlab,
  Vm,
  VmVlab,
  VmUser,
  Sip,
  SipVlab,
  SipUser,
  Url,
  UrlVlab,
  UrlUser
} = require('../../models')
const _ = require('lodash')
const handlingPwd = require('../../password/HandlingPwd')
const generator = require('generate-password')
const Opennebula = require('opennebula')
const one = new Opennebula('geoffroy:2961Sailaan1992!',
  'http://10.1.2.150:2633/RPC2')

module.exports = {
  async index(req, res) {
    try {
      const UserId = req.user.id
      const { VlabId } = req.query
      const where = {
        UserId: UserId
      }
      if (VlabId) {
        where.VlabId = VlabId
      }
      const vlabusers = await VlabUser.findAll({
        where: where,
        include: [
          {
            model: Vlab
          }
        ]
      })
        .map(vlabuser => vlabuser.toJSON())
        .map(vlabuser => _.extend(
          {},
          vlabuser.Vlab,
          vlabuser
        ))
      res.send(vlabusers)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the Vlab User'
      })
    }
  },
  async getVlabUser(req, res) {
    try {
      const vlabuser = await VlabUser.findOne({
        where: {
          VlabId: req.params.vlabId
        }
      })
      if (!vlabuser) {
        return res.status(403).send({
          error: 'The vlabuser does not exist'
        })
      }
      res.send(vlabuser)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the vlabuser'
      })
    }
  },
  async post(req, res) { // GENERATE PASSWORD - DO REQUEST OPENNEBULA / O2G - ASSIGN VLAB
    try {
      const { UserId } = req.body
      const { VlabId } = req.body
      const vlabuser = await VlabUser.findOne({
        where: {
          VlabId: VlabId,
          UserId: UserId
        }
      })
      if (vlabuser) {
        return res.status(400).send({
          error: 'this user already have a this vlab'
        })
      }
      const newVlabUser = await VlabUser.create({
        VlabId: VlabId,
        UserId: UserId
      })
      await VmVlab.findAll({ // FOR THE VM ASSIGN
        where: {
          VlabId: VlabId
        }
      }).then(async (vmvlabs) => {
        vmvlabs.forEach(async (vmvlab) => {
          await Vm.findAll({
            where: {
              id: vmvlab.VmId
            }
          }).then(async (vms) => {
            vms.forEach(async (vm) => {
              const isvm = await VmUser.findOne({
                where: {
                  UserId: UserId,
                  VmId: vm.id
                }
              })
              if (!isvm) {
                await VmUser.create({
                  UserId: UserId,
                  VmId: vm.id
                })
              }
            })
          })
        })
      })
      await UrlVlab.findAll({ // FOR THE URL ASSIGN
        where: {
          VlabId: VlabId
        }
      }).then(async (urlvlabs) => {
        urlvlabs.forEach(async (urlvlab) => {
          await Url.findAll({
            where: {
              id: urlvlab.UrlId
            }
          }).then(async (urls) => {
            urls.forEach(async (url) => {
              const newUrl = {
                name: url.name,
                log: url.log,
                urltype: url.urltype,
                password: "default",
                vlabname: url.vlabname,
                active: url.active
              }
              if (url.name === "Vlab Management") {
                newUrl.password = await generator.generate({
                  length: 8,
                  numbers: true
                })
                const usertmp = await User.findByPk(UserId)
                newUrl.log = usertmp.email
                await handlingPwd.pwdVNC(newUrl, usertmp) // CHANGE VNC
              } else if (url.name === "O2G Access") {
                newUrl.password = await generator.generate({
                  length: 6,
                  numbers: true
                })
                await handlingPwd.pwdO2G(newUrl) // CCHANGE O2G
              }
              await Url.update(newUrl, {
                where: {
                  id: url.id
                }
              })
              const isurl = await UrlUser.findOne({
                where: {
                  UserId: UserId,
                  urlId: url.id
                }
              })
              if (!isurl) {
                await UrlUser.create({
                  UserId: UserId,
                  UrlId: url.id
                })
              }
            })
          })
        })
      })
      await SipVlab.findAll({ // FOR THE SIP ASSIGN
        where: {
          VlabId: VlabId
        }
      }).then(async (sipvlabs) => {
        sipvlabs.forEach(async (sipvlab) => {
          await Sip.findAll({
            where: {
              id: sipvlab.SipId
            }
          }).then(async (sips) => {
            sips.forEach(async (sip) => {
              const newSip = {
                name: sip.name,
                login: sip.login,
                passwd: generator.generate({
                  length: 4,
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
              const issip = await SipUser.findOne({
                where: {
                  UserId: UserId,
                  sipId: sip.id
                }
              })
              if (!issip) {
                await SipUser.create({
                  UserId: UserId,
                  SipId: sip.id
                })
              }
            })
          })
        })
      })
      setTimeout(async () => {
        await SipVlab.findAll({
          where: {
            vlabId: VlabId
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
      }, 110000)
      res.send(newVlabUser)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to create the Vlab User'
      })
    }
  },
  async delete(req, res) { // DEASSIGN VLAB AND RESTORE SNAPSHOT
    try {
      const { vlabuserId } = req.params
      const vlabuser = await VlabUser.findOne({
        where: {
          id: vlabuserId
        }
      })
      if (!vlabuser) {
        return res.status(403).send({
          error: 'you do not have access to this vlabuser'
        })
      }
      await VmVlab.findAll({ // FOR THE VM DEASSIGN
        where: {
          VlabId: vlabuser.VlabId
        }
      }).then(async (vmvlabs) => {
        vmvlabs.forEach(async (vmvlab) => {
          await Vm.findAll({
            where: {
              id: vmvlab.VmId
            }
          }).then(async (vms) => {
            vms.forEach(async (vm) => {
              const isvm = await VmUser.findOne({
                where: {
                  UserId: vlabuser.UserId,
                  VmId: vm.id
                }
              })
              if (isvm) {
                const vmon = await one.getVM(vm.idopennebula)
                vmon.info((err, data) => {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log(data.VM.TEMPLATE.SNAPSHOT)
                    if (data.VM.TEMPLATE.SNAPSHOT.NAME === 'DEFAULT') {
                      vmon.snapshotrevert(parseInt(data.VM.TEMPLATE.SNAPSHOT.SNAPSHOT_ID, 10), (err, data) => {
                        if (err) {
                          console.log(err)
                        } else {
                          console.log('The snapshotrevert has been process')
                          console.log(data)
                        }
                    })
                  }
                }
              })
              await isvm.destroy()
              }
            })
          })
        })
      })
      await SipVlab.findAll({ // FOR THE SIP DEASSIGN
        where: {
          VlabId: vlabuser.VlabId
        }
      }).then(async (sipvlabs) => {
        sipvlabs.forEach(async (sipvlab) => {
          await Sip.findAll({
            where: {
              id: sipvlab.SipId
            }
          }).then(async (sips) => {
            sips.forEach(async (sip) => {
              const newSip = {
                name: sip.name,
                login: sip.login,
                passwd: "default",
                vlabname: sip.vlabname,
                active: sip.active
              }
              await Sip.update(newSip, {
                where: {
                  id: sip.id
                }
              })
              const issip = await SipUser.findOne({
                where: {
                  UserId: vlabuser.UserId,
                  sipId: sip.id
                }
              })
              if (issip) {
                await issip.destroy()
              }
            })
          })
        })
      })
      await UrlVlab.findAll({ // FOR THE URL DEASSIGN
        where: {
          VlabId: vlabuser.VlabId
        }
      }).then(async (urlvlabs) => {
        urlvlabs.forEach(async (urlvlab) => {
          await Url.findAll({
            where: {
              id: urlvlab.UrlId
            }
          }).then(async (urls) => {
            urls.forEach(async (url) => {
              const newUrl = {
                name: url.name,
                log: url.log,
                urltype: url.urltype,
                password: "default",
                vlabname: url.vlabname,
                active: url.active
              }
              await Url.update(newUrl, {
                where: {
                  id: url.id
                }
              })
              const isurl = await UrlUser.findOne({
                where: {
                  UserId: vlabuser.UserId,
                  urlId: url.id
                }
              })
              if (isurl) {
                await isurl.destroy()
              }
            })
          })
        })
      })
      await vlabuser.destroy()
      res.send(vlabuser)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to delete the Vlab User'
      })
    }
  }
}
