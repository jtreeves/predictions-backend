const db = require('../../models')

async function updateEmail(id, email) {
    try {
        if (id && email) {
            const currentUser = await db.User.findOne({
                email: email
            })
            if (!currentUser) {
                const updatedUser = await db.User.updateOne(
                    {_id: id},
                    {$set: {email: email}}
                )
                return updatedUser
            } else {
                throw { 
                    code: 409, 
                    message: 'Email already in use' 
                }
            }
        } else {
            throw {
                code: 403,
                message: 'ID and email must both be provided'
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = updateEmail