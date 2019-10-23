const express = require('express')
const path = require('path')
const connectHistoryApi = require('connect-history-api-fallback')
const bodyparser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const session = require('express-session')
const config = require('./config/config')
const { sequelize } = require('./models')
const User = sequelize.models.User
const routes = require('./routes')

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express()

app.use(connectHistoryApi())

app.use('/', express.static(path.join(__dirname, config.pathToStatic)))
app.use('/', (req, res, next) => {
    console.log(req.method)
    console.log(req.originalUrl)
    next()
})

app.use(bodyparser.json())
app.use(cookieParser())
app.use(session({ secret: config.sessionSecret, resave: false, saveUninitialized: false, store: 
    new SequelizeStore({
        db: sequelize
    })
}))
app.use(cors({
    origin: [
        'localhost:8080',
        'locahost:8081',
        'https://murmuring-atoll-93655.herokuapp.com/'
    ],
    credentials: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (error, user) => {
        if(error) return done(error)
        if(!user) return done(null, false)
        if(!user.comparePassword(password)) return done(null, false)
        return done(null, user)
    })
}))

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findByPk(id)
        .then(user => {
            return done(null, user)
        }).catch(error => {
            return done(error, null)
        })
})

app.use('/api', routes)

module.exports = app