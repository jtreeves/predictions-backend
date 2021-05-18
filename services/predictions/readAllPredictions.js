const db = require('../../models')
const readRegressions = require('../regressions/readRegressions')

async function readAllPredictions(id) {
    try {
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
    } catch (error) {
        throw error
    }
}

module.exports = readAllPredictions