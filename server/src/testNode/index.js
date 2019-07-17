const https = require('https')
const http = require('http')

const test = async function() { // REQUEST HTTPS
  console.log('inside pwdSIP', "vlab20", "GEOFF")
  console.log("https://o2g-" + "vlab20" + ".ale-aapp.com")
  let options = {
    hostname : "o2g-" + "vlab30" + ".ale-aapp.com",
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
        let options = {
          hostname : "o2g-" + "vlab30" + ".ale-aapp.com",
          path: "/api/rest/authenticate?version=1.0",
          method: 'GET',
          port: 443,
          headers: {
            'Authorization': 'Basic ' + new Buffer('admin:' + "GEOFF").toString('base64')
          },
          rejectUnauthorized: false
        }
        console.log('Basic auth token', options.headers)
        https.get(options, (res) => {
          let body = ""
          res.on('data', (data) => {
            body += data
          })
          res.on('end', () => {
            console.log(body)
            let bodyJSON = JSON.parse(body)
            console.log("The Authentification has finished without any trouble")
            const data = JSON.stringify({
              "applicationName": "PBXSessions"
            })
            let options = {
              host: "o2g-" + "vlab30" + ".ale-aapp.com",
              path: "/api/rest/1.0/sessions",
              method: 'POST',
              port: 443,
              headers: {
                'Authorization': 'Basic ' + new Buffer('admin:' + "GEOFF").toString('base64'),
                'Content-Type': 'application/json',
                'Set-Cookie': "AlcUserId=" + bodyJSON.credential
              },
              body: data,
              rejectUnauthorized: false
            }
            console.log(options)
            https.get(options, (res) => {
              let body = ""
              res.on('data', (data) => {
                body += data
              })
              res.on('end', () => {
                console.log('Success connection to the session')
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
    }
    res.on('error', (e) => {
      console.log('error: ', e.message)
    })
  })
  })
}

test();
