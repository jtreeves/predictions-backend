const db = require('../../models')

async function updateName(id, name) {
    try {
        if (id) {
            if (name) {
                const updatedUser = await db.User.updateOne(
                    {_id: id},
                    {$set: {name: name}}
                )
                return updatedUser
            } else {
                throw {
                    code: 403,
                    message: 'New name must be provided'
                }
            }
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

module.exports = updateName