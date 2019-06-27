const path = require('path') // import function of path (__dirname)

module.exports  = { // basic config for the server
    ip: '10.1.2.230',
    portHttps: 443,
    portHttp: 80,
    db: { // maybe i should use mysql instead
        database: process.env.DB_NAME || 'tabtracker', // name of DB
        user: process.env.DB_USER || 'tabtracker',
        password: process.env.DB_PASS || 'tabtracker',
        options: {
            dialect: process.env.DIALECT || 'sqlite', // tell what kind of db we are going to be connect to
            host: process.env.HOST || 'localhost',
            storage: path.resolve(__dirname, '../../tabtracker.sqlite') // give the path to find the .sqlite
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
