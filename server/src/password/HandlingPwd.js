const generator = require('generate-password')
const Opennebula = require('opennebula')
const one = new Opennebula('geoffroy:2961Sailaan1992!',
  'http://vlab.ale-aapp.com:2633/RPC2')
const { exec } = require('child_process')
const request = require('request')

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
  async pwd02G(o2g) { // USE SCRIPT
    const cmdSSH = "ssh oneadmin@vlab.ale-aapp.com '/var/lib/one/scripts/changeO2Gpasswd.sh "
    + o2g.urltype.toUpperCase() + " " + o2g.password + "'"
    exec(cmdSSH, (err, stdout, stderr) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(stdout)
    })
  },
  async pwdSIP(sip) { // REQUEST HTTPS
    const urlAuthen = "https://o2g-" 
    + sip.vlabname.toUpperCase() 
    //+ ".ale-aapp.com/api/"
    + ".ale-aapp.com"
    const pathAuth = "/api/rest/authenticate?version=1.0"
    const username = "admin"
    const passwd = "none"
    
    const options = {
      url : urlAuthen,
      path: pathAuth,
      method: 'GET',
      port: 443,
      headers: {
        'Authorization': 'Basic' + new Buffer(username + ':' + passwd)
        .toString('base64')
      }
    }
    request.get(options, (err, res, html) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(res)
    })
    console.log('IMMMM HEREEEEEEEE!!!')
    console.log('IMMMM HEREEEEEEEE!!!')
    console.log(urlAuthen)
    console.log('IMMMM HEREEEEEEEE!!!')
    console.log('IMMMM HEREEEEEEEE!!!')
    console.log('IMMMM HEREEEEEEEE!!!')



    // https.get(url, (res) => {
    //   console.log('statusCode:', res.statusCode)
    //   console.log('headers:', res.headers)
      
    //   res.on('data', (d) => {
    //     process.stdout.write(d)
    //   })
    // }).on('error', (e) => {
    //   console.error(e)
    // })
    // console.log('new password sip', sip.passwd)
    // console.log('new password sip', sip.passwd)
  }
}
