const Opennebula = require('opennebula')
const one = new Opennebula('geoffroy:2961Sailaan1992!',
  'http://vlab.ale-aapp.com:2633/RPC2')
const {
  sequelize,
  User, // NO CARE
  UserOpenNebula,
  UserUserOn,
  Vlab,
  VlabUser,
  Url,
  UrlUser,
  UrlVlab,
  Vm,
  VmUser,
  VmVlab,
  Sip,
  SipUser,
  SipVlab
} = require('../models')
const Promise = require('bluebird')

const checkLicence = async () => {
  console.log("CHECKING ALL LICENCES BEGAN....")
  try {
    var date = new Date()
    date = date.getTime()
    console.log(date)
    await Vlab.findAll({
      where: {
        assign: true
      }
    }).then(async (vlabs) => {
      vlabs.forEach(async vlab => {
        const endlicence = Date.parse(vlab.endlicence)
        const timelicence = endlicence - date
        const nbdays = timelicence / (1000 * 60 * 60 * 24)
        if (nbdays <= vlab.dayleft - 1) {
        // if (vlab.dayleft - 1 >= nbdays) {
          await Vlab.update({
            dayleft: vlab.dayleft - 1
          }, {
            where: {
              id: vlab.id
            }
          })
          await VlabUser.findOne({
            where: {
              VlabId: vlab.id
            }
          }).then(async vlabuser => {
            await User.findOne({
              where: {
                id: vlabuser.UserId
              }
            }).then(async user => {
              await User.update({
                dayleft: user.dayleft - 1,
                archive: true
              }, {
                where: {
                  id: user.id
                }
              })
              if (vlab.dayleft <= 0) {
                await User.update({
                  dayleft: 0,
                  assign: false,
                  startlicence: "XX-XX-XX",
                  endlicence: "XX-XX-XX"
                }, {
                  where: {
                    id: user.id
                  }
                })
                await vlabuser.destroy()
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
                        const vmon = await one.getVM(vm.idopennebula)
                        vmon.info((err, data) => {
                          if (err) {
                            console.log(err)
                          } else {
                            const temp = JSON.parse(JSON.stringify(data.VM.TEMPLATE.SNAPSHOT))
                            if (temp[1]) {
                              for (var i = 0; temp[i] !== undefined; i++) {
                                  if (temp[i].NAME === 'DEFAULT') {
                                    vmon.snapshotrevert(parseInt(temp[i].SNAPSHOT_ID, 10), (err, data) => {
                                      if (err) {
                                        console.log(err)
                                      } else {
                                        console.log('The snapshotrevert has been process')
                                        console.log(data)
                                      }
                                  })
                                }
                              }
                            } else {
                              if (temp.NAME === 'DEFAULT') {
                                vmon.snapshotrevert(parseInt(temp.SNAPSHOT_ID, 10), (err, data) => {
                                  if (err) {
                                    console.log(err)
                                  } else {
                                    console.log('The snapshotrevert has been process')
                                    console.log(data)
                                  }
                                })
                              }
                            }
                          }
                        })
                        const isvm = await VmUser.findOne({
                          where: {
                            UserId: vlabuser.UserId,
                            VmId: vm.id
                          }
                        })
                        if (isvm) {
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
                await Vlab.update({
                  idopennebula: vlab.idopennebula,
                  ownername: "oneadmin",
                  groupename: vlab.groupname,
                  name: vlab.name,
                  nameparse: vlab.nameparse,
                  vlanid: vlab.vlanid,
                  assign: false,
                  dayleft: 0,
                  startlicence: "XX-XX-XX",
                  endlicence: "XX-XX-XX"
                }, {
                  where: {
                    id: vlab.id
                  }
                })
                console.log("CHECKING ALL LICENCES HAS FINISHED....")
              }
            })
          })
        }
      })
    })
  } catch (err) {
    console.log(err)
  }
}

const getInfoVms = async () => {
  try {
    await one.getVMs(async (err, data) => {
      const jsonDataVm = JSON.parse(JSON.stringify(data))
      let vms = await Vm.findAll()
      if (vms) {
        for (let n = 0; n !== vms.length; n++) {
          let j = 0;
          let isIn = false;
          for (; j !== jsonDataVm.length; j++) {
            if (vms[n].idopennebula.toString() === jsonDataVm[j].ID) {
              isIn = true
              break;
            }
          }
          if (!isIn) {
            await VmUser.findAll({
              where: {
                VmId: vms[n].id
              }
            }).then(vmusers => {
              if (vmusers) {
                vmusers.forEach(async vmuser => {
                  if (vmuser) {
                    await vmuser.destroy()
                  }
                })
              }
            })
            await VmVlab.findAll({
              where: {
                VmId: vms[n].id
              }
            }).then(vmvlabs => {
              if (vmvlabs) {
                vmvlabs.forEach(async vmvlab => {
                  if (vmvlab) {
                    await vmvlab.destroy()
                  }
                })
              }
            })
            if (vms[n]) {
              await vms[n].destroy()
            }
          }
        }
      }
      sequelize.sync().then(async () => {
        await Promise.all(
          jsonDataVm.map(vm => {
            const isVM = vm.NAME.search('VLAB')
            if (isVM != -1) {
              let state = false;
              if (vm.STATE == 3) { // STATE == 3 => RUNNING LET
                state = true
              }
              const typeIndex = vm.NAME.indexOf('-') // Getting name of the type of device (O2G / OXE / OMS)
              const typeName = vm.NAME.substring(typeIndex + 2)
              const realName = vm.NAME.substring(0, typeIndex - 1) // Getting only name of vlab without type
              const newVm = {
                idopennebula: vm.ID,
                ownername: vm.UNAME,
                groupname: vm.GNAME,
                name: realName,
                active: state,
                type: typeName
              }
              Vm.findOne({
                where: {
                  idopennebula: newVm.idopennebula
                }
              }).then(async vm => {
                if (!vm) {
                  await Vm.create(newVm)
                }
              })
            }
          })
        )
      })
    }, null, 0, 0, null)
  } catch (err) {
    console.log(err)
  }
}

// USER != Vm BUT THEY ARE LINK
const getInfoUsers = async () => {
  try {
    await one.getUsers(async (err, data) => {
      const jsonDataUser = JSON.parse(JSON.stringify(data))
      let users = await UserOpenNebula.findAll()
      if (users) {
        for (let n = 0; n !== users.length; n++) {
          let j = 0;
          let isIn = false;
          for (; j !== jsonDataUser.length; j++) {
            if (users[n].idopennebula.toString() === jsonDataUser[j].ID) {
              isIn = true
              break;
            }
          }
          if (!isIn) {
            await UserUserOn.findOne({
              where: {
                UserOpenNebulaId: users[n].id
              }
            }).then(async useruseron => {
              if (useruseron) {
                await User.findOne({
                  where: {
                    id: useruseron.UserId
                  }
                }).then(async user => {
                  if (user) {
                    await VmUser.findAll({
                      where: {
                        UserId: user.id
                      }
                    }).then(vmusers => {
                      vmusers.forEach(async vmuser => {
                        if (vmuser) {
                          await vmuser.destroy()
                        }
                      })
                    })
                    await SipUser.findAll({
                      where: {
                        UserId: user.id
                      }
                    }).then(sipusers => {
                      sipusers.forEach(async sipuser => {
                        if (sipuser) {
                          await sipuser.destroy()
                        }
                      })
                    })
                    await UrlUser.findAll({
                      where: {
                        UserId: user.id
                      }
                    }).then(urlusers => {
                      urlusers.forEach(async urluser => {
                        if (urluser) {
                          await urluser.destroy()
                        }
                      })
                    })
                    await VlabUser.findAll({
                      where: {
                        UserId: user.id
                      }
                    }).then(vlabusers => {
                      vlabusers.forEach(async vlabuser => {
                        if (vlabuser) {
                          await vlabuser.destroy()
                        }
                      })
                    })
                  }
                })
                if (useruseron) {
                  await useruseron.destroy()
                }
              }
            })
            if (users[n]) {
              await users[n].destroy()
            }
          }
        }
      }
      sequelize.sync().then(async function () {
        await Promise.all(
          jsonDataUser.map(user => {
            const newUser = {
              idopennebula: user.ID,
              groupname: user.GNAME,
              username: user.NAME,
              password: user.PASSWORD,
              tokenpwd: user.TEMPLATE.TOKEN_PASSWORD
            }
            UserOpenNebula.findOne({
              where: {
                idopennebula: user.ID,
              }
            }).then(async user => {
              if (!user) {
                let userOn = await UserOpenNebula.create(newUser)
                let userSandbox = await User.findAll({
                  where: {
                    admin: false
                  }
                })
                if (userOn && userSandbox) {
                  for (var i = 0; i != userSandbox.length; i++) {
                    if (userSandbox[i].email === userOn.username) {
                      let useruserOn = await UserUserOn.findOne({
                        where: {
                          UserId: userSandbox[i].id,
                          UserOpenNebulaId: userOn.id
                        }
                      })
                      if (!useruserOn) {
                        await UserUserOn.create({
                          UserId: userSandbox[i].id,
                          UserOpenNebulaId: userOn.id
                        })
                      }
                    }
                  }
                }
              }
            })
          })
        )
      })
    })
  } catch (err) {
    console.log(err)
  }
}

// TODO : USER lINK TO SIP URL VLAB VM (IF ALREADY EXIST LINK TO)
const getInfoVNets = async () => {
  try {
    await one.getVNets(async (err, data) => {
      const jsonDataVnet = JSON.parse(JSON.stringify(data))
      let vlabs = await Vlab.findAll()
      if (vlabs) {
        for (let n = 0; n !== vlabs.length; n++) {
          let j = 0;
          let isIn = false;
          for (; j !== jsonDataVnet.length; j++) {
            if (vlabs[n].idopennebula.toString() === jsonDataVnet[j].ID) {
              isIn = true
              break;
            }
          }
          if (!isIn) {
            await VmVlab.findAll({ // Delete all SIP / SIPVLAB / SIPUSER
              where: {
                VlabId: vlabs[n].id
              }
            }).then(async vmvlabs =>{
              if (vmvlabs) {
                vmvlabs.forEach(async vmvlab => {
                  if (vmvlab) {
                    await VmUser.findOne({
                      where: {
                        VmId: vmvlab.VmId
                      }
                    }).then(async vmuser => {
                      if (vmuser) {
                        await vmuser.destroy()
                      }
                    })
                    const id = vmvlab.VmId
                    await vmvlab.destroy()
                    await Vm.findOne({
                      where: {
                        id: id
                      }
                    }).then(async vm => {
                      if (vm) {
                        await vm.destroy()
                      }
                    })
                  }
                })
              }
            })
            await SipVlab.findAll({ // Delete all SIP / SIPVLAB / SIPUSER
              where: {
                VlabId: vlabs[n].id
              }
            }).then(async sipvlabs =>{
              if (sipvlabs) {
                sipvlabs.forEach(async sipvlab => {
                  if (sipvlab) {
                    await SipUser.findOne({
                      where: {
                        SipId: sipvlab.SipId
                      }
                    }).then(async sipuser => {
                      if (sipuser) {
                        await sipuser.destroy()
                      }
                    })
                    const id = sipvlab.SipId
                    await sipvlab.destroy()
                    await Sip.findOne({
                      where: {
                        id: id
                      }
                    }).then(async sip => {
                      if (sip) {
                        await sip.destroy()
                      }
                    })
                  }
                })
              }
            })
            await UrlVlab.findAll({ // Delete all URL / URLVLAB / URLUSER
              where: {
                VlabId: vlabs[n].id
              }
            }).then(async urlvlabs =>{
              if (urlvlabs) {
                urlvlabs.forEach(async urlvlab => {
                  if (urlvlab) {
                    await UrlUser.findOne({
                      where: {
                        UrlId: urlvlab.UrlId
                      }
                    }).then(async urluser => {
                      if (urluser) {
                        await urluser.destroy()
                      }
                    })
                    const id = urlvlab.UrlId
                    await urlvlab.destroy()
                    await Url.findOne({
                      where: {
                        id: id
                      }
                    }).then(async url => {
                      if (url) {
                        await url.destroy()
                      }
                    })
                  }
                })
              }
            })
            if (vlabs[n]) {
              await vlabs[n].destroy()
            }
          }
        }
      }
      sequelize.sync().then(async function () {
        await Promise.all(
          jsonDataVnet.map(vlab => {
            const isVlab = vlab.NAME.search('ADMIN') // Only get VLAB
            if (isVlab < 0) {
              Vlab.findOne({
                where: {
                  idopennebula: vlab.ID
                }
              }).then(async Vlabs => {
                if (!Vlabs) {
                  const typeIndex = vlab.NAME.indexOf('-') // Getting name of the type of device (O2G / OXE / OMS)
                  await Vlab.create({
                    idopennebula: vlab.ID,
                    ownername: vlab.UNAME,
                    groupname: vlab.GNAME,
                    name: vlab.NAME,
                    nameparse: vlab.NAME.substring(0, typeIndex - 1), // Getting only name of vlab without type
                    vlanid: vlab.VLAN_ID
                  })
                }
              })
            }
          })
        )
      }).then(() => {
        Vlab.findAll()
          .then(async (vlab) => {
            let vm = await Vm.findAll()
            if (vm) {
              for (var i = 0; i != vlab.length; i++) {
                for (var j = 0; j != vm.length; j++) {
                  if (vlab[i].nameparse === vm[j].name) {
                    await VmVlab.findOne({
                      where: {
                        VlabId: vlab[i].id,
                        VmId: vm[j].id
                      }
                    }).then(async vmvlab => {
                      if (!vmvlab) {
                        await VmVlab.create({
                          VlabId: vlab[i].id,
                          VmId: vm[j].id
                        })
                      }
                    })
                  }
                }
                let tmpUrl = await Url.findOne({
                  where: {
                    vlabname: vlab[i].nameparse.toLowerCase()
                  }
                })
                if (!tmpUrl) {
                  let tmpUrlVnc = await Url.create({
                    name: "Vlab Management",
                    vlabname: vlab[i].nameparse.toLowerCase(),
                    url: "https://vlab.ale-aapp.com",
                    urltype: 'vnc',
                    log: 'default',
                    password: "default",
                    active: false
                  })
                  let tmpUrlO2g = await Url.create({
                    name: "O2G Access",
                    vlabname: 'o2g',
                    urltype: vlab[i].nameparse.toLowerCase(),
                    url: "https://o2g-" + vlab[i].nameparse.toLowerCase() + ".ale-aapp.com/",
                    log: "admin",
                    password: "default",
                    active: false
                  })
                  let urlVlab = await UrlVlab.findOne({
                    where: {
                      VlabId: vlab[i].id,
                      UrlId: tmpUrlVnc.id
                    }
                  })
                  let urlVlabBis = await UrlVlab.findOne({
                    where: {
                      VlabId: vlab[i].id,
                      UrlId: tmpUrlO2g.id
                    }
                  })
                  if (!urlVlab) {
                    await UrlVlab.create({
                      VlabId: vlab[i].id,
                      UrlId: tmpUrlVnc.id
                    })
                  }
                  if (!urlVlabBis) {
                    await UrlVlab.create({
                      VlabId: vlab[i].id,
                      UrlId: tmpUrlO2g.id
                    })
                  }
                }
                for (var k = 1; k != 6; k++) {
                  let sip = await Sip.findOne({
                    where: {
                      name: "100" + k,
                      login: "100" + k,
                      vlabname: vlab[i].nameparse
                    }
                  })
                  if (!sip) {
                    sip = await Sip.create({
                        name: "100" + k,
                        login: "100" + k,
                        passwd: "default",
                        vlabname: vlab[i].nameparse,
                        active: false,
                      })
                    }
                    let sipVlab = await SipVlab.findOne({
                      where: {
                        VlabId: vlab[i].id,
                        SipId: sip.id
                    }
                  })
                  if (!sipVlab) {
                    await SipVlab.create({
                      VlabId: vlab[i].id,
                      SipId: sip.id
                    })
                  }
                }
                let users = await User.findAll({
                  where: {
                    admin: false
                  }
                })
                for (var n = 0; n != users.length; n++) {
                  if (users[n].username === vlab[i].ownername) {
                    let vlabUser = await VlabUser.findOne({
                      where: {
                        VlabId: vlab[i].id,
                        UserId: users[n].id
                      }
                    })
                    if (!vlabUser) {
                      vlabUser = await VlabUser.create({
                        VlabId: vlab[i].id,
                        UserId: users[n].id
                      })
                      let sipvlabs = await SipVlab.findAll({
                        where: {
                          VlabId: vlab[i].id
                        }
                      })
                      sipvlabs.forEach(async sipvlab => {
                        await SipUser.create({
                          UserId: users[n].id,
                          SipId: sipvlab.SipId
                        })
                      })
                      let urlvlabs = await UrlVlab.findAll({
                        where: {
                          VlabId: vlab[i].id
                        }
                      })
                      urlvlabs.forEach(async urlvlab => {
                        await UrlUser.create({
                          UserId: users[n].id,
                          UrlId: urlvlab.UrlId
                        })
                      })
                      let vmvlabs = await VmVlab.findAll({
                        where: {
                          VlabId: vlab[i].id
                        }
                      })
                      vmvlabs.forEach(async vmvlab => {
                        await VmUser.create({
                          UserId: users[n].id,
                          VmId: vmvlab.VmId
                        })
                      })
                    }
                  }
                }
              }
            }
          })
      })
    }, null, 0, 0)
  } catch (err) {
    console.log(err)
  }
}

const getInfoHosts = async () => {
  try {
    await one.getHosts((err, data) => {
      console.log(data.length)
      const jsonDataHost = JSON.parse(JSON.stringify(data))
      console.log(jsonDataHost[1])
    })
  } catch (err) {
    console.log(err)
  }
}

const getInfoClusters = async () => {
  try {
    await one.getClusters((err, data) => {
      console.log(data.length)
      const jsonDataCluster = JSON.parse(JSON.stringify(data))
      console.log(jsonDataCluster[1])
    })
  } catch (err) {
    console.log(err)
  }
}

const getInfoGroups = async () => {
  try {
    await one.getGroups((err, data) => {
      console.log(data.length)
      const jsonDataGroup = JSON.parse(JSON.stringify(data))
      console.log(jsonDataGroup[1])
    })
  } catch (err) {
    console.log(err)
  }
}

const getInfoTemplates = async () => {
  try {
    await one.getTemplates((err, data) => {
      console.log(data.length)
      const jsonDataTemplate = JSON.parse(JSON.stringify(data))
      console.log(jsonDataTemplate[1])
    }, null, 0, 100)
  } catch (err) {
    console.log(err)
  }
}

const openneb = {
  one: one,
  checkLicence: checkLicence,
  getInfoVms: getInfoVms,
  getInfoUsers: getInfoUsers,
  getInfoVNets: getInfoVNets,
  getInfoHosts: getInfoHosts,
  getInfoClusters: getInfoClusters,
  getInfoGroups: getInfoGroups,
  getInfoTemplates: getInfoTemplates
}

module.exports = openneb

/******************* USEFULL CMD FOR OPENNEBULA API ***************/
      // const user = one.getUser(14)
      // user.info(function(err, data) {
      //   console.log(data)
      // })
