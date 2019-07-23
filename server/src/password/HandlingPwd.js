const generator = require('generate-password')
const Opennebula = require('opennebula')
const one = new Opennebula('geoffroy:2961Sailaan1992!',
  'http://vlab.ale-aapp.com:2633/RPC2')
const { exec } = require('child_process')
const axios = require('axios')
const _ = require('lodash')
const axiosSIP = require('./axiosSIP')
const {
  UserOpenNebula
} = require('../models')

module.exports = {
  async pwdVNC(vnc, user) { // Opennebula change
    if (vnc.name === "Vlab Management") {
      const userons = await UserOpenNebula.findAll()
      userons.forEach(async useron => {
        if (useron.username === user.email) {
          const tmpuser = await one.getUser(useron.idopennebula)
          await tmpuser.passwd(vnc.password, (err, data) => {
            console.log("The password of vlab.ale-aapp.com has been changed", data)
          })
        }
      })
    }
  },
  async pwdO2G(o2g) { // Request O2G ADMIN CHANGE PASSWORD
    const cmdSSH = "ssh oneadmin@10.1.2.150 /var/lib/one/scripts/changeO2Gpasswd.sh "
    + o2g.urltype + " " + o2g.password
    await exec(cmdSSH, (err, stdout, stderr) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(stdout)
    })
    console.log('Change the password of : ', o2g.urltype, ' with : ', o2g.password)
  },
  async pwdSIP(sips) { // REQUEST HTTP
    await axiosSIP.changeSip(sips)
  }
}
