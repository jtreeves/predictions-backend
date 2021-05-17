const db = require('../../models')
const bcrypt = require('bcryptjs')

async function createPayload(email, password) {
    try {
        const currentUser = await db.User.findOne({email})
        if (currentUser) {
            const isMatch = await bcrypt.compare(
                password, currentUser.password
            )
            if (isMatch) {
                const payload = {
                    id: currentUser.id,
                    email: currentUser.email,
                    name: currentUser.name
                }
                return payload
            } else {
                return 'Password is incorrect'
            }
        } else {
            return 'User not found'
        }
    } catch (error) {
        return error
    }
}

module.exports = createPayload