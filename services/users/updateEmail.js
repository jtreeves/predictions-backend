const db = require('../../models')

async function updateEmail(id, email) {
    try {
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
    } catch (error) {
        throw error
    }
}

module.exports = updateEmail