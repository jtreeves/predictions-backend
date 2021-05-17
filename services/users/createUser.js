async function createUser(name, email, password) {
    try {
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
                        const createdUser = await newUser.save()
                        return createdUser
                    } catch (error) {
                        return error
                    }
                })
            })
        } else {
            return 'Email already in use'
        }
    } catch (error) {
        return error
    }
}

module.exports = createUser