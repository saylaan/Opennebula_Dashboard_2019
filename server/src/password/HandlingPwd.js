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
  async pwd02GSIP(o2g, sip) { // REQUEST HTTPS
    const cmdSSH = "ssh oneadmin@10.1.2.150 /var/lib/one/scripts/changeO2Gpasswd.sh "
    + o2g.urltype + " " + o2g.password
    await exec(cmdSSH, (err, stdout, stderr) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(stdout)
    })
    const url = await Url.findOne({
      where: {
        urltype: sip.vlabname.toLowerCase()
      }
    })
    console.log(sip.vlabname, url.password)
    console.log(sip.vlabname, url.password)
    console.log(sip.vlabname, url.password)
    console.log(sip.vlabname, url.password)
    console.log(sip.vlabname, url.password)
    console.log(sip.vlabname, url.password)
    let urlAuthen = "o2g-" + sip.vlabname.toLowerCase() + ".ale-aapp.com"
    let pathAuth = "/api/rest/authenticate?version=1.0"
    let username = "admin"
    let passwd = url.password
    await http.get({
      host : urlAuthen,
      path: pathAuth,
      method: 'GET',
      port: 80,
      headers: {
        'Authorization': 'Basic' + new Buffer(username + ':' + passwd)
        .toString('base64')
      }
    }, (res) => {
      let body = ""
      res.on('data', (data) => {
     	body += data
      })
      res.on('end', () => {
	      console.log(body)
      })
      res.on('error', (e) => {
        console.log('error: ', e.message)
      })
    })
    console.log('IMMMM HEREEEEEEEE!!!')
    console.log('IMMMM HEREEEEEEEE!!!')
    console.log(urlAuthen)
    console.log('IMMMM HEREEEEEEEE!!!')
    console.log('IMMMM HEREEEEEEEE!!!')
    console.log('IMMMM HEREEEEEEEE!!!')
  }
}
