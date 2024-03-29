const bcrypt = require('bcryptjs')
const db = require('../../models')

async function createPayload(email, password) {
    try {
        if (email && password) {
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
                    throw {
                        code: 401,
                        message: 'Password is incorrect'
                    }
                }
            } else {
                throw {
                    code: 404,
                    message: 'User not found'
                }
            }
        } else {
            throw {
                code: 403,
                message: 'Email and password fields must both be provided'
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = createPayload