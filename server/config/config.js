module.exports = {
    pathToStatic: process.env.PATH_TO_STATIC || '/dist/',
    sessionSecret: process.env.SESSION_SECRET || 'mountaineers',
    port: process.env.PORT || 8081,
    db: {
        name: 'db',
        username: 'email',
        password: 'password',
        options: {
            dialect: 'sqlite',
            storage: process.env.DB_PATH || './database.sqlite'
        }
    }
}