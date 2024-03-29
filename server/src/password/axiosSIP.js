const axios = require('axios')
const https = require('https')
const {
  Url
} = require('../models')
const { exec } = require('child_process')

module.exports = {
  async changeSip(sips) {
    const url = await Url.findOne({
      where: {
        urltype: sips[0].vlabname.toLowerCase()
      }
    })
    console.log('inside pwdSIP', url.urltype, url.password)
    let urlO2G = "https://o2g-" + sips[0].vlabname.toLowerCase() + ".ale-aapp.com"
    axios(urlO2G, {
      httpsAgent: new https.Agent({rejectUnauthorized: false})
    }, {
      method: 'get'
    })
    .then(async response => {
      console.log('############### The connection to ' + urlO2G + ' is working..... ###############')
      if (response.data) {
        console.log(response.data)
        let basicAuth = "\"Authorization: Basic " + new Buffer('admin:' + url.password).toString('base64') + "\""
        let cmdCURL = 'curl -X GET -k -H ' + basicAuth + 
        ' -i "' + urlO2G + '/api/rest/authenticate?version=1.0"' + ' --cookie coockies.txt --cookie-jar coockies.txt';
        console.log("cmdCUrl", cmdCURL)
        console.log("Basic ", basicAuth)
        await exec(cmdCURL, async (err, stdout) => {
          if (err) {
            console.log(err)
            return
          }
          console.log("The authenticate to " + sips[0].vlabname.toLowerCase() + " worked....")
          console.log(stdout)
          let cmdCURL = 'curl -X POST -k -H "Content-Type: application/json"' + ' -i "' + urlO2G + '/api/rest/1.0/sessions" --data ' + "'" + '{ "applicationName":"' + sips[0].vlabname.toLowerCase() + '"}' + "'" + ' --cookie coockies.txt --cookie-jar coockies.txt'
          console.log(cmdCURL)
          await exec(cmdCURL, async (err, stdout) => {
            if (err) {
              console.log(err)
              return
            }
            console.log("Success connexion to the session to " + url.urltype + ".....")
            console.log(stdout)
            await sips.forEach(async (sip) => {
              let cmdCURL = 'curl -X PUT -k -H "Content-Type: application/json" -i "' + urlO2G + '/api/rest/1.0/pbxs/1/instances/Subscriber/"' + sip.name + '/' + ' --data ' +
              "'" + '{ "attributes":[{"name": "SIP_Passwd","value": [ "' + sip.passwd + '" ]}]}' + "'" + ' --cookie coockies.txt --cookie-jar coockies.txt'
              await exec(cmdCURL, async (err, stdout) => {
                if (err) {
                  console.log(err)
                  return
                }
                console.log(stdout)
              })
              console.log("The SIP : " + sip.name + " has been changed!")
            })
            console.log("Change of all password SIP done.....")
          })
        })
      }
    })
    .catch(error => {
      console.log('############### The connection to ' + urlO2G + ' has failed..... ###############')
      console.log(error)
    })
  }
}


