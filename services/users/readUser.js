const db = require('../../models')

async function readUser(id) {
    try {
        if (id) {
            const currentUser = await db.User.findOne({
                _id: id
            })
            return currentUser
        } else {
            throw {
                code: 403,
                message: 'ID must be provided'
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = readUser