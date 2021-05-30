const updateEmail = require('../../services/users/updateEmail')

async function putEmail(req, res) {
    const id = req.params.id
    const email = req.body.email
    try {
        await updateEmail(id, email)
        res.status(204).send()
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Email not updated'
        }
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = putEmail