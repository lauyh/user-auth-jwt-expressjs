const {User} = require('../src/models/User')
const {db} = require('../lib/sequelize')
const seed = async () => {
    await User.sync({force: true})
    db.close()
}

seed() 