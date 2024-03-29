const bycrypt = require('bcryptjs')
const Model = require('sequelize').Model
const Now = require('sequelize').NOW

const TaskModel = (sequelize, DataTypes) => {
    class Task extends Model {}
    Task.init({
        name: {
            type: DataTypes.STRING
        },
        dueDate: {
            type: DataTypes.DATE,
            defaultValue: Now
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        assignedDate: {
            type: DataTypes.DATE,
            defaultValue: undefined
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: ""
        }
    }, {
        sequelize,
        modelName: 'Task'
    })
    return Task
}

module.exports = TaskModel