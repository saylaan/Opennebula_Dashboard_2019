module.exports = { // basic config for the server
    port: 8081,
    db: {
        database: process.env.DB_NAME || 'tabtracker', // name of DB
        user: process.env.DB_USER || 'tabtracker',
        password: process.env.DB_PASS || 'tabtracker',
        options: {
            dialect: process.env.DIALECT || 'sqlite', // tell what kind of db we are going to be connect to
            host: process.env.HOST || 'localhost',
            storage: './tabtracker.sqlite'
        }
    }
}
