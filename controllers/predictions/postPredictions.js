const createPredictions = require('../../services/predictions/createPredictions')

async function postPredictions(req, res) {
    const id = req.params.id
    const source = req.body.source
    try {
        const predictions = await createPredictions(id, source)
        res.status(201).json({prediction: predictions})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Predictions not created'
        }
        console.log('ERROR IN POST PREDICTIONS: ', error)
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = postPredictions