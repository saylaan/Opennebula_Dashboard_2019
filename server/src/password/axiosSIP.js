const axios = require('axios')
const https = require('https')
const {
  Url
} = require('../models')
const { exec } = require('child_process')

// module.exports = {
  const test = async function () {
    // const url = await Url.findOne({
    //   where: {
    //     urltype: sips[0].vlabname.toLowerCase()
    //   }
    // })
    let urlO2G = 'https://o2g-vlab30.ale-aapp.com/api/rest'
    axios(urlO2G, {
      httpsAgent: new https.Agent({rejectUnauthorized: false})
    }, {
      method: 'get'
    })
    .then(async response => {
      console.log('############### The connection to ' + urlO2G + 'is working..... ###############')
      if (response.data) {
        console.log(response.data)
        let basicAuth = "\"Authorization: Basic " + new Buffer('admin:' + "GEOFF").toString('base64') + "\""
        let cmdCURL = "curl -X GET -k -H " + basicAuth + 
        " -i \"https://o2g-vlab30.ale-aapp.com/api/rest/authenticate?version=1.0\" --cookie coockies.txt --cookie-jar coockies.txt";
        console.log("cmdCUrl", cmdCURL)
        console.log("Basic ", basicAuth)
        await exec(cmdCURL, async (err, stdout) => {
          if (err) {
            console.log(err)
            return
          }
          // /console.log("The authenticate to " + sips[0].vlabname.toLowerCase() + " worked....")
          console.log(stdout)
          let cmdCURL = "curl -X POST -k -H \"Content-Type: application/json\"" +
          " -i \"https://o2g-vlab30.ale-aapp.com/api/rest/1.0/sessions\" --data " + "\"{\"applicationName\":\"ChangeSIP\"}\"" + " --cookie coockies.txt --cookie-jar coockies.txt"
          console.log(cmdCURL)
          await exec(cmdCURL, async (err, stdout) => {
            if (err) {
              console.log(err)
              return
            }
            //console.log("Success connexion to the session to " + url.urltype + ".....")
            console.log(stdout)
            // await sips.forEach(async (sip) => {
            //   await exec(cmdCURL, async (err, stdout) => {
            //     // let cmdCURL = 
            //     if (err) {
            //       console.log(err)
            //       return
            //     }
            //     console.log(stdout)
            //     console.log(sip.passwd)
            //   })
            // })
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
  test()
// }

  //   if (response.data) {
      
  //   }
  //   axios.get(url + "/authenticate?version=1.0", {
  //     httpsAgent: new https.Agent({rejectUnauthorized: false}),
  //     auth: {
  //       username: 'admin',
  //       password: 'GEOFF'
  //     }
  //   })
  //   .then(response => {
  //     console.log('############### The connection with the login for authenticate worked..... ###############')
  //     console.log(response.data)
  //     axios.post(url + "/1.0/sessions", {
  //       httpsAgent: new https.Agent({rejectUnauthorized: false}),
  //     }, {
  //       method: 'post',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Set-Cookie': "AlcUserId=" + response.data.credential,
  //       },
  //       data: {
  //         "applicationName": "PBXSessions"
  //       }
  //     })
  //     .then(response => {
  //       console.log('############### The connection with the login for authenticate worked..... ###############')
  //       console.log(response.data)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  // })