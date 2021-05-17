const db = require('../../models')

async function updateEmail(id, email) {
    try {
        const updatedUser = await db.User.updateOne(
            {_id: id},
            {$set: {email: email}}
        )
        return updatedUser
    } catch (error) {
        throw error
    }
}

module.exports = updateEmail