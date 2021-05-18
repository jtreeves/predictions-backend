const db = require('../../models')

const deleteRegressions = require('../api/deleteRegressions')

async function deletePredictions(source) {
    try {
        await deleteRegressions(source)
        await db.Prediction.deleteOne({source: source})
        return 'Predictions deleted'
    } catch (error) {
        throw error
    }
}

module.exports = deletePredictions