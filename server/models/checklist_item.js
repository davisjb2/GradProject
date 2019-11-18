const bycrypt = require('bcryptjs')
const Model = require('sequelize').Model
const Now = require('sequelize').NOW

const ChecklistItemModel = (sequelize, DataTypes) => {
    class ChecklistItem extends Model {}
    ChecklistItem.init({
        name: {
            type: DataTypes.STRING
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        order: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'ChecklistItem'
    })
    return ChecklistItem
}

module.exports = ChecklistItemModel