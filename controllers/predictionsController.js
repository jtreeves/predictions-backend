const createPredictions = require('../services/predictions/createPredictions')
const readAllPredictions = require('../services/predictions/readAllPredictions')
const updateFavorite = require('../services/predictions/updateFavorite')
const updateNote = require('../services/predictions/updateNote')
const destroyPredictions = require('../services/predictions/destroyPredictions')

const predictionsController = {}

predictionsController.postPredictions = async (req, res) => {
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
        res.status(error.code).json({msg: error.message})
    }
}

predictionsController.getPredictions = async (req, res) => {
    const id = req.params.id
    try {
        const collatedData = await readAllPredictions(id)
        res.status(200).json({collections: collatedData})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Predictions information not retrieved'
        }
        res.status(error.code).json({msg: error.message})
    }
}

predictionsController.putFavorite = async (req, res) => {
    const source = req.params.source
    const favorite = req.body.favorite
    try {
        const updatedPredictions = await updateFavorite(source, favorite)
        res.status(200).json({predictions: updatedPredictions})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Favorite not updated'
        }
        res.status(error.code).json({msg: error.message})
    }
}

predictionsController.putNote = async (req, res) => {
    const source = req.params.source
    const note = req.body.note
    try {
        const updatedPredictions = await updateNote(source, note)
        res.status(200).json({predictions: updatedPredictions})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Note not updated'
        }
        res.status(error.code).json({msg: error.message})
    }
}

predictionsController.deletePredictions = async (req, res) => {
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

module.exports = predictionsController