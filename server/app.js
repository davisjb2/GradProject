const app = require('./server')
const config = require('./config/config')
const argv = require('yargs').argv
const { sequelize } = require('./models')
const seed = require('./config/seed')

sequelize.sync({ force: argv.force })
    .then(() => {
        seed()
    }).then(() => {
        console.log(require('path').join(__dirname, config.pathToStatic))
        console.log('---------------')
        app.listen(config.port)
        console.log(`server started on port ${config.port}`)
    }).catch((e) => {
        console.log('Error: ', e)
    })
