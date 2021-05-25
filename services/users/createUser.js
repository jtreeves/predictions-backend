const bcrypt = require('bcryptjs')
const db = require('../../models')

async function createUser(name, email, password) {
    try {
        if (name && email && password) {
            const currentUser = await db.User.findOne({
                email: email
            })
            if (!currentUser) {
                const newUser = new db.User({
                    name: name,
                    email: email,
                    password: password
                })
                bcrypt.genSalt(10, (error, salt) => {
                    if (error) throw Error
                    bcrypt.hash(newUser.password, salt, async (error, hash) => {
                        try {
                            if (error) throw Error
                            newUser.password = hash
                            await newUser.save()
                            return
                        } catch (error) {
                            throw {
                                code: 500,
                                message: error
                            }
                        }
                    })
                })
            } else {
                throw { 
                    code: 409, 
                    message: 'Email already in use' 
                }
            }
        } else {
            throw {
                code: 403,
                message: 'Name, email, and password fields must all be provided'
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = createUser