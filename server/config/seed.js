const { sequelize } = require('../models')
const User = sequelize.models.User
const Label = sequelize.models.Label

seed = async () => {
    try {
        const user = await User.create({ email: 'user', password: 'pass', instr: 'true'})
        const label1 = await Label.create({ name: '', color: '#b5e37e' })
        await user.addLabel(label1)
        const label2 = await Label.create({ name: '', color: '#7db9ec' })
        await user.addLabel(label2)
        const label3 = await Label.create({ name: '', color: '#b784f2' })
        await user.addLabel(label3)
        const label4 = await Label.create({ name: '', color: '#f28ec4' })
        await user.addLabel(label4)
        const label5 = await Label.create({ name: '', color: '#eeaf7a' })
        await user.addLabel(label5)    
        const label6 = await Label.create({ name: '', color: '#fbf7ab' })
        await user.addLabel(label6)
    } catch(e) {
        console.log(e)
    }
}

module.exports = seed