const router = new require('express').Router()
const { sequelize } = require('../models/')
const Task = sequelize.models.Task
const User = sequelize.models.User

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
        const tasks = await user.getTasks()
        return res.status(200).send({ status: 200, result: tasks})
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message})
    }
})

router.post('/create', async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id)
        console.log(user)
        const task = await Task.create(req.body)
        await user.addTask(task)
        return res.status(200).send({ status: 200, result: task})
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message})
    }
})


router.post('/update/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id)
        if(task == null || task == undefined)
        {
            throw new Error(`No Task with id ${req.params.id}`)
        }
        if(req.user.id == task.UserId)
        {
            await task.update(req.body)
            console.log(task)
        }
        return res.status(200).send({ status: 200, result: task})
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message})
    }
})

router.post('/delete/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(id)
        if(task == null || task == undefined)
        {
            throw new Error(`No Task with id ${id}`)
        }
        if(req.user.id == task.getUser().id)
        {
            await task.destroy()
        }
        return res.status(200).send({ status: 200, result: undefined})
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message})
    }
})

module.exports = router