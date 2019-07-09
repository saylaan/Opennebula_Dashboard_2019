const generator = require('generate-password')
const Opennebula = require('opennebula')
const one = new Opennebula('geoffroy:2961Sailaan1992!',
  'http://10.1.2.150:2633/RPC2')
const { exec } = require('child_process')
const request = require('request')
const https = require('https')
const {
  Url,
  Sip,
  UserOpenNebula
} = require('../models')
const http = require('http')
const _ = require('lodash')

module.exports = {
  async pwdVNC(vnc) { // Opennebula change
    if (vnc.name === "VNC Access") {
      const userons = await UserOpenNebula.findAll()
      userons.forEach(async useron => {
        if (useron.username === vnc.vlabname) {
          const tmpuser = await one.getUser(useron.idopennebula)
          await tmpuser.passwd(vnc.password, (err, data) => {
            console.log(data)
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
    console.log(o2g.urltype, o2g.password)
  },
  async pwdSIP(sip) { // REQUEST HTTPS
    const url = await Url.findOne({
      where: {
        urltype: sip.vlabname.toLowerCase()
      }
    })
    console.log('inside pwdSIP', url.urltype, url.password)
    http.get({
      host : "o2g-" + sip.vlabname.toLowerCase() + ".ale-aapp.com",
      path: "/api/rest/authenticate?version=1.0",
      method: 'GET',
      port: 80,
      headers: {
        'Authorization': 'Basic' + new Buffer("admin" + ':' + url.passwd)
        .toString('base64')
      }
    }, (res) => {
      console.log('IMMMM HEREEEEEEEE!!!')
      console.log("o2g-" + sip.vlabname.toLowerCase() + ".ale-aapp.com")
      let body = ""
      res.on('data', (data) => {
        body += data
      })
      res.on('end', () => {
        console.log(body)
        console.log("The timeout has finished without any trouble")
      })
      res.on('error', (e) => {
        console.log('error: ', e.message)
      })
    })
  }
}
