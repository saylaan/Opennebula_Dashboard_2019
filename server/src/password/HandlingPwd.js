const generator = require('generate-password')
const Opennebula = require('opennebula')
const one = new Opennebula('geoffroy:2961Sailaan1992!',
  'http://10.1.2.150:2633/RPC2')
const { exec } = require('child_process')
const request = require('request')
const https = require('https')
const http = require('http')
const _ = require('lodash')
const {
  Url,
  Sip,
  UserOpenNebula
} = require('../models')

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
  async pwdSIP(sips) { // REQUEST HTTPS
    console.log(sips)

    const url = await Url.findOne({
      where: {
        urltype: sips[0].vlabname.toLowerCase()
      }
    })
    console.log('inside pwdSIP', url.urltype, url.password)
    console.log("https://o2g-" + sips[0].vlabname.toLowerCase() + ".ale-aapp.com")
    let options = {
      hostname : "o2g-" + sips[0].vlabname.toLowerCase() + ".ale-aapp.com",
      path: "/api/rest",
      method: 'GET',
      port: 443,
      rejectUnauthorized: false
    }
    await https.request(options, (res) => {
      let body = ""
      res.on('data', (data) => {
        body += data
      })
      res.on('end', async () => {
        if (body) {
          console.log(body)
          console.log('Trying to authenticate to the server O2G....')
          console.log('inside pwdSIP', url.urltype, url.password)
          console.log("https://o2g-" + sips[0].vlabname.toLowerCase() + ".ale-aapp.com")
          options = {
            hostname : "o2g-" + sips[0].vlabname.toLowerCase() + ".ale-aapp.com",
            path: "/api/rest/authenticate?version=1.0",
            method: 'GET',
            port: 443,
            headers: {
              'Authorization': 'Basic' + new Buffer("admin" + ':' + url.password)
              .toString('base64')
            },
            rejectUnauthorized: false
          }
          console.log(headers)
          // await https.request(options, (res) => {
          //   console.log("https://o2g-" + sips[0].vlabname.toLowerCase() + ".ale-aapp.com")
          //   let body = ""
          //   res.on('data', (data) => {
          //     body += data
          //   })
          //   res.on('end', () => {
          //     console.log(body)
          //     console.log("The timeout has finished without any trouble")
          //   })
          //   res.on('error', (e) => {
          //     console.log('error: ', e.message)
          //   })
          // })
        }
      })
      res.on('error', (e) => {
        console.log('error: ', e.message)
      })
    })
    
  }
}

                // setTimeout(async () => {
                //   let sips = await Sip.findAll()
                //   sips.forEach(async (sip) => {
                //     await handlingPwd.pwdSIP(sip)
                //   })
                // }, 120000)
                // HERE MAYBE ? TEST
