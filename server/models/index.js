const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
    config.db.name,
    config.db.username,
    config.db.password,
    config.db.options
)

fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

const { User, Task, Label } = sequelize.models

User.hasMany(Task)
Task.belongsTo(User)

Label.belongsTo(User)
User.hasMany(Label)

Task.belongsToMany(Label, { through: 'taskLabel' })
Label.belongsToMany(Task, { through: 'taskLabel' })

Task.addScope('labels', {
    include: [
        { model: Label, attributes: { include: ['id', 'name', 'color']}}
    ]
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db