const router = new require('express').Router()
const { sequelize } = require('../models/')
const bcrypt = require('bcryptjs')
const User = sequelize.models.User
const Label = sequelize.models.Label

router.use('/', (req, res, next) => {
    console.log('auth router')
    next()
})

router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body)
        const label1 = await Label.create({ name: '', color: '#b5e37e' })
        await user.addLabel(label1)
        const label2 = await Label.create({ name: '', color: '#7db9ec' })
        await user.addLabel(label2)
        const label3 = await Label.create({ name: '', color: '#b784f2' })
        await user.addLabel(label3)
        const label4 = await Label.create({ name: '', color: '#f28ec4' })
        await user.addLabel(label4)
        const label5 = await Label.create({ name: '', color: '#eeaf7a' })
        await user.addLabel(label5)    
        const label6 = await Label.create({ name: '', color: '#fbf7ab' })
        await user.addLabel(label6)        
        req.login(user, (e) => {
            if(e) {
                throw e
            }
        })
        return res.status(200).send({ status: 200, result: user })
    } catch(e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email }})
        if(!user.comparePassword(req.body.password))
        {
            throw new Error("Password Incorrect")
        }
        req.login(user, (e) => {
            if(e) {
                throw e
            }
        })
        return res.status(200).send({ status: 200, result: user })
    } catch(e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message })
    }
})


router.post('/update', async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id)
        if(user == null || user == undefined)
        {
            throw new Error(`No User with id ${req.user.id}`)
        }
        await user.update({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email })
        if(req.user.password)
        {
            user.setDataValue('password', bcrypt.hashSync(user.password))
        }
        console.log(user)
        return res.status(200).send({ status: 200, result: user})
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message })
    }
})

router.get('/logout', async (req, res) => {
    try {
        req.logout()
        return res.status(200).send({ status: 200, result: undefined })
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message })
    }
})

router.get('/reauth', async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id)
        return res.status(200).send({ status: 200, result: user })
    } catch (e) {
        return res.status(204).send({ status: 204, result: undefined, error: e })
    }
})

module.exports = router