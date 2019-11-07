const bycrypt = require('bcryptjs')
const Model = require('sequelize').Model

const LabelModel = (sequelize, DataTypes) => {
    class Label extends Model {}
    Label.init({
        name: {
            type: DataTypes.STRING
        },
        color: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Label'
    })
    return Label
}

module.exports = LabelModel