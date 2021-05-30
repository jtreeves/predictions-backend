const destroyPredictions = require('../../services/predictions/destroyPredictions')

async function deletePredictions(req, res) {
    const source = req.params.source
    try {
        await destroyPredictions(source)
        res.status(204).send()
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Predictions not deleted'
        }
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = deletePredictions