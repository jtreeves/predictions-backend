const destroyRegressions = require('../../services/regressions/destroyRegressions')

async function deleteRegressions(req, res) {
    const source = req.params.source
    try {
        const deletion = await destroyRegressions(source)
        res.status(204).json({msg: deletion})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Regressions not deleted'
        }
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = deleteRegressions