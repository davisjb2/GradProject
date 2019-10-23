const { sequelize } = require('../models')
const User = sequelize.models.User

seed = async () => {
    try {
        await User.create({ email: 'user', password: 'pass'})
    } catch(e) {
        console.log(e)
    }
}

module.exports = seed