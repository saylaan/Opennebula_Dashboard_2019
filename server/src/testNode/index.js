const https = require('https')

const test = async function() { // REQUEST HTTPS
  console.log('inside pwdSIP', "vlab20", "geoff")
  console.log("https://o2g-" + "vlab20" + ".ale-aapp.com")
  let options = {
    host : "o2g-" + "vlab20" + ".ale-aapp.com",
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
        console.log('Got answer from o2g ', "vlab20", "geoff")
        let options = {
          host : "o2g-" + "vlab20" + ".ale-aapp.com",
          path: "/api/rest/authenticate?version=1.0",
          method: 'GET',
          port: 443,
          headers: {
            'Authorization': 'Basic ' + new Buffer('admin:' + "geoff").toString('base64')
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
            const bodyArray = body.split(" ")
            let cookie = bodyArray[4]
            cookie = cookie.substr(1, cookie.length - 4)
            console.log("The Authentification has finished without any trouble")
            const session = {
              applicationName: 'PBXSession'
            }
            let options = {
              host: "o2g-" + "vlab20" + ".ale-aapp.com",
              path: "/api/rest/1.0/sessions",
              method: 'POST',
              port: 443,
              headers : {
                'Content': JSON.stringify(session),
                'Content-Type': 'application/json',
                'Cookie': 'AlcUserId=' + cookie
              },
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