const generator = require('generate-password')
const Opennebula = require('opennebula')
const one = new Opennebula('geoffroy:2961Sailaan1992!',
  'http://vlab.ale-aapp.com:2633/RPC2')
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
      host : "o2g-" + sips[0].vlabname.toLowerCase() + ".ale-aapp.com",
      path: "/api/rest",
      method: 'GET',
      port: 443,
      rejectUnauthorized: false
    }
    https.get(options, (res) => {
      let body = ""
      res.on('data', (data) => {
        body += data
      })
      res.on('end', () => {
        if (body) {
          console.log(body)
          console.log('Got answer from o2g ', url.urltype, url.password)
          console.log("https://o2g-" + sips[0].vlabname.toLowerCase() + ".ale-aapp.com")
          let options = {
            host : "o2g-" + sips[0].vlabname.toLowerCase() + ".ale-aapp.com",
            path: "/api/rest/authenticate?version=1.0",
            method: 'GET',
            port: 443,
            headers: {
              'Authorization': 'Basic ' + new Buffer('admin:' + url.password).toString('base64')
            },
            rejectUnauthorized: false
          }
          console.log('Basic auth token', options.headers)
          https.get(options, (res) => {
            console.log("https://o2g-" + sips[0].vlabname.toLowerCase() + ".ale-aapp.com")
            let body = ""
            res.on('data', (data) => {
              body += data
            })
            res.on('end', () => {
              console.log(body)
              const bodyArray = body.split(" ")
              let cookie = bodyArray[4]
              cookie = cookie.substr(1, cookie.length - 4)
              console.log('cookie', cookie)
              console.log("The Authentification has finished without any trouble")
              const session = {
                applicationName: 'ChangeSIP'
              }
              let options = {
                host: "o2g-" + sips[0].vlabname.toLowerCase() + ".ale-aapp.com",
                path: "/api/rest/1.0/sessions",
                method: 'POST',
                port: 443,
                headers : {
                  'content': JSON.stringify(session),
                  'Content-Type': 'application/json',
                  'Cookie': 'AlcUserId=' + cookie
                },
                rejectUnauthorized: false
              }
              https.get(options, (res) => {
                console.log("https://o2g-" + sips[0].vlabname.toLowerCase() + ".ale-aapp.com")
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
            res.on('error', (e) => {
              console.log('error: ', e.message)
            })
          })
        })
      }//0388482405
      res.on('error', (e) => {
        console.log('error: ', e.message)
      })
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
