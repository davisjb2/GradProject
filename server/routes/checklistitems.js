const router = new require('express').Router()
const { sequelize } = require('../models')
const Task = sequelize.models.Task
const User = sequelize.models.User
const CheckListItem = sequelize.models.ChecklistItem

router.use('/', (req, res, next) => {
    if(req.user !== undefined) {
        next()
    } else {
        return res.status(200).send({ status: 401, result: undefined, error: "unauthorized" })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const task = await Task.scope('checklist').findByPk(req.params.id)
        console.log("TSK ", task)
        var checklist = task.ChecklistItems
        console.log(checklist)
        if(checklist == null || checklist == undefined)
        {
            checklist = []
        }
        
        return res.status(200).send({ status: 200, result: checklist })
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message})
    }
})

router.post('/create/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id)
        const checklistItem = await CheckListItem.create(req.body)
        checklistItem.setTask(task)
        return res.status(200).send({ status: 200, result: checklistItem})
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message})
    }
})

router.post('/update/:id', async (req, res) => {
    try {
        const checklistItem = await CheckListItem.findByPk(req.params.id)
        if(checklistItem == null || checklistItem == undefined)
        {
            throw new Error(`No checklistItem with id ${req.params.id}`)
        }
<<<<<<< HEAD
        const task2 = await Task.scope('checklist').findByPk(req.params.id)
        return res.status(200).send({ status: 200, result: task2 })
=======
        checklistItem.update(req.body)
        return res.status(200).send({ status: 200, result: checklistItem })
>>>>>>> checklists
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message})
    }
})

router.post('/delete/:id', async (req, res) => {
    try {
        const checklistItem = await CheckListItem.findByPk(req.params.id)
        if(checklistItem == null || checklistItem == undefined)
        {
            throw new Error(`No checklistItem with id ${req.params.id}`)
        }
        await checklistItem.destroy()
        return res.status(200).send({ status: 200, result: undefined})
    } catch (e) {
        return res.status(200).send({ status: 500, result: undefined, error: e.message})
    }
})

module.exports = router