const db = require('../../models')

async function updateName(id, name) {
    try {
        if (id && name) {
            const updatedUser = await db.User.updateOne(
                {_id: id},
                {$set: {name: name}}
            )
            return updatedUser
        } else {
            throw {
                code: 403,
                message: 'ID and name must both be provided'
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = updateName