const bycrypt = require('bcryptjs')
const Model = require('sequelize').Model

const hashPassword = (user, options) => {
    user.setDataValue('password', bycrypt.hashSync(user.password))
}

const UserModel = (sequelize, DataTypes) => {
    class User extends Model {}
    User.init({
        firstName: DataTypes.STRING(256),
        lastName: DataTypes.STRING(256),
        password: DataTypes.STRING(256),
        email: {
            type: DataTypes.STRING(256),
            unique: true
        }
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate: hashPassword
        }
    })
    User.prototype.comparePassword = function (password) {
        return bycrypt.compareSync(password, this.password)
    }
    return User
}

module.exports = UserModel