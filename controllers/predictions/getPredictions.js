const readAllPredictions = require('../../services/predictions/readAllPredictions')

async function getPredictions(req, res) {
    const id = req.params.id
    try {
        const collatedData = await readAllPredictions(id)
        res.status(200).json({collections: collatedData})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Predictions information not retrieved'
        }
        console.log('ERROR IN GET PREDICTIONS: ', error)
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = getPredictions