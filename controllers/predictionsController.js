const createPredictions = require('../services/predictions/createPredictions')
const readAllPredictions = require('../services/predictions/readAllPredictions')
const updateFavorite = require('../services/predictions/updateFavorite')
const updateNote = require('../services/predictions/updateNote')
const destroyPredictions = require('../services/predictions/destroyPredictions')

const predictionsController = {}

predictionsController.postPredictions = async (req, res) => {
    try {
        const predictions = await createPredictions(
            req.params.id, req.params.source
        )
        res.status(201).json({prediction: predictions})
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

predictionsController.getPredictions = async (req, res) => {
    try {
        const collatedData = await readAllPredictions(req.params.id)
        res.status(200).json({collections: collatedData})
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

predictionsController.putFavorite = async (req, res) => {
    try {
        const updatedPredictions = await updateFavorite(
            req.params.source, req.body.favorite
        )
        res.status(200).json({predictions: updatedPredictions})
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

predictionsController.putNote = async (req, res) => {
    try {
        const updatedPredictions = await updateNote(
            req.params.source, req.body.note
        )
        res.status(200).json({predictions: updatedPredictions})
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

predictionsController.deletePredictions = async (req, res) => {
    try {
        const deletion = await destroyPredictions(req.params.source)
        res.status(204).json({msg: deletion})
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

module.exports = predictionsController