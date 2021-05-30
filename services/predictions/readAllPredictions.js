const db = require('../../models')
const readRegressions = require('../regressions/readRegressions')

async function readAllPredictions(id) {
    try {
        if (id) {
            const allPredictions = []
            const predictions = await db.Prediction.find({
                user: id
            })
            for (const prediction of predictions) {
                const regression = await readRegressions(
                    prediction.source
                )
                allPredictions.push({prediction, regression})
            }
            return allPredictions
        } else {
            throw {
                code: 403,
                message: 'ID must be provided'
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = readAllPredictions