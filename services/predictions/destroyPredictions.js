const db = require('../../models')

const destroyRegressions = require('../regressions/destroyRegressions')

async function destroyPredictions(source) {
    try {
        await destroyRegressions(source)
        await db.Prediction.deleteOne({source: source})
        return 'Predictions deleted'
    } catch (error) {
        throw error
    }
}

module.exports = destroyPredictions