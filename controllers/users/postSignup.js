const createUser = require('../../services/users/createUser')

async function postSignup(req, res) {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    try {
        await createUser(name, email, password)
        res.status(201).json({msg: 'New user created'})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'User not created'
        }
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = postSignup