
/* Import package */
const imports = require('./config/imports') // all import for the app
const { sequelize } = require('./models') // models folder with index.js file who return a sequelize obj
// const publicRoot = `D:/Users/ghuck2671/Desktop/Geoff/SB/SandboxALE-AAPP_2019/client/dist` // ON WINDOWS
const publicRoot = `/root/SandboxALE-AAPP_2019/client/dist` // ON LINUX

const key = imports.fs.readFileSync(__dirname + '/cert/selfsigned.key') // Certificat
const cert = imports.fs.readFileSync(__dirname + '/cert/selfsigned.crt')
const options = {
     key: key,
     cert: cert
}
console.log(`Server working... ${imports.config.portHttp}`)
/* build an express app */
const app = imports.express() //link express to app

/* enable packages */
app.use(imports.morgan('combined')) // morgan doc -> print out log;
app.use(imports.bodyParser.json()) // node middleware for handling encoded form data
app.use(imports.cors()) // server hosted on different depend --> CARE (need good security)
app.use(imports.cookieSession({
   name: 'mysession',
   keys: ['portal-vlab'],
   maxAge: 24 * 60 * 60 * 1000 // 24 hours
 }))

app.use(imports.express.static(publicRoot)) // For production (use of the build fodler for vue)

require('./policies/passport') // this is for passport authen
require('./routes')(app) // attach all the different endpoint to the apps

app.use(function(req,resp,next){
     if (req.headers['x-forwarded-proto'] == 'http') {
        return resp.redirect(301, 'https://' + req.headers.host + '/');
     } else {
        return next();
     }
});

const server = imports.https.createServer(options, app)

sequelize.sync() // sync sequelize with the server {force : true} = deleting all data
  .then(() => imports.dbopenneb.populateDB())
  .then(() => {
    // app.listen(imports.config.portHttps, imports.config.ip) // Adding the ip for change domain for production    
    // app.listen(imports.config.portHttps)
    //app.listen(imports.config.portHttp)
    server.listen(imports.config.portHttps, imports.config.ip)
    console.log('####################### END INIT DB #######################\n\n')
    console.log(`Server started on port ${imports.config.portHttp}... let's start working...`)
  })
