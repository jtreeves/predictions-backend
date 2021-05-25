const db = require('../../models')

const destroyRegressions = require('../regressions/destroyRegressions')

async function destroyPredictions(source) {
    try {
        if (source) {
            await destroyRegressions(source)
            await db.Prediction.deleteOne({source: source})
            return 'Predictions deleted'
        } else {
            throw {
                code: 403,
                message: 'Source must be provided'
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = destroyPredictions