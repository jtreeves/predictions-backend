const updateName = require('../../services/users/updateName')

async function putName(req, res) {
    const id = req.params.id
    const name = req.body.name
    try {
        await updateName(id, name)
        res.status(204).send()
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Name not updated'
        }
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = putName