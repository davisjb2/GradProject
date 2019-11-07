const router = new require('express').Router()
const { sequelize } = require('../models')
const Task = sequelize.models.Task
const User = sequelize.models.User
const Label = sequelize.models.Label

router.use('/', (req, res, next) => {
    if(req.user !== undefined) {
        next()
    } else {
        return res.status(200).send({ status: 401, result: undefined, error: "unauthorized" })
    }
})

router.get('/', async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id)
        const labels = await user.getLabels()
        return res.status(200).send({ status: 200, result: labels})
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message})
    }
})

router.post('/update/:id', async (req, res) => {
    try {
        const label = await Label.findByPk(req.params.id)
        if(label == null || label == undefined)
        {
            throw new Error(`No Label with id ${req.params.id}`)
        }
        if(req.user.id == label.UserId)
        {
            await label.update(req.body)
            console.log(label)
        }
        return res.status(200).send({ status: 200, result: label})
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message})
    }
})

module.exports = router