const db = require('../../models')

async function getUser(id) {
    try {
        const currentUser = await db.User.findOne({
            _id: id
        })
        return currentUser
    } catch (error) {
        return error
    }
}

module.exports = getUser