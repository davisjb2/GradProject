const router = new require('express').Router()
const { sequelize } = require('../models/')
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
        const tasks = await user.getTasks({ scope: 'labels' })
        console.log(tasks)
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

router.post('/copy/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id)
        const task = await Task.scope('labels').findByPk(req.params.id)
        const task2 = await Task.create({ dueDate: task.dueDate, name: task.name, assignedDate: task.assignedDate, description: task.description })
        await user.addTask(task2)
        console.log(task)
        await task2.setLabels(task.Labels)
        const task3 = await Task.scope('labels').findByPk(task2.id)
        return res.status(200).send({ status: 200, result: task3})
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message})
    }
})

router.post('/updateLabels/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id)
        if(task == null || task == undefined)
        {
            throw new Error(`No Task with id ${req.params.id}`)
        }
        if(req.user.id == task.UserId)
        {
            await task.setLabels(req.body)
            task2 = await Task.scope('labels').findByPk(req.params.id)
            return res.status(200).send({ status: 200, result: task2})            
        } else {
            throw new Error('Task not for User')
        }


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
        }
        const task2 = await Task.scope('labels').findByPk(req.params.id)
        return res.status(200).send({ status: 200, result: task2 })
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message})
    }
})

router.post('/delete/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id)
        if(task == null || task == undefined)
        {
            throw new Error(`No Task with id ${id}`)
        }
        if(req.user.id == task.UserId)
        {
            await task.destroy()
        }
        return res.status(200).send({ status: 200, result: undefined})
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message})
    }
})

module.exports = router