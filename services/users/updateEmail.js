const db = require('../../models')

async function updateEmail(id, email) {
    try {
        const updatedUser = await db.User.updateOne(
            {_id: id},
            {$set: {email: email}}
        )
        return updatedUser
    } catch (error) {
        return error
    }
}

module.exports = updateEmail