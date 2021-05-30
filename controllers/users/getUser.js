const readUser = require('../../services/users/readUser')

async function getUser(req, res) {
    const id = req.params.id
    try {
        const currentUser = await readUser(id)
        res.status(200).json({user: currentUser})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'User information not retrieved'
        }
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = getUser