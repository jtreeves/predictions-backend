const postPredictions = require('./predictions/postPredictions')
const getPredictions = require('./predictions/getPredictions')
const putFavorite = require('./predictions/putFavorite')
const putNote = require('./predictions/putNote')
const deletePredictions = require('./predictions/deletePredictions')

const predictionsController = {
    postPredictions,
    getPredictions,
    putFavorite,
    putNote,
    deletePredictions
}

module.exports = predictionsController