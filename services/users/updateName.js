const db = require('../../models')

async function updateName(id, name) {
    try {
        const updatedUser = await db.User.updateOne(
            {_id: id},
            {$set: {name: name}}
        )
        return updatedUser
    } catch (error) {
        throw error
    }
}

module.exports = updateName