const destroyUser = require('../../services/users/destroyUser')

async function deleteUser(req, res) {
    const id = req.params.id
    try {
        await destroyUser(id)
        res.status(204).send()
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'User not deleted'
        }
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = deleteUser